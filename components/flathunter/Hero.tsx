"use client";

import { motion, useReducedMotion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";
import ChatMockup from "@/components/flathunter/ChatMockup";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden border-b border-ink/[0.06] bg-white">
      <div className="fh-container-page fh-section-pad grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            Early access · Chennai
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.1rem]">
            Stop spending an hour a day searching for a house.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Tell us where you want to live. We search rental portals, Instagram pages, and
            Facebook groups every day and send matching houses straight to your WhatsApp.
          </p>

          <div className="mt-8">
            <button type="button" onClick={() => scrollToId("start-search")} className="fh-btn-primary text-base">
              Start my search
            </button>
            <p className="mt-3 text-xs font-medium text-ink/50 sm:text-sm">
              Not a broker · No brokerage · Full refund if we don&rsquo;t deliver
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChatMockup />
        </motion.div>
      </div>
    </section>
  );
}
