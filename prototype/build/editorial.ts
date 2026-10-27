import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'
import type { Catalogue } from '../editorial/schema.ts'
import { loadManifest, requireThat } from './content-contract.ts'
import { assertArtifact, createBoundary, scanProduction } from './publication-scan.ts'

import { createPublicLibrary } from './public-library.ts'
import { selectContent as selectCatalogue } from './select-content.ts'

export const repositoryRoot = fileURLToPath(new URL('../../', import.meta.url))
// Publication is a code-reviewed build action. Legacy approval fields alone never grant it.
export function selectContent(data: Catalogue, development: boolean, root = repositoryRoot): Catalogue { return selectCatalogue(data, development, root) }
export function editorial(root = repositoryRoot, snapshot = Date.now()): Plugin {
  let development = false, output = ''
  const source = {pathname:resolve(root,'prototype/editorial/catalogue.json')}
  const manifestPath = resolve(root, 'prototype/editorial/source-manifest.json')
  const catalogue = () => JSON.parse(readFileSync(source.pathname, 'utf8')) as Catalogue
  return {
    name: 'publication-boundary',
    configResolved(config) {
      development = config.command === 'serve'
      output = resolve(config.root, config.build.outDir)
      if (!development) requireThat(!config.build.sourcemap, 'public source maps are not allowed')
    },
    buildStart() {
      const manifest = loadManifest(root,snapshot)
      // Build-side watch only; only eligible SVG bytes may be emitted below.
      this.addWatchFile(manifestPath)
      for (const a of manifest.articles) for (const file of [a.source, ...Object.values(a.dossiers), ...a.assets]) this.addWatchFile(resolve(root, file.path))
    },
    resolveId(id) { if (id === 'virtual:editorial') return '\0virtual:editorial' },
    load(id) {
      if (id !== '\0virtual:editorial') return
      this.addWatchFile(source.pathname)
      loadManifest(root,snapshot)
      const release = createPublicLibrary(root, catalogue(),loadManifest(root,snapshot),snapshot)
      const selected = development && !release.catalogue.articles.length ? selectCatalogue(catalogue(), true, root, snapshot) : release.catalogue
      if (!development) for (const asset of release.assets) this.emitFile({type:'asset',fileName:asset.url.slice(1),source:asset.bytes})
      // Serialize only the F0-selected Reader/card DTO; never SourceManifest/PreviewView/proof.
      return `export default ${JSON.stringify(selected)}`
    },
    generateBundle(_options, bundle) {
      const boundary = createBoundary(root, loadManifest(root,snapshot), catalogue(),snapshot)
      for (const [name, item] of Object.entries(bundle)) {
        if (item.type === 'chunk') requireThat(Object.keys(item.modules ?? {}).every(id => !/[/\\]tests[/\\](?:fixtures|reader-harness)[/\\]/.test(id) && !id.includes('virtual:r1-fixture') && !id.includes('virtual:c1-preview') && !id.includes('virtual:w1-fixture') && !id.includes('virtual:d1-fixture') && !id.includes('virtual:p2-fixture') && !id.includes('virtual:w2-preview') && !/[/\\]weekly-preview[/\\]/.test(id) && !id.includes('p2-preview') && !/[/\\]editorial[/\\]weekly\.json(?:\?|$)/.test(id) && !/[/\\]tests[/\\](?:weekly|flow)-harness[/\\]/.test(id) && !/[/\\]preview[/\\]/.test(id)), 'test-only Reader module entered public graph')
        const value = item.type === 'chunk' ? item.code : item.source
        assertArtifact(Buffer.from(value), name, boundary)
      }
    },
    writeBundle() { scanProduction(root, output, loadManifest(root,snapshot), catalogue(),snapshot) },
    configureServer(server) {
      server.middlewares.use((req,res,next)=>{
        if(!req.url?.startsWith('/assets/articles/'))return next()
        const asset=createPublicLibrary(root,catalogue(),loadManifest(root,snapshot),snapshot).assets.find(a=>a.url===req.url)
        if(!asset){res.statusCode=404;res.end();return}
        res.setHeader('Content-Type','image/svg+xml');res.end(asset.bytes)
      })
    },
    handleHotUpdate(ctx) { if (ctx.file === source.pathname || ctx.file === manifestPath) ctx.server.ws.send({ type: 'full-reload' }) },
  }
}
