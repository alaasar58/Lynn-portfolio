import { Section } from '../components/Section'
import { process } from '../content/site'

/**
 * Process. Five steps, visually simple — the point is to make working together
 * feel low-effort for the client.
 */
export function Process() {
  return (
    <Section
      id="process"
      tone="ink"
      eyebrow="Process"
      title="Simple on your side."
      lede="Send the product and the brief. I handle everything between that and the finished files."
    >
      <ol className="grid gap-px overflow-hidden rounded-card bg-bone/15 sm:grid-cols-2 lg:grid-cols-5">
        {process.map((step) => (
          <li key={step.step} className="bg-ink p-7 transition-colors duration-500 hover:bg-ink-soft/40">
            <span className="font-display text-4xl text-clay">{step.step}</span>
            <h3 className="mt-5 text-xl text-bone">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-bone/65">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-bone/60">
        <span>Creative freedom or a tight brief — both work.</span>
        <span aria-hidden="true" className="hidden h-px w-8 bg-bone/25 sm:block" />
        <a href="#contact" className="text-bone underline underline-offset-4 hover:text-clay">
          Send a brief
        </a>
      </div>
    </Section>
  )
}
