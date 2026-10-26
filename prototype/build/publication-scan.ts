import { readFileSync, readdirSync, lstatSync, existsSync } from 'node:fs'
import { basename, extname, join, relative, resolve } from 'node:path'
import { gunzipSync, brotliDecompressSync } from 'node:zlib'
import type { Catalogue } from '../editorial/schema.ts'
import type { SourceManifest } from '../editorial/source-contract.ts'
import { assertLegacyPublication, canonical, readReference, requireThat, sha256, validateManifest, safeFile } from './content-contract.ts'

import { selectWeekly } from './weekly.ts'
import type { WeeklyRegistry } from '../editorial/weekly-contract.ts'

export const FIXTURE_SENTINEL = 'F0_FIXTURE_ONLY_'
type Boundary = { markers: string[]; withheldHashes: Set<string>; allowedAssets: Set<string> }
function files(dir: string): string[] {
  requireThat(lstatSync(dir).isDirectory() && !lstatSync(dir).isSymbolicLink(), 'artifact directory must not be a symlink')
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name)
    requireThat(!lstatSync(path).isSymbolicLink(), 'artifact/static symlink: ' + path)
    return entry.isDirectory() ? files(path) : [path]
  })
}
function normalize(value: string): string {
  // Detection only: decode common build encodings without evaluating JavaScript.
  for (let i = 0; i < 2; i++) value = value
    .replace(/\\u\{([\da-f]{1,6})\}/gi, (_, n) => { const c = parseInt(n, 16); return c <= 0x10ffff ? String.fromCodePoint(c) : '' })
    .replace(/\\u([\da-f]{4})|\\x([\da-f]{2})/gi, (_, a, b) => String.fromCharCode(parseInt(a || b, 16)))
    .replace(/&#x([\da-f]+);|&#(\d+);/gi, (_, a, b) => { const c = parseInt(a || b, a ? 16 : 10); return c <= 0x10ffff ? String.fromCodePoint(c) : '' })
    .replace(/(?:%[\da-f]{2})+/gi, encoded => { try { return decodeURIComponent(encoded) } catch { return encoded } })
    .replace(/\\[nrt]/g, ' ').replace(/\\["'\\/]/g, match => match.slice(1))
  return value.normalize('NFC').replace(/\s+/g, ' ').trim()
}
function chunks(text: string): string[] {
  return text.split(/\n\s*\n/).filter(p => p.length >= 60).flatMap(p => {
    const plain = p.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*#_>|]/g, '')
    return [p, plain, ...p.split('\n').filter(l => l.length >= 60)]
  })
}
export function createBoundary(root: string, manifest: SourceManifest, catalogue: Catalogue): Boundary {
  validateManifest(manifest, root)
  for (const item of [...catalogue.articles, ...catalogue.topics]) if (item.status === 'published') assertLegacyPublication(root, item)
  const authorizedText: string[] = [], publicAssetHashes = new Set<string>()
  for (const item of [...catalogue.articles, ...catalogue.topics]) if (item.status === 'published') authorizedText.push(normalize(JSON.stringify(item)))
  const weeklyMarkers: string[] = []
  // Real repository builds require the registry. Old F0 fixtures pass a catalogue
  // in memory and do not represent a website checkout.
  if (existsSync(resolve(root, 'prototype/editorial/catalogue.json'))) {
    const registry: WeeklyRegistry = JSON.parse(readFileSync(safeFile(root, 'prototype/editorial/weekly.json'), 'utf8'))
    const weekly = selectWeekly(registry, catalogue, root)
    const visible = new Set(weekly.topics.map(t => t.id))
    authorizedText.push(...weekly.topics.map(t => normalize(JSON.stringify(t))))
    for (const t of registry.topics.filter(t => !visible.has(t.id))) weeklyMarkers.push(t.id, t.slug, t.title, t.description)
  }
  const markers = [FIXTURE_SENTINEL, ...weeklyMarkers], withheldHashes = new Set<string>(), allowedAssets = new Set<string>()
  for (const a of manifest.articles) {
    const withheld = a.status !== 'published'
    if (!withheld) authorizedText.push(normalize(readReference(root, a.source).toString('utf8') + canonical(a.metadata) + a.slug + a.id + a.revision))
    if (withheld) markers.push(a.id, a.revision, a.slug, a.metadata.title)
    for (const file of [a.source, ...Object.values(a.dossiers)]) {
      const bytes = readReference(root, file)
      // Internal dossiers never become public, even when an article is published.
      if (withheld || file.path !== a.source.path) {
        withheldHashes.add(file.sha256)
        markers.push(...chunks(bytes.toString('utf8')))
      }
    }
    for (const asset of a.assets) {
      const bytes = readReference(root, asset)
      if (withheld) {
        withheldHashes.add(asset.sha256); markers.push(basename(asset.path), asset.alt)
        markers.push(...[...bytes.toString('utf8').matchAll(/<(?:text|title|desc)\b[^>]*>([^<]{20,})<\//g)].map(m => m[1]))
      } else { allowedAssets.add(asset.sha256); publicAssetHashes.add(asset.sha256) }
    }
  }
  for (const a of catalogue.articles.filter(a => a.status !== 'published')) markers.push(a.slug, a.title, a.description, ...a.keywords.filter(k => k.length > 10), ...a.sections.flatMap(s => [s.heading, ...s.paragraphs, ...(s.note ? [s.note] : [])]))
  for (const t of catalogue.topics.filter(t => t.status !== 'published')) markers.push(t.slug, t.title, t.description)
  const legacy = readFileSync(resolve(root, 'prototype/src/reading/homepageContent.ts'), 'utf8')
  for (const match of legacy.matchAll(/'([^'\n]{30,})'/g)) markers.push(match[1])
  for (const dir of ['prototype/public', 'prototype/node_modules/@fontsource']) {
    const full = resolve(root, dir)
    // Missing fonts are a build/environment failure; never create fake allowances.
    try { for (const file of files(full)) allowedAssets.add(sha256(readFileSync(file))) }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error }
  }
  for (const hash of publicAssetHashes) withheldHashes.delete(hash)
  const blocked = markers.map(normalize).filter(marker => marker && (marker === FIXTURE_SENTINEL || !authorizedText.some(text => text.includes(marker))))
  return { markers: [...new Set(blocked)], withheldHashes, allowedAssets }
}
export function assertArtifact(bytes: Buffer, filename: string, boundary: Boundary) {
  const extension = extname(filename).toLowerCase()
  if (extension === '.gz' || extension === '.br') {
    const decoded = extension === '.gz' ? gunzipSync(bytes, { maxOutputLength: 16 * 1024 * 1024 }) : brotliDecompressSync(bytes, { maxOutputLength: 16 * 1024 * 1024 })
    assertArtifact(decoded, filename.slice(0, -extension.length), boundary)
    return
  }
  requireThat(!boundary.withheldHashes.has(sha256(bytes)), 'unpublished source/asset bytes: ' + filename)
  requireThat(!/\.(?:map|md|json|tsx?|mts)$/i.test(filename), 'raw content/source map output: ' + filename)
  // Only known binary artwork/fonts bypass text decoding; SVG/TXT still get scanned.
  if (['.woff', '.woff2', '.webp', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.avif'].includes(extension) && boundary.allowedAssets.has(sha256(bytes))) return
  if (['.js', '.css', '.html'].includes(extension)) {
    // Reject binary disguised as a code document.
    new TextDecoder('utf-8', { fatal: true }).decode(bytes)
  }
  const raw = bytes.toString('utf8')
  for (const match of raw.matchAll(/[A-Za-z0-9+/]{64,}={0,2}/g)) {
    const decoded = Buffer.from(match[0], 'base64')
    requireThat(!boundary.withheldHashes.has(sha256(decoded)), 'inline unpublished asset: ' + filename)
    const value = normalize(decoded.toString('utf8'))
    for (const marker of boundary.markers) requireThat(!value.includes(marker), 'inline unpublished content: ' + filename)
  }
  const text = normalize(bytes.toString('utf8')), name = normalize(filename)
  for (const marker of boundary.markers) requireThat(!text.includes(marker) && !name.includes(marker), 'unpublished content leaked into ' + filename)
  if (!['.js', '.css', '.html'].includes(extension)) requireThat(boundary.allowedAssets.has(sha256(bytes)), 'unapproved static artifact: ' + filename)
}
export function scanProduction(root: string, output: string, manifest: SourceManifest, catalogue: Catalogue) {
  const boundary = createBoundary(root, manifest, catalogue), paths = files(output)
  requireThat(paths.some(path => relative(output, path) === 'index.html'), 'missing production index')
  for (const file of paths) assertArtifact(readFileSync(file), relative(output, file), boundary)
  return { files: paths.length, withheldArticles: manifest.articles.filter(a => a.status !== 'published').length, markerCount: boundary.markers.length }
}
