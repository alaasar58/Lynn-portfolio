import type { ReactNode } from 'react'
import { useReveal } from '../lib/useReveal'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: ReactNode
  lede?: ReactNode
  children: ReactNode
  /** Tints the section background to break up the vertical rhythm. */
  tone?: 'bone' | 'sand' | 'ink'
  className?: string
}

const tones = {
  bone: 'bg-bone text-ink',
  sand: 'bg-sand text-ink',
  ink: 'bg-ink text-bone',
} as const

/**
 * The shared section wrapper: consistent vertical rhythm, heading block and
 * scroll reveal. Every page section is built on top of it so spacing and
 * typographic scale stay identical throughout the site.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  tone = 'bone',
  className = '',
}: SectionProps) {
  const ref = useReveal<HTMLDivElement>()
  const onInk = tone === 'ink'

  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      <div ref={ref} className="reveal shell">
        {(eyebrow || title || lede) && (
          <header className="max-w-2xl">
            {eyebrow && (
              <p className={`eyebrow ${onInk ? 'text-clay' : ''}`}>{eyebrow}</p>
            )}
            {title && (
              <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
                {title}
              </h2>
            )}
            {lede && (
              <p
                className={`mt-5 text-base leading-relaxed sm:text-lg ${
                  onInk ? 'text-bone/70' : 'text-ink-soft'
                }`}
              >
                {lede}
              </p>
            )}
          </header>
        )}
        <div className={eyebrow || title || lede ? 'mt-12 sm:mt-16' : ''}>{children}</div>
      </div>
    </section>
  )
}
