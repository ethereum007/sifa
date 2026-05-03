import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Interactive chart/heatmap/scorecard — client island
const PageClient = dynamic(() => import("./PageClient"));

export const metadata: Metadata = {
  title:
    "SIF Returns — Track Performance of All Specialized Investment Funds",
  description:
    "Live and historical returns of all SEBI-regulated SIFs in India. Compare fund performance across Equity L-S, Hybrid, Ex-Top 100 and Asset Allocation strategies.",
  alternates: { canonical: "https://sifprime.com/sifreturns" },
  openGraph: {
    title:
      "SIF Returns — Track Performance of All Specialized Investment Funds",
    description:
      "Live and historical returns of all SEBI-regulated SIFs in India.",
    url: "https://sifprime.com/sifreturns",
    images: ["https://sifprime.com/og-image.png"],
    type: "article",
  },
  twitter: {
    title:
      "SIF Returns — Track Performance of All Specialized Investment Funds",
    description:
      "Live and historical returns of all SEBI-regulated SIFs in India.",
  },
};

export const revalidate = 86400;

const MONTHS = [
  { month: "Oct 2025", slug: "october-2025" },
  { month: "Nov 2025", slug: "november-2025" },
  { month: "Dec 2025", slug: "december-2025" },
  { month: "Jan 2026", slug: "january-2026" },
  { month: "Feb 2026", slug: "february-2026" },
  { month: "Mar 2026", slug: "march-2026" },
  { month: "Apr 2026", slug: "april-2026", live: true },
];

export default function Page() {
  const datasetLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "SIF Returns — All Indian Specialized Investment Funds",
    description:
      "Since-inception, 3-month and 1-month returns for every SEBI-regulated Specialized Investment Fund in India. Categories covered: Hybrid Long-Short, Equity Long-Short, Ex-Top 100 Long-Short, Active Asset Allocator.",
    url: "https://sifprime.com/sifreturns",
    temporalCoverage: "2025-10/2026-04",
    creator: {
      "@type": "Organization",
      name: "SIFPrime",
      url: "https://sifprime.com",
    },
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "text/html",
      contentUrl: "https://sifprime.com/sifreturns",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* SSR'd hero */}
        <section className="container mx-auto px-4 max-w-4xl py-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            SIF Returns Tracker
          </h1>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-2xl mx-auto">
            Since-inception, 3-month and 1-month returns for every live SIF in
            India. NAV journey chart, monthly heatmap and side-by-side
            scorecard — updated daily from AMC data.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-foreground">17</span> live
              funds
            </li>
            <li className="hidden md:inline">•</li>
            <li>
              <span className="font-semibold text-foreground">4</span>{" "}
              categories
            </li>
            <li className="hidden md:inline">•</li>
            <li>
              Benchmarked vs{" "}
              <span className="font-semibold text-foreground">Nifty 500 TRI</span>
            </li>
          </ul>
        </section>

        {/* Interactive chart + heatmap + scorecard (client island) */}
        <PageClient />

        {/* SSR'd month archive */}
        <section className="py-8 sm:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Monthly Performance Archive
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 max-w-4xl mx-auto">
              {MONTHS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/performance/${m.slug}`}
                  className={`p-3 rounded-xl border text-center text-sm font-medium transition-colors ${
                    m.live
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
                >
                  {m.month}
                  {m.live ? " 🔴" : ""}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SSR'd SEO prose */}
        <section className="container mx-auto px-4 max-w-3xl py-12">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How to read SIF returns
            </h2>
            <p>
              SIF (Specialized Investment Fund) returns look misleading at
              first glance because most schemes launched between October 2025
              and March 2026 — so &quot;since inception&quot; for a young SIF
              covers a different market regime than a SIF launched six months
              earlier. Always check the inception date alongside the return
              number.
            </p>
            <p>
              The more reliable comparison metric is{" "}
              <strong>alpha versus benchmark</strong> during the same window.
              Every SIF on SIFPrime is mapped to its SEBI-disclosed benchmark
              (Nifty 500 TRI for Equity L-S, Nifty 50 Hybrid Composite for
              Hybrid L-S, Nifty Midsmallcap 400 for Ex-Top 100). During the
              March 2026 crash, the spread between best and worst Hybrid L-S
              SIF was over 8 percentage points — so category averages hide the
              real quality gap between managers.
            </p>
            <p>
              For fund-by-fund drill-downs, see the{" "}
              <Link href="/sif-performance">SIF performance tracker</Link> or
              the{" "}
              <Link href="/all-sifs-india-ranked-explained">
                ranked list of all 19 SIFs
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetLd) }}
      />
    </div>
  );
}
