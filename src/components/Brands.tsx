import { brands } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'

/**
 * Brands worked with.
 *
 * A quiet grid of hairline-separated cells rather than a list, so brands of
 * very different name lengths still line up. Cells are generous and mostly
 * empty on purpose — that space is what makes a short row of names read as
 * considered rather than thin.
 *
 * A brand may carry a logo or not; both render at the same size, so the section
 * looks finished before every logo has arrived. Logos run in greyscale and come
 * to colour on hover, which is what keeps a mixed set of marks from turning the
 * row into a patchwork.
 *
 * To add one, edit `brands` in `src/content/site.ts`.
 */
export function Brands() {
  const { t } = useI18n()

  if (brands.length === 0) return null

  return (
    <div>
      <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
        {t.work.brandsHeading}
      </h3>

      <ul className="mt-8 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <li
            key={brand.name}
            className="group flex min-h-[7.5rem] items-center justify-center bg-sand px-6 py-8 transition-colors duration-500 hover:bg-bone"
          >
            {brand.logo ? (
              <img
                src={asset(brand.logo)}
                alt={brand.name}
                loading="lazy"
                decoding="async"
                className="max-h-9 w-auto max-w-full opacity-75 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
              />
            ) : (
              <span className="text-center font-display text-lg text-ink-soft transition-colors duration-500 group-hover:text-ink sm:text-xl">
                {brand.name}
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted">{t.work.disclaimer}</p>
    </div>
  )
}
