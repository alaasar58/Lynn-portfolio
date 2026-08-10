import { Section } from '../components/Section'
import { partnerships } from '../content/site'

/**
 * Partnerships. Frames long-term collaboration as the preferred model while
 * keeping single projects an obvious, welcome entry point.
 */
export function Partnerships() {
  return (
    <Section
      id="partnerships"
      eyebrow={partnerships.eyebrow}
      title={partnerships.title}
      lede={partnerships.lede}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {partnerships.models.map((model) => (
          <article
            key={model.title}
            className={`rounded-card p-7 transition-transform duration-500 hover:-translate-y-1 ${
              model.featured
                ? 'bg-clay/15 ring-1 ring-clay/40'
                : 'border border-line bg-sand/50'
            }`}
          >
            {model.featured && (
              <p className="eyebrow mb-3">Preferred</p>
            )}
            <h3 className="text-lg">{model.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{model.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {partnerships.qualities.map((quality) => (
          <div key={quality.title}>
            <h3 className="text-base">{quality.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{quality.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
