import { Section } from '../components/Section'
import { pricingTiers } from '../content/site'
import { useI18n } from '../i18n'

/**
 * Page four: what she makes, and what it starts at.
 *
 * Deliberately unboxed. The services are four ruled rows rather than four
 * cards, because a card is a border around something that did not need one, and
 * four of them in a row is the exact look the brief asked to avoid.
 *
 * Every figure comes from `pricingTiers` in `src/content/site.ts` — no price is
 * hard-coded here, and each one is printed under the word "from", because they
 * are starting points rather than quotes.
 */
export function Offer() {
  const { t } = useI18n()

  return (
    <Section
      id="services"
      page
      eyebrow={t.services.eyebrow}
      title={t.services.title}
      lede={t.services.lede}
    >
      {/* ---------------------------------------------------- What I can make */}
      <ul className="border-t border-line">
        {t.services.offer.map((entry, index) => (
          <li
            key={entry.title}
            className="group -mx-4 grid gap-2 border-b border-line px-4 py-7 transition-colors duration-500 ease-[var(--ease-soft)] hover:bg-blush/25 sm:grid-cols-12 sm:gap-8 sm:py-8"
          >
            <div className="flex items-baseline gap-4 sm:col-span-5">
              <span className="text-[0.68rem] tabular-nums text-ink-muted transition-colors duration-300 group-hover:text-blush-deep">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl transition-colors duration-300 group-hover:text-blush-deep sm:text-2xl">
                {entry.title}
              </h3>
            </div>
            <p className="leading-relaxed text-ink-soft sm:col-span-7">{entry.body}</p>
          </li>
        ))}
      </ul>

      {/* ------------------------------------------------------------ Prices */}
      <div className="mt-28 lg:mt-36">
        <header className="max-w-2xl">
          <p className="eyebrow">{t.pricing.eyebrow}</p>
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl">{t.pricing.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{t.pricing.lede}</p>
        </header>

        {/*
          No tier is singled out. Marking one as "featured" pushes a choice on
          the reader and leaves the other two looking like the afterthoughts;
          the emphasis follows the pointer instead, so whichever one is being
          read is the one that lifts.
        */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-line lg:grid-cols-3">
          {pricingTiers.map((tier) => {
            const copy = t.pricing.tiers[tier.key]

            return (
              <article
                key={tier.key}
                className="group flex flex-col bg-bone p-8 transition-colors duration-500 ease-[var(--ease-soft)] hover:bg-blush/40 sm:p-10"
              >
                <h3 className="text-xl">{copy.name}</h3>

                <p className="mt-8 text-[0.62rem] uppercase tracking-[0.16em] text-ink-muted">
                  {t.pricing[tier.unit]}
                </p>
                <p className="mt-1 font-display text-[2.75rem] leading-none">{tier.price}</p>

                <p className="mt-6 text-sm leading-relaxed text-ink-soft">{copy.body}</p>

                <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                  {copy.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blush-deep"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* mt-auto pins the CTA to the floor so all three line up. */}
                <div className="mt-auto pt-10">
                  <a
                    href="#contact"
                    className="btn-secondary w-full transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
                  >
                    {t.pricing.cta}
                  </a>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {t.pricing.factorsTitle}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-ink-soft">
              {t.pricing.factors.map((factor) => (
                <li key={factor}>{factor}</li>
              ))}
            </ul>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">{t.pricing.note}</p>
        </div>
      </div>

      {/* -------------------------------------------------------- How it works */}
      <div className="mt-24 border-t border-line pt-12">
        <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
          {t.services.howItWorksTitle}
        </h3>
        <div className="mt-6 grid gap-10 sm:grid-cols-2">
          {t.services.howItWorks.map((step) => (
            <div key={step.title}>
              <p className="font-display text-xl">{step.title}</p>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
