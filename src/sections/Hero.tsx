import { hero, site } from '../content/site'
import { FeaturedReels } from '../components/FeaturedReels'

/**
 * Opening screen: positioning statement, the two calls to action, and the
 * strongest work visible immediately — the brief's conversion path starts with
 * the client watching, not reading.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* Soft tonal wash behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] bg-[radial-gradient(80%_60%_at_15%_0%,var(--color-sand)_0%,transparent_60%),radial-gradient(60%_50%_at_95%_10%,color-mix(in_srgb,var(--color-clay)_18%,transparent)_0%,transparent_70%)]"
      />

      <div className="shell">
        <div className="max-w-3xl">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 className="mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.lede}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={hero.primaryCta.href} className="btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn-secondary">
              {hero.secondaryCta.label}
            </a>
          </div>

          <p className="mt-6 text-sm text-ink-muted">{site.location}</p>
        </div>

        {/* Selected work, straight away. */}
        <div className="mt-16">
          <FeaturedReels />
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-line pt-10 sm:grid-cols-4">
          {hero.proof.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl">{stat.value}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-ink-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
