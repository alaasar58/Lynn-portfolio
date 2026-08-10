/**
 * Resolves a path from `public/` against the site's base URL.
 *
 * Media paths are written as plain absolute paths in `src/content/site.ts`
 * (`/media/work/morning-light.mp4`) so they stay readable and easy to edit. But
 * the site is served from a sub-path on GitHub Pages
 * (`/Lynn-portfolio/`), where a bare `/media/...` URL would resolve against the
 * domain root and 404. Vite rewrites such paths inside `index.html` and CSS,
 * but not strings in application code — this does it for those.
 *
 * `BASE_URL` is `/` in dev and on a custom domain, so this is a no-op there.
 */
export function asset(path?: string): string | undefined {
  if (!path) return undefined
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}
