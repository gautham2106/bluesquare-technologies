const STEP_LABELS = ["Location", "Home type", "Budget", "Who's moving", "Contact"];

export default function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-6">
      <div className="flex gap-1.5">
        {STEP_LABELS.map((label, i) => (
          <div
            key={label}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i + 1 <= step ? "bg-brand-500" : "bg-ink/10"
            }`}
          />
        ))}
      </div>
      <p className="mt-2.5 text-xs font-semibold uppercase tracking-wide text-ink/40">
        Step {step} of {STEP_LABELS.length} · {STEP_LABELS[step - 1]}
      </p>
    </div>
  );
}
