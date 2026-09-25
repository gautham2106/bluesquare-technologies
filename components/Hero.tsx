"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";
import PhoneMockup from "@/components/PhoneMockup";
import SquareGridBackground from "@/components/SquareGridBackground";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-ink/[0.06] dark:border-white/10"
    >
      <SquareGridBackground cols={12} rows={7} className="opacity-70" />

      <div className="container-page relative section-pad grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-sq border border-brand-500/20 bg-brand-500/5 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-300/25 dark:bg-brand-300/10 dark:text-brand-200">
            <span className="h-1.5 w-1.5 rounded-sm bg-brand-500" />
            Software studio · Tamil Nadu, India
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink dark:text-white sm:text-5xl lg:text-[3.25rem]">
            We build software that takes work off your team&rsquo;s plate.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 dark:text-white/70 sm:text-lg">
            Web apps, AI voice agents, automation, and messaging systems for
            businesses and institutions — built fast and made to work in the
            real world.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => scrollToId("services")}
              className="btn-ghost"
            >
              See what we do
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="btn-secondary"
            >
              Talk to us
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}
