import { site } from "@/data/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(20,184,166,0.25),transparent)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-slate-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm text-teal-300">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          SENAITE LIMS · Medical &amp; Industrial Labs
        </p>

        <h1 className="font-display max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl md:leading-[1.1]">
          {site.title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
          {site.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-full bg-teal-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Discuss a project
          </a>
        </div>

        <ul className="mt-16 grid gap-6 border-t border-white/10 pt-10 sm:grid-cols-3">
          {[
            { stat: "Cloud", label: "AWS · Azure · GCP · VPS" },
            { stat: "Labs", label: "Medical diagnostics & industrial QC" },
            { stat: "Integrate", label: "Shopify · instruments · ERP" },
          ].map((item) => (
            <li key={item.stat}>
              <p className="font-display text-2xl font-semibold text-teal-400">{item.stat}</p>
              <p className="mt-1 text-sm text-slate-500">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
