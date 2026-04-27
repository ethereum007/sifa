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

// Map sifData slug -> live page URL (peer routing)
const PEER_HREF: Record<string, string> = {
  "sapphire-equity-long-short": "/sifs/sapphire-equity-long-short",
  "dyna-equity-long-short": "/sifs/dyna-equity-long-short",
  "qsif-equity-long-short": "/sifs/qsif-equity-long-short",
  "arudha-equity-long-short": "/arudha-equity-long-short",
  "diviniti-equity-long-short": "/sifs/diviniti-equity-long-short",
  "dynasif-equity-long-short": "/dynasif-equity-long-short",
};

const FUND = getSifBySlug("diviniti-equity-long-short")!;
const PEER_FUNDS = getPeers("diviniti-equity-long-short");

const AMC_URL = "https://sif.itiamc.com/";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data for Diviniti (ITI MF)                                  */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Equity Long-Short",
  "Fundamentals-Driven",
  "Strategic + Tactical",
  "Asymmetric Returns",
  "Downside Management",
  "Moderate–High Risk",
];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Face value ₹1,000", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "vs face ₹1,000", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Min Investment", value: "₹10L", sub: "across strategies", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "ITI Mutual Fund" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Benchmark", value: "Nifty 50 TRI" },
  { label: "Inception", value: "03 Dec 2025" },
  { label: "Face Value", value: "₹1,000 / unit" },
  { label: "Exit Load", value: "0.50% <6M" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "Mar 2026 Crash", value: fmtPct(FUND.marchCrashData?.fundReturn ?? 0) },
];

