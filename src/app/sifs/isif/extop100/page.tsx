import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "ICICI Prudential iSIF Equity Ex-top 100 Long Short Fund — NAV & Review",
  description: "iSIF Equity Long-Short by ICICI Prudential — active long-short equity strategy. Live NAV, monthly returns vs Nifty and independent fund review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/isif/extop100" },
  openGraph: {
    title: "iSIF Ex-Top 100 by ICICI Prudential",
    description: "iSIF Equity Long-Short by ICICI Prudential — active long-short equity strategy. Live NAV, monthly returns vs Nifty and independent fund review on SIFPrime.",
    url: "https://sifprime.com/sifs/isif/extop100",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "iSIF Ex-Top 100 by ICICI Prudential",
    description: "iSIF Equity Long-Short by ICICI Prudential — active long-short equity strategy. Live NAV, monthly returns vs Nifty and independent fund review on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
