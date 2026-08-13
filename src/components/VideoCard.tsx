import type { WorkItem } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'
import { useAutoplayVideo, webmSibling } from '../lib/useAutoplayVideo'

type VideoCardProps = {
  item: WorkItem
  /** Skips lazy loading for the first cards, which are visible immediately. */
  priority?: boolean
}

/**
 * A portfolio tile that plays itself.
 *
 * `playsInline` keeps iOS from hijacking the video into fullscreen, and a sound
 * toggle sits on the card so audio is always one tap away. Everything else
 * about playback — lazy attachment, muted autoplay on entry, pause on exit and
 * the refused-autoplay fallback — lives in `useAutoplayVideo`, shared with the
 * phone frames on the profile page.
 */
export function VideoCard({ item, priority = false }: VideoCardProps) {
  const { t } = useI18n()
  const { containerRef, videoRef, attached, muted, autoplayRefused, toggleSound, manualPlay } =
    useAutoplayVideo({ enabled: Boolean(item.video), priority })

  const posterUrl = asset(item.poster)
  const videoUrl = asset(item.video)
  const webmUrl = webmSibling(videoUrl)
  const labels = t.work.items[item.id as keyof typeof t.work.items]
  const title = labels?.title ?? item.id
  const note = labels?.note ?? ''

  return (
    <figure
      ref={containerRef}
      className="group relative h-full overflow-hidden rounded-card bg-sand-deep"
    >
      <div className="relative h-full w-full overflow-hidden">
        {posterUrl && (
          <img
            src={posterUrl}
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
            poster={posterUrl}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            aria-label={title}
            className="relative h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          >
            {attached && (
              <>
                <source src={videoUrl} type="video/mp4" />
                {webmUrl !== videoUrl && <source src={webmUrl} type="video/webm" />}
              </>
            )}
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
