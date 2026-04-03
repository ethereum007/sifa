import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF – The Billion Dollar Opportunity for Distributors",
  description: "Discover why Specialized Investment Funds (SIFs) represent a massive opportunity for mutual fund distributors. Learn about higher commissions, growing AUM, and early-mover advantage.",
  alternates: { canonical: "https://sifprime.com/distributors/sif-billion-dollar-opportunity" },
  openGraph: {
    title: "SIF – Billion Dollar Opportunity for Distributors",
    description: "Why SIFs are the next big revenue opportunity for mutual fund distributors in India.",
    url: "https://sifprime.com/distributors/sif-billion-dollar-opportunity",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF – Billion Dollar Opportunity for Distributors",
    description: "Why SIFs are the next big revenue opportunity for mutual fund distributors in India.",
  },
};

export default function Page() {
  return <PageClient />;
}
