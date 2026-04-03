import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Arudha Equity Long Short – Bandhan SIF Review",
  description: "Review Bandhan Arudha Equity Long Short SIF. Strategy, NAV, portfolio, returns & risk analysis from Bandhan Mutual Fund.",
  alternates: { canonical: "https://sifprime.com/arudha-equity-long-short" },
  openGraph: {
    title: "Bandhan Arudha Equity Long Short SIF",
    description: "Review Bandhan Arudha Equity Long Short SIF. Strategy, NAV, portfolio, returns & risk analysis from Bandhan Mutual Fund.",
    url: "https://sifprime.com/arudha-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Bandhan Arudha Equity Long Short SIF",
    description: "Review Bandhan Arudha Equity Long Short SIF. Strategy, NAV, portfolio, returns & risk analysis from Bandhan Mutual Fund.",
  },
};

export default function Page() {
  return <PageClient />;
}
