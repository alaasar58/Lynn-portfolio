import { Section } from '../components/Section'
import { images, socialStats } from '../content/site'
import { useI18n } from '../i18n'
import { formatCount } from '../lib/format'
import { asset } from '../lib/asset'

/**
 * About. Personal but brief — positioning, languages and audience credibility,
 * with the values statement kept professional and understated.
 */
export function About() {
  const { t, lang } = useI18n()

  // Follower figures are built from the single source in site.ts, so updating a
  // count means editing one number rather than six strings across three files.
  const followers = (count: number) =>
    `${t.about.audience.approx}${formatCount(count, lang)} ${t.about.audience.followers}`

  const audience = [
    { label: t.about.audience.instagram, value: followers(socialStats.instagramFollowers) },
    { label: t.about.audience.tiktok, value: followers(socialStats.tiktokFollowers) },
    { label: t.about.audience.audienceLabel, value: t.about.audience.audienceValue },
    { label: t.about.audience.reachLabel, value: t.about.audience.reachValue },
  ]

  return (
    <Section id="about" tone="sand" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-5 lg:col-span-7">
          {t.about.paragraphs.map((paragraph, index) => (
            <p key={index} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}

          <div className="rounded-card border border-line bg-bone p-6">
            <h3 className="text-lg">{t.about.valuesTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.about.valuesBody}</p>
          </div>
        </div>

        <div className="space-y-10 lg:col-span-5">
          {/* Replace public/media/about/portrait.jpg to change this image. */}
          <img
            src={asset(images.aboutPortrait)}
            alt=""
            aria-hidden="true"
            width={1200}
            height={960}
            loading="lazy"
            decoding="async"
            className="aspect-[5/4] w-full rounded-card object-cover"
          />

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              {t.about.languagesTitle}
            </h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {t.about.languages.map((language) => (
                <li key={language.name} className="py-4">
                  <p className="font-display text-xl">{language.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{language.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.about.languagesNote}</p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
              {t.about.audienceTitle}
            </h3>
            <dl className="mt-4 space-y-3">
              {audience.map((entry) => (
                <div key={entry.label} className="flex justify-between gap-6 text-sm">
                  <dt className="text-ink-muted">{entry.label}</dt>
                  <dd className="text-end text-ink">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  )
}
