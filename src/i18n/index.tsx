import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { en } from './en'
import { de } from './de'
import { ar } from './ar'
import type { Dictionary } from './en'

export type Lang = 'en' | 'de' | 'ar'

export const languages: Lang[] = ['en', 'de', 'ar']

export const dictionaries: Record<Lang, Dictionary> = { en, de, ar }

/** Arabic reads right-to-left; the other two do not. */
export const dirFor = (lang: Lang): 'rtl' | 'ltr' => (lang === 'ar' ? 'rtl' : 'ltr')

const STORAGE_KEY = 'lynn.lang'

type LanguageContextValue = {
  lang: Lang
  /** The active dictionary. Every component reads its copy from here. */
  t: Dictionary
  dir: 'rtl' | 'ltr'
  setLang: (lang: Lang) => void
  /** True until a language has been chosen or restored — drives the modal. */
  needsChoice: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readStored(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return languages.includes(stored as Lang) ? (stored as Lang) : null
  } catch {
    // Private mode or blocked storage — fall back to asking each visit.
    return null
  }
}

/**
 * Picks the best default for the selection modal, so the visitor's own language
 * is pre-highlighted rather than always defaulting to English.
 */
function detectPreferred(): Lang {
  if (typeof navigator === 'undefined') return 'en'
  for (const entry of navigator.languages ?? [navigator.language]) {
    const code = entry?.slice(0, 2).toLowerCase()
    if (code === 'de') return 'de'
    if (code === 'ar') return 'ar'
    if (code === 'en') return 'en'
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const stored = typeof window === 'undefined' ? null : readStored()
  const [lang, setLangState] = useState<Lang>(stored ?? detectPreferred())
  const [needsChoice, setNeedsChoice] = useState(stored === null)

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    setNeedsChoice(false)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Choice still applies for this visit even if it cannot be persisted.
    }
  }, [])

  // Keep the document in step so screen readers, fonts and text selection all
  // behave correctly, and CSS can key off [dir="rtl"].
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dirFor(lang)
  }, [lang])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: dictionaries[lang], dir: dirFor(lang), setLang, needsChoice }),
    [lang, setLang, needsChoice],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useI18n must be used inside <LanguageProvider>')
  return context
}
