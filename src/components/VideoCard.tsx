import { useEffect, useRef, useState } from 'react'
import type { WorkItem } from '../content/site'

/*
 * Deterministic placeholder gradients. Until real media is dropped into
 * `public/media/work/`, each card renders a warm tonal panel instead of a
 * broken video element — the layout is final, only the footage is pending.
 */
const placeholders = [
  'from-sand-deep via-sand to-bone',
  'from-clay/35 via-sand to-bone',
  'from-sage/30 via-sand to-sand-deep',
  'from-ink/15 via-sand-deep to-sand',
]

function placeholderFor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  return placeholders[hash % placeholders.length]
}

type VideoCardProps = {
  item: WorkItem
  /** Larger cards lead the grid; used for the strongest pieces. */
  priority?: boolean
}

/**
 * A single portfolio tile.
 *
 * Video is never fetched on page load: the `<source>` is only attached once the
 * card is near the viewport, and playback starts on hover (desktop) or on tap
 * (touch), so a page full of video stays fast on mobile data.
 */
export function VideoCard({ item, priority = false }: VideoCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [nearViewport, setNearViewport] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !item.video) return
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearViewport(true)
          observer.disconnect()
        }
      },
      // Start loading a little before the card is actually on screen.
      { rootMargin: '300px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.video])

  const play = () => {
    const video = videoRef.current
    if (!video) return
    void video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }

  const pause = () => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    setPlaying(false)
  }

  const toggle = () => (playing ? pause() : play())

  return (
    <figure
      ref={containerRef}
      className="group relative overflow-hidden rounded-card bg-sand-deep"
      onMouseEnter={play}
      onMouseLeave={pause}
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {item.video ? (
          <video
            ref={videoRef}
            poster={item.poster}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          >
            {nearViewport && <source src={item.video} type="video/mp4" />}
          </video>
        ) : item.poster ? (
          <img
            src={item.poster}
            alt={item.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`flex h-full w-full items-end bg-gradient-to-br ${placeholderFor(item.id)}`}
          >
            <span className="p-5 font-display text-lg text-ink/35">{item.category}</span>
          </div>
        )}

        {/* Tap target for touch devices, where hover never fires. */}
        {item.video && (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <span className="sr-only">
              {playing ? `Pause ${item.title}` : `Play ${item.title}`}
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/75 to-transparent opacity-90" />

        {item.paid && item.brand && (
          <span className="absolute left-4 top-4 rounded-full bg-bone/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink">
            {item.brand}
          </span>
        )}
      </div>

      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-bone/70">
          {item.category}
        </p>
        <h3 className="mt-1 text-lg text-bone">{item.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-bone/70">{item.note}</p>
      </figcaption>
    </figure>
  )
}
