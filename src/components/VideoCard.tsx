import { useEffect, useRef, useState } from 'react'
import type { WorkItem } from '../content/site'
import { useI18n } from '../i18n'

type VideoCardProps = {
  item: WorkItem
  /** Skips lazy loading for the first cards, which are visible immediately. */
  priority?: boolean
}

/**
 * A portfolio tile that plays itself.
 *
 * Behaviour follows how short-form video works on social platforms:
 *
 *  - The source is attached only once the card approaches the viewport, so a
 *    page full of video costs nothing on load.
 *  - Playback starts automatically, muted and looping, when the card is
 *    actually on screen, and pauses again when it scrolls away — off-screen
 *    video should never burn battery or bandwidth.
 *  - `playsInline` keeps iOS from hijacking the video into fullscreen.
 *  - A sound toggle sits on the card, so audio is always one tap away.
 *
 * Browsers only permit unattended playback while muted. If a play attempt is
 * refused anyway (some power-saving and data-saver modes), the poster stays put
 * and a play button appears — the visitor is never left with a dead tile.
 */
export function VideoCard({ item, priority = false }: VideoCardProps) {
  const { t } = useI18n()
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [attached, setAttached] = useState(priority)
  const [onScreen, setOnScreen] = useState(false)
  const [muted, setMuted] = useState(true)
  const [autoplayRefused, setAutoplayRefused] = useState(false)

  const labels = t.work.items[item.id as keyof typeof t.work.items]
  const title = labels?.title ?? item.id
  const note = labels?.note ?? ''

  // Attach the source early, then track whether the card is actually visible.
  useEffect(() => {
    const el = containerRef.current
    if (!el || !item.video) return
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

    // A card counts as "on screen" once a quarter of it is showing, which
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
  }, [item.video])

  // Drive playback from visibility.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !attached) return

    if (onScreen) {
      const attempt = video.play()
      if (attempt) {
        attempt.then(() => setAutoplayRefused(false)).catch(() => setAutoplayRefused(true))
      }
    } else {
      video.pause()
      // Muting again on exit means a card never starts talking unprompted the
      // next time it scrolls back into view.
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

  return (
    <figure
      ref={containerRef}
      className="group relative h-full overflow-hidden rounded-card bg-sand-deep"
    >
      <div className="relative h-full w-full overflow-hidden">
        {item.poster && (
          <img
            src={item.poster}
            alt=""
            aria-hidden="true"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {item.video && (
          <video
            ref={videoRef}
            poster={item.poster}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            aria-label={title}
            className="relative h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          >
            {attached && <source src={item.video} type="video/mp4" />}
          </video>
        )}

        {/* Legibility wash for the caption. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />

        {/* Only shown when the browser refused unattended playback. */}
        {autoplayRefused && item.video && (
          <button
            type="button"
            onClick={manualPlay}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            <span className="sr-only">
              {t.work.play} — {title}
            </span>
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-bone/85 text-ink shadow-sm transition-transform duration-500 group-hover:scale-110"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-5 w-5">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
          </button>
        )}

        {item.video && !autoplayRefused && (
          <button
            type="button"
            onClick={toggleSound}
            className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/45 text-bone backdrop-blur-sm transition-colors duration-300 hover:bg-blush-deep focus-visible:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <span className="sr-only">{muted ? t.work.unmute : t.work.mute}</span>
            <SoundGlyph muted={muted} />
          </button>
        )}

        {/*
          A confirmed brand collaboration always carries its badge — that
          distinction matters. The neutral "portfolio work" label is hidden on
          the narrowest tiles, where it would collide with the sound toggle.
        */}
        <span
          className={`absolute start-3 top-3 max-w-[60%] truncate rounded-full px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] ${
            item.paid
              ? 'bg-blush-deep text-bone'
              : 'hidden bg-bone/85 text-ink-soft sm:inline-block'
          }`}
        >
          {item.paid ? (item.brand ?? t.work.collaborationBadge) : t.work.portfolioBadge}
        </span>
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.62rem] font-medium uppercase tracking-[0.16em] text-blush">
          {t.work.categories[item.category]}
        </p>
        <h3 className="mt-1.5 text-lg leading-snug text-bone">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-bone/75">{note}</p>
      </figcaption>
    </figure>
  )
}

function SoundGlyph({ muted }: { muted: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M11 5 6.5 9H3v6h3.5L11 19V5Z" />
      {muted ? (
        <>
          <path d="m16 9.5 4 5" />
          <path d="m20 9.5-4 5" />
        </>
      ) : (
        <>
          <path d="M15.5 9.2a4 4 0 0 1 0 5.6" />
          <path d="M18.2 6.8a7.5 7.5 0 0 1 0 10.4" />
        </>
      )}
    </svg>
  )
}
