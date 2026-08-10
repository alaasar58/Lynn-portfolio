import { dictionaries, languages, useI18n } from '../i18n'

/**
 * Compact three-way language toggle for the header.
 *
 * Deliberately not a dropdown: with only three languages, showing all of them
 * is faster, needs no open/close state, and reads as part of the design rather
 * than a browser control.
 */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, t, setLang } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.language.title}
      className={`flex items-center gap-0.5 rounded-full border border-line bg-bone/60 p-0.5 ${className}`}
    >
      {languages.map((code) => {
        const active = lang === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            title={dictionaries[code].meta.name}
            className={`min-w-9 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all duration-300 ${
              active
                ? 'bg-ink text-bone'
                : 'text-ink-muted hover:bg-blush/50 hover:text-ink'
            }`}
          >
            <span aria-hidden="true">{dictionaries[code].meta.short}</span>
            <span className="sr-only">{dictionaries[code].meta.name}</span>
          </button>
        )
      })}
    </div>
  )
}
