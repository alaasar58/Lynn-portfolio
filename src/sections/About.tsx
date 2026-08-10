import { Section } from '../components/Section'
import { useI18n } from '../i18n'

/**
 * About. Personal but brief — positioning, languages and audience credibility,
 * with the values statement kept professional and understated.
 */
export function About() {
  const { t } = useI18n()

  return (
    <Section id="about" tone="sand" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-5 lg:col-span-7">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="rounded-card border border-line bg-bone p-6">
            <h3 className="text-lg">{t.about.valuesTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.about.valuesBody}</p>
          </div>
        </div>

        <div className="space-y-10 lg:col-span-5">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              {t.about.languagesTitle}
            </h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {t.about.languages.map((language) => (
                <li key={language.name} className="py-4">
                  <p className="font-display text-xl">{language.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{language.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.about.languagesNote}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              {t.about.audienceTitle}
            </h3>
            <dl className="mt-4 space-y-3">
              {t.about.audience.map((entry) => (
                <div key={entry.label} className="flex justify-between gap-6 text-sm">
                  <dt className="text-ink-muted">{entry.label}</dt>
                  <dd className="text-end text-ink">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  )
}
