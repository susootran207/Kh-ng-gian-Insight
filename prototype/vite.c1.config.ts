import { fileURLToPath } from 'node:url'
import { defineConfig, mergeConfig } from 'vite'
import normalConfig from './vite.config'
import { contentPreviewPlugin } from './build/content-preview-server.ts'
const root = fileURLToPath(new URL('./', import.meta.url))
export default defineConfig(mergeConfig(normalConfig, {
  plugins: [contentPreviewPlugin()],
  optimizeDeps: { entries: ['preview/index.html'] },
  server: { host: '127.0.0.1', port: 4191, strictPort: true, cors: false, fs: { allow: [root] } },
}))
