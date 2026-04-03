"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, Calendar, ArrowRight, TrendingDown, TrendingUp, Minus, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";



interface MonthReport {
  month: string;
  year: number;
  slug: string;
  date: string;
  marketSentiment: "bullish" | "bearish" | "neutral";
  headline: string;
  highlights: string[];
  strategies: { name: string; href: string }[];
  isLatest?: boolean;
}

const reports: MonthReport[] = [
  {
    month: "March",
    year: 2026,
    slug: "/performance/march-2026",
    date: "30 Mar 2026",
    marketSentiment: "bearish",
    headline: "Broad market selloff hits SIFs — Hybrid funds show resilience while Equity strategies face steep drawdowns.",
    highlights: [
      "Arudha Hybrid +0.07% — only fund positive in March",
      "qSIF Equity -8.23% — worst monthly drop across SIF universe",
      "2 new fund launches: Apex Hybrid & Arudha Equity",
    ],
    strategies: [
      { name: "Hybrid Long Short", href: "/performance/march-2026" },
      { name: "Equity Long Short", href: "/performance/march-2026/equity-long-short" },
      { name: "Equity Ex-Top 100", href: "/performance/march-2026/equity-ex-top-100" },
    ],
    isLatest: true,
  },
  {
    month: "February",
    year: 2026,
    slug: "/performance/february-2026",
    date: "28 Feb 2026",
    marketSentiment: "neutral",
    headline: "Mixed month for SIFs — Titanium and Altiva lead Hybrid recoveries while Equity segment struggles.",
    highlights: [
      "Titanium Hybrid +1.70% — best monthly return",
      "Altiva since inception +3.79% — strongest track record",
      "iSIF Hybrid & Ex-Top 100 launched in Feb",
    ],
    strategies: [
      { name: "Hybrid Long Short", href: "/performance/february-2026/hybrid-long-short" },
      { name: "Equity Long Short", href: "/performance/february-2026/equity-long-short" },
      { name: "Equity Ex-Top 100", href: "/performance/february-2026/equity-ex-top-100" },
    ],
  },
  {
    month: "January",
    year: 2026,
    slug: "/performance/hybrid-long-short",
    date: "31 Jan 2026",
    marketSentiment: "bearish",
    headline: "SIF universe's first quarter-end — early performance divergence becomes visible across fund houses.",
    highlights: [
      "Altiva Hybrid leads with positive since-inception returns",
      "qSIF Hybrid underperforms peers in opening months",
      "Category still building track record",
    ],
    strategies: [
      { name: "Hybrid Long Short", href: "/performance/hybrid-long-short" },
      { name: "Equity Long Short", href: "/performance/equity-long-short" },
    ],
  },
];

const sentimentConfig = {
  bullish: { icon: TrendingUp, label: "Bullish", className: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-800/50" },
  bearish: { icon: TrendingDown, label: "Bearish", className: "text-red-600 bg-red-50 border-red-200 dark:text-red-400 dark:bg-red-950/40 dark:border-red-800/50" },
  neutral: { icon: Minus, label: "Mixed", className: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-800/50" },
};

const SifPerformanceHub = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0); // Latest expanded by default

  const toggleExpand = (idx: number) => {
    setExpandedIdx(prev => prev === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/40">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="container mx-auto px-4 py-10 lg:py-14 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary tracking-wide uppercase">Performance Archive</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                SIF Monthly Performance
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                In-depth monthly analysis of India's Specialized Investment Funds — returns, market context, and strategy breakdowns.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline with collapsible months */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-4">
                {reports.map((report, idx) => {
                  const Sentiment = sentimentConfig[report.marketSentiment];
                  const SentimentIcon = Sentiment.icon;
                  const isExpanded = expandedIdx === idx;

                  return (
                    <div key={idx} className="relative pl-12 md:pl-16">
                      {/* Timeline dot */}
                      <div className={`absolute left-2.5 md:left-4.5 top-4 w-3 h-3 rounded-full border-2 ${report.isLatest ? "bg-primary border-primary shadow-lg shadow-primary/30" : "bg-background border-muted-foreground/30"}`} />

                      <div className="rounded-xl border bg-card shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md hover:border-primary/20">
                        {/* Collapsible Header - always visible */}
                        <button
                          onClick={() => toggleExpand(idx)}
                          className="w-full flex items-center gap-3 p-4 md:p-5 text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-lg md:text-xl font-bold text-foreground">
                                {report.month} {report.year}
                              </h2>
                              {report.isLatest && (
                                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase tracking-wider">Latest</Badge>
                              )}
                              <Badge variant="outline" className={`text-[10px] ${Sentiment.className}`}>
                                <SentimentIcon className="w-3 h-3 mr-1" />
                                {Sentiment.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {report.date} • {report.strategies.length} strateg{report.strategies.length === 1 ? 'y' : 'ies'}
                            </p>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Expandable content */}
                        <div className={`transition-all duration-200 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 space-y-3">
                            {/* Headline */}
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {report.headline}
                            </p>

                            {/* Highlights */}
                            <ul className="space-y-1.5">
                              {report.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                                  <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                                  {h}
                                </li>
                              ))}
                            </ul>

                            {/* Strategy links */}
                            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                              <Link
                                href={report.slug}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-xs font-medium text-primary transition-colors"
                              >
                                View Full Report
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                              {report.strategies.map((s, i) => (
                                <Link
                                  key={i}
                                  href={s.href}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted/60 hover:bg-primary/10 text-xs font-medium text-foreground hover:text-primary transition-colors"
                                >
                                  {s.name}
                                  <ArrowRight className="w-3 h-3" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Returns scorecard CTA */}
            <div className="mt-10 rounded-xl border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground mb-3">Looking for a quick summary of all fund returns?</p>
              <Link
                href="/sifreturns"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                <BarChart3 className="w-4 h-4" />
                SIF Returns Scorecard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SifPerformanceHub;
