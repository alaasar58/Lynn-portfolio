import { nav, site } from '../content/site'

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="shell py-16">
        <div className="flex flex-col gap-10 border-b border-bone/15 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-3xl">
              {site.name}
              <span className="text-clay">.</span>
            </p>
            <p className="mt-2 text-sm text-bone/60">{site.role}</p>
          </div>
          <a href="#contact" className="btn self-start bg-bone text-ink hover:bg-clay hover:text-bone">
            Work With Me
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:justify-between">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((entry) => (
              <a
                key={entry.href}
                href={entry.href}
                className="text-sm text-bone/60 transition-colors hover:text-bone"
              >
                {entry.label}
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
                {social.label} <span className="text-bone/40">{social.handle}</span>
              </a>
            ))}
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-bone/60 transition-colors hover:text-bone"
            >
              Email
            </a>
          </div>
        </div>

        <p className="mt-10 text-xs text-bone/40">
          © {new Date().getFullYear()} {site.name}. {site.role}.
        </p>
      </div>
    </footer>
  )
}
