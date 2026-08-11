import { heroProof, portrait, site, socialStats } from '../content/site'
import { useI18n } from '../i18n'
import { formatCompact } from '../lib/format'
import { asset } from '../lib/asset'
import { InstagramGlyph } from '../components/InstagramGlyph'

/**
 * The opening screen.
 *
 * An asymmetric editorial split: the introduction and the essentials on one
 * side, a portrait in an arched frame on the other. The arch is doing real work
 * here — it is the one shape on the site that is unmistakably not a rectangle,
 * which is what stops the page reading as a template. A thin outline arch sits
 * behind it, offset, the way a printed layout would register two plates
 * slightly out of alignment on purpose.
 *
 * Below the split, the content pillars run as a quiet strip, then the numbers.
 * The work itself starts immediately after, one scroll down.
 */
export function Hero() {
  const { t, lang } = useI18n()
  // Arabic script has no italic form — slanting it reads as a rendering fault,
  // so the accent is carried by colour alone there.
  // `not-italic` is required, not just omitting `italic`: <em> is italic by
  // default in every browser, and Cairo has no italic cut, so the engine would
  // synthesise a slant.
  const accentItalic = lang === 'ar' ? 'not-italic' : 'italic'
  const instagram = site.socials.find((social) => social.label === 'Instagram')

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* Warm wash, with the blush accent pooling behind the portrait. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[54rem] bg-[radial-gradient(75%_55%_at_12%_0%,var(--color-sand)_0%,transparent_58%),radial-gradient(50%_42%_at_88%_14%,color-mix(in_srgb,var(--color-blush)_85%,transparent)_0%,transparent_72%)]"
      />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------------------------------------------------- Introduction */}
          <div className="lg:col-span-7">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-clay-deep">
              {t.hero.role}
              <span aria-hidden="true" className="h-px w-8 bg-blush-mid" />
              <span className="text-ink-muted">{t.hero.location}</span>
            </p>

            <h1 className="mt-6 text-[2.7rem] leading-[1.04] sm:text-6xl lg:text-[4.15rem]">
              {t.hero.title}{' '}
              {/* The second half is set in italic — the one typographic flourish. */}
              <em className={`font-display text-clay-deep ${accentItalic}`}>
                {t.hero.titleAccent}
              </em>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{t.hero.lede}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                {t.hero.primaryCta}
              </a>
              <a href="#work" className="btn-secondary">
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* --------------------------------------------------------- Portrait */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[24rem] lg:ms-auto lg:me-0">
              {/* Offset outline arch, sitting a little behind and below. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-5 -end-5 h-full w-full rounded-arch border border-blush-mid/60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -start-8 h-32 w-32 rounded-full bg-blush/70 blur-2xl"
              />

              <figure className="relative overflow-hidden rounded-arch bg-sand-deep shadow-xl shadow-clay/10">
                <img
                  src={asset(portrait)}
                  alt={site.fullName}
                  width={1000}
                  height={1250}
                  loading="eager"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </figure>

              {/* Small floating handle chip, overlapping the frame. */}
              {instagram && (
                <a
                  href={instagram.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="absolute -bottom-4 start-4 inline-flex items-center gap-2 rounded-full border border-line bg-bone/95 px-4 py-2 text-sm shadow-lg shadow-ink/5 backdrop-blur-sm transition-colors duration-300 hover:border-blush-mid hover:text-blush-deep"
                >
                  <InstagramGlyph className="h-4 w-4" />
                  {instagram.handle}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------ Content pillars */}
        <div className="mt-20 border-t border-line pt-8">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-muted">
            {t.hero.pillarsLabel}
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            {t.hero.pillars.map((pillar, index) => (
              <li key={pillar} className="flex items-center gap-3">
                {index > 0 && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-blush-mid" />
                )}
                <span className="font-display text-xl text-ink-soft sm:text-2xl">{pillar}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------------- Numbers */}
        <dl className="mt-12 grid grid-cols-2 gap-y-8 border-t border-line pt-9 sm:grid-cols-4">
          {heroProof.map((stat) => (
            <div key={stat.key}>
              <dt className="sr-only">{t.hero.proof[stat.key]}</dt>
              <dd>
                <span className="block font-display text-3xl">
                  {/* The community figure is derived from socialStats. */}
                  {stat.key === 'community'
                    ? formatCompact(socialStats.instagramFollowers, lang)
                    : stat.value}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-ink-muted">
                  {t.hero.proof[stat.key]}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
