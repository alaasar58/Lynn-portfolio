import { useEffect, useState } from 'react'
import { nav, site } from '../content/site'
import { useI18n } from '../i18n'
import { LanguageSwitcher } from './LanguageSwitcher'

/**
 * Fixed site header. Transparent over the hero, then settles into a solid,
 * blurred bar once the page scrolls — so navigation and the primary CTA are
 * always reachable without covering the opening image.
 */
export function Header() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? 'border-b border-line bg-bone/90 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-display text-xl tracking-tight"
          onClick={() => setOpen(false)}
        >
          {site.name}
          <span className="text-blush-deep">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((entry) => (
            <a
              key={entry.href}
              href={entry.href}
              className="text-sm text-ink-soft transition-colors duration-200 hover:text-blush-deep"
            >
              {t.nav[entry.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:flex" />

          <a href="#contact" className="btn-primary hidden px-5 sm:inline-flex">
            {t.hero.ctaContact}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          >
            <span className="sr-only">{open ? t.nav.menuClose : t.nav.menuOpen}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute start-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute start-0 block h-px w-5 bg-ink transition-transform duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-bone lg:hidden">
        <nav aria-label="Primary mobile" className="shell flex flex-col py-5">
          {nav.map((entry) => (
            <a
              key={entry.href}
              href={entry.href}
              onClick={() => setOpen(false)}
              className="border-b border-line/70 py-3.5 font-display text-2xl"
            >
              {t.nav[entry.key]}
            </a>
          ))}

          <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-5 w-full">
            {t.hero.ctaContact}
          </a>

          <LanguageSwitcher className="mt-4 self-start sm:hidden" />
        </nav>
      </div>
    </header>
  )
}
