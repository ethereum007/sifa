import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Performance Reports – Monthly Analysis",
  description: "Monthly performance analysis of India's Specialized Investment Funds (SIFs). Track returns, compare strategies, and read expert commentary across Hybrid, Equity, and Ex-Top 100 categories.",
  alternates: { canonical: "https://sifprime.com/sifperformance" },
  openGraph: {
    title: "SIF Performance Reports – Monthly Analysis",
    description: "Monthly performance analysis of India's Specialized Investment Funds (SIFs). Track returns, compare strategies, and read expert commentary across Hybrid, Equity, and Ex-Top 100 categories.",
    url: "https://sifprime.com/sifperformance",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Performance Reports – Monthly Analysis",
    description: "Monthly performance analysis of India's Specialized Investment Funds (SIFs). Track returns, compare strategies, and read expert commentary across Hybrid, Equity, and Ex-Top 100 categories.",
  },
};

export default function Page() {
  return <PageClient />;
}
