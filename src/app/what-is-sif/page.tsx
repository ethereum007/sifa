import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "What is a Specialized Investment Fund (SIF)?",
  description: "SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS.",
  alternates: { canonical: "https://sifprime.com/sif-explained" },
  openGraph: {
    title: "What is a Specialized Investment Fund (SIF)?",
    description: "SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS.",
    url: "https://sifprime.com/sif-explained",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "What is a Specialized Investment Fund (SIF)?",
    description: "SIFs explained — how they work, who they're for, SEBI regulations, minimum investment, and how SIFs differ from mutual funds and PMS.",
  },
};

export default function Page() {
  return <PageClient />;
}
