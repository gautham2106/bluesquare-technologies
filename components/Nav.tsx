"use client";

import { useState } from "react";
import { scrollToId } from "@/lib/scroll";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Services", id: "services" },
  { label: "How we work", id: "how-we-work" },
  { label: "Contact", id: "contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  function handleNav(id: string) {
    setOpen(false);
    scrollToId(id);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.06] bg-surface/80 backdrop-blur-md dark:border-white/10 dark:bg-surface-dark/80">
      <div className="container-page flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => handleNav("top")}
          className="focus-ring flex items-center gap-2 rounded-sqsm"
        >
          <span className="h-6 w-6 rounded-sqsm bg-brand-500" aria-hidden="true" />
          <span className="text-base font-bold tracking-tight text-ink dark:text-white">
            Bluesquare
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="focus-ring rounded-sqsm text-sm font-medium text-ink/70 transition-colors hover:text-brand-600 dark:text-white/70 dark:hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/flathunter"
            className="focus-ring rounded-sqsm text-sm font-medium text-ink/70 transition-colors hover:text-brand-600 dark:text-white/70 dark:hover:text-white"
          >
            FlatHunter
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => handleNav("contact")}
            className="btn-ghost hidden sm:inline-flex"
          >
            Talk to us
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-sqsm border border-ink/10 dark:border-white/15 md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 border-t border-ink/[0.06] bg-surface px-5 pb-4 pt-2 dark:border-white/10 dark:bg-surface-dark md:hidden"
        >
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="focus-ring rounded-sqsm px-2 py-2.5 text-left text-sm font-medium text-ink/80 hover:bg-brand-50 dark:text-white/80 dark:hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <a
            href="/flathunter"
            className="focus-ring rounded-sqsm px-2 py-2.5 text-left text-sm font-medium text-ink/80 hover:bg-brand-50 dark:text-white/80 dark:hover:bg-white/5"
          >
            FlatHunter
          </a>
          <button
            type="button"
            onClick={() => handleNav("contact")}
            className="btn-ghost mt-2 w-full"
          >
            Talk to us
          </button>
        </nav>
      )}
    </header>
  );
}
