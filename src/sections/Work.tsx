import { useMemo, useState } from 'react'
import { Section } from '../components/Section'
import { VideoCard } from '../components/VideoCard'
import { experienceBrands, work, workCategories } from '../content/site'
import type { WorkCategory } from '../content/site'

type Filter = WorkCategory | 'All'

/**
 * The portfolio. Filterable by category, video-led, and deliberately light on
 * copy — the work is meant to carry this section on its own.
 */
export function Work() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered = useMemo(
    () => (filter === 'All' ? work : work.filter((item) => item.category === filter)),
    [filter],
  )

  const filters: Filter[] = ['All', ...workCategories]

  return (
    <Section
      id="work"
      tone="sand"
      eyebrow="Selected Work"
      title="Product content that looks like real life."
      lede="A selection of lifestyle and product pieces across the categories I work in most."
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work by category">
        {filters.map((entry) => {
          const active = filter === entry
          return (
            <button
              key={entry}
              type="button"
              onClick={() => setFilter(entry)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                active
                  ? 'border-ink bg-ink text-bone'
                  : 'border-line bg-transparent text-ink-soft hover:border-ink/40 hover:text-ink'
              }`}
            >
              {entry}
            </button>
          )
        })}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, index) => (
          <VideoCard key={item.id} item={item} priority={index < 3} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-ink-muted">More work in this category is coming soon.</p>
      )}

      <div className="mt-14 border-t border-line pt-8">
        <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
          Products &amp; brands I have created content around
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {experienceBrands.map((brand) => (
            <li key={brand} className="font-display text-xl text-ink-soft">
              {brand}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
          Selected portfolio and personal product content. Not all pieces shown were paid
          collaborations — brand partnerships are labelled where they apply.
        </p>
      </div>
    </Section>
  )
}
