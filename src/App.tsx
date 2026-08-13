import { LanguageProvider, useI18n } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { LanguageModal } from './components/LanguageModal'
import { Cover } from './sections/Cover'
import { Profile } from './sections/Profile'
import { Audience } from './sections/Audience'
import { Offer } from './sections/Offer'
import { Contact } from './sections/Contact'
import { Legal } from './sections/Legal'
import { useHashRoute } from './lib/useHashRoute'

/**
 * Four pages in one scroll, in the order a brand manager reads a media kit:
 *
 *   1  Cover      who she is, and how to reach her
 *   2  Profile    about me, the published Reels, and the brands worked with
 *   3  Audience   who is watching, with nothing invented
 *   4  Offer      what she can make, what it starts at, and the inquiry form
 *
 * The imprint and the privacy policy are not part of that scroll. They live on
 * `#imprint` and `#privacy` and replace the page rather than extending it —
 * legal text has no business interrupting a media kit, and a visitor who opens
 * it is not browsing any more.
 */
function Site() {
  const { t } = useI18n()
  const legalRoute = useHashRoute()

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone focus:start-4"
      >
        {t.nav.skip}
      </a>

      <Header />

      {legalRoute ? (
        <Legal route={legalRoute} />
      ) : (
        <main>
          <Cover />
          <Profile />
          <Audience />
          <Offer />
          <Contact />
        </main>
      )}

      <Footer />
      <LanguageModal />
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Site />
    </LanguageProvider>
  )
}
