"use client";

import RevealOnScroll from "@/components/RevealOnScroll";

const points = [
  {
    title: "Built for real users",
    line: "Simple enough for staff who've never used software.",
  },
  {
    title: "Live systems, not demos",
    line: "Our work runs daily in hospitals, colleges, and local government.",
  },
  {
    title: "Straight answers",
    line: "If software won't fix it, we'll say so.",
  },
];

export default function WhyBluesquare() {
  return (
    <section className="section-pad border-t border-ink/[0.06] dark:border-white/10">
      <div className="container-page">
        <RevealOnScroll>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
            Why Bluesquare
          </h2>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {points.map((point, i) => (
            <RevealOnScroll key={point.title} delay={i * 0.1}>
              <div className="card h-full p-6">
                <span className="mb-4 flex h-8 w-8 items-center justify-center rounded-sqsm bg-accent-500/15 text-accent-600 dark:text-accent-400">
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
                <h3 className="text-base font-bold text-ink dark:text-white">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-white/65">
                  {point.line}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
