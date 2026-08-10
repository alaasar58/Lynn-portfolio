import { heroProof } from '../content/site'
import { useI18n } from '../i18n'
import { FeaturedReels } from '../components/FeaturedReels'

/**
 * Opening screen: positioning statement, the two calls to action, and live
 * work visible immediately — the conversion path starts with the client
 * watching, not reading.
 */
export function Hero() {
  const { t } = useI18n()

  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Soft tonal wash behind the headline, with a hint of the blush accent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] bg-[radial-gradient(80%_60%_at_15%_0%,var(--color-sand)_0%,transparent_60%),radial-gradient(55%_45%_at_92%_8%,color-mix(in_srgb,var(--color-blush)_75%,transparent)_0%,transparent_70%)]"
      />

      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="mt-5 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">{t.hero.lede}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-primary">
              {t.hero.primaryCta}
            </a>
            <a href="#work" className="btn-secondary">
              {t.hero.secondaryCta}
            </a>
          </div>

          <p className="mt-5 text-sm text-ink-muted">{t.hero.location}</p>
        </div>

        {/* Published work, straight away. */}
        <div className="mt-14">
          <FeaturedReels />
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-line pt-9 sm:grid-cols-4">
          {heroProof.map((stat) => (
            <div key={stat.key}>
              <dt className="sr-only">{t.hero.proof[stat.key]}</dt>
              <dd>
                <span className="block font-display text-3xl">{stat.value}</span>
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
