import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { editorial } from './build/editorial'
import { weekly } from './build/weekly-plugin'

const snapshot = Date.now()
// Relative assets + HashRouter support GitHub Pages repository paths and reloads.
export default defineConfig({ plugins: [react(), editorial(undefined,snapshot), weekly(snapshot)], base: './', optimizeDeps: { entries: ['index.html'] }, build:{sourcemap:false} })
