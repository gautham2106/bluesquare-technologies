import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const siteUrl = "https://bluesquaregroup.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bluesquare Technologies — Custom Software, AI Agents & Automation",
  description:
    "We build web apps, AI voice agents, and automation that take work off your team's plate. Based in Tamil Nadu.",
  openGraph: {
    title: "Bluesquare Technologies — Custom Software, AI Agents & Automation",
    description:
      "We build web apps, AI voice agents, and automation that take work off your team's plate. Based in Tamil Nadu.",
    url: siteUrl,
    siteName: "Bluesquare Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bluesquare Technologies — Custom Software, AI Agents & Automation",
    description:
      "We build web apps, AI voice agents, and automation that take work off your team's plate. Based in Tamil Nadu.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('bsq-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
