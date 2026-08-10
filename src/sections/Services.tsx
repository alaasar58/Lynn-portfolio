import { Section } from '../components/Section'
import { useI18n } from '../i18n'

/**
 * Services. One clear primary offer, a small set of supporting ones —
 * production is the business, not an exhaustive service menu.
 */
export function Services() {
  const { t } = useI18n()

  return (
    <Section id="services" eyebrow={t.services.eyebrow} title={t.services.title} lede={t.services.lede}>
      <div className="grid gap-5 lg:grid-cols-5">
        {/* Primary offer */}
        <article className="flex flex-col rounded-card bg-ink p-8 text-bone sm:p-10 lg:col-span-3">
          <p className="eyebrow text-blush">{t.services.coreLabel}</p>
          <h3 className="mt-4 text-2xl sm:text-3xl">{t.services.primaryTitle}</h3>
          <p className="mt-4 max-w-lg leading-relaxed text-bone/70">{t.services.primaryBody}</p>
          <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {t.services.primaryIncludes.map((entry) => (
              <li key={entry} className="flex items-start gap-3 text-sm text-bone/85">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blush-mid" />
                {entry}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-9">
            <a href="#contact" className="btn bg-bone text-ink hover:bg-blush-deep hover:text-bone">
              {t.services.cta}
            </a>
          </div>
        </article>

        {/* Supporting offers */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
          {t.services.secondary.map((service) => (
            <article
              key={service.title}
              className="rounded-card border border-line bg-sand/60 p-6 transition-colors duration-300 hover:border-blush-mid hover:bg-blush/25"
            >
              <h3 className="text-lg">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.body}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">{t.services.future}</p>
    </Section>
  )
}
