"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";

type PortfolioSection = {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
};

type UploadState = {
  [key: string]: {
    isLoading: boolean;
    message?: string;
    isSuccess?: boolean;
  };
};

type UploadedImage = {
  filename: string;
  url: string;
};

const portfolioSections: PortfolioSection[] = [
  {
    id: "medical",
    title: "Medical Work",
    description:
      "Upload and manage screenshots for medical systems and healthcare projects.",
    buttonLabel: "Add medical pics",
  },
  {
    id: "industrial",
    title: "Industrial Work",
    description:
      "Add images for industrial automation, equipment, and engineering portfolio items.",
    buttonLabel: "Add industrial pics",
  },
  {
    id: "training",
    title: "On-site Training Program",
    description:
      "Share training materials, on-site program shots, and program highlights.",
    buttonLabel: "Add training pics",
  },
  {
    id: "shopify",
    title: "Shopify ↔ LIMS Bridge",
    description:
      "Upload visuals for the Shopify to LIMS integration bridge and related workflows.",
    buttonLabel: "Add bridge pics",
  },
];

export function AdminPortfolioManager() {
  const initialFiles = useMemo(
    () =>
      portfolioSections.reduce<Record<string, File[]>>((acc, section) => {
        acc[section.id] = [];
        return acc;
      }, {}),
    [],
  );

  const [selectedFiles, setSelectedFiles] =
    useState<Record<string, File[]>>(initialFiles);
  const [activeSection, setActiveSection] = useState<string>(
    portfolioSections[0].id,
  );
  const [uploadState, setUploadState] = useState<UploadState>({});
  const [uploadedImages, setUploadedImages] = useState<
    Record<string, UploadedImage[]>
  >({});
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  // Fetch uploaded images for all sections on mount
  useEffect(() => {
    async function fetchAllImages() {
      const imageData: Record<string, UploadedImage[]> = {};

      for (const section of portfolioSections) {
        try {
          const response = await fetch(
            `/api/admin/portfolio/images/${section.id}`,
          );
          const data = await response.json();
          imageData[section.id] = data.images || [];
        } catch (error) {
          console.error(`Failed to fetch images for ${section.id}:`, error);
          imageData[section.id] = [];
        }
      }

      setUploadedImages(imageData);
    }

    fetchAllImages();
  }, []);

  function handleFiles(sectionId: string, files: FileList | null) {
    if (!files) return;
    setSelectedFiles((current) => ({
      ...current,
      [sectionId]: Array.from(files),
    }));
  }

  async function handleUpload(sectionId: string) {
    const files = selectedFiles[sectionId];
    if (!files || files.length === 0) {
      setUploadState((current) => ({
        ...current,
        [sectionId]: {
          isLoading: false,
          message: "No files selected.",
          isSuccess: false,
        },
      }));
      return;
    }

    setUploadState((current) => ({
      ...current,
      [sectionId]: { isLoading: true },
    }));

    try {
      const formData = new FormData();
      formData.append("sectionId", sectionId);
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/admin/portfolio/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setUploadState((current) => ({
          ...current,
          [sectionId]: {
            isLoading: false,
            message: data.error || "Upload failed.",
            isSuccess: false,
          },
        }));
        return;
      }

      setUploadState((current) => ({
        ...current,
        [sectionId]: {
          isLoading: false,
          message: `✓ ${data.message}`,
          isSuccess: true,
        },
      }));

      // Refresh uploaded images for this section
      try {
        const response = await fetch(
          `/api/admin/portfolio/images/${sectionId}`,
        );
        const imageData = await response.json();
        setUploadedImages((current) => ({
          ...current,
          [sectionId]: imageData.images || [],
        }));
      } catch (error) {
        console.error("Failed to refresh images:", error);
      }

      // Clear selected files after successful upload
      setSelectedFiles((current) => ({
        ...current,
        [sectionId]: [],
      }));

      // Clear message after 3 seconds
      setTimeout(() => {
        setUploadState((current) => ({
          ...current,
          [sectionId]: { isLoading: false },
        }));
      }, 3000);
    } catch (error) {
      setUploadState((current) => ({
        ...current,
        [sectionId]: {
          isLoading: false,
          message:
            error instanceof Error ? error.message : "An error occurred.",
          isSuccess: false,
        },
      }));
    }
  }

  async function handleDeleteImage(sectionId: string, filename: string) {
    setLoadingImages((current) => new Set([...current, filename]));

    try {
      const response = await fetch("/api/admin/portfolio/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionId, filename }),
      });

      if (response.ok) {
        // Remove from uploaded images state
        setUploadedImages((current) => ({
          ...current,
          [sectionId]: (current[sectionId] || []).filter(
            (img) => img.filename !== filename,
          ),
        }));
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setLoadingImages((current) => {
        const updated = new Set(current);
        updated.delete(filename);
        return updated;
      });
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="sticky top-24 hidden h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-950 lg:block">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
          Portfolio sections
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
          Access each category and add pictures for approved admin portfolio
          sections.
        </p>

        <div className="mt-6 space-y-3">
          {portfolioSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setActiveSection(section.id)}
              className={`block rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                activeSection === section.id
                  ? "border-teal-500 bg-teal-50 text-teal-700 dark:border-teal-400 dark:bg-teal-950/40 dark:text-teal-200"
                  : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:bg-teal-50/80 dark:border-white/10 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-teal-400 dark:hover:bg-teal-900/50"
              }`}>
              {section.title}
            </a>
          ))}
        </div>
      </aside>

      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-950/70">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
                Admin portfolio manager
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">
                Upload portfolio images for each section
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              This sidebar is available only for admin users. Select images for
              each category and review uploads for Medical, Industrial,
              Training, and Shopify ↔ LIMS Bridge.
            </p>
          </div>
        </section>

        <div className="space-y-6">
          {portfolioSections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
                    {section.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {section.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label
                    htmlFor={`upload-${section.id}`}
                    className="inline-flex cursor-pointer items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:border-teal-500 hover:bg-teal-50 dark:border-white/10 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-teal-500/10">
                    {section.buttonLabel}
                  </label>
                  <input
                    id={`upload-${section.id}`}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(event) =>
                      handleFiles(section.id, event.target.files)
                    }
                  />
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-slate-950/70 dark:text-slate-300">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900 dark:text-white">
                    Selected files ({selectedFiles[section.id]?.length ?? 0})
                  </p>
                  {selectedFiles[section.id]?.length ? (
                    <button
                      type="button"
                      onClick={() => handleUpload(section.id)}
                      disabled={uploadState[section.id]?.isLoading}
                      className="rounded-full bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-teal-500 dark:hover:bg-teal-600">
                      {uploadState[section.id]?.isLoading
                        ? "Uploading..."
                        : "Save pics"}
                    </button>
                  ) : null}
                </div>
                {selectedFiles[section.id]?.length ? (
                  <ul className="mt-3 space-y-2">
                    {selectedFiles[section.id].map((file) => (
                      <li
                        key={file.name}
                        className="truncate text-slate-600 dark:text-slate-400">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-slate-600 dark:text-slate-400">
                    No images selected yet.
                  </p>
                )}
                {uploadState[section.id]?.message && (
                  <div
                    className={`mt-4 rounded-2xl px-4 py-3 text-xs font-medium ${
                      uploadState[section.id]?.isSuccess
                        ? "border border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-300"
                        : "border border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                    }`}>
                    {uploadState[section.id]?.message}
                  </div>
                )}
              </div>

              {uploadedImages[section.id]?.length ? (
                <div className="mt-8">
                  <p className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
                    Uploaded images ({uploadedImages[section.id].length})
                  </p>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {uploadedImages[section.id].map((image) => (
                      <div
                        key={image.filename}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-slate-800">
                        <Image
                          src={image.url}
                          alt={image.filename}
                          width={128}
                          height={128}
                          className="h-32 w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <button
                          onClick={() =>
                            handleDeleteImage(section.id, image.filename)
                          }
                          disabled={loadingImages.has(image.filename)}
                          className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/40 disabled:opacity-50">
                          <span className="rounded-full bg-red-600 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:cursor-not-allowed">
                            ✕
                          </span>
                        </button>
                        <p className="truncate px-2 py-1 text-xs text-slate-600 dark:text-slate-400">
                          {image.filename}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
