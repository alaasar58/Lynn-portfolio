import { useState } from 'react'
import { featuredReels, reelDisplay, reelUrl, site } from '../content/site'
import type { Reel } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'
import { InstagramGlyph } from './Glyphs'
import { PhoneFrame } from './PhoneFrame'
import { ReelLightbox } from './ReelLightbox'

/*
 * Cover tones for a Reel with no saved still yet, so a frame is never empty.
 */
const tones = [
  'from-sand-deep via-sand to-bone',
  'from-blush via-sand to-bone',
  'from-clay/30 via-sand to-sand-deep',
]

/* The middle phone sits slightly higher, so the row reads as a composition
   rather than as three equal boxes. Desktop only. */
const offsets = ['sm:translate-y-4', 'sm:-translate-y-3', 'sm:translate-y-5']

function PlayGlyph() {
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-bone/90 text-ink shadow-lg shadow-ink/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-blush-deep group-hover:text-bone"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-5 w-5">
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    </span>
  )
}

/**
 * The three published Instagram Reels, each inside an iPhone frame.
 *
 * This is the only real work on the site, so it gets the strongest treatment on
 * the page. Clicking a frame opens the Reel in `ReelLightbox` — Instagram's own
 * embed, with a direct link to the post underneath in case the embed is
 * refused. Nothing here loads from Instagram until a Reel is opened.
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

      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:mt-14 sm:grid-cols-3 sm:gap-x-10">
        {featuredReels.map((reel, index) => {
          const posterUrl = asset(reel.poster)

          return (
            <li
              key={reel.code}
              /* Three items in two columns leave an orphan on the last row;
                 letting it span both columns centres it instead of stranding
                 it on the left. */
              className={`mx-auto w-full max-w-[15rem] transition-transform duration-700 ease-[var(--ease-soft)] last:odd:col-span-2 sm:last:odd:col-span-1 ${offsets[index] ?? ''}`}
            >
              <PhoneFrame className="group hover:shadow-[0_32px_60px_-28px_rgba(34,31,28,0.6)]">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 h-full w-full bg-gradient-to-br ${tones[index % tones.length]}`}
                  />
                )}

                {reelDisplay === 'embed' ? (
                  <button
                    type="button"
                    onClick={() => setActive(reel)}
                    className="absolute inset-0 z-10 flex h-full w-full items-center justify-center"
                  >
                    <span className="sr-only">
                      {t.work.play} — {t.work.reelBadge}
                    </span>
                    <PlayGlyph />
                  </button>
                ) : (
                  <a
                    href={reelUrl(reel.code)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="absolute inset-0 z-10 flex h-full w-full items-center justify-center"
                  >
                    <span className="sr-only">{t.work.openOnInstagram}</span>
                    <PlayGlyph />
                  </a>
                )}
              </PhoneFrame>

              {/* Direct route to the original post, independent of the embed. */}
              <a
                href={reelUrl(reel.code)}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-muted underline-offset-4 transition-colors duration-300 hover:text-blush-deep hover:underline"
              >
                <InstagramGlyph className="h-3.5 w-3.5" />
                {t.work.watchOnInstagram}
              </a>
            </li>
          )
        })}
      </ul>

      <ReelLightbox reel={active} onClose={() => setActive(null)} />
    </>
  )
}
