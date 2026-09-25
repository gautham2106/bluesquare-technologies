"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Calculator() {
  const [staff, setStaff] = useState(6);
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [displayValue, setDisplayValue] = useState(0);
  const fromRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const target = staff * hoursPerDay * 22 * 0.5;

  useEffect(() => {
    if (reduceMotion) {
      fromRef.current = target;
      setDisplayValue(target);
      return;
    }
    const controls = animate(fromRef.current, target, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (v) => {
        fromRef.current = v;
        setDisplayValue(v);
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <section className="section-pad border-t border-ink/[0.06] dark:border-white/10">
      <div className="container-page">
        <RevealOnScroll>
          <div className="card mx-auto max-w-3xl p-6 sm:p-10">
            <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink dark:text-white sm:text-4xl">
              How much time could you get back?
            </h2>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor="staff-slider" className="text-sm font-semibold text-ink dark:text-white">
                    Staff doing repetitive work
                  </label>
                  <span className="text-sm font-bold text-brand-600 dark:text-brand-300">{staff}</span>
                </div>
                <input
                  id="staff-slider"
                  type="range"
                  min={1}
                  max={50}
                  step={1}
                  value={staff}
                  onChange={(e) => setStaff(Number(e.target.value))}
                  className="focus-ring h-2 w-full cursor-pointer appearance-none rounded-full bg-ink/10 dark:bg-white/15"
                  style={{ accentColor: "#F59E0B" }}
                />
                <div className="mt-1 flex justify-between text-[11px] text-ink/40 dark:text-white/40">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor="hours-slider" className="text-sm font-semibold text-ink dark:text-white">
                    Hours per person per day on it
                  </label>
                  <span className="text-sm font-bold text-brand-600 dark:text-brand-300">{hoursPerDay}h</span>
                </div>
                <input
                  id="hours-slider"
                  type="range"
                  min={0.5}
                  max={6}
                  step={0.5}
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="focus-ring h-2 w-full cursor-pointer appearance-none rounded-full bg-ink/10 dark:bg-white/15"
                  style={{ accentColor: "#F59E0B" }}
                />
                <div className="mt-1 flex justify-between text-[11px] text-ink/40 dark:text-white/40">
                  <span>0.5h</span>
                  <span>6h</span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center text-center">
              <p className="text-sm font-medium uppercase tracking-wide text-ink/50 dark:text-white/50">
                Estimated hours saved per month
              </p>
              <p className="mt-2 text-5xl font-extrabold tabular-nums text-brand-600 dark:text-brand-300 sm:text-6xl">
                {Math.round(displayValue)}
              </p>
              <p className="mt-2 text-xs text-ink/40 dark:text-white/40">Rough estimate.</p>

              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="btn-primary mt-6"
              >
                Let&rsquo;s get that time back
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
