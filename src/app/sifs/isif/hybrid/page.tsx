import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "ICICI Prudential iSIF Hybrid Long Short Fund — NAV & Review",
  description: "iSIF Hybrid by ICICI Prudential — balanced hybrid long-short strategy with equity & debt exposure. Live NAV, returns and independent review on SIFPrime.",
  alternates: { canonical: "https://sifprime.com/sifs/isif/hybrid" },
  openGraph: {
    title: "iSIF Hybrid Long Short by ICICI Prudential",
    description: "iSIF Hybrid by ICICI Prudential — balanced hybrid long-short strategy with equity & debt exposure. Live NAV, returns and independent review on SIFPrime.",
    url: "https://sifprime.com/sifs/isif/hybrid",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "iSIF Hybrid Long Short by ICICI Prudential",
    description: "iSIF Hybrid by ICICI Prudential — balanced hybrid long-short strategy with equity & debt exposure. Live NAV, returns and independent review on SIFPrime.",
  },
};

export default function Page() {
  return <PageClient />;
}
