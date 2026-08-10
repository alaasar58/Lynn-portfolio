import { LanguageProvider, useI18n } from './i18n'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { LanguageModal } from './components/LanguageModal'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { Services } from './sections/Services'
import { About } from './sections/About'
import { Process } from './sections/Process'
import { Partnerships } from './sections/Partnerships'
import { Pricing } from './sections/Pricing'
import { Contact } from './sections/Contact'

/**
 * Single-page structure, ordered along the conversion path: discover → watch
 * the work → understand the service → trust → inquire.
 */
function Site() {
  const { t } = useI18n()

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone focus:start-4"
      >
        {t.nav.skip}
      </a>

      <Header />

      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Process />
        <Partnerships />
        <Pricing />
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
