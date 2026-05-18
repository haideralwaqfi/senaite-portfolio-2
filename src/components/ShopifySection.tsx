import { shopifyIntegration } from "@/data/portfolio";

export function ShopifySection() {
  return (
    <section id="shopify" className="scroll-mt-24 border-t border-white/10 py-20 md:py-28">
      <section className="mx-auto max-w-6xl px-6">
        <header className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-emerald-400">Integrations</p>
          <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">
            {shopifyIntegration.headline}
          </h2>
          <p className="mt-4 text-lg text-slate-400">{shopifyIntegration.intro}</p>
        </header>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {shopifyIntegration.useCases.map((uc) => (
            <li
              key={uc.title}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6"
            >
              <h3 className="text-lg font-semibold text-emerald-300">{uc.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{uc.description}</p>
            </li>
          ))}
        </ul>

        <section className="mt-14 rounded-2xl border border-white/10 bg-slate-900/60 p-8 md:p-10">
          <h3 className="font-display text-xl font-semibold text-white">How we approach it</h3>
          <ol className="mt-6 space-y-4">
            {shopifyIntegration.approach.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
                  {i + 1}
                </span>
                <p className="pt-1 text-slate-300">{step}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-slate-500">
            Shopify credentials and webhooks stay server-side (middleware or custom app) — never
            exposed in this public portfolio. Scope depends on your catalog, compliance, and LIMS
            workflow.
          </p>
        </section>

        <section className="mt-10 grid gap-4 rounded-xl border border-dashed border-white/15 p-6 font-mono text-sm text-slate-500 md:grid-cols-2">
          <p>
            <span className="text-slate-400">Example flow:</span>
            <br />
            Shopify order.created → webhook → validate → create / link sample in SENAITE
          </p>
          <p>
            <span className="text-slate-400">Optional:</span>
            <br />
            Inventory sync · customer metafields · B2B price lists · fulfillment status
          </p>
        </section>
      </section>
    </section>
  );
}
