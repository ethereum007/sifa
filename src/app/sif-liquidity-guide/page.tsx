import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Liquidity Guide – Redemption Rules & Lock-in Period",
  description: "Understand SIF liquidity rules including lock-in periods, redemption process, exit loads, and settlement timelines for Specialized Investment Funds in India.",
  alternates: { canonical: "https://sifprime.com/sif-liquidity-guide" },
  openGraph: {
    title: "SIF Liquidity Guide – Redemption Rules & Lock-in",
    description: "Complete guide to SIF liquidity – lock-in periods, redemption process, exit loads, and settlement timelines.",
    url: "https://sifprime.com/sif-liquidity-guide",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Liquidity Guide – Redemption Rules & Lock-in",
    description: "Complete guide to SIF liquidity – lock-in periods, redemption process, exit loads, and settlement timelines.",
  },
};

export default function Page() {
  return <PageClient />;
}
