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
  "qsif-equity-long-short": "/sifs/qsif-equity-long-short",
  "diviniti-equity-long-short": "/sifs/diviniti-equity-long-short",
  "arudha-equity-long-short": "/sifs/arudha-equity-long-short",
  "sapphire-equity-long-short": "/sifs/sapphire-equity-long-short",
  "dyna-equity-long-short": "/sifs/dyna-equity-long-short",
  "altiva-hybrid-long-short": "/sifs/altiva-hybrid-long-short",
  "magnum-hybrid-long-short": "/sifs/magnum-hybrid-long-short",
  "qsif-hybrid-long-short": "/sifs/qsif-hybrid-long-short",
  "arudha-hybrid-long-short": "/sifs/arudha-hybrid-long-short",
  "titanium-hybrid-long-short": "/sifs/titanium-hybrid-long-short",
};

const FUND = getSifBySlug("dyna-equity-long-short")!;
const PEER_FUNDS = getPeers("dyna-equity-long-short");

const AMC_URL = "https://www.360.one/dyna-sif";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useFundNav, formatNavDate } from "@/hooks/useSifNav";

/* ------------------------------------------------------------------ */
/*  Static data for DynaSIF Equity Long-Short                          */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Equity Long-Short",
  "Multi-cap",
  "Derivative Overlay",
  "Active",
  "Long Bias",
  "High Churn",
];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";
const oneMColor = (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";
const threeMColor = (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Apr 30, 2026", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: oneMColor },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: threeMColor },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Benchmark", value: "BSE 500 TRI", sub: "Risk Band 5", color: "" },
];

const INFO_BAR = [
  { label: "AUM", value: "NFO-stage" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "27 Feb 2026" },
  { label: "Redemption", value: "Daily (Biz days)" },
  { label: "SIP", value: "₹20,000+" },
  { label: "Exit Load", value: "0.50% <3M" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth), color: oneMColor },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth), color: threeMColor },
  { period: "6M", value: "—", color: "text-gray-400" },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception), color: siColor },
  { period: "FYTD", value: fmtPct(FUND.returns.sinceInception), color: siColor },
  { period: "Benchmark (SI)", value: "—", color: "text-gray-400" },
];

