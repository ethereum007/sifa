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

const FUND = getSifBySlug("titanium-hybrid-long-short")!;
const PEER_FUNDS = getPeers("titanium-hybrid-long-short");

const AMC_URL = "https://www.tatamutualfund.com/sif";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data for Titanium                                           */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Hybrid Long-Short",
  "Equity-Tilted (65-75% equity)",
  "Interval Strategy",
  "Derivatives-Enabled",
  "REIT-Eligible",
  "Moderate Risk",
];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Regular · Growth", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "AUM", value: "₹466 Cr", sub: "Feb 28, 2026", color: "" },
];

const INFO_BAR = [
  { label: "AUM", value: "₹466.44 Cr" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "17 Dec 2025" },
  { label: "Redemption", value: "Weekly" },
  { label: "SIP", value: "₹500+" },
  { label: "Exit Load", value: "1.00% <1M" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "Benchmark (1M)", value: "-6.35%" },
  { period: "Category Avg (1M)", value: "-2.76%" },
  { period: "Alpha vs BM", value: "+0.19%" },
  { period: "NAV (Direct)", value: "₹10.1052" },
];

const ALLOCATION_TAGS = [
  "Equity 65–75%",
  "Debt 25–35%",
  "Hedged derivatives 0–75%",
  "Unhedged shorts 0–25%",
  "REITs/InvITs 0–10%",
  "Cumulative gross ≤100%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Tata Asset Management" },
  { label: "Category", value: "Hybrid Long-Short SIF" },
  { label: "Type", value: "Interval (weekly)" },
  { label: "Inception date", value: "17 Dec 2025" },
  { label: "AUM", value: "₹466.44 Cr" },
  { label: "Benchmark", value: "CRISIL Hybrid 50+50 Moderate TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "TER (Direct)", value: "0.56%" },
  { label: "Exit load", value: "1.00% <1M" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Weekly (one day)" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "SIP / STP / SWP", value: "₹500+" },
  { label: "Min additional", value: "₹1,000" },
  { label: "Min redemption", value: "₹500" },
];

const RISK = [
  { label: "Fund risk band", value: "Level 3 · Moderate", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Level 4" },
  { label: "Short selling", value: "Derivatives only" },
  { label: "Lock-in period", value: "None" },
  { label: "Notice period", value: "Nil (max 15 days allowed)" },
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
  { name: "Suraj Nanda", initials: "SN", role: "Equity Fund Manager", sleeve: "Equity" },
  { name: "Amit Somani", initials: "AS", role: "Fund Manager — Fixed Income", sleeve: "Debt" },
  { name: "Hasmukh Devji Vishariya", initials: "HV", role: "Fund Manager — Overseas", sleeve: "Overseas" },
];

const SUITABLE = [
  "Investors seeking medium-to-long-term capital appreciation",
  "Comfortable with an equity-tilted hybrid (65–75% equity)",
  "Able to park ≥₹10L surplus for 3+ year horizon",
  "Post-tax return seekers (LTCG 12.5% after 24M on non-equity; 12.5% after 12M on equity)",
];
const NOT_SUITABLE = [
  "Capital-protection seekers (equity-heavy — 1M drawdown was -6.16%)",
  "Investors needing daily liquidity",
  "Short-term traders chasing arbitrage-style low-vol",
  "Below ₹10L investable surplus",
];

const PILLARS = [
  { title: "Core — Equity (65–75%)", desc: "Large-cap tilted long book (~33% large, ~9% mid, ~7% small) across banks, telecom, petroleum, industrials and autos.", color: "blue" },
  { title: "Core — Fixed Income (25–35%)", desc: "Short-duration debt — NCDs/bonds, G-secs, T-bills and money-market. Modified duration 0.66 yrs, YTM 6.04%.", color: "indigo" },
  { title: "Derivative Overlay — Hedged", desc: "Index/stock futures and options used for cash-future arbitrage, covered calls, protective puts. Up to 75% hedged exposure.", color: "cyan" },
  { title: "Enhancer — Unhedged Shorts", desc: "Short derivatives up to 25% of net assets for tactical directional views and portfolio hedging.", color: "amber" },
  { title: "Risk — Structural Guardrails", desc: "SEBI-mandated 100% cumulative gross exposure cap; ≥₹10L minimum ticket; interval structure on redemption; no leverage beyond regulatory caps.", color: "rose" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data — sourced from Feb 28, 2026 factsheet           */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity and equity-related instruments", min: "65%", max: "75%" },
  { t: "Hedged derivatives (futures, options, covered calls)", min: "0%", max: "75%" },
  { t: "Unhedged short derivatives", min: "0%", max: "25%" },
  { t: "Debt and money market instruments (incl. FI derivatives)", min: "25%", max: "35%" },
  { t: "Units issued by REITs and InvITs", min: "0%", max: "10%" },
];

const LIVE_ALLOC = [
  { name: "Cash Equity (listed)", pct: 48.5, color: "bg-blue-500" },
  { name: "Money Market Instruments", pct: 17.01, color: "bg-indigo-500" },
  { name: "Repo", pct: 16.11, color: "bg-sky-500" },
  { name: "NCDs / Bonds / ZCB", pct: 9.68, color: "bg-cyan-500" },
  { name: "Index / Stock Futures", pct: 5.98, color: "bg-emerald-500" },
  { name: "Cash & Net Current Assets", pct: 4.40, color: "bg-slate-400" },
  { name: "Government Securities", pct: 2.20, color: "bg-teal-500" },
  { name: "REIT Units", pct: 2.20, color: "bg-amber-500" },
  { name: "Index / Stock Options", pct: -0.11, color: "bg-rose-400" },
];

const TOP_HOLDINGS = [
  { name: "HDFC Bank Ltd.", pct: 4.00, sector: "Banks" },
  { name: "ICICI Bank Ltd.", pct: 3.99, sector: "Banks" },
  { name: "Reliance Industries Ltd.", pct: 2.54, sector: "Petroleum Products" },
  { name: "Larsen & Toubro Ltd.", pct: 2.29, sector: "Construction" },
  { name: "Omnitech Engineering Ltd.", pct: 2.14, sector: "Industrial Products" },
  { name: "Mahindra & Mahindra Ltd.", pct: 1.89, sector: "Automobiles" },
  { name: "Sun Pharmaceutical Industries Ltd.", pct: 1.49, sector: "Pharma" },
  { name: "Tata Communications Ltd.", pct: 1.37, sector: "Telecom Services" },
  { name: "NTPC Ltd.", pct: 1.35, sector: "Power" },
  { name: "ITC Ltd.", pct: 1.34, sector: "FMCG" },
];

const SECTORS = [
  { name: "Banks", pct: 11.37 },
  { name: "Telecom Services", pct: 3.38 },
  { name: "Petroleum Products", pct: 3.18 },
  { name: "Industrial Products", pct: 2.61 },
  { name: "Automobiles", pct: 2.55 },
  { name: "Construction", pct: 2.29 },
  { name: "Insurance", pct: 2.29 },
  { name: "Cement & Cement Products", pct: 2.01 },
  { name: "Oil", pct: 1.58 },
  { name: "Healthcare Services", pct: 1.55 },
  { name: "Others", pct: 15.69 },
];

const MARKET_CAP = [
  { name: "Large Cap", pct: 32.93, color: "bg-blue-500" },
  { name: "Mid Cap", pct: 8.77, color: "bg-indigo-500" },
  { name: "Small Cap", pct: 6.80, color: "bg-cyan-500" },
  { name: "REIT Units", pct: 2.20, color: "bg-amber-500" },
];

const DEBT_QUALITY = [
  { name: "AAA and Equivalent", pct: 16.01, color: "bg-emerald-500" },
  { name: "SOV (Government)", pct: 8.60, color: "bg-teal-500" },
  { name: "AA", pct: 4.28, color: "bg-amber-500" },
  { name: "Cash & Others", pct: 20.51, color: "bg-slate-400" },
];

const DEBT_STATS = [
  { label: "Yield to Maturity (YTM)", value: "6.04%" },
  { label: "Modified Duration", value: "0.66 yrs" },
  { label: "Average Maturity", value: "0.77 yrs" },
  { label: "Macaulay Duration", value: "0.69 yrs" },
  { label: "Portfolio Turnover (equity)", value: "0.72×" },
  { label: "Gross Equity Exposure", value: "50.70%" },
  { label: "Net Equity Exposure", value: "56.57%" },
  { label: "Options Premium (net)", value: "-0.11%" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios — sourced from ISID (p. 26-27)                   */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Suraj Nanda",
    initials: "SN",
    role: "Fund Manager — Equity Sleeve",
    exp: "10+ yrs",
    bio: "Joined Tata Asset Management on 16 August 2025 as Fund Manager reporting to the Chief Investment Officer. Previously with ICICI Prudential Asset Management from May 2016 to June 2025 as Fund Manager, reporting to the Head of AIF (Long-Short Fund). PGDM (Finance) and Bachelor in Electronics. Age 36.",
    color: "blue",
  },
  {
    name: "Amit Somani",
    initials: "AS",
    role: "Fund Manager — Fixed Income Sleeve",
    exp: "23+ yrs",
    bio: "With Tata Asset Management since September 2012, reporting to Head of Fixed Income. Previously Credit Analyst at Tata AMC (Jun 2010 – Aug 2012). Earlier stints at Canara Robeco AMC (2008–2010) as Fund Manager and at Edelweiss Securities as Senior Manager (2006–2008). B.Com, PGDBM, CFA. Age 46.",
    color: "indigo",
  },
  {
    name: "Hasmukh Devji Vishariya",
    initials: "HV",
    role: "Fund Manager — Overseas Investments & Research",
    exp: "7+ yrs",
    bio: "With Tata Asset Management since March 2024 (Fund Manager from March 2025), responsible for IT, Internet, Telecom and Media sector coverage and overseas allocations, reporting to the CIO — Equities. Previously at Star Union Dai-Ichi Life Insurance as Research Analyst (2019–2024) covering IT, Consumer and Building Materials. Chartered Accountant. Age 29.",
    color: "emerald",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Equity Market Risk", d: "Equity sleeve runs at 65–75% — materially higher than arbitrage-heavy peers. The March 2026 equity drawdown pulled NAV down 2.73% in a single month and the fund is down -4.19% since inception." },
  { t: "Derivatives Risk", d: "Options/futures are leveraged — small moves can amplify gains or losses. Options premium paid/written can lose value; futures exposure is covered via <91-day T-bills per SEBI." },
  { t: "Short-Selling Risk", d: "Unhedged short derivatives up to 25% of net assets can face unlimited theoretical loss if the underlying rises sharply. Single-intermediary non-exchange cap of 5% of net assets." },
  { t: "Interest-Rate & Duration Risk", d: "Debt sleeve modified duration is only 0.66 years — low sensitivity — but reinvestment risk is elevated in a falling-rate regime. YTM 6.04%." },
  { t: "Credit & Default Risk", d: "Debt book skew: AAA/equivalent 16.01%, SOV 8.60%, AA 4.28%. Credit migration on the AA sleeve or spread widening can impact NAV." },
  { t: "Liquidity & Interval Risk", d: "Redemption only on a designated weekly day with T+3 settlement. Not a daily-liquid product. AMC may impose up to 15-day notice periods." },
  { t: "Concentration Risk", d: "Top 10 equity names aggregate ~22.4% of net equity. Banks sector alone is 11.37%. Single-stock caps per SEBI limits." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives and CCIL-settled repos mitigate. DVP settlement and rated counterparties for OTC exposures." },
  { t: "Overseas Investment Risk", d: "Permitted overseas allocations subject to FX, regulatory and country-specific risks. Managed by a dedicated fund manager (Vishariya)." },
  { t: "Model & Execution Risk", d: "Interval-based subscription/redemption cycles require careful cash planning. Covered-call and hedge sizing depends on volatility regime." },
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

const TitaniumSif = () => {
  const fundData = getSifBySlug("titanium-hybrid-long-short");
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
              <span className="text-gray-600">Titanium</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-700" />
                    <span className="text-sm text-gray-500">Tata Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Titanium Hybrid Long-Short Fund
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
                  <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
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
                    activeTab === tab ? "text-blue-700" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-700" />
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
                    <span className={`text-sm font-semibold font-mono tabular-nums ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
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
                    <h3 className="text-base font-bold text-gray-900">Trailing returns & benchmarks</h3>
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                      {(["absolute", "annualised"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setReturnMode(mode)}
                          className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                            returnMode === mode ? "bg-blue-700 text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {TRAILING.slice(0, 4).map((t) => {
                      const num = parseFloat(t.value.replace("%", "").replace("₹", ""));
                      const cls = isNaN(num) ? "text-gray-700" : num >= 0 ? "text-green-600" : "text-red-600";
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold font-mono tabular-nums ${cls}`}>{t.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TRAILING.slice(4).map((t) => {
                      const num = parseFloat(t.value.replace("%", "").replace("₹", ""));
                      const cls = t.period.includes("NAV") ? "text-gray-700" : num >= 0 ? "text-green-600" : "text-red-600";
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold font-mono tabular-nums ${cls}`}>{t.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">
                    Returns as of Apr 30, 2026 (NAV data) / Feb 28, 2026 (factsheet). Fund is <b>&lt;1 year old</b> — SEBI does not permit annualised returns until completion of one year.
                  </p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    An <b>interval investment strategy</b> investing in equity and debt securities, including{" "}
                    <b>limited short exposure in equity and debt through derivatives</b>. The strategy seeks
                    medium-to-long-term capital appreciation by combining a core long-equity book
                    (65–75%) with a short-duration fixed-income sleeve and a derivative overlay for hedging
                    and enhancement. Benchmarked to <b>CRISIL Hybrid 50+50 Moderate Index (TRI)</b>.
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
                    Titanium is Tata AMC&apos;s maiden SIF — an <b>equity-tilted hybrid</b> positioned
                    between traditional aggressive hybrid funds and pure long-short strategies. Unlike
                    arbitrage-heavy peers (Altiva, Magnum), Titanium runs 65–75% directional equity with
                    derivatives used primarily for hedging (covered calls, protective puts, cash-future
                    arbitrage) and selectively for unhedged short positions (up to 25% of net assets).
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Taxation: Equity-oriented treatment likely given ≥65% equity — <b>12.5% LTCG after 12M</b>{" "}
                    on equity, with short-term gains at 20%. Debt sleeve gains taxed at slab (STCG) or
                    12.5% (LTCG after 24M) as applicable.
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-blue-700 hover:text-blue-800">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Titanium</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist. No commitment.</p>
                  <div className="flex gap-2">
                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm">
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
                        <p className={`text-sm font-bold font-mono tabular-nums mt-1 ${parseFloat(p.ret) >= 0 ? "text-green-600" : "text-red-600"}`}>
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

            {/* Portfolio construction approach */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Titanium is built as a <b>directional equity long + overlays</b> architecture. The core
                (~65–75%) is a long-only large-cap-tilted equity book with sector diversification. The
                debt sleeve (25–35%) provides income stability at short duration. A derivative overlay
                — index/stock futures and options — is used for cash-future arbitrage, covered calls,
                protective puts and up to 25% unhedged shorts for tactical hedging.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-xs text-blue-700 mb-1">Equity core</p>
                  <p className="text-lg font-bold text-blue-700 font-mono tabular-nums">65–75%</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Fixed income</p>
                  <p className="text-lg font-bold text-indigo-700 font-mono tabular-nums">25–35%</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-xs text-emerald-700 mb-1">Hedged deriv.</p>
                  <p className="text-lg font-bold text-emerald-700 font-mono tabular-nums">0–75%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">Unhedged shorts</p>
                  <p className="text-lg font-bold text-amber-700 font-mono tabular-nums">0–25%</p>
                </div>
              </div>
            </div>

            {/* LIVE ALLOCATION (factsheet) */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Live asset allocation (28 Feb 2026)</h3>
              <div className="space-y-3">
                {LIVE_ALLOC.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{s.name}</span>
                      <span className="text-gray-500 font-mono tabular-nums">{s.pct.toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${s.color} h-full rounded-full`} style={{ width: `${Math.max(0, s.pct) * 1.5}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: Titanium factsheet dated 28 February 2026. Gross equity exposure 50.70%, net equity exposure 56.57%. Index/stock futures exposure covered via &lt;91-day T-bills.
              </p>
            </div>

            {/* SEBI asset allocation band */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">SEBI-filed asset allocation (% of net assets)</h3>
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
                Source: Titanium ISID (Section II — Asset Allocation Pattern, p. 10). Cumulative gross exposure capped at 100% of net assets per SEBI Master Circular clause 12.24.1.
              </p>
            </div>

            {/* TOP HOLDINGS */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Top 10 net equity holdings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Company</th>
                      <th className="py-3 px-4 font-semibold">Sector</th>
                      <th className="py-3 pl-4 font-semibold text-right">% AUM</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {TOP_HOLDINGS.map((h) => (
                      <tr key={h.name} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{h.name}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{h.sector}</td>
                        <td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">{h.pct.toFixed(2)}%</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="py-3 pr-4 font-bold">Top 10 total</td>
                      <td className="py-3 px-4"></td>
                      <td className="py-3 pl-4 text-right font-bold font-mono tabular-nums text-blue-700">
                        {TOP_HOLDINGS.reduce((a, b) => a + b.pct, 0).toFixed(2)}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">Source: Titanium factsheet 28 Feb 2026 — Top 10 Net Equity Allocation.</p>
            </div>

            {/* SECTOR ALLOCATION */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Sector allocation</h3>
              <div className="space-y-2.5">
                {SECTORS.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-700 font-medium">{s.name}</span>
                      <span className="text-gray-500 font-mono tabular-nums">{s.pct.toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${s.pct * 5}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MARKET CAP + DEBT QUALITY */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Equity by market cap</h3>
                <div className="space-y-3">
                  {MARKET_CAP.map((m) => (
                    <div key={m.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700 font-medium">{m.name}</span>
                        <span className="text-gray-500 font-mono tabular-nums">{m.pct.toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className={`${m.color} h-full rounded-full`} style={{ width: `${m.pct * 2.5}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-4">Debt by rating / cash</h3>
                <div className="space-y-3">
                  {DEBT_QUALITY.map((m) => (
                    <div key={m.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-700 font-medium">{m.name}</span>
                        <span className="text-gray-500 font-mono tabular-nums">{m.pct.toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className={`${m.color} h-full rounded-full`} style={{ width: `${m.pct * 3.5}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PORTFOLIO STATS */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Debt & portfolio quantitative indicators</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {DEBT_STATS.map((d) => (
                  <div key={d.label} className="rounded-lg bg-gray-50 p-3">
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider">{d.label}</p>
                    <p className="text-base font-bold text-gray-900 font-mono tabular-nums mt-1">{d.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: Titanium factsheet 28 Feb 2026. Standard Deviation, Sharpe, Beta, R² and Treynor
                not yet available — ratios require 3 years of monthly data (fund inception: 17 Dec 2025).
              </p>
            </div>

            {/* DERIVATIVE USAGE */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivative usage</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Index / stock futures: <b className="font-mono tabular-nums">5.98%</b> of AUM</li>
                  <li>• Index / stock options (net): <b className="font-mono tabular-nums">-0.11%</b></li>
                  <li>• Hedged derivative headroom: up to <b>75%</b> of net assets</li>
                  <li>• Unhedged shorts allowed: up to <b>25%</b> of net assets</li>
                  <li>• Futures exposure covered via &lt;91-day T-bills per SEBI</li>
                  <li>• Single-intermediary non-exchange cap: <b>5%</b> of net assets</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Concentration & limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Top holding: <b className="font-mono tabular-nums">HDFC Bank 4.00%</b></li>
                  <li>• Top sector: <b className="font-mono tabular-nums">Banks 11.37%</b></li>
                  <li>• Large-cap tilt: <b className="font-mono tabular-nums">32.93%</b> large · 8.77% mid · 6.80% small</li>
                  <li>• REITs/InvITs allowed up to <b>10%</b> (currently 2.20%)</li>
                  <li>• Cumulative gross exposure capped at <b>100%</b> of net assets</li>
                  <li>• Portfolio turnover (equity only): <b className="font-mono tabular-nums">0.72×</b></li>
                </ul>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> Titanium publishes a monthly factsheet with top-10 net equity
                holdings, sector allocation and market-cap bands — one of the more transparent SIFs in
                the hybrid long-short category. Position-level debt holdings (issuer-wise) are aggregated
                by rating. Full scheme portfolio is disclosed to the regulator.
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
                Titanium is jointly managed across three sleeves — <b>equity</b>, <b>fixed income</b>,
                and <b>overseas investments</b>. The team sits within Tata Asset Management&apos;s
                broader investment platform, one of the largest AMCs in India with a deep equity and
                credit research desk. All three managers have been managing the strategy since inception
                (17 December 2025).
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">EQUITY</p>
                  <p className="text-xs text-gray-600 mt-1">Nanda</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">DEBT</p>
                  <p className="text-xs text-gray-600 mt-1">Somani</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700 font-semibold">OVERSEAS</p>
                  <p className="text-xs text-gray-600 mt-1">Vishariya</p>
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
                        Tata Asset Management
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                        Managing since 17 Dec 2025
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">About Tata Asset Management</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tata Asset Management Private Limited is the investment manager for Tata Mutual Fund,
                among India&apos;s oldest and most established asset managers. The AMC operates under
                the trusteeship of Tata Trustee Company Limited. Titanium Hybrid Long-Short Fund is
                Tata AMC&apos;s debut product in the SEBI-regulated Specialized Investment Fund
                category, launched under the SIF regulatory framework notified on 27 February 2025.
              </p>
              <p className="text-[11px] text-gray-400 mt-4">
                Sponsor: Tata Sons Private Limited. Trustee: Tata Trustee Company Limited.
                Custodian and RTA details in SAI.
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
                <h3 className="text-base font-bold text-gray-900">Fund Risk Band (Risk-o-meter)</h3>
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Level 3 · Moderate
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                The fund is labelled <b>Risk Band Level 3</b> (on a 1–5 scale) — indicating{" "}
                <b>moderate</b> risk. Interestingly, the benchmark (CRISIL Hybrid 50+50 Moderate Index
                TRI) carries a <b>higher Level 4</b> risk band, reflecting the benchmark&apos;s
                unhedged equity content vs. Titanium&apos;s ability to partially hedge via derivatives.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="rounded-lg bg-white border border-amber-100 p-4">
                  <p className="text-xs text-gray-500 mb-1">Titanium fund</p>
                  <p className="text-sm font-bold text-amber-700">Risk Band Level 3</p>
                  <p className="text-[11px] text-gray-400 mt-1">Moderate — partial derivative hedge</p>
                </div>
                <div className="rounded-lg bg-white border border-red-100 p-4">
                  <p className="text-xs text-gray-500 mb-1">Benchmark (CRISIL Hybrid 50+50 Moderate TRI)</p>
                  <p className="text-sm font-bold text-red-700">Risk Band Level 4</p>
                  <p className="text-[11px] text-gray-400 mt-1">Moderately high — unhedged composite</p>
                </div>
              </div>
            </div>

            {/* SIFPrime scores - scenario */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Scenario analysis — March 2026 equity drawdown</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                March 2026 delivered a sharp equity-market pullback. Titanium&apos;s equity-tilted structure
                meant limited downside protection relative to arbitrage-heavy peers, but the derivative
                overlay did cushion losses vs. the benchmark.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Metric</th>
                      <th className="py-3 px-4 text-right">Titanium</th>
                      <th className="py-3 px-4 text-right">Benchmark</th>
                      <th className="py-3 pl-4 text-right">Category avg</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 font-mono tabular-nums">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">1M return</td><td className="py-3 px-4 text-right text-red-600 font-semibold">-6.16%</td><td className="py-3 px-4 text-right text-red-600">-6.35%</td><td className="py-3 pl-4 text-right text-red-600">-2.76%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">Alpha vs benchmark</td><td className="py-3 px-4 text-right text-green-600 font-semibold">+0.19%</td><td className="py-3 px-4 text-right">—</td><td className="py-3 pl-4 text-right">—</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">vs category average</td><td className="py-3 px-4 text-right text-red-600 font-semibold">-3.40%</td><td className="py-3 px-4 text-right">—</td><td className="py-3 pl-4 text-right">—</td></tr>
                    <tr><td className="py-3 pr-4 font-sans">Capital protected</td><td className="py-3 px-4 text-right font-semibold">3.0%</td><td className="py-3 px-4 text-right">—</td><td className="py-3 pl-4 text-right">—</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Among 6 hybrid long-short SIFs, Titanium ranked at the higher end of drawdown — a
                function of its equity-heavy (65–75%) mandate rather than poor execution. Investors
                seeking downside protection may prefer arbitrage-core peers; Titanium is positioned
                for investors comfortable with equity-like risk in exchange for equity-like upside.
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
                    SEBI-mandated cumulative gross exposure cap (100% of net assets), unhedged short cap (25%),
                    ≥₹10L minimum investment threshold, weekly interval redemption to avoid forced selling.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Short-duration debt book (modified duration 0.66 yrs) limits rate risk. Derivative
                    exposure covered via &lt;91-day T-bills per AMFI clarification (Nov 2021).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily exposure, factor and liquidity monitoring via Tata AMC&apos;s risk desk.
                    Liquidity-risk management tools as per SEBI liquidity framework.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent Trustee (Tata Trustee Company), AMC Board Risk Committee, SEBI
                    quarterly/annual disclosures, and RTA (Computer Age Management Services) reconciliation.
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
                      <th className="py-3 px-4">Titanium SIF</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Minimum ticket</td><td className="py-3 px-4 font-semibold text-green-600">₹10L</td><td className="py-3 pl-4">₹1 Cr</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes (typical 20% over hurdle)</td></tr>
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
                All Titanium fund documents are available via Tata AMC&apos;s SIF portal.
                The latest factsheet is dated <b>28 February 2026</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — 80+ pages including asset allocation and risk factors" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, taxation, AMC-level disclosures" },
                  { t: "Monthly factsheet (Feb 2026)", d: "Holdings, sector allocation, portfolio stats" },
                  { t: "Titanium one-pager", d: "Strategy summary and key facts" },
                  { t: "Tata AMC SIF website", d: "tatamutualfund.com/sif" },
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
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-700 shrink-0 mt-0.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Key dates & operational timeline</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO period</td><td className="py-3 pl-4 font-semibold">Nov – Dec 2025 (max 15 days open)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Cheque cut-off</td><td className="py-3 pl-4 font-semibold">08 December 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold">17 December 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Inception NAV</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">₹10.0029 (Regular)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Latest factsheet</td><td className="py-3 pl-4 font-semibold">28 February 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption cadence</td><td className="py-3 pl-4 font-semibold">Weekly (one designated day)</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Notice period</td><td className="py-3 pl-4 font-semibold">Nil currently; up to 15 working days may be imposed</td></tr>
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
                      <th className="py-3 pr-4">Plan</th>
                      <th className="py-3 px-4 text-right">Current TER</th>
                      <th className="py-3 pl-4 text-right">Max TER (Reg 52(6)(c))</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 font-mono tabular-nums">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">Regular Plan</td><td className="py-3 px-4 text-right font-semibold">2.36%</td><td className="py-3 pl-4 text-right">Up to 2.25%*</td></tr>
                    <tr><td className="py-3 pr-4 font-sans">Direct Plan</td><td className="py-3 px-4 text-right font-semibold">0.56%</td><td className="py-3 pl-4 text-right">Regular − distributor fee</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                *Regular Plan TER of 2.36% includes GST, base TER and additional expenses per Reg 52(6A)(c).
                Direct Plan is ~180 bps lower — materially cheaper for self-directed investors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load <b>1.00%</b> if redeemed / switched-out ≤1 month from allotment</li>
                  <li>• <b>Nil</b> exit load after 1 month</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Dispatch of redemption proceeds: within 3 working days (T+3)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Investment amounts</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Minimum application: <b>₹10 lakh</b> (SIF regulatory floor)</li>
                  <li>• Minimum additional purchase: <b>₹1,000</b> and multiples of ₹1</li>
                  <li>• Minimum redemption/switch-out: <b>₹500</b> and multiples of ₹1</li>
                  <li>• SIP / STP / SWP: <b>₹500+</b></li>
                  <li>• Subscription: <b>daily</b> (continuous offer)</li>
                  <li>• Post-withdrawal minimum balance: <b>₹10 lakh</b></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="titanium-hybrid-long-short" fundName="Titanium SIF by Tata" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default TitaniumSif;
