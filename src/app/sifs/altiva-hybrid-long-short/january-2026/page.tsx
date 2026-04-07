import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Altiva SIF January 2026 Performance – Edelweiss",
  description: "Edelweiss Altiva Hybrid Long Short SIF January 2026 monthly report. Portfolio allocation, strategy breakdown & performance analysis.",
  alternates: { canonical: "https://sifprime.com/sifs/altiva-hybrid-long-short/january-2026" },
  openGraph: {
    title: "Altiva SIF January 2026 Performance – Edelweiss",
    description: "Edelweiss Altiva Hybrid Long Short SIF January 2026 monthly report. Portfolio allocation, strategy breakdown & performance analysis.",
    url: "https://sifprime.com/sifs/altiva-hybrid-long-short/january-2026",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Altiva SIF January 2026 Performance – Edelweiss",
    description: "Edelweiss Altiva Hybrid Long Short SIF January 2026 monthly report. Portfolio allocation, strategy breakdown & performance analysis.",
  },
};

export const revalidate = 86400;

export default function Page() {
  return <PageClient />;
}
