"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  portfolioItems,
  type LabType,
  type PortfolioItem,
} from "@/data/portfolio";

type UploadedImage = {
  filename: string;
  url: string;
};

type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

type ActiveLibrary = {
  item: PortfolioItem;
  images: GalleryImage[];
  index: number;
};

// Map admin sections to portfolio item IDs
const sectionToItemMap: Record<string, string> = {
  medical: "med-cloud",
  industrial: "ind-workflow",
  training: "training-session",
  shopify: "shopify-sync",
};

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
  const [activeLibrary, setActiveLibrary] = useState<ActiveLibrary | null>(
    null,
  );
  const [uploadedImages, setUploadedImages] = useState<
    Record<string, UploadedImage[]>
  >({});

  // Fetch uploaded images
  useEffect(() => {
    async function fetchImages() {
      const imageData: Record<string, UploadedImage[]> = {};

      for (const sectionId of Object.keys(sectionToItemMap)) {
        try {
          const response = await fetch(`/api/portfolio/images/${sectionId}`);
          const data = await response.json();
          imageData[sectionId] = data.images || [];
        } catch (error) {
          console.error(`Failed to fetch images for ${sectionId}:`, error);
          imageData[sectionId] = [];
        }
      }

      setUploadedImages(imageData);
    }

    fetchImages();
  }, []);

  const items = useMemo(
    () =>
      filter === "all"
        ? portfolioItems
        : portfolioItems.filter((i) => i.labType === filter),
    [filter],
  );

  const getItemImages = useCallback(
    (item: PortfolioItem): GalleryImage[] => {
      const sectionId = Object.entries(sectionToItemMap).find(
        ([, itemId]) => itemId === item.id,
      )?.[0];
      const uploads = sectionId ? uploadedImages[sectionId] || [] : [];

      if (uploads.length > 0) {
        return uploads.map((image, index) => ({
          id: image.filename,
          url: image.url,
          alt: `${item.title} uploaded image ${index + 1}`,
        }));
      }

      return [
        {
          id: item.id,
          url: item.fullImage,
          alt: item.alt,
        },
      ];
    },
    [uploadedImages],
  );

  function openLibrary(item: PortfolioItem) {
    setActiveLibrary({
      item,
      images: getItemImages(item),
      index: 0,
    });
  }

  const showPreviousImage = useCallback(() => {
    setActiveLibrary((current) => {
      if (!current) return current;
      return {
        ...current,
        index:
          current.index === 0 ? current.images.length - 1 : current.index - 1,
      };
    });
  }, []);

  const showNextImage = useCallback(() => {
    setActiveLibrary((current) => {
      if (!current) return current;
      return {
        ...current,
        index:
          current.index === current.images.length - 1 ? 0 : current.index + 1,
      };
    });
  }, []);

  useEffect(() => {
    if (!activeLibrary) return;

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveLibrary(null);
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeLibrary, showNextImage, showPreviousImage]);

  return (
    <section
      id="work"
      className="scroll-mt-24 border-t border-slate-200 bg-slate-100/80 py-20 md:py-28 dark:border-white/10 dark:bg-slate-900/30">
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
              Click any image to view full resolution.
            </p>
          </section>

          <ul
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects">
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
                  }`}>
                  {f.label}
                </button>
              </li>
            ))}
          </ul>
        </header>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {items.map((item) => {
            const sectionId = Object.entries(sectionToItemMap).find(
              ([, itemId]) => itemId === item.id,
            )?.[0];
            const itemImages = sectionId ? uploadedImages[sectionId] || [] : [];
            const coverImage = itemImages[0]?.url || item.thumbnail;
            const imageCount = itemImages.length || 1;
            const hasUploadedImages = itemImages.length > 0;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="group w-full text-left"
                  onClick={() => openLibrary(item)}>
                  <section className="relative aspect-16/10 overflow-hidden rounded-xl ring-1 ring-slate-200 transition group-hover:ring-teal-500/50 dark:ring-white/10">
                    <Image
                      src={coverImage}
                      alt={item.alt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      unoptimized={coverImage.endsWith(".svg")}
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition group-hover:bg-slate-900/30 group-hover:opacity-100 dark:group-hover:bg-slate-950/40">
                      <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-900">
                        {hasUploadedImages ? "View library" : "View full size"}
                      </span>
                    </span>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-teal-700 backdrop-blur dark:bg-slate-950/80 dark:text-teal-300">
                      {labBadge[item.labType]}
                    </span>
                    {hasUploadedImages && (
                      <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                        {imageCount} images
                      </span>
                    )}
                  </section>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-300">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {activeLibrary && (
        <section
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal
          aria-label={`${activeLibrary.item.title} image library`}
          onClick={() => setActiveLibrary(null)}>
          <figure
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col"
            onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActiveLibrary(null)}
              className="absolute right-0 top-0 z-20 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
              aria-label="Close image library">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <section className="relative mt-12 min-h-[220px] overflow-hidden rounded-xl ring-1 ring-white/20 md:mt-0">
              <Image
                src={activeLibrary.images[activeLibrary.index].url}
                alt={activeLibrary.images[activeLibrary.index].alt}
                width={1920}
                height={1080}
                className="max-h-[72vh] w-full object-contain"
                sizes="(max-width: 768px) 100vw, 90vw"
                priority
                unoptimized={activeLibrary.images[
                  activeLibrary.index
                ].url.endsWith(".svg")}
              />

              {activeLibrary.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white transition hover:bg-teal-500 hover:text-slate-950"
                    aria-label="Show previous image">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={showNextImage}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/70 text-white transition hover:bg-teal-500 hover:text-slate-950"
                    aria-label="Show next image">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}
            </section>

            <figcaption className="mt-4 shrink-0 text-white">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold md:text-2xl">
                    {activeLibrary.item.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                    {activeLibrary.item.description}
                  </p>
                </div>
                <p className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200 ring-1 ring-white/15">
                  {activeLibrary.index + 1} / {activeLibrary.images.length}
                </p>
              </div>
            </figcaption>
          </figure>
        </section>
      )}
    </section>
  );
}
