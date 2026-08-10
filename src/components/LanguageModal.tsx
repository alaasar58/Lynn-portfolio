import { useEffect, useRef, useState } from 'react'
import { dictionaries, languages, useI18n } from '../i18n'
import type { Lang } from '../i18n'

/**
 * First-visit language choice.
 *
 * Shown once, then never again — the selection is stored locally and the
 * switcher in the header handles any later change. The visitor's browser
 * language is pre-selected, so for most people this is a single tap.
 *
 * Each option is written in its own language, which is the one thing that makes
 * a language picker readable to someone who cannot read the current one.
 */
export function LanguageModal() {
  const { lang, t, setLang, needsChoice } = useI18n()
  const [choice, setChoice] = useState<Lang>(lang)
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!needsChoice) return
    document.body.style.overflow = 'hidden'
    confirmRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [needsChoice])

  if (!needsChoice) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.language.title}
      className="fixed inset-0 z-[80] flex items-center justify-center p-5"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/55 backdrop-blur-md" />

      <div className="reveal reveal-in relative w-full max-w-sm overflow-hidden rounded-card bg-bone p-8 shadow-2xl shadow-ink/20 ring-1 ring-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 end-[-3rem] h-40 w-40 rounded-full bg-blush/60 blur-2xl"
        />

        <div className="relative">
          <p className="font-display text-2xl">
            {t.language.title}
            <span className="text-blush-deep">.</span>
          </p>
          <p className="mt-2 text-sm text-ink-muted">{t.language.subtitle}</p>

          <div className="mt-7 grid gap-2">
            {languages.map((code) => {
              const selected = choice === code
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setChoice(code)}
                  aria-pressed={selected}
                  dir={code === 'ar' ? 'rtl' : 'ltr'}
                  className={`flex items-center justify-between rounded-xl border px-5 py-4 text-start transition-all duration-300 ${
                    selected
                      ? 'border-blush-mid bg-blush/40'
                      : 'border-line bg-transparent hover:border-blush-mid/60 hover:bg-sand/60'
                  }`}
                >
                  <span className="font-display text-xl">{dictionaries[code].meta.name}</span>
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      selected ? 'border-blush-deep bg-blush-deep' : 'border-line'
                    }`}
                  >
                    {selected && (
                      <svg viewBox="0 0 24 24" className="h-3 w-3 text-bone" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12.5 4.5 4.5L19 7.5" />
                      </svg>
                    )}
                  </span>
                </button>
              )
            })}
          </div>

          <button
            ref={confirmRef}
            type="button"
            onClick={() => setLang(choice)}
            className="btn-primary mt-6 w-full"
          >
            {dictionaries[choice].language.confirm}
          </button>
        </div>
      </div>
    </div>
  )
}
