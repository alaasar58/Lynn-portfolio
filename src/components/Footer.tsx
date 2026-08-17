import { nav, site } from '../content/site'
import { useI18n } from '../i18n'

type FooterProps = {
  /**
   * `minimal` drops everything that leads back into the media kit — the section
   * navigation, the social handles and the inquiry button. It is used by the
   * mosque offer at `#mosques`, whose visitors came for a website for their
   * congregation and should not be pushed towards reels and rates. What stays
   * is what every German site must carry: imprint, privacy and the copyright.
   */
  variant?: 'full' | 'minimal'
}

export function Footer({ variant = 'full' }: FooterProps) {
  const { t } = useI18n()
  const minimal = variant === 'minimal'

  return (
    <footer className="bg-ink text-bone">
      <div className="shell py-16">
        <div className="flex flex-col gap-10 border-b border-bone/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-3xl">
              {/* Inline isolate: keeps the full stop after the name in RTL. */}
              <span dir="ltr">
                {site.name}
                <span className="text-blush-mid">.</span>
              </span>
            </p>
            <p className="mt-2 text-sm text-bone/60">{t.footer.rights}</p>
          </div>
          {!minimal && (
            <a
              href="#contact"
              className="btn self-start bg-bone text-ink hover:bg-blush-deep hover:text-bone"
            >
              {t.footer.cta}
            </a>
          )}
        </div>

        {!minimal && (
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:justify-between">
            <nav aria-label={t.nav.ariaFooter} className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((entry) => (
                <a
                  key={entry.href}
                  href={entry.href}
                  className="text-sm text-bone/60 transition-colors hover:text-bone"
                >
                  {t.nav[entry.key]}
                </a>
              ))}
            </nav>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-bone/60 transition-colors hover:text-bone"
                >
                  {social.label}{' '}
                <span dir="ltr" className="text-bone/40">
                  {social.handle}
                </span>
                </a>
              ))}
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-bone/60 transition-colors hover:text-bone"
              >
                {t.footer.email}
              </a>
            </div>
          </div>
        )}

        {/*
          The legal links sit on their own line, above the copyright and
          separated by a rule, so they are found where every German site puts
          them. `justify-between` on a row that mirrors under RTL keeps them on
          the reading side in Arabic without any special case.
        */}
        <div className="mt-10 flex flex-col gap-4 border-t border-bone/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label={t.legal.navLabel} className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="#imprint"
              className="text-sm text-bone/75 underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              {t.legal.imprint.navLabel}
            </a>
            <a
              href="#privacy"
              className="text-sm text-bone/75 underline-offset-4 transition-colors hover:text-bone hover:underline"
            >
              {t.legal.privacy.navLabel}
            </a>
          </nav>

          <p className="text-xs text-bone/40">
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  )
}
