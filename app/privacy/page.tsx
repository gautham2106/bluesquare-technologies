import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Bluesquare Technologies",
  description: "How Bluesquare Technologies collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="container-page section-pad max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink dark:text-white">
          Privacy Policy
        </h1>
        <div className="prose-sm mt-6 space-y-5 text-sm leading-relaxed text-ink/70 dark:text-white/70">
          <p>
            {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) builds custom software, AI
            agents, and automation systems for businesses and institutions. This policy explains
            what information we collect when you contact us or use a system we&rsquo;ve built,
            and how we handle it.
          </p>
          <h2 className="text-lg font-bold text-ink dark:text-white">Information we collect</h2>
          <p>
            When you reach out via WhatsApp, phone, or email, we collect the details you share —
            your name, contact information, and the nature of your enquiry — solely to respond to
            you and scope potential work.
          </p>
          <h2 className="text-lg font-bold text-ink dark:text-white">How we use it</h2>
          <p>
            We use your information to respond to enquiries, deliver and support the systems we
            build, and communicate about ongoing projects. We do not sell your information to
            third parties.
          </p>
          <h2 className="text-lg font-bold text-ink dark:text-white">Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
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
