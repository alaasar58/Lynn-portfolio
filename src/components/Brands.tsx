import type { CSSProperties } from 'react'
import { brands } from '../content/site'
import type { Brand } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'

/*
 * How many across on a wide screen, so the last row is never a single tile
 * stranded on its own. Four brands read as two rows of two or one row of four;
 * three across would leave the fourth alone under the others, which looks like
 * a mistake rather than a list.
 *
 * Written as whole class names because Tailwind reads the source as text and
 * never sees a class that is assembled at runtime.
 */
function columnsFor(count: number) {
  if (count % 4 === 0) return 'lg:grid-cols-4'
  if (count % 3 === 0) return 'sm:grid-cols-3'
  return 'sm:grid-cols-2 lg:grid-cols-3'
}

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

      <ul className={`mt-8 grid grid-cols-2 gap-4 sm:gap-6 ${columnsFor(brands.length)}`}>
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

  /*
   * Every mark gets the same box, and `object-contain` fits it inside without
   * distorting it. The box is what makes four different shapes sit on one
   * baseline at one size; `scale` then corrects what the box alone cannot —
   * see the note in src/content/site.ts.
   */
  const inner = (
    <div className="flex h-20 w-full items-center justify-center">
      {brand.logo ? (
        <img
          src={asset(brand.logo)}
          alt={brand.name}
          loading="lazy"
          decoding="async"
          /* The base size is a variable rather than an inline transform, so the
             hover lift can multiply it instead of replacing it — an inline
             transform beats the class and would kill the hover entirely. */
          style={{ '--logo-scale': brand.scale ?? 1 } as CSSProperties}
          className="max-h-full max-w-full scale-[var(--logo-scale)] object-contain transition-transform duration-500 ease-[var(--ease-soft)] group-hover:scale-[calc(var(--logo-scale)*1.04)] group-focus-visible:scale-[calc(var(--logo-scale)*1.04)]"
        />
      ) : (
        /*
         * No logo yet, so the name has to stand in for one — and it is set to
         * look like a wordmark rather than like a line of text: uppercase and
         * tracked, at the size a mark would occupy, so the tile carries the
         * same weight as the ones beside it. Every brand here happens to set
         * its own name in caps; a future one that does not can carry its logo
         * file instead, which is the real fix in any case.
         */
        <span className="text-center font-display text-xl uppercase leading-snug tracking-[0.06em] text-ink-soft transition-colors duration-500 group-hover:text-[var(--brand)] group-focus-visible:text-[var(--brand)] sm:text-[1.5rem]">
          {brand.name}
        </span>
      )}
    </div>
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
