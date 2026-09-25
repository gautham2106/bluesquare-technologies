"use client";

import RevealOnScroll from "@/components/RevealOnScroll";

const points = [
  {
    title: "More places than any one app",
    line: "Portals, Instagram rental pages, and Facebook groups, all in one search.",
  },
  {
    title: "No brokerage, ever",
    line: "You contact the owner or lister directly. We never take a cut.",
  },
  {
    title: "Only what fits you",
    line: "Your area, your budget, bachelor or family, filtered before it reaches you.",
  },
];

export default function WhyFlatHunter() {
  return (
    <section className="fh-section-pad">
      <div className="fh-container-page">
        <RevealOnScroll>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Why FlatHunter
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {points.map((point, i) => (
            <RevealOnScroll key={point.title} delay={i * 0.1}>
              <div className="fh-card h-full p-6">
                <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="text-base font-bold text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">{point.line}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
