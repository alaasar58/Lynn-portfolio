import { useMemo, useState } from 'react'
import { Section } from '../components/Section'
import { VideoCard } from '../components/VideoCard'
import { FeaturedReels } from '../components/FeaturedReels'
import { InstagramGlyph } from '../components/InstagramGlyph'
import { categoryKeys, experienceBrands, site, work } from '../content/site'
import type { CategoryKey } from '../content/site'
import { useI18n } from '../i18n'

type Filter = CategoryKey | 'all'

/**
 * The portfolio: published Reels first, then the category work.
 *
 * The grid mixes tile sizes — items marked `featured` take a double-width slot
 * — so the section reads as a curated body of work rather than a uniform sheet
 * of thumbnails.
 */
export function Work() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<Filter>('all')
  const instagram = site.socials.find((social) => social.label === 'Instagram')

  const filtered = useMemo(
    () => (filter === 'all' ? work : work.filter((item) => item.category === filter)),
    [filter],
  )

  const filters: Filter[] = ['all', ...categoryKeys]

  return (
    <Section
      id="work"
      tone="sand"
      eyebrow={t.work.eyebrow}
      title={t.work.title}
      lede={t.work.lede}
    >
      {/* Published Reels lead the section — real work before portfolio pieces. */}
      <div className="mb-16">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl">{t.work.featuredHeading}</h3>
          {instagram && (
            <a
              href={instagram.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-sm text-ink-soft underline-offset-4 hover:text-blush-deep hover:underline"
            >
              <InstagramGlyph />
              {t.work.viewProfile}
              <span className="text-ink-muted">{instagram.handle}</span>
            </a>
          )}
        </div>
        <FeaturedReels showProfileLink={false} />
      </div>

      <h3 className="mb-5 font-display text-2xl">{t.work.byCategory}</h3>

      {/* Scrolls horizontally on narrow screens, wraps on wider ones. */}
      <div className="rail" role="group" aria-label={t.work.filterLabel}>
        {filters.map((entry) => {
          const active = filter === entry
          return (
            <button
              key={entry}
              type="button"
              onClick={() => setFilter(entry)}
              aria-pressed={active}
              className={`shrink-0 snap-start whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                active
                  ? 'border-ink bg-ink text-bone'
                  : 'border-line bg-transparent text-ink-soft hover:border-blush-mid hover:bg-blush/40 hover:text-ink'
              }`}
            >
              {entry === 'all' ? t.work.all : t.work.categories[entry]}
            </button>
          )
        })}
      </div>

      {/*
        `key` on the grid restarts the entry animation whenever the filter
        changes, so switching categories reads as a deliberate transition.
      */}
      <div
        key={filter}
        className="mt-8 grid auto-rows-[15rem] grid-cols-2 gap-3 sm:auto-rows-[22rem] sm:gap-4 lg:auto-rows-[26rem] lg:grid-cols-4 lg:gap-5"
      >
        {filtered.map((item, index) => (
          <div
            key={item.id}
            style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
            className={`tile-in ${
              item.featured ? 'col-span-2 row-span-1' : 'col-span-1'
            } ${item.featured ? 'sm:row-span-1' : ''}`}
          >
            <VideoCard item={item} priority={index < 4} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p className="mt-10 text-ink-muted">{t.work.empty}</p>}

      <p className="mt-6 text-xs text-ink-muted">{t.work.placeholderNote}</p>

      <div className="mt-12 border-t border-line pt-8">
        <p className="text-xs uppercase tracking-[0.16em] text-ink-muted">
          {t.work.brandsHeading}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
          {experienceBrands.map((brand) => (
            <li key={brand} className="font-display text-xl text-ink-soft">
              {brand}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-muted">
          {t.work.disclaimer}
        </p>
      </div>
    </Section>
  )
}
