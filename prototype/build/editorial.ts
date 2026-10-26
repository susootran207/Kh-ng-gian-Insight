import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import type { Catalogue } from '../editorial/schema.ts'
import { loadManifest, requireThat } from './content-contract.ts'
import { assertArtifact, createBoundary, scanProduction } from './publication-scan.ts'

import { selectContent as selectCatalogue } from './select-content.ts'

export const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url))
// Publication is a code-reviewed build action. Legacy approval fields alone never grant it.
export function selectContent(data: Catalogue, development: boolean, root = repositoryRoot): Catalogue { return selectCatalogue(data, development, root) }
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
        if (item.type === 'chunk') requireThat(Object.keys(item.modules ?? {}).every(id => !/[/\\]tests[/\\](?:fixtures|reader-harness)[/\\]/.test(id) && !id.includes('virtual:r1-fixture') && !id.includes('virtual:c1-preview') && !id.includes('virtual:w1-fixture') && !/[/\\]editorial[/\\]weekly\.json(?:\?|$)/.test(id) && !/[/\\]tests[/\\]weekly-harness[/\\]/.test(id) && !/[/\\]preview[/\\]/.test(id)), 'test-only Reader module entered public graph')
        const value = item.type === 'chunk' ? item.code : item.source
        assertArtifact(Buffer.from(value), name, boundary)
      }
    },
    writeBundle() { scanProduction(repositoryRoot, output, loadManifest(repositoryRoot), catalogue()) },
    handleHotUpdate(ctx) { if (ctx.file === source.pathname || ctx.file === manifestPath) ctx.server.ws.send({ type: 'full-reload' }) },
  }
}
