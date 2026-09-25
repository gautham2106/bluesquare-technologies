"use client";

import dynamic from "next/dynamic";
import { PLANS, PLAN_FEATURES, VERIFICATION_ADDON, OCCUPANT_TYPES, type PlanId } from "@/config/flathunter";
import type { RequirementFormData } from "@/types/request";

const MiniMap = dynamic(() => import("@/components/flathunter/map/MiniMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-brand-100" />,
});

function formatK(n: number) {
  return n % 1000 === 0 ? `${n / 1000}k` : `${(n / 1000).toFixed(1)}k`;
}

interface SummaryPlanProps {
  form: RequirementFormData;
  selectedPlan: PlanId;
  onSelectPlan: (id: PlanId) => void;
  addonVerification: boolean;
  onToggleAddon: (checked: boolean) => void;
  onEdit: () => void;
  onPay: () => void;
  paying: boolean;
  payError: string | null;
}

export default function SummaryPlan({
  form,
  selectedPlan,
  onSelectPlan,
  addonVerification,
  onToggleAddon,
  onEdit,
  onPay,
  paying,
  payError,
}: SummaryPlanProps) {
  const occupantLabel =
    OCCUPANT_TYPES.find((o) => o.value === form.occupantType)?.label ?? "Any";
  const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[1];
  const total = plan.price + (addonVerification ? VERIFICATION_ADDON.price : 0);

  return (
    <div>
      {/* Summary card */}
      <div className="fh-card flex gap-4 p-4">
        <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl">
          <MiniMap center={[form.location.lat, form.location.lng]} radiusKm={form.location.radiusKm} />
        </div>
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-sm font-semibold leading-snug text-ink">
            {form.homeType} · ₹{formatK(form.budgetMin)}–₹{formatK(form.budgetMax)} · {occupantLabel}
          </p>
          <p className="mt-0.5 text-xs text-ink/55">
            within {form.location.radiusKm} km of {form.location.areaName}
          </p>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="fh-focus-ring self-start whitespace-nowrap rounded-lg px-2 py-1 text-xs font-semibold text-brand-600 hover:bg-brand-50"
        >
          Edit
        </button>
      </div>

      <h2 className="mt-8 text-center text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
        Choose how long we search for you
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {PLANS.map((p) => {
          const selected = selectedPlan === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPlan(p.id)}
              className={`fh-focus-ring relative flex flex-col rounded-2xl border-2 p-5 text-left transition-colors ${
                selected
                  ? "border-brand-500 bg-white shadow-glow"
                  : "border-ink/10 bg-white hover:border-brand-300"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-3 left-4 rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-fh-card">
                  {p.badge}
                </span>
              )}
              <p className="text-sm font-semibold text-ink/60">{p.label}</p>
              <p className="mt-1 text-3xl font-extrabold text-ink">₹{p.price}</p>
              <p className="mt-2 text-sm text-ink/60">{p.description}</p>

              <ul className="mt-4 space-y-1.5">
                {PLAN_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-1.5 text-xs text-ink/70">
                    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <span
                className={`mt-4 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  selected ? "border-brand-500 bg-brand-500" : "border-ink/20"
                }`}
                aria-hidden="true"
              >
                {selected && (
                  <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-white">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-ink/10 bg-white p-5">
        <input
          type="checkbox"
          checked={addonVerification}
          onChange={(e) => onToggleAddon(e.target.checked)}
          className="fh-focus-ring mt-0.5 h-5 w-5 shrink-0 rounded border-ink/20 text-brand-500"
        />
        <span>
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-sm font-semibold text-ink">{VERIFICATION_ADDON.label}</span>
            <span className="text-sm font-bold text-brand-600">+ ₹{VERIFICATION_ADDON.price}</span>
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-ink/60">
            {VERIFICATION_ADDON.description}
          </span>
        </span>
      </label>

      <div className="mt-6">
        <button
          type="button"
          onClick={onPay}
          disabled={paying}
          className="fh-btn-primary w-full text-base"
        >
          {paying ? "Starting payment…" : `Pay ₹${total} & start my search`}
        </button>
        {payError && <p className="mt-2 text-center text-xs font-medium text-red-600">{payError}</p>}
        <p className="mt-3 text-center text-xs text-ink/45">
          Full refund if we don&rsquo;t deliver — no arguments.
        </p>
      </div>
    </div>
  );
}
