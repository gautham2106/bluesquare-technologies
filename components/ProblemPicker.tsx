"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { getWhatsappLink } from "@/config/site";
import RevealOnScroll from "@/components/RevealOnScroll";

const problems = [
  {
    problem: "Missed calls and lost enquiries",
    fix: "An AI agent answers every call, logs the request, and alerts you instantly.",
  },
  {
    problem: "Registers, Excel sheets, and paperwork",
    fix: "One simple dashboard your whole team can use.",
  },
  {
    problem: "Chasing follow-ups and payments",
    fix: "Automatic reminders and online payment links.",
  },
  {
    problem: "Updates scattered across WhatsApp groups",
    fix: "One system with a clear status for every task.",
  },
  {
    problem: "Customers waiting in queues",
    fix: "Digital tokens and live updates on their phone.",
  },
];

export default function ProblemPicker() {
  const [selected, setSelected] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  function handleSelect(index: number) {
    setSelected((current) => (current === index ? null : index));
  }

  const selectedProblem = selected !== null ? problems[selected].problem : undefined;

  return (
    <section className="section-pad">
      <div className="container-page">
        <RevealOnScroll>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
            What&rsquo;s slowing your team down?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-ink/60 dark:text-white/60">
            Tap a card that sounds familiar to see how we fix it.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((item, index) => {
            const flipped = selected === index;
            return (
              <RevealOnScroll key={item.problem} delay={index * 0.06}>
                <button
                  type="button"
                  onClick={() => handleSelect(index)}
                  aria-pressed={flipped}
                  className="focus-ring block h-52 w-full [perspective:1200px] sm:h-56"
                >
                  <motion.div
                    className="relative h-full w-full [transform-style:preserve-3d]"
                    animate={{ rotateY: flipped ? 180 : 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { duration: 0.5, ease: [0.4, 0.1, 0.2, 1] }
                    }
                  >
                    {/* front */}
                    <div
                      aria-hidden={flipped}
                      className="card absolute inset-0 flex flex-col justify-between p-5 text-left [backface-visibility:hidden]"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-sqsm bg-brand-500/10 text-sm font-bold text-brand-600 dark:bg-brand-300/15 dark:text-brand-200">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold leading-snug text-ink dark:text-white">
                          {item.problem}
                        </p>
                        <p className="mt-2 text-xs font-medium text-brand-600 dark:text-brand-300">
                          Tap to see the fix →
                        </p>
                      </div>
                    </div>

                    {/* back */}
                    <div
                      aria-hidden={!flipped}
                      className="absolute inset-0 flex flex-col justify-between rounded-sq border border-brand-500/30 bg-brand-500 p-5 text-left shadow-card [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-brand-300/30"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-sqsm bg-white/15 text-white">
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
                      <p className="text-sm font-medium leading-snug text-white">{item.fix}</p>
                    </div>
                  </motion.div>
                </button>
              </RevealOnScroll>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3" aria-live="polite">
          <AnimatePresence mode="wait">
            {selectedProblem && (
              <motion.p
                key={selectedProblem}
                initial={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                className="text-sm text-ink/60 dark:text-white/60"
              >
                Selected: <span className="font-semibold text-ink dark:text-white">{selectedProblem}</span>
              </motion.p>
            )}
          </AnimatePresence>
          <a
            href={getWhatsappLink(selectedProblem)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Solve this with us
          </a>
        </div>
      </div>
    </section>
  );
}
