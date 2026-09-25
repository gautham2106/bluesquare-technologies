"use client";

import { useEffect, useRef, useState } from "react";

type SquareGridBackgroundProps = {
  cols?: number;
  rows?: number;
  className?: string;
};

/**
 * Decorative grid of small squares that softly "light up" the first time it
 * scrolls into view. Pure CSS transitions + a single IntersectionObserver —
 * no per-frame JS work, so it stays cheap on low-end phones.
 */
export default function SquareGridBackground({
  cols = 10,
  rows = 6,
  className = "",
}: SquareGridBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    setVisible(true);
  }, []);

  const cells = Array.from({ length: cols * rows });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="grid h-full w-full gap-2 p-2 sm:gap-3"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cells.map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const dist = row + col;
          const delay = dist * 0.045;
          const pulseDelay = (i % 11) * 0.35;

          return (
            <div
              key={i}
              className="square-grid-cell aspect-square transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none"
              style={{
                opacity: visible ? undefined : 0,
                transform: visible ? "scale(1)" : "scale(0.7)",
                transitionDelay: `${delay}s`,
                animation: visible
                  ? `square-pulse 4.5s ease-in-out ${pulseDelay}s infinite`
                  : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
