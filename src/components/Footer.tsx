import { nav, site } from '../content/site'
import { useI18n } from '../i18n'

export function Footer() {
  const { t } = useI18n()

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
          <a
            href="#contact"
            className="btn self-start bg-bone text-ink hover:bg-blush-deep hover:text-bone"
          >
            {t.footer.cta}
          </a>
        </div>

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

        <p className="mt-10 text-xs text-bone/40">
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}.
        </p>
      </div>
    </footer>
  )
}
