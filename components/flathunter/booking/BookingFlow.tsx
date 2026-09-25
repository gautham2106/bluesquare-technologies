"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProgressBar from "@/components/flathunter/booking/ProgressBar";
import StepLocation from "@/components/flathunter/booking/steps/StepLocation";
import StepHomeType from "@/components/flathunter/booking/steps/StepHomeType";
import StepBudget from "@/components/flathunter/booking/steps/StepBudget";
import StepOccupant from "@/components/flathunter/booking/steps/StepOccupant";
import StepContact, { isValidWhatsapp } from "@/components/flathunter/booking/steps/StepContact";
import SummaryPlan from "@/components/flathunter/booking/SummaryPlan";
import {
  CHENNAI_CENTER,
  DEFAULT_RADIUS_KM,
  DEFAULT_BUDGET_MIN,
  DEFAULT_BUDGET_MAX,
  PLANS,
  VERIFICATION_ADDON,
  type PlanId,
} from "@/config/flathunter";
import { captureUtmParams } from "@/lib/utm";
import { pixel, getMetaBrowserIds } from "@/lib/pixel";
import { loadRazorpayScript, type RazorpaySuccessResponse } from "@/lib/razorpay";
import type { RequirementFormData } from "@/types/request";

const TOTAL_FORM_STEPS = 5;

const initialForm: RequirementFormData = {
  location: {
    lat: CHENNAI_CENTER[0],
    lng: CHENNAI_CENTER[1],
    radiusKm: DEFAULT_RADIUS_KM,
    areaName: "Chennai",
  },
  homeType: null,
  budgetMin: DEFAULT_BUDGET_MIN,
  budgetMax: DEFAULT_BUDGET_MAX,
  furnished: false,
  occupantType: null,
  name: "",
  whatsapp: "",
  moveInDate: "",
  notes: "",
};

