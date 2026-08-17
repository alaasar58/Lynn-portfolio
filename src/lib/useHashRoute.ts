import { useEffect, useState } from 'react'

/** The two legal pages that are not part of the scroll. */
export const LEGAL_ROUTES = ['imprint', 'privacy'] as const
export type LegalRoute = (typeof LEGAL_ROUTES)[number]

/**
 * Every view that replaces the site rather than extending it.
 *
 * `mosques` is the offer page for mosque congregations. It is reached from the
 * footer of a mosque's own website and is linked from nowhere on this one.
 */
export const PAGE_ROUTES = [...LEGAL_ROUTES, 'mosques'] as const
export type PageRoute = (typeof PAGE_ROUTES)[number]

export const isLegalRoute = (route: PageRoute): route is LegalRoute =>
  (LEGAL_ROUTES as readonly string[]).includes(route)

const read = (): PageRoute | null => {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.replace(/^#/, '')
  return (PAGE_ROUTES as readonly string[]).includes(hash) ? (hash as PageRoute) : null
}

/**
 * Which standalone page the address bar is asking for, or null for the site
 * itself.
 *
 * The whole site is one scrolling page, so the imprint, the privacy policy and
 * the mosque offer are the only things that need to be a *different* view. A
 * hash is enough for that and buys a lot: no router dependency, no server
 * rewrite rules, and every URL still resolves on GitHub Pages, which serves
 * exactly one HTML file and would answer a real /imprint path with a 404.
 *
 * Back and forward work because that is what `hashchange` is.
 */
export function useHashRoute() {
  const [route, setRoute] = useState<PageRoute | null>(read)

  useEffect(() => {
    const onChange = () => {
      const next = read()
      setRoute(next)

      if (next) {
        /*
         * A standalone page is a new page, so it starts at the top rather
         * than wherever the visitor happened to be on the page behind it.
         * After the frame, too: scrolling before React has swapped the content
         * leaves the browser to restore a position from the taller page.
         */
        window.scrollTo({ top: 0, behavior: 'auto' })
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
        return
      }

      /*
       * Leaving a legal page for a section of the site: the browser tried to
       * scroll to that anchor while the legal page was still what was on
       * screen, so it found nothing. Once React has put the sections back, jump
       * again — otherwise "Services" from the imprint lands at the top of the
       * page instead of at Services.
       */
      const id = window.location.hash.replace(/^#/, '')
      if (!id) return
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto' })
      })
    }

    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
