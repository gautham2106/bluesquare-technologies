"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Nav from "@/components/flathunter/Nav";
import Footer from "@/components/flathunter/Footer";
import { PLANS, VERIFICATION_ADDON, OCCUPANT_TYPES, getWhatsappLink } from "@/config/flathunter";
import { pixel } from "@/lib/pixel";
import { trackContact } from "@/lib/trackContact";

const MiniMap = dynamic(() => import("@/components/flathunter/map/MiniMap"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-brand-100" />,
});

export default function ThankYouContent() {
  const params = useSearchParams();
  const firedRef = useRef(false);

  const name = params.get("name") || "";
  const whatsapp = params.get("whatsapp") || "";
  const requestId = params.get("requestId") || "";
  const planId = params.get("plan") || "";
  const addon = params.get("addon") === "1";
  const amount = Number(params.get("amount") || 0);
  const homeType = params.get("homeType") || "";
  const budgetMin = params.get("budgetMin");
  const budgetMax = params.get("budgetMax");
  const occupant = params.get("occupant") || "";
  const area = params.get("area") || "your area";
  const radius = params.get("radius") || "3";
  const lat = Number(params.get("lat"));
  const lng = Number(params.get("lng"));

  const plan = PLANS.find((p) => p.id === planId);
  const occupantLabel = OCCUPANT_TYPES.find((o) => o.value === occupant)?.label ?? occupant;
  const hasMap = Number.isFinite(lat) && Number.isFinite(lng);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    if (amount > 0) {
      // Fresh page load = fresh pixel instance with no matching data yet —
      // re-attach it here before firing, same as the Lead event did on the form page.
      pixel.setCustomerInfo({ name, whatsapp, externalId: requestId || undefined });
      pixel.purchase(
        amount,
        plan?.label ?? planId,
        addon ? "search_plan_with_verification" : "search_plan",
        requestId ? `${requestId}-purchase` : undefined
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const waMessage = `Hi, I just paid for FlatHunter. My name is ${name || "___"}.`;

  return (
    <>
      <Nav />
      <main className="fh-section-pad">
        <div className="fh-container-page max-w-lg text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-100">
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 animate-tick-in text-success-600">
              <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>

          <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Payment received. We&rsquo;ve started searching.
          </h1>
          <p className="mt-3 text-ink/65">
            Your first matches will reach your WhatsApp within 24 hours.
          </p>

          <div className="fh-card mt-8 p-5 text-left">
            {hasMap && (
              <div className="mb-4 h-32 w-full overflow-hidden rounded-xl">
                <MiniMap center={[lat, lng]} radiusKm={Number(radius)} />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              {plan && (
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {plan.label} plan
                </span>
              )}
              {addon && (
                <span className="rounded-full bg-success-100 px-3 py-1 text-xs font-semibold text-success-700">
                  Phone verification added
                </span>
              )}
              <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink/60">
                ₹{amount} paid
              </span>
            </div>

            <p className="mt-3 text-sm font-semibold leading-snug text-ink">
              {homeType} · ₹{budgetMin}–₹{budgetMax} · {occupantLabel}
            </p>
            <p className="mt-0.5 text-xs text-ink/55">
              within {radius} km of {area}
            </p>

            {plan && (
              <p className="mt-3 text-xs leading-relaxed text-ink/50">{plan.description}</p>
            )}
            {addon && (
              <p className="mt-1 text-xs leading-relaxed text-ink/50">
                {VERIFICATION_ADDON.description}
              </p>
            )}
          </div>

          <a
            href={getWhatsappLink(waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact({ name, whatsapp, externalId: requestId || undefined })}
            className="fh-btn-primary mt-8 w-full text-base"
          >
            Message us on WhatsApp
          </a>

          <p className="mt-4 text-xs text-ink/45">
            Full refund if we don&rsquo;t deliver — just message us, no arguments.
          </p>

          <Link href="/flathunter" className="fh-focus-ring mt-6 inline-block text-sm font-semibold text-brand-600 hover:underline">
            ← Back to FlatHunter
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
