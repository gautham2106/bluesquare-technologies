"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";

const services = [
  {
    title: "Custom Web Apps & Dashboards",
    line: "CRMs, booking systems, portals, and admin panels built around how your team works.",
    before: "40 messages a day to track work",
    after: "One dashboard",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 9h18" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 13h4M7 15.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "AI Voice Agents",
    line: "Answer calls 24/7 in Tamil or English and log every request.",
    before: "Missed calls after 6pm",
    after: "Every call answered",
    icon: (
      <>
        <path
          d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1a1 1 0 0 1 1-.25c1.1.36 2.3.56 3.5.56a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1C10.6 20 4 13.4 4 6a1 1 0 0 1 1-1h2.5a1 1 0 0 1 1 1c0 1.2.2 2.4.56 3.5a1 1 0 0 1-.25 1L6.6 10.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </>
    ),
  },
  {
    title: "Workflow Automation",
    line: "Forms, sheets, payments, and messages connected so repetitive work runs itself.",
    before: "Copy-pasting between apps",
    after: "It happens automatically",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 6.5h4a3.5 3.5 0 0 1 3.5 3.5v4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M15.5 12 17.5 14l-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "WhatsApp & RCS Messaging",
    line: "Official API setup, templates, reminders, and campaigns.",
    before: "Messaging customers one by one",
    after: "Automated, on time",
    icon: (
      <>
        <path
          d="M4 20l1.2-3.6A7.9 7.9 0 1 1 8.6 19L4 20Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M8.5 10.2c0 3 2.3 5.3 5.3 5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Payments & Integrations",
    line: "Online payments, subscriptions, and third-party APIs, wired in cleanly.",
    before: "Chasing payments manually",
    after: "Pay-by-link with auto receipts",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 14.2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "AI Features",
    line: "Document reading, lead sorting, summaries, and chat assistants inside your systems.",
    before: "Reading every form by hand",
    after: "Sorted and summarised",
    icon: (
      <>
        <rect x="4" y="3.5" width="16" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 8h8M8 11.5h8M8 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="17.5" r="2.6" fill="currentColor" className="text-accent-500" />
      </>
    ),
  },
];

export default function WhatWeDo() {
  const [state, setState] = useState<Record<number, "before" | "after">>({});

  function view(i: number) {
    return state[i] ?? "before";
  }

  function setView(i: number, v: "before" | "after") {
    setState((prev) => ({ ...prev, [i]: v }));
  }

  return (
    <section id="services" className="section-pad border-t border-ink/[0.06] dark:border-white/10">
      <div className="container-page">
        <RevealOnScroll>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
            What we do
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink/60 dark:text-white/60">
            Six ways we take repetitive, error-prone work off your plate.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const current = view(i);
            return (
              <RevealOnScroll key={service.title} delay={(i % 3) * 0.07}>
                <div className="card flex h-full flex-col p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sqsm bg-brand-500/10 text-brand-600 dark:bg-brand-300/15 dark:text-brand-200">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      {service.icon}
                    </svg>
                  </span>
                  <h3 className="mt-4 text-base font-bold text-ink dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65 dark:text-white/65">
                    {service.line}
                  </p>

                  <div className="mt-auto pt-5">
                    <div
                      role="tablist"
                      aria-label={`${service.title} before and after`}
                      className="inline-flex rounded-sq border border-ink/10 p-0.5 dark:border-white/15"
                    >
                      <button
                        type="button"
                        role="tab"
                        aria-selected={current === "before"}
                        onClick={() => setView(i, "before")}
                        className={`focus-ring rounded-sqsm px-3 py-1 text-xs font-semibold transition-colors ${
                          current === "before"
                            ? "bg-ink text-white dark:bg-white/15 dark:text-white"
                            : "text-ink/50 dark:text-white/50"
                        }`}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={current === "after"}
                        onClick={() => setView(i, "after")}
                        className={`focus-ring rounded-sqsm px-3 py-1 text-xs font-semibold transition-colors ${
                          current === "after"
                            ? "bg-accent-500 text-ink"
                            : "text-ink/50 dark:text-white/50"
                        }`}
                      >
                        After
                      </button>
                    </div>
                    <p className="mt-3 text-sm font-medium text-ink/80 dark:text-white/80">
                      {current === "before" ? service.before : service.after}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
