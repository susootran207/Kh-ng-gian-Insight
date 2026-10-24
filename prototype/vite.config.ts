import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative assets keep this review-only prototype portable under a repository path.
// Full article routing belongs to Phase 2; no publishing workflow is installed.
export default defineConfig({ plugins: [react()], base: './' })
