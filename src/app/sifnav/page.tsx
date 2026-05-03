import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NavTable = dynamic(() => import("@/components/NavTable"));

export const metadata: Metadata = {
  title: "SIF NAV Today — Daily Net Asset Values of All SIF Funds",
  description:
    "Track daily NAV of every Specialized Investment Fund in India. Live NAV data from Quant, ICICI, SBI, Tata, Edelweiss, Bandhan, ABSL, 360 ONE, ITI and Franklin Templeton — updated every business day.",
  alternates: { canonical: "https://sifprime.com/sifnav" },
  openGraph: {
    title: "SIF NAV Today — All SIF Fund NAVs",
    description:
      "Live daily NAV tracking for all launched SIF schemes in India.",
    url: "https://sifprime.com/sifnav",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title: "SIF NAV Today — All SIF Fund NAVs",
    description:
      "Live daily NAV tracking for all launched SIF schemes in India.",
  },
};

export const revalidate = 3600;

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* SSR'd hero */}
        <section className="container mx-auto px-4 max-w-4xl py-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            SIF NAV Today
          </h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl mx-auto">
            Latest Net Asset Values for every Specialized Investment Fund in
            India — 17 live SIF schemes across 11 AMCs, refreshed every business
            day from the AMC-published data.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">17</span> live
              SIF schemes
            </li>
            <li className="hidden md:inline">•</li>
            <li>
              <span className="font-semibold text-foreground">11</span> AMCs
              tracked
            </li>
            <li className="hidden md:inline">•</li>
            <li>
              NAV updated <span className="font-semibold text-foreground">daily</span>
            </li>
          </ul>
        </section>

        {/* Interactive NAV table */}
        <NavTable />

        {/* SEO prose */}
        <section className="container mx-auto px-4 max-w-3xl py-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              About SIF NAVs
            </h2>
            <p>
              Net Asset Value (NAV) is the per-unit value of a SIF scheme, and
              the price at which fresh units are allotted or redeemed. For
              Specialized Investment Funds, AMCs publish NAVs once per business
              day — the cut-off for applying at today&apos;s NAV varies by
              scheme (typically 3 PM IST).
            </p>
            <p>
              Because most SIFs started near the ₹10 mark in late 2025, current
              NAV also tells you since-inception return at a glance. A SIF
              trading at ₹10.30 has delivered +3% from launch; a SIF at ₹9.04
              is down 9.6%. For context on which SIFs protected capital during
              the March 2026 crash, see the{" "}
              <Link href="/sif-performance">SIF performance tracker</Link> and{" "}
              <Link href="/all-sifs-india-ranked-explained">
                SIFPrime Alpha Shield rankings
              </Link>
              .
            </p>
            <p>
              All NAVs on this page are Direct-plan, Growth-option figures
              sourced from the AMC websites. Regular-plan NAVs are shown on the
              individual fund pages under{" "}
              <Link href="/sifs">Browse SIFs by AMC</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
