import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/*
 * `base` controls the path assets are served from.
 *
 *   - Custom domain, Netlify, Vercel, or local dev  →  "/"  (the default)
 *   - GitHub Pages project site                     →  "/<repo-name>/"
 *
 * The deploy workflow sets VITE_BASE, so moving to a custom domain later is a
 * configuration change, not a rebuild.
 */
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    // Media is served from /public; keep inlining off so videos/posters are
    // always emitted as separate, cacheable files.
    assetsInlineLimit: 2048,
  },
})
