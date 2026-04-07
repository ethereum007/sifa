import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "Contact SIFPrime — Get in Touch | Meridian Research Advisory",
  description: "Contact the SIFPrime team for SIF investment queries, distributor partnerships, or media enquiries. Reach us at info@sifprime.com.",
  alternates: { canonical: "https://sifprime.com/contact" },
  openGraph: {
    title: "Contact SIFPrime — Get in Touch | Meridian Research Advisory",
    description: "Contact the SIFPrime team for SIF investment queries, distributor partnerships, or media enquiries.",
    url: "https://sifprime.com/contact",
    images: ["/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "Contact SIFPrime — Get in Touch | Meridian Research Advisory",
    description: "Contact the SIFPrime team for SIF investment queries, distributor partnerships, or media enquiries.",
  },
};

export default function Page() {
  return <PageClient />;
}
