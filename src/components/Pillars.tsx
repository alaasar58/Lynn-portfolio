import { useI18n } from '../i18n'
import { useReveal } from '../lib/useReveal'

/**
 * A slim band of content pillars between the hero and the work.
 *
 * It used to sit inside the hero, which made that section carry too much. On
 * its own it does a simple job: name the subjects before showing the work.
 */
export function Pillars() {
  const { t } = useI18n()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section aria-label={t.hero.pillarsLabel} className="border-y border-line bg-sand/50">
      <div ref={ref} className="reveal shell py-10">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.24em] text-ink-muted">
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
    </section>
  )
}
