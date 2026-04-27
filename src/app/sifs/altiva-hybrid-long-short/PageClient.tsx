"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle, ExternalLink } from "lucide-react";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChartLazy";
import { getSifBySlug, getPeers, fmtPct } from "@/lib/sifData";

// Map sifData slug -> live page URL
const PEER_HREF: Record<string, string> = {
  "altiva-hybrid-long-short": "/sifs/altiva-hybrid-long-short",
  "magnum-hybrid-long-short": "/sifs/magnum-hybrid-long-short",
  "qsif-hybrid-long-short": "/sifs/qsif-hybrid-long-short",
  "titanium-hybrid-long-short": "/sifs/titanium-hybrid-long-short",
  "arudha-hybrid-long-short": "/sifs/arudha-hybrid-long-short",
  "isif-hybrid-long-short": "/sifs/isif/hybrid",
  "apex-hybrid-long-short": "/sifs/apex-hybrid-long-short",
};

const FUND = getSifBySlug("altiva-hybrid-long-short")!;
const PEER_FUNDS = getPeers("altiva-hybrid-long-short");

const AMC_URL = "https://www.edelweissmf.com/altivasif";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
/* ------------------------------------------------------------------ */
/*  Static data for Altiva                                             */
/* ------------------------------------------------------------------ */

const TAGS = ["Hybrid Long-Short", "Arbitrage", "Special Situations", "Low Volatility", "Interval Strategy", "Low Risk"];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";
const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Apr 8, 2026", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "6M Return", value: "+0.91%", sub: "", color: "text-green-600" },
];

const INFO_BAR = [
  { label: "AUM", value: "₹2,784 Cr" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "24 Oct 2025" },
  { label: "Redemption", value: "Mon & Wed" },
  { label: "SIP", value: "₹1,000+" },
  { label: "Exit Load", value: "0.50% <90d" },
];

const TRAILING = [
  { period: "1D", value: "+0.04%" },
  { period: "1W", value: "+0.93%" },
  { period: "1M", value: "+1.23%" },
  { period: "3M", value: "+0.91%" },
  { period: "6M", value: "+0.91%" },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "FYTD", value: "+2.86%" },
];

const ALLOCATION_TAGS = [
  "Equity 25–75%", "Debt 25–75%", "Short derivatives 0–25%", "Overseas 0–30%", "REITs/InvITs 0–20%", "Securitized debt ≤25%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Edelweiss AMC" },
  { label: "Category", value: "Hybrid Long-Short" },
  { label: "Type", value: "Interval" },
  { label: "Inception date", value: "24 Oct 2025" },
  { label: "AUM", value: "₹2,784 Cr" },
  { label: "Benchmark", value: "Nifty 50 Hybrid 50:50" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.00%" },
  { label: "Exit load", value: "0.50% <90d" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Mon & Wed" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP / STP / SWP", value: "₹1,000+" },
  { label: "Min additional", value: "₹1,000" },
  { label: "Listing", value: "NSE (demat)" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 3 · Moderate", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Level 2" },
  { label: "Short selling", value: "Derivatives only" },
  { label: "Lock-in period", value: "None" },
  { label: "Segregated portfolio", value: "Allowed" },
];

const PEERS = PEER_FUNDS
  .slice()
  .sort((a, b) => b.returns.sinceInception - a.returns.sinceInception)
  .slice(0, 4)
  .map(f => ({
    name: f.shortName + " " + f.category.replace("Long Short", "").trim(),
    amc: f.amc,
    ret: fmtPct(f.returns.sinceInception, 1),
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
  }));

const TEAM = [
  { name: "Bhavesh Jain", initials: "BJ", role: "Equity Fund Manager", sleeve: "Equity" },
  { name: "Bharat Lahoti", initials: "BL", role: "Equity Fund Manager", sleeve: "Equity" },
  { name: "Dhawal Dalal", initials: "DD", role: "CIO — Fixed Income", sleeve: "Debt" },
  { name: "Pranavi Kulkarni", initials: "PK", role: "Fund Manager & Credit Analyst", sleeve: "Debt" },
  { name: "Amit Vora", initials: "AV", role: "Head of Dealing & Fund Manager", sleeve: "Overseas" },
];

