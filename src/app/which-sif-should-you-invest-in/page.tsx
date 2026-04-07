import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Which SIF Should You Invest In? Match Your Profile (2025)",
  description: "Not all SIFs are the same. Use this investor-profile matching guide to find the right Specialized Investment Fund based on your risk appetite, return goal, and liquidity needs.",
  alternates: { canonical: "https://sifprime.com/which-sif-should-you-invest-in" },
  openGraph: {
    title: "Which SIF Should You Invest In? Match Your Profile (2025)",
    description: "Not all SIFs are the same. Use this investor-profile matching guide to find the right Specialized Investment Fund.",
    url: "https://sifprime.com/which-sif-should-you-invest-in",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Which SIF Should You Invest In? Match Your Profile (2025)",
    description: "Not all SIFs are the same. Use this investor-profile matching guide to find the right Specialized Investment Fund.",
  },
};

export default function Page() {
  return <PageClient />;
}
