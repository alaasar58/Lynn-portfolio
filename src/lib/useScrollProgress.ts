import { useEffect, useRef } from 'react'

/**
 * How far an element has travelled through the window, as a CSS variable.
 *
 * The element gets `--p`: 0 when its top edge is at the bottom of the window,
 * 1 when its bottom edge has reached the top. Anything inside it can then move
 * with the scroll — `translateY(calc(var(--p) * -3rem))` and so on — without a
 * single React re-render, because the value never enters the component tree.
 *
 * Written on a `requestAnimationFrame`, one write per frame at most, and only
 * while the element is anywhere near the window. A scroll handler that touches
 * the DOM on every event is the classic way to make a page feel heavy, and this
 * page has six autoplaying videos on it already.
 *
 * Reduced motion pins it at 0.5 — the middle of the range, so a layout built
 * around it still sits where it was designed to, it just stops moving.
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '0.5')
      return
    }

    let frame = 0
    let near = true

    const write = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const total = window.innerHeight + rect.height
      const travelled = window.innerHeight - rect.top
      const p = Math.min(Math.max(travelled / total, 0), 1)
      el.style.setProperty('--p', p.toFixed(4))
    }

    const onScroll = () => {
      if (!near || frame) return
      frame = requestAnimationFrame(write)
    }

    /* Nothing is computed while the band is far off screen. The margin keeps it
       updating slightly before it appears, so it never pops into position. */
    const observer = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting
        if (near) write()
      },
      { rootMargin: '40% 0px 40% 0px' },
    )
    observer.observe(el)

    write()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
