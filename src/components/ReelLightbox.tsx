import { useEffect, useRef, useState } from 'react'
import { reelEmbedUrl, reelUrl } from '../content/site'
import { useI18n } from '../i18n'
import type { Reel } from '../content/site'
import { InstagramGlyph } from './Glyphs'

type ReelLightboxProps = {
  reel: Reel | null
  onClose: () => void
}

/**
 * Plays a Reel without leaving the site, using Instagram's official embed.
 *
 * The iframe is only created once a Reel is actually opened, so no third-party
 * request is made on page load. Instagram can refuse to be framed (privacy
 * settings, regional blocks, an ad blocker), and a cross-origin frame gives us
 * no reliable way to detect that — so the direct link to the original post is
 * always visible underneath rather than being a hidden fallback. Whatever
 * happens to the embed, the visitor can still reach the Reel in one click.
 */
export function ReelLightbox({ reel, onClose }: ReelLightboxProps) {
  const { t } = useI18n()
  const [loaded, setLoaded] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!reel) return
    setLoaded(false)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [reel, onClose])

  if (!reel) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${t.work.reelBadge} — Instagram`}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop — clicking anywhere outside the player closes it. */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/80 backdrop-blur-sm"
      >
        <span className="sr-only">{t.nav.menuClose}</span>
      </button>

      <div className="relative flex max-h-full w-full max-w-[420px] flex-col">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm text-bone/80">{t.work.reelBadge}</p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/30 text-bone transition-colors hover:bg-bone hover:text-ink"
          >
            <span className="sr-only">{t.nav.menuClose}</span>
            <span aria-hidden="true" className="text-lg leading-none">
              ×
            </span>
          </button>
        </div>

        <div className="relative overflow-hidden rounded-card bg-bone">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-ink-muted">{t.work.loadingReel}</span>
            </div>
          )}
          <iframe
            src={reelEmbedUrl(reel.code)}
            title={`${t.work.reelBadge} ${reel.code}`}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="h-[min(70vh,640px)] w-full border-0"
          />
        </div>

        <a
          href={reelUrl(reel.code)}
          target="_blank"
          rel="noreferrer noopener"
          className="btn mt-3 w-full bg-bone text-ink hover:bg-blush-deep hover:text-bone"
        >
          <InstagramGlyph />
          {t.work.openOnInstagram}
        </a>
        <p className="mt-2 text-center text-xs text-bone/50">
          {t.work.embedFallback}
        </p>
      </div>
    </div>
  )
}
