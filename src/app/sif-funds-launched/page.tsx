import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "All SIFs in India — Complete Fund List 2025–26",
  description: "Complete list of all 14+ Specialized Investment Funds launched in India. Filter by AMC, strategy, risk band and minimum investment.",
  alternates: { canonical: "https://sifprime.com/sif-funds-list" },
  openGraph: {
    title: "All SIFs in India — Complete Fund List 2025–26",
    description: "Complete list of all 14+ Specialized Investment Funds launched in India. Filter by AMC, strategy, risk band and minimum investment.",
    url: "https://sifprime.com/sif-funds-list",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "All SIFs in India — Complete Fund List 2025–26",
    description: "Complete list of all 14+ Specialized Investment Funds launched in India. Filter by AMC, strategy, risk band and minimum investment.",
  },
};

export default function Page() {
  return <PageClient />;
}
