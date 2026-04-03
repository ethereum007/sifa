import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "All 14 SIFs in India Ranked and Explained (2025–26)",
  description: "Fund-by-fund breakdown of every Specialized Investment Fund in India — strategy, risk band, target returns, and who each fund is built for.",
  alternates: { canonical: "https://sifprime.com/all-sifs-india-ranked-explained" },
  openGraph: {
    title: "All 14 SIFs in India Ranked and Explained (2025–26)",
    description: "Fund-by-fund breakdown of every Specialized Investment Fund in India — strategy, risk band, target returns, and who each fund is built for.",
    url: "https://sifprime.com/all-sifs-india-ranked-explained",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "All 14 SIFs in India Ranked and Explained (2025–26)",
    description: "Fund-by-fund breakdown of every Specialized Investment Fund in India — strategy, risk band, target returns, and who each fund is built for.",
  },
};

export default function Page() {
  return <PageClient />;
}
