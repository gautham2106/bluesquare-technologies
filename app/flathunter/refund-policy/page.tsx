import type { Metadata } from "next";
import Nav from "@/components/flathunter/Nav";
import Footer from "@/components/flathunter/Footer";
import { siteConfig, mailtoLink } from "@/config/flathunter";

export const metadata: Metadata = {
  title: "Refund Policy — FlatHunter",
  description: "FlatHunter's full-refund promise, explained plainly.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Nav />
      <main className="fh-container-page fh-section-pad max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Refund Policy</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink/70">
          <p className="rounded-2xl bg-success-50 p-4 font-medium text-success-700">
            If we don&rsquo;t send you matching houses within 24 hours of your payment, or
            you&rsquo;re not happy with what we send, message us and we&rsquo;ll refund you in
            full. No arguments.
          </p>

          <h2 className="text-lg font-bold text-ink">How to request a refund</h2>
          <p>
            Message us on WhatsApp at{" "}
            <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-600">
              {siteConfig.phoneDisplay}
            </a>{" "}
            and let us know you&rsquo;d like a refund. You don&rsquo;t need to give a detailed
            reason — &ldquo;this didn&rsquo;t work for me&rdquo; is enough.
          </p>

          <h2 className="text-lg font-bold text-ink">Where the refund goes</h2>
          <p>
            Refunds are issued back to your original payment method through Razorpay. Depending
            on your bank, it can take a few business days to reflect.
          </p>

          <h2 className="text-lg font-bold text-ink">The phone verification add-on</h2>
          <p>
            If you&rsquo;ve added phone verification and we&rsquo;ve already made calls on your
            behalf, we&rsquo;ll still refund the plan in full if we haven&rsquo;t delivered
            matching houses — the same no-arguments promise applies.
          </p>

          <h2 className="text-lg font-bold text-ink">Questions</h2>
          <p>
            Email{" "}
            <a href={mailtoLink} className="font-medium text-brand-600">
              {siteConfig.email}
            </a>{" "}
            if WhatsApp isn&rsquo;t convenient — we&rsquo;ll sort it out either way.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
