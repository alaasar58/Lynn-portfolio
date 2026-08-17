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
import { Mosques } from './mosques/Mosques'
import { isLegalRoute, useHashRoute } from './lib/useHashRoute'

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
 *
 * `#mosques` is a page of the same kind, but for a different visitor: someone
 * who followed the credit line on a mosque's website. It replaces the media kit
 * entirely — no header navigation into it, no footer links out of it — because
 * that visitor came to ask about a website for their congregation.
 */
function Site() {
  const { t } = useI18n()
  const route = useHashRoute()

  // The mosque offer stands on its own: its own header, its own languages, and
  // no way from it into the media kit.
  if (route === 'mosques') {
    return (
      <>
        <Mosques />
        <Footer variant="minimal" />
      </>
    )
  }

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone focus:start-4"
      >
        {t.nav.skip}
      </a>

      <Header />

      {route && isLegalRoute(route) ? (
        <Legal route={route} />
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
