import type { CSSProperties } from 'react'
import { moments } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'
import { useScrollProgress } from '../lib/useScrollProgress'

/*
 * How each frame sits in the band: its share of the width, how far down it
 * starts, and how far it drifts as the page scrolls. The numbers are uneven on
 * purpose — five frames on one baseline is a contact sheet, and a contact sheet
 * is the opposite of the point.
 *
 * `drift` is in rem and is multiplied by the band's scroll progress, so the
 * frames slide past each other slightly rather than moving as one block. The
 * outer two move most, which is what gives the band its depth.
 */
const frames = [
  { box: 'lg:w-[26%] lg:mt-[7rem]', ratio: 'aspect-[3/4]', drift: -3.5 },
  { box: 'lg:w-[20%] lg:mt-[1rem]', ratio: 'aspect-[4/5]', drift: 1.5 },
  { box: 'lg:w-[27%] lg:mt-[10rem]', ratio: 'aspect-[9/14]', drift: -2 },
  { box: 'lg:w-[19%] lg:mt-[2.5rem]', ratio: 'aspect-[4/5]', drift: 2.5 },
  { box: 'lg:w-[24%] lg:mt-[8rem]', ratio: 'aspect-[3/4]', drift: -4 },
]

/**
 * Five photographs across the full width, and nothing to read.
 *
 * Everything else on this site is a column of type with a picture beside it.
 * This band is the one place that is only image — it is what turns a tidy media
 * kit into a creator's page, and it is the piece a brand manager scrolls past
 * slowly.
 *
 * The frames sit at five different heights and drift at five different speeds
 * as the page moves, driven by a single `--p` variable on the band (see
 * `useScrollProgress`). No state, no re-renders, and it stops dead for anyone
 * who prefers reduced motion.
 *
 * On a narrow screen the row becomes a swipe: same frames, same order, scrolled
 * by hand instead of by the page. Squeezing five portraits into 390 px would
 * make five stamps.
 *
 * To change the pictures, overwrite the files in `public/media/moments/`.
 */
export function Moments() {
  const { t } = useI18n()
  const ref = useScrollProgress<HTMLDivElement>()

  if (moments.length === 0) return null

  return (
    <section
      aria-label={t.moments.label}
      className="relative overflow-hidden bg-bone py-20 sm:py-28"
    >
      {/* A wash behind the frames so the band is not a white gap in a warm page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,var(--color-sand)_0%,transparent_70%),radial-gradient(50%_60%_at_85%_80%,color-mix(in_srgb,var(--color-blush)_75%,transparent)_0%,transparent_72%)]"
      />

      <div
        ref={ref}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:gap-6 lg:justify-center lg:overflow-visible lg:px-8 lg:pb-0"
      >
        {moments.map((src, index) => {
          const frame = frames[index % frames.length]

          return (
            <figure
              key={src}
              /* Two layouts in one: a fixed-width swipe card on small screens,
                 a proportional frame in a centred row from lg up. */
              className={`m-0 w-[62vw] shrink-0 snap-center sm:w-[42vw] lg:shrink ${frame.box}`}
              style={{ '--drift': `${frame.drift}rem` } as CSSProperties}
            >
              <div
                className={`${frame.ratio} w-full overflow-hidden rounded-card bg-sand lg:translate-y-[calc(var(--p,0.5)*var(--drift))] lg:will-change-transform`}
              >
                <img
                  src={asset(src)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
