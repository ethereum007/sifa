import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIFPrime Partner Programme — Free SIF Toolkit for MFDs & RIAs",
  description:
    "Free toolkit for AMFI-registered MFDs and RIAs distributing Specialized Investment Funds. Empanelment guides, fund analysis, HNI pitch decks, and the weekly Friday Brief — no subscription, no gates.",
  alternates: { canonical: "https://sifprime.com/partner" },
  openGraph: {
    title: "SIFPrime Partner Programme — Free SIF Toolkit for MFDs & RIAs",
    description:
      "Free toolkit, weekly Friday Brief, and Knowledge Series for India's wealth managers. Built by an AMFI MFD for distributors.",
    url: "https://sifprime.com/partner",
    images: ["https://sifprime.com/og-image.png"],
    type: "website",
  },
  twitter: {
    title: "SIFPrime Partner Programme — Free SIF Toolkit",
    description:
      "12 modules, weekly Brief, Monthly Masterclass — all free for MFDs and RIAs distributing SIFs.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
