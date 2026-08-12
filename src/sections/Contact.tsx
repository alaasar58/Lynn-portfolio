import { useState } from 'react'
import type { FormEvent } from 'react'
import { Section } from '../components/Section'
import { site } from '../content/site'
import { useI18n } from '../i18n'
import { InstagramGlyph } from '../components/InstagramGlyph'

/*
 * Where the form posts.
 *
 * Set VITE_FORM_ENDPOINT (e.g. a Formspree / Getform / Basin URL) in a `.env`
 * file or in the hosting provider's environment settings and inquiries are sent
 * straight through. With no endpoint configured the form falls back to opening
 * a pre-filled email to the address in `site.email`, so it is never a dead end.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function Contact() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')

  const textFields = [
    { name: 'name', label: t.contact.fields.name, type: 'text', required: true, autoComplete: 'name' },
    {
      name: 'company',
      label: t.contact.fields.company,
      type: 'text',
      required: true,
      autoComplete: 'organization',
    },
    { name: 'email', label: t.contact.fields.email, type: 'email', required: true, autoComplete: 'email' },
    { name: 'product', label: t.contact.fields.product, type: 'text', required: true },
    { name: 'link', label: t.contact.fields.link, type: 'url', required: false },
  ]

  const selects = [
    { name: 'contentType', label: t.contact.fields.contentType, options: t.contact.contentTypes },
    { name: 'videoCount', label: t.contact.fields.videoCount, options: t.contact.videoCounts },
    { name: 'timeline', label: t.contact.fields.timeline, options: t.contact.timelines, wide: true },
  ]

  /*
   * Builds the body of the fallback email.
   *
   * Each input's `name` attribute is deliberately identical to its key under
   * `t.contact.fields`, so the mail is labelled in the visitor's language
   * instead of with raw field names. Renaming one without the other silently
   * falls back to the raw name.
   */
  const buildSummary = (data: FormData) => {
    const labels = t.contact.fields as Record<string, string>
    const lines: string[] = []
    for (const [key, value] of data.entries()) {
      if (key === 'website') continue // the honeypot never belongs in the mail
      if (typeof value === 'string' && value.trim()) {
        lines.push(`${labels[key] ?? key}: ${value}`)
      }
    }
    return lines.join('\n')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: a real person never fills a hidden field.
    if (data.get('website')) return

    if (!FORM_ENDPOINT) {
      const subject = `${t.contact.mailSubject} — ${data.get('company') || data.get('name')}`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(buildSummary(data))}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} lede={t.contact.lede}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={handleSubmit} className="relative lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {textFields.map((field) => (
              <div key={field.name} className={field.name === 'link' ? 'sm:col-span-2' : ''}>
                <label className="field-label" htmlFor={field.name}>
                  {field.label}
                  {!field.required && (
                    <span className="text-ink-muted"> ({t.contact.optional})</span>
                  )}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  className="field"
                />
              </div>
            ))}

            {selects.map((select) => (
              <div key={select.name} className={select.wide ? 'sm:col-span-2' : ''}>
                <label className="field-label" htmlFor={select.name}>
                  {select.label}
                </label>
                <select id={select.name} name={select.name} className="field" defaultValue="">
                  <option value="" disabled>
                    {t.contact.select}
                  </option>
                  {select.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="brief">
                {t.contact.fields.brief}
              </label>
              <textarea id="brief" name="brief" rows={5} required className="field resize-y" />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="notes">
                {t.contact.fields.notes}{' '}
                <span className="text-ink-muted">({t.contact.optional})</span>
              </label>
              <textarea id="notes" name="notes" rows={3} className="field resize-y" />
            </div>
          </div>

          {/* Honeypot — hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute start-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">{t.contact.honeypot}</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? t.contact.sending : t.contact.submit}
            </button>
            <p aria-live="polite" className="text-sm">
              {status === 'sent' && <span className="text-ink-soft">{t.contact.success}</span>}
              {status === 'error' && (
                <span className="text-blush-deep">
                  {t.contact.error}{' '}
                  <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </span>
              )}
            </p>
          </div>
        </form>

        <aside className="lg:col-span-5">
          <div className="rounded-card border border-line bg-sand/60 p-8">
            <h3 className="text-lg">{t.contact.preferEmail}</h3>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block break-words font-display text-2xl text-ink hover:text-blush-deep"
            >
              {site.email}
            </a>

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                {t.contact.helpfulTitle}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {t.contact.helpful.map((entry) => (
                  <li key={entry} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blush-deep"
                    />
                    {entry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                {t.contact.elsewhere}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 text-ink hover:text-blush-deep"
                    >
                      {social.label === 'Instagram' && <InstagramGlyph className="h-4 w-4" />}
                      {social.label}
                      <span className="text-ink-muted">{social.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  )
}
