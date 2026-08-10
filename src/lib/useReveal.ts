import { useEffect, useRef } from 'react'

/**
 * Reveals an element once it scrolls into view.
 *
 * The element starts with the `reveal` class (offset + transparent) and gains
 * `reveal-in` when it enters the viewport. Observation stops after the first
 * reveal so nothing re-animates on scroll-back. Users who prefer reduced motion
 * get the element revealed immediately — the CSS neutralises the transition too.
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
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}
