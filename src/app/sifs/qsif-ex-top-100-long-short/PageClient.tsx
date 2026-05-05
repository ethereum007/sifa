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
  "isif-ex-top-100": "/sifs/isif/extop100",
  "qsif-ex-top-100-long-short": "/sifs/qsif-ex-top-100-long-short",
};

const FUND = getSifBySlug("qsif-ex-top-100-long-short")!;
const PEER_FUNDS = getPeers("qsif-ex-top-100-long-short");

const AMC_URL = "http://qsif.com/";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useFundNav, formatNavDate } from "@/hooks/useSifNav";

/* ------------------------------------------------------------------ */
/*  Static data for qSIF Ex-Top 100                                    */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Equity Long-Short",
  "Ex-Top 100",
  "Mid & Small Cap",
  "Quant-Driven",
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
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "13 Nov 2025", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Max TER", value: "2.25%", sub: "SEBI cap", color: "" },
];

const INFO_BAR = [
  { label: "AUM", value: "NFO-stage" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "13 Nov 2025" },
  { label: "Redemption", value: "Daily" },
  { label: "SIP", value: "₹10,000+" },
  { label: "Exit Load", value: "1% <15d" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "6M", value: "—" },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "1Y", value: "—" },
  { period: "FYTD", value: fmtPct(FUND.returns.threeMonth) },
  { period: "NAV", value: `₹${FUND.currentNav.toFixed(2)}` },
];

