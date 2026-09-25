"use client";

import { BUDGET_MIN, BUDGET_MAX, BUDGET_STEP } from "@/config/flathunter";

interface StepBudgetProps {
  budgetMin: number;
  budgetMax: number;
  furnished: boolean;
  onChange: (patch: { budgetMin?: number; budgetMax?: number; furnished?: boolean }) => void;
}

function formatRupees(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

const thumbClasses =
  "pointer-events-none absolute left-0 top-0 h-2 w-full cursor-pointer appearance-none bg-transparent " +
  "[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500 " +
  "[&::-webkit-slider-thumb]:shadow-fh-card [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 " +
  "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-500 " +
  "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-fh-card";

export default function StepBudget({ budgetMin, budgetMax, furnished, onChange }: StepBudgetProps) {
  const range = BUDGET_MAX - BUDGET_MIN;
  const minPct = ((budgetMin - BUDGET_MIN) / range) * 100;
  const maxPct = ((budgetMax - BUDGET_MIN) / range) * 100;
  const minOnTop = budgetMin > BUDGET_MAX - BUDGET_STEP * 4;

  function handleMinChange(next: number) {
    onChange({ budgetMin: Math.min(next, budgetMax - BUDGET_STEP) });
  }

  function handleMaxChange(next: number) {
    onChange({ budgetMax: Math.max(next, budgetMin + BUDGET_STEP) });
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">Set your budget</h3>
      <p className="mt-1 text-sm text-ink/60">Monthly rent range you&rsquo;re comfortable with.</p>

      <div className="mt-8 flex items-baseline justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Min</p>
          <p className="text-lg font-extrabold text-ink">{formatRupees(budgetMin)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40">Max</p>
          <p className="text-lg font-extrabold text-ink">{formatRupees(budgetMax)}</p>
        </div>
      </div>

      <div className="relative mt-4 h-5">
        <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-ink/10" />
        <div
          className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-brand-500"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        <input
          type="range"
          aria-label="Minimum monthly rent"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={budgetMin}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className={thumbClasses}
          style={{ zIndex: minOnTop ? 5 : 3 }}
        />
        <input
          type="range"
          aria-label="Maximum monthly rent"
          min={BUDGET_MIN}
          max={BUDGET_MAX}
          step={BUDGET_STEP}
          value={budgetMax}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className={thumbClasses}
          style={{ zIndex: minOnTop ? 3 : 4 }}
        />
      </div>

      <div className="mt-1 flex justify-between text-[11px] text-ink/40">
        <span>{formatRupees(BUDGET_MIN)}</span>
        <span>{formatRupees(BUDGET_MAX)}+</span>
      </div>

      <label className="mt-7 flex cursor-pointer items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-3.5">
        <span className="text-sm font-medium text-ink">Furnished preferred</span>
        <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
          <input
            type="checkbox"
            checked={furnished}
            onChange={(e) => onChange({ furnished: e.target.checked })}
            className="peer sr-only"
          />
          <span className="absolute inset-0 rounded-full bg-ink/15 transition-colors peer-checked:bg-brand-500" />
          <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
        </span>
      </label>
    </div>
  );
}
