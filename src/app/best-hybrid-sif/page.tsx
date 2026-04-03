import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "Apex vs Magnum vs Titanium vs Altiva: Best Hybrid SIF?",
  description: "7 Hybrid Long-Short SIFs, one investor. Head-to-head comparison of every hybrid SIF in India — strategy, risk, returns, redemption windows, and which fund wins for which investor.",
  alternates: { canonical: "https://sifprime.com/best-hybrid-sif" },
  openGraph: {
    title: "Best Hybrid Long-Short SIF in India — Head-to-Head Comparison",
    description: "7 Hybrid Long-Short SIFs, one investor. Head-to-head comparison of every hybrid SIF in India — strategy, risk, returns, redemption windows, and which fund wins for which investor.",
    url: "https://sifprime.com/best-hybrid-sif",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Best Hybrid Long-Short SIF in India — Head-to-Head Comparison",
    description: "7 Hybrid Long-Short SIFs, one investor. Head-to-head comparison of every hybrid SIF in India — strategy, risk, returns, redemption windows, and which fund wins for which investor.",
  },
};

export default function Page() {
  return <PageClient />;
}
