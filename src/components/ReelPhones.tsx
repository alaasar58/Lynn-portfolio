import { useState } from 'react'
import { featuredReels, reelUrl, site } from '../content/site'
import type { Reel } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'
import { useAutoplayVideo, webmSibling } from '../lib/useAutoplayVideo'
import { InstagramGlyph } from './Glyphs'
import { PhoneFrame } from './PhoneFrame'
import { VideoLightbox } from './VideoLightbox'

/* The middle phone of each row sits higher, so a row reads as a composition
   rather than as three equal boxes. Desktop only. */
const offsets = [
  'sm:translate-y-4',
  'sm:-translate-y-3',
  'sm:translate-y-5',
  'sm:translate-y-3',
  'sm:-translate-y-4',
  'sm:translate-y-4',
]

/**
 * Six frames, one per topic, captioned underneath.
 *
 * They start themselves and loop, muted, once they scroll into view — the way
 * short-form video behaves everywhere else. They stay muted until someone
 * presses the sound button on a phone, and go back to muted as soon as that
 * phone leaves the screen. Moving the pointer over a tile does nothing: sound
 * that arrives because a cursor passed by is sound nobody asked for, and it
 * never worked on a touch screen anyway.
 *
 * Clicking opens the clip large, with controls. That click is also the user
 * activation browsers want before sound, so the large version is the one place
 * where audio reliably starts on its own.
 */
export function ReelPhones() {
  const { t } = useI18n()
  const [active, setActive] = useState<Reel | null>(null)
  const instagram = site.socials.find((social) => social.label === 'Instagram')

  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <h3 className="font-display text-2xl">{t.work.featuredHeading}</h3>
        {instagram && (
          <a
            href={instagram.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-sm text-ink-soft underline-offset-4 transition-colors duration-300 hover:text-blush-deep hover:underline"
          >
            <InstagramGlyph />
            {t.work.viewProfile}
            <span dir="ltr" className="text-ink-muted">
              {instagram.handle}
            </span>
          </a>
        )}
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:mt-14 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-16">
        {featuredReels.map((reel, index) => (
          <ReelPhone key={reel.id} reel={reel} index={index} onOpen={setActive} />
        ))}
      </ul>

      <VideoLightbox reel={active} onClose={() => setActive(null)} />
    </>
  )
}

type ReelPhoneProps = {
  reel: Reel
  index: number
  onOpen: (reel: Reel) => void
}

function ReelPhone({ reel, index, onOpen }: ReelPhoneProps) {
  const { t } = useI18n()
  const hasVideo = Boolean(reel.video)
  const { containerRef, videoRef, attached, muted, autoplayRefused, toggleSound } =
    useAutoplayVideo({ enabled: hasVideo, priority: index === 0 })

  const posterUrl = asset(reel.poster)
  const videoUrl = asset(reel.video)
  const webmUrl = webmSibling(videoUrl)

  return (
    <li
      ref={containerRef as React.RefObject<HTMLLIElement>}
      /* Three items in two columns leave an orphan on the last row; letting it
         span both columns centres it instead of stranding it on the left. */
      className={`mx-auto w-full max-w-[15rem] transition-transform duration-700 ease-[var(--ease-soft)] ${offsets[index] ?? ''}`}
    >
      <PhoneFrame className="group hover:shadow-[0_32px_60px_-28px_rgba(34,31,28,0.6)]">
        {hasVideo ? (
          <video
            ref={videoRef}
            poster={posterUrl}
            muted
            loop
            playsInline
            preload={index === 0 ? 'metadata' : 'none'}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {attached && (
              <>
                <source src={videoUrl} type="video/mp4" />
                {webmUrl !== videoUrl && <source src={webmUrl} type="video/webm" />}
              </>
            )}
          </video>
        ) : (
          /* No clip uploaded for this frame yet — the photo stands on its own,
             with no player and no sound button, because there is nothing to
             play. Adding `video` to this entry turns it back into a clip. */
          <img
            src={posterUrl}
            alt=""
            aria-hidden="true"
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
          />
        )}

        {/* The whole screen opens the clip large. */}
        {hasVideo && (
          <button
            type="button"
            onClick={() => onOpen(reel)}
            className="absolute inset-0 z-10 flex h-full w-full items-center justify-center"
          >
            <span className="sr-only">
              {t.work.play} — {t.work.reelBadge}
            </span>
            {/* The play mark only appears when the tile is not already moving:
              on a still tile it says "this is a video", on a playing one it
              would just sit in the way. */}
            {autoplayRefused && (
              <span
                aria-hidden="true"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-bone/90 text-ink shadow-lg shadow-ink/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-blush-deep group-hover:text-bone"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-4 w-4">
                  <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                </svg>
              </span>
            )}
          </button>
        )}

        {/*
          The way to sound — the only way. A real press, which is also the
          user gesture browsers require before they will unmute anything.
          Sits above the screen button.
        */}
        {hasVideo && (
          <button
            type="button"
            onClick={toggleSound}
            /* Always visible now, on every screen: it is the only route to sound,
               and a control you have to hover to discover is a control most
               people never find. */
            className="absolute bottom-8 end-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-ink/50 text-bone backdrop-blur-sm transition-colors duration-300 hover:bg-blush-deep"
          >
            <span className="sr-only">{muted ? t.work.unmute : t.work.mute}</span>
            <SoundGlyph muted={muted} />
          </button>
        )}
      </PhoneFrame>

      <p className="mt-5 text-center text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ink-soft sm:text-xs">
        {t.work.captions[reel.id]}
      </p>

      {/* Direct route to the original post, when this clip is one. */}
      {reel.code && (
        <a
          href={reelUrl(reel.code)}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-2 flex items-center justify-center gap-1.5 text-xs text-ink-muted underline-offset-4 transition-colors duration-300 hover:text-blush-deep hover:underline"
        >
          <InstagramGlyph className="h-3.5 w-3.5" />
          {t.work.watchOnInstagram}
        </a>
      )}
    </li>
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
      className="h-3.5 w-3.5"
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
