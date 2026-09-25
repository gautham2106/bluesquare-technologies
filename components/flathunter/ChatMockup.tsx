"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { LogoMark } from "@/components/flathunter/Logo";

const MESSAGES = [
  { type: "2BHK", rent: "18,000", area: "Sholinganallur", tag: "Bachelors OK" },
  { type: "1BHK", rent: "12,000", area: "Perungudi", tag: "Family" },
  { type: "3BHK", rent: "32,000", area: "OMR", tag: "Furnished" },
];

export default function ChatMockup() {
  const [phase, setPhase] = useState(0);
  const reduceMotion = useReducedMotion();
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (reduceMotion) {
      setPhase(MESSAGES.length);
      return;
    }
    cancelledRef.current = false;
    let current = 0;

    function scheduleNext() {
      const delay = current === 0 ? 900 : current > MESSAGES.length ? 2400 : 1300;
      return setTimeout(() => {
        if (cancelledRef.current) return;
        current = current >= MESSAGES.length + 1 ? 0 : current + 1;
        setPhase(current);
        timer = scheduleNext();
      }, delay);
    }

    let timer = scheduleNext();
    return () => {
      cancelledRef.current = true;
      clearTimeout(timer);
    };
  }, [reduceMotion]);

  const visibleCount = Math.min(phase, MESSAGES.length);
  const showTyping = phase === 0;

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]" aria-hidden="true">
      <div className="absolute inset-x-6 top-10 -z-10 h-[420px] rounded-full bg-brand-500/15 blur-3xl" />

      <div className="relative rounded-[2.2rem] border-[6px] border-ink bg-ink p-1.5 shadow-2xl">
        <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/60" />
        <div className="relative flex h-[560px] w-full flex-col overflow-hidden rounded-[1.7rem] bg-[#EAF3EC]">
          {/* chat header */}
          <div className="flex items-center gap-2.5 bg-brand-500 px-4 py-3 pt-6">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <LogoMark size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">FlatHunter</p>
              <p className="text-[10px] text-white/75">online</p>
            </div>
          </div>

          {/* chat body */}
          <div className="flex-1 space-y-3 overflow-hidden px-3 py-4">
            <AnimatePresence>
              {MESSAGES.slice(0, visibleCount).map((m, i) => (
                <motion.div
                  key={`${m.area}-${i}-${phase >= MESSAGES.length ? "full" : phase}`}
                  initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white p-2.5 shadow-sm"
                >
                  <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-100 to-brand-200">
                    <svg viewBox="0 0 48 40" className="h-8 w-10 text-brand-400" fill="none">
                      <path d="M4 20 24 6l20 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M9 18v16h30V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mt-2 text-[11px] font-semibold leading-snug text-ink">
                    {m.type} · ₹{m.rent} · {m.area}
                  </p>
                  <p className="text-[10px] font-medium text-brand-600">{m.tag}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {showTyping && (
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3.5 py-3 shadow-sm"
              >
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/30"
                    style={{ animationDelay: `${dot * 0.15}s` }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
