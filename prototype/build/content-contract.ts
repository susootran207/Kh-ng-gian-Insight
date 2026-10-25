import { createHash } from 'node:crypto'
import { lstatSync, readFileSync, readdirSync, realpathSync } from 'node:fs'
import { isAbsolute, relative, resolve, sep } from 'node:path'
import type { FileReference, PublicationEvidence, ReviewKind, ReviewRecord, SourceArticle, SourceManifest, SourceMetadata, PreviewView, PublicView, LegacyPublication } from '../editorial/source-contract.ts'

export const DOSSIERS = ['REFERENCES', 'CLAIM-AUDIT', 'BLOOM-REVIEW', 'VISUAL-REVIEW', 'EDITORIAL-REVIEW'] as const
export const REVIEW_KINDS = ['editorialApproval', 'expertReview', 'readerQA', 'learnerReview', 'publicationAuthorization'] as const
export const STAGES = ['Đầu năm', 'Giữa học kỳ', 'Mùa thi', 'Sau thi'] as const
const HASH = /^[a-f0-9]{64}$/
const ID = /^KGNT-[CE][0-9]{2,}$/
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export function requireThat(ok: unknown, message: string): asserts ok {
  if (!ok) throw new Error('Content contract: ' + message)
}
export function sha256(bytes: string | Buffer): string { return createHash('sha256').update(bytes).digest('hex') }
export function canonical(value: unknown): string {
  if (Array.isArray(value)) return '[' + value.map(canonical).join(',') + ']'
  if (value && typeof value === 'object') return '{' + Object.entries(value).filter(([, v]) => v !== undefined).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, v]) => JSON.stringify(k) + ':' + canonical(v)).join(',') + '}'
  return JSON.stringify(value)
}
function text(value: unknown, label: string): asserts value is string {
  requireThat(typeof value === 'string' && value.trim().length > 0 && value === value.trim(), label + ' must be nonempty text')
}
function strings(value: unknown, label: string): asserts value is string[] {
  requireThat(Array.isArray(value), label + ' must be an array')
  value.forEach(v => text(v, label))
  requireThat(new Set(value).size === value.length, label + ' duplicates')
}
function object(value: unknown, label: string): asserts value is Record<string, unknown> {
  requireThat(value !== null && typeof value === 'object' && !Array.isArray(value), label + ' must be an object')
}
export function safeFile(root: string, path: string, prefix?: string): string {
  text(path, 'path')
  requireThat(!isAbsolute(path) && !/[\\%?#:\x00-\x1f]/.test(path), 'unsafe path: ' + path)
  requireThat(path.split('/').every(p => p && p !== '.' && p !== '..'), 'path traversal: ' + path)
  if (prefix) requireThat(path.startsWith(prefix), 'path outside allowed source: ' + path)
  const base = realpathSync(root), target = resolve(base, path)
  let current = base
  for (const segment of path.split('/')) {
    current = resolve(current, segment)
    requireThat(!lstatSync(current).isSymbolicLink(), 'symlink: ' + path)
  }
  const real = realpathSync(target), rel = relative(base, real)
  requireThat(rel && rel !== '..' && !rel.startsWith('..' + sep) && !isAbsolute(rel) && lstatSync(real).isFile(), 'file outside root: ' + path)
  return real
}
export function readReference(root: string, ref: FileReference, prefix?: string): Buffer {
  object(ref, 'file reference')
  requireThat(typeof ref.sha256 === 'string' && HASH.test(ref.sha256), 'invalid file hash')
  const bytes = readFileSync(safeFile(root, ref.path, prefix))
  requireThat(sha256(bytes) === ref.sha256, 'file hash mismatch: ' + ref.path)
  return bytes
}
function ref(root: string, path: string): FileReference { return { path, sha256: sha256(readFileSync(safeFile(root, path))) } }
function https(url: string) {
  text(url, 'reference URL')
  const parsed = new URL(url)
  requireThat(parsed.protocol === 'https:' && !parsed.username && !parsed.password, 'HTTPS references only')
}
export function validDate(value: unknown): asserts value is string {
  text(value, 'date')
  requireThat(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && Number.isFinite(Date.parse(value)), 'invalid timestamp')
  const day = value.slice(0, 10)
  requireThat(new Date(day + 'T00:00:00Z').toISOString().slice(0, 10) === day, 'invalid calendar date')
}
export function revisionHash(article: SourceArticle): string {
  return sha256(canonical({
    id: article.id, slug: article.slug, revision: article.revision,
    source: article.source, contentHash: article.contentHash,
    metadata: article.metadata, referenceUrls: article.referenceUrls, dossiers: article.dossiers,
    assets: article.assets.map(({ rights: _rights, ...asset }) => asset),
  }))
}
export function assertRecord(root: string, record: ReviewRecord, expected: { kind: ReviewKind; subjectId: string; revision: string; contentHash: string; revisionHash: string }, publishedAt: string) {
  object(record, expected.kind + ' record')
  for (const [key, value] of Object.entries(expected)) requireThat(record[key as keyof ReviewRecord] === value, 'review scope/revision/hash mismatch: ' + expected.kind)
  requireThat(record.decision === 'approved', 'review not approved')
  text(record.by, 'reviewer')
  validDate(record.at)
  requireThat(Date.parse(record.at) <= Date.parse(publishedAt), 'review occurs after publication')
  const bytes = readReference(root, record.evidence, 'docs/phase-3/publication-records/')
  const evidence: unknown = JSON.parse(bytes.toString('utf8'))
  object(evidence, 'review evidence JSON')
  for (const key of [...Object.keys(expected), 'decision', 'by', 'at']) requireThat(evidence[key] === record[key as keyof ReviewRecord], 'evidence does not match review: ' + expected.kind)
}
export function assertPublication(root: string, subject: { id: string; revision: string; contentHash: string; revisionHash: string; publication: PublicationEvidence | null; publishedAt: string | null; assets: SourceArticle['assets'] }, now = Date.now()) {
  requireThat(HASH.test(subject.contentHash) && HASH.test(subject.revisionHash), 'invalid publication hashes')
  validDate(subject.publishedAt)
  requireThat(Date.parse(subject.publishedAt) <= now, 'future publication')
  object(subject.publication, 'publication evidence required')
  for (const kind of REVIEW_KINDS) assertRecord(root, subject.publication[kind], {
    kind, subjectId: subject.id, revision: subject.revision, contentHash: subject.contentHash, revisionHash: subject.revisionHash,
  }, subject.publishedAt)
  for (const asset of subject.assets) {
    readReference(root, asset, 'docs/phase-3/drafts/')
    assertRecord(root, asset.rights!, { kind: 'assetRights', subjectId: asset.id, revision: asset.revision, contentHash: asset.sha256, revisionHash: subject.revisionHash }, subject.publishedAt)
  }
}
function exactKeys(value: object, keys: readonly string[], label: string) {
  requireThat(Object.keys(value).sort().join() === [...keys].sort().join(), 'unknown/missing fields: ' + label)
}
function validateMetadata(m: SourceMetadata) {
  object(m, 'metadata')
  exactKeys(m, ['title', 'collection', 'topic', 'season', 'keywords', 'audience', 'bloom', 'topicIds', 'relatedArticleIds'], 'metadata')
  for (const key of ['title', 'topic'] as const) text(m[key], key)
  requireThat(['core', 'extension'].includes(m.collection) && STAGES.includes(m.season), 'invalid collection/stage')
  for (const key of ['keywords', 'audience', 'topicIds', 'relatedArticleIds'] as const) strings(m[key], key)
  requireThat(m.keywords.length && m.audience.length && m.audience.every(a => ['THCS', 'THPT'].includes(a)), 'invalid audience/keywords')
  object(m.bloom, 'Bloom metadata')
  exactKeys(m.bloom, ['remember', 'understand', 'apply'], 'Bloom metadata')
  for (const key of ['remember', 'understand', 'apply'] as const) text(m.bloom[key], key)
}
function assetReferences(root: string, directory: string, article: string): SourceArticle['assets'] {
  const matches = [...article.matchAll(/!\[([^\]]+)\]\(([^)]+)\)/g)]
  requireThat(matches.length > 0, 'missing figure reference')
  return matches.map((match, index) => {
    const name = match[2]
    requireThat(/^[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/.test(name), 'invalid asset reference')
    const file = ref(root, directory + '/' + name)
    const svg = readFileSync(safeFile(root, file.path), 'utf8')
    const tags = [...svg.matchAll(/<\/?\s*([a-z][\w:-]*)\b/gi)].map(m => m[1])
    requireThat(tags.every(tag => ['svg', 'title', 'desc', 'g', 'path', 'rect', 'text'].includes(tag)), 'unsupported SVG element')
    requireThat(/<svg\s/.test(svg) && !/<!|<\?(?!xml\s)|<\s*(?:script|foreignObject|image|use|a|style)\b|\bon[a-z]+\s*=|\bhref\s*=|url\s*\(/i.test(svg), 'active/external SVG is not allowed')
    return { ...file, id: directory.split('/').at(-1)! + '-V' + (index + 1), revision: file.sha256, alt: match[1], rights: null }
  })
}
export function generateManifest(root: string, sourceCommit: string): SourceManifest {
  requireThat(/^[a-f0-9]{40}$/.test(sourceCommit), 'invalid source commit')
  const matrix = JSON.parse(readFileSync(safeFile(root, 'docs/phase-3/matrix.json'), 'utf8'))
  const articles: SourceArticle[] = matrix.articles.map((m: SourceMetadata & { id: string; slug: string }) => {
    requireThat(ID.test(m.id), 'invalid ID')
    const directory = 'docs/phase-3/drafts/' + m.id.slice(5)
    const source = ref(root, directory + '/ARTICLE.md'), article = readFileSync(safeFile(root, source.path), 'utf8')
    const revisions = [...new Set(article.match(/\b[ce][0-9]{2,}-draft-r[1-9][0-9]*\b/g))]
    requireThat(revisions.length === 1 && revisions[0].startsWith(m.id.slice(5).toLowerCase() + '-'), 'missing/ambiguous revision')
    const title = article.match(/^# (.+)$/m)?.[1]
    requireThat(title === m.title && article.includes(m.id), 'source title/ID mismatch')
    const { collection, topic, season, keywords, audience, bloom, topicIds, relatedArticleIds } = m
    const metadata = { title, collection, topic, season, keywords, audience, bloom, topicIds, relatedArticleIds } as SourceMetadata
    const bibliography = article.split(/^## Tài liệu tham khảo\s*$/m)
    requireThat(bibliography.length === 2, 'missing/ambiguous bibliography')
    const referenceUrls = [...new Set(bibliography[1].match(/https:\/\/[^\s)]+/g) || [])]
    const entry: SourceArticle = {
      id: m.id, slug: m.slug, revision: revisions[0], source, contentHash: source.sha256, revisionHash: '',
      metadata, referenceUrls,
      dossiers: Object.fromEntries(DOSSIERS.map(name => [name, ref(root, directory + '/' + name + '.md')])) as SourceArticle['dossiers'],
      assets: assetReferences(root, directory, article), status: 'draft', publication: null, publishedAt: null,
    }
    entry.revisionHash = revisionHash(entry)
    return entry
  })
  const manifest: SourceManifest = {
    schemaVersion: 1, sourceCommit,
    topicRegistry: matrix.topics.map((t: { id: string; articleIds: string[] }) => ({ id: t.id, articleIds: t.articleIds })),
    articles,
  }
  validateManifest(manifest, root)
  return manifest
}
export function validateManifest(input: unknown, root: string, now = Date.now()): asserts input is SourceManifest {
  object(input, 'manifest')
  exactKeys(input, ['schemaVersion', 'sourceCommit', 'topicRegistry', 'articles'], 'manifest')
  requireThat(input.schemaVersion === 1 && typeof input.sourceCommit === 'string' && /^[a-f0-9]{40}$/.test(input.sourceCommit), 'invalid manifest version/commit')
  requireThat(Array.isArray(input.articles) && Array.isArray(input.topicRegistry), 'invalid manifest collections')
  const manifest = input as unknown as SourceManifest, ids = new Set<string>(), slugs = new Set<string>(), topics = new Set<string>()
  for (const topic of manifest.topicRegistry) {
    object(topic, 'topic registry')
    exactKeys(topic, ['id', 'articleIds'], 'topic registry')
    requireThat(typeof topic.id === 'string' && /^T[0-9]{2,}$/.test(topic.id) && !topics.has(topic.id), 'duplicate/invalid topic ID')
    topics.add(topic.id); strings(topic.articleIds, 'topic article IDs')
  }
  for (const a of manifest.articles) {
    object(a, 'article')
    exactKeys(a, ['id', 'slug', 'revision', 'source', 'contentHash', 'revisionHash', 'metadata', 'referenceUrls', 'dossiers', 'assets', 'status', 'publication', 'publishedAt'], 'article')
    object(a.source, 'source'); exactKeys(a.source, ['path', 'sha256'], 'source')
    requireThat(typeof a.id === 'string' && ID.test(a.id) && !ids.has(a.id), 'duplicate/invalid article ID')
    requireThat(typeof a.slug === 'string' && SLUG.test(a.slug) && !slugs.has(a.slug), 'duplicate/invalid slug')
    ids.add(a.id); slugs.add(a.slug)
    requireThat(typeof a.revision === 'string' && new RegExp('^' + a.id.slice(5).toLowerCase() + '-draft-r[1-9][0-9]*$').test(a.revision), 'invalid article revision')
    validateMetadata(a.metadata)
    requireThat(a.metadata.collection === (a.id.startsWith('KGNT-C') ? 'core' : 'extension'), 'collection/ID mismatch')
    const dir = 'docs/phase-3/drafts/' + a.id.slice(5) + '/'
    requireThat(a.source?.path === dir + 'ARTICLE.md', 'source path/ID mismatch')
    const article = readReference(root, a.source, dir).toString('utf8')
    requireThat(a.contentHash === a.source.sha256 && article.startsWith('# ' + a.metadata.title + '\n') && article.includes(a.id) && article.includes(a.revision), 'source identity/content mismatch')
    object(a.dossiers, 'dossiers')
    requireThat(Object.keys(a.dossiers).sort().join() === [...DOSSIERS].sort().join(), 'missing/unknown dossier')
    for (const name of DOSSIERS) {
      requireThat(a.dossiers[name]?.path === dir + name + '.md', 'dossier path mismatch')
      readReference(root, a.dossiers[name], dir)
    }
    requireThat(Array.isArray(a.assets), 'invalid asset list')
    const expectedAssets = assetReferences(root, dir.slice(0, -1), article)
    requireThat(a.assets.length === expectedAssets.length, 'asset count mismatch')
    a.assets.forEach((asset, i) => {
      const { rights: _a, ...actual } = asset, { rights: _b, ...expected } = expectedAssets[i]
      requireThat(canonical(actual) === canonical(expected), 'asset reference/hash/alt mismatch')
      readReference(root, asset, dir)
    })
    for (const match of article.matchAll(/\]\(([^)]+)\)/g)) {
      const target = match[1]
      if (target.startsWith('https://')) { https(target); continue }
      if (/^#[a-z0-9-]+$/.test(target)) continue
      requireThat([...DOSSIERS.map(name => name + '.md'), ...a.assets.map(asset => asset.path.slice(dir.length))].includes(target), 'invalid local article reference')
      safeFile(root, dir + target, dir)
    }
    strings(a.referenceUrls, 'reference URLs'); a.referenceUrls.forEach(https)
    const urls = [...new Set(article.split(/^## Tài liệu tham khảo\s*$/m)[1]?.match(/https:\/\/[^\s)]+/g) || [])]
    requireThat(canonical(urls) === canonical(a.referenceUrls), 'bibliography references mismatch')
    requireThat(a.revisionHash === revisionHash(a), 'revision hash mismatch')
    requireThat(['draft', 'in_review', 'approved', 'published'].includes(a.status), 'invalid editorial status')
    if (a.status === 'published') assertPublication(root, a, now)
    else requireThat(a.publishedAt === null && a.publication === null && a.assets.every(asset => asset.rights === null), 'unpublished source must not assert publication records')
  }
  for (const a of manifest.articles) {
    requireThat(a.metadata.relatedArticleIds.every(id => ids.has(id) && id !== a.id), 'unknown/self related ID')
    requireThat(a.metadata.topicIds.every(id => topics.has(id)), 'unknown topic ID')
    for (const id of a.metadata.topicIds) requireThat(manifest.topicRegistry.find(t => t.id === id)!.articleIds.includes(a.id), 'topic membership mismatch')
  }
  for (const topic of manifest.topicRegistry) requireThat(topic.articleIds.every(id => ids.has(id) && manifest.articles.find(a => a.id === id)!.metadata.topicIds.includes(topic.id)), 'unknown/asymmetric topic article')
}
export function validateSourceInventory(manifest: SourceManifest, root: string) {
  const expected = generateManifest(root, manifest.sourceCommit)
  const identity = (m: SourceManifest) => m.articles.map(a => ({ ...a, status: 'draft', publication: null, publishedAt: null, assets: a.assets.map(asset => ({ ...asset, rights: null })) }))
  requireThat(canonical(identity(manifest)) === canonical(identity(expected)) && canonical(manifest.topicRegistry) === canonical(expected.topicRegistry), 'manifest drift from source/metadata')
  const directories = readdirSync(resolve(root, 'docs/phase-3/drafts'), { withFileTypes: true })
  requireThat(directories.every(d => d.isDirectory() && manifest.articles.some(a => a.id === 'KGNT-' + d.name)), 'unregistered draft directory')
}
export function loadManifest(root: string): SourceManifest {
  const data: unknown = JSON.parse(readFileSync(safeFile(root, 'prototype/editorial/source-manifest.json'), 'utf8'))
  validateManifest(data, root); validateSourceInventory(data, root)
  return data
}
export function selectSourceView(manifest: SourceManifest, root: string, target: { kind: 'preview'; host: string } | { kind: 'public' }): PreviewView | PublicView {
  validateManifest(manifest, root)
  if (target.kind === 'preview') {
    requireThat(target.host === '127.0.0.1', 'preview requires literal loopback 127.0.0.1')
    return { kind: 'preview', host: '127.0.0.1', articles: structuredClone(manifest.articles) }
  }
  requireThat(target.kind === 'public', 'invalid view target')
  const eligible = manifest.articles.filter(a => a.status === 'published'), ids = new Set(eligible.map(a => a.id))
  return { kind: 'public', articles: eligible.map(a => ({
    id: a.id, slug: a.slug, revision: a.revision, source: { ...a.source },
    metadata: { ...structuredClone(a.metadata), relatedArticleIds: a.metadata.relatedArticleIds.filter(id => ids.has(id)), topicIds: [] },
    assets: a.assets.map(({ id, path, sha256, alt }) => ({ id, path, sha256, alt })),
  })) }
}
// All placements (topics, related, stages, homepage) must resolve through this set.
// Registry IDs alone never authorize topic prose; topicIds remain empty in F0 PublicView.
export function resolveArticleLinks(manifest: SourceManifest, root: string, requestedIds: string[]): string[] {
  const view = selectSourceView(manifest, root, { kind: 'public' }) as PublicView
  strings(requestedIds, 'placement references')
  requireThat(requestedIds.every(id => manifest.articles.some(a => a.id === id)), 'unknown placement article')
  const eligible = new Set(view.articles.map(a => a.id))
  return requestedIds.filter(id => eligible.has(id))
}
export function legacyHashes(item: Record<string, unknown>): { contentHash: string; revisionHash: string } {
  const { publication: _publication, approval: _approval, publishedAt: _at, status: _status, ...body } = item
  return { contentHash: sha256(canonical(body)), revisionHash: sha256(canonical(body)) }
}
export function assertLegacyPublication(root: string, item: { slug: string; publishedAt?: string; publication?: LegacyPublication }, now = Date.now()) {
  const p = item.publication
  requireThat(p && typeof p.revision === 'string' && /^[a-z0-9-]+$/.test(p.revision), 'published content requires explicit approval and publication records')
  const hashes = legacyHashes(item as unknown as Record<string, unknown>)
  requireThat(p.contentHash === hashes.contentHash && p.revisionHash === hashes.revisionHash && Array.isArray(p.assets), 'legacy revision/hash mismatch')
  // Legacy reader has no asset references; no silent grants for undeclared assets.
  requireThat(p.assets.length === 0, 'legacy reader cannot publish assets')
  assertPublication(root, { id: item.slug, revision: p.revision, ...hashes, publication: p.records, publishedAt: item.publishedAt ?? null, assets: p.assets }, now)
}
