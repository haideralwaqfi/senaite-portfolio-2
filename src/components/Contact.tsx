import { site } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-white/10 py-20 md:py-28">
      <section className="mx-auto max-w-6xl px-6">
        <section className="overflow-hidden rounded-3xl border border-teal-500/30 bg-gradient-to-br from-teal-950/80 to-slate-900 p-10 md:p-14">
          <section className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
              Ready to plan your SENAITE deployment?
            </h2>
            <p className="mt-4 text-slate-300">
              Tell me about your lab type, hosting preference, and whether you need Shopify or other
              integrations. I&apos;ll respond with a clear scope and timeline.
            </p>
            <p className="mt-2 text-sm text-slate-500">{site.location}</p>
          </section>

          <section className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${site.email}?subject=SENAITE%20project%20inquiry`}
              className="inline-flex items-center justify-center rounded-full bg-teal-500 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
            >
              Email {site.email}
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
            >
              GitHub
            </a>
          </section>
        </section>
      </section>
    </section>
  );
}