const SUITABLE = [
  "Income-oriented investors with ≥₹10L surplus",
  "Replacement for FD/arbitrage allocation",
  "Post-tax return seekers (LTCG 12.5% after 24M)",
  "3+ year investment horizon with low-vol preference",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Investors needing daily liquidity",
  "Below ₹10L investable surplus",
  "Short-term traders / sharp-bull chasers",
];

const PILLARS = [
  { title: "Core — Arbitrage", desc: "Cash-futures arbitrage & covered calls capturing low-risk spreads (40–60% allocation)", color: "blue" },
  { title: "Core — Fixed Income", desc: "High-quality debt (AAA CPSE, BFSI 3–5Y) for accrual & price appreciation (20–40%)", color: "indigo" },
  { title: "Enhancer — Special Situations", desc: "IPO, Open Offer, Buyback, QIP, Merger/Demerger, Index Inclusion/Exclusion (0–10%)", color: "amber" },
  { title: "Enhancer — Derivative Strategies", desc: "Short straddles, strangles, pair trades, long-short equities (10–20%)", color: "emerald" },
  { title: "Risk — Strategy Level", desc: "5% stop-loss at strategy, delta hedging, 20+ stocks, single-stock caps (LC <3%, MC <2%)", color: "rose" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity & equity-related instruments", min: "25%", max: "75%" },
  { t: "Debt and money market instruments", min: "25%", max: "75%" },
  { t: "Short exposure via unhedged derivatives", min: "0%", max: "25%" },
  { t: "Units issued by REITs and InvITs", min: "0%", max: "20%" },
  { t: "Overseas securities", min: "0%", max: "30%" },
  { t: "Securitized debt (excl. foreign)", min: "0%", max: "25% of debt" },
];

const STRATEGY_MIX = [
  { name: "Fixed Income (Core + Liquid Debt)", range: "40–60%", width: "55%", color: "bg-indigo-500" },
  { name: "Arbitrage (Cash-Future + Covered Call)", range: "20–40%", width: "35%", color: "bg-blue-500" },
  { name: "Derivative Strategies (Straddle / Strangle / Pair)", range: "10–20%", width: "18%", color: "bg-emerald-500" },
  { name: "Special Situations (IPO/OO/Buyback/QIP)", range: "0–10%", width: "8%", color: "bg-amber-500" },
];

const SPECIAL_SITS = [
  { t: "Anchor / Main-book IPO", window: "5–30 days", note: "Main-board only, min size ₹1,000 Cr" },
  { t: "Open Offer", window: "4–8 months", note: "F&O stocks ≤10%, non-F&O ≤5%" },
  { t: "Buyback", window: "4–6 months", note: "Tender route post-board approval" },
  { t: "QIP / Block / Anchor", window: "5–30 days", note: "Discounted institutional placements" },
  { t: "Merger / Demerger", window: "9–12 months", note: "Spread capture" },
  { t: "Index Inclusion / Exclusion", window: "6–9 months", note: "Rebalance-driven flows" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Bhavesh Jain",
    initials: "BJ",
    role: "Equity Fund Manager · Co-Head Factor Investing",
    exp: "16+ yrs",
    bio: "Joined Edelweiss in the Low Risk Trading team. Now manages several funds forming part of the firm's Risk-Adjusted Return strategies and ETFs. Specialist in arbitrage and factor-based quant strategies.",
    color: "blue",
  },
  {
    name: "Bharat Lahoti",
    initials: "BL",
    role: "Equity Fund Manager · Co-Head Factor Investing",
    exp: "18+ yrs",
    bio: "Experience in portfolio management, macro and sector research. Previously with marquee investment banks, asset managers and a global hedge fund as senior manager working on fundamental and quantitative research.",
    color: "blue",
  },
  {
    name: "Dhawal Dalal",
    initials: "DD",
    role: "Chief Investment Officer — Fixed Income",
    exp: "28+ yrs",
    bio: "Heads fixed income at Edelweiss AMC. Responsible for overall growth of fixed-income assets across retail and institutional clients. MBA from University of Dallas (USA). Previously with DSP Investment Managers.",
    color: "indigo",
  },
  {
    name: "Pranavi Kulkarni",
    initials: "PK",
    role: "Fund Manager & Credit Analyst",
    exp: "Fixed Income",
    bio: "Credit research and fund management across Edelweiss's debt portfolios. Focus on corporate bond selection, credit-quality monitoring and interest-rate positioning.",
    color: "indigo",
  },
  {
    name: "Amit Vora",
    initials: "AV",
    role: "Head of Dealing & Fund Manager — Overseas",
    exp: "Dealing Desk",
    bio: "Leads the dealing desk and manages overseas allocations. Execution of arbitrage, derivative legs, special-situation trades and overseas security exposures.",
    color: "emerald",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Market Risk", d: "Equity and debt prices fluctuate with macro, liquidity and sentiment. Arbitrage-heavy core dampens but does not eliminate this." },
  { t: "Derivatives Risk", d: "Options/futures are leveraged — small moves can amplify gains or losses. Used for covered calls, straddles, strangles and hedging up to 25% unhedged short." },
  { t: "Short-Selling Risk", d: "Shorts via derivatives can face unlimited theoretical loss if the underlying rises sharply. Strategy-level stop-loss of 5% mitigates." },
  { t: "Interest-Rate Risk", d: "Fixed-income sleeve of ~35–40% is sensitive to yield curve shifts. Managed via short-duration bias (≤5Y) and liquid debt bucket." },
  { t: "Credit & Default Risk", d: "Debt sleeve focuses on AAA CPSE and high-grade BFSI (~20%) and non-BFSI (~10%) up to 5Y. Credit migration or spread widening can impact NAV." },
  { t: "Liquidity & Interval Risk", d: "Redemption only Mondays & Wednesdays, T+3 settlement. Not a daily-liquid product — investors must plan for the interval structure." },
  { t: "Concentration Risk", d: "Single-stock caps: large cap <3%, mid cap <2%. Sector limits: <10% for non-Nifty50 stocks, ±7.5% vs Nifty50 weights." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives and CCIL-settled repos mitigate. DVP settlement and rated counterparties for OTC exposures." },
  { t: "Special-Situation Risk", d: "IPO allotment uncertainty, open-offer acceptance ratios, buyback tender acceptance — outcomes not guaranteed even if thesis is sound." },
  { t: "Model & Execution Risk", d: "Quant-driven covered call and straddle sizing depends on volatility regime. Expiry concentration and delta slippage are actively managed." },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function DetailRow({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex justify-between py-2.5 border-b border-gray-50 last:border-b-0 gap-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold text-right ${color || "text-gray-900"}`}>{value}</span>
    </div>
  );
}

const TABS = ["Snapshot", "Portfolio", "Fund Managers", "Risk & Scores", "Documents"] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const AltivaSif = () => {
  const fundData = getSifBySlug("altiva-hybrid-long-short");
  const [activeTab, setActiveTab] = useState<string>("Snapshot");
  const [returnMode, setReturnMode] = useState<"absolute" | "annualised">("absolute");

  return (
    <div className="min-h-screen bg-gray-50">
      <NfoBannerTop />
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>

      <main className="pt-[104px] lg:pt-[120px] pb-20">
        {/* HERO */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
            <nav className="text-xs text-gray-400 mb-4">
              <a href="/" className="hover:text-gray-600">SIF Universe</a>
              <span className="mx-1.5">›</span>
              <a href="/sif-funds-launched" className="hover:text-gray-600">Hybrid Long-Short</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">Altiva</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm text-gray-500">Edelweiss Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Altiva Hybrid Long-Short Fund
                </h1>
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:text-gray-900">+ Compare</Button>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:text-gray-900">Track Fund</Button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Investing <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS BAR */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              {METRICS.map((m, i) => (
                <div
                  key={i}
                  className={`py-4 px-3 sm:px-4 text-center ${i < METRICS.length - 1 ? "border-r border-gray-100" : ""}`}
                >
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
                  <p className={`text-lg sm:text-xl font-bold ${m.color || "text-gray-900"}`}>{m.value}</p>
                  {m.sub && <p className="text-[11px] text-gray-400 mt-0.5">{m.sub}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INFO BAR */}
        <section className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between py-3 gap-x-6 gap-y-2">
              {INFO_BAR.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-400">{item.label}:</span>
                  <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TAB NAV */}
        <section className="bg-white border-b border-gray-100 sticky top-[104px] lg:top-[112px] z-30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-0 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors relative ${
                    activeTab === tab ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SNAPSHOT TAB                                                 */}
        {/* ============================================================ */}
        {activeTab === "Snapshot" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1 min-w-0 space-y-6">

                {/* NAV CHART */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-2xl font-bold text-gray-900">₹{FUND.currentNav.toFixed(4)}</span>
                    <span className={`text-sm font-semibold ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
                  </div>
                  <div className="h-[280px] mt-4">
                    {fundData && (
                      <NavJourneyChart funds={[fundData]} showBenchmark={false} height={280} />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">Live NAV data · Source: AMFI NAV API</p>
                </div>

                {/* TRAILING RETURNS */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-bold text-gray-900">Trailing returns</h3>
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                      {(["absolute", "annualised"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setReturnMode(mode)}
                          className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                            returnMode === mode ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {TRAILING.slice(0, 4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className="text-base font-bold text-green-600">{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TRAILING.slice(4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className="text-base font-bold text-green-600">{t.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Generate capital appreciation through equity and equity-related instruments and income through{" "}
                    <b>arbitrage, derivative strategies, special situations and fixed income investments</b>.
                    An income-oriented, all-weather solution with arbitrage + fixed income as the core, enhanced
                    by selective special-situation and derivative opportunities. Benchmarked to{" "}
                    <b>Nifty 50 Hybrid Composite Debt 50:50 TRI</b>.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Altiva is India&apos;s first hybrid long-short SIF. Combines equity arbitrage (cash-future
                    + covered calls), high-quality fixed income, and special-situation plays (IPOs, buybacks,
                    open offers, QIPs, mergers) with derivative strategies (short straddles/strangles, pair
                    trades). The arbitrage-heavy interval structure keeps realised volatility low while
                    targeting superior post-tax returns versus FDs and arbitrage funds.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Taxation: <b>12.5% LTCG</b> after 24 months on the non-equity sleeve, slab rate on debt
                    STCG — materially better than Cat III AIF (MMR 42.7%) at fund level.
                  </p>
                </div>

                {/* FIVE PILLARS */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy pillars</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PILLARS.map((p) => (
                      <div key={p.title} className="rounded-lg border border-gray-100 p-4">
                        <p className={`text-sm font-bold mb-1 text-${p.color}-700`}>{p.title}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* INVESTOR SUITABILITY */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Investor suitability</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-lg bg-green-50 border border-green-100 p-4">
                      <p className="text-sm font-bold text-green-800 mb-3">Suitable for</p>
                      <ul className="space-y-2">
                        {SUITABLE.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-green-700">
                            <span className="mt-0.5">✓</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg bg-red-50 border border-red-100 p-4">
                      <p className="text-sm font-bold text-red-800 mb-3">Not suitable for</p>
                      <ul className="space-y-2">
                        {NOT_SUITABLE.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-red-700">
                            <span className="mt-0.5">✗</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* FUND MANAGEMENT TEAM MINI-GRID */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management team</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Altiva</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist. No commitment.</p>
                  <div className="flex gap-2">
                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                        <Phone className="w-3.5 h-3.5 mr-1.5" /> Schedule call
                      </Button>
                    </a>
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50 text-sm">
                        <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>

                <SidebarCard title="Fund details">
                  {FUND_DETAILS.map((d) => <DetailRow key={d.label} label={d.label} value={d.value} />)}
                </SidebarCard>

                <SidebarCard title="Redemption & Liquidity">
                  {REDEMPTION.map((d) => <DetailRow key={d.label} label={d.label} value={d.value} />)}
                </SidebarCard>

                <SidebarCard title="Risk & compliance">
                  {RISK.map((d) => <DetailRow key={d.label} label={d.label} value={d.value} color={d.color} />)}
                </SidebarCard>

                <SidebarCard title="Other funds in category">
                  <div className="grid grid-cols-2 gap-2">
                    {PEERS.map((p) => (
                      <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className="text-sm font-bold text-green-600 mt-1">{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
                      </a>
                    ))}
                  </div>
                </SidebarCard>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PORTFOLIO TAB                                                */}
        {/* ============================================================ */}
        {activeTab === "Portfolio" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            {/* Portfolio construction approach */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Altiva is built as a <b>core + enhancer</b> architecture. The core (~60–90%) combines
                cash-future arbitrage, covered calls and high-quality fixed income for stable, bond-like
                returns. The enhancer sleeve (~10–30%) adds special-situation participation (IPO, open
                offer, buyback, QIP, merger/demerger, index inclusion/exclusion) and directional-neutral
                derivative strategies (short straddles, strangles, pair trades) for return pickup.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-xs text-blue-700 mb-1">Arbitrage core</p>
                  <p className="text-lg font-bold text-blue-700">20–40%</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Fixed income</p>
                  <p className="text-lg font-bold text-indigo-700">40–60%</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-xs text-emerald-700 mb-1">Derivatives</p>
                  <p className="text-lg font-bold text-emerald-700">10–20%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">Special sits.</p>
                  <p className="text-lg font-bold text-amber-700">0–10%</p>
                </div>
              </div>
            </div>

            {/* Strategy mix — horizontal bars */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Indicative strategy mix</h3>
              <div className="space-y-4">
                {STRATEGY_MIX.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{s.name}</span>
                      <span className="text-gray-500">{s.range}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${s.color} h-full rounded-full`} style={{ width: s.width }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: Altiva fund presentation — Edelweiss AMC (Sep 2025). Weights are indicative;
                actual allocation varies with market regime.
              </p>
            </div>

            {/* Asset allocation (SEBI-filed) */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Asset allocation (% of total assets)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Instrument</th>
                      <th className="py-3 px-4 font-semibold text-right">Min</th>
                      <th className="py-3 pl-4 font-semibold text-right">Max</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {ASSET_ALLOC.map((r) => (
                      <tr key={r.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4">{r.t}</td>
                        <td className="py-3 px-4 text-right font-semibold">{r.min}</td>
                        <td className="py-3 pl-4 text-right font-semibold">{r.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Cumulative gross exposure capped at 100% of net assets. Options premium paid ≤20%.
                Scheme will not invest in overseas derivatives.
              </p>
            </div>

            {/* Debt sleeve breakdown */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Fixed-income sleeve construction</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-4">
                  <p className="text-sm font-bold text-indigo-700 mb-2">Core Debt (25–35%)</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• ~20% BFSI, up to 5Y maturity</li>
                    <li>• ~10% non-BFSI, up to 5Y</li>
                    <li>• High-quality AAA CPSE anchor</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Liquid Debt (15–25%)</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Broader maturity, up to 5Y</li>
                    <li>• Liquidity management + price appreciation</li>
                    <li>• Supports redemption cycles (Mon/Wed)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Special situations execution windows */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Special-situation &amp; derivative execution windows</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Strategy</th>
                      <th className="py-3 px-4 font-semibold">Typical window</th>
                      <th className="py-3 pl-4 font-semibold">Limits / notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {SPECIAL_SITS.map((s) => (
                      <tr key={s.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{s.t}</td>
                        <td className="py-3 px-4 text-gray-500">{s.window}</td>
                        <td className="py-3 pl-4 text-gray-500 text-xs">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Contribution from special situations over the last 3 years across Edelweiss hybrid funds: <b>2.3% – 3.5% per year</b> (internal).
              </p>
            </div>

            {/* Derivative exposure summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivative exposure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Unhedged short via derivatives: <b>up to 25%</b> of net assets</li>
                  <li>• Options premium paid: <b>≤20%</b> of net assets</li>
                  <li>• Covered call writing on equity longs</li>
                  <li>• Short straddles / strangles in range-bound regimes</li>
                  <li>• Pair trades on correlated large-cap pairs</li>
                  <li>• Strategy-level <b>5% stop-loss</b> with delta hedging</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Concentration limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Large-cap single stock: <b>&lt;3%</b></li>
                  <li>• Mid-cap single stock: <b>&lt;2%</b></li>
                  <li>• Minimum holdings: <b>20+ stocks</b></li>
                  <li>• Non-Nifty50 sector: <b>&lt;10%</b></li>
                  <li>• Nifty50 sector deviation: <b>±7.5%</b></li>
                  <li>• IPO: main-board only, min issue size ₹1,000 Cr</li>
                </ul>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> SIFs do not publish monthly top-10 holdings in the same
                format as regular mutual funds. The Altiva fund presentation and SID disclose
                strategy-level allocation ranges; position-level holdings are reported to the AMC
                and regulator but are not publicly disseminated on a monthly basis.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* FUND MANAGERS TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "Fund Managers" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Management structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Altiva is jointly managed across three sleeves — <b>equity arbitrage &amp; derivatives</b>,{" "}
                <b>fixed income</b>, and <b>overseas dealing</b>. The team leverages Edelweiss AMC&apos;s
                institutional platforms in arbitrage (Edelweiss Arbitrage Fund, AUM ₹13,885 Cr) and
                fixed income.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">EQUITY</p>
                  <p className="text-xs text-gray-600 mt-1">Jain · Lahoti</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">DEBT</p>
                  <p className="text-xs text-gray-600 mt-1">Dalal · Kulkarni</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700 font-semibold">OVERSEAS</p>
                  <p className="text-xs text-gray-600 mt-1">Vora</p>
                </div>
              </div>
            </div>

            {MANAGERS.map((m) => (
              <div key={m.name} className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className={`w-20 h-20 rounded-full bg-${m.color}-100 text-${m.color}-700 font-bold text-2xl flex items-center justify-center shrink-0`}>
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{m.role}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-full bg-${m.color}-50 text-xs font-medium text-${m.color}-700 border border-${m.color}-100`}>
                        {m.exp}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                        Edelweiss AMC
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Supporting team</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {[
                  { n: "Manasi Jalgaonkar", r: "Research Analyst" },
                  { n: "Mayan Pahwa", r: "Research Analyst" },
                  { n: "Dishant Garg", r: "Quant Analyst" },
                  { n: "Pranav Gupta", r: "Equity Dealer" },
                  { n: "Pratik Jaware", r: "Equity Dealer" },
                  { n: "Rahul Dedhia", r: "Fund Manager — Debt" },
                  { n: "Hetul Raval", r: "Dealer & Fund Manager" },
                  { n: "Riya Shah", r: "Assistant Manager" },
                ].map((s) => (
                  <div key={s.n} className="rounded-lg border border-gray-100 p-3">
                    <p className="font-semibold text-gray-900">{s.n}</p>
                    <p className="text-xs text-gray-500">{s.r}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                CEO: Radhika Gupta (MD &amp; CEO, Edelweiss Mutual Fund). Sponsor: Edelweiss Financial Services Ltd.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* RISK & SCORES TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "Risk & Scores" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">AMFI Risk Band</h3>
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Level 3 · Moderate
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band Level 3 (on a 1–5 scale) indicates <b>moderate</b> risk. The benchmark
                (Nifty 50 Hybrid Composite Debt 50:50 TRI) carries a Level 2 risk band. The fund
                labelling was assigned during NFO based on internal assessment; it may be revised
                post-launch as actual portfolio characteristics evolve.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Strategy-specific risks</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {STRATEGY_RISKS.map((r) => (
                  <div key={r.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-red-700 mb-1">{r.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Risk mitigation framework</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Structural</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI-mandated cumulative gross exposure cap (100% NAV), unhedged short cap (25%),
                    options premium cap (20%). Single-stock and sector limits enforced pre-trade.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Strategy-level 5% stop-loss, delta hedging for derivative legs, IPO main-board
                    filter (min ₹1,000 Cr), granular pair-trade sizing (sector/theme neutral).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily exposure, factor, liquidity and volatility monitoring. Arbitrage spreads
                    tracked to capture opportunistic rolls. Liquidity-risk management tools per SEBI.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent Trustee (Edelweiss Trusteeship), AMC Board Risk Committee, SEBI
                    periodic disclosures, and RTA/KFin settlement reconciliation.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Comparison vs Cat III AIF (Long-Short)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">Altiva SIF</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Std deviation</td><td className="py-3 px-4 font-semibold text-green-600">Low</td><td className="py-3 pl-4">Very high</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7%</td></tr>
                    <tr><td className="py-3 pr-4">Investor-level LTCG</td><td className="py-3 px-4 font-semibold text-green-600">12.5%</td><td className="py-3 pl-4">Slab / business income</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* DOCUMENTS TAB                                                */}
        {/* ============================================================ */}
        {activeTab === "Documents" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Official documents</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                All documents are hosted on Edelweiss AMC&apos;s Altiva SIF portal.
                The ISID is dated <b>18 September 2025</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Altiva fund presentation", d: "Strategy playbook & back-tested performance" },
                  { t: "Monthly factsheet", d: "Portfolio snapshot, TER, performance" },
                  { t: "Edelweiss AMC website", d: "edelweissmf.com/altivasif" },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-100 p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-700">{d.t}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.d}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Key dates &amp; operational timeline</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">ISID dated</td><td className="py-3 pl-4 font-semibold">18 September 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opened</td><td className="py-3 pl-4 font-semibold">01 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold">15 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold">24 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer reopened</td><td className="py-3 pl-4 font-semibold">On or before 31 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NSE listing</td><td className="py-3 pl-4 font-semibold">Listed (demat units)</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Redemption days</td><td className="py-3 pl-4 font-semibold">Every Monday &amp; Wednesday</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">TER slabs (SEBI Reg. 52)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">AUM slab</th>
                      <th className="py-3 px-4 text-right">Max TER</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">First ₹500 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.00%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹250 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.75%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹1,250 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.50%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹3,000 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.35%</td></tr>
                    <tr><td className="py-3 pr-4">Balance AUM</td><td className="py-3 pl-4 text-right font-semibold">1.25%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Current Regular plan TER: <b>{FUND.terRegular.toFixed(2)}%</b>. Direct plan TER is
                typically 40–70 bps lower (no distributor commission).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load <b>0.50%</b> if redeemed ≤90 days from allotment</li>
                  <li>• <b>Nil</b> exit load after 90 days</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Dispatch of redemption proceeds: within 3 working days</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Redemption rules</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Redeem/switch-out: every Monday &amp; Wednesday</li>
                  <li>• Next business day if Mon/Wed is a holiday</li>
                  <li>• Settlement: T+3 working days</li>
                  <li>• No minimum redemption amount</li>
                  <li>• Min balance post-withdrawal: ₹10L (₹1L for accredited)</li>
                  <li>• IDCW payment within 7 working days</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="altiva-hybrid-long-short" fundName="Altiva SIF by Edelweiss" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AltivaSif;
