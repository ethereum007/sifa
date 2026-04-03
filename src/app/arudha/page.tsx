import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Arudha SIF – Bandhan Hybrid Long Short Fund",
  description: "Explore Bandhan Arudha Hybrid Long Short SIF. Strategy overview, features & investment details.",
  alternates: { canonical: "https://sifprime.com/sifs/arudha-hybrid-long-short" },
  openGraph: {
    title: "Arudha SIF – Bandhan Hybrid Long Short Fund",
    description: "Explore Bandhan Arudha Hybrid Long Short SIF. Strategy overview, features & investment details.",
    url: "https://sifprime.com/sifs/arudha-hybrid-long-short",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Arudha SIF – Bandhan Hybrid Long Short Fund",
    description: "Explore Bandhan Arudha Hybrid Long Short SIF. Strategy overview, features & investment details.",
  },
};

export default function Page() {
  return <PageClient />;
}
