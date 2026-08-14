import { useEffect, useRef, useState } from 'react'

/** Fast at the start, gliding into the final number rather than stopping dead. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)

const DURATION = 1400

/**
 * Counts a figure up from zero once it scrolls into view.
 *
 * Returns the element to watch and the number to print. The number is the real
 * one from `src/content/site.ts` — the animation only decides how quickly it
 * gets there, and it always lands exactly on the value, never on a rounded
 * approximation of it.
 *
 * It resets when the figure leaves the screen, so scrolling back up plays it
 * again. That matches `useReveal`, which fades sections in every time they are
 * scrolled to rather than only on the first visit; a number that counted once
 * and then sat still next to a section that keeps fading in would look broken.
 *
 * Reduced motion, or a browser without IntersectionObserver, gets the finished
 * figure immediately. A count-up is decoration; the number is the content.
 */
export function useCountUp<T extends HTMLElement = HTMLElement>(target: number) {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(0)
  const frame = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || !('IntersectionObserver' in window)) {
      setValue(target)
      return
    }

    const run = (start: number) => (now: number) => {
      const t = Math.min((now - start) / DURATION, 1)
      setValue(Math.round(target * easeOut(t)))
      if (t < 1) frame.current = requestAnimationFrame(run(start))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          cancelAnimationFrame(frame.current)
          if (entry.isIntersecting) {
            frame.current = requestAnimationFrame(run(performance.now()))
          } else {
            setValue(0)
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame.current)
    }
  }, [target])

  return [ref, value] as const
}
