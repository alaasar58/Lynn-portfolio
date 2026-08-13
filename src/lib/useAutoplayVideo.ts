import { useEffect, useRef, useState } from 'react'

type Options = {
  /** False for items with no video at all — the hook then does nothing. */
  enabled: boolean
  /** Skips lazy attachment for tiles that are visible on first paint. */
  priority?: boolean
}

/**
 * Whether the visitor has asked their system for less motion.
 *
 * Read once per call rather than subscribed to: the setting effectively never
 * changes mid-visit, and a listener here would re-render every tile.
 */
function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * The playback behaviour shared by every moving tile on the site: the portfolio
 * grid and the phone frames.
 *
 * It follows how short-form video works on social platforms:
 *
 *  - The source is attached only once the element approaches the viewport, so a
 *    page full of video costs nothing on load.
 *  - Playback starts automatically, muted and looping, when the element is
 *    actually on screen, and pauses when it scrolls away — off-screen video
 *    should never burn battery or bandwidth.
 *  - Sound is always one tap away, and muting resets on exit so a tile never
 *    starts talking unprompted the next time it scrolls back.
 *
 * Browsers only permit unattended playback while muted. If a play attempt is
 * refused anyway (some power-saving and data-saver modes), `autoplayRefused`
 * goes true and the caller shows a play button — a tile is never left dead.
 */
export function useAutoplayVideo({ enabled, priority = false }: Options) {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [attached, setAttached] = useState(priority)
  const [onScreen, setOnScreen] = useState(false)
  const [muted, setMuted] = useState(true)
  const [autoplayRefused, setAutoplayRefused] = useState(false)

  // Attach the source early, then track whether the tile is actually visible.
  useEffect(() => {
    const el = containerRef.current
    if (!el || !enabled) return
    if (!('IntersectionObserver' in window)) {
      setAttached(true)
      setOnScreen(true)
      return
    }

    const preload = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setAttached(true)
          preload.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )

    // A tile counts as "on screen" once a quarter of it is showing, which
    // avoids starting playback for tiles only just clipping the edge.
    const visibility = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setOnScreen(entry.isIntersecting)
      },
      { threshold: 0.25 },
    )

    preload.observe(el)
    visibility.observe(el)
    return () => {
      preload.disconnect()
      visibility.disconnect()
    }
  }, [enabled])

  /*
   * A <video> rendered without any <source> has already reported "no source" by
   * the time lazy attachment adds one. Appending a child does not restart that
   * process on its own — the element has to be told to look again. Without this
   * the tile shows a frozen poster and nothing else.
   */
  useEffect(() => {
    const video = videoRef.current
    if (!video || !attached) return
    if (video.networkState === video.NETWORK_NO_SOURCE || video.readyState === 0) {
      video.load()
    }
  }, [attached])

  // Drive playback from visibility.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !attached) return

    if (onScreen) {
      // Someone who has asked their system for less motion gets the poster and
      // a play button, not a tile that starts moving at them.
      if (prefersReducedMotion()) {
        setAutoplayRefused(true)
        return
      }
      const attempt = video.play()
      if (attempt) {
        attempt.then(() => setAutoplayRefused(false)).catch(() => setAutoplayRefused(true))
      }
    } else {
      video.pause()
      if (!video.muted) {
        video.muted = true
        setMuted(true)
      }
    }
  }, [onScreen, attached])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !video.muted
    video.muted = next
    setMuted(next)
    // Unmuting counts as a user gesture, so this is also the moment a refused
    // autoplay can finally start.
    if (!next) void video.play().catch(() => undefined)
  }

  const manualPlay = () => {
    const video = videoRef.current
    if (!video) return
    void video
      .play()
      .then(() => setAutoplayRefused(false))
      .catch(() => undefined)
  }

  /*
   * Sound on hover.
   *
   * Worth being clear about the limit: unmuting is only permitted once the page
   * has user activation, which a pointer moving over an element does not grant.
   * In practice the first hover of a visit can be refused and every hover after
   * the visitor's first click anywhere on the page succeeds. There is no way to
   * do better, which is why the sound button exists alongside this.
   *
   * The one rule that must hold either way: a refusal never stops playback. The
   * tile keeps running muted rather than freezing.
   */
  const hoverSound = (on: boolean) => {
    const video = videoRef.current
    if (!video || !attached || autoplayRefused) return

    if (!on) {
      video.muted = true
      setMuted(true)
      return
    }

    video.muted = false
    setMuted(false)
    void video.play().catch(() => {
      video.muted = true
      setMuted(true)
      // Playback may have been paused by the failed unmute; start it again.
      void video.play().catch(() => undefined)
    })
  }

  return {
    containerRef,
    videoRef,
    attached,
    muted,
    autoplayRefused,
    toggleSound,
    manualPlay,
    hoverSound,
  }
}

/**
 * A WebM sibling of the same name, offered after the MP4.
 *
 * A browser picks the first source it can actually decode. Chrome, Safari, Edge
 * and iOS all take the MP4, so replacing that one file is enough for
 * effectively every visitor. The WebM is only ever reached by Chromium builds
 * shipped without the H.264 decoder — common on Linux — which would otherwise
 * show a frozen cover image instead of a playing video.
 */
export const webmSibling = (url?: string) => url?.replace(/\.mp4$/, '.webm')
