import { useState } from 'react'
import type { FormEvent } from 'react'
import { Section } from '../components/Section'
import { site } from '../content/site'
import { useI18n } from '../i18n'
import { InstagramGlyph, TikTokGlyph } from '../components/Glyphs'

/*
 * Where an enquiry goes.
 *
 * This site is static — GitHub Pages serves files and runs nothing — so a form
 * cannot send an email by itself. Something has to relay it, and that relay is
 * FormSubmit: the browser posts the fields, FormSubmit emails them to the
 * address below. No account, no key, and no database anywhere; the enquiry
 * exists as an email in Lynn's inbox and nowhere else. That is the whole point
 * of picking it over a spreadsheet or a form builder.
 *
 * ONE-TIME STEP, AND ONLY LYNN CAN DO IT: the very first enquiry makes
 * FormSubmit send *her* a confirmation email with an activation link. Until she
 * clicks it, nothing is forwarded. After that it is silent and permanent.
 *
 * `VITE_FORM_ENDPOINT` still overrides this if the relay is ever swapped for
 * another one — it must be a URL that accepts a POST of form data and answers
 * with CORS allowed.
 *
 * !! THE PRIVACY POLICY DESCRIBES THIS !!
 *
 * Form data now leaves the visitor's browser and passes through a processor.
 * The "contact form" section of `legal.privacy` says so in all three
 * dictionaries — who receives it, what is sent, on what basis, how long it is
 * kept. Change the relay and that section has to change with it.
 */
const FORM_ENDPOINT =
  (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ||
  `https://formsubmit.co/ajax/${site.email}`

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Good enough to catch a typo; anything stricter rejects valid addresses. */
const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())

