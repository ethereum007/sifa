import type { Metadata } from "next";
import dynamic from "next/dynamic";
import ItemListJsonLd from "@/components/ItemListJsonLd";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

const PageClient = dynamic(() => import("./PageClient"));

const ALL_SIFS = [
  { name: "qSIF Equity Long Short", url: "https://sifprime.com/qsif-equity-long-short" },
  { name: "qSIF Ex-Top 100 Long Short", url: "https://sifprime.com/qsif-ex-top-100-long-short" },
  { name: "qSIF Hybrid Long Short", url: "https://sifprime.com/sifs/qsif-hybrid-long-short" },
  { name: "Diviniti SIF Equity Long Short", url: "https://sifprime.com/diviniti-equity-long-short" },
  { name: "Dyna SIF Equity Long Short", url: "https://sifprime.com/dyna-equity-long-short" },
  { name: "Dyna SIF Active Asset Allocator", url: "https://sifprime.com/dyna-active-asset-allocator" },
  { name: "Arudha Equity Long Short", url: "https://sifprime.com/arudha-equity-long-short" },
  { name: "Arudha Hybrid Long Short", url: "https://sifprime.com/sifs/arudha-hybrid-long-short" },
  { name: "Altiva Hybrid Long Short", url: "https://sifprime.com/sifs/altiva-hybrid-long-short" },
  { name: "Magnum SIF Hybrid Long Short", url: "https://sifprime.com/sifs/magnum-hybrid-long-short" },
  { name: "Titanium SIF Hybrid Long Short", url: "https://sifprime.com/sifs/titanium-hybrid-long-short" },
  { name: "iSIF Equity Long Short", url: "https://sifprime.com/sifs/isif" },
  { name: "iSIF Ex-Top 100", url: "https://sifprime.com/sifs/isif/extop100" },
  { name: "iSIF Hybrid Long Short", url: "https://sifprime.com/sifs/isif/hybrid" },
  { name: "Apex SIF Hybrid Long Short", url: "https://sifprime.com/apex-hybrid-long-short" },
];

export const metadata: Metadata = {
  title: "All 18 SIFs in India Ranked and Explained (2025–26)",
  description: "Fund-by-fund breakdown of every Specialized Investment Fund in India — strategy, risk band, target returns, and who each fund is built for.",
  alternates: { canonical: "https://sifprime.com/all-sifs-india-ranked-explained" },
  openGraph: {
    title: "All 18 SIFs in India Ranked and Explained (2025–26)",
    description: "Fund-by-fund breakdown of every Specialized Investment Fund in India — strategy, risk band, target returns, and who each fund is built for.",
    url: "https://sifprime.com/all-sifs-india-ranked-explained",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "All 18 SIFs in India Ranked and Explained (2025–26)",
    description: "Fund-by-fund breakdown of every Specialized Investment Fund in India — strategy, risk band, target returns, and who each fund is built for.",
  },
};

export default function Page() {
  return (
    <>
      <ItemListJsonLd name="All SIFs in India Ranked" items={ALL_SIFS} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://sifprime.com" },
          { name: "Funds", url: "https://sifprime.com/sif-funds-launched" },
          { name: "All SIFs in India Ranked", url: "https://sifprime.com/all-sifs-india-ranked-explained" },
        ]}
      />
      <PageClient />
    </>
  );
}