export default function BookingFlow() {
  const [step, setStep] = useState(1); // 1-5 = form steps, 6 = summary/plan
  const [form, setForm] = useState<RequirementFormData>(initialForm);
  const [showErrors, setShowErrors] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<PlanId>("2week");
  const [addonVerification, setAddonVerification] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  const reduceMotion = useReducedMotion();

  function patchLocation(patch: Partial<RequirementFormData["location"]>) {
    setForm((f) => ({ ...f, location: { ...f.location, ...patch } }));
  }
  function patchForm(patch: Partial<RequirementFormData>) {
    setForm((f) => ({ ...f, ...patch }));
  }

  const continueDisabled =
    (step === 2 && !form.homeType) || (step === 4 && !form.occupantType);

  function handleBack() {
    setShowErrors(false);
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleContinue() {
    if (step < TOTAL_FORM_STEPS) {
      setShowErrors(false);
      setStep((s) => s + 1);
      return;
    }

    const contactValid =
      form.name.trim().length > 0 && isValidWhatsapp(form.whatsapp) && !!form.moveInDate;
    if (!contactValid) {
      setShowErrors(true);
      return;
    }

    await submitRequest();
  }

  async function submitRequest() {
    setSubmitting(true);
    setSubmitError(null);
    const utm = captureUtmParams();
    const { fbp, fbc } = getMetaBrowserIds();

    try {
      const res = await fetch("/api/flathunter/save-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: form.location.lat,
          lng: form.location.lng,
          radius_km: form.location.radiusKm,
          area_name: form.location.areaName,
          home_type: form.homeType,
          budget_min: form.budgetMin,
          budget_max: form.budgetMax,
          furnished: form.furnished,
          occupant_type: form.occupantType,
          name: form.name,
          whatsapp: `+91${form.whatsapp}`,
          move_in_date: form.moveInDate,
          notes: form.notes || null,
          utm_source: utm.utmSource,
          utm_campaign: utm.utmCampaign,
          fbp,
          fbc,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");

      const id = data.id ?? crypto.randomUUID();
      setRequestId(id);
      pixel.setCustomerInfo({ name: form.name, whatsapp: form.whatsapp, externalId: id });
      pixel.lead(form.homeType ?? undefined, id);
      setStep(6);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handlePay() {
    setPaying(true);
    setPayError(null);

    const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[1];
    const total = plan.price + (addonVerification ? VERIFICATION_ADDON.price : 0);
    pixel.initiateCheckout(
      total,
      plan.label,
      addonVerification ? "search_plan_with_verification" : "search_plan"
    );

    const loaded = await loadRazorpayScript();
    if (!loaded || !window.Razorpay) {
      setPayError("Could not load the payment gateway. Please check your connection and try again.");
      setPaying(false);
      return;
    }

    try {
      const orderRes = await fetch("/api/flathunter/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, requestId: requestId ?? crypto.randomUUID() }),
      });
      const order = await orderRes.json();
      if (!orderRes.ok) throw new Error(order.error || "Could not start payment.");

      const rzp = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "FlatHunter",
        description: `${plan.label} search plan${addonVerification ? " + phone verification" : ""}`,
        prefill: { name: form.name, contact: `91${form.whatsapp}` },
        theme: { color: "#1E4DD8" },
        handler: (response: RazorpaySuccessResponse) => {
          void handlePaymentSuccess(response, total);
        },
        modal: { ondismiss: () => setPaying(false) },
      });
      rzp.on("payment.failed", () => setPayError("Payment failed. Please try again."));
      rzp.open();
      setPaying(false);
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Could not start payment.");
      setPaying(false);
    }
  }

  async function handlePaymentSuccess(response: RazorpaySuccessResponse, total: number) {
    try {
      const { fbp, fbc } = getMetaBrowserIds();
      const verifyRes = await fetch("/api/flathunter/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          requestId,
          plan: selectedPlan,
          addonVerification,
          amount: total,
          name: form.name,
          whatsapp: `+91${form.whatsapp}`,
          fbp,
          fbc,
        }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || "Payment could not be verified.");

      const params = new URLSearchParams({
        name: form.name,
        whatsapp: form.whatsapp,
        requestId: requestId ?? "",
        plan: selectedPlan,
        addon: addonVerification ? "1" : "0",
        amount: String(total),
        homeType: form.homeType ?? "",
        budgetMin: String(form.budgetMin),
        budgetMax: String(form.budgetMax),
        occupant: form.occupantType ?? "",
        area: form.location.areaName,
        radius: String(form.location.radiusKm),
        lat: String(form.location.lat),
        lng: String(form.location.lng),
      });
      window.location.href = `/flathunter/thank-you?${params.toString()}`;
    } catch (err) {
      setPayError(
        err instanceof Error
          ? `${err.message} Please WhatsApp us your payment ID and we'll sort it out.`
          : "Payment succeeded but we couldn't confirm it — please WhatsApp us your payment ID."
      );
    }
  }

  const slideProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.25, ease: [0.4, 0.1, 0.2, 1] as const },
      };

  return (
    <div id="start-search" className="scroll-mt-20">
      <div className="fh-card mx-auto max-w-xl p-5 sm:p-8">
        {step <= TOTAL_FORM_STEPS ? (
          <>
            <ProgressBar step={step} />
            {/* Deliberately not wrapped in AnimatePresence: step 1 holds a
                live Leaflet map, and animating its exit can hang forever
                (Leaflet manipulates the DOM outside React's control, so
                Framer Motion's exit-complete never fires) — which left the
                map stuck on screen under the next step. The old step is
                removed immediately instead; only the new one fades/slides in. */}
            <motion.div key={step} {...slideProps}>
              {step === 1 && (
                <StepLocation value={form.location} onChange={patchLocation} />
              )}
              {step === 2 && (
                <StepHomeType
                  value={form.homeType}
                  onChange={(homeType) => patchForm({ homeType })}
                />
              )}
              {step === 3 && (
                <StepBudget
                  budgetMin={form.budgetMin}
                  budgetMax={form.budgetMax}
                  furnished={form.furnished}
                  onChange={patchForm}
                />
              )}
              {step === 4 && (
                <StepOccupant
                  value={form.occupantType}
                  onChange={(occupantType) => patchForm({ occupantType })}
                />
              )}
              {step === 5 && (
                <StepContact
                  name={form.name}
                  whatsapp={form.whatsapp}
                  moveInDate={form.moveInDate}
                  notes={form.notes}
                  onChange={patchForm}
                  showErrors={showErrors}
                />
              )}
            </motion.div>

            {submitError && (
              <p className="mt-4 text-sm font-medium text-red-600">{submitError}</p>
            )}

            <div className="mt-7 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="fh-focus-ring rounded-lg px-2 py-2 text-sm font-semibold text-ink/60 hover:text-ink"
                >
                  ← Back
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={handleContinue}
                disabled={continueDisabled || submitting}
                className="fh-btn-primary min-w-[140px]"
              >
                {submitting
                  ? "Saving…"
                  : step === TOTAL_FORM_STEPS
                    ? "See my plan options"
                    : "Continue"}
              </button>
            </div>
          </>
        ) : (
          <SummaryPlan
            form={form}
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            addonVerification={addonVerification}
            onToggleAddon={setAddonVerification}
            onEdit={() => setStep(1)}
            onPay={handlePay}
            paying={paying}
            payError={payError}
          />
        )}
      </div>
    </div>
  );
}
