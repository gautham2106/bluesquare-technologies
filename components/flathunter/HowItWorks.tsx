"use client";

import RevealOnScroll from "@/components/RevealOnScroll";

const steps = [
  {
    title: "Pin your area",
    line: "Drop a pin and choose how far you're willing to live.",
    icon: (
      <path
        d="M12 2C7.5 2 4 5.6 4 10c0 6.4 8 12 8 12s8-5.6 8-12c0-4.4-3.5-8-8-8Zm0 11a3 3 0 110-6 3 3 0 010 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Tell us what you need",
    line: "Home type, budget, bachelor or family.",
    icon: (
      <>
        <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 10h8M8 13.5h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "We search, you choose",
    line: "Fresh matches on WhatsApp. You contact the owner or lister directly.",
    icon: (
      <path
        d="M4 20l1.2-3.6A7.9 7.9 0 1 1 8.6 19L4 20Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="fh-section-pad">
      <div className="fh-container-page">
        <RevealOnScroll>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            How it works
          </h2>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <RevealOnScroll key={step.title} delay={i * 0.1}>
              <div className="fh-card h-full p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                    {step.icon}
                  </svg>
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-500">
                  Step {i + 1}
                </p>
                <h3 className="mt-1 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{step.line}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
