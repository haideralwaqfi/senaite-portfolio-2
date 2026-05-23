"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import type { PortfolioItem } from "@/data/portfolio";

type LightboxProps = {
  item: PortfolioItem | null;
  onClose: () => void;
};

export function Lightbox({ item, onClose }: LightboxProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [item, handleKey]);

  if (!item) return null;

  return (
    <section
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-sm md:p-8 dark:bg-slate-950/95"
      role="dialog"
      aria-modal
      aria-label={item.title}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30 md:right-8 md:top-8"
        aria-label="Close"
        onClick={onClose}
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <figure
        className="relative flex max-h-[90vh] w-full max-w-6xl flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <section className="relative min-h-[200px] flex-1 overflow-hidden rounded-xl ring-1 ring-white/20 dark:ring-white/10">
          <Image
            src={item.fullImage}
            alt={item.alt}
            width={1920}
            height={1080}
            className="h-auto max-h-[75vh] w-full object-contain"
            sizes="(max-width: 768px) 100vw, 90vw"
            priority
            unoptimized={item.fullImage.endsWith(".svg")}
          />
        </section>
        <figcaption className="mt-4 shrink-0">
          <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{item.title}</h3>
          <p className="mt-2 text-slate-300">{item.description}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-teal-500/20 px-3 py-1 text-xs text-teal-200 ring-1 ring-teal-500/40 dark:bg-teal-500/15 dark:text-teal-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        </figcaption>
      </figure>
    </section>
  );
}
