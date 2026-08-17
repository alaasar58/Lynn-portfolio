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
 * Every logo is in its own colours, always — a brand's mark is its colours, and
 * a greyed-out logo on a media kit reads as "we cannot show you this one". The
 * tiles are rounded cards on the warm ground rather than cells in a table,
 * which is what stops three marks of three different shapes from looking like a
 * spreadsheet of them.
 *
 * Hovering does not change any colour. It lifts the card slightly, brightens it
 * and deepens its shadow — enough to say "this one is a link", not enough to
 * repaint a trademark. The brand's own colour from `src/content/site.ts` is
 * still handed to CSS as `--brand`, and it is what tints that shadow, so the
 * lift is warmed by the right colour without anything being recoloured.
 *
 * Hover and focus do the same thing, so a keyboard reaches it too.
 */
export function Brands() {
  const { t } = useI18n()

  if (brands.length === 0) return null

  return (
    <div>
      <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
        {t.work.brandsHeading}
      </h3>

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
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
      /*
       * Both dimensions are capped, not just the height. The three marks are a
       * square bear, a wide wordmark and a small framed label — cap the height
       * alone and the wide one runs off across the cell while the square one
       * shrinks to a stamp. Bounding the box instead lets each fill it as far
       * as its own shape allows, which is what makes a mixed set look evenly
       * weighted rather than sorted by luck of proportion.
       */
      className="max-h-24 w-auto max-w-[78%] transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
    />
  ) : (
    <span className="text-center font-display text-lg leading-snug text-ink-soft transition-colors duration-500 group-hover:text-[var(--brand)] group-focus-visible:text-[var(--brand)] sm:text-xl">
      {brand.name}
    </span>
  )

  /*
   * A rounded card that lifts. `color-mix` with the brand colour is what makes
   * the shadow under a green logo green and the one under a brown logo brown,
   * at a strength low enough that it reads as depth rather than as a glow —
   * the wide coloured halo an earlier version had made the logos look on fire.
   */
  const shared =
    'group flex min-h-[9rem] items-center justify-center rounded-card bg-sand px-6 py-8 shadow-[0_1px_2px_rgba(34,31,28,0.04)] transition-all duration-500 ease-[var(--ease-soft)] hover:-translate-y-1 hover:bg-bone hover:shadow-[0_16px_30px_-20px_color-mix(in_srgb,var(--brand)_70%,transparent)] focus-visible:-translate-y-1 focus-visible:bg-bone focus-visible:shadow-[0_16px_30px_-20px_color-mix(in_srgb,var(--brand)_70%,transparent)] focus:outline-none'

  const body = inner

  return (
    <li style={style} className="contents">
      {brand.href ? (
        <a href={brand.href} target="_blank" rel="noreferrer noopener" className={shared}>
          {body}
        </a>
      ) : (
        <div className={shared}>{body}</div>
      )}
    </li>
  )
}
