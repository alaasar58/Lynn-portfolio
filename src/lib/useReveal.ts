import { useEffect, useRef } from 'react'

/**
 * Fades an element in whenever it scrolls into view.
 *
 * The element carries `reveal` (offset + transparent) and gains `reveal-in`
 * while it is on screen. It loses it again once it has fully left, so the fade
 * plays every time the section is scrolled to — coming down the page or back up
 * it behaves the same, rather than only animating on the first visit.
 *
 * Deliberately keyed to "is any of it on screen" rather than to a percentage:
 * a page section is often taller than the window, and a percentage it can never
 * reach would leave it invisible for good. The negative bottom margin is what
 * holds the fade back until the section has properly arrived.
 *
 * Users who prefer reduced motion get the element revealed immediately and it
 * never resets — the CSS neutralises the transition as well.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      el.classList.add('reveal-in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('reveal-in', entry.isIntersecting)
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
