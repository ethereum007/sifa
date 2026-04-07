import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Performance Tracker — Live Returns for All Specialized Investment Funds | SIFPrime",
  description: "Track performance of all Specialized Investment Funds in India. Monthly reports, NAV data, returns comparison and key metrics for Equity LS, Hybrid LS, Ex-Top 100 and AAA categories.",
  alternates: { canonical: "https://sifprime.com/sif-performance" },
  openGraph: {
    title: "SIF Performance Tracker — Live Returns for All SIFs | SIFPrime",
    description: "Track performance of all Specialized Investment Funds in India. Monthly reports, NAV data, returns comparison and key metrics for Equity LS, Hybrid LS, Ex-Top 100 and AAA categories.",
    url: "https://sifprime.com/sif-performance",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Performance Tracker — Live Returns for All SIFs | SIFPrime",
    description: "Track performance of all Specialized Investment Funds in India. Monthly reports, NAV data, returns comparison and key metrics.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
