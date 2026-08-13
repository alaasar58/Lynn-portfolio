import { useEffect, useRef } from 'react'
import { reelUrl } from '../content/site'
import type { Reel } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'
import { webmSibling } from '../lib/useAutoplayVideo'
import { InstagramGlyph } from './Glyphs'

type VideoLightboxProps = {
  reel: Reel | null
  onClose: () => void
}

/**
 * Plays one clip large, with sound and controls, without leaving the page.
 *
 * Opened by a click, so this is the one place on the site where sound is
 * allowed to start on its own: the click is the user activation every browser
 * asks for. If a browser refuses anyway, the controls are right there.
 */
export function VideoLightbox({ reel, onClose }: VideoLightboxProps) {
  const { t } = useI18n()
  const closeRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!reel) return

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

  const videoUrl = asset(reel.video)
  const webmUrl = webmSibling(videoUrl)
  const posterUrl = asset(reel.poster)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.work.reelBadge}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Backdrop — clicking anywhere outside the player closes it. */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/85 backdrop-blur-sm"
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

        <video
          ref={videoRef}
          key={reel.id}
          poster={posterUrl}
          controls
          autoPlay
          loop
          playsInline
          className="max-h-[min(74vh,760px)] w-full rounded-card bg-ink object-contain"
        >
          <source src={videoUrl} type="video/mp4" />
          {webmUrl !== videoUrl && <source src={webmUrl} type="video/webm" />}
        </video>

        {/* Only when this clip is also a published post. */}
        {reel.code && (
          <a
            href={reelUrl(reel.code)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn mt-3 w-full bg-bone text-ink hover:bg-blush-deep hover:text-bone"
          >
            <InstagramGlyph />
            {t.work.openOnInstagram}
          </a>
        )}
      </div>
    </div>
  )
}