const ALLOCATION_TAGS = [
  "Equity 80–100%",
  "Short via derivatives 0–25%",
  "Debt / MM 0–20%",
  "InvIT units 0–20%",
  "Overseas 0–20%",
  "Sec. lending ≤20%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "360 ONE AMC" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception date", value: "27 Feb 2026" },
  { label: "AUM", value: "NFO-stage" },
  { label: "Benchmark", value: "BSE 500 TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER slab-1", value: "2.25%" },
  { label: "Exit load", value: "0.50% <3M" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (biz days)" },
  { label: "Redemption", value: "Daily (biz days)" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "SIP (monthly)", value: "₹20,000+" },
  { label: "SIP (quarterly)", value: "₹50,000+" },
  { label: "SWP", value: "Not allowed" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 5 · Very High", color: "text-red-600" },
  { label: "Benchmark risk band", value: "Level 5" },
  { label: "Short selling", value: "Derivatives only (≤25%)" },
  { label: "Lock-in period", value: "None" },
  { label: "Gross exposure cap", value: "100% of NAV" },
];

const PEERS = PEER_FUNDS
  .slice()
  .sort((a, b) => b.returns.sinceInception - a.returns.sinceInception)
  .slice(0, 4)
  .map((f) => ({
    name: f.shortName + " " + f.category.replace("Long Short", "").trim(),
    amc: f.amc,
    ret: fmtPct(f.returns.sinceInception, 1),
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
    positive: f.returns.sinceInception >= 0,
  }));

const TEAM = [
  { name: "Harsh Aggarwal", initials: "HA", role: "Fund Manager · Head of Alternative Strategies", sleeve: "Equity L/S" },
];

const SUITABLE = [
  "Experienced equity investors with ₹10L+ surplus",
  "Seeking alpha from both long & short sleeves",
  "5+ year horizon, tolerant of high-churn strategy",
  "Replacement for Cat III L/S AIF at lower tax impact",
];
const NOT_SUITABLE = [
  "Capital-protection or guaranteed-return seekers",
  "Investors who need daily-vol downside dampening",
  "Below ₹10L investable surplus (non-accredited)",
  "Short-horizon or pure-beta passive investors",
];

const PILLARS = [
  {
    title: "Core — Long Equity (80–100%)",
    desc: "Multi-cap, sector-agnostic long book driven by structural, cyclical and tactical themes; qualitative (macro, moats, themes) + quantitative (valuation, factors, regime, trend) stock picks.",
    color: "indigo",
  },
  {
    title: "Short Sleeve — Derivative Overlay (0–25%)",
    desc: "Unhedged short equity positions via futures/options on stocks with weakening fundamentals, market-share loss or excessive valuations; sized small per name.",
    color: "violet",
  },
  {
    title: "Portfolio Hedging",
    desc: "Index derivatives (Nifty 50, Bank Nifty, Midcap) used to dial equity participation up/down; covered calls for derivative yield; tactical hedges exited within the month if not working.",
    color: "purple",
  },
  {
    title: "Event & Pair Strategies",
    desc: "Merger arbitrage, index rebalancing, pair trades within sectors and stock-level long-short to capture relative-value dispersion.",
    color: "fuchsia",
  },
  {
    title: "Risk — Position Caps",
    desc: "Single-stock exposure ~5% (both long & short legs); single-sector net exposure ~20%; combined index-pair and directional option exposure ~5% of NAV each.",
    color: "rose",
  },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity or Equity-related instruments (incl. cash equity, unhedged long derivatives)", min: "80%", max: "100%" },
  { t: "Short exposure via unhedged derivative positions in equity", min: "0%", max: "25%" },
  { t: "Debt and money-market instruments", min: "0%", max: "20%" },
  { t: "Units issued by InvITs", min: "0%", max: "20%" },
  { t: "Overseas securities / ETFs (no overseas derivatives)", min: "0%", max: "20%" },
  { t: "Securities lending (≤5% per counterparty)", min: "0%", max: "20% of net assets" },
];

const STRATEGY_MIX = [
  { name: "Long Equity (multi-cap, sector-agnostic)", range: "80–100%", width: "90%", color: "bg-indigo-500" },
  { name: "Short via Derivatives (single stock + index)", range: "0–25%", width: "18%", color: "bg-violet-500" },
  { name: "Options Overlay (covered call / straddle)", range: "0–10%", width: "8%", color: "bg-fuchsia-500" },
  { name: "Debt, Money Market & Tri-party Repo", range: "0–20%", width: "12%", color: "bg-slate-400" },
];

const DERIV_STRATEGIES = [
  { t: "Equity long-short (single name)", note: "Long outperformers / short laggards. Avg single-stock exposure limit ~5% either side." },
  { t: "Sector long-short", note: "Net sector exposure kept to ~20% to capture positive/negative sector views." },
  { t: "Pairs trading (intra-sector)", note: "Long/short on relative-value pair within a sector; sized ~5% per name, monitored for fundamental drift." },
  { t: "Merger arbitrage & index rebalancing", note: "Positions built gradually into the event; spread risk actively managed." },
  { t: "Index directional (Nifty/BankNifty)", note: "Option + future combo, combined exposure capped at ~5% of NAV." },
  { t: "Index pair trading", note: "Nifty50 vs BankNifty vs Midcap relative bets; combined ~5% of NAV." },
  { t: "Covered calls on equity longs", note: "Spread across multiple stocks for derivative yield; ~5% per name." },
  { t: "Straddle / strangle volatility trades", note: "Delta-managed; single security/index exposure ~5% cap." },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Harsh Aggarwal",
    initials: "HA",
    role: "Fund Manager — DynaSIF Equity Long-Short",
    exp: "18+ yrs",
    bio:
      "Head of Alternative Strategies at 360 ONE AMC with 18 years of buy-side research and portfolio-management experience across long-short investing — research firms, proprietary trading desks and a domestic asset manager. For more than 5 years led alternatives at Tata AMC where he designed and managed two Category III long-short AIFs with peak AUM above ₹3,000 Cr, allocating across long-only equities, equity & commodity derivatives long-short and fixed income. DynaSIF Equity L/S is the first strategy of DynaSIF.",
    color: "indigo",
    quals: "MBA (Symbiosis, Pune) · Certified Portfolio Manager (CPM, ICFAI) · Certified Treasury Manager (CTM) · B.Com · NISM Series XIX-C",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Equity Market Risk", d: "NAV will fluctuate with daily movements in the 80–100% long-equity book. Macro, rates, policy and sentiment shifts all drive mark-to-market volatility; the strategy targets long-term capital appreciation and is not insulated from equity drawdowns." },
  { t: "Derivatives Risk", d: "Futures and options are leveraged — small underlying moves amplify P&L. Up to 25% of net assets may be used for non-hedging derivatives; option premium and strategy execution depend on fund-manager ability to identify opportunities." },
  { t: "Short-Selling Risk", d: "Short via unhedged derivatives can face theoretically unlimited loss if the underlying rallies. Sizing (≤~5% per name) and active delta/hedge management mitigate but do not eliminate." },
  { t: "Concentration & Style Risk", d: "Sector weights will diverge from BSE 500 TRI — returns can underperform if sector/factor calls go wrong. Style rotations (value/growth/quality/momentum) can move against positioning." },
  { t: "Liquidity Risk", d: "Daily redemption supported, but underlying small/mid-cap single-stock and derivative legs can face thin liquidity under stress. InvIT exposure (up to 20%) carries its own secondary-market-liquidity concerns." },
  { t: "Portfolio Turnover / Churn Risk", d: "High churn by design — near-month derivative contracts are rolled at every expiry and tactical/technical ideas have short holding periods. Higher transaction costs and short-term tax implications follow." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives mitigate counterparty risk; securities lending (up to 20%) capped at 5% per counterparty. Settlement failures can adversely move NAV." },
  { t: "Interest-Rate & Credit Risk (small)", d: "Debt / money-market sleeve ≤20% — limited duration and credit exposure, but not zero. No investment in AT1/AT2, credit-enhanced debt, CDS, or securitized debt." },
  { t: "Model & Execution Risk", d: "Quantitative overlays (factor, regime, valuation) and derivative trade execution depend on model fidelity and dealer fills. Volatility-trade delta slippage is actively monitored." },
  { t: "Regulatory / Legislative Risk", d: "SIF framework is new (SEBI Feb 2025 circular). Changes to SIF rules, taxation, or derivative margin could materially affect fund operations." },
];

const EXCLUDED_INSTRUMENTS = [
  "Credit default swaps",
  "Securitized debt",
  "AT1 / AT2 bank bonds",
  "Units of other SIFs",
  "SO / CE structured debt",
  "Corporate-bond repo / reverse repo",
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

const DynaEquityLongShort = () => {
  const __live = useFundNav("DynaSIF Equity Long-Short", FUND.currentNav);
  const liveNav = __live.nav;
  const liveDate = formatNavDate(__live.date) || "Apr 30, 2026";
  const METRICS_LIVE = METRICS.map((m, i) =>
    i === 0 ? { ...m, value: `₹${liveNav.toFixed(4)}`, sub: liveDate } : m
  );

  const fundData = getSifBySlug("dyna-equity-long-short");
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
              <span className="text-gray-600">DynaSIF</span>
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
                    Risk Band 5
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  DynaSIF Equity Long-Short Fund
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
              {METRICS_LIVE.map((m, i) => (
                <div
                  key={i}
                  className={`py-4 px-3 sm:px-4 text-center ${i < METRICS_LIVE.length - 1 ? "border-r border-gray-100" : ""}`}
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
                    <span className="text-2xl font-bold text-gray-900 font-mono tabular-nums">₹{liveNav.toFixed(4)}</span>
                    <span className={`text-sm font-semibold ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
                  </div>
                  <div className="h-[280px] mt-4">
                    {fundData && (
                      <NavJourneyChart funds={[fundData]} showBenchmark={false} height={280} />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">Live NAV data · Source: AMFI NAV API · Fund re-opened 27 Feb 2026</p>
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
                    Fund re-opened 27 Feb 2026. Short track record — use trailing returns with caution. Benchmark: BSE 500 TRI.
                  </p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Generate <b>long-term capital appreciation</b> using structural, cyclical and tactical
                    investing opportunities in equities, with the <b>optionality of hedging and shorting</b>
                    through derivatives. The strategy runs a sector-agnostic multi-cap long book
                    (80–100% of net assets) and adds up to 25% unhedged short exposure via equity
                    derivatives where the fund manager has a strong negative-alpha view. Benchmarked
                    to <b>BSE 500 TRI</b>.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-indigo-50 text-xs font-medium text-indigo-700 border border-indigo-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    DynaSIF Equity L/S is 360 ONE&apos;s first strategy under the SEBI SIF framework.
                    Stocks are screened on a blended <b>qualitative + quantitative</b> lens — macro context,
                    industry dynamics, themes and business strength combined with valuation, factor
                    participation, market regime and price trend. The derivative sleeve adds short
                    single-stock positions (weak fundamentals / excessive valuations) and uses index
                    futures / options for portfolio hedging and tactical participation adjustments.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Portfolio churn is expected to be <b>high</b> — near-month derivative contracts roll
                    at every expiry and several ideas are short-horizon tactical/technical plays. The
                    strategy does <b>not</b> invest in AT1/AT2 bonds, securitized debt, CDS, other SIFs,
                    SO/CE structured debt or overseas derivatives.
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
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center shrink-0">
                          {m.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                          <p className="text-xs text-gray-500">{m.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                    View full bio →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in DynaSIF</h3>
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
                DynaSIF Equity L/S is built as a <b>long-biased, sector-agnostic multi-cap</b> equity
                book with a <b>derivative overlay</b>. The long sleeve (80–100%) is constructed from
                structural, cyclical and tactical opportunities screened on qualitative (macro,
                industry dynamics, themes, business strength) and quantitative (valuation, factor
                participation, regime, price trend) dimensions. The overlay (up to 25% short, plus
                index and option strategies) partly hedges the long book and adds unhedged short
                exposure to names with weakening fundamentals, market-share loss or excessive
                valuations.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Long Equity</p>
                  <p className="text-lg font-bold text-indigo-700 font-mono tabular-nums">80–100%</p>
                </div>
                <div className="rounded-lg bg-violet-50 p-4 text-center">
                  <p className="text-xs text-violet-700 mb-1">Short Derivatives</p>
                  <p className="text-lg font-bold text-violet-700 font-mono tabular-nums">0–25%</p>
                </div>
                <div className="rounded-lg bg-slate-100 p-4 text-center">
                  <p className="text-xs text-slate-700 mb-1">Debt / MM</p>
                  <p className="text-lg font-bold text-slate-700 font-mono tabular-nums">0–20%</p>
                </div>
                <div className="rounded-lg bg-fuchsia-50 p-4 text-center">
                  <p className="text-xs text-fuchsia-700 mb-1">InvIT / Overseas</p>
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
                Source: DynaSIF Equity L/S ISID &amp; KIM — 360 ONE AMC. Weights are indicative allocation
                bands; actual mix varies with market regime and manager conviction.
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
                Cumulative gross exposure capped at 100% of net assets. Derivatives for non-hedging
                capped at 25%. Foreign securities limit US$50M (scheme-level). Tri-party repo up to 20%.
                Liquid/Money-market MF units up to 5%. Fund will <b>not</b> invest in overseas derivatives.
              </p>
            </div>

            {/* Derivative strategies table */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Derivative strategies &amp; position limits</h3>
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
                Source: DynaSIF ISID — Section on Derivative Strategies &amp; Risk Mitigation.
              </p>
            </div>

            {/* Stock selection filters */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Qualitative screens (long book)</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>Macro context</b> — growth, rates, liquidity cycle</li>
                  <li>• <b>Industry dynamics</b> — competitive forces, structural shifts</li>
                  <li>• <b>Themes</b> — re-rate/de-rate triggers for sectors</li>
                  <li>• <b>Business strength</b> — moats, execution, earnings delivery, market-share</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Quantitative screens</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>Valuation</b> — relative &amp; absolute vs fundamentals</li>
                  <li>• <b>Factor participation</b> — quality, size, value, momentum</li>
                  <li>• <b>Market regime</b> — risk-on / risk-off / stable behaviour</li>
                  <li>• <b>Price trend</b> — directional strength/weakness of the tape</li>
                </ul>
              </div>
            </div>

            {/* Holdings disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> DynaSIF re-opened continuous offer on <b>27 February 2026</b>.
                As a newly launched SIF, monthly top-holding disclosures are not yet available in the
                standard mutual-fund format — 360 ONE AMC will publish portfolio as on the last day
                of each half-year within 10 days of period close on the DynaSIF and AMFI websites.
                The allocation bands and strategy mix above are from the ISID/KIM and represent the
                permissible envelope, not a live holding snapshot.
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
                DynaSIF Equity L/S is managed by a <b>single dedicated fund manager</b> — Mr. Harsh
                Aggarwal, who heads Alternative Strategies at 360 ONE AMC. He is supported by the
                broader 360 ONE research, dealing and risk teams and by the AMC&apos;s Investment
                Committee which oversees asset-allocation deviations and rebalancing exceptions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">PORTFOLIO MANAGER</p>
                  <p className="text-xs text-gray-600 mt-1">Harsh Aggarwal</p>
                </div>
                <div className="rounded-lg bg-violet-50 p-3">
                  <p className="text-xs text-violet-700 font-semibold">AMC</p>
                  <p className="text-xs text-gray-600 mt-1">360 ONE Asset Mgmt.</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-purple-700 font-semibold">TRUSTEE</p>
                  <p className="text-xs text-gray-600 mt-1">360 ONE Asset Trustee</p>
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
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                        Age 47
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
                Centre, Kamala City, S.B. Marg, Lower Parel, Mumbai – 400 013. The trustee
                company is 360 ONE Asset Trustee Limited. DynaSIF is the AMC&apos;s dedicated SIF
                platform under the SEBI Specialized Investment Fund framework; DynaSIF Equity L/S
                is its first strategy.
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

            <div className="rounded-xl border-2 border-red-200 bg-red-50/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">AMFI Risk Band</h3>
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Level 5 · Very High
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                DynaSIF Equity L/S is assigned <b>Risk Band Level 5 (Very High)</b> on the 1–5 AMFI
                scale — consistent with the benchmark (<b>BSE 500 TRI</b>, also Level 5). The fund
                runs 80–100% equity exposure plus up to 25% unhedged short derivatives; a high
                long-equity beta plus leveraged derivative overlays places it firmly at the
                high-risk end of the SIF spectrum.
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
              <p className="text-[11px] text-gray-400 mt-3">Summarised from the DynaSIF ISID &amp; KIM risk sections.</p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Risk mitigation framework</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Position sizing</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Single-stock exposure (long or short legs) capped ~5% of NAV. Net sector
                    exposure capped ~20%. Combined index pair or directional option exposure
                    ~5% of NAV each.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Derivative discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Straddle / strangle volatility trades are delta-managed continuously; tactical
                    hedges exited within the contract month if not working. Merger-arbitrage and
                    index-rebalance ideas built gradually into the event window.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Structural limits</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI-mandated gross exposure cap (100% of NAV). Non-hedging derivatives ≤25%.
                    Securities lending ≤20% with 5% single-counterparty cap. No overseas
                    derivatives; no CDS, AT1/AT2, securitized or CE/SO debt.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Governance</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent trustee (360 ONE Asset Trustee), AMC Investment Committee review
                    for any mandate deviation, and SEBI-mandated half-yearly portfolio disclosure
                    plus audited financials on the AMC website.
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
                Explicit exclusions per the DynaSIF ISID — material risk-reducer vs many Cat III AIFs.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Comparison vs Cat III AIF (Long-Short)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">DynaSIF Equity L/S</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage (gross exposure)</td><td className="py-3 px-4 font-semibold text-green-600">≤100% of NAV</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Short exposure</td><td className="py-3 px-4 font-semibold">≤25% (derivatives only)</td><td className="py-3 pl-4">Unrestricted</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Minimum ticket</td><td className="py-3 px-4 font-semibold text-green-600">₹10L (₹1L accredited)</td><td className="py-3 pl-4">₹1 Cr</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes (typical 15–20%)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7% on derivative P&amp;L</td></tr>
                    <tr><td className="py-3 pr-4">Investor-level taxation</td><td className="py-3 px-4 font-semibold text-green-600">Equity MF rules</td><td className="py-3 pl-4">Slab / business income</td></tr>
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
                <b> DYNA/O/E/ELSF/25/12/0001/360O</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Application form", d: "Resident / NRI subscription" },
                  { t: "Half-yearly portfolio disclosure", d: "Within 10 days of period close (AMC & AMFI)" },
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Strategy code</td><td className="py-3 pl-4 font-semibold font-mono">DYNA/O/E/ELSF/25/12/0001/360O</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer re-opened</td><td className="py-3 pl-4 font-semibold">27 February 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Subscription frequency</td><td className="py-3 pl-4 font-semibold">Daily (business days)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption frequency</td><td className="py-3 pl-4 font-semibold">Daily (business days)</td></tr>
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">First ₹500 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.25%</td></tr>
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
            <LeadCaptureForm fundSlug="dyna-equity-long-short" fundName="DynaSIF Equity Long-Short by 360 ONE" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default DynaEquityLongShort;
