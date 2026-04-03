import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "iSIF – ICICI Prudential Specialized Investment Funds",
  description: "Explore ICICI Prudential iSIF fund range – Ex-Top 100 and Hybrid Long Short strategies. Compare NAV, returns & invest from ₹10 Lakhs.",
  alternates: { canonical: "https://sifprime.com/sifs/isif" },
  openGraph: {
    title: "iSIF by ICICI Prudential",
    description: "Explore ICICI Prudential iSIF fund range – Ex-Top 100 and Hybrid Long Short strategies. Compare NAV, returns & invest from ₹10 Lakhs.",
    url: "https://sifprime.com/sifs/isif",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "iSIF by ICICI Prudential",
    description: "Explore ICICI Prudential iSIF fund range – Ex-Top 100 and Hybrid Long Short strategies. Compare NAV, returns & invest from ₹10 Lakhs.",
  },
};

export default function Page() {
  return <PageClient />;
}
