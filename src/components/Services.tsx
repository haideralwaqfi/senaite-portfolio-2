import { services } from "@/data/portfolio";
import { ServiceIcon } from "./ServiceIcon";

export function Services() {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-slate-200 py-20 md:py-28 dark:border-white/10"
    >
      <section className="mx-auto max-w-6xl px-6">
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
            What I do
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
            End-to-end SENAITE expertise
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            From first install to production go-live — training teams, hardening cloud deployments, and
            configuring workflows that fit regulated medical and high-throughput industrial labs.
          </p>
        </header>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <li
              key={service.id}
              className="group rounded-2xl border border-slate-200 bg-white p-8 transition hover:border-teal-500/40 hover:shadow-md dark:border-white/10 dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:hover:shadow-none"
            >
              <span className="inline-flex rounded-xl bg-teal-500/15 p-3 text-teal-600 ring-1 ring-teal-500/30 dark:text-teal-400">
                <ServiceIcon name={service.icon} />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
