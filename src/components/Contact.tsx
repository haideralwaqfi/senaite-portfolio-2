import { site } from "@/data/site";

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-slate-200 py-20 md:py-28 dark:border-white/10"
    >
      <section className="mx-auto max-w-6xl px-6">
        <section className="overflow-hidden rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 to-slate-100 p-10 md:p-14 dark:border-teal-500/30 dark:from-teal-950/80 dark:to-slate-900">
          <section className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              Ready to plan your SENAITE deployment?
            </h2>
            <p className="mt-4 text-slate-700 dark:text-slate-300">
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
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/80 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white/80 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              GitHub
            </a>
          </section>
        </section>
      </section>
    </section>
  );
}