export function Contact() {
  const { t } = useI18n()
  const [status, setStatus] = useState<Status>('idle')
  /* Which fields are currently wrong, by field name. Empty until a first
     submit: telling someone their email is invalid while they are still
     halfway through typing it is a nuisance, not help. */
  const [errors, setErrors] = useState<Record<string, string>>({})
  const hasErrors = Object.keys(errors).length > 0

  const textFields = [
    {
      name: 'name',
      label: t.contact.fields.name,
      type: 'text',
      required: true,
      autoComplete: 'name',
    },
    {
      name: 'company',
      label: t.contact.fields.company,
      type: 'text',
      required: true,
      autoComplete: 'organization',
    },
    {
      name: 'email',
      label: t.contact.fields.email,
      type: 'email',
      required: true,
      autoComplete: 'email',
    },
    { name: 'product', label: t.contact.fields.product, type: 'text', required: true },
    { name: 'link', label: t.contact.fields.link, type: 'url', required: false },
  ]

  /* All three are required. An enquiry that says neither what kind of video,
     nor how many, nor when, cannot be answered without a second email — and
     the second email is where enquiries go quiet. */
  const selects = [
    { name: 'contentType', label: t.contact.fields.contentType, options: t.contact.contentTypes },
    { name: 'videoCount', label: t.contact.fields.videoCount, options: t.contact.videoCounts },
    {
      name: 'timeline',
      label: t.contact.fields.timeline,
      options: t.contact.timelines,
      wide: true,
    },
  ]

  /** Every field that must be filled in, in the order they appear. */
  const requiredNames = [
    ...textFields.filter((field) => field.required).map((field) => field.name),
    ...selects.map((select) => select.name),
    'brief',
  ]

  /**
   * Checks every required field and reports all of them at once.
   *
   * Not one at a time: a form that reveals its next objection only after you
   * have fixed the last is the reason people give up on forms.
   */
  const validate = (data: FormData) => {
    const found: Record<string, string> = {}

    for (const name of requiredNames) {
      const value = String(data.get(name) ?? '').trim()
      if (!value) found[name] = t.contact.errors.required
    }

    const email = String(data.get('email') ?? '').trim()
    if (email && !looksLikeEmail(email)) found.email = t.contact.errors.email

    return found
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: a real person never fills a hidden field. Nothing is said about
    // it either — a bot told why it failed is a bot that comes back fixed.
    if (data.get('website')) return

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('idle')
      // Put the cursor in the first thing that needs attention.
      const first = requiredNames.find((name) => found[name]) ?? Object.keys(found)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    /*
     * What the relay itself reads. `_subject` is the subject line of the mail
     * that lands in Lynn's inbox, `_template=table` lays the answers out as a
     * table rather than a run of lines, and `_captcha=false` skips the
     * interstitial — the honeypot above is doing that job already.
     */
    data.set('_subject', `${t.contact.mailSubject} — ${data.get('company') || data.get('name')}`)
    data.set('_template', 'table')
    data.set('_captcha', 'false')
    data.delete('website')

    setStatus('sending')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`Request failed: ${response.status}`)

      /* FormSubmit answers 200 even when it did not send anything — while the
         address is still unconfirmed, for instance. The body is the truth. */
      const result = await response.json().catch(() => null)
      if (result && String(result.success) === 'false') {
        throw new Error(String(result.message ?? 'rejected'))
      }

      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title} lede={t.contact.lede}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* noValidate: the browser's own bubbles appear in the browser's
            language, not the one the visitor picked on this page. The checks
            below say the same things in all three. */}
        <form onSubmit={handleSubmit} noValidate className="relative min-w-0 lg:col-span-7">
          <div className="grid gap-5 sm:grid-cols-2">
            {textFields.map((field) => (
              <div
                key={field.name}
                className={`min-w-0 ${field.name === 'link' ? 'sm:col-span-2' : ''}`}
              >
                <label className="field-label" htmlFor={field.name}>
                  {field.label}
                  {field.required ? (
                    <RequiredMark />
                  ) : (
                    <span className="text-ink-muted"> ({t.contact.optional})</span>
                  )}
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  aria-invalid={errors[field.name] ? true : undefined}
                  aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                  className={fieldClass(errors[field.name])}
                />
                <FieldError name={field.name} message={errors[field.name]} />
              </div>
            ))}

            {selects.map((select) => (
              <div key={select.name} className={`min-w-0 ${select.wide ? 'sm:col-span-2' : ''}`}>
                <label className="field-label" htmlFor={select.name}>
                  {select.label}
                  <RequiredMark />
                </label>
                <select
                  id={select.name}
                  name={select.name}
                  required
                  defaultValue=""
                  aria-invalid={errors[select.name] ? true : undefined}
                  aria-describedby={errors[select.name] ? `${select.name}-error` : undefined}
                  className={fieldClass(errors[select.name])}
                >
                  <option value="" disabled>
                    {t.contact.select}
                  </option>
                  {select.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <FieldError name={select.name} message={errors[select.name]} />
              </div>
            ))}

            <div className="min-w-0 sm:col-span-2">
              <label className="field-label" htmlFor="brief">
                {t.contact.fields.brief}
                <RequiredMark />
              </label>
              <textarea
                id="brief"
                name="brief"
                rows={5}
                required
                aria-invalid={errors.brief ? true : undefined}
                aria-describedby={errors.brief ? 'brief-error' : undefined}
                className={`${fieldClass(errors.brief)} resize-y`}
              />
              <FieldError name="brief" message={errors.brief} />
            </div>

            <div className="min-w-0 sm:col-span-2">
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

          <p className="mt-6 text-sm text-ink-muted">{t.contact.requiredNote}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn-primary" disabled={status === 'sending'}>
              {status === 'sending' ? t.contact.sending : t.contact.submit}
            </button>
            <p aria-live="polite" className="text-sm">
              {hasErrors && <span className="text-blush-deep">{t.contact.errors.summary}</span>}
              {!hasErrors && status === 'sent' && (
                <span className="text-ink-soft">{t.contact.success}</span>
              )}
              {!hasErrors && status === 'error' && (
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

        <aside className="min-w-0 lg:col-span-5">
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
                      {social.label === 'Instagram' ? (
                        <InstagramGlyph className="h-4 w-4" />
                      ) : (
                        <TikTokGlyph className="h-4 w-4" />
                      )}
                      {social.label}
                      <span dir="ltr" className="text-ink-muted">
                        {social.handle}
                      </span>
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

/** The asterisk on a required label, and in the note that explains it. */
function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-blush-deep">
      {' '}
      *
    </span>
  )
}

/** One line under one field. Nothing at all when the field is fine. */
function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null
  return (
    <p id={`${name}-error`} className="mt-1.5 text-xs text-blush-deep">
      {message}
    </p>
  )
}

/** A field, plus the ring it wears while it is the one in the way. */
const fieldClass = (error?: string) =>
  error ? 'field border-blush-deep ring-1 ring-blush-deep' : 'field'
