import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Altiva SIF Hybrid Long Short Fund — NAV, Returns & Review",
  description: "Altiva SIF by Edelweiss — India's first Hybrid Long-Short SIF. Live NAV, since-inception returns, max drawdown and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/altiva-hybrid-long-short" },
  openGraph: {
    title: "Edelweiss Altiva Hybrid Long Short SIF",
    description: "Altiva SIF by Edelweiss — India's first Hybrid Long-Short SIF. Live NAV, since-inception returns, max drawdown and independent fund review on SIFPrime.",
    url: "https://sifprime.com/sifs/altiva-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Edelweiss Altiva Hybrid Long Short SIF",
    description: "Altiva SIF by Edelweiss — India's first Hybrid Long-Short SIF. Live NAV, since-inception returns, max drawdown and independent fund review on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
