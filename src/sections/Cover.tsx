import type { ReactElement } from 'react'
import { images, site } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'
import { InstagramGlyph, MailGlyph, TikTokGlyph } from '../components/Glyphs'

/**
 * Page one. A cover, not a summary.
 *
 * Everything that could be read as a statistic is gone: no follower counts, no
 * city, no tagline, no buttons. What is left is a name, what she does, and the
 * three ways to reach her — which is what a cover is for.
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
 */
export function Cover() {
  const { t } = useI18n()

  const instagram = site.socials.find((social) => social.label === 'Instagram')
  const tiktok = site.socials.find((social) => social.label === 'TikTok')

  type Contact = {
    label: string
    value: string
    href: string
    external: boolean
    Glyph: (props: { className?: string }) => ReactElement
  }

  const contacts: Contact[] = [
    {
      label: t.cover.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
      Glyph: MailGlyph,
    },
  ]
  if (instagram) {
    contacts.push({
      label: t.cover.instagramLabel,
      value: instagram.handle,
      href: instagram.href,
      external: true,
      Glyph: InstagramGlyph,
    })
  }
  if (tiktok) {
    contacts.push({
      label: t.cover.tiktokLabel,
      value: tiktok.handle,
      href: tiktok.href,
      external: true,
      Glyph: TikTokGlyph,
    })
  }

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
          opacity="0.8"
        />
      </svg>

      <div className="shell relative">
        <div className="grid items-center gap-14 pb-24 pt-32 sm:pt-36 lg:min-h-screen lg:grid-cols-12 lg:gap-8 lg:pb-28">
          {/* ------------------------------------------------------- Identity */}
          <div className="relative z-10 lg:col-span-5">
            {/*
              The name is the whole headline. Set on two lines so it can run as
              large as the column allows without wrapping unpredictably.
            */}
            <h1 className="text-[clamp(3rem,13vw,5.6rem)] uppercase leading-[0.88] tracking-[-0.015em] lg:text-[clamp(3.5rem,6.4vw,6.2rem)]">
              <span className="block">{site.fullName.split(' ')[0]}</span>
              <span className="block">{site.fullName.split(' ').slice(1).join(' ')}</span>
            </h1>

            <p className="mt-7 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-clay-deep/50" />
              <span className="text-sm font-medium uppercase tracking-[0.3em] text-clay-deep">
                {t.cover.role}
              </span>
            </p>

            {/*
              The three ways to reach her: mark, then value, on one baseline.
              No labels — "Instagram" beside the Instagram mark says it twice —
              and no buttons, because on a cover these are details to read, not
              actions to take. Stacked rather than in a row: at this column
              width a row wraps, and a wrapped row leaves an orphan separator,
              which is exactly the kind of small wrongness that makes a page
              look unconsidered.
            */}
            <ul className="mt-12 space-y-3.5 sm:mt-14">
              {contacts.map((entry) => (
                <li key={entry.label}>
                  <a
                    href={entry.href}
                    {...(entry.external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                    className="group inline-flex items-center gap-3 text-ink transition-colors duration-300 hover:text-blush-deep"
                  >
                    <entry.Glyph className="h-[1.1rem] w-[1.1rem] shrink-0 text-ink-muted transition-colors duration-300 group-hover:text-blush-deep" />
                    {/*
                      dir="ltr" isolates the Latin value. Without it the "@" of
                      a handle is a neutral character at an RTL boundary and
                      Arabic renders "lynn_kawqge@".
                    */}
                    <span dir="ltr" className="relative font-display text-base leading-none sm:text-lg">
                      {entry.value}
                      {/* Rule grows from the leading edge on hover. */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 -bottom-1.5 h-px origin-[left] scale-x-0 bg-blush-deep transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-x-100 rtl:origin-[right]"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------------------------- Image */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem] lg:me-[-7vw] lg:ms-auto lg:max-w-[38rem]">
              {/* Contour echo, offset — the second plate of the print. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-5 translate-y-6 bg-blush-mid/45"
                style={{ clipPath: 'url(#hero-contour)' }}
              />

              {/*
                The clip sits on the wrapper rather than the image, so the photo
                inside can be scaled towards its subject without breaking the
                contour. See `coverZoom` / `coverFocus` in src/content/site.ts.
              */}
              <div
                className="relative aspect-[4/5] w-full overflow-hidden"
                style={{ clipPath: 'url(#hero-contour)' }}
              >
                <img
                  src={asset(images.cover)}
                  alt={site.fullName}
                  width={1200}
                  height={1500}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                  style={{
                    transform: `scale(${images.coverZoom})`,
                    transformOrigin: images.coverFocus,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* A quiet Instagram mark, bottom right, tying the cover to the profile. */}
      {instagram && (
        <a
          href={instagram.href}
          target="_blank"
          rel="noreferrer noopener"
          className="absolute bottom-8 end-6 hidden text-ink-muted transition-colors duration-300 hover:text-blush-deep lg:block"
        >
          <span className="sr-only">{`${t.cover.instagramLabel} ${instagram.handle}`}</span>
          <InstagramGlyph className="h-5 w-5" />
        </a>
      )}
    </section>
  )
}
