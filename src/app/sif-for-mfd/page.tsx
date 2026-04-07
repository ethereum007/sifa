import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF for MFDs — Why Mutual Fund Distributors Should Sell Specialized Investment Funds",
  description: "Discover why Specialized Investment Funds (SIFs) are the biggest distribution opportunity for MFDs. Higher ticket size, HNI clients, trail fees and how to become a SIF distributor.",
  alternates: { canonical: "https://sifprime.com/sif-for-mfd" },
  openGraph: {
    title: "SIF for MFDs — The Biggest Distribution Opportunity Since Mutual Funds",
    description: "Discover why Specialized Investment Funds (SIFs) are the biggest distribution opportunity for MFDs. Higher ticket size, HNI clients, trail fees and how to become a SIF distributor.",
    url: "https://sifprime.com/sif-for-mfd",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF for MFDs — The Biggest Distribution Opportunity Since Mutual Funds",
    description: "Discover why Specialized Investment Funds (SIFs) are the biggest distribution opportunity for MFDs. Higher ticket size, HNI clients, trail fees and how to become a SIF distributor.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
