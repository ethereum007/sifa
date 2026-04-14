"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle, ExternalLink } from "lucide-react";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChart";
import { getSifBySlug, getPeers, fmtPct } from "@/lib/sifData";

// Map sifData slug -> live page URL
const PEER_HREF: Record<string, string> = {
  "dyna-equity-long-short": "/sifs/dyna-equity-long-short",
  "qsif-active-asset-allocator-long-short": "/sifs/qsif-active-asset-allocator-long-short",
  "altiva-hybrid-long-short": "/sifs/altiva-hybrid-long-short",
  "qsif-hybrid-long-short": "/sifs/qsif-hybrid-long-short",
  "magnum-hybrid-long-short": "/sifs/magnum-hybrid-long-short",
  "arudha-hybrid-long-short": "/sifs/arudha-hybrid-long-short",
  "titanium-hybrid-long-short": "/sifs/titanium-hybrid-long-short",
  "qsif-equity-long-short": "/sifs/qsif-equity-long-short",
  "diviniti-equity-long-short": "/sifs/diviniti-equity-long-short",
  "arudha-equity-long-short": "/sifs/arudha-equity-long-short",
  "sapphire-equity-long-short": "/sifs/sapphire-equity-long-short",
};

const FUND = getSifBySlug("dyna-active-asset-allocator")!;
const PEER_FUNDS = getPeers("dyna-active-asset-allocator");

const AMC_URL = "https://www.360.one/dyna-sif";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data for DynaSIF Active Asset Allocator Long-Short          */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Active Asset Allocator",
  "Multi-Asset Long-Short",
  "Interval Strategy",
  "Commodity Derivatives",
  "InvITs",
  "Short via Derivatives",
];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";
const oneMColor = (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";
const threeMColor = (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Mar 31, 2026", color: "" },
  { label: "1M Return", value: FUND.returns.oneMonth == null ? "—" : fmtPct(FUND.returns.oneMonth), sub: "", color: FUND.returns.oneMonth == null ? "text-gray-400" : oneMColor },
  { label: "3M Return", value: FUND.returns.threeMonth == null ? "—" : fmtPct(FUND.returns.threeMonth), sub: "", color: FUND.returns.threeMonth == null ? "text-gray-400" : threeMColor },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Benchmark", value: "Composite", sub: "Risk Band 2", color: "" },
];

const INFO_BAR = [
  { label: "AUM", value: "NFO-stage" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "01 Mar 2026" },
  { label: "Redemption", value: "Weekly (Mon)" },
  { label: "SIP", value: "₹20,000+" },
  { label: "Exit Load", value: "0.50% <3M" },
];

const TRAILING = [
  { period: "1M", value: FUND.returns.oneMonth == null ? "—" : fmtPct(FUND.returns.oneMonth), color: FUND.returns.oneMonth == null ? "text-gray-400" : oneMColor },
  { period: "3M", value: FUND.returns.threeMonth == null ? "—" : fmtPct(FUND.returns.threeMonth), color: FUND.returns.threeMonth == null ? "text-gray-400" : threeMColor },
  { period: "6M", value: "—", color: "text-gray-400" },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception), color: siColor },
  { period: "FYTD", value: fmtPct(FUND.returns.sinceInception), color: siColor },
  { period: "Benchmark (SI)", value: "—", color: "text-gray-400" },
];

