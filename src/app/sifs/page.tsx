import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "All SIF Funds – Browse Specialized Investment Funds by AMC",
  description: "Browse all Specialized Investment Fund schemes by AMC. Compare strategies, NAV and returns across India's top fund houses.",
  alternates: { canonical: "https://sifprime.com/sifs" },
  openGraph: {
    title: "All SIF Funds by AMC",
    description: "Browse all Specialized Investment Fund schemes by AMC. Compare strategies, NAV and returns across India's top fund houses.",
    url: "https://sifprime.com/sifs",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "All SIF Funds by AMC",
    description: "Browse all Specialized Investment Fund schemes by AMC. Compare strategies, NAV and returns across India's top fund houses.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
