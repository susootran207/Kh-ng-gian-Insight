import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import type { Catalogue } from '../editorial/schema.ts'
import { assertLegacyPublication, loadManifest, requireThat } from './content-contract.ts'
import { assertArtifact, createBoundary, scanProduction } from './publication-scan.ts'

export const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url))
// Publication is a code-reviewed build action. Legacy approval fields alone never grant it.
export function selectContent(data: Catalogue, development: boolean, root = repositoryRoot): Catalogue {
  const seen = new Set<string>()
  for (const item of [...data.articles, ...data.topics]) {
    requireThat(typeof item.slug === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item.slug), 'invalid editorial slug')
    const key = ('sections' in item ? 'article:' : 'topic:') + item.slug
    requireThat(!seen.has(key), 'duplicate editorial slug'); seen.add(key)
    requireThat(['draft','in_review','approved','published'].includes(item.status), 'invalid editorial status')
    if (item.status === 'published') assertLegacyPublication(root, item)
  }
  const allSlugs = new Set(data.articles.map(a => a.slug))
  for (const article of data.articles) {
    const ids = article.sections.map(section => section.id)
    requireThat(new Set(ids).size === ids.length && ids.every(id => /^[a-z0-9-]+$/.test(id)), 'invalid heading anchors')
    requireThat(article.sources.every(source => { const url = new URL(source.url); return url.protocol === 'https:' && !url.username && !url.password }), 'references must use HTTPS')
  }
  for (const topic of data.topics) requireThat(topic.articleSlugs.every(slug => allSlugs.has(slug)) && new Set(topic.articleSlugs).size === topic.articleSlugs.length, 'invalid topic article references')
  const articles = data.articles.filter(item => development || item.status === 'published')
  const slugs = new Set(articles.map(item => item.slug))
  const topics = data.topics.filter(item => development || item.status === 'published').map(item => ({ ...item, articleSlugs: item.articleSlugs.filter(slug => slugs.has(slug)) }))
  return { articles, topics }
}
export function editorial(): Plugin {
  let development = false, output = ''
  const source = new URL('../editorial/catalogue.json', import.meta.url)
  const manifestPath = resolve(repositoryRoot, 'prototype/editorial/source-manifest.json')
  const catalogue = () => JSON.parse(readFileSync(source, 'utf8')) as Catalogue
  return {
    name: 'publication-boundary',
    configResolved(config) {
      development = config.command === 'serve'
      output = resolve(config.root, config.build.outDir)
      if (!development) requireThat(!config.build.sourcemap, 'public source maps are not allowed')
    },
    buildStart() {
      const manifest = loadManifest(repositoryRoot)
      // Build-side watch only, never a raw content import or emitFile.
      this.addWatchFile(manifestPath)
      for (const a of manifest.articles) for (const file of [a.source, ...Object.values(a.dossiers), ...a.assets]) this.addWatchFile(resolve(repositoryRoot, file.path))
    },
    resolveId(id) { if (id === 'virtual:editorial') return '\0virtual:editorial' },
    load(id) {
      if (id !== '\0virtual:editorial') return
      this.addWatchFile(source.pathname)
      loadManifest(repositoryRoot)
      const selected = selectContent(catalogue(), development)
      // Only the existing legacy UI catalogue is serialized; no SourceManifest/PreviewView.
      return `export default ${JSON.stringify(selected)}`
    },
    generateBundle(_options, bundle) {
      const boundary = createBoundary(repositoryRoot, loadManifest(repositoryRoot), catalogue())
      for (const [name, item] of Object.entries(bundle)) {
        const value = item.type === 'chunk' ? item.code : item.source
        assertArtifact(Buffer.from(value), name, boundary)
      }
    },
    writeBundle() { scanProduction(repositoryRoot, output, loadManifest(repositoryRoot), catalogue()) },
    handleHotUpdate(ctx) { if (ctx.file === source.pathname || ctx.file === manifestPath) ctx.server.ws.send({ type: 'full-reload' }) },
  }
}
