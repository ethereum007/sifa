import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Tata Titanium SIF Hybrid Long Short Fund — NAV & Review",
  description: "Titanium SIF by Tata Mutual Fund — institutional-grade hybrid long-short strategy. Live NAV, performance data and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/titanium-hybrid-long-short" },
  openGraph: {
    title: "Tata Titanium Hybrid Long Short SIF",
    description: "Titanium SIF by Tata Mutual Fund — institutional-grade hybrid long-short strategy. Live NAV, performance data and independent fund review on SIFPrime.",
    url: "https://sifprime.com/sifs/titanium-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Tata Titanium Hybrid Long Short SIF",
    description: "Titanium SIF by Tata Mutual Fund — institutional-grade hybrid long-short strategy. Live NAV, performance data and independent fund review on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
