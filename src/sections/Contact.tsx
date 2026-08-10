import { useState } from 'react'
import type { FormEvent } from 'react'
import { Section } from '../components/Section'
import { contact, site } from '../content/site'

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

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company / Brand', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'product', label: 'Product', type: 'text', required: true },
  { name: 'link', label: 'Product or website link', type: 'url', required: false },
] as const

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  const buildSummary = (data: FormData) => {
    const lines: string[] = []
    for (const [key, value] of data.entries()) {
      if (typeof value === 'string' && value.trim()) {
        lines.push(`${key}: ${value}`)
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
      const subject = `Project inquiry — ${data.get('company') || data.get('name')}`
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
    <Section id="contact" eyebrow={contact.eyebrow} title={contact.title} lede={contact.lede}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <form onSubmit={handleSubmit} className="relative lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.name === 'link' ? 'sm:col-span-2' : ''}
              >
                <label className="field-label" htmlFor={field.name}>
                  {field.label}
                  {!field.required && <span className="text-ink-muted"> (optional)</span>}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  autoComplete={'autoComplete' in field ? field.autoComplete : undefined}
                  className="field"
                />
              </div>
            ))}

            <div>
              <label className="field-label" htmlFor="contentType">
                Type of content
              </label>
              <select id="contentType" name="contentType" className="field" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {contact.contentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label" htmlFor="videoCount">
                Number of videos
              </label>
              <select id="videoCount" name="videoCount" className="field" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {contact.videoCounts.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="timeline">
                Desired timeline
              </label>
              <select id="timeline" name="timeline" className="field" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                {contact.timelines.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="brief">
                Brief / campaign goal
              </label>
              <textarea id="brief" name="brief" rows={5} required className="field resize-y" />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label" htmlFor="notes">
                Additional information <span className="text-ink-muted">(optional)</span>
              </label>
              <textarea id="notes" name="notes" rows={3} className="field resize-y" />
            </div>
          </div>

          {/* Honeypot — hidden from people, tempting to bots. */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send inquiry'}
            </button>
            <p aria-live="polite" className="text-sm">
              {status === 'sent' && (
                <span className="text-ink-soft">
                  Thank you — your inquiry is on its way. I usually reply within two working days.
                </span>
              )}
              {status === 'error' && (
                <span className="text-clay-deep">
                  Something went wrong. Please email me directly at{' '}
                  <a className="underline underline-offset-4" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </span>
              )}
            </p>
          </div>
        </form>

        <aside className="lg:col-span-5">
          <div className="rounded-card border border-line bg-sand/60 p-8">
            <h3 className="text-lg">Prefer email?</h3>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block font-display text-2xl break-words text-ink hover:text-clay-deep"
            >
              {site.email}
            </a>

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                Helpful to include
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-soft">
                {[
                  'Target audience and campaign goal',
                  'Product features and key messages',
                  'Required and prohibited claims',
                  'Brand guidelines and desired style',
                  'Where the content will be used',
                ].map((entry) => (
                  <li key={entry} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay" />
                    {entry}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
                Elsewhere
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-ink hover:text-clay-deep"
                    >
                      {social.label} <span className="text-ink-muted">{social.handle}</span>
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
