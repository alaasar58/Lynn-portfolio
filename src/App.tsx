import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Work } from './sections/Work'
import { Services } from './sections/Services'
import { About } from './sections/About'
import { Process } from './sections/Process'
import { Partnerships } from './sections/Partnerships'
import { Pricing } from './sections/Pricing'
import { Contact } from './sections/Contact'

/**
 * Single-page structure, ordered along the conversion path from the brief:
 * discover → watch the work → understand the service → trust → inquire.
 */
export default function App() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-bone"
      >
        Skip to content
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
    </>
  )
}
