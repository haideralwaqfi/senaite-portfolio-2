"use client";

import Image from "next/image";
import { useState } from "react";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { HeaderAuth } from "./HeaderAuth";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#shopify", label: "Shopify" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 ring-1 ring-teal-500/40">
            <Image
              src="/favicon.ico"
              alt=""
              width={20}
              height={20}
              className="h-5 w-5"
              aria-hidden="true"
            />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-slate-900 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-300">
            {site.name}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
              {item.label}
            </a>
          ))}
          <ThemeToggle />
          <HeaderAuth />
          <a
            href="#contact"
            className="rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-teal-400">
            Get in touch
          </a>
        </nav>

        <section className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="rounded-lg p-2 text-slate-600 dark:text-slate-400"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </section>
      </div>

      {open && (
        <nav className="border-t border-slate-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-slate-950 md:hidden">
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block py-2 text-slate-700 dark:text-slate-300"
                  onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/login"
                className="block py-2 text-slate-700 dark:text-slate-300">
                Sign in
              </a>
            </li>
            <li>
              <a
                href="/admin"
                className="block py-2 text-teal-600 dark:text-teal-400">
                Admin
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
