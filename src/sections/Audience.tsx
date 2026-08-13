import { Section } from '../components/Section'
import { audienceFacts, socialStats } from '../content/site'
import { useI18n } from '../i18n'
import { formatCount } from '../lib/format'

/**
 * Page three: the audience, honestly.
 *
 * Every figure on this page traces back to `socialStats` or `audienceFacts` in
 * `src/content/site.ts`. Nothing is estimated, interpolated or rounded up for
 * effect — reach, impressions and engagement rate have no verified value yet,
 * so they are shown as a designed "on request" state instead of a number.
 *
 * That is a deliberate choice, not a gap. A brand can check a reach figure, and
 * an invented one is the fastest way to lose the conversation.
 */
export function Audience() {
  const { t, lang } = useI18n()

  const women = audienceFacts.womenPercent
  const others = 100 - women

  const followers = [
    { label: t.audience.instagram, count: socialStats.instagramFollowers },
    { label: t.audience.tiktok, count: socialStats.tiktokFollowers },
  ]

  return (
    <Section
      id="audience"
      page
      eyebrow={t.audience.eyebrow}
      title={t.audience.title}
      lede={t.audience.lede}
    >
      {/* ------------------------------------------------- Verified figures */}
      <div className="grid gap-x-12 gap-y-14 border-t border-line pt-12 lg:grid-cols-12">
        {/* Followers, per platform. */}
        <div className="lg:col-span-5">
          <ul className="space-y-10">
            {followers.map((entry) => (
              <li key={entry.label}>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
                  {entry.label}
                </p>
                <p className="mt-2 font-display text-[clamp(2.8rem,9vw,4.5rem)] leading-none">
                  {t.audience.approx}
                  {formatCount(entry.count, lang)}
                </p>
                <p className="mt-2 text-sm text-ink-muted">{t.audience.followers}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Gender, age, geography. */}
        <div className="space-y-12 lg:col-span-7">
          <div>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
                {t.audience.genderTitle}
              </h3>
              <p className="font-display text-2xl">
                {women}% <span className="text-ink-soft">{t.audience.women}</span>
              </p>
            </div>

            {/* One bar, two parts. A pie chart for a 98/2 split is decoration. */}
            <div
              className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-sand-deep"
              role="img"
              aria-label={`${women}% ${t.audience.women}, ${others}% ${t.audience.men}`}
            >
              <span className="block bg-blush-deep" style={{ width: `${women}%` }} />
              <span className="block bg-blush-mid" style={{ width: `${others}%` }} />
            </div>
            <p className="mt-3 text-sm text-ink-muted">
              {others}% {t.audience.men} · {t.audience.genderNote}
            </p>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {t.audience.ageTitle}
            </h3>
            <p className="mt-3 font-display text-2xl">{t.audience.ageValue}</p>
            {/*
              A band on a scale, not invented per-bracket percentages. It shows
              where the audience sits without claiming a precision I do not have.
            */}
            <div className="mt-5">
              <div className="relative h-1.5 w-full rounded-full bg-sand-deep">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 rounded-full bg-blush-deep"
                  /* The scale below is five evenly spaced marks: 13, 25, 35,
                     45, 65+. 18 falls at ~13% of that width and 35 at 50%. */
                  style={{ insetInlineStart: '13%', width: '37%' }}
                />
              </div>
              <div className="mt-2 flex justify-between text-[0.68rem] text-ink-muted">
                <span>13</span>
                <span>25</span>
                <span>35</span>
                <span>45</span>
                <span>65+</span>
              </div>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
              {t.audience.ageNote}
            </p>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {t.audience.reachTitle}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {t.audience.regions.map((region) => (
                <li key={region} className="flex items-center gap-3 font-display text-xl">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-blush-deep" />
                  {region}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-muted">{t.audience.reachNote}</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------- Not yet published */}
      <div className="mt-20 border-t border-line pt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <h3 className="font-display text-2xl">{t.audience.pendingTitle}</h3>
          <p className="max-w-lg text-sm leading-relaxed text-ink-muted">
            {t.audience.pendingLede}
          </p>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.audience.pendingMetrics.map((metric) => (
            <li key={metric.label} className="bg-sand/70 p-6">
              <p className="text-base text-ink-soft">{metric.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{metric.note}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-bone px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.14em] text-ink-muted">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-blush-mid" />
                {t.audience.pendingBadge}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a href="#contact" className="btn-secondary">
            {t.audience.cta}
          </a>
          <p className="text-sm text-ink-muted">{t.audience.note}</p>
        </div>
      </div>
    </Section>
  )
}
