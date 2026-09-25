"use client";

import Logo from "@/components/flathunter/Logo";
import { siteConfig, mailtoLink } from "@/config/flathunter";
import { trackContact } from "@/lib/trackContact";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/[0.06] bg-white pb-24 pt-10 md:pb-10">
      <div className="fh-container-page flex flex-col items-center gap-4 text-center text-sm text-ink/60">
        <Logo size={22} />

        <p>
          {siteConfig.name} is a service by{" "}
          <a href="/" className="fh-focus-ring rounded-lg font-medium hover:text-brand-600">
            {siteConfig.company}
          </a>{" "}
          · {siteConfig.location}
        </p>

        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContact()}
            className="fh-focus-ring rounded-lg hover:text-brand-600"
          >
            WhatsApp {siteConfig.phoneDisplay}
          </a>
          <span aria-hidden="true">·</span>
          <a href={mailtoLink} className="fh-focus-ring rounded-lg hover:text-brand-600">
            {siteConfig.email}
          </a>
        </p>

        <p className="flex flex-wrap items-center justify-center gap-3">
          <a href="/flathunter/privacy" className="fh-focus-ring rounded-lg hover:text-brand-600">
            Privacy
          </a>
          <span aria-hidden="true">·</span>
          <a href="/flathunter/terms" className="fh-focus-ring rounded-lg hover:text-brand-600">
            Terms
          </a>
          <span aria-hidden="true">·</span>
          <a href="/flathunter/refund-policy" className="fh-focus-ring rounded-lg hover:text-brand-600">
            Refund Policy
          </a>
        </p>

        <p className="text-xs text-ink/40">
          © {year} {siteConfig.company}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
