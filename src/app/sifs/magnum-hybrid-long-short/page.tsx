import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SBI Magnum SIF Hybrid Long Short Fund — NAV & Review",
  description: "Magnum SIF by SBI Mutual Fund — disciplined hybrid long-short strategy. Live NAV, monthly returns, risk metrics and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/magnum-hybrid-long-short" },
  openGraph: {
    title: "SBI Magnum Hybrid Long Short SIF",
    description: "Complete review of SBI Magnum Hybrid Long Short Specialized Investment Fund.",
    url: "https://sifprime.com/sifs/magnum-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SBI Magnum Hybrid Long Short SIF",
    description: "Complete review of SBI Magnum Hybrid Long Short Specialized Investment Fund.",
  },
};

export default function Page() {
  return <PageClient />;
}