const ALLOCATION_TAGS = [
  "Ex-Top 100 equity 65–100%",
  "Top 100 equity 0–35%",
  "Debt & MM 0–35%",
  "REITs/InvITs 0–20%",
  "Unhedged shorts 0–25%",
  "Long derivatives 0–50%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Quant Mutual Fund" },
  { label: "AMC", value: "quant Money Managers Ltd" },
  { label: "Trustee", value: "quant Capital Trustee Ltd" },
  { label: "Category", value: "Equity Ex-Top 100 L-S" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception date", value: "13 Nov 2025" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.25%" },
  { label: "Exit load", value: "1% <15d, else Nil" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (business days)" },
  { label: "Redemption", value: "Daily (business days)" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "SIP / STP / SWP", value: "₹10,000+ (min 6)" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹1,000" },
  { label: "Listing", value: "Not listed (open-ended)" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 5 · Very High", color: "text-red-600" },
  { label: "Benchmark risk band", value: "Level 5" },
  { label: "Short selling", value: "Derivatives only" },
  { label: "Lock-in period", value: "None" },
  { label: "Segregated portfolio", value: "Allowed" },
];

const PEERS = PEER_FUNDS
  .slice()
  .sort((a, b) => b.returns.sinceInception - a.returns.sinceInception)
  .slice(0, 4)
  .map((f) => ({
    name: f.shortName,
    amc: f.amc,
    ret: fmtPct(f.returns.sinceInception, 1),
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
  }));

const TEAM = [
  { name: "Sandeep Tandon", initials: "ST", role: "Founder & CIO", sleeve: "Equity" },
  { name: "Lokesh Garg", initials: "LG", role: "Fund Manager — Equity", sleeve: "Equity" },
  { name: "Ankit Pande", initials: "AP", role: "Fund Manager — Equity", sleeve: "Equity" },
  { name: "Sameer Kate", initials: "SK", role: "Chief Dealer — Derivatives", sleeve: "Derivatives" },
  { name: "Sanjeev Sharma", initials: "SS", role: "Fund Manager — Debt", sleeve: "Debt" },
];

const SUITABLE = [
  "HNIs seeking concentrated mid & small cap alpha",
  "Investors with 5–7 year horizon",
  "Those comfortable with Level 5 (very high) risk",
  "Replacement for SMID PMS at lower ticket (₹10L)",
];

const NOT_SUITABLE = [
  "Capital-protection / FD-replacement seekers",
  "Investors needing <3 year liquidity",
  "Below ₹10L investable surplus",
  "Low risk-tolerance / first-time equity investors",
];

const PILLARS = [
  { title: "Core — Ex-Top 100 Longs", desc: "65–100% in listed equity outside the top 100 by market cap — focused mid & small cap exposure (SMID)", color: "purple" },
  { title: "Top 100 Sleeve (Optional)", desc: "0–35% in large caps for tactical balance, liquidity management and dampening SMID volatility", color: "violet" },
  { title: "Short Book — Up to 25%", desc: "Unhedged short exposure via stock/index futures & options on overvalued names for alpha and hedging", color: "rose" },
  { title: "Long Derivatives", desc: "Up to 50% long F&O for hedged, partially-hedged and fully-hedged portfolio constructions", color: "indigo" },
  { title: "Debt & REITs Sleeve", desc: "0–35% debt / money market and 0–20% REITs/InvITs for liquidity buffer and cashflow management", color: "emerald" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity — Ex-Top 100 (outside top 100 by mcap)", min: "65%", max: "100%" },
  { t: "Equity — Top 100 by market capitalization", min: "0%", max: "35%" },
  { t: "Debt and money market instruments", min: "0%", max: "35%" },
  { t: "Units of REITs and InvITs", min: "0%", max: "20%" },
  { t: "Unhedged short exposure via derivatives", min: "0%", max: "25%" },
  { t: "Long derivatives (non-hedging)", min: "0%", max: "50%" },
];

const STRATEGY_MIX = [
  { name: "Ex-Top 100 Long (SMID core)", range: "65–100%", width: "82%", color: "bg-purple-500" },
  { name: "Top 100 Long (optional large cap)", range: "0–35%", width: "18%", color: "bg-violet-500" },
  { name: "Unhedged Short (F&O)", range: "0–25%", width: "15%", color: "bg-rose-500" },
  { name: "Debt / Money Market / REITs", range: "0–35%", width: "15%", color: "bg-emerald-500" },
];

const CONSTRUCTION_MODES = [
  { t: "Unhedged long-only", note: "Pure long exposure to SMID universe" },
  { t: "Partially-hedged long", note: "Using index / stock futures or options" },
  { t: "Fully-hedged long", note: "Complete hedging via derivatives" },
  { t: "Long-short — 25% naked shorts", note: "Via stock futures or stock options" },
  { t: "Partially-hedged long-short", note: "25% naked short + partial hedge overlay" },
  { t: "Fully-hedged + 25% short", note: "Market-neutral SMID long-short book" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios (from ISID)                                      */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Sandeep Tandon",
    initials: "ST",
    role: "Founder & Chief Investment Officer, quant Group",
    exp: "33+ yrs",
    bio: "Founder & CIO of the quant Group with 33+ years in Indian capital markets. Career began at GIC Mutual Fund (JV with George Soros), then founding member of IDBI Asset Management. Previously with ICICI Securities (JV JP Morgan), Kotak Securities (JV Goldman Sachs) and REFCO. As CEO of Quant Broking (2008–2018) led proprietary trading with $1bn+ daily turnover across equity arbitrage, volatility arb, pair trading, sectoral and event-driven long-short — no yearly/quarterly aggregate losses over 10 years. MBA in Finance.",
    color: "purple",
  },
  {
    name: "Lokesh Garg",
    initials: "LG",
    role: "Fund Manager — Equity",
    exp: "20+ yrs",
    bio: "Two decades in Indian equities. Most recently Executive Director, UBS India Institutional Equities (post UBS-Credit Suisse merger). Previously Director at Credit Suisse India Institutional Equities covering capital goods and multiple sectors as a top-ranked analyst. Earlier with ICICI Bank Treasury and Infosys. Focus on fundamental long-short idea generation. MBA from IIM Ahmedabad, B.Tech (Gold Medal) from IIT Roorkee, CFA Level III.",
    color: "purple",
  },
  {
    name: "Ankit Pande",
    initials: "AP",
    role: "Fund Manager — Equity",
    exp: "14+ yrs",
    bio: "14+ years in Indian equities plus 3+ years at Infosys Finacle. Thomson Reuters StarMine Award winner for best IT stock picker (2014). Under Sandeep Tandon at Quant Broking developed fundamental long-short ideas including covered calls and protective puts. Also Fund Manager across schemes of quant Mutual Fund with track record of superior risk-adjusted returns. B.E. (Electronics) Pune, MBA from CUHK Hong Kong, CFA Level III, Beta Gamma Sigma lifetime member.",
    color: "violet",
  },
  {
    name: "Sameer Kate",
    initials: "SK",
    role: "Chief Dealer — Derivatives",
    exp: "20+ yrs",
    bio: "20+ years in Indian equities and derivatives dealing. Started career at REFCO (world's largest derivatives group). Spent 16 years at Kotak Securities (JV Goldman Sachs) as Senior Derivatives Sales Trader and advisor to Kotak Proprietary Desk (₹500 Cr+ AUM). Previously Senior Sales Trader at Investec Capital covering equity and derivatives for domestic and foreign institutions. Currently Chief Dealer at quant focused on arbitrage and derivative strategies. MBA (IME Pune), BSc Computer Science.",
    color: "rose",
  },
  {
    name: "Sanjeev Sharma",
    initials: "SS",
    role: "Fund Manager — Debt",
    exp: "20+ yrs",
    bio: "20+ years in equity, debt, fund management and treasury operations. Extensive experience deploying strategies across equity, debt and derivatives. Handles the debt sleeve and treasury operations of the strategy. PGDBA (Finance), M.Com, CerTM (Treasury & Forex Risk).",
    color: "emerald",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Equity Market Risk", d: "SMID (mid & small cap) stocks are materially more volatile than large caps. Ex-Top 100 concentration amplifies drawdowns in broad market selloffs." },
  { t: "Liquidity Risk", d: "Stocks outside the top 100 can face meaningful bid-ask spreads and limited impact cost tolerance — especially during stress periods or redemption pressure." },
  { t: "Derivatives Risk", d: "Up to 25% unhedged short exposure plus up to 50% long derivatives. Leverage amplifies P&L. Short squeeze, delta slippage and margin calls are active risks." },
  { t: "Short-Selling Risk", d: "Naked short positions via stock futures/options carry theoretically unlimited loss. Sized within SEBI 25% cap and managed with strategy-level discipline." },
  { t: "Concentration Risk", d: "65–100% mandate in Ex-Top 100 universe means structural mid/small cap concentration. Correlated drawdowns possible during SMID de-rating cycles." },
  { t: "Benchmark Divergence", d: "Nifty 500 TRI is broad-cap; the fund is SMID-skewed by design. Tracking error and short-term underperformance vs benchmark is expected by construction." },
  { t: "Regulatory / Framework Risk", d: "SIF is a new regulatory category under SEBI Chapter VI-C (Feb 2025 framework). Evolving compliance, disclosure and reporting norms may impact operations." },
  { t: "Credit & Interest-Rate Risk", d: "Debt sleeve up to 35% and REITs/InvITs up to 20%. Credit migration, spread widening and rate volatility can impact NAV stability." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives settle via clearing corp. Securities lending (≤20% NAV, ≤5% per broker) and OTC legs carry counterparty exposure." },
  { t: "Model & Execution Risk", d: "Quant-driven construction and rebalancing depends on factor stability. Market-regime shifts and execution slippage on SMID F&O can erode alpha." },
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

const QsifExTop100Sif = () => {
  const __live = useFundNav("qSIF Ex-Top 100 Long-Short", FUND.currentNav);
  const liveNav = __live.nav;
  const liveDate = formatNavDate(__live.date) || "Apr 30, 2026";
  const METRICS_LIVE = METRICS.map((m, i) =>
    i === 0 ? { ...m, value: `₹${liveNav.toFixed(4)}`, sub: liveDate } : m
  );

  const fundData = getSifBySlug("qsif-ex-top-100-long-short");
  const [activeTab, setActiveTab] = useState<string>("Snapshot");
  const [returnMode, setReturnMode] = useState<"absolute" | "annualised">("absolute");

  return (
    <div className="min-h-screen bg-gray-50">
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
              <a href="/sif-funds-launched" className="hover:text-gray-600">Equity Ex-Top 100</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">qSIF Ex-Top 100</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-sm text-gray-500">Quant Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  qSIF Equity Ex-Top 100 Long-Short Fund
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
              {METRICS_LIVE.map((m, i) => (
                <div
                  key={i}
                  className={`py-4 px-3 sm:px-4 text-center ${i < METRICS_LIVE.length - 1 ? "border-r border-gray-100" : ""}`}
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
                    activeTab === tab ? "text-purple-600" : "text-gray-400 hover:text-gray-600"
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

                {/* EX-TOP 100 HIGHLIGHT — distinctive strategy callout */}
                <div className="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-purple-600 text-white font-black text-xl flex items-center justify-center">
                      Ex-100
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-2">
                        Mandated exposure <span className="text-purple-700">outside the top 100</span> by market cap
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Unlike regular equity long-short funds that invest across all caps, this strategy
                        mandates <b>65–100% in stocks outside the top 100 by market capitalization</b> —
                        a focused mid &amp; small cap SMID exposure. Only <b>0–35%</b> may go into top 100 large caps.
                        Up to <b>25%</b> unhedged short via stock/index derivatives adds directional flexibility.
                      </p>
                    </div>
                  </div>
                </div>

                {/* NAV CHART */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-2xl font-bold text-gray-900">₹{liveNav.toFixed(4)}</span>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {TRAILING.slice(0, 4).map((t) => {
                      const negative = t.value.startsWith("-");
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold ${negative ? "text-red-600" : "text-green-600"}`}>{t.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {TRAILING.slice(4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className="text-base font-bold text-gray-700">{t.value}</p>
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
                    Generate <b>long-term capital appreciation</b> by investing primarily in equity and
                    equity-related instruments of stocks <b>outside the top 100 by market capitalization</b>,
                    while utilizing limited short exposure through derivatives to enhance returns and manage
                    risk. Benchmarked to <b>NIFTY 500 Total Return Index (TRI)</b>. There is no assurance
                    that the investment objective of the strategy will be achieved.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy &amp; allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    The strategy combines a structurally SMID-concentrated long book (mandated 65–100% in
                    ex-top-100 stocks) with up to 25% unhedged short via derivatives, and up to 50% long
                    F&amp;O for hedged / partially-hedged / fully-hedged constructions. An open-ended
                    design offers <b>daily subscription and redemption</b> at NAV.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Taxation: Equity taxation applies — <b>LTCG 12.5%</b> above ₹1.25L after 12 months;
                    <b> STCG 20%</b> for holdings &lt;12 months. 15-day exit load window (1%), nil thereafter.
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
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-purple-600 hover:text-purple-700">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in qSIF Ex-Top 100</h3>
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
                  {PEERS.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {PEERS.map((p) => (
                        <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                          <p className="text-xs text-gray-400">{p.amc}</p>
                          <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                          <p className={`text-sm font-bold mt-1 ${p.ret.startsWith("-") ? "text-red-600" : "text-green-600"}`}>{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">No peer funds launched in this category yet.</p>
                  )}
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
                qSIF Ex-Top 100 is built as a <b>SMID-concentrated long book</b> (65–100% in stocks
                outside the top 100) with a flexible short overlay (up to 25% unhedged via F&amp;O).
                The fund manager may operate the strategy in any of six portfolio-construction modes
                depending on market regime — from pure long-only to fully-hedged long-short.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <p className="text-xs text-purple-700 mb-1">Ex-Top 100 core</p>
                  <p className="text-lg font-bold text-purple-700">65–100%</p>
                </div>
                <div className="rounded-lg bg-violet-50 p-4 text-center">
                  <p className="text-xs text-violet-700 mb-1">Top 100 sleeve</p>
                  <p className="text-lg font-bold text-violet-700">0–35%</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1">Unhedged shorts</p>
                  <p className="text-lg font-bold text-rose-700">0–25%</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-xs text-emerald-700 mb-1">Debt / REITs</p>
                  <p className="text-lg font-bold text-emerald-700">0–35%</p>
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
                Source: qSIF Equity Ex-Top 100 Long-Short Fund ISID (quant Mutual Fund). Weights are
                indicative; actual allocation varies with market regime and construction mode.
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
                Cumulative gross exposure through equity, debt, derivatives, repo and CDS capped at{" "}
                <b>100% of net assets</b> per SEBI SIF framework (Feb 27, 2025) and Master Circular
                clauses 12.24 / 12.25. Securitized debt ≤10% of debt sleeve.
              </p>
            </div>

            {/* Portfolio construction modes */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Six portfolio construction modes</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {CONSTRUCTION_MODES.map((m) => (
                  <div key={m.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-purple-700 mb-1">{m.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{m.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: ISID Part II.A. The fund manager may rotate across these modes to manage
                net-long exposure, volatility and hedge ratios across market regimes.
              </p>
            </div>

            {/* Universe & derivative sleeve */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Investment universe</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>Ex-Top 100</b> listed equity &amp; equity-related instruments</li>
                  <li>• Optional <b>Top 100</b> large caps (≤35%)</li>
                  <li>• Debt &amp; money market instruments (≤35%)</li>
                  <li>• REITs &amp; InvITs (≤20% NAV, ≤10% per issuer)</li>
                  <li>• Overseas securities (≤20% — post dedicated FM appointment)</li>
                  <li>• TREPS on G-Secs / T-Bills (≤20%)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivative &amp; lending limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Unhedged short: <b>≤25%</b> of net assets</li>
                  <li>• Long derivatives (non-hedging): <b>≤50%</b></li>
                  <li>• Hedged positions: up to <b>100%</b> of net assets</li>
                  <li>• No Credit Default Swaps</li>
                  <li>• Stock lending: <b>≤20% NAV</b>, ≤5% per broker</li>
                  <li>• Repo/reverse repo in corporate debt: ≤10% NAV</li>
                </ul>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> Top-10 holdings and sector allocation are published via
                the statutory disclosures page at <b>qsif.com/statutory-disclosures</b>. As a
                new investment strategy, portfolio turnover and historical performance disclosures
                are not yet applicable. Rebalancing window is <b>30 calendar days</b> (active) or
                <b> 30 business days</b> (passive breaches) per SEBI Master Circular.
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
                The strategy is jointly managed across three sleeves — <b>equity long-short</b>,{" "}
                <b>derivatives &amp; arbitrage</b>, and <b>debt &amp; treasury</b>. Led by founder-CIO
                Sandeep Tandon, the team leverages quant&apos;s proprietary <b>VLRT framework</b>
                (Valuation, Liquidity, Risk appetite, Timing) and institutional-grade execution
                infrastructure built during its Quant Broking era.
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
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700 font-semibold">DEBT</p>
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
                      <span className={`px-2.5 py-1 rounded-full bg-${m.color}-50 text-xs font-medium text-${m.color}-700 border border-${m.color}-100`}>
                        {m.exp}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                        quant Money Managers
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Governance &amp; sponsor</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Asset Management Company</p>
                  <p>quant Money Managers Limited, 6th Floor, Sea Breeze Building, Appasaheb Marathe Marg, Prabhadevi, Mumbai – 400 025</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Trustee Company</p>
                  <p>quant Capital Trustee Limited (independent of AMC)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Chief Executive Officer</p>
                  <p>Sandeep Tandon (also CIO)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Website</p>
                  <p>http://qsif.com/</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                The qSIF Ex-Top 100 Equity Long-Short Fund shall not invest in overseas securities
                until the AMC appoints a dedicated overseas fund manager per SEBI Master Circular
                clause 12.19.3.1 (June 27, 2024).
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
                Risk Band Level 5 (on a 1–5 scale) indicates <b>very high</b> risk — the highest SEBI
                tier. Both the fund and its benchmark (Nifty 500 TRI) carry Level 5 risk bands. The
                labelling was assigned during NFO based on model portfolio characteristics and may
                evolve post-launch as actual portfolio realises.
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
                    SEBI-mandated cumulative gross exposure cap (100% of NAV). Unhedged short cap
                    (25%). Stock lending cap (20% NAV, 5% per broker). Single-issuer REIT/InvIT cap
                    (10%). No CDS exposure.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    30-day rebalancing window for active allocation changes; 30 business days for
                    passive breaches. Hedged-position flexibility up to 100% NAV provides
                    volatility management in stressed regimes.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily NAV disclosure on AMFI &amp; AMC SIF website. Portfolio turnover, top-10
                    holdings and sector allocation via statutory disclosures page. Liquidity-risk
                    management tools per SEBI framework.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent Trustee (quant Capital Trustee), AMC Board Risk Committee, SEBI
                    half-yearly &amp; annual disclosures, KFintech RTA reconciliation, and AMC
                    skin-in-the-game investment per SEBI Clause 6.9.
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
                      <th className="py-3 px-4">qSIF Ex-Top 100</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min ticket</td><td className="py-3 px-4 font-semibold text-green-600">₹10 lakh</td><td className="py-3 pl-4">₹1 crore</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None (100% NAV cap)</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Liquidity</td><td className="py-3 px-4 font-semibold text-green-600">Daily NAV, daily redemption</td><td className="py-3 pl-4">Quarterly / lock-in</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes (15–20% over hurdle)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7%</td></tr>
                    <tr><td className="py-3 pr-4">Investor-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Equity LTCG 12.5%</td><td className="py-3 pl-4">Slab / business income</td></tr>
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
                All documents are hosted on the qSIF portal at <b>qsif.com</b>. The strategy is
                operated by quant Money Managers Limited (AMC) under quant Capital Trustee Limited.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Statutory disclosures", d: "Top-10 holdings, sector allocation, turnover" },
                  { t: "NAV history", d: "qsif.com/NAV/historic-Nav-Details.aspx" },
                  { t: "qSIF website", d: "http://qsif.com/" },
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
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 shrink-0 mt-0.5" />
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold">13 November 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer reopened</td><td className="py-3 pl-4 font-semibold">Within 5 business days of allotment</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Listing</td><td className="py-3 pl-4 font-semibold">Not listed (open-ended)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Subscription days</td><td className="py-3 pl-4 font-semibold">Daily (all business days)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption days</td><td className="py-3 pl-4 font-semibold">Daily (all business days)</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Redemption dispatch</td><td className="py-3 pl-4 font-semibold">T+3 working days</td></tr>
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">First ₹500 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.25%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹250 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.00%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹1,250 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.75%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹3,000 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.60%</td></tr>
                    <tr><td className="py-3 pr-4">Balance AUM</td><td className="py-3 pl-4 text-right font-semibold">1.50%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Current Regular plan TER: <b>{FUND.terRegular.toFixed(2)}%</b>. Direct plan TER is
                typically 40–70 bps lower (no distributor commission). Additional: up to 0.05% other
                expenses, up to 0.30% B30 city incentive per SEBI norms.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load <b>1%</b> if redeemed on or before <b>15 days</b> from allotment</li>
                  <li>• <b>Nil</b> exit load after 15 days</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Redemption dispatch: 3 working days</li>
                  <li>• IDCW payment within 7 working days</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Application details</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Min investment: <b>₹10 lakh</b> (₹1 lakh for accredited investors)</li>
                  <li>• Min additional purchase: ₹10,000</li>
                  <li>• Min redemption: ₹1,000</li>
                  <li>• SIP / STP / SWP: ₹10,000+ (min 6 installments)</li>
                  <li>• Modes: ASBA, NSE MFSS, BSEStAR MF, MFU, KFinKart, qsif.com</li>
                  <li>• NFO price: ₹10 per unit</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="qsif-ex-top-100-long-short" fundName="qSIF Ex-Top 100 by Quant" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default QsifExTop100Sif;