const ALLOCATION_TAGS = [
  "Equity 20–50%",
  "Debt & MM 20–65%",
  "Short derivatives 0–25%",
  "Commodity derivatives 0–25%",
  "InvITs 0–20%",
  "Foreign securities ≤20%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "360 ONE AMC" },
  { label: "Category", value: "Active Asset Allocator" },
  { label: "Type", value: "Interval" },
  { label: "Inception date", value: "01 Mar 2026" },
  { label: "AUM", value: "NFO-stage" },
  { label: "Benchmark", value: "25 BSE Sensex + 60 CRISIL ST + 15 iCOMDEX" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER slab-1", value: "2.25%" },
  { label: "Exit load", value: "0.50% <3M" },
  { label: "Strategy code", value: "DYNA/I/H/AALS/25/12/0002/360O" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (biz days)" },
  { label: "Redemption", value: "Every Monday" },
  { label: "Notice period", value: "7 working days" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "SIP (monthly)", value: "₹20,000+" },
  { label: "SIP (quarterly)", value: "₹50,000+" },
  { label: "SWP", value: "Not allowed" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 2", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Level 2" },
  { label: "Short selling", value: "Derivatives only (≤25%)" },
  { label: "Lock-in period", value: "None (interval)" },
  { label: "Gross exposure cap", value: "100% of NAV" },
];

const PEERS = PEER_FUNDS
  .slice()
  .sort((a, b) => b.returns.sinceInception - a.returns.sinceInception)
  .slice(0, 4)
  .map((f) => ({
    name: f.shortName,
    amc: f.amc.replace("Mutual Fund", "MF").trim(),
    ret: fmtPct(f.returns.sinceInception, 1),
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
    positive: f.returns.sinceInception >= 0,
  }));

const TEAM = [
  { name: "Harsh Aggarwal", initials: "HA", role: "Fund Manager · Equity & Overlay", sleeve: "Equity L/S" },
  { name: "Milan Mody", initials: "MM", role: "Fund Manager · Debt Portion", sleeve: "Fixed Income" },
  { name: "Rahul Khetawat", initials: "RK", role: "Fund Manager · Commodity Portion", sleeve: "ETCDs / Commodities" },
];

const SUITABLE = [
  "HNIs wanting multi-asset diversification in a single vehicle",
  "Long-term capital appreciation + income seekers",
  "Investors comfortable with derivatives, commodities & InvITs",
  "5+ year horizon, moderate risk appetite",
  "Replacement for multi-asset Cat III AIF at lower tax impact",
];
const NOT_SUITABLE = [
  "Guaranteed-return or capital-protection seekers",
  "Investors needing daily redemption (weekly only)",
  "Below ₹10L investable surplus (non-accredited)",
  "Pure-equity investors chasing highest beta",
];

const PILLARS = [
  {
    title: "Tactical Asset Allocation",
    desc: "Dynamic 20–50% equity and 20–65% debt based on market regime, valuations, rates and macro outlook — actively rotates between risk-on and risk-off stances each cycle.",
    color: "indigo",
  },
  {
    title: "Short Derivative Overlay (0–25%)",
    desc: "Up to 25% unhedged short exposure through equity & debt derivatives. Expresses negative views without liquidating the long book; hedges tail risk when regime shifts.",
    color: "violet",
  },
  {
    title: "Commodity Derivatives (0–25%)",
    desc: "Exchange Traded Commodity Derivatives (ETCDs) — Gold, Silver and other SEBI-permitted commodities via futures & options. Adds a non-correlated return stream.",
    color: "purple",
  },
  {
    title: "InvIT Income (0–20%)",
    desc: "Listed Infrastructure Investment Trusts deliver quasi-fixed yield plus infra exposure, supplementing the debt sleeve with better real-yield characteristics.",
    color: "fuchsia",
  },
  {
    title: "Multi-Manager Governance",
    desc: "Three specialist fund managers — equity/overlay, debt and commodity — collaborate under the AMC Investment Committee which approves allocation deviations and rebalancing.",
    color: "rose",
  },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity and equity-related securities", min: "20%", max: "50%" },
  { t: "Debt and money market instruments", min: "20%", max: "65%" },
  { t: "Short exposure via unhedged equity & debt derivatives", min: "0%", max: "25%" },
  { t: "Commodity derivatives (ETCDs)", min: "0%", max: "25%" },
  { t: "Units issued by InvITs", min: "0%", max: "20%" },
  { t: "Foreign securities / overseas ETFs", min: "0%", max: "20% of net assets" },
  { t: "Securities lending (≤5% per counterparty)", min: "0%", max: "20% of net assets" },
  { t: "Tri-party repo", min: "0%", max: "20% of net assets" },
];

const STRATEGY_MIX = [
  { name: "Core Equity (long book, multi-cap)", range: "20–50%", width: "40%", color: "bg-indigo-500" },
  { name: "Debt & Money Market (duration + carry)", range: "20–65%", width: "50%", color: "bg-slate-500" },
  { name: "Short via Derivatives (equity & debt)", range: "0–25%", width: "18%", color: "bg-violet-500" },
  { name: "Commodity Derivatives (ETCDs)", range: "0–25%", width: "15%", color: "bg-amber-500" },
  { name: "InvITs (yield sleeve)", range: "0–20%", width: "12%", color: "bg-fuchsia-500" },
];

const DERIV_STRATEGIES = [
  { t: "Tactical short equity futures / options", note: "Up to 25% unhedged net short via single-stock or index futures/options to express negative alpha or hedge equity beta." },
  { t: "Debt derivatives (IRS, bond futures)", note: "Interest-rate swaps and bond futures used for duration management and hedging fixed-income exposure; executed under pre-approved ISDA." },
  { t: "Commodity futures & options (ETCDs)", note: "Gold / Silver / other SEBI-permitted commodity derivatives. Physical delivery, if it occurs, disposed within 180 days (Gold/Silver)." },
  { t: "Covered calls on equity longs", note: "Derivative yield overlay on the long book; sized per position with strike discipline." },
  { t: "Index hedging (Nifty / Bank Nifty)", note: "Tactical hedges using index futures/options to dial equity participation up/down quickly without churning the cash book." },
  { t: "Arbitrage (cash-future, calendar)", note: "Low-risk spread capture inside the equity sleeve when opportunities exceed money-market yield." },
];

const EXCLUDED_INSTRUMENTS = [
  "Overseas derivatives",
  "Securitized debt",
  "Units of other SIFs",
  "Physical commodities (except via ETF / physical settlement)",
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Harsh Aggarwal",
    initials: "HA",
    role: "Fund Manager — Equity & Derivative Overlay",
    exp: "18+ yrs",
    bio:
      "Head of Alternative Strategies at 360 ONE AMC with 18 years of buy-side research and portfolio-management experience across long-short investing — research firms, proprietary trading desks and a domestic asset manager. Previously led alternatives at Tata AMC for 5+ years, managing two Category III long-short AIFs with peak AUM above ₹3,000 Cr across long-only equities, equity & commodity derivatives long-short and fixed income. Manages the equity sleeve and derivative overlay of DynaSIF AAA.",
    color: "indigo",
    quals: "MBA (Symbiosis, Pune) · Certified Portfolio Manager (CPM, ICFAI) · Certified Treasury Manager (CTM) · B.Com · NISM Series XIX-C",
  },
  {
    name: "Milan Mody",
    initials: "MM",
    role: "Fund Manager — Debt Portion",
    exp: "20+ yrs",
    bio:
      "Fixed-income specialist responsible for the 20–65% debt & money-market sleeve of DynaSIF AAA. Handles duration positioning, credit selection within permitted rating band, and debt-derivative hedges (interest-rate swaps, bond futures). Works with the AMC treasury to manage liquidity for weekly redemption windows.",
    color: "violet",
    quals: "CA · CFA · 20+ yrs in Indian fixed-income markets",
  },
  {
    name: "Rahul Khetawat",
    initials: "RK",
    role: "Fund Manager — Commodity Portion",
    exp: "15+ yrs",
    bio:
      "Leads the commodity-derivatives sleeve (up to 25% in ETCDs) — Gold, Silver and other SEBI-permitted commodity futures & options on Indian exchanges. Designs the cross-asset hedging framework that combines commodity exposure with equity and debt sleeves for true multi-asset diversification.",
    color: "purple",
    quals: "MBA · NISM Series XVI (Commodity Derivatives) · 15+ yrs in commodity markets",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Equity Market Risk", d: "The 20–50% equity sleeve will fluctuate with daily market movements. Macro, rates, policy and sentiment shifts drive mark-to-market volatility; sector weights diverge from the composite benchmark and can underperform if sector calls miss." },
  { t: "Interest-Rate & Credit Risk", d: "The 20–65% debt sleeve carries duration and credit risk. Prices fall when rates rise; credit-rating migration and default risk (up to 10% in AT1/AT2) can erode NAV. No investment in securitized debt." },
  { t: "Derivatives Risk", d: "Futures and options are leveraged — small underlying moves amplify P&L. Up to 25% of net assets may be unhedged short via equity & debt derivatives; execution depends on fund-manager skill in identifying opportunities." },
  { t: "Short-Selling Risk", d: "Unhedged derivative shorts face theoretically unlimited loss if the underlying rallies. Sizing discipline and active delta/hedge management mitigate but do not eliminate." },
  { t: "Commodity Derivative Risk", d: "ETCD sleeve (up to 25%) exposes NAV to global commodity prices (Gold/Silver primarily). Physical settlement risk — goods must be disposed within 180 days (Gold/Silver) or the next contract expiry for others." },
  { t: "Liquidity Risk", d: "Redemption only every Monday with 7-working-day notice — materially less liquid than daily-redemption SIFs. Underlying InvITs, ETCDs and small-cap derivative legs can face thin secondary liquidity under stress." },
  { t: "Interval-Structure Risk", d: "No redemption outside the Specified Transaction Period (every Monday). Investors cannot exit intra-week even under adverse NAV moves — structural liquidity gate by design." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives mitigate counterparty risk; securities lending capped ≤20% with 5% single-counterparty cap. IRS executed under pre-approved ISDA; settlement failures can adversely move NAV." },
  { t: "Model & Execution Risk", d: "Cross-asset allocation calls (equity vs debt vs commodities) depend on regime-identification models and manager judgment. Wrong asset-rotation calls materially impact outcomes." },
  { t: "Regulatory / Legislative Risk", d: "SIF framework is new (SEBI Feb 2025 circular). Changes to SIF rules, ETCD participation rules, commodity taxation, or derivative margin could materially affect fund operations." },
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
      <span className={`text-sm font-semibold text-right font-mono tabular-nums ${color || "text-gray-900"}`}>{value}</span>
    </div>
  );
}

const TABS = ["Snapshot", "Portfolio", "Fund Managers", "Risk & Scores", "Documents"] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const DynaActiveAssetAllocator = () => {
  const fundData = getSifBySlug("dyna-active-asset-allocator");
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
              <a href="/sif-funds-launched" className="hover:text-gray-600">Active Asset Allocator</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">DynaSIF AAA</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <span className="text-sm text-gray-500">360 ONE Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                  <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold px-2 py-0.5 rounded text-[11px]">
                    Risk Band 2
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  DynaSIF Active Asset Allocator Long-Short Fund
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
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white">
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
                  <p className={`text-lg sm:text-xl font-bold font-mono tabular-nums ${m.color || "text-gray-900"}`}>{m.value}</p>
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
                    activeTab === tab ? "text-indigo-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-600" />
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
                    <span className="text-2xl font-bold text-gray-900 font-mono tabular-nums">₹{FUND.currentNav.toFixed(4)}</span>
                    <span className={`text-sm font-semibold ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
                  </div>
                  <div className="h-[280px] mt-4">
                    {fundData && (
                      <NavJourneyChart funds={[fundData]} showBenchmark={false} height={280} />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">Live NAV data · Source: AMFI NAV API · Inception 01 Mar 2026</p>
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
                            returnMode === mode ? "bg-indigo-600 text-white" : "text-gray-500 hover:text-gray-700"
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
                        <p className={`text-base font-bold font-mono tabular-nums ${t.color}`}>{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TRAILING.slice(4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className={`text-base font-bold font-mono tabular-nums ${t.color}`}>{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">
                    Fund launched 01 Mar 2026. Short track record — use trailing returns with caution.
                    Composite benchmark: 25% BSE SENSEX TRI + 60% CRISIL ST Bond Fund Index + 15% iCOMDEX.
                  </p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Generate <b>capital appreciation and income</b> through dynamic allocation across
                    equities, InvITs, commodities and fixed income — layered with <b>derivative long-short
                    trading strategies</b>. The interval strategy shifts between risk-on (up to 50% equity)
                    and risk-off (up to 65% debt) stances; up to 25% of net assets may be in unhedged
                    short derivative positions. Benchmarked to a composite index
                    (<b>25% BSE SENSEX TRI + 60% CRISIL ST Bond + 15% iCOMDEX</b>).
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Tactical allocation flexibility</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-indigo-50 text-xs font-medium text-indigo-700 border border-indigo-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    DynaSIF AAA is built as a <b>dynamically switching</b> multi-asset book — the equity
                    sleeve can flex between <b>20–50%</b> based on market signals (valuation, regime,
                    rates), paired with a <b>20–65%</b> debt allocation that rises in risk-off windows.
                    Up to <b>25%</b> can sit in unhedged short equity/debt derivatives when the manager
                    holds a conviction negative view. Commodity derivatives (ETCDs) and InvITs add
                    non-correlated return streams.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The wide allocation bands are the core feature — the fund is <b>not</b> balanced to a
                    fixed equity/debt split. Active rotation across the full 20–50% / 20–65% / 0–25%
                    envelope is the alpha source. Short derivatives, commodities and InvITs are
                    tactical complements, not permanent sleeves.
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
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management (3)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">
                          {m.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                          <p className="text-xs text-gray-500">{m.role}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{m.sleeve}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in DynaSIF AAA</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist. No commitment.</p>
                  <div className="flex gap-2">
                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm">
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
                      <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className={`text-sm font-bold mt-1 font-mono tabular-nums ${p.positive ? "text-green-600" : "text-red-600"}`}>
                          {p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span>
                        </p>
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

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                DynaSIF AAA runs <b>wide tactical allocation bands</b> per the SID — equity 20–50%,
                debt 20–65%, commodity derivatives 0–25%, InvITs 0–20%, and up to 25% short via
                unhedged derivatives. The book is built across three specialist sleeves (equity,
                debt, commodities) with a dedicated derivative overlay that can go both hedge and
                unhedged-short. The defining portfolio feature is <b>how much the mix moves</b> across
                cycles — not a static balanced split.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Equity</p>
                  <p className="text-lg font-bold text-indigo-700 font-mono tabular-nums">20–50%</p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-xs text-slate-700 mb-1">Debt &amp; MM</p>
                  <p className="text-lg font-bold text-slate-700 font-mono tabular-nums">20–65%</p>
                </div>
                <div className="rounded-lg bg-violet-50 p-4 text-center">
                  <p className="text-xs text-violet-700 mb-1">Short Derivs</p>
                  <p className="text-lg font-bold text-violet-700 font-mono tabular-nums">0–25%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">Commodity</p>
                  <p className="text-lg font-bold text-amber-700 font-mono tabular-nums">0–25%</p>
                </div>
                <div className="rounded-lg bg-fuchsia-50 p-4 text-center">
                  <p className="text-xs text-fuchsia-700 mb-1">InvITs</p>
                  <p className="text-lg font-bold text-fuchsia-700 font-mono tabular-nums">0–20%</p>
                </div>
              </div>
            </div>

            {/* Strategy mix */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Indicative strategy mix</h3>
              <div className="space-y-4">
                {STRATEGY_MIX.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{s.name}</span>
                      <span className="text-gray-500 font-mono tabular-nums">{s.range}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${s.color} h-full rounded-full`} style={{ width: s.width }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: DynaSIF AAA ISID &amp; KIM — 360 ONE AMC. Weights indicative; actual mix
                varies materially with the asset-allocation view.
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
                        <td className="py-3 px-4 text-right font-semibold font-mono tabular-nums">{r.min}</td>
                        <td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">{r.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Cumulative gross exposure capped at 100% of net assets. Non-hedging derivatives
                capped at 25%. AT1/AT2 ≤10% of debt portfolio. SO/CE debt ≤10% of debt portfolio.
                Hedged/offsetting equity &amp; debt positions up to 100% of allocations. No overseas
                derivatives, no securitized debt, no units of other SIFs.
              </p>
            </div>

            {/* Derivative strategies table */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Derivative &amp; cross-asset strategies</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Strategy</th>
                      <th className="py-3 pl-4 font-semibold">Sizing &amp; notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {DERIV_STRATEGIES.map((s) => (
                      <tr key={s.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{s.t}</td>
                        <td className="py-3 pl-4 text-gray-500 text-xs">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Source: DynaSIF AAA ISID — Sections on Derivative Strategies, Commodity Derivatives &amp; Risk Mitigation.
              </p>
            </div>

            {/* Allocation signals */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Allocation signals (risk-on)</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>Equity → 40–50%</b>, debt trimmed to 20–30%</li>
                  <li>• <b>Short overlay minimal</b> (0–5%), covered calls on selected names</li>
                  <li>• <b>Commodity</b> opportunistic — trend/carry in Gold / Silver</li>
                  <li>• <b>InvITs</b> held as yield anchor (10–15%)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Allocation signals (risk-off)</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>Equity → 20–25%</b>, debt scaled up to 55–65%</li>
                  <li>• <b>Short overlay active</b> (10–25%) via index / single-stock futures</li>
                  <li>• <b>Debt duration</b> extended selectively; IRS hedges added</li>
                  <li>• <b>Commodity</b> tilt toward defensives (Gold)</li>
                </ul>
              </div>
            </div>

            {/* Holdings disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> DynaSIF AAA launched on <b>01 March 2026</b>. As a newly
                launched SIF, monthly top-holding disclosures are not yet available in the standard
                mutual-fund format. 360 ONE AMC publishes portfolio (including derivatives, with
                ISIN) on the last day of every alternate month (May, Jul, Sep, Nov, Jan, Mar) on
                the DynaSIF and AMFI websites within 10 days of period close. The allocation bands
                and strategy mix above are from the ISID/KIM and represent the permissible envelope.
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
              <h3 className="text-base font-bold text-gray-900 mb-3">Three-manager structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                DynaSIF AAA is managed by <b>three specialist fund managers</b> across the equity,
                debt and commodity sleeves — each with primary responsibility for their asset class
                and joint accountability for the overall allocation call. The team is supported by
                the 360 ONE research, dealing and risk functions and by the AMC Investment Committee
                which oversees asset-allocation deviations and rebalancing exceptions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">EQUITY &amp; OVERLAY</p>
                  <p className="text-xs text-gray-600 mt-1">Harsh Aggarwal</p>
                </div>
                <div className="rounded-lg bg-violet-50 p-3">
                  <p className="text-xs text-violet-700 font-semibold">DEBT</p>
                  <p className="text-xs text-gray-600 mt-1">Milan Mody</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-purple-700 font-semibold">COMMODITY</p>
                  <p className="text-xs text-gray-600 mt-1">Rahul Khetawat</p>
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
                        360 ONE AMC
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{m.bio}</p>
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Qualifications</p>
                      <p className="text-xs text-gray-600">{m.quals}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">About 360 ONE Asset Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                360 ONE AMC (formerly <b>IIFL Asset Management</b>) is the asset-management arm of
                360 ONE WAM — one of India&apos;s largest wealth &amp; asset management platforms with
                multi-decade institutional and UHNI relationships. Registered office: 360 ONE
                Centre, Kamala City, S.B. Marg, Lower Parel, Mumbai – 400 013. The trustee company
                is 360 ONE Asset Trustee Limited. DynaSIF is the AMC&apos;s dedicated SIF platform under
                the SEBI Specialized Investment Fund framework; DynaSIF AAA is the multi-asset
                allocator strategy alongside the DynaSIF Equity L/S strategy.
              </p>
              <p className="text-[11px] text-gray-400">
                Registrar &amp; Transfer Agent: Computer Age Management Services Ltd. (CAMS).
                Website: <a href={AMC_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">360.one/dyna-sif</a>.
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
                <span className="bg-amber-500 text-[#0f1f3d] text-xs font-bold px-3 py-1 rounded-full">
                  Level 2 · Low-Moderate
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                DynaSIF AAA is assigned <b>Risk Band Level 2</b> on the 1–5 AMFI scale — consistent
                with the composite benchmark (25% BSE SENSEX TRI + 60% CRISIL ST Bond + 15% iCOMDEX,
                also Level 2). The band is driven by the <b>65% debt cap</b> and capped 50% equity —
                materially lower-risk than pure equity or equity L/S SIFs. Commodity and short
                derivative sleeves add tail-risk but are capped at 25% each.
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
              <p className="text-[11px] text-gray-400 mt-3">Summarised from the DynaSIF AAA ISID &amp; KIM risk sections.</p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Risk mitigation framework</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Allocation discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI-mandated bands (equity 20–50%, debt 20–65%, ETCD ≤25%, InvIT ≤20%) enforced
                    daily. Passive-breach rebalancing within 30 business days; defensive deviations
                    normalised within 30 calendar days per SEBI Master Circular 2024.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Derivative discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Non-hedging derivative exposure capped at 25% of NAV. Hedged/offsetting positions
                    up to 100% of equity/debt allocations. IRS executed under pre-approved ISDA.
                    Commodity physical-settlement disposal within 180 days (Gold/Silver).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Structural limits</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Cumulative gross exposure ≤100% of net assets. Securities lending ≤20% with 5%
                    single-counterparty cap. AT1/AT2 ≤10% of debt portfolio. Tri-party repo ≤20%.
                    No overseas derivatives, no securitized debt, no units of other SIFs.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Governance</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent trustee (360 ONE Asset Trustee). AMC Investment Committee reviews
                    any mandate deviation. Alternate-month portfolio disclosure (incl. derivatives
                    with ISIN) on the SIF &amp; AMFI websites within 10 days of period close.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Instruments the fund will NOT invest in</h3>
              <div className="flex flex-wrap gap-2">
                {EXCLUDED_INSTRUMENTS.map((e) => (
                  <span key={e} className="px-3 py-1.5 rounded-full bg-red-50 text-xs font-medium text-red-700 border border-red-200">
                    ✗ {e}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Explicit exclusions per the DynaSIF AAA ISID — material risk-reducer vs many multi-asset Cat III AIFs.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Comparison vs multi-asset Cat III AIF</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">DynaSIF AAA</th>
                      <th className="py-3 pl-4">Cat III Multi-Asset AIF</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage (gross exposure)</td><td className="py-3 px-4 font-semibold text-green-600">≤100% of NAV</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Short exposure</td><td className="py-3 px-4 font-semibold">≤25% (derivatives only)</td><td className="py-3 pl-4">Unrestricted</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Minimum ticket</td><td className="py-3 px-4 font-semibold text-green-600">₹10L (₹1L accredited)</td><td className="py-3 pl-4">₹1 Cr</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Redemption</td><td className="py-3 px-4 font-semibold">Weekly (interval)</td><td className="py-3 pl-4">Typically quarterly / lock-in</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes (typical 15–20%)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7% on derivative P&amp;L</td></tr>
                    <tr><td className="py-3 pr-4">Investor-level taxation</td><td className="py-3 px-4 font-semibold text-green-600">MF rules (hybrid)</td><td className="py-3 pl-4">Slab / business income</td></tr>
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
                All documents are hosted on 360 ONE&apos;s DynaSIF portal. Investment Strategy Code:
                <b> DYNA/I/H/AALS/25/12/0002/360O</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Application form", d: "Resident / NRI subscription" },
                  { t: "Alternate-month portfolio disclosure", d: "Within 10 days of period close (AMC & AMFI)" },
                  { t: "360 ONE DynaSIF portal", d: "360.one/dyna-sif" },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-100 p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">{d.t}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.d}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 shrink-0 mt-0.5" />
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Strategy code</td><td className="py-3 pl-4 font-semibold font-mono">DYNA/I/H/AALS/25/12/0002/360O</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Inception date</td><td className="py-3 pl-4 font-semibold">01 March 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Subscription frequency</td><td className="py-3 pl-4 font-semibold">Daily (business days)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption frequency</td><td className="py-3 pl-4 font-semibold">Every Monday</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Notice period</td><td className="py-3 pl-4 font-semibold">7 working days</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Cut-off</td><td className="py-3 pl-4 font-semibold">3:00 PM</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption payout</td><td className="py-3 pl-4 font-semibold">Within 3 working days</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">NAV publication</td><td className="py-3 pl-4 font-semibold">Before 11:00 PM on AMFI &amp; 360.one</td></tr>
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
                  <tbody className="text-gray-700 font-mono tabular-nums">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">First ₹500 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.00%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹250 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.00%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹1,250 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.75%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹3,000 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.60%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹5,000 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.50%</td></tr>
                    <tr><td className="py-3 pr-4">Balance AUM</td><td className="py-3 pl-4 text-right font-semibold">1.05% (with –0.05% per ₹5,000 Cr)</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Current Regular plan TER: <b>{FUND.terRegular.toFixed(2)}%</b>. Direct plan TER is
                typically 40–70 bps lower (no distributor commission). Brokerage &amp; transaction
                costs of up to 12 bps (cash) and 5 bps (derivatives) may be charged over &amp; above.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load <b>0.50%</b> if redeemed within 3 months of allotment</li>
                  <li>• <b>Nil</b> exit load after 3 months</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Initial NFO issue expenses borne by the AMC</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Investment thresholds</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Minimum investment: <b>₹10,00,000</b> (aggregate across DynaSIF strategies)</li>
                  <li>• Accredited investor minimum: <b>₹1,00,000</b></li>
                  <li>• SIP monthly: <b>₹20,000</b> · 6 months min</li>
                  <li>• SIP quarterly: <b>₹50,000</b> · 6 quarters min</li>
                  <li>• STP: permitted only within DynaSIF strategies</li>
                  <li>• SWP: <b>not allowed</b></li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Plans &amp; options</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Plans</p>
                  <ul className="space-y-1">
                    <li>• Regular Plan (with distributor)</li>
                    <li>• Direct Plan (no commission)</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Options per plan</p>
                  <ul className="space-y-1">
                    <li>• Growth (default)</li>
                    <li>• IDCW — Payout / Re-investment (default sub-option: Re-investment)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="dyna-active-asset-allocator" fundName="DynaSIF Active Asset Allocator by 360 ONE" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default DynaActiveAssetAllocator;
