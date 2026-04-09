import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Recommendation Report",
  description:
    "Your personalised Specialised Investment Fund recommendation report, prepared by your trusted advisor.",
};

export default function Page() {
  return <PageClient />;
}
