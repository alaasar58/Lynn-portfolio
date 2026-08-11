import { images, site, socialStats } from '../content/site'
import { useI18n } from '../i18n'
import { formatCompact } from '../lib/format'
import { asset } from '../lib/asset'

/**
 * The opening screen.
 *
 * Composition notes, since the geometry is deliberate rather than decorative:
 *
 *  - The image is clipped to a hand-drawn organic contour, not a rectangle or a
 *    tidy geometric arch. It is the one form on the site with no straight edge,
 *    and it is what stops the page reading as a template.
 *  - It bleeds past the page gutter on wide screens, so the composition runs off
 *    the edge the way a magazine spread does instead of sitting in a column.
 *  - An irregular ink line falls from the upper middle down past the lower left
 *    of the image, dividing text from picture. It is drawn slightly loose on
 *    purpose — a straight rule here would look like a table border.
 *  - The name is the headline. Everything else in this section is one line long.
 */
export function Hero() {
  const { t, lang } = useI18n()

  const credibility = [
    `${formatCompact(socialStats.instagramFollowers, lang)}+ ${t.about.audience.instagram}`,
    `${formatCompact(socialStats.tiktokFollowers, lang)}+ ${t.about.audience.tiktok}`,
    ...t.hero.credLanguages,
  ]

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Warm ground, with the blush pooling under the image side. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_8%_2%,var(--color-sand)_0%,transparent_62%),radial-gradient(55%_50%_at_92%_18%,color-mix(in_srgb,var(--color-blush)_88%,transparent)_0%,transparent_74%)]"
      />

      {/* Shapes referenced below. Never rendered directly. */}
      <svg aria-hidden="true" className="absolute h-0 w-0" focusable="false">
        <defs>
          <clipPath id="hero-contour" clipPathUnits="objectBoundingBox">
            {/*
              A tall cut-out: rounded shoulders, near-vertical sides that breathe
              in and out slightly, and a base torn off level. Closer to a shape
              cut from a printed page than to a geometric blob.
            */}
            <path
              d="M0.055,0.30
                 C0.052,0.135 0.215,0.022 0.455,0.015
                 C0.715,0.007 0.938,0.10 0.945,0.305
                 C0.949,0.44 0.922,0.55 0.933,0.665
                 C0.944,0.795 0.962,0.905 0.928,0.965
                 C0.895,1.006 0.775,0.994 0.615,0.988
                 C0.435,0.982 0.238,1.002 0.140,0.965
                 C0.052,0.932 0.047,0.858 0.052,0.735
                 C0.057,0.60 0.057,0.43 0.055,0.30 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* The divider. Hidden on narrow screens, where there is nothing to divide. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="hero-divider pointer-events-none absolute inset-0 -z-[5] hidden h-full w-full lg:block"
      >
        <path
          d="M60,-4 C55,14 49.5,27 51.5,41 C53.6,56 45,66 39.6,80 C36,89.5 34.4,96 34,104"
          fill="none"
          stroke="var(--color-blush-mid)"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          opacity="0.85"
        />
        <path
          d="M63.4,-4 C58.6,15 53.2,27.6 55,41.4 C57,56.4 48.4,66.6 43,80.6"
          fill="none"
          stroke="var(--color-clay)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1 5"
          vectorEffect="non-scaling-stroke"
          opacity="0.4"
        />
      </svg>

      <div className="shell relative">
        <div className="grid items-center gap-14 pb-20 pt-28 sm:pt-32 lg:min-h-[88vh] lg:grid-cols-12 lg:gap-8 lg:pb-24">
          {/* ------------------------------------------------------- Identity */}
          <div className="relative z-10 lg:col-span-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-ink-muted">
              {t.hero.location}
            </p>

            <h1 className="mt-5 text-[3.1rem] uppercase leading-[0.92] tracking-[-0.01em] sm:text-[4.6rem] lg:text-[5.4rem]">
              {site.fullName}
            </h1>

            <p className="mt-5 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-clay-deep/50" />
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-clay-deep">
                {t.hero.role}
              </span>
            </p>

            <p className="mt-8 max-w-md font-display text-2xl leading-snug text-ink-soft sm:text-[1.7rem]">
              {t.hero.tagline}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn-primary">
                {t.hero.ctaWork}
              </a>
              <a href="#contact" className="btn-secondary">
                {t.hero.ctaContact}
              </a>
            </div>

            {/* Quiet credibility — present, but not the point of the section. */}
            <ul className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.16em] text-ink-muted">
              {credibility.map((entry, index) => (
                <li key={entry} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-blush-mid" />
                  )}
                  {entry}
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------- Image */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem] lg:me-[-4vw] lg:ms-auto lg:max-w-[30rem]">
              {/* Contour echo, offset — the second plate of the print. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-5 translate-y-6 bg-blush-mid/45"
                style={{ clipPath: 'url(#hero-contour)' }}
              />

              <img
                src={asset(images.heroPortrait)}
                alt={site.fullName}
                width={1000}
                height={1250}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="relative aspect-[4/5] w-full object-cover"
                style={{ clipPath: 'url(#hero-contour)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
