import { Section } from '../components/Section'
import { pricing } from '../content/site'

/**
 * Pricing. Starting points only — enough for a client to judge the level,
 * with the variables that shape a real quote stated plainly underneath.
 */
export function Pricing() {
  return (
    <Section
      id="pricing"
      tone="sand"
      eyebrow={pricing.eyebrow}
      title={pricing.title}
      lede={pricing.lede}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {pricing.tiers.map((tier) => (
          <article
            key={tier.name}
            className={`flex flex-col rounded-card p-8 ${
              tier.featured
                ? 'bg-ink text-bone'
                : 'border border-line bg-bone text-ink'
            }`}
          >
            <h3 className="text-xl">{tier.name}</h3>
            <p
              className={`mt-6 text-xs uppercase tracking-[0.14em] ${
                tier.featured ? 'text-bone/55' : 'text-ink-muted'
              }`}
            >
              {tier.unit}
            </p>
            <p className="mt-1 font-display text-4xl">{tier.price}</p>
            <p
              className={`mt-5 text-sm leading-relaxed ${
                tier.featured ? 'text-bone/70' : 'text-ink-soft'
              }`}
            >
              {tier.body}
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {tier.points.map((point) => (
                <li
                  key={point}
                  className={`flex items-start gap-3 ${
                    tier.featured ? 'text-bone/85' : 'text-ink-soft'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                      tier.featured ? 'bg-clay' : 'bg-clay-deep'
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
                  tier.featured
                    ? 'btn bg-bone text-ink hover:bg-clay hover:text-bone'
                    : 'btn-secondary'
                }`}
              >
                Request a quote
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 rounded-card border border-line bg-bone p-8 lg:grid-cols-3">
        <h3 className="text-lg">{pricing.factorsTitle}</h3>
        <ul className="grid gap-x-8 gap-y-2 text-sm text-ink-soft sm:grid-cols-2 lg:col-span-2">
          {pricing.factors.map((factor) => (
            <li key={factor} className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
              {factor}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-muted">{pricing.note}</p>
    </Section>
  )
}
