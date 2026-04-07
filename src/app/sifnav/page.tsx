import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF NAV Today – Daily Net Asset Values of All SIF Funds",
  description: "Track daily NAV of all Specialized Investment Fund (SIF) schemes in India. Live NAV data from Quant, ICICI, SBI, Tata, Edelweiss, Bandhan & more AMCs.",
  alternates: { canonical: "https://sifprime.com/sifnav" },
  openGraph: {
    title: "SIF NAV Today – All SIF Fund NAVs",
    description: "Live daily NAV tracking for all launched SIF schemes in India.",
    url: "https://sifprime.com/sifnav",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF NAV Today – All SIF Fund NAVs",
    description: "Live daily NAV tracking for all launched SIF schemes in India.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
