import type { Metadata } from "next";
import Nav from "@/components/flathunter/Nav";
import Footer from "@/components/flathunter/Footer";
import { siteConfig, mailtoLink } from "@/config/flathunter";

export const metadata: Metadata = {
  title: "Terms of Service — FlatHunter",
  description: "Terms governing the use of FlatHunter's search service.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="fh-container-page fh-section-pad max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Terms of Service</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink/70">
          <p>
            {siteConfig.name} is an early-access rental search service run by{" "}
            {siteConfig.company}. By paying for a search, you agree to these terms.
          </p>
          <h2 className="text-lg font-bold text-ink">What FlatHunter is</h2>
          <p>
            FlatHunter is not a broker and does not list, own, or manage any property. Our team
            searches rental portals, Instagram pages, and Facebook groups on your behalf and
            sends matching listings to your WhatsApp. You deal with the property owner or lister
            directly — we are not a party to any tenancy agreement, and we do not verify every
            detail of every listing unless you&rsquo;ve purchased phone verification.
          </p>
          <h2 className="text-lg font-bold text-ink">What you pay for</h2>
          <p>
            Your payment covers our search effort for the plan duration you choose (3 days, 2
            weeks, or 1 month), plus phone verification if you add it. It is not brokerage and we
            do not take a commission from property owners or listers.
          </p>
          <h2 className="text-lg font-bold text-ink">Our delivery promise</h2>
          <p>
            We aim to send your first matches within 24 hours of payment and fresh matches daily
            for the rest of your plan. If we don&rsquo;t deliver matching houses, or you&rsquo;re
            not happy with what we send, you&rsquo;re entitled to a full refund under our{" "}
            <a href="/flathunter/refund-policy" className="font-medium text-brand-600">
              Refund Policy
            </a>
            .
          </p>
          <h2 className="text-lg font-bold text-ink">Early access</h2>
          <p>
            FlatHunter is a new, human-run service. Response times, coverage, and match quality
            may vary as we grow — that&rsquo;s part of why the refund promise exists.
          </p>
          <h2 className="text-lg font-bold text-ink">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={mailtoLink} className="font-medium text-brand-600">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
