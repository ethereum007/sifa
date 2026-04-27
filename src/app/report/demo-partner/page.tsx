import type { Metadata } from "next";
import dynamic from "next/dynamic";

const DemoPartnerReportClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Recommendation Report — Demo",
  description:
    "Sample SIF Recommendation Report showing all launched SIFs, their performance, and SIFPrime's Alpha Shield scores.",
};

export default function Page() {
  return <DemoPartnerReportClient />;
}
