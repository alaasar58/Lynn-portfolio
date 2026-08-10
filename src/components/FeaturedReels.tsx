import { useState } from 'react'
import { featuredReels, reelDisplay, reelUrl, site } from '../content/site'
import type { Reel } from '../content/site'
import { InstagramGlyph } from './InstagramGlyph'
import { ReelLightbox } from './ReelLightbox'

/*
 * Placeholder tones, matched to the portfolio grid so a Reel without a cover
 * image still reads as part of the same set rather than as a gap.
 */
const tones = [
  'from-sand-deep via-sand to-bone',
  'from-clay/35 via-sand to-bone',
  'from-sage/30 via-sand to-sand-deep',
]

function PlayGlyph() {
  return (
    <span
      aria-hidden="true"
      className="flex h-14 w-14 items-center justify-center rounded-full bg-bone/85 text-ink shadow-sm transition-transform duration-500 group-hover:scale-110"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="ml-0.5 h-5 w-5">
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
  return (
    <figure className="group relative overflow-hidden rounded-card bg-sand-deep">
      <div className="relative aspect-[9/16] w-full overflow-hidden">
        {reel.poster ? (
          <img
            src={reel.poster}
            alt={reel.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`h-full w-full bg-gradient-to-br ${tones[index % tones.length]}`}
          />
        )}

        {/* Plays in a lightbox, or hands straight over to Instagram. */}
        {reelDisplay === 'embed' ? (
          <button
            type="button"
            onClick={() => onOpen(reel)}
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            <span className="sr-only">Play {reel.title}</span>
            <PlayGlyph />
          </button>
        ) : (
          <a
            href={reelUrl(reel.code)}
            target="_blank"
            rel="noreferrer noopener"
            className="absolute inset-0 flex h-full w-full items-center justify-center"
          >
            <span className="sr-only">Open {reel.title} on Instagram</span>
            <PlayGlyph />
          </a>
        )}

        <span className="pointer-events-none absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-bone/90 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-ink">
          <InstagramGlyph className="h-3 w-3" />
          Reel
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/75 to-transparent" />
      </div>

      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-lg text-bone">{reel.title}</h3>
        {/* Direct route to the original post, independent of the embed. */}
        <a
          href={reelUrl(reel.code)}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-1 inline-flex items-center gap-1.5 text-xs text-bone/75 underline-offset-4 hover:text-bone hover:underline"
        >
          {reel.note}
        </a>
      </figcaption>
    </figure>
  )
}

/**
 * The three published Reels, shown as featured work. Used in the hero and at
 * the top of the portfolio.
 */
export function FeaturedReels({ showProfileLink = true }: { showProfileLink?: boolean }) {
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
          className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          <InstagramGlyph />
          See more of my work on Instagram
          <span className="text-ink-muted">{instagram.handle}</span>
        </a>
      )}

      <ReelLightbox reel={active} onClose={() => setActive(null)} />
    </>
  )
}
