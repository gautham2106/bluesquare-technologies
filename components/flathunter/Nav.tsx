"use client";

import Logo from "@/components/flathunter/Logo";
import { scrollToId } from "@/lib/scroll";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.06] bg-white/85 backdrop-blur-md">
      <div className="fh-container-page flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToId("top")}
          className="fh-focus-ring rounded-lg"
        >
          <Logo size={26} />
        </button>

        <button
          type="button"
          onClick={() => scrollToId("start-search")}
          className="fh-btn-primary py-2.5 text-sm"
        >
          Start my search
        </button>
      </div>
    </header>
  );
}
