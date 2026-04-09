import type { Metadata } from "next";
import dynamic from "next/dynamic";
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title: "SIF Education & Portfolio Fit Analysis",
  description:
    "Learn about Specialised Investment Funds and get a personalised SIF recommendation based on your risk profile and goals.",
};

export default function Page() {
  return <PageClient />;
}
