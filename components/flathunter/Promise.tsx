"use client";

import RevealOnScroll from "@/components/RevealOnScroll";

export default function Promise() {
  return (
    <section className="border-y border-success-100 bg-success-50 py-16 sm:py-20">
      <div className="fh-container-page">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-success-100">
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-success-600">
                <path
                  d="M12 3l7 3v5c0 5-3.4 8.7-7 10-3.6-1.3-7-5-7-10V6l7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path d="M9 12.3l2.2 2.2L15.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>

            <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Our promise: we deliver, or you get your money back.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              If we don&rsquo;t send you matching houses within 24 hours of your payment, or
              you&rsquo;re not happy with what we send, message us and we&rsquo;ll refund you in
              full. No arguments.
            </p>
            <p className="mt-4 text-sm text-ink/50">
              FlatHunter is in early access. Our team personally searches for you — that&rsquo;s
              why we can make this promise.
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
