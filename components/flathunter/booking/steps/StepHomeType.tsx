"use client";

import { HOME_TYPES } from "@/config/flathunter";
import type { HomeType } from "@/types/request";

interface StepHomeTypeProps {
  value: HomeType | null;
  onChange: (value: HomeType) => void;
}

export default function StepHomeType({ value, onChange }: StepHomeTypeProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-ink">Tell us what you need</h3>
      <p className="mt-1 text-sm text-ink/60">What kind of home are you looking for?</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Home type">
        {HOME_TYPES.map((type) => {
          const selected = value === type;
          return (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(type)}
              className={`fh-focus-ring rounded-2xl border-2 px-4 py-6 text-center text-sm font-semibold transition-colors ${
                selected
                  ? "border-brand-500 bg-brand-500 text-white shadow-fh-card"
                  : "border-ink/10 bg-white text-ink hover:border-brand-300"
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
