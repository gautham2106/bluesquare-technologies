import type { Metadata } from "next";
import Nav from "@/components/flathunter/Nav";
import Footer from "@/components/flathunter/Footer";
import { siteConfig, mailtoLink } from "@/config/flathunter";

export const metadata: Metadata = {
  title: "Privacy Policy — FlatHunter",
  description: "How FlatHunter collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="fh-container-page fh-section-pad max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">Privacy Policy</h1>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink/70">
          <p>
            {siteConfig.name} is a service by {siteConfig.company}. This policy explains what we
            collect when you use FlatHunter to search for a rental home, and how we handle it.
          </p>
          <h2 className="text-lg font-bold text-ink">Information we collect</h2>
          <p>
            When you submit a search request, we collect your name, WhatsApp number, preferred
            area and radius, budget, home type, occupant details, move-in date, and any notes you
            add. We also record UTM parameters from the link you arrived on, so we know which
            campaign brought you here.
          </p>
          <h2 className="text-lg font-bold text-ink">How we use it</h2>
          <p>
            We use your details to search for matching rental listings and send them to your
            WhatsApp, to process your payment, and to contact you about your search. Our team
            personally reviews your requirements to find matches — we do not sell your
            information to third parties.
          </p>
          <h2 className="text-lg font-bold text-ink">Payments</h2>
          <p>
            Payments are processed by Razorpay. We do not store your card, UPI, or bank details —
            Razorpay handles payment data directly under its own security standards.
          </p>
          <h2 className="text-lg font-bold text-ink">Advertising</h2>
          <p>
            We use the Meta (Facebook/Instagram) Pixel to measure how well our ads perform and to
            show relevant ads to people similar to those who use FlatHunter. When you submit a
            search request or complete a payment, your name and WhatsApp number are cryptographically
            hashed (converted to a one-way code that cannot be reversed back into your original
            details) before being shared with Meta for this matching — Meta does not receive your
            information in plain text. You can opt out of personalized advertising in your Facebook
            or Instagram account&rsquo;s ad settings at any time.
          </p>
          <h2 className="text-lg font-bold text-ink">Location</h2>
          <p>
            If you use the &ldquo;Use my location&rdquo; button, your device&rsquo;s location is
            used only to place a pin on the map for your search — you can also set this manually
            by dragging the pin or searching for an area by name.
          </p>
          <h2 className="text-lg font-bold text-ink">Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
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
