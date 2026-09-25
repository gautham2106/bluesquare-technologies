"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SCENE_MS = 3000;
const SCENES = ["call", "form", "reminder"] as const;
type Scene = (typeof SCENES)[number];

export default function PhoneMockup() {
  const [scene, setScene] = useState<Scene>("call");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => {
      setScene((current) => {
        const idx = SCENES.indexOf(current);
        return SCENES[(idx + 1) % SCENES.length];
      });
    }, SCENE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]" aria-hidden="true">
      {/* ambient glow */}
      <div className="absolute inset-x-6 top-10 -z-10 h-[420px] rounded-full bg-brand-500/20 blur-3xl dark:bg-brand-400/20" />

      <div className="relative rounded-[2.2rem] border-[6px] border-ink bg-ink p-1.5 shadow-2xl dark:border-white/10">
        <div className="absolute left-1/2 top-2.5 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/60" />
        <div className="relative h-[560px] w-full overflow-hidden rounded-[1.7rem] bg-surface dark:bg-surface-dark">
          {/* status bar */}
          <div className="flex items-center justify-between px-5 pb-1 pt-3 text-[11px] font-medium text-ink/60 dark:text-white/60">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-ink/30 dark:bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-ink/30 dark:bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-ink/30 dark:bg-white/30" />
            </div>
          </div>

          <div className="relative h-[calc(100%-28px)] px-4 pb-4 pt-2">
            <AnimatePresence mode="wait">
              {scene === "call" && (
                <SceneWrap key="call" reduceMotion={!!reduceMotion}>
                  <CallScene reduceMotion={!!reduceMotion} />
                </SceneWrap>
              )}
              {scene === "form" && (
                <SceneWrap key="form" reduceMotion={!!reduceMotion}>
                  <FormScene reduceMotion={!!reduceMotion} />
                </SceneWrap>
              )}
              {scene === "reminder" && (
                <SceneWrap key="reminder" reduceMotion={!!reduceMotion}>
                  <ReminderScene reduceMotion={!!reduceMotion} />
                </SceneWrap>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* scene dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {SCENES.map((s) => (
          <span
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              s === scene ? "w-5 bg-brand-500" : "w-1.5 bg-ink/15 dark:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SceneWrap({
  children,
  reduceMotion,
}: {
  children: ReactNode;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-4 top-2"
      initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Scene A: incoming call → "AI answering…" → transcript lines typing in */
function CallScene({ reduceMotion }: { reduceMotion: boolean }) {
  const lines = [
    "Caller: Do you have slots tomorrow morning?",
    "AI: Yes, 10:30 and 11:15 are open.",
    "AI: Logging this as a new enquiry now.",
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col items-center pt-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-300">
          <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path
              d="M6.6 10.8c1.4 2.7 3.6 4.9 6.3 6.3l2.1-2.1a1 1 0 0 1 1-.25c1.1.36 2.3.56 3.5.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.6 21 3 13.4 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.56 3.5a1 1 0 0 1-.25 1L6.6 10.8Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="mt-2 text-sm font-semibold text-ink dark:text-white">Incoming call</p>
        <motion.p
          className="text-xs font-medium text-brand-600 dark:text-brand-300"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI answering…
        </motion.p>
      </div>

      <div className="mt-4 flex-1 space-y-2 overflow-hidden rounded-sq border border-ink/[0.06] bg-white p-3 dark:border-white/10 dark:bg-surface-darkcard">
        {lines.map((line, i) => (
          <motion.p
            key={line}
            className="text-[11px] leading-snug text-ink/75 dark:text-white/75"
            initial={reduceMotion ? undefined : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.55, duration: 0.3 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </div>
  );
}

/** Scene B: form submitted → new row sliding into a dashboard table */
function FormScene({ reduceMotion }: { reduceMotion: boolean }) {
  const existingRows = [
    { name: "R. Kumar", status: "Confirmed" },
    { name: "S. Priya", status: "Pending" },
  ];

  return (
    <div className="flex h-full flex-col">
      <motion.div
        className="mb-3 flex items-center gap-2 rounded-sq bg-brand-500/10 px-3 py-2 text-[11px] font-medium text-brand-700 dark:text-brand-300"
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Form submitted
      </motion.div>

      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-ink/40 dark:text-white/40">
        Enquiries dashboard
      </p>
      <div className="overflow-hidden rounded-sq border border-ink/[0.06] bg-white dark:border-white/10 dark:bg-surface-darkcard">
        <motion.div
          className="flex items-center justify-between border-b border-brand-500/20 bg-brand-500/10 px-3 py-2"
          initial={reduceMotion ? undefined : { y: -28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: "easeOut" }}
        >
          <span className="text-[11px] font-semibold text-ink dark:text-white">A. Devi</span>
          <span className="rounded-sqsm bg-accent-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-accent-700 dark:text-accent-300">
            New
          </span>
        </motion.div>
        {existingRows.map((row) => (
          <div
            key={row.name}
            className="flex items-center justify-between border-b border-ink/[0.05] px-3 py-2 last:border-b-0 dark:border-white/[0.06]"
          >
            <span className="text-[11px] text-ink/70 dark:text-white/70">{row.name}</span>
            <span className="text-[10px] text-ink/40 dark:text-white/40">{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Scene C: reminder message sent → delivered double tick */
function ReminderScene({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-ink/40 dark:text-white/40">
        Payment reminder
      </p>
      <motion.div
        className="ml-auto max-w-[85%] rounded-sq rounded-tr-sqsm bg-brand-500 px-3 py-2.5 text-white"
        initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <p className="text-[11px] leading-snug">
          Hi! Your invoice of ₹2,400 is due tomorrow. Pay securely here: bsq.link/pay
        </p>
        <motion.div
          className="mt-1.5 flex items-center justify-end gap-1 text-[10px] text-white/80"
          initial={reduceMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <span>Delivered</span>
          <svg viewBox="0 0 16 11" width="14" height="10" fill="none">
            <path
              d="M1 5.5 4 8.5 10 1.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 5.5 9 8.5 15 1.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
