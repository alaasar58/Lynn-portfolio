/*
 * The three marks used for contact and social links, drawn inline so the site
 * makes no third-party icon request.
 *
 * All three share a 24 × 24 box and a 1.6 stroke, and each is drawn to fill a
 * similar area within it. Icon sets from different sources look wrong side by
 * side because one mark is visually heavier than the next; keeping the grid and
 * the stroke identical is what makes a row of them sit evenly.
 */

type GlyphProps = { className?: string }

const base = {
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const

export function InstagramGlyph({ className = 'h-4 w-4' }: GlyphProps) {
  return (
    <svg
      {...base}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function TikTokGlyph({ className = 'h-4 w-4' }: GlyphProps) {
  return (
    <svg
      {...base}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* The note: stem, its flag, and the head it rests on. */}
      <path d="M13.4 3.2v11.3a3.6 3.6 0 1 1-3.1-3.57" />
      <path d="M13.4 3.2c.3 2.2 1.9 3.9 4.1 4.2" />
    </svg>
  )
}

export function MailGlyph({ className = 'h-4 w-4' }: GlyphProps) {
  return (
    <svg
      {...base}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4.5 8 6.4 4.4a2 2 0 0 0 2.2 0L19.5 8" />
    </svg>
  )
}
