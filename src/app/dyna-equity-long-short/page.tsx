import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "360 ONE Dyna SIF Equity Long Short Fund — NAV & Review",
  description: "Dyna SIF by 360 ONE — macro-driven equity long-short strategy. Live NAV, since-inception returns, drawdown analysis and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/dyna-equity-long-short" },
  openGraph: {
    title: "360 ONE DynaSIF Equity Long Short",
    description: "Dyna SIF by 360 ONE — macro-driven equity long-short strategy. Live NAV, since-inception returns, drawdown analysis and independent review on SIFPrime.",
    url: "https://sifprime.com/dyna-equity-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "360 ONE DynaSIF Equity Long Short",
    description: "Dyna SIF by 360 ONE — macro-driven equity long-short strategy. Live NAV, since-inception returns, drawdown analysis and independent review on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
