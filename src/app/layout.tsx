import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://sifprime.com"),
  title: {
    default: "SIFPrime — India's #1 Platform for Specialized Investment Funds",
    template: "%s | SIFPrime",
  },
  description:
    "Compare, track and invest in SEBI-regulated Specialized Investment Funds (SIFs). NAV, returns, strategy breakdown. Min ₹10L investment.",
  authors: [{ name: "SIF Prime" }],
  openGraph: {
    siteName: "SIF Prime",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link key="preconnect-google" rel="preconnect" href="https://fonts.googleapis.com" />
        <link key="preconnect-gstatic" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link key="fonts" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;1,500&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" />
        <script key="ld-json" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "SIF Prime",
          "url": "https://sifprime.com",
          "description": "India's premier platform for discovering, comparing, and investing in SEBI-regulated Specialized Investment Funds (SIFs)",
          "email": "info@sifprime.com",
          "address": { "@type": "PostalAddress", "addressCountry": "IN", "addressLocality": "India" },
          "areaServed": { "@type": "Country", "name": "India" },
          "serviceType": ["Investment Advisory", "Fund Comparison", "NAV Tracking"],
        })}} />
        <script key="gtm" dangerouslySetInnerHTML={{ __html: `window.addEventListener('load',function(){setTimeout(function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-T9G62RKT');},2000);});` }} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T9G62RKT" height="0" width="0" style={{display:"none",visibility:"hidden"}} /></noscript>
        <Providers>{children}<Toaster /></Providers>
      </body>
    </html>
  );
}
