import Image from "next/image";

const clientHighlights = [
  {
    title: "Analytical chemistry focus",
    description:
      "TrustPointe Analytics provides potency, purity, identity, micro, and physical testing for peptides, supplements, and wellness products.",
  },
  {
    title: "Quality-first methods",
    description:
      "Their public materials emphasize validated methods, USP principles, calibrated equipment, traceable results, and repeatable data.",
  },
  {
    title: "Client-ready COAs",
    description:
      "They publish fast, customized Certificates of Analysis with online verification so customers can confirm report authenticity.",
  },
];

const collaborationPoints = [
  "Map testing services, sample intake, reporting, and COA verification into clear LIMS workflows.",
  "Configure analytes, specifications, QC checkpoints, roles, and reporting templates around lab operations.",
  "Connect order intake, sample status, and result delivery so the team can reduce manual tracking.",
];

export function TrustPointeSection() {
  return (
    <section
      id="trustpointe"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-slate-200 bg-white py-20 md:py-28 dark:border-white/10 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/trustpointe-logo.png"
          alt=""
          fill
          className="object-contain object-top opacity-300  md:object-right md:opacity-25 dark:opacity-300 "
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/65 to-white dark:from-slate-950/55 dark:via-slate-950/70 dark:to-slate-950" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white via-white/75 to-transparent dark:from-slate-950 dark:via-slate-950/75 dark:to-transparent" />
      </div>

      <section className="mx-auto max-w-6xl px-6">
        <header className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <section>
            <p className="text-sm font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
              Client collaboration
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              TrustPointe Analytics LLC
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              TrustPointe Analytics LLC is a Michigan-based analytical chemistry
              laboratory focused on accurate testing, transparent data, and
              custom Certificates of Analysis for research peptides and wellness
              products.
            </p>
          </section>

          <aside className="rounded-2xl border border-cyan-200 bg-cyan-50 p-6 dark:border-cyan-400/20 dark:bg-cyan-950/20">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-800 dark:text-cyan-300">
              Public profile
            </p>
            <dl className="mt-5 grid gap-4 text-sm">
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">
                  Location
                </dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-400">
                  Dorr, Michigan, USA
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">
                  Established
                </dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-400">
                  November 2023
                </dd>
              </div>
              <div>
                <dt className="font-medium text-slate-900 dark:text-white">
                  Specialty
                </dt>
                <dd className="mt-1 text-slate-600 dark:text-slate-400">
                  High-integrity analytical chemistry and lab testing
                </dd>
              </div>
            </dl>
          </aside>
        </header>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {clientHighlights.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <section className="mt-10 grid gap-8 rounded-2xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-violet-50 p-8 shadow-sm shadow-cyan-900/10 md:grid-cols-[0.85fr_1.15fr] md:p-10 dark:border-cyan-300/20 dark:bg-none dark:bg-slate-950/90 dark:shadow-none dark:ring-1 dark:ring-white/10">
          <section>
            <p className="text-sm font-medium uppercase tracking-widest text-cyan-700 dark:text-cyan-300">
              How I work with them
            </p>
            <h3 className="font-display mt-3 text-2xl font-semibold text-slate-950 dark:text-white">
              LIMS support shaped around laboratory trust and traceability.
            </h3>
          </section>

          <ol className="grid gap-4">
            {collaborationPoints.map((point, index) => (
              <li key={point} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-cyan-800 ring-1 ring-cyan-300 shadow-sm dark:bg-cyan-400/15 dark:text-cyan-200 dark:ring-cyan-300/30 dark:shadow-none">
                  {index + 1}
                </span>
                <p className="pt-1 leading-7 text-slate-700 dark:text-slate-200">
                  {point}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </section>
    </section>
  );
}
