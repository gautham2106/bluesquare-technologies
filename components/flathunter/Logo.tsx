type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/** Map-pin-with-a-house mark, inline SVG so it stays crisp at any size. */
export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      width={size}
      height={(size * 56) / 48}
      className={className}
      role="img"
      aria-label="FlatHunter logo"
    >
      <path
        d="M24 2C13.5 2 5 10.5 5 21c0 14.5 19 31 19 31s19-16.5 19-31C43 10.5 34.5 2 24 2z"
        fill="#1E4DD8"
      />
      <path d="M24 12L35 22H13L24 12Z" fill="#FFFFFF" />
      <rect x="16" y="22" width="16" height="11" fill="#FFFFFF" />
      <rect x="21" y="26" width="6" height="7" fill="#1E4DD8" />
    </svg>
  );
}

export default function Logo({ size = 28, withWordmark = true, className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={size} />
      {withWordmark && (
        <span className="text-lg font-extrabold tracking-tight text-ink">
          FlatHunter
        </span>
      )}
    </span>
  );
}
