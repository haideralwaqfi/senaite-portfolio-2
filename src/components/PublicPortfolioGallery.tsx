"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type UploadedImage = {
  filename: string;
  url: string;
};

type GallerySection = {
  id: string;
  title: string;
  description: string;
  images: UploadedImage[];
};

const sections: Array<{ id: string; title: string; description: string }> = [
  {
    id: "medical",
    title: "Medical Work",
    description:
      "High-resolution screenshots and documentation from medical laboratory projects.",
  },
  {
    id: "industrial",
    title: "Industrial Work",
    description:
      "Quality assurance and manufacturing workflows in industrial laboratory settings.",
  },
  {
    id: "training",
    title: "On-site Training Program",
    description:
      "Documentation and materials from hands-on training sessions and programs.",
  },
  {
    id: "shopify",
    title: "Shopify ↔ LIMS Bridge",
    description:
      "Integration architecture and workflow visuals for Shopify and LIMS connectivity.",
  },
];

export function PublicPortfolioGallery() {
  const [galleries, setGalleries] = useState<Record<string, UploadedImage[]>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<{
    url: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    async function fetchAllImages() {
      const imageData: Record<string, UploadedImage[]> = {};

      for (const section of sections) {
        try {
          const response = await fetch(
            `/api/portfolio/images/${section.id}`,
          );
          const data = await response.json();
          imageData[section.id] = data.images || [];
        } catch (error) {
          console.error(`Failed to fetch images for ${section.id}:`, error);
          imageData[section.id] = [];
        }
      }

      setGalleries(imageData);
      setLoading(false);
    }

    fetchAllImages();
  }, []);

  const gallerySections: GallerySection[] = sections.map((section) => ({
    ...section,
    images: galleries[section.id] || [],
  }));

  // Only show gallery if there are any images
  const hasImages = gallerySections.some(
    (section) => section.images.length > 0,
  );

  if (loading || !hasImages) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-20 md:py-28 dark:border-white/10 dark:bg-slate-900/50">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
            Portfolio Gallery
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
            Our recent work
          </h2>
        </header>

        <div className="space-y-16">
          {gallerySections.map(
            (section) =>
              section.images.length > 0 && (
                <div key={section.id}>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {section.description}
                    </p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {section.images.map((image) => (
                      <button
                        key={image.filename}
                        type="button"
                        className="group relative aspect-16/10 overflow-hidden rounded-2xl ring-1 ring-slate-200 transition hover:ring-teal-500/50 dark:ring-white/10"
                        onClick={() => {
                          setActiveImage({
                            url: image.url,
                            alt: image.filename,
                          });
                        }}>
                        <Image
                          src={image.url}
                          alt={image.filename}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition group-hover:bg-slate-900/30 group-hover:opacity-100 dark:group-hover:bg-slate-950/40">
                          <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-900">
                            View full size
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
          onClick={() => setActiveImage(null)}>
          <div className="relative max-h-[90vh] max-w-4xl">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              width={1200}
              height={800}
              className="max-h-[90vh] w-auto"
            />
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute -right-12 top-0 text-white transition hover:text-slate-300 md:-right-16">
              <svg
                className="h-8 w-8"
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
          </div>
        </div>
      )}
    </section>
  );
}
