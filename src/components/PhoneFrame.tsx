import type { ReactNode } from 'react'

/**
 * A modern iPhone shell to put a vertical clip inside.
 *
 * The details that make it read as an iPhone rather than as a generic phone
 * outline: a thin body rather than a thick bezel, a screen radius slightly
 * smaller than the body's so the two curves stay concentric, a free-floating
 * Dynamic Island set down from the top edge, and a home indicator at the
 * bottom. There is deliberately no home button and no chin.
 *
 * The children fill the screen: the caller passes an image or a video.
 */
export function PhoneFrame({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative rounded-[2.6rem] bg-ink p-[3px] shadow-[0_22px_45px_-26px_rgba(34,31,28,0.55)] transition-shadow duration-700 ease-[var(--ease-soft)] ${className}`}
    >
      {/*
        A hairline inside the body edge. On a real device this is where the
        polished rail catches the light, and it is the difference between a
        phone and a black rounded rectangle.
      */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1px] rounded-[2.5rem] ring-1 ring-inset ring-bone/15"
      />

      <div className="relative aspect-[9/19.5] w-full overflow-hidden rounded-[2.45rem] bg-sand-deep">
        {children}

        {/* Dynamic Island — floating, not attached to the top edge. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[0.55rem] z-20 mx-auto h-[1rem] w-[27%] rounded-full bg-ink"
        />

        {/* Home indicator. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-2 z-20 mx-auto h-[3px] w-[34%] rounded-full bg-bone/70 mix-blend-plus-lighter"
        />
      </div>
    </div>
  )
}
