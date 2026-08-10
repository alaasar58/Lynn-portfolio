import type { Lang } from '../i18n'

/*
 * Arabic is formatted with Western digits rather than Arabic-Indic ones. Both
 * are correct, but the rest of the site — handles, prices, the "48h" figure —
 * uses Western digits, and mixing the two systems on one page reads as an
 * inconsistency rather than a localisation.
 */
const localeFor = (lang: Lang) => (lang === 'ar' ? 'ar-u-nu-latn' : lang)

/** 27000 → "27,000" / "27.000" / "27,000" */
export function formatCount(value: number, lang: Lang): string {
  return new Intl.NumberFormat(localeFor(lang)).format(value)
}

/** 27000 → "27K" / "27 Tsd." / "27 ألف" */
export function formatCompact(value: number, lang: Lang): string {
  return new Intl.NumberFormat(localeFor(lang), {
    notation: 'compact',
    maximumFractionDigits: 0,
  }).format(value)
}
