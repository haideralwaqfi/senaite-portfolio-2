"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { portfolioItems, type LabType, type PortfolioItem } from "@/data/portfolio";
import { Lightbox } from "./Lightbox";

const filters: { id: "all" | LabType; label: string }[] = [
  { id: "all", label: "All" },
  { id: "medical", label: "Medical" },
  { id: "industrial", label: "Industrial" },
  { id: "both", label: "Cross-sector" },
];

const labBadge: Record<LabType, string> = {
  medical: "Medical",
  industrial: "Industrial",
  both: "Medical & Industrial",
};

export function WorkGallery() {
  const [filter, setFilter] = useState<"all" | LabType>("all");
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const items = useMemo(
    () => (filter === "all" ? portfolioItems : portfolioItems.filter((i) => i.labType === filter)),
    [filter],
  );

  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-slate-200 bg-slate-100/80 py-20 md:py-28 dark:border-white/10 dark:bg-slate-900/30"
    >
      <section className="mx-auto max-w-6xl px-6">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <section className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Portfolio
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              High-resolution project screenshots
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              Click any image to view full resolution. Replace placeholders in{" "}
              <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm text-teal-700 dark:bg-slate-800 dark:text-teal-300">
                public/screenshots/
              </code>{" "}
              with your own PNG or WebP exports (1920px wide recommended).
            </p>
          </section>

          <ul className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    filter === f.id
                      ? "bg-teal-500 text-slate-950"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </header>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="group w-full text-left"
                onClick={() => setActive(item)}
              >
                <section className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-slate-200 transition group-hover:ring-teal-500/50 dark:ring-white/10">
                  <Image
                    src={item.thumbnail}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized={item.thumbnail.endsWith(".svg")}
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition group-hover:bg-slate-900/30 group-hover:opacity-100 dark:group-hover:bg-slate-950/40">
                    <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-900">
                      View full size
                    </span>
                  </span>
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-teal-700 backdrop-blur dark:bg-slate-950/80 dark:text-teal-300">
                    {labBadge[item.labType]}
                  </span>
                </section>
                <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-300">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
