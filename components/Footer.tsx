import { siteConfig, mailtoLink } from "@/config/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/[0.06] bg-surface pb-24 pt-10 dark:border-white/10 dark:bg-surface-dark md:pb-10">
      <div className="container-page flex flex-col items-center gap-4 text-center text-sm text-ink/60 dark:text-white/60">
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 rounded-sqsm bg-brand-500" aria-hidden="true" />
          <span className="font-bold text-ink dark:text-white">{siteConfig.name}</span>
        </div>

        <p>{siteConfig.location}</p>

        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <a href={siteConfig.phoneTel} className="focus-ring rounded-sqsm hover:text-brand-600 dark:hover:text-white">
            {siteConfig.phoneDisplay}
          </a>
          <span aria-hidden="true">·</span>
          <a href={mailtoLink} className="focus-ring rounded-sqsm hover:text-brand-600 dark:hover:text-white">
            {siteConfig.email}
          </a>
        </p>

        <p className="flex items-center justify-center gap-3">
          <a href="/flathunter" className="focus-ring rounded-sqsm hover:text-brand-600 dark:hover:text-white">
            FlatHunter
          </a>
          <span aria-hidden="true">·</span>
          <a href="/privacy" className="focus-ring rounded-sqsm hover:text-brand-600 dark:hover:text-white">
            Privacy
          </a>
          <span aria-hidden="true">·</span>
          <a href="/terms" className="focus-ring rounded-sqsm hover:text-brand-600 dark:hover:text-white">
            Terms
          </a>
        </p>

        <p className="text-xs text-ink/40 dark:text-white/40">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
