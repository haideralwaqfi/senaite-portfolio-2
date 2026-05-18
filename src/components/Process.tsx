import { processSteps } from "@/data/portfolio";

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-white/10 bg-slate-900/30 py-20 md:py-28">
      <section className="mx-auto max-w-6xl px-6">
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-400">Process</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
            From assessment to go-live
          </h2>
        </header>

        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.step} className="relative">
              <span className="font-display text-5xl font-bold text-slate-800">{step.step}</span>
              <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
