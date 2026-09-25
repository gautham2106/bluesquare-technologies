"use client";

import RevealOnScroll from "@/components/RevealOnScroll";

const steps = [
  {
    title: "Understand",
    line: "One conversation about where time is lost.",
  },
  {
    title: "Build",
    line: "A working system in weeks, shown to you as it grows.",
  },
  {
    title: "Launch & support",
    line: "We stay after go-live.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="section-pad border-t border-ink/[0.06] dark:border-white/10">
      <div className="container-page">
        <RevealOnScroll>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
            How we work
          </h2>
        </RevealOnScroll>

        <div className="relative mt-14">
          {/* connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-5 top-2 h-[calc(100%-2rem)] w-px bg-brand-500/20 sm:left-0 sm:right-0 sm:top-5 sm:h-px sm:w-auto dark:bg-brand-300/20"
          />

          <div className="grid gap-10 sm:grid-cols-3 sm:gap-6">
            {steps.map((step, i) => (
              <RevealOnScroll key={step.title} delay={i * 0.12}>
                <div className="relative flex gap-4 sm:flex-col sm:items-center sm:gap-4 sm:text-center">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-sq bg-brand-500 text-sm font-bold text-white shadow-glow">
                    {i + 1}
                  </span>
                  <div className="sm:mt-1">
                    <h3 className="text-lg font-bold text-ink dark:text-white">{step.title}</h3>
                    <p className="mt-1.5 max-w-[220px] text-sm leading-relaxed text-ink/65 dark:text-white/65 sm:mx-auto">
                      {step.line}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
