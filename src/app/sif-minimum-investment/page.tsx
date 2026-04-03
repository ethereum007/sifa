import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "SIF Minimum Investment – ₹10 Lakhs Entry Point Explained",
  description: "Learn about SIF minimum investment of ₹10 Lakhs. Access hedge fund-like long-short strategies at a fraction of PMS and AIF costs. Complete investment guide.",
  alternates: { canonical: "https://sifprime.com/sif-minimum-investment" },
  openGraph: {
    title: "SIF Minimum Investment ₹10 Lakhs",
    description: "Access sophisticated long-short strategies with just ₹10 Lakhs.",
    url: "https://sifprime.com/sif-minimum-investment",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF Minimum Investment ₹10 Lakhs",
    description: "Access sophisticated long-short strategies with just ₹10 Lakhs.",
  },
};

export default function Page() {
  return <PageClient />;
}
