import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { editorial } from './build/editorial'

// Relative assets + HashRouter support GitHub Pages repository paths and reloads.
export default defineConfig({ plugins: [react(), editorial()], base: './', build:{sourcemap:false} })
