"use client";

interface StepContactProps {
  name: string;
  whatsapp: string;
  moveInDate: string;
  notes: string;
  onChange: (patch: { name?: string; whatsapp?: string; moveInDate?: string; notes?: string }) => void;
  showErrors: boolean;
}

const WHATSAPP_PATTERN = /^[6-9]\d{9}$/;

export function isValidWhatsapp(value: string) {
  return WHATSAPP_PATTERN.test(value);
}

export default function StepContact({
  name,
  whatsapp,
  moveInDate,
  notes,
  onChange,
  showErrors,
}: StepContactProps) {
  const nameError = showErrors && name.trim().length === 0 ? "Please enter your name." : null;
  const whatsappError =
    showErrors && !isValidWhatsapp(whatsapp)
      ? "Enter a valid 10-digit Indian mobile number."
      : null;
  const dateError = showErrors && !moveInDate ? "Please choose a move-in date." : null;

  const todayISO = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h3 className="text-xl font-bold text-ink">How do we reach you?</h3>
      <p className="mt-1 text-sm text-ink/60">
        We&rsquo;ll send matching houses straight to this WhatsApp number.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={!!nameError}
            aria-describedby={nameError ? "name-error" : undefined}
            className="fh-focus-ring w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35"
          />
          {nameError && (
            <p id="name-error" className="mt-1 text-xs font-medium text-red-600">
              {nameError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-whatsapp" className="mb-1.5 block text-sm font-semibold text-ink">
            WhatsApp number
          </label>
          <div
            className={`flex items-center rounded-xl border bg-white ${
              whatsappError ? "border-red-400" : "border-ink/10"
            }`}
          >
            <span className="border-r border-ink/10 px-3.5 py-3 text-sm font-medium text-ink/50">
              +91
            </span>
            <input
              id="contact-whatsapp"
              type="tel"
              inputMode="numeric"
              value={whatsapp}
              onChange={(e) => onChange({ whatsapp: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              placeholder="98765 43210"
              autoComplete="tel-national"
              maxLength={10}
              aria-invalid={!!whatsappError}
              aria-describedby={whatsappError ? "whatsapp-error" : undefined}
              className="fh-focus-ring w-full rounded-xl px-3.5 py-3 text-sm text-ink placeholder:text-ink/35"
            />
          </div>
          {whatsappError && (
            <p id="whatsapp-error" className="mt-1 text-xs font-medium text-red-600">
              {whatsappError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="move-in-date" className="mb-1.5 block text-sm font-semibold text-ink">
            Preferred move-in date
          </label>
          <input
            id="move-in-date"
            type="date"
            min={todayISO}
            value={moveInDate}
            onChange={(e) => onChange({ moveInDate: e.target.value })}
            aria-invalid={!!dateError}
            aria-describedby={dateError ? "date-error" : undefined}
            className="fh-focus-ring w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink"
          />
          {dateError && (
            <p id="date-error" className="mt-1 text-xs font-medium text-red-600">
              {dateError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="notes" className="mb-1.5 block text-sm font-semibold text-ink">
            Anything else? <span className="font-normal text-ink/40">(optional)</span>
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="near metro, pet-friendly, veg only…"
            rows={3}
            className="fh-focus-ring w-full resize-none rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35"
          />
        </div>
      </div>
    </div>
  );
}
