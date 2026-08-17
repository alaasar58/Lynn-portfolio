import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { site } from '../content/site'
import {
  detectMosqueLang,
  exampleUrl,
  mosqueCopy,
  mosqueDirFor,
  mosqueLanguages,
} from './copy'
import type { MosqueLang } from './copy'

/**
 * The offer to build websites for mosques, at `#mosques`.
 *
 * It is deliberately a page of its own and not a section of the media kit:
 *
 *  - Nothing on the media kit links here. A visitor arrives from a mosque's own
 *    website, through the credit line in its footer.
 *  - Nothing here links into the media kit either. Someone who came to ask
 *    about a website for their congregation should not be steered into reels,
 *    follower counts and UGC rates.
 *  - It carries its own language chooser with a fourth language, Turkish, which
 *    the rest of the site does not have. The copy lives in `./copy.ts`, so that
 *    fourth language costs nothing anywhere else.
 *
 *  The page belongs to this site rather than to any mosque on purpose: once
 *  there is more than one, none of them is the central one, and the offer must
 *  not appear to come from a particular congregation.
 */
export function Mosques() {
  const [lang, setLang] = useState<MosqueLang>(() => readStored() ?? detectMosqueLang())
  const t = mosqueCopy[lang]
  const dir = mosqueDirFor(lang)

  /*
   * This page steps outside the site's language system, so it sets the document
   * itself and puts everything back when it is left again — otherwise picking
   * Turkish here would leave the media kit in a language it does not have.
   */
  useEffect(() => {
    const root = document.documentElement
    const previous = { lang: root.lang, dir: root.dir, title: document.title }

    root.lang = lang
    root.dir = dir
    document.title = `${t.documentTitle} · ${site.fullName}`

    return () => {
      root.lang = previous.lang
      root.dir = previous.dir
      document.title = previous.title
    }
  }, [lang, dir, t.documentTitle])

  /*
   * Not for search engines. The page is meant to be found through a mosque's
   * website, not through a search for the name on it — and an offer page has no
   * business turning up above the media kit itself.
   */
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  const choose = (next: MosqueLang) => {
    setLang(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Choice still applies for this visit even if it cannot be stored.
    }
  }

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(t.contact.subject)}`

  return (
    <main dir={dir} className="bg-bone pb-24">
      {/* The page's own quiet header: a name, and the four languages. */}
      <header className="border-b border-line">
        <div className="shell flex h-20 items-center justify-between gap-4">
          <p dir="ltr" className="font-display text-xl tracking-tight">
            {site.name}
            <span className="text-blush-deep">.</span>
          </p>

          <div
            role="group"
            aria-label={t.meta.name}
            className="flex items-center gap-0.5 rounded-full border border-line bg-bone/60 p-0.5"
          >
            {mosqueLanguages.map((code) => {
              const active = code === lang
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => choose(code)}
                  aria-pressed={active}
                  title={mosqueCopy[code].meta.name}
                  className={`min-w-9 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                    active ? 'bg-ink text-bone' : 'text-ink-muted hover:bg-blush/50 hover:text-ink'
                  }`}
                >
                  <span aria-hidden="true">{mosqueCopy[code].meta.short}</span>
                  <span className="sr-only">{mosqueCopy[code].meta.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Opening */}
      <section className="shell pt-16 sm:pt-24">
        <div className="max-w-3xl">
          <h1 className="text-[clamp(2.2rem,6vw,3.4rem)] leading-[1.1]">{t.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t.lede}</p>
          <p className="mt-5 leading-relaxed text-ink-soft">{t.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={mailto} className="btn-primary">
              {t.contact.cta}
            </a>
          </div>
        </div>

        {/* The finished website, as proof rather than a claim. */}
        <div className="mt-12 rounded-card border border-line bg-sand/60 p-6 sm:p-8">
          <p className="leading-relaxed text-ink-soft">{t.example.text}</p>
          <a
            href={exampleUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-secondary mt-5 bg-bone"
          >
            {t.example.cta}
            <span aria-hidden="true" className="rtl:rotate-180">
              →
            </span>
          </a>
        </div>
      </section>

      {/* What it is, what it costs, how it works */}
      <section className="shell mt-14 grid gap-6 lg:grid-cols-2">
        <Block className="lg:col-span-2" title={t.blocks.offer.title} text={t.blocks.offer.text}>
          <Points items={t.blocks.offer.points} columns />
        </Block>

        <Block title={t.blocks.costs.title} text={t.blocks.costs.text}>
          <Points items={t.blocks.costs.points} />
        </Block>

        <Block title={t.blocks.process.title} text={t.blocks.process.text}>
          <Points items={t.blocks.process.points} ordered />
        </Block>

        <Block className="lg:col-span-2" title={t.blocks.needed.title} text={t.blocks.needed.text}>
          <Points items={t.blocks.needed.points} columns />
        </Block>
      </section>

      {/* Contact */}
      <section className="shell mt-14">
        <div className="rounded-card bg-ink px-6 py-10 text-bone sm:px-10">
          <h2 className="font-display text-2xl sm:text-3xl">{t.contact.title}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-bone/70">{t.contact.text}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={mailto} className="btn bg-bone text-ink hover:bg-blush-deep hover:text-bone">
              {t.contact.cta}
            </a>
            <a
              dir="ltr"
              href={mailto}
              className="text-sm text-bone/60 underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              {site.email}
            </a>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-ink-muted">{t.contact.note}</p>
      </section>
    </main>
  )
}

const STORAGE_KEY = 'lynn.mosques.lang'

function readStored(): MosqueLang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return mosqueLanguages.includes(stored as MosqueLang) ? (stored as MosqueLang) : null
  } catch {
    return null
  }
}

function Block({
  title,
  text,
  children,
  className = '',
}: {
  title: string
  text: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`rounded-card border border-line bg-sand/40 p-6 sm:p-8 ${className}`}>
      <h2 className="font-display text-xl sm:text-2xl">{title}</h2>
      <p className="mt-3 leading-relaxed text-ink-soft">{text}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

/**
 * A list of plain sentences.
 *
 * `ordered` numbers the steps, `columns` splits a long list across two columns
 * on wide screens so it reads as a checklist rather than a wall.
 */
function Points({
  items,
  ordered = false,
  columns = false,
}: {
  items: string[]
  ordered?: boolean
  columns?: boolean
}) {
  const shared = 'space-y-3 leading-relaxed text-ink-soft'
  const split = columns ? 'lg:columns-2 lg:gap-10 lg:space-y-0' : ''

  if (ordered) {
    return (
      <ol className={`${shared} ${split}`}>
        {items.map((item, index) => (
          <li key={item} className="flex gap-3 break-inside-avoid lg:mb-3">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blush text-xs font-medium text-ink"
            >
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <ul className={`${shared} ${split}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 break-inside-avoid lg:mb-3">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
