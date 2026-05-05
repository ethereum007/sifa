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

const FUND = getSifBySlug("magnum-hybrid-long-short")!;
const PEER_FUNDS = getPeers("magnum-hybrid-long-short");

const AMC_URL = "https://www.sbimf.com/magnumsif";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useFundNav, formatNavDate } from "@/hooks/useSifNav";
/* ------------------------------------------------------------------ */
/*  Static data for Magnum (sourced from SID dated 23 Sep 2025)       */
/* ------------------------------------------------------------------ */

const TAGS = ["Hybrid Long-Short", "Arbitrage", "Covered Calls", "Interval Strategy", "Level 2 Risk", "SBI Magnum"];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";
const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Apr 30, 2026", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Risk Band", value: "Level 2", sub: "AMFI", color: "text-amber-600" },
];

const INFO_BAR = [
  { label: "AUM", value: "Disclosed monthly" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "29 Oct 2025" },
  { label: "Redemption", value: "Mon & Thu" },
  { label: "SIP", value: "Daily+" },
  { label: "Exit Load", value: "0.50% ≤15d" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "6M", value: fmtPct(FUND.returns.sinceInception) },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
];

const ALLOCATION_TAGS = [
  "Equity 65–75%", "Hedged 0–75%", "Unhedged short 0–25%", "Debt 25–35%", "REITs/InvITs 0–10%", "Overseas ≤35%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "SBI Mutual Fund" },
  { label: "Category", value: "Hybrid Long-Short" },
  { label: "Type", value: "Interval" },
  { label: "Inception date", value: "29 Oct 2025" },
  { label: "NFO window", value: "01–15 Oct 2025" },
  { label: "Benchmark", value: "Nifty 50 Hybrid 50:50 TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Face value", value: "₹10" },
  { label: "Exit load", value: "0.50% ≤15d · 0.25% ≤1M" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Mon & Thu" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "SIP / STP / SWP", value: "Daily+ available" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹1,00,000" },
  { label: "Listing", value: "NSE & BSE (demat)" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 2 · Moderate", color: "text-amber-600" },
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
  { name: "Gaurav Mehta", initials: "GM", role: "Head — SIF Equity", sleeve: "Equity" },
  { name: "Dinesh Balachandran", initials: "DB", role: "Head of Research", sleeve: "Equity" },
  { name: "Mansi Sajeja", initials: "MS", role: "Fund Manager — Fixed Income", sleeve: "Debt" },
];

const SUITABLE = [
  "Accredited / HNI investors with ≥₹10L surplus",
  "Seeking regular income + capital appreciation",
  "Post-tax alternative to Cat-III AIF long-short",
  "3+ year horizon, moderate risk appetite",
];
const NOT_SUITABLE = [
  "Investors needing daily liquidity",
  "Below ₹10L investable surplus (SEBI PAN threshold)",
  "Guaranteed return seekers",
  "Short-term traders / leverage chasers",
];

const PILLARS = [
  { title: "Core — Equity 65–75%", desc: "Equity and equity-related instruments — hedged (cash-future arbitrage, covered calls) or unhedged long exposure", color: "blue" },
  { title: "Core — Debt 25–35%", desc: "Debt and money market instruments including units of debt oriented MF schemes for accrual and liquidity management", color: "indigo" },
  { title: "Income — Covered Calls", desc: "Writing call options on equity longs to earn premium income — hedged derivative strategy", color: "cyan" },
  { title: "Alpha — Unhedged Shorts", desc: "Up to 25% of net assets via naked derivatives (short futures/puts) for directional alpha and portfolio hedging", color: "emerald" },
  { title: "Risk — SEBI framework", desc: "Cumulative gross exposure ≤100% NAV, options premium paid ≤20%, SEBI single-issuer & sector caps strictly enforced", color: "rose" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity & equity-related instruments", min: "65%", max: "75%" },
  { t: "— Hedged (cash-future arbitrage, covered calls, protective puts)", min: "0%", max: "75%" },
  { t: "— Unhedged (short derivatives for non-hedging)", min: "0%", max: "25%" },
  { t: "Debt & money market instruments (incl. debt MF units)", min: "25%", max: "35%" },
  { t: "Units issued by REITs and InvITs", min: "0%", max: "10%" },
  { t: "Overseas securities (ADR/GDR/foreign equity & debt)", min: "0%", max: "35%" },
  { t: "Securities lending", min: "0%", max: "20% of net assets" },
  { t: "Repo in corporate debt", min: "0%", max: "10% of net assets" },
];

const STRATEGY_MIX = [
  { name: "Equity Hedged (Arbitrage + Covered Calls)", range: "35–60%", width: "55%", color: "bg-blue-500" },
  { name: "Debt & Money Market (core accrual)", range: "25–35%", width: "32%", color: "bg-indigo-500" },
  { name: "Equity Unhedged (Directional long)", range: "10–25%", width: "22%", color: "bg-cyan-500" },
  { name: "Unhedged Shorts (Naked derivatives)", range: "0–25%", width: "15%", color: "bg-emerald-500" },
];

const SPECIAL_SITS = [
  { t: "Cash-Futures Arbitrage", window: "Rolling", note: "Lock spread between spot & futures; low-risk income core" },
  { t: "Covered Calls", window: "Monthly expiry", note: "Write calls against equity longs to earn option premium" },
  { t: "Dividend Arbitrage", window: "Event-driven", note: "Capture dividend-date spread between spot & futures" },
  { t: "Merger / Demerger Arbitrage", window: "4–12 months", note: "Spread capture post announcement" },
  { t: "Buyback / Tender", window: "4–6 months", note: "Tender route post board approval" },
  { t: "Short Derivatives", window: "Tactical", note: "Up to 25% naked shorts for directional alpha / hedge" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Gaurav Mehta",
    initials: "GM",
    role: "Head — SIF Equity · Fund Manager",
    exp: "19+ yrs",
    bio: "Head of SIF Equity at SBI Funds Management Limited. Joined SBIFML in November 2018 as Equity Analyst; appointed Fund Manager for schemes of SBI Mutual Fund and later CIO – Alternatives Equity (October 2021). Managed SBI Optimal Equity Fund, a long-short Cat III AIF, for nearly three years. Previously Portfolio Manager at Ambit Investment Advisors, equity research analyst at Ambit Capital's Institutional Equities, and started his career at Edelweiss Capital in May 2006. PGDM from IIM Lucknow; B.Tech from IIT Bombay; CFA Charterholder (CFA Institute, USA).",
    color: "blue",
  },
  {
    name: "Dinesh Balachandran",
    initials: "DB",
    role: "Head of Research · SBI Funds Management",
    exp: "Equity research",
    bio: "Supporting fund management via deep-dive sector research and bottom-up stock selection framework. Part of SBI's institutional research platform anchoring the long sleeve stock picks for the Magnum strategy.",
    color: "indigo",
  },
  {
    name: "Mansi Sajeja",
    initials: "MS",
    role: "Fund Manager — Fixed Income",
    exp: "Credit + duration",
    bio: "Manages the debt sleeve (25–35%) across high-grade corporate bonds, G-secs, T-Bills and money market instruments. Responsible for the accrual engine and liquidity management supporting the twice-weekly redemption cycle.",
    color: "indigo",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Market Risk", d: "Equity and debt prices fluctuate with macro, liquidity and sentiment. Arbitrage core dampens but does not eliminate NAV drawdowns." },
  { t: "Derivatives Risk", d: "Options/futures are leveraged — small moves amplify gains or losses. Used for covered calls, arbitrage and up to 25% naked shorts." },
  { t: "Short-Selling Risk", d: "Shorts via derivatives can face theoretically unlimited loss if underlying rallies. Position sizing and SEBI 25% cap mitigate." },
  { t: "Interest-Rate Risk", d: "Debt sleeve of 25–35% is sensitive to yield-curve shifts. Managed via duration discipline and liquid-debt bucket." },
  { t: "Credit & Default Risk", d: "Debt portfolio invests in investment-grade rated paper. Credit migration, default or spread widening can impact NAV." },
  { t: "Liquidity & Interval Risk", d: "Redemption only Monday & Thursday; T+3 settlement. Not daily-liquid — investors must plan for the interval structure." },
  { t: "Concentration Risk", d: "SEBI single-issuer caps, sector caps and single-counterparty lending cap of 5% of net assets strictly enforced." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives and CCIL-settled repos mitigate. DVP settlement for OTC exposures." },
  { t: "Imperfect Hedge Risk (IRFs)", d: "Imperfect hedging via IRFs allowed up to 20% of net assets; basis risk between instrument and benchmark bond can impact hedge effectiveness." },
  { t: "Model & Execution Risk", d: "Quant-driven covered-call sizing depends on volatility regime. Expiry concentration and delta slippage are actively managed." },
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

const MagnumSif = () => {
  const __live = useFundNav("Magnum Hybrid Long Short", FUND.currentNav);
  const liveNav = __live.nav;
  const liveDate = formatNavDate(__live.date) || "Apr 30, 2026";
  const METRICS_LIVE = METRICS.map((m, i) =>
    i === 0 ? { ...m, value: `₹${liveNav.toFixed(4)}`, sub: liveDate } : m
  );

  const fundData = getSifBySlug("magnum-hybrid-long-short");
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
              <span className="text-gray-600">Magnum</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="text-sm text-gray-500">SBI Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Magnum Hybrid Long-Short Fund
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
                            returnMode === mode ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TRAILING.map((t) => {
                      const n = parseFloat(t.value);
                      const c = n >= 0 ? "text-green-600" : "text-red-600";
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold ${c}`}>{t.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Generate <b>regular income</b> by predominantly investing in derivatives strategies
                    like <b>covered calls</b> and <b>arbitrage opportunities</b> in the cash and derivatives
                    segments of the equity markets, plus debt and money market instruments — and to
                    generate <b>long-term capital appreciation</b> through <b>unhedged</b> exposure to
                    equity and equity-related instruments. Benchmarked to{" "}
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
                    Magnum is SBI Mutual Fund&apos;s flagship hybrid long-short SIF — the{" "}
                    <b>first investment strategy launched under SEBI&apos;s SIF hybrid long-short framework</b>.
                    Combines high equity participation (65–75%) with cash-future arbitrage and covered-call
                    income generation, a 25–35% debt sleeve for accrual and liquidity, and up to 25%
                    unhedged shorts via derivatives for directional alpha and portfolio hedging.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Taxation: <b>12.5% LTCG</b> after 24 months on the non-equity sleeve and equity-linked
                    LTCG per current rules — materially better than Cat III AIF (MMR 42.7%) at fund level.
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
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-700">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Magnum</h3>
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
                        <p className={`text-sm font-bold mt-1 ${parseFloat(p.ret) >= 0 ? "text-green-600" : "text-red-600"}`}>{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
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
                Magnum is built as a <b>high-equity hybrid</b> architecture — 65–75% equity participation
                (blending hedged arbitrage and unhedged long exposure) with a 25–35% debt & money-market
                sleeve for accrual and liquidity. The strategy uses <b>covered calls</b> and{" "}
                <b>cash-future arbitrage</b> for the income core, adds up to <b>25% unhedged shorts</b>{" "}
                via derivatives for tactical alpha and hedging, and can allocate up to 35% to overseas
                securities and 10% to REITs/InvITs.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-xs text-blue-700 mb-1">Equity (net)</p>
                  <p className="text-lg font-bold text-blue-700">65–75%</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Debt</p>
                  <p className="text-lg font-bold text-indigo-700">25–35%</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-xs text-emerald-700 mb-1">Unhedged short</p>
                  <p className="text-lg font-bold text-emerald-700">0–25%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">REITs / InvITs</p>
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
                Source: Magnum Hybrid Long Short Fund ISID — SBI Mutual Fund (Sep 23, 2025). Weights are
                indicative; actual allocation varies with market regime.
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
                Cumulative gross exposure (equity + debt + derivatives + repo) capped at 100% of net
                assets per SEBI Master Circular 12.24.1. Overseas headroom 20% of prior 3-month avg AUM.
              </p>
            </div>

            {/* Debt sleeve breakdown */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Fixed-income sleeve construction</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-4">
                  <p className="text-sm font-bold text-indigo-700 mb-2">Core Debt (25–35%)</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Investment-grade corporate bonds & G-secs</li>
                    <li>• Rated ≥ investment grade by one SEBI-recognised agency</li>
                    <li>• Unrated / unlisted debt capped at 5% of net assets</li>
                    <li>• Debt oriented MF units permitted within the sleeve</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Liquidity & Repo</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• T-Bills, G-Sec repos (&lt;91d) — zero gross-exposure treatment</li>
                    <li>• Repo in corporate debt ≤ 10% of net assets</li>
                    <li>• Supports Monday & Thursday redemption cycles</li>
                    <li>• IRF imperfect hedging allowed up to 20% of net assets</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Special situations execution windows */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Derivative &amp; arbitrage strategies</h3>
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
                Covered calls and cash-future arbitrage drive the income core; unhedged shorts provide
                tactical directional alpha and portfolio-level hedging.
              </p>
            </div>

            {/* Derivative exposure summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivative exposure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Derivatives (total): <b>up to 100%</b> of net assets</li>
                  <li>• Hedged derivatives: up to 100% of equity / debt allocation</li>
                  <li>• Naked / unhedged shorts: <b>up to 25%</b> of net assets</li>
                  <li>• Options premium paid: <b>≤20%</b> of net assets</li>
                  <li>• IRF imperfect hedging: ≤20% of net assets</li>
                  <li>• No investment in overseas derivatives</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Concentration & other limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Securities lending: <b>≤20%</b> net assets (≤5% per counterparty)</li>
                  <li>• Repo in corporate debt: <b>≤10%</b> net assets</li>
                  <li>• Unrated/unlisted debt: <b>≤5%</b> net assets</li>
                  <li>• Credit-enhancement exposure: <b>≤10%</b> of debt portfolio</li>
                  <li>• Group exposure (credit enhanced): ≤5% of debt portfolio</li>
                  <li>• Mutual fund units: ≤25% of net assets</li>
                </ul>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> Magnum publishes top-10 holdings and sector allocation at{" "}
                <a href="https://www.sbimf.com/magnumsif" target="_blank" rel="noopener noreferrer" className="underline">sbimf.com/magnumsif</a>.
                SIFs disclose strategy-level allocation ranges via SID and monthly factsheet; position-level
                holdings are reported to the AMC and regulator per SEBI.
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
                Magnum is led by <b>Gaurav Mehta</b>, Head – SIF Equity at SBI Funds Management. He
                brings prior Cat-III AIF long-short experience (managed <b>SBI Optimal Equity Fund</b>{" "}
                for nearly three years) directly relevant to the hybrid long-short SIF mandate. The
                strategy leverages SBI Mutual Fund&apos;s institutional research, dealing, and fixed
                income platforms.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">EQUITY &amp; DERIVATIVES</p>
                  <p className="text-xs text-gray-600 mt-1">Gaurav Mehta (lead)</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">FIXED INCOME</p>
                  <p className="text-xs text-gray-600 mt-1">Debt sleeve fund manager</p>
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
                        SBI Funds Management
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">AMC & sponsor</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {[
                  { n: "Nand Kishore", r: "Managing Director & CEO, SBIFML" },
                  { n: "C A Santosh", r: "Investor Relations Officer" },
                  { n: "SBI (State Bank of India)", r: "Sponsor — Joint venture" },
                  { n: "AMUNDI", r: "Sponsor — Joint venture" },
                  { n: "SBI MF Trustee Co. Pvt Ltd", r: "Trustee company" },
                  { n: "KFin Technologies", r: "Registrar & Transfer Agent" },
                ].map((s) => (
                  <div key={s.n} className="rounded-lg border border-gray-100 p-3">
                    <p className="font-semibold text-gray-900">{s.n}</p>
                    <p className="text-xs text-gray-500">{s.r}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                SBI Funds Management Limited (CIN U65990MH1992PLC065289) — joint venture between SBI
                and AMUNDI. Corporate Office: 9th Floor Crescenzo, BKC, Mumbai - 400 051.
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
                  Level 2 · Moderate
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band Level 2 (on a 1–5 scale) indicates <b>moderate</b> risk. The benchmark
                (Nifty 50 Hybrid Composite Debt 50:50 TRI) also carries a Level 2 risk band. Labelling
                was assigned during NFO based on internal assessment; it may be revised post-launch as
                actual portfolio characteristics evolve.
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
                    options premium cap (20%), securities-lending cap (20%) with 5% per counterparty.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Delta hedging for derivative legs, daily exposure & liquidity monitoring, minimum
                    investment threshold (₹10L PAN-level) monitored daily by AMC.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Arbitrage spreads tracked to capture opportunistic rolls. IRF imperfect-hedge
                    basis-risk monitored. Passive/active breach framework per SEBI Feb 27, 2025 circular.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent SBI MF Trustee Co., AMC Board Risk Committee, SEBI periodic disclosures,
                    KFin RTA reconciliation, Investor Relations Officer escalation route.
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
                      <th className="py-3 px-4">Magnum SIF</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Minimum investment</td><td className="py-3 px-4 font-semibold text-green-600">₹10 Lakh</td><td className="py-3 pl-4">₹1 Crore</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None (gross ≤100%)</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Liquidity</td><td className="py-3 px-4 font-semibold text-green-600">Mon & Thu redemption</td><td className="py-3 pl-4">Quarterly/annual</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes (typical 20%)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7%</td></tr>
                    <tr><td className="py-3 pr-4">Investor-level LTCG</td><td className="py-3 px-4 font-semibold text-green-600">12.5% after 24M</td><td className="py-3 pl-4">Slab / business income</td></tr>
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
                All documents are hosted on SBI Mutual Fund&apos;s Magnum SIF portal. The ISID is
                dated <b>23 September 2025</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Magnum fund presentation", d: "Strategy playbook & market context" },
                  { t: "Monthly factsheet", d: "Portfolio snapshot, TER, performance" },
                  { t: "SBI MF Magnum portal", d: "sbimf.com/magnumsif" },
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">ISID dated</td><td className="py-3 pl-4 font-semibold">23 September 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NSE / BSE in-principle approval</td><td className="py-3 pl-4 font-semibold">30 July 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opened</td><td className="py-3 pl-4 font-semibold">01 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold">15 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold">29 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer reopened</td><td className="py-3 pl-4 font-semibold">Within 5 business days of allotment</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NSE & BSE listing</td><td className="py-3 pl-4 font-semibold">Listed (demat units)</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Redemption days</td><td className="py-3 pl-4 font-semibold">Every Monday &amp; Thursday</td></tr>
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
                  <li>• Exit load <b>0.50%</b> if redeemed ≤15 days from allotment</li>
                  <li>• Exit load <b>0.25%</b> if redeemed &gt;15 days and ≤1 month</li>
                  <li>• <b>Nil</b> exit load after 1 month</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Dispatch of redemption proceeds: within 3 working days</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Redemption rules</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Redeem/switch-out: every Monday &amp; Thursday</li>
                  <li>• Next business day if Mon/Thu is a holiday</li>
                  <li>• Settlement: T+3 working days</li>
                  <li>• Min redemption: ₹1,00,000</li>
                  <li>• Min balance (PAN-level): ₹10L (active-breach freeze + 30d notice)</li>
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
            <LeadCaptureForm fundSlug="magnum-hybrid-long-short" fundName="Magnum SIF by SBI" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default MagnumSif;
