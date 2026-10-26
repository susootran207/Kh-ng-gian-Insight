import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'
import { createContentPreview, previewAssetUrl } from './content-preview.ts'
import { loadManifest, readReference, requireThat } from './content-contract.ts'
import { loadReaderAsset } from './reader-document.ts'
const root = fileURLToPath(new URL('../', import.meta.url)), repo = resolve(root, '..')
export function contentPreviewPlugin(): Plugin {
  return {
    name: 'c1-loopback-preview-only',
    configResolved(config) {
      requireThat(config.command === 'serve' && config.server.host === '127.0.0.1', 'C1 preview is serve-only on literal 127.0.0.1')
      requireThat(config.server.port === 4191 && !config.server.https, 'C1 preview requires loopback port 4191')
    },
    resolveId(id) { if (id === 'virtual:c1-preview') return '\0virtual:c1-preview' },
    load(id) {
      if (id !== '\0virtual:c1-preview') return
      const view = createContentPreview(repo, '127.0.0.1')
      const manifest = loadManifest(repo)
      this.addWatchFile(resolve(root, 'editorial/source-manifest.json'))
      for (const a of manifest.articles) for (const f of [a.source, ...Object.values(a.dossiers), ...a.assets]) this.addWatchFile(resolve(repo, f.path))
      return 'export default ' + JSON.stringify(view)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const setHeader = res.setHeader.bind(res)
        // Vite normally replaces this with no-cache for HTML/JS; retain no-store.
        res.setHeader = (name, value) => setHeader(name, name.toLowerCase() === 'cache-control' ? 'no-store' : value)
        res.setHeader('Cache-Control', 'no-store')
        res.setHeader('X-Content-Type-Options', 'nosniff')
        const origin = req.headers.origin
        if (req.headers.host !== '127.0.0.1:4191' || (origin && origin !== 'http://127.0.0.1:4191')) { res.statusCode = 403; res.end('Loopback preview only'); return }
        // Reject raw Markdown/JSON even when a client normalizes a traversal URL.
        if (/\.(?:md|json)(?:$|\?)/i.test(req.url ?? '')) { res.statusCode = 404; res.end(); return }
        // Raw drafts/dossiers are never HTTP resources. Only compiled AST and exact SVG paths.
        if (req.url?.startsWith('/__c1_assets/')) {
          const manifest = loadManifest(repo)
          for (const a of manifest.articles) for (const file of a.assets) {
            const key = file.path.split('/').at(-1)!
            if (req.url === previewAssetUrl(a.id, file.sha256, key)) {
              loadReaderAsset(repo, file, key, req.url)
              res.setHeader('Content-Type', 'image/svg+xml'); res.end(readReference(repo, file)); return
            }
          }
          res.statusCode = 404; res.end(); return
        }
        next()
      })
    },
    handleHotUpdate(ctx) {
      if (ctx.file.includes('/docs/phase-3/drafts/') || ctx.file.endsWith('/editorial/source-manifest.json')) ctx.server.ws.send({ type: 'full-reload' })
    },
  }
}
