import type { Metadata } from "next";
import dynamic from "next/dynamic";

const PageClient = dynamic(() => import("./PageClient"), { ssr: false });

export const metadata: Metadata = {
  title: "DynaSIF Active Asset Allocator – 360 ONE Review",
  description: "Review 360 ONE DynaSIF Active Asset Allocator. Dynamic allocation strategy, NAV, portfolio & risk analysis.",
  alternates: { canonical: "https://sifprime.com/dyna-active-asset-allocator" },
  openGraph: {
    title: "360 ONE DynaSIF Active Asset Allocator",
    description: "Review 360 ONE DynaSIF Active Asset Allocator. Dynamic allocation strategy, NAV, portfolio & risk analysis.",
    url: "https://sifprime.com/dyna-active-asset-allocator",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "360 ONE DynaSIF Active Asset Allocator",
    description: "Review 360 ONE DynaSIF Active Asset Allocator. Dynamic allocation strategy, NAV, portfolio & risk analysis.",
  },
};

export default function Page() {
  return <PageClient />;
}
