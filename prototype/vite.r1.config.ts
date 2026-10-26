import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig, mergeConfig, type Plugin } from 'vite'
import normalConfig from './vite.config'
import { compileReaderDocument, loadReaderAsset } from './build/reader-document.ts'
import { readReference, sha256 } from './build/content-contract.ts'

const root = fileURLToPath(new URL('./', import.meta.url))
const fixturePath = 'tests/fixtures/reader/article.md', assetPath = 'tests/fixtures/reader/reader-long-figure.svg'
const assetUrl = '/__r1_assets/reader-long-figure.svg'
function fixturePlugin(): Plugin {
  return {
    name: 'r1-fixture-harness-only',
    configResolved(config) {
      if (config.command !== 'serve' || config.server.host !== '127.0.0.1') throw new Error('R1 fixture harness is serve-only on 127.0.0.1')
    },
    resolveId(id) { if (id === 'virtual:r1-fixture') return '\0virtual:r1-fixture' },
    load(id) {
      if (id !== '\0virtual:r1-fixture') return
      const bytes = readFileSync(resolve(root, assetPath))
      const asset = loadReaderAsset(root, { path: assetPath, sha256: sha256(bytes) }, 'reader-long-figure.svg', assetUrl)
      const source = readFileSync(resolve(root, fixturePath), 'utf8')
      this.addWatchFile(resolve(root, fixturePath)); this.addWatchFile(resolve(root, assetPath))
      return 'export default ' + JSON.stringify({ fixtureId: 'F0_FIXTURE_ONLY_R1_READER', title: 'Một buổi đọc thử trong khu vườn', description: 'Một trang giả lập để kiểm cách trình bày, điều hướng và xem hình. Có thể đọc chậm, bỏ qua hoạt động hoặc xem gợi ý phản hồi.', document: compileReaderDocument(source, [asset]) })
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/__r1_assets/')) {
          if (req.url !== assetUrl) { res.statusCode = 404; res.end(); return }
          const bytes = readFileSync(resolve(root, assetPath))
          loadReaderAsset(root, { path: assetPath, sha256: sha256(bytes) }, 'reader-long-figure.svg', assetUrl)
          res.setHeader('Content-Type', 'image/svg+xml'); res.setHeader('Cache-Control', 'no-store'); res.end(readReference(root, { path: assetPath, sha256: sha256(bytes) })); return
        }
        next()
      })
    },
    handleHotUpdate(ctx) {
      if ([fixturePath, assetPath].some(path => ctx.file === resolve(root, path))) ctx.server.ws.send({ type: 'full-reload' })
    },
  }
}
export default defineConfig(mergeConfig(normalConfig, {
  plugins: [fixturePlugin()],
  optimizeDeps: { entries: ['tests/reader-harness/index.html'] },
  server: { host: '127.0.0.1', port: 4190, strictPort: true, fs: { allow: [root] } },
}))
