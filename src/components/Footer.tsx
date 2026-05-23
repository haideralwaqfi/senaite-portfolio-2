import { site } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 py-10 dark:border-white/10">
      <section className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 md:flex-row">
        <p>
          © {year} {site.name}. SENAITE is an open-source LIMS; this site showcases independent
          consulting work.
        </p>
        <p>
          Built with Next.js ·{" "}
          <a
            href="https://www.senaite.com/"
            className="text-teal-600 hover:text-teal-500 dark:text-teal-500 dark:hover:text-teal-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            senaite.com
          </a>
        </p>
      </section>
    </footer>
  );
}
