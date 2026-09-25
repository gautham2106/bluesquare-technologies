import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "leaflet/dist/leaflet.css";

const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const title = "FlatHunter — We search Chennai rentals for you";
const description =
  "Pin your area, set your budget, and get matching rental houses on WhatsApp. No brokerage. Full refund if we don't deliver.";

// Overrides the parent (Bluesquare Technologies) metadata for every page
// under /flathunter — this is a distinct sub-product with its own identity.
export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/flathunter",
    siteName: "FlatHunter",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function FlatHunterLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      {pixelId && (
        <>
          <Script id="meta-pixel-flathunter" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
          {/* Fallback for visitors with JavaScript disabled — part of Meta's own base code. */}
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  );
}
