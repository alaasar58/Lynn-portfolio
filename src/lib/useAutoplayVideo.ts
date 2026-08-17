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
/**
 * How loud sound comes on. Half, never full.
 *
 * A phone frame on a portfolio page is not a cinema, and the clips behind these
 * frames were filmed on different days at different distances from the phone —
 * one of them at full volume is a fright. This is re-applied every time a tile
 * comes on screen, not just once, so a visitor who has been through the row
 * twice hears the same level both times.
 */
export const PLAY_VOLUME = 0.5

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
 *  - A tile is muted until someone presses its sound button, and it goes back
 *    to muted the moment it leaves the screen. Nothing on this page ever makes
 *    a noise the visitor did not ask for — not on hover, not on scroll.
 *  - When sound is turned on it plays at half volume. Clips are recorded at
 *    wildly different levels, and the volume is re-set on every entry rather
 *    than left where the last one had it, so the next tile cannot arrive twice
 *    as loud as the one before it.
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
    video.volume = PLAY_VOLUME
    if (video.networkState === video.NETWORK_NO_SOURCE || video.readyState === 0) {
      video.load()
    }
  }, [attached])

  // Drive playback from visibility.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !attached) return

    if (onScreen) {
      // Every arrival, not just the first: see PLAY_VOLUME above.
      video.volume = PLAY_VOLUME

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

  /** The only way sound is ever turned on. */
  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    const next = !video.muted
    video.volume = PLAY_VOLUME
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

  return {
    containerRef,
    videoRef,
    attached,
    muted,
    autoplayRefused,
    toggleSound,
    manualPlay,
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
