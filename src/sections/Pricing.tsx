import { Section } from '../components/Section'
import { pricingTiers } from '../content/site'
import { useI18n } from '../i18n'

/**
 * Pricing. Starting points only — enough for a client to judge the level, with
 * the variables that shape a real quote stated plainly underneath.
 *
 * Figures come from `pricingTiers` in `src/content/site.ts`; the wording around
 * them is translated. No price is hard-coded here.
 */
export function Pricing() {
  const { t } = useI18n()

  return (
    <Section
      id="pricing"
      tone="sand"
      eyebrow={t.pricing.eyebrow}
      title={t.pricing.title}
      lede={t.pricing.lede}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {pricingTiers.map((tier) => {
          const copy = t.pricing.tiers[tier.key]
          const featured = 'featured' in tier && tier.featured

          return (
            <article
              key={tier.key}
              className={`flex flex-col rounded-card p-8 ${
                featured ? 'bg-ink text-bone' : 'border border-line bg-bone text-ink'
              }`}
            >
              <h3 className="text-xl">{copy.name}</h3>
              <p
                className={`mt-6 text-xs uppercase tracking-[0.14em] ${
                  featured ? 'text-bone/55' : 'text-ink-muted'
                }`}
              >
                {t.pricing[tier.unit]}
              </p>
              <p className="mt-1 font-display text-4xl">{tier.price}</p>
              <p
                className={`mt-5 text-sm leading-relaxed ${
                  featured ? 'text-bone/70' : 'text-ink-soft'
                }`}
              >
                {copy.body}
              </p>
              <ul className="mt-6 space-y-2 text-sm">
                {copy.points.map((point) => (
                  <li
                    key={point}
                    className={`flex items-start gap-3 ${
                      featured ? 'text-bone/85' : 'text-ink-soft'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                        featured ? 'bg-blush-mid' : 'bg-blush-deep'
                      }`}
                    />
                    {point}
                  </li>
                ))}
              </ul>

              {/* mt-auto pins the CTA to the card floor so all three line up. */}
              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  className={`w-full ${
                    featured
                      ? 'btn bg-bone text-ink hover:bg-blush-deep hover:text-bone'
                      : 'btn-secondary'
                  }`}
                >
                  {t.pricing.cta}
                </a>
              </div>
            </article>
          )
        })}
      </div>

      <div className="mt-12 grid gap-8 rounded-card border border-line bg-bone p-8 lg:grid-cols-3">
        <h3 className="text-lg">{t.pricing.factorsTitle}</h3>
        <ul className="grid gap-x-8 gap-y-2 text-sm text-ink-soft sm:grid-cols-2 lg:col-span-2">
          {t.pricing.factors.map((factor) => (
            <li key={factor} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blush-deep" />
              {factor}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.pricing.note}</p>
    </Section>
  )
}
