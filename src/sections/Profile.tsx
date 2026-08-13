import { Section } from '../components/Section'
import { Brands } from '../components/Brands'
import { ReelPhones } from '../components/ReelPhones'
import { images } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'

/**
 * Page two: who she is, the Reels she has published, and who she has worked
 * with.
 *
 * The introduction is deliberately three short paragraphs. A media kit is
 * skimmed, and the fastest way to lose a brand manager is a wall of text about
 * a person they have not met yet.
 */
export function Profile() {
  const { t } = useI18n()

  return (
    <Section id="about" tone="sand" page>
      {/* ------------------------------------------------------------ About */}
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(2.4rem,7vw,4rem)] leading-[1.05]">{t.about.title}</h2>

          <div className="mt-8 max-w-xl space-y-6">
            {t.about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? 'text-lg leading-relaxed text-ink sm:text-xl'
                    : 'leading-relaxed text-ink-soft'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Languages: a real differentiator, so it sits with the intro rather
              than being buried in a list further down. */}
          <div className="mt-12 border-t border-line pt-8">
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {t.about.languagesTitle}
            </h3>
            <ul className="mt-5 grid gap-6 sm:grid-cols-3">
              {t.about.languages.map((language) => (
                <li key={language.name}>
                  <p className="font-display text-xl">{language.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{language.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              {t.about.languagesNote}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          {/* Replace public/media/about.jpg to change this image. Portrait,
              because phone photos are, and a landscape frame would crop a
              standing shot down to a band across the middle. */}
          <img
            src={asset(images.about)}
            alt=""
            aria-hidden="true"
            width={1000}
            height={1250}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-card object-cover"
          />

          <div className="mt-8 border-s-2 border-blush-mid ps-6">
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {t.about.valuesTitle}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{t.about.valuesBody}</p>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- Published Reels */}
      <div className="mt-24 lg:mt-32">
        <ReelPhones />
      </div>

      {/* ------------------------------------------------------------ Brands */}
      <div className="mt-20 border-t border-line pt-12 lg:mt-24">
        <Brands />
      </div>
    </Section>
  )
}
