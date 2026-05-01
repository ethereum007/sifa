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
  "dyna-equity-long-short": "/sifs/dyna-equity-long-short",
  "diviniti-equity-long-short": "/sifs/diviniti-equity-long-short",
  "arudha-equity-long-short": "/sifs/arudha-equity-long-short",
  "sapphire-equity-long-short": "/sifs/sapphire-equity-long-short",
  "altiva-hybrid-long-short": "/sifs/altiva-hybrid-long-short",
  "qsif-hybrid-long-short": "/sifs/qsif-hybrid-long-short",
};

const FUND = getSifBySlug("qsif-equity-long-short")!;
const PEER_FUNDS = getPeers("qsif-equity-long-short");

const AMC_URL = "https://qsif.com/";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data for qSIF Equity Long-Short                             */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Equity Long-Short",
  "Quant-driven",
  "Multi-cap",
  "Derivative Overlay",
  "Open-Ended",
  "Very High Risk",
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
  { label: "Benchmark", value: "NIFTY 500 TRI", sub: "Risk Band 5", color: "" },
];

const INFO_BAR = [
  { label: "AUM", value: "Early-stage" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "08 Oct 2025" },
  { label: "Redemption", value: "Daily (Biz days)" },
  { label: "SIP", value: "₹10,000+" },
  { label: "Exit Load", value: "1% <15d" },
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
  "Equity & equity-related 80–100%",
  "Debt / MM 0–20%",
  "REITs / InvITs 0–20%",
  "Unhedged short (derivatives) ≤25%",
  "Overseas ≤20%",
  "Stock lending ≤20%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Quant Mutual Fund" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception date", value: "08 Oct 2025" },
  { label: "AUM", value: "Early-stage" },
  { label: "Benchmark", value: "NIFTY 500 TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER slab-1", value: "2.25%" },
  { label: "Exit load", value: "1% if <15d" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (biz days)" },
  { label: "Redemption", value: "Daily (biz days)" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "SIP / STP / SWP", value: "₹10,000+" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹1,000" },
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
  { name: "Sandeep Tandon", initials: "ST", role: "Founder & CIO · qGroup", sleeve: "Equity" },
  { name: "Lokesh Garg", initials: "LG", role: "Fund Manager · Equity", sleeve: "Equity" },
  { name: "Ankit Pande", initials: "AP", role: "Fund Manager · Equity", sleeve: "Equity" },
  { name: "Sameer Kate", initials: "SK", role: "Chief Dealer · Derivatives", sleeve: "Derivatives" },
  { name: "Sanjeev Sharma", initials: "SS", role: "Fund Manager · Debt", sleeve: "Debt" },
];

const SUITABLE = [
  "Long-term investors (5+ yrs) seeking equity alpha",
  "Investors comfortable with Risk Band 5 · Very High",
  "₹10L+ investable surplus (₹1L for accredited)",
  "Believers in Quant MF's VLRT / predictive framework",
];
const NOT_SUITABLE = [
  "Capital-preservation or guaranteed-return seekers",
  "Investors needing stable, bond-like returns",
  "Short horizons under 3 years",
  "Below ₹10L investable surplus (non-accredited)",
];

const PILLARS = [
  { title: "Core — Long Equity (80–100%)", desc: "Diversified long book across listed equity & equity-related instruments, built bottom-up on VLRT-style valuation, liquidity, risk and time signals.", color: "purple" },
  { title: "Overlay — Unhedged Short (≤25%)", desc: "Tactical short exposure via stock futures, index futures and options to profit from overvalued names and manage downside.", color: "rose" },
  { title: "Hedging Flexibility (up to 100%)", desc: "Beyond the 25% naked short, up to 100% of longs can be hedged via index/stock futures & options for defensive regimes.", color: "indigo" },
  { title: "Liquidity Sleeve (0–20%)", desc: "Debt / money market + REIT/InvIT units for liquidity buffer, derivative margining and fixed-income pickup.", color: "blue" },
  { title: "Risk Framework", desc: "Internally defined exposure, stop-loss and gross-leverage limits — cumulative gross exposure capped at 100% of NAV per SEBI SIF framework.", color: "amber" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity & equity-related instruments (incl. unhedged short below)", min: "80%", max: "100%" },
  { t: "Debt and Money Market instruments", min: "0%", max: "20%" },
  { t: "Units of REITs and InvITs", min: "0%", max: "20%" },
  { t: "Unhedged short exposure via derivatives", min: "0%", max: "25%" },
  { t: "Long derivative positions (non-hedging)", min: "0%", max: "50%" },
  { t: "Overseas securities", min: "0%", max: "20%" },
  { t: "Securitised debt (of debt portion)", min: "0%", max: "10%" },
  { t: "Stock lending (of net assets)", min: "0%", max: "20%" },
];

const STRATEGY_MIX = [
  { name: "Long Equity (fundamental + quant)", range: "80–100%", width: "90%", color: "bg-purple-500" },
  { name: "Unhedged Short (stock/index derivatives)", range: "0–25%", width: "20%", color: "bg-rose-500" },
  { name: "Debt / Money Market (liquidity buffer)", range: "0–20%", width: "15%", color: "bg-blue-500" },
  { name: "REITs / InvITs", range: "0–20%", width: "8%", color: "bg-emerald-500" },
];

const SHORT_STRATS = [
  { t: "Short Futures", note: "Index / stock futures — strong bearish view; theoretically unlimited loss; internal stop-loss limits." },
  { t: "Synthetic Short", note: "Long put + short call at same strike — mimic short stock for strong bearish conviction." },
  { t: "Long Put", note: "Outright put buying — defined risk (premium paid), strong bearish view." },
  { t: "Bear Put Spread", note: "Buy higher-strike put, sell lower-strike put — moderate bearish with capped loss." },
  { t: "Short Call / Bear Call Spread", note: "Premium-collection bearish-to-neutral stance; spread variant caps upside loss." },
  { t: "Long Put Butterfly / Calendar / Diagonal", note: "Defined-risk structures for limited, gradual or moderate bearish moves with time-decay pickup." },
  { t: "Ratio Put Spread", note: "Buy one higher-strike put, sell multiple lower-strike — bearish with premium collection (tail risk managed)." },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Sandeep Tandon",
    initials: "ST",
    role: "Founder & Chief Investment Officer — quant Group",
    exp: "33+ yrs",
    bio: "Started money management in 1992–93 at GIC Mutual Fund (Soros JV). Founding team member at IDBI AMC (now Principal AMC); core architect of IDBI I-NITS 95. Held senior roles at ICICI Securities (J P Morgan JV), Kotak Securities (Goldman Sachs JV) and REFCO. As CEO of Quant Broking (2008–2018) ran a proprietary derivatives desk averaging >$1B daily turnover with no reported yearly/quarterly losses across equity arbitrage, vol arb, pair trading, sectoral/event-driven long-short and spreads.",
    color: "purple",
  },
  {
    name: "Lokesh Garg",
    initials: "LG",
    role: "Fund Manager — Equity",
    exp: "20+ yrs",
    bio: "MBA (IIM Ahmedabad), B.Tech (IIT Roorkee — University Gold Medal), CFA Level III. Most recently Executive Director at UBS India Institutional Equities post UBS–Credit Suisse merger. Previously Director at Credit Suisse India Institutional Equities; recognised top analyst in capital goods. Earlier experience with Kotak Institutional Equities, ICICI Bank Treasury and Infosys.",
    color: "indigo",
  },
  {
    name: "Ankit Pande",
    initials: "AP",
    role: "Fund Manager — Equity",
    exp: "14+ yrs",
    bio: "B.E. (Electronics & Telecom, University of Pune), MBA (Chinese University of Hong Kong), CFA Level III. Previously developed fundamental long-short investment ideas under Sandeep Tandon at Quant Broking, incorporating covered calls and protective puts. Thomson Reuters StarMine Award winner (best IT stock picker, 2014). Also Fund Manager of multiple quant Mutual Fund schemes with strong risk-adjusted track record.",
    color: "purple",
  },
  {
    name: "Sameer Kate",
    initials: "SK",
    role: "Chief Dealer — Derivatives & Fund Manager",
    exp: "20+ yrs",
    bio: "B.Sc. Computer Science + MBA (IME Pune). Started career with REFCO as derivatives dealer; 16 years with Kotak Securities (Institutional Equities — JV with Goldman Sachs) as Senior Derivatives Sales Trader and advisor to Kotak proprietary desk (managed >₹500 Cr). Later Sr Sales Trader at Investec Capital. Currently Chief Dealer at quant focused on arbitrage and derivative strategies.",
    color: "rose",
  },
  {
    name: "Sanjeev Sharma",
    initials: "SS",
    role: "Fund Manager — Debt & Treasury",
    exp: "20+ yrs",
    bio: "PGDBA (Finance), M.Com, CerTM (Treasury & Forex Risk). Over two decades in equity, debt, fund management and treasury operations. Manages the fixed-income & money-market sleeve for qSIF and deploys allied strategies across equity, debt and derivatives.",
    color: "blue",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Market Risk", d: "Primarily an equity strategy (80–100% long). NAV is directly exposed to broad market drawdowns, sector rotations and liquidity shocks." },
  { t: "Derivatives Risk", d: "Stock/index futures and options are leveraged — small underlying moves can amplify losses. Long non-hedging derivatives up to 50%." },
  { t: "Short-Selling Risk", d: "Unhedged short exposure up to 25% via derivatives; theoretical loss on naked shorts is unlimited, managed via internal stop-loss and exposure limits." },
  { t: "Concentration & Style Risk", d: "Quant MF's VLRT-style high-turnover approach can create concentrated factor bets. Style underperformance can persist across quarters." },
  { t: "Liquidity Risk", d: "Small/mid-cap longs and single-stock derivatives can face liquidity stress in sharp drawdowns. Up to 20% stock lending exposure adds counterparty risk." },
  { t: "Interest-Rate & Credit Risk", d: "Up to 20% in debt/MM and up to 10% of debt in securitised paper. AT1/perpetual/Tier-2 exposure capped at 10% of debt portfolio." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-cleared derivatives mitigate counterparty exposure; stock lending ≤5% per broker. Segregated-portfolio provision available in credit events." },
  { t: "Model & Execution Risk", d: "Quant overlays rely on model stability, factor regime and execution of multi-leg option structures (butterflies, calendars, diagonals, ratio spreads)." },
  { t: "Regulatory / SIF Framework Risk", d: "New SEBI SIF framework (Feb 2025) — evolving guidance on gross exposure, short caps, disclosures and tax treatment." },
  { t: "New-Strategy Risk", d: "qSIF Equity Long-Short is qsif's first investment strategy (launched Oct 2025). No SIF track record; Quant MF brand carries separate history." },
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

const QsifEquityLongShort = () => {
  const fundData = getSifBySlug("qsif-equity-long-short");
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
              <span className="text-gray-600">qSIF Equity</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span className="text-sm text-gray-500">Quant Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  qSIF Equity Long-Short Fund
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
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
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
                  <span className="text-xs font-semibold text-gray-700 font-mono tabular-nums">{item.value}</span>
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
                    activeTab === tab ? "text-purple-700" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-600" />
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
                            returnMode === mode ? "bg-purple-600 text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TRAILING.map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className={`text-base font-bold font-mono tabular-nums ${t.color}`}>{t.value}</p>
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
                    Generate long-term capital appreciation by investing in a{" "}
                    <b>diversified portfolio of equity and equity-related instruments</b>, while
                    employing <b>limited short exposure through derivatives</b> (up to 25% unhedged)
                    to enhance returns and manage risk efficiently. Benchmarked to{" "}
                    <b>NIFTY 500 TRI</b> — broad-market representation across large, mid and small caps.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    qSIF is Quant Mutual Fund&apos;s first SIF — an equity long-short strategy that
                    blends long-term equity investments with tactical short exposures through
                    derivatives. The long book (80–100%) is built on fundamental + quant screens;
                    the overlay uses stock/index futures and options for defined- or open-risk short
                    structures. Up to 100% of longs may be hedged in defensive regimes.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Per SEBI&apos;s SIF framework (Feb 2025), cumulative gross exposure is capped at{" "}
                    <b>100% of net assets</b>. No leverage beyond that cap.
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
                        <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-purple-700 hover:text-purple-800">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in qSIF Equity</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist. No commitment.</p>
                  <div className="flex gap-2">
                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm">
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
                      <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className={`text-sm font-bold mt-1 font-mono tabular-nums ${p.positive ? "text-green-600" : "text-red-600"}`}>{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
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
                qSIF is built as a <b>long-biased equity core with a tactical short overlay</b>. The
                long book (80–100%) is selected bottom-up using fundamental analysis — growth, valuation,
                competitive moats — supplemented by Quant MF&apos;s VLRT-style quantitative signals. The
                overlay (0–25% unhedged short, plus up to 100% hedged longs) uses index/stock futures
                and options to express bearish single-name views or defensive macro posture.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <p className="text-xs text-purple-700 mb-1">Long equity</p>
                  <p className="text-lg font-bold text-purple-700 font-mono tabular-nums">80–100%</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1">Unhedged short</p>
                  <p className="text-lg font-bold text-rose-700 font-mono tabular-nums">0–25%</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-xs text-blue-700 mb-1">Debt / MM</p>
                  <p className="text-lg font-bold text-blue-700 font-mono tabular-nums">0–20%</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-xs text-emerald-700 mb-1">REITs/InvITs</p>
                  <p className="text-lg font-bold text-emerald-700 font-mono tabular-nums">0–20%</p>
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
                      <span className="text-gray-500 font-mono tabular-nums">{s.range}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${s.color} h-full rounded-full`} style={{ width: s.width }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: qSIF Equity Long-Short ISID (dated 06 August 2025) — quant Money Managers Ltd.
                Weights are indicative; actual allocation varies with market regime.
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
                Cumulative gross exposure capped at 100% of net assets. Hedged equity derivative
                positions may go up to 100% of net assets. Cash / cash equivalents with residual
                maturity &lt;91 days are not treated as creating exposure.
              </p>
            </div>

            {/* Short-derivative strategies */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Short-derivative strategies (indicative)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Strategy</th>
                      <th className="py-3 pl-4 font-semibold">Mechanics & usage</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {SHORT_STRATS.map((s) => (
                      <tr key={s.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-medium whitespace-nowrap">{s.t}</td>
                        <td className="py-3 pl-4 text-gray-500 text-xs leading-relaxed">{s.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Full scenario analysis disclosed in ISID Section II and SAI. Outright shorts
                (futures / synthetic / short call) carry theoretically unlimited loss — managed via
                internally defined risk limits and stop-loss frameworks.
              </p>
            </div>

            {/* Derivative + portfolio rules */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivative exposure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Long non-hedging derivatives: <b>up to 50%</b> of net assets</li>
                  <li>• Unhedged short via derivatives: <b>up to 25%</b> of net assets</li>
                  <li>• Hedged equity derivative positions: <b>up to 100%</b> of net assets</li>
                  <li>• Cumulative gross exposure cap: <b>100% of NAV</b></li>
                  <li>• No investment in Credit Default Swaps</li>
                  <li>• No overseas derivatives</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Debt & ancillary limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Securitised debt: <b>≤10%</b> of debt portfolio</li>
                  <li>• AT1 / Perpetual / Tier-2 & SO/CE debt: <b>≤10%</b> of debt portfolio</li>
                  <li>• TREPS (G-sec / T-bills): <b>≤20%</b> of net assets</li>
                  <li>• Repo in corporate debt: <b>≤10%</b> of net assets</li>
                  <li>• Stock lending: <b>≤20%</b> total, <b>≤5%</b> per broker</li>
                  <li>• Overseas securities: <b>≤20%</b> (pending overseas FM appointment)</li>
                </ul>
              </div>
            </div>

            {/* Holdings disclosure */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> Top-10 holdings and sector allocation are published by
                quant Mutual Fund on its SIF statutory-disclosures page (qsif.com/statutory-disclosures).
                SIFs do not currently publish monthly holdings with the same cadence as regular mutual
                funds; position-level disclosures follow the SEBI SIF framework&apos;s reporting schedule.
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
                qSIF Equity Long-Short is managed by a five-member team spanning <b>equity research
                &amp; portfolio construction</b>, <b>derivatives dealing</b> and <b>debt / treasury</b>.
                Founder &amp; CIO Sandeep Tandon anchors the investment framework with a 33-year
                capital-markets track record; Lokesh Garg and Ankit Pande lead equity selection;
                Sameer Kate runs derivative execution; Sanjeev Sharma manages the debt sleeve.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-purple-700 font-semibold">EQUITY</p>
                  <p className="text-xs text-gray-600 mt-1">Tandon · Garg · Pande</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-3">
                  <p className="text-xs text-rose-700 font-semibold">DERIVATIVES</p>
                  <p className="text-xs text-gray-600 mt-1">Kate</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">DEBT</p>
                  <p className="text-xs text-gray-600 mt-1">Sharma</p>
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
                      <span className={`px-2.5 py-1 rounded-full bg-${m.color}-50 text-xs font-medium text-${m.color}-700 border border-${m.color}-200`}>
                        {m.exp}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                        quant Money Managers Ltd
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Institutional context</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                qsif is the Specialized Investment Fund offered by quant Mutual Fund, managed by
                <b> quant Money Managers Limited</b> with <b>quant Capital Trustee Limited</b> as
                trustee. Registered office: 6th Floor, Sea Breeze Building, Appasaheb Marathe Marg,
                Prabhadevi, Mumbai – 400 025. CEO: Sandeep Tandon. Chief Investor Relations Officer:
                Ms. Sudha Biju.
              </p>
              <p className="text-[11px] text-gray-400">
                qSIF Equity Long-Short is the <b>first</b> investment strategy of qsif. All managers
                have &quot;NA&quot; tenure on SIF strategies prior to this launch — track records are
                carried from their respective Quant MF / broking / institutional roles.
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
                <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Level 5 · Very High
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band Level 5 (on a 1–5 scale) — the highest classification, indicating{" "}
                <b>very high risk</b>. Both the strategy and the NIFTY 500 TRI benchmark carry
                Level 5 risk bands. Product labelling was assigned during NFO on the basis of
                model portfolio characteristics and may be reviewed once the strategy seasons.
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
                    SEBI SIF-mandated gross-exposure cap (100% of NAV), unhedged short cap (25%),
                    overseas cap (20%), stock-lending cap (20% with 5% single-intermediary limit),
                    securitised-debt cap (10% of debt). No CDS. No overseas derivatives.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Internally defined stop-loss and exposure limits for outright short positions.
                    Defined-risk spread structures (bear put spread, long put butterfly/calendar)
                    preferred where appropriate. 30-business-day NFO deployment discipline.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily NAV computation, daily AMFI disclosure before 11 p.m. Portfolio
                    rebalancing within 30 business days in case of passive breaches (extendable
                    to 60 with Investment Committee approval per SEBI Master Circular).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent quant Capital Trustee Ltd, AMC Investment Committee, SEBI periodic
                    disclosures, KFin Technologies as RTA. Segregated-portfolio ability in case of
                    credit events at debt-issuer level.
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
                      <th className="py-3 px-4">qSIF Equity L/S</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None (100% gross)</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Short cap (unhedged)</td><td className="py-3 px-4 font-semibold">25%</td><td className="py-3 pl-4">Unrestricted (subject to PPM)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min investment</td><td className="py-3 px-4 font-semibold text-green-600">₹10L (₹1L accredited)</td><td className="py-3 pl-4">₹1 Cr</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes (typical 20%)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7%</td></tr>
                    <tr><td className="py-3 pr-4">Liquidity</td><td className="py-3 px-4 font-semibold text-green-600">Daily (biz days)</td><td className="py-3 pl-4">Quarterly / lock-up</td></tr>
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
                All documents are hosted on qsif.com. The ISID is dated{" "}
                <b>06 August 2025</b>; NFO ran <b>17 September – 01 October 2025</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, detailed risk factors" },
                  { t: "Portfolio / Statutory disclosures", d: "qsif.com/statutory-disclosures" },
                  { t: "Historic NAV", d: "qsif.com/NAV/historic-Nav-Details.aspx" },
                  { t: "quant Mutual Fund / qsif website", d: "qsif.com" },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-100 p-4 hover:border-purple-200 hover:bg-purple-50/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-purple-700">{d.t}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.d}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-700 shrink-0 mt-0.5" />
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">ISID dated</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">06 August 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opened</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">17 September 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">01 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">08 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer re-opened</td><td className="py-3 pl-4 font-semibold">Within 5 biz days of allotment</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NAV disclosure</td><td className="py-3 pl-4 font-semibold">Every biz day, before 11 p.m.</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Redemption</td><td className="py-3 pl-4 font-semibold">Daily (business days), T+3 settlement</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">TER slabs (SEBI Reg. 52 — equity SIF)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">AUM slab</th>
                      <th className="py-3 px-4 text-right">Max TER</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">First ₹500 Cr</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">2.25%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹250 Cr</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">2.00%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹1,250 Cr</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">1.75%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹3,000 Cr</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">1.60%</td></tr>
                    <tr><td className="py-3 pr-4">Balance AUM</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">1.50%</td></tr>
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
                  <li>• Exit load <b>1.00%</b> if redeemed / switched-out ≤15 days from allotment</li>
                  <li>• <b>Nil</b> exit load after 15 days</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Redemption proceeds dispatched in 3 working days</li>
                  <li>• IDCW payout within 7 working days of record date</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Investment thresholds</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Min NFO / ongoing: <b>₹10,00,000</b> (&amp; multiples of ₹1)</li>
                  <li>• Accredited investors: <b>₹1,00,000</b> minimum</li>
                  <li>• Min additional purchase: <b>₹10,000</b></li>
                  <li>• Min redemption / switch-out: <b>₹1,000</b></li>
                  <li>• SIP / SWP / STP: <b>₹10,000+</b> (min 6 instalments)</li>
                  <li>• Plans: Regular &amp; Direct · Options: Growth &amp; IDCW</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="qsif-equity-long-short" fundName="qSIF Equity Long-Short by Quant MF" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default QsifEquityLongShort;
