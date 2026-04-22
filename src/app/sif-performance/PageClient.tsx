"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  BarChart3,
  LineChart,
  Activity,
  Calendar,
  ExternalLink,
  Shield,
  Target,
} from "lucide-react";
import { CONSULTATION_URL } from "@/lib/whatsapp";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const monthlyReports = [
  {
    month: "March 2026",
    path: "/performance/march-2026",
    categories: [
      { name: "Equity Long Short", path: "/performance/march-2026/equity-long-short" },
      { name: "Hybrid Long Short", path: "/performance/march-2026" },
      { name: "Ex-Top 100", path: "/performance/march-2026/equity-ex-top-100" },
    ],
  },
  {
    month: "February 2026",
    path: "/performance/february-2026",
    categories: [
      { name: "Equity Long Short", path: "/performance/february-2026/equity-long-short" },
      { name: "Hybrid Long Short", path: "/performance/february-2026/hybrid-long-short" },
      { name: "Ex-Top 100", path: "/performance/february-2026/equity-ex-top-100" },
    ],
  },
  {
    month: "January 2026",
    path: null,
    categories: [
      { name: "Hybrid Long Short", path: "/performance/hybrid-long-short" },
      { name: "Equity Long Short", path: "/performance/equity-long-short" },
    ],
  },
];

const SifPerformance = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                Performance Data
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-2">
                Track SIF Performance Across All Categories
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                Stay updated with monthly performance reports, live NAV data, and returns analysis for every Specialized Investment Fund in India. Our performance tracker covers all 17 SIFs across Equity Long Short, Hybrid Long Short, Ex-Top 100, and Active Asset Allocator categories.
              </p>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2">
                  Get Monthly Reports <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Monthly Performance Reports */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              Monthly Performance Reports
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              SIFPrime publishes detailed monthly performance reports for every SIF category. Each report includes NAV changes, returns since inception, benchmark comparisons, and category-level analysis. Click on any month or category to view the full report.
            </p>
            <div className="max-w-4xl mx-auto space-y-6">
              {monthlyReports.map((report) => (
                <div key={report.month} className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">{report.month}</h3>
                    {report.path && (
                      <a href={report.path} className="ml-auto text-sm text-primary hover:underline flex items-center gap-1">
                        Full Report <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {report.categories.map((cat) => (
                      <a
                        key={cat.path}
                        href={cat.path}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-colors"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        {cat.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How SIF Performance is Measured */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              How SIF Performance Is Measured
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              Understanding how SIF returns are calculated and reported is essential for making informed investment decisions. Unlike PMS which reports portfolio-level returns, SIFs use a standardised NAV-based system similar to mutual funds.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">NAV-Based Returns</h3>
                <p className="text-muted-foreground">
                  Every SIF declares a daily Net Asset Value (NAV) which reflects the per-unit value of the fund after accounting for all expenses, gains, and losses. Returns are calculated as the percentage change in NAV over a given period. This is the same methodology used by mutual funds, making it easy for investors to compare SIF performance against their existing MF portfolio. NAV is published daily on AMC websites and aggregated on platforms like SIFPrime.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Since-Inception Returns</h3>
                <p className="text-muted-foreground">
                  Given that most SIFs launched in early to mid 2025, the primary performance metric currently available is since-inception return. This measures the total return from the fund&apos;s launch date to the present. As SIFs mature, additional metrics like 1-year, 3-year, and 5-year returns will become available. SIFPrime tracks since-inception returns for all 14 live SIFs and updates them monthly in our performance reports.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Benchmark Comparison</h3>
                <p className="text-muted-foreground">
                  Each SIF has a designated benchmark index against which its performance is measured. Equity Long Short SIFs typically benchmark against Nifty 50 or Nifty 500, while Hybrid SIFs may use a composite benchmark. The alpha generated over the benchmark is a critical measure of the fund manager&apos;s skill. Our reports include benchmark returns alongside SIF returns so you can evaluate whether the fund is delivering on its mandate.
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">Risk-Adjusted Returns</h3>
                <p className="text-muted-foreground">
                  Raw returns only tell half the story. SIFs with long-short strategies are designed to deliver better risk-adjusted returns than traditional long-only funds. Metrics like the Sharpe ratio, which measures return per unit of risk, and maximum drawdown, which shows the largest peak-to-trough decline, are essential for evaluating whether a SIF is truly adding value through its hedging and shorting capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics to Track */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              Key Metrics Every SIF Investor Should Track
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              Beyond simple returns, monitoring these four key metrics will give you a complete picture of your SIF investment&apos;s health and the fund manager&apos;s effectiveness.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 mx-auto">
                  <LineChart className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">NAV</h3>
                <p className="text-muted-foreground text-sm">
                  The Net Asset Value is the foundation of SIF performance tracking. Monitor daily NAV movements to understand how your fund reacts to market events. A steadily rising NAV with controlled drawdowns indicates effective fund management. Track live NAV for all SIFs on our dedicated NAV page.
                </p>
                <a href="/sifnav" className="inline-block mt-3 text-sm text-primary hover:underline">
                  View Live NAV Data &rarr;
                </a>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">AUM</h3>
                <p className="text-muted-foreground text-sm">
                  Assets Under Management reflects investor confidence and fund scale. Growing AUM indicates that both new investments are flowing in and existing investments are appreciating. Very large AUM can sometimes constrain fund manager flexibility, while very small AUM may indicate lack of market interest. Track AUM trends monthly.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4 mx-auto">
                  <Activity className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Drawdown</h3>
                <p className="text-muted-foreground text-sm">
                  Maximum drawdown measures the largest decline from peak to trough. For SIFs with long-short strategies, drawdown control is a key differentiator. A lower maximum drawdown compared to the benchmark indicates that the fund&apos;s hedging strategies are working effectively. This is especially important during volatile market conditions.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Sharpe Ratio</h3>
                <p className="text-muted-foreground text-sm">
                  The Sharpe ratio measures excess return per unit of risk. A higher Sharpe ratio means the fund is generating better returns for each unit of volatility taken. For SIFs, a Sharpe ratio above 1.0 is considered good. This metric becomes more meaningful as SIFs build a longer track record over the coming quarters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-8 sm:mb-12">
              Quick Links to SIF Data
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <a href="/sifnav" className="glass-card p-6 text-center hover:border-primary/30 transition-colors group">
                <LineChart className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-foreground mb-1">Live SIF NAV</h3>
                <p className="text-sm text-muted-foreground">Daily NAV updates for all 14 live SIFs</p>
              </a>
              <a href="/sifreturns" className="glass-card p-6 text-center hover:border-primary/30 transition-colors group">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-foreground mb-1">SIF Returns</h3>
                <p className="text-sm text-muted-foreground">Since-inception and periodic returns data</p>
              </a>
              <a href="/compare-sifs" className="glass-card p-6 text-center hover:border-primary/30 transition-colors group">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-foreground mb-1">Compare SIFs</h3>
                <p className="text-sm text-muted-foreground">Side-by-side comparison of all SIFs</p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Get Monthly SIF Performance Reports
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Stay ahead with our detailed monthly performance reports delivered directly to you. Our analysts break down returns, drawdowns, and portfolio changes for every SIF so you can make data-driven investment decisions.
            </p>
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="gap-2">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifPerformance;
