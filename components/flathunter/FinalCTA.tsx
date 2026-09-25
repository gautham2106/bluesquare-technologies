"use client";

import RevealOnScroll from "@/components/RevealOnScroll";
import { scrollToId } from "@/lib/scroll";

export default function FinalCTA() {
  return (
    <section className="bg-brand-600 py-16 sm:py-20">
      <div className="fh-container-page text-center">
        <RevealOnScroll>
          <h2 className="mx-auto max-w-xl text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Your next house is already listed somewhere. Let us find it.
          </h2>
          <button
            type="button"
            onClick={() => scrollToId("start-search")}
            className="fh-focus-ring fh-btn mt-7 bg-white text-brand-600 hover:bg-brand-50"
          >
            Start my search
          </button>
        </RevealOnScroll>
      </div>
    </section>
  );
}
