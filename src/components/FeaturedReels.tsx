import { useState } from 'react'
import { featuredReels, reelDisplay, reelUrl, site } from '../content/site'
import type { Reel } from '../content/site'
import { useI18n } from '../i18n'
import { InstagramGlyph } from './InstagramGlyph'
import { ReelLightbox } from './ReelLightbox'

/*
 * Cover tones for Reels without a saved still, matched to the portfolio media
 * so the row reads as one set rather than as a gap.
 */
const tones = [
  'from-sand-deep via-sand to-bone',
  'from-blush via-sand to-bone',
  'from-clay/30 via-sand to-sand-deep',
]

function PlayGlyph({ large = false }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex items-center justify-center rounded-full bg-bone/90 text-ink shadow-lg shadow-ink/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-blush-deep group-hover:text-bone ${
        large ? 'h-16 w-16' : 'h-14 w-14'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-5 w-5">
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    </span>
  )
}

type ReelCardProps = {
  reel: Reel
  index: number
  onOpen: (reel: Reel) => void
}

function ReelCard({ reel, index, onOpen }: ReelCardProps) {
  const { t } = useI18n()

  return (
    <figure className="group relative overflow-hidden rounded-card bg-sand-deep">
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {reel.poster ? (
          <img
            src={reel.poster}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`h-full w-full bg-gradient-to-br transition-transform duration-[1.2s] group-hover:scale-[1.04] ${
              tones[index % tones.length]
            }`}
          />
        )}

        {reelDisplay === 'embed' ? (
          <button
            type="button"
            onClick={() => onOpen(reel)}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
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
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            <span className="sr-only">{t.work.openOnInstagram}</span>
            <PlayGlyph />
          </a>
        )}

        <span className="pointer-events-none absolute start-4 top-4 flex items-center gap-1.5 rounded-full bg-bone/90 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink">
          <InstagramGlyph className="h-3 w-3" />
          {t.work.reelBadge}
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/80 to-transparent" />
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        {/* Direct route to the original post, independent of the embed. */}
        <a
          href={reelUrl(reel.code)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm text-bone underline-offset-4 hover:text-blush hover:underline"
        >
          {t.work.watchOnInstagram}
        </a>
      </figcaption>
    </figure>
  )
}

/**
 * The three published Reels, shown as featured work in the hero and at the top
 * of the portfolio.
 */
export function FeaturedReels({ showProfileLink = true }: { showProfileLink?: boolean }) {
  const { t } = useI18n()
  const [active, setActive] = useState<Reel | null>(null)
  const instagram = site.socials.find((social) => social.label === 'Instagram')

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {featuredReels.map((reel, index) => (
          <div key={reel.code} className={index === 1 ? 'sm:mt-10' : ''}>
            <ReelCard reel={reel} index={index} onOpen={setActive} />
          </div>
        ))}
      </div>

      {showProfileLink && instagram && (
        <a
          href={instagram.href}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft underline-offset-4 transition-colors hover:text-blush-deep hover:underline"
        >
          <InstagramGlyph />
          {t.work.seeMore}
          <span className="text-ink-muted">{instagram.handle}</span>
        </a>
      )}

      <ReelLightbox reel={active} onClose={() => setActive(null)} />
    </>
  )
}