const ALLOCATION_TAGS = [
  "Equity & equity-related 80–100%",
  "Debt & money market 0–20%",
  "Unhedged short (derivatives) 0–25%",
  "REITs / InvITs 0–20%",
  "Derivatives for hedging ≤100%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "ITI Mutual Fund" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception date", value: "03 Dec 2025" },
  { label: "Face value", value: "₹1,000 / unit" },
  { label: "Benchmark", value: "Nifty 50 TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "TER (Direct)", value: `${FUND.ter.toFixed(2)}%` },
  { label: "Scheme code", value: "DELS/O/E/ELSF/25/10/0001" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (Business day)" },
  { label: "Redemption", value: "Daily (Business day)" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP", value: "₹5,000+ (D/W/M)" },
  { label: "SWP", value: "₹10,000+ (M/Q)" },
  { label: "Min additional", value: "₹25,000" },
  { label: "Min redemption", value: "₹25,000" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 5 · High", color: "text-red-600" },
  { label: "Benchmark risk band", value: "Level 5" },
  { label: "Short selling", value: "Derivatives only (≤25%)" },
  { label: "Leverage", value: "None" },
  { label: "Lock-in period", value: "None" },
];

const PEERS = PEER_FUNDS
  .slice()
  .filter((f) => f.slug !== "diviniti-equity-long-short")
  .sort((a, b) => b.returns.sinceInception - a.returns.sinceInception)
  .slice(0, 4)
  .map((f) => ({
    name: f.shortName + " " + f.category.replace("Long Short", "").trim(),
    amc: f.amc,
    ret: fmtPct(f.returns.sinceInception, 1),
    retColor: f.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600",
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
  }));

const TEAM = [
  { name: "Vasav Sahgal", initials: "VS", role: "Fund Manager — Diviniti", sleeve: "Equity" },
  { name: "Rajesh Bhatia", initials: "RB", role: "CIO · Overseas Investments", sleeve: "Equity" },
  { name: "Laukik Bagwe", initials: "LB", role: "CIO — Fixed Income (SIF)", sleeve: "Debt" },
];

const SUITABLE = [
  "Investors seeking long-term equity appreciation with downside cushion",
  "HNIs with ≥₹10L surplus across SIF strategies",
  "5+ year horizon comfortable with equity volatility",
  "Preference for boutique, fundamentals-driven long-short",
];
const NOT_SUITABLE = [
  "Guaranteed / capital-protected return seekers",
  "Investors below ₹10L aggregate SIF investment",
  "Very short-term traders or momentum chasers",
  "Those needing intra-day or instant liquidity",
];

const PILLARS = [
  { title: "Strategic Core — Long", desc: "High-conviction long-term compounders; well-managed businesses at reasonable valuations (55% of AUM)", color: "red" },
  { title: "Tactical Longs", desc: "Opportunistic long positions via derivatives in bullish/neutral regimes (10–40% of AUM)", color: "amber" },
  { title: "Tactical Shorts", desc: "Selective shorts via derivatives on weakening cycles, sectors & governance trends (0–25% of AUM)", color: "rose" },
  { title: "Fixed Income / Cash", desc: "Liquidity & tactical asset positioning. REITs, InvITs, debt, cash equivalents (up to 45%)", color: "indigo" },
  { title: "Risk Framework", desc: "Stop-losses per exposure, drawdown limits, stress testing for macro, sector & concentration risk", color: "emerald" },
];

/* Portfolio tab data */

const ASSET_ALLOC = [
  { t: "Equity & equity-related (incl. unhedged shorts)", min: "80%", max: "100%" },
  { t: "Debt & money market instruments", min: "0%", max: "20%" },
  { t: "Units issued by REITs and InvITs", min: "0%", max: "20%" },
  { t: "Unhedged short exposure (derivatives, naked)", min: "0%", max: "25%" },
  { t: "Derivatives for hedging / rebalancing", min: "0%", max: "100%" },
  { t: "Securitized debt (excl. foreign)", min: "0%", max: "20% of debt" },
];

const STANCE_MATRIX = [
  { stance: "Bearish", stratL: "55%", hedge: "-55%", tacL: "0%", tacS: "-25%", fi: "20%", net: "-25%", gross: "80%" },
  { stance: "Neutral", stratL: "55%", hedge: "-20%", tacL: "+15%", tacS: "-20%", fi: "10%", net: "+30%", gross: "90%" },
  { stance: "Bullish", stratL: "55%", hedge: "-15%", tacL: "+25%", tacS: "-10%", fi: "10%", net: "+55%", gross: "90%" },
  { stance: "Strong Bull", stratL: "55%", hedge: "0%", tacL: "+40%", tacS: "0%", fi: "5%", net: "+95%", gross: "95%" },
];

const EXPOSURE_LIMITS = [
  { t: "Typical gross equity exposure", v: "80–95%" },
  { t: "Typical long equity exposure", v: "55–75%" },
  { t: "Typical short equity exposure", v: "10–25%" },
  { t: "Typical net exposure range", v: "25–65%" },
  { t: "Average net exposure", v: "40–60%" },
  { t: "Full net exposure range", v: "-25% to +100%" },
  { t: "Max single security (at cost)", v: "10%" },
  { t: "Typical single long position", v: "2–8%" },
  { t: "Typical single short position", v: "1–4%" },
];

/* Manager bios */

const MANAGERS = [
  {
    name: "Vasav N. Sahgal, CFA",
    initials: "VS",
    role: "Fund Manager — Diviniti Equity Long-Short",
    exp: "7+ yrs",
    bio: "CFA charterholder with a Postgraduate Diploma in Securities Law. Joined ITI in February 2025. Previously Fund Manager at Quant Money Managers from inception, and Equity Research Analyst at Quant Broking covering FMCG. Began as an Equity Research Intern at Eqestar Capital.",
    color: "red",
  },
  {
    name: "Rajesh Bhatia",
    initials: "RB",
    role: "Chief Investment Officer · Overseas Investments",
    exp: "30+ yrs",
    bio: "CIO of ITI Mutual Fund with 30+ years in Indian equities and 10+ years in alternative investments focused on long-short management. Previously CIO at Simto Investments (Tata Investments subsidiary). Co-founder & CIO at Heritage India Advisors — advisor to NY-based Heritage Capital long-short fund (Top 5 India Eurekahedge 2010). Earlier SVP & Head of PMS at Reliance Capital AMC, where he founded the PMS business in 2004. CFA charterholder.",
    color: "red",
  },
  {
    name: "Laukik Bagwe",
    initials: "LB",
    role: "Chief Investment Officer — Fixed Income (Diviniti SIF)",
    exp: "25+ yrs",
    bio: "25+ years in fund management, portfolio management and fixed-income markets with specialization in money markets, government securities and corporate bonds. Previously Vice President at DSP Asset Managers, and earlier Senior Dealer at Derivium Securities India. PGDBA (Finance & Marketing) from ICFAI Hyderabad; Senior Management Program (Leadership) from IIM Calcutta.",
    color: "indigo",
  },
  {
    name: "Jatinder Pal Singh",
    initials: "JS",
    role: "Chief Executive Officer — ITI Mutual Fund",
    exp: "25+ yrs",
    bio: "CEO with 25+ years in the mutual fund industry across marketing, sales and distribution leadership. Previously CMO at Mahindra Manulife Investment Management; earlier National Head — Sales & Distribution at Morgan Stanley Investment Management; VP & Regional Manager — Sales & Distribution at HSBC AMC (India). A.C.A., C.W.A. and B.Com (Hons).",
    color: "amber",
  },
];

/* Risk data */

const STRATEGY_RISKS = [
  { t: "Market Risk", d: "Diviniti is ≥80% equity. Despite tactical shorts, net exposure can range wide (-25% to +100%); broad equity drawdowns still impact NAV materially." },
  { t: "Derivatives Risk", d: "Futures/options legs are leveraged — small underlying moves amplify P&L. Derivatives used for hedging up to 100% of sleeve, and naked shorts up to 25% of NAV." },
  { t: "Short-Selling Risk", d: "Unhedged shorts via derivatives face unlimited theoretical loss if underlyings rally sharply. Sized ≤25% with stop-losses per exposure." },
  { t: "Concentration Risk", d: "Single-security cap 10% at cost. Typical long 2–8%, short 1–4%. Portfolio is high-conviction — diversification is lower than a broad index fund." },
  { t: "Tactical Timing Risk", d: "Stance shifts between bearish/neutral/bullish are discretionary. Mis-timed regime calls can compress returns versus a passive long-only benchmark." },
  { t: "Liquidity Risk", d: "Redemption is daily (business day) with T+3 settlement. Exit load of 0.50% applies within 6 months (beyond the 10% free-exit bucket)." },
  { t: "Credit & Counterparty Risk", d: "Up to 20% in debt/money-market. Securitized debt ≤20% of debt portfolio. Exchange-traded derivatives mitigate counterparty risk on equity legs." },
  { t: "Overseas & Currency Risk", d: "Strategy may invest up to US$50M in foreign securities and US$20M in overseas ETFs post-NFO window. INR depreciation/appreciation affects translated returns." },
  { t: "Model & Execution Risk", d: "Back-tested Sharpe of 1.70 does not guarantee live performance. Execution slippage, basis risk and expiry rolls are actively managed." },
  { t: "Regulatory Risk", d: "SIF framework is newly operational (SEBI circular Feb 2025). Future guideline changes on short limits, leverage or taxation could affect the strategy." },
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

const TABS = ["Snapshot", "Strategy", "Fund Managers", "Risk & Scores", "Documents"] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const DivinitiSif = () => {
  const fundData = getSifBySlug("diviniti-equity-long-short");
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
              <a href="/sif-funds-launched" className="hover:text-gray-600">Equity Long-Short</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">Diviniti</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-600" />
                    <span className="text-sm text-gray-500">ITI Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Diviniti Equity Long-Short Fund
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
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
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
                    activeTab === tab ? "text-red-700" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SNAPSHOT TAB ================= */}
        {activeTab === "Snapshot" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              <div className="flex-1 min-w-0 space-y-6">

                {/* NAV + face-value callout */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                    <span className="text-2xl font-bold text-gray-900">₹{FUND.currentNav.toFixed(4)}</span>
                    <span className={`text-sm font-semibold ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
                  </div>
                  <div className="mt-2 mb-3 inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-2.5 py-1">
                    <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider">Note</span>
                    <span className="text-xs text-red-800">
                      Diviniti uses a <b>face value of ₹1,000</b> per unit (not ₹10). NAV is shown as-is; since-inception compares NAV against ₹1,000.
                    </span>
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
                            returnMode === mode ? "bg-red-600 text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TRAILING.map((t) => {
                      const isNeg = t.value.trim().startsWith("-");
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold ${isNeg ? "text-red-600" : "text-green-600"}`}>{t.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">
                    Returns are absolute as published by AMFI. Annualisation requires full-year history; Diviniti is a newly-launched strategy (Dec 2025 inception).
                  </p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To generate <b>long-term capital appreciation</b> from a diversified portfolio that dynamically
                    invests in equity and equity-related securities, including limited short exposure via
                    derivative instruments of companies across market capitalisations. Benchmarked to{" "}
                    <b>Nifty 50 TRI</b>. The fund aims for an <b>asymmetric return profile</b> — participating in
                    market upturns while cushioning drawdowns via tactical shorts.
                  </p>
                </div>

                {/* STRATEGY SUMMARY */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy &amp; allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-red-50 text-xs font-medium text-red-700 border border-red-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Diviniti runs a <b>dual-portfolio</b> architecture: a Strategic Core of high-conviction long
                    compounders (~55% of AUM) paired with a Tactical Overlay of opportunistic longs (10–40%) and
                    selective shorts (0–25%) via derivatives. Fixed-income and cash equivalents (up to 45%)
                    provide liquidity and tactical positioning.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    ITI&apos;s back-tested model (Apr 2018 – Aug 2025) shows Sharpe of <b>1.70</b> vs 0.78 for Nifty,
                    with annualised standard deviation of 8.10% vs Nifty&apos;s 16.88%, and CAPM beta of 0.29.
                    Past back-test is illustrative, not indicative of live returns.
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

                {/* SUITABILITY */}
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

                {/* TEAM MINI */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management team</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className="w-11 h-11 rounded-full bg-red-100 text-red-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-red-700 hover:text-red-800">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Diviniti</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist. No commitment.</p>
                  <div className="flex gap-2">
                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm">
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

                <SidebarCard title="Other equity L/S funds">
                  <div className="grid grid-cols-2 gap-2">
                    {PEERS.map((p) => (
                      <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-red-200 hover:bg-red-50/30 transition-colors">
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className={`text-sm font-bold ${p.retColor} mt-1`}>{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
                      </a>
                    ))}
                  </div>
                </SidebarCard>
              </div>
            </div>
          </div>
        )}

        {/* ================= STRATEGY TAB ================= */}
        {activeTab === "Strategy" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Diviniti&apos;s portfolio is divided into four buckets — <b>Strategic Longs</b> (cash equities),
                <b> Tactical Longs</b> (derivatives), <b>Tactical Shorts</b> (derivatives), and <b>Fixed Income /
                Cash / REITs-InvITs</b>. Total exposure: 100% of NAV. Gross equity exposure stays in the 80–100% band
                across all market regimes; net exposure flexes between -25% and +100% based on the stance.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-red-50 p-4 text-center">
                  <p className="text-xs text-red-700 mb-1">Strategic Longs</p>
                  <p className="text-lg font-bold text-red-700">55%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">Tactical Longs</p>
                  <p className="text-lg font-bold text-amber-700">10–40%</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1">Tactical Shorts</p>
                  <p className="text-lg font-bold text-rose-700">0–25%</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">FI / Cash</p>
                  <p className="text-lg font-bold text-indigo-700">5–45%</p>
                </div>
              </div>
            </div>

            {/* STANCE MATRIX */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Sample portfolio by market stance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Stance</th>
                      <th className="py-3 px-3 text-right">Strategic Long</th>
                      <th className="py-3 px-3 text-right">Hedge</th>
                      <th className="py-3 px-3 text-right">Tactical Long</th>
                      <th className="py-3 px-3 text-right">Tactical Short</th>
                      <th className="py-3 px-3 text-right">FI / Cash</th>
                      <th className="py-3 px-3 text-right">Net</th>
                      <th className="py-3 pl-3 text-right">Gross</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {STANCE_MATRIX.map((s) => (
                      <tr key={s.stance} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-semibold">{s.stance}</td>
                        <td className="py-3 px-3 text-right">{s.stratL}</td>
                        <td className="py-3 px-3 text-right text-red-600">{s.hedge}</td>
                        <td className="py-3 px-3 text-right text-green-600">{s.tacL}</td>
                        <td className="py-3 px-3 text-right text-red-600">{s.tacS}</td>
                        <td className="py-3 px-3 text-right">{s.fi}</td>
                        <td className={`py-3 px-3 text-right font-semibold ${s.net.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{s.net}</td>
                        <td className="py-3 pl-3 text-right font-semibold">{s.gross}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Indicative only; portfolio managed per stated investment objective and SEBI-filed asset allocation.
              </p>
            </div>

            {/* ASSET ALLOCATION (SEBI filed) */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Asset allocation (% of net assets)</h3>
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
                Cumulative gross exposure capped at 100% of net assets. Overseas securities up to US$50M (NFO window).
              </p>
            </div>

            {/* EXPOSURE LIMITS */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Exposure &amp; position limits</h3>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-0">
                {EXPOSURE_LIMITS.map((r) => (
                  <DetailRow key={r.t} label={r.t} value={r.v} />
                ))}
              </div>
            </div>

            {/* BACK-TEST STATS */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Back-test risk statistics (Apr 2018 – Aug 2025)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Metric</th>
                      <th className="py-3 px-4 text-right">L/S Strategy Model</th>
                      <th className="py-3 pl-4 text-right">Nifty</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Sharpe Ratio</td><td className="py-3 px-4 text-right font-semibold text-green-600">1.70</td><td className="py-3 pl-4 text-right">0.78</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Annualised Std Dev</td><td className="py-3 px-4 text-right font-semibold text-green-600">8.10%</td><td className="py-3 pl-4 text-right">16.88%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">CAPM Beta</td><td className="py-3 px-4 text-right font-semibold">0.29</td><td className="py-3 pl-4 text-right">1.00</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Treynor Ratio</td><td className="py-3 px-4 text-right font-semibold text-green-600">47.52</td><td className="py-3 pl-4 text-right">13.13</td></tr>
                    <tr><td className="py-3 pr-4">Cumulative return</td><td className="py-3 px-4 text-right font-semibold text-green-600">+165.65%</td><td className="py-3 pl-4 text-right">+134.82%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Source: ITI AMC internal back-test. Back-tested / simulated — not indicative of Diviniti&apos;s live performance.
              </p>
            </div>

            {/* DISCLOSURE */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> SIFs do not publish monthly top-10 holdings in the same format as regular
                mutual funds. The Diviniti ISID and presentation disclose strategy-level allocation ranges and stance
                matrices; position-level holdings are reported to the AMC and regulator.
              </p>
            </div>
          </div>
        )}

        {/* ================= FUND MANAGERS TAB ================= */}
        {activeTab === "Fund Managers" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Management structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Diviniti is managed with a <b>two-tier structure</b> — Vasav Sahgal (Fund Manager) runs day-to-day
                equity selection, while CIO Rajesh Bhatia (30+ yrs equities, 10+ yrs long-short) oversees strategy
                and overseas allocations. Fixed-income sleeve is supervised by Laukik Bagwe (SIF CIO).
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-xs text-red-700 font-semibold">EQUITY</p>
                  <p className="text-xs text-gray-600 mt-1">Sahgal · Bhatia</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">DEBT</p>
                  <p className="text-xs text-gray-600 mt-1">Bagwe</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-xs text-amber-700 font-semibold">CEO</p>
                  <p className="text-xs text-gray-600 mt-1">J.P. Singh</p>
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
                        ITI Mutual Fund
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">ITI Group context</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                The Investment Trust of India Limited (ITIL) is a Mumbai-headquartered financial services
                conglomerate with businesses across asset management, institutional broking, investment banking
                and asset financing. Majority stake held by Mr. Sudhir Valia and associates — Mr. Valia is also
                co-promoter of Sun Pharmaceuticals.
              </p>
              <div className="grid sm:grid-cols-4 gap-3 text-center">
                <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">AUM</p><p className="text-sm font-bold text-gray-900">₹10,639 Cr</p></div>
                <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Schemes</p><p className="text-sm font-bold text-gray-900">19</p></div>
                <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">MFD Partners</p><p className="text-sm font-bold text-gray-900">29,815</p></div>
                <div className="rounded-lg bg-gray-50 p-3"><p className="text-xs text-gray-500">Branches</p><p className="text-sm font-bold text-gray-900">28</p></div>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Data as on 30 September 2025. Sponsor: ITI Mutual Fund. Trustee: ITI Mutual Fund Trustee Pvt. Ltd.
                Custodian: Deutsche Bank AG. RTA: KFin Technologies Ltd.
              </p>
            </div>
          </div>
        )}

        {/* ================= RISK & SCORES TAB ================= */}
        {activeTab === "Risk & Scores" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border-2 border-red-200 bg-red-50/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">AMFI Risk Band</h3>
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Level 5 · High Risk
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band Level 5 (on a 1–5 scale) indicates <b>high</b> risk. The benchmark (Nifty 50 TRI) also
                carries a Level 5 risk band. Labelling was assigned during NFO based on internal assessment of
                investment strategy characteristics; it may be revised post-NFO as the actual portfolio is built.
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
                    SEBI-mandated gross exposure cap (100% NAV), unhedged short cap (25%). No leverage.
                    Single-security cap 10% at cost. Max 5% to single securities-lending counterparty.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Stop-losses per exposure, overall portfolio drawdown limits. Beta-aware position sizing.
                    Tactical shorts executed through exchange-traded derivatives only.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Continuous stress testing for macro, sectoral and concentration risks. Liquidity, leverage
                    and capitalisation risks reviewed by CIO/Fund Manager.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent Trustee (ITI MF Trustee Pvt Ltd), AMC Investment Committee, SEBI disclosures,
                    KFin/Deutsche Bank settlement reconciliation.
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
                      <th className="py-3 px-4">Diviniti SIF</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min investment</td><td className="py-3 px-4 font-semibold text-green-600">₹10 Lakh</td><td className="py-3 pl-4">₹1 Crore</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7%</td></tr>
                    <tr><td className="py-3 pr-4">Investor-level LTCG (Equity)</td><td className="py-3 px-4 font-semibold text-green-600">12.5% after 12M</td><td className="py-3 pl-4">Slab / business income</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= DOCUMENTS TAB ================= */}
        {activeTab === "Documents" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Official documents</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                All documents are hosted on ITI AMC&apos;s Diviniti SIF portal. The KIM is dated{" "}
                <b>23 October 2025</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form (23 Oct 2025)" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Diviniti fund presentation", d: "Strategy playbook, stance matrix & back-test" },
                  { t: "Monthly factsheet", d: "Portfolio snapshot, TER, performance" },
                  { t: "ITI SIF portal", d: "sif.itiamc.com" },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-100 p-4 hover:border-red-200 hover:bg-red-50/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-red-700">{d.t}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.d}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600 shrink-0 mt-0.5" />
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">KIM dated</td><td className="py-3 pl-4 font-semibold">23 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opened</td><td className="py-3 pl-4 font-semibold">10 November 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold">24 November 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold">03 December 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer reopened</td><td className="py-3 pl-4 font-semibold">Within 5 business days of allotment</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Subscription / Redemption</td><td className="py-3 pl-4 font-semibold">Daily (Business day) · T+3 settlement</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Unit economics &amp; minimums</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">Face value &amp; pricing</p>
                  <ul className="text-sm text-gray-600 space-y-1.5">
                    <li>• Face value: <b>₹1,000 / unit</b> (higher than standard MF ₹10)</li>
                    <li>• NFO price: ₹1,000 per unit</li>
                    <li>• Current NAV: <b>₹{FUND.currentNav.toFixed(4)}</b></li>
                    <li>• Regular TER: <b>{FUND.terRegular.toFixed(2)}%</b> · Direct TER: <b>{FUND.ter.toFixed(2)}%</b></li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">Minimums (SEBI SIF rule)</p>
                  <ul className="text-sm text-gray-600 space-y-1.5">
                    <li>• Min initial: <b>₹10 Lakh</b> across all SIF strategies at PAN level</li>
                    <li>• Min additional: ₹25,000 (multiples of ₹1)</li>
                    <li>• Min redemption: ₹25,000 (subject to ₹10L PAN-level balance)</li>
                    <li>• SIP: ₹5,000+ · SWP: ₹10,000+</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• 10% of units redeemable without exit load in first 6 months</li>
                  <li>• <b>0.50%</b> exit load on excess redemption within 6 months</li>
                  <li>• <b>Nil</b> exit load after 6 months from allotment</li>
                  <li>• No entry load (SEBI rule)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Redemption rules</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Subscription / redemption: <b>every business day</b></li>
                  <li>• Settlement: <b>T+3 working days</b></li>
                  <li>• Allotment: within 5 working days of date of allotment</li>
                  <li>• IDCW payment within 7 working days of record date</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="diviniti-equity-long-short" fundName="Diviniti SIF by ITI Mutual Fund" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default DivinitiSif;
