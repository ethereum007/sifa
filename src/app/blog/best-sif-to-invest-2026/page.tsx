import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds",
  description: "Ranking of the best SIF funds to invest in 2026 — top equity long-short, hybrid long-short, and ex-top 100 SIFs by strategy, AMC reputation, and early performance.",
  alternates: { canonical: "https://sifprime.com/blog/best-sif-to-invest-2026" },
  openGraph: {
    title: "Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds",
    description: "Ranking of the best SIF funds to invest in 2026 — top equity long-short, hybrid long-short, and ex-top 100 SIFs by strategy, AMC reputation, and early performance.",
    url: "https://sifprime.com/blog/best-sif-to-invest-2026",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Best SIF to Invest in 2026 — Top Performing Specialized Investment Funds",
    description: "Ranking of the best SIF funds to invest in 2026 — top equity long-short, hybrid long-short, and ex-top 100 SIFs by strategy, AMC reputation, and early performance.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
