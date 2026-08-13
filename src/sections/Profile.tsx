import { Section } from '../components/Section'
import { PhoneWall } from '../components/PhoneWall'
import { images } from '../content/site'
import { useI18n } from '../i18n'
import { asset } from '../lib/asset'

/**
 * Page two: who she is, then what she films.
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
          </div>
        </div>

        <div className="lg:col-span-5">
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

          <div className="mt-8 border-s-2 border-blush-mid ps-6">
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink-muted">
              {t.about.valuesTitle}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{t.about.valuesBody}</p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ Phone frames */}
      <div className="mt-28 lg:mt-36">
        <header className="max-w-2xl">
          <p className="eyebrow">{t.reels.eyebrow}</p>
          <h2 className="mt-4 text-3xl leading-[1.15] sm:text-4xl">{t.reels.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{t.reels.lede}</p>
        </header>

        <div className="mt-14 lg:mt-20">
          <PhoneWall />
        </div>
      </div>
    </Section>
  )
}
