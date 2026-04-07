import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Bandhan Arudha SIF Hybrid Long Short Fund — NAV & Review",
  description: "Arudha SIF by Bandhan Mutual Fund — only SIF with positive March 2026 returns. Live NAV, since-inception performance and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/arudha-hybrid-long-short" },
  openGraph: {
    title: "Bandhan Arudha Hybrid Long Short SIF",
    description: "Arudha SIF by Bandhan Mutual Fund — only SIF with positive March 2026 returns. Live NAV, since-inception performance and independent review on SIFPrime.",
    url: "https://sifprime.com/sifs/arudha-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Bandhan Arudha Hybrid Long Short SIF",
    description: "Arudha SIF by Bandhan Mutual Fund — only SIF with positive March 2026 returns. Live NAV, since-inception performance and independent review on SIFPrime.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
