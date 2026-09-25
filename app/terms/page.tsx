import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service — Bluesquare Technologies",
  description: "Terms governing the use of Bluesquare Technologies' website and services.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="container-page section-pad max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink dark:text-white">
          Terms of Service
        </h1>
        <div className="prose-sm mt-6 space-y-5 text-sm leading-relaxed text-ink/70 dark:text-white/70">
          <p>
            These terms cover your use of this website and general engagement with{" "}
            {siteConfig.name}. Specific project work is governed by the individual proposal or
            contract agreed with each client.
          </p>
          <h2 className="text-lg font-bold text-ink dark:text-white">Website use</h2>
          <p>
            Content on this site is provided for general information about our services. We make
            reasonable efforts to keep it accurate but make no guarantee that it is complete or
            up to date.
          </p>
          <h2 className="text-lg font-bold text-ink dark:text-white">Engagements</h2>
          <p>
            Any software, automation, or consulting work is scoped and agreed separately in
            writing before work begins. Pricing, timelines, and deliverables discussed on a call
            or via WhatsApp are indicative until confirmed in a proposal.
          </p>
          <h2 className="text-lg font-bold text-ink dark:text-white">Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-600 dark:text-brand-300">
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
