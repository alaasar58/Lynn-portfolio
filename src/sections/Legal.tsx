import type { ReactNode } from 'react'
import { useI18n } from '../i18n'
import type { LegalRoute } from '../lib/useHashRoute'

/**
 * The imprint and the privacy policy.
 *
 * Both are plain reading pages in the site's own type and palette — no cards,
 * no columns. Legal text is read in one narrow measure or not at all.
 *
 * Everything on them comes from the dictionaries, so the language switcher
 * works here exactly as it does on the site.
 */
export function Legal({ route }: { route: LegalRoute }) {
  const { t } = useI18n()
  const page = route === 'imprint' ? t.legal.imprint : t.legal.privacy

  return (
    <main className="shell max-w-[46rem] pb-28 pt-32 sm:pt-40">
      <a
        href="#top"
        className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-300 hover:text-blush-deep"
      >
        <span aria-hidden="true" className="rtl:rotate-180">
          ←
        </span>
        {t.legal.back}
      </a>

      <h1 className="mt-8 text-[clamp(2.2rem,6vw,3.2rem)] leading-[1.1]">{page.title}</h1>
      <p className="mt-5 leading-relaxed text-ink-soft">{page.intro}</p>

      <p className="mt-3 text-sm text-ink-muted">
        {t.legal.updatedLabel}: {t.legal.updated}
      </p>

      {route === 'imprint' ? <Imprint /> : <Privacy />}

      <div className="mt-20 border-t border-line pt-8">
        <a
          href="#top"
          className="inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-300 hover:text-blush-deep"
        >
          <span aria-hidden="true" className="rtl:rotate-180">
            ←
          </span>
          {t.legal.back}
        </a>
      </div>
    </main>
  )
}

function Imprint() {
  const { t } = useI18n()
  const page = t.legal.imprint

  return (
    <>
      <div className="mt-14 space-y-10">
        {page.blocks.map((block) => (
          <section key={block.title}>
            <Heading>{block.title}</Heading>
            <div className="mt-3 space-y-1 leading-relaxed text-ink-soft">
              {block.lines.map((line) => (
                <p key={line}>
                  <Fillable text={line} />
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <Heading>{page.disputeTitle}</Heading>
        <p className="mt-3 leading-relaxed text-ink-soft">{page.dispute}</p>
      </section>

      <section className="mt-12">
        <Heading>{page.liabilityTitle}</Heading>
        <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">
          {page.liability.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>
    </>
  )
}

function Privacy() {
  const { t } = useI18n()

  return (
    <div className="mt-14 space-y-12">
      {t.legal.privacy.sections.map((section) => (
        <section key={section.title}>
          <Heading>{section.title}</Heading>
          <div className="mt-3 space-y-4 leading-relaxed text-ink-soft">
            {section.body.map((paragraph, index) => (
              <p key={index}>
                <Fillable text={paragraph} />
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function Heading({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-xl sm:text-2xl">{children}</h2>
}

/**
 * Marks anything still waiting on a real value.
 *
 * An imprint with a missing address is not merely incomplete, it is the kind of
 * incomplete that gets a warning letter. So `[…]` in the dictionary is rendered
 * highlighted rather than as ordinary text: it cannot be published by accident
 * and mistaken for finished copy.
 */
function Fillable({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g)

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('[') && part.endsWith(']') ? (
          <mark
            key={index}
            className="rounded bg-blush px-1.5 py-0.5 text-ink decoration-clip"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  )
}
