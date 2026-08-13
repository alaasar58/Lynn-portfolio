import { phoneReels } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'
import { useAutoplayVideo, webmSibling } from '../lib/useAutoplayVideo'

/**
 * Six vertical clips in phone frames — the centre of the profile page.
 *
 * The composition is what keeps this from looking like a stock six-up grid:
 * each phone sits at its own height and its own slight angle, so the two rows
 * read as prints laid out on a table rather than as a table of thumbnails.
 * Hovering straightens a phone and lifts it out of the arrangement.
 *
 * All of that is desktop-only and inside `motion-safe:`. On a narrow screen the
 * offsets and rotations collapse to a plain two-column grid — a 390px viewport
 * has no room for an arrangement, and tilted phones there just look broken.
 *
 * Playback comes from `useAutoplayVideo`, the same hook the portfolio grid
 * uses, so lazy attachment, muted autoplay, pause-on-exit and the refused-
 * autoplay fallback all behave identically in both places.
 */
export function PhoneWall() {
  return (
    <ul className="grid grid-cols-2 gap-x-5 gap-y-12 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-24">
      {phoneReels.map((reel, index) => (
        <Phone key={reel.caption} reel={reel} index={index} />
      ))}
    </ul>
  )
}

/*
 * The arrangement, split in two because the two halves move different things.
 *
 * `offsets` shift the whole figure, caption included, so a phone never slides
 * down over its own label. `tilts` rotate and scale only the phone itself,
 * which keeps every caption level and readable. Desktop only — index order
 * matches the captions, so the middle phone of each row is the one forward.
 */
const offsets = [
  'lg:translate-y-8',
  'lg:-translate-y-4',
  'lg:translate-y-10',
  'lg:translate-y-4',
  'lg:-translate-y-6',
  'lg:translate-y-8',
]

const tilts = [
  'lg:-rotate-[1.6deg]',
  'lg:rotate-[0.7deg] lg:scale-[1.06]',
  'lg:rotate-[1.8deg]',
  'lg:rotate-[1.4deg]',
  'lg:-rotate-[0.9deg] lg:scale-[1.06]',
  'lg:-rotate-[1.7deg]',
]

type PhoneProps = {
  reel: (typeof phoneReels)[number]
  index: number
}

function Phone({ reel, index }: PhoneProps) {
  const { t } = useI18n()
  const caption = t.reels.captions[reel.caption]

  const priority = index < 3
  const { containerRef, videoRef, attached, autoplayRefused, manualPlay } = useAutoplayVideo({
    enabled: true,
    priority,
  })

  const posterUrl = asset(reel.poster)
  const videoUrl = asset(reel.video)
  const webmUrl = webmSibling(videoUrl)

  return (
    <li className="flex flex-col items-center">
      <figure
        ref={containerRef}
        className={`group w-full max-w-[13rem] transition-transform duration-700 ease-[var(--ease-soft)] ${offsets[index]}`}
      >
        {/* The phone shell: outer body, then the screen inset inside it. */}
        <div
          className={`relative rounded-[1.9rem] bg-ink p-[0.35rem] shadow-[0_18px_40px_-24px_rgba(34,31,28,0.55)] transition-all duration-700 ease-[var(--ease-soft)] group-hover:shadow-[0_30px_60px_-26px_rgba(34,31,28,0.62)] motion-safe:lg:group-hover:rotate-0 motion-safe:lg:group-hover:scale-[1.08] sm:rounded-[2.2rem] sm:p-[0.45rem] ${tilts[index]}`}
        >
          <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.7rem] bg-sand-deep sm:rounded-[2rem]">
            <img
              src={posterUrl}
              alt=""
              aria-hidden="true"
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <video
              ref={videoRef}
              poster={posterUrl}
              muted
              loop
              playsInline
              preload={priority ? 'metadata' : 'none'}
              aria-label={caption}
              className="relative h-full w-full object-cover"
            >
              {attached && (
                <>
                  <source src={videoUrl} type="video/mp4" />
                  {webmUrl !== videoUrl && <source src={webmUrl} type="video/webm" />}
                </>
              )}
            </video>

            {/* Only shown when the browser refused unattended playback. */}
            {autoplayRefused && (
              <button
                type="button"
                onClick={manualPlay}
                className="absolute inset-0 flex h-full w-full items-center justify-center bg-ink/10"
              >
                <span className="sr-only">
                  {t.work.play} — {caption}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-bone/90 text-ink"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-4 w-4">
                    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                  </svg>
                </span>
              </button>
            )}
          </div>

          {/* Speaker slot. The one detail that makes the frame read as a phone. */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-[0.95rem] mx-auto h-[3px] w-10 rounded-full bg-bone/25 sm:top-[1.15rem]"
          />
        </div>
        <figcaption className="mt-5 text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft sm:text-xs">
          {caption}
        </figcaption>
      </figure>
    </li>
  )
}
