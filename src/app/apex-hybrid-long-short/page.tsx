import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "DSP Apex SIF Hybrid Long Short Fund — NAV & Review",
  description: "Apex SIF by DSP Mutual Fund — research-driven hybrid long-short strategy. Live NAV, since-inception returns and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/apex-hybrid-long-short" },
  openGraph: {
    title: "DSP Apex Hybrid Long Short SIF",
    description: "Apex SIF by DSP Mutual Fund — research-driven hybrid long-short strategy. Live NAV, since-inception returns and independent fund review on SIFPrime.",
    url: "https://sifprime.com/apex-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "DSP Apex Hybrid Long Short SIF",
    description: "Apex SIF by DSP Mutual Fund — research-driven hybrid long-short strategy. Live NAV, since-inception returns and independent fund review on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
