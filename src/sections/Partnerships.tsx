import { Section } from '../components/Section'
import { useI18n } from '../i18n'

/**
 * Partnerships. Frames long-term collaboration as the preferred model while
 * keeping single projects an obvious, welcome entry point.
 */
export function Partnerships() {
  const { t } = useI18n()

  return (
    <Section
      id="partnerships"
      eyebrow={t.partnerships.eyebrow}
      title={t.partnerships.title}
      lede={t.partnerships.lede}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.partnerships.models.map((model, index) => {
          const featured = index === 0
          return (
            <article
              key={model.title}
              className={`rounded-card p-7 transition-transform duration-500 hover:-translate-y-1 ${
                featured
                  ? 'bg-blush/50 ring-1 ring-blush-mid'
                  : 'border border-line bg-sand/50 hover:border-blush-mid/70'
              }`}
            >
              {featured && <p className="eyebrow mb-3">{t.partnerships.preferred}</p>}
              <h3 className="text-lg">{model.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{model.body}</p>
            </article>
          )
        })}
      </div>

      <div className="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {t.partnerships.qualities.map((quality) => (
          <div key={quality.title}>
            <h3 className="text-base">{quality.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{quality.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
