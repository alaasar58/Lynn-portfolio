import { LanguageProvider, useI18n } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { LanguageModal } from './components/LanguageModal'
import { Cover } from './sections/Cover'
import { Profile } from './sections/Profile'
import { Work } from './sections/Work'
import { Audience } from './sections/Audience'
import { Offer } from './sections/Offer'
import { Contact } from './sections/Contact'

/**
 * Four pages in one scroll, in the order a brand manager reads a media kit:
 *
 *   1  Cover      who she is, and how to reach her
 *   2  Profile    about me, the six topics she films, then the portfolio
 *   3  Audience   who is watching, with nothing invented
 *   4  Offer      what she can make, what it starts at, and the inquiry form
 *
 * Work sits under Profile rather than standing alone: the phone frames say what
 * she makes, the grid is the evidence, and splitting them across two pages
 * would separate a claim from its proof.
 */
function Site() {
  const { t } = useI18n()

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone focus:start-4"
      >
        {t.nav.skip}
      </a>

      <Header />

      <main>
        <Cover />
        <Profile />
        <Work />
        <Audience />
        <Offer />
        <Contact />
      </main>

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
