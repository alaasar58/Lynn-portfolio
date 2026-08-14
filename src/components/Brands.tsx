import type { CSSProperties } from 'react'
import { brands } from '../content/site'
import type { Brand } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'

/**
 * Brands worked with.
 *
 * A still grid, not a moving row. A marquee is a way of making a short list
 * look long, and a media kit is read by someone who wants to see the names, not
 * chase them across the screen. Three names sitting still read as three real
 * collaborations; the same three sliding past read as filler.
 *
 * At rest every tile is the same quiet grey, so a mixed set of marks — one
 * green, one pink, one navy — still reads as one row rather than a patchwork.
 * On hover the tile it belongs to comes to life in *that brand's own* colour:
 * the logo drops out of greyscale, the cell warms, and a soft glow in the same
 * tone lifts it off the page. One brand at a time, which is the whole point.
 *
 * The colour comes from `color` on the brand in `src/content/site.ts` and is
 * handed to CSS as a variable, so nothing here needs to know which brands
 * exist. Without a colour the tile falls back to the site's blush.
 *
 * Everything is a hover *and* a focus state, so a keyboard reaches it too.
 */
export function Brands() {
  const { t } = useI18n()

  if (brands.length === 0) return null

  return (
    <div>
      <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
        {t.work.brandsHeading}
      </h3>

      <ul className="mt-8 grid grid-cols-2 gap-px bg-line sm:grid-cols-3">
        {brands.map((brand) => (
          <BrandCell key={brand.name} brand={brand} />
        ))}
      </ul>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted">{t.work.disclaimer}</p>
    </div>
  )
}

function BrandCell({ brand }: { brand: Brand }) {
  /* `--brand` is the one thing that differs per tile. Everything else is a
     class, so the tiles cannot drift apart visually. */
  const style = {
    '--brand': brand.color ?? 'var(--color-blush-deep)',
  } as CSSProperties

  const inner = brand.logo ? (
    <img
      src={asset(brand.logo)}
      alt={brand.name}
      loading="lazy"
      decoding="async"
      className="max-h-10 w-auto max-w-full opacity-70 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
    />
  ) : (
    <span className="text-center font-display text-lg leading-snug text-ink-soft transition-colors duration-500 group-hover:text-[var(--brand)] group-focus-visible:text-[var(--brand)] sm:text-xl">
      {brand.name}
    </span>
  )

  const shared =
    'group relative flex min-h-[8rem] items-center justify-center bg-sand px-6 py-8 transition-[background-color,box-shadow] duration-500 hover:bg-bone focus-visible:bg-bone hover:shadow-[inset_0_0_0_1px_var(--brand),0_18px_40px_-24px_var(--brand)] focus-visible:shadow-[inset_0_0_0_1px_var(--brand),0_18px_40px_-24px_var(--brand)] focus:outline-none'

  return (
    <li style={style} className="contents">
      {brand.href ? (
        <a href={brand.href} target="_blank" rel="noreferrer noopener" className={shared}>
          {inner}
        </a>
      ) : (
        <div className={shared}>{inner}</div>
      )}
    </li>
  )
}
