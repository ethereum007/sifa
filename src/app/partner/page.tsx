import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIFPrime Partner Platform — Co-Branded SIF Reports for MFDs & RIAs",
  description:
    "Join India's first partner platform for Specialized Investment Funds. Generate co-branded SIF reports with your logo, track prospects, and grow your HNI advisory practice.",
  alternates: { canonical: "https://sifprime.com/partner" },
  openGraph: {
    title: "SIFPrime Partner Platform — Co-Branded SIF Reports for MFDs & RIAs",
    description:
      "Generate co-branded SIF reports with your branding. Track prospects, grow HNI advisory practice with India's only SIF intelligence platform.",
    url: "https://sifprime.com/partner",
    images: ["https://sifprime.com/og-image.png"],
    type: "website",
  },
  twitter: {
    title: "SIFPrime Partner Platform — Co-Branded SIF Reports",
    description:
      "Generate co-branded SIF reports with your branding for HNI clients.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
