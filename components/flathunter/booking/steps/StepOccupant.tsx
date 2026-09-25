"use client";

import { OCCUPANT_TYPES } from "@/config/flathunter";
import type { OccupantType } from "@/types/request";

interface StepOccupantProps {
  value: OccupantType | null;
  onChange: (value: OccupantType) => void;
}

const ICONS: Record<OccupantType, string> = {
  bachelor_male: "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z",
  bachelor_female: "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z",
  family: "M9 12a3 3 0 100-6 3 3 0 000 6zm7-1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20c0-3 3-5.5 7-5.5s7 2.5 7 5.5v1H2v-1zm14-6.4c2.9.3 5 2.3 5 4.9v1.5h-4v-1.5c0-1.9-.5-3.5-1-4.9z",
  couple: "M8 12a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 2.8-5.5 6-5.5s6 2.5 6 5.5v1H2v-1zm8-.3c.6-2.6 3-4.7 6-4.7 3.2 0 6 2.5 6 5.5v1.5H10v-1c0-.5 0-1 .1-1.3z",
};

export default function StepOccupant({ value, onChange }: StepOccupantProps) {
  return (
    <div>
      <h3 className="text-xl font-bold text-ink">Who&rsquo;s moving in?</h3>
      <p className="mt-1 text-sm text-ink/60">
        This helps us skip listings that won&rsquo;t take you.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Who's moving in">
        {OCCUPANT_TYPES.map((occ) => {
          const selected = value === occ.value;
          return (
            <button
              key={occ.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(occ.value)}
              className={`fh-focus-ring flex flex-col items-center gap-3 rounded-2xl border-2 px-4 py-6 text-center transition-colors ${
                selected
                  ? "border-brand-500 bg-brand-500 text-white shadow-fh-card"
                  : "border-ink/10 bg-white text-ink hover:border-brand-300"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`h-8 w-8 ${selected ? "text-white" : "text-brand-500"}`}
                aria-hidden="true"
              >
                <path d={ICONS[occ.value]} />
              </svg>
              <span className="text-sm font-semibold">{occ.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
