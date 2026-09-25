"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";

const faqs = [
  {
    q: "Are you a broker?",
    a: "No. We don't charge brokerage and don't take any commission from owners. You pay only for the search.",
  },
  {
    q: "How will I receive houses?",
    a: "On WhatsApp, with photos, rent, location, and the lister's contact.",
  },
  {
    q: "What if nothing matches?",
    a: "Then we haven't delivered, and you get a full refund.",
  },
  {
    q: "What does phone verification do?",
    a: "We call each owner before sending the house, so you don't waste time on houses that are already rented or don't accept you.",
  },
  {
    q: "Which areas do you cover?",
    a: "All of Chennai. Your pin and radius decide where we search.",
  },
  {
    q: "How do I get a refund?",
    a: "Message us on WhatsApp. Refunds go back to your original payment method.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="fh-section-pad border-t border-ink/[0.06]">
      <div className="fh-container-page max-w-2xl">
        <RevealOnScroll>
          <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </RevealOnScroll>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <RevealOnScroll key={faq.q} delay={i * 0.04}>
                <div className="fh-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="fh-focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-ink">{faq.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`h-4 w-4 shrink-0 text-ink/40 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-ink/65">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
