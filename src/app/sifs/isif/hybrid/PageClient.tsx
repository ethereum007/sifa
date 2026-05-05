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
  "isif/hybrid": "/sifs/isif/hybrid",
  "apex-hybrid-long-short": "/sifs/apex-hybrid-long-short",
};

const FUND = getSifBySlug("isif/hybrid")!;
const PEER_FUNDS = getPeers("isif/hybrid");

const AMC_URL = "https://www.icicipruamc.com/";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useFundNav, formatNavDate } from "@/hooks/useSifNav";

/* ------------------------------------------------------------------ */
/*  Static data for iSIF Hybrid                                        */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Hybrid Long-Short",
  "Equity + Debt",
  "Dual Shorts",
  "Derivative Overlay",
  "Daily Liquidity",
  "ICICI Pru",
];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";
const oneMColor = (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";
const threeMColor = (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Live", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: oneMColor },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: threeMColor },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Min Ticket", value: "₹10L", sub: "₹10k accredited", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "ICICI Prudential" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "05 Feb 2026" },
  { label: "Redemption", value: "Daily" },
  { label: "Settlement", value: "T+3" },
  { label: "Exit Load", value: "1% <12mo" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "Benchmark", value: "CRISIL H 50+50" },
];

const ALLOCATION_TAGS = [
  "Equity 65–75%",
  "Debt 25–35%",
  "Unhedged shorts ≤25%",
  "InvITs 0–10%",
  "Overseas 0–35%",
  "Derivative overlay",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "ICICI Prudential" },
  { label: "Category", value: "Hybrid Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception date", value: "05 Feb 2026" },
  { label: "Benchmark", value: "CRISIL Hybrid 50+50" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.25%" },
  { label: "Exit load", value: "1% <12 months" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Daily" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP / STP / SWP", value: "₹1,000+" },
  { label: "Min additional", value: "₹1,000" },
  { label: "Min balance", value: "₹10L" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 4 · High", color: "text-orange-600" },
  { label: "Benchmark risk band", value: "Level 3" },
  { label: "Short selling", value: "Derivatives only" },
  { label: "Unhedged short cap", value: "25% NAV" },
  { label: "Gross exposure cap", value: "100% NAV" },
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
  }));

const TEAM = [
  { name: "Rajat Chandak", initials: "RC", role: "Equity & Derivatives", sleeve: "Equity" },
  { name: "Ayush Shah", initials: "AS", role: "Derivatives Specialist", sleeve: "Equity" },
  { name: "Manish Banthia", initials: "MB", role: "CIO — Fixed Income", sleeve: "Debt" },
  { name: "Akhil Kakkar", initials: "AK", role: "Fund Manager — Debt", sleeve: "Debt" },
];

const SUITABLE = [
  "Core-portfolio investors with ≥₹10L surplus",
  "Seekers of balanced equity + debt with tactical shorts",
  "3–5 year horizon with moderate-high risk tolerance",
  "Investors preferring ICICI Pru brand & large AMC scale",
];
const NOT_SUITABLE = [
  "Guaranteed-return seekers",
  "Investors uncomfortable with derivative leverage",
  "Below ₹10L investable surplus",
  "Short-term traders / sharp-bull chasers",
];

const PILLARS = [
  { title: "Equity Sleeve (65–75%)", desc: "Growth engine via quality equity selection across market caps; drives capital appreciation.", color: "orange" },
  { title: "Debt Sleeve (25–35%)", desc: "Stability anchor — high-grade debt, money market & G-Sec for accrual and volatility dampening.", color: "blue" },
  { title: "Dual Unhedged Shorts (≤25%)", desc: "Derivative shorts in BOTH equity and debt — rare combination for tactical downside + alpha.", color: "rose" },
  { title: "Derivative Overlays", desc: "Covered calls, index hedges, protective puts, bear spreads, short straddles/strangles, IRF.", color: "emerald" },
  { title: "Overseas + InvITs", desc: "Up to 35% overseas securities and 10% InvITs for diversification and yield enhancement.", color: "indigo" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity & Equity-related (incl. ≤25% unhedged short)", min: "65%", max: "75%" },
  { t: "Debt & Money Market (incl. ≤25% unhedged short)", min: "25%", max: "35%" },
  { t: "Units of InvITs (Infrastructure Investment Trusts)", min: "0%", max: "10%" },
  { t: "Overseas securities / Overseas MF units / ETFs", min: "0%", max: "35%" },
  { t: "Tri-party repos", min: "0%", max: "35%" },
  { t: "Securitized debt (excl. foreign)", min: "0%", max: "10% of debt" },
];

const STRATEGY_MIX = [
  { name: "Equity long book", range: "65–75%", width: "70%", color: "bg-orange-500" },
  { name: "Debt long book", range: "25–35%", width: "30%", color: "bg-blue-500" },
  { name: "Unhedged shorts (Equity + Debt)", range: "0–25%", width: "20%", color: "bg-rose-500" },
  { name: "Derivative overlay (hedges + income)", range: "flexible", width: "40%", color: "bg-emerald-500" },
];

const DERIV_STRATS = [
  { t: "Equity Arbitrage", note: "Cash-future spread capture" },
  { t: "Covered Calls", note: "Income on long equity positions" },
  { t: "Index Hedges", note: "Tail protection via index puts/futures" },
  { t: "Protective Puts", note: "Downside insurance on concentrated longs" },
  { t: "Bear Call Spreads", note: "Directional bearish alpha" },
  { t: "Short Straddles / Strangles", note: "Premium capture in range-bound regimes" },
  { t: "Interest-Rate Futures", note: "Duration & curve management on debt sleeve" },
  { t: "Pair Trades", note: "Relative-value equity L/S" },
];

const MARKET_REGIME = [
  { market: "Bull", equity: "70–75%", debt: "25–30%", shorts: "Low", overlay: "Covered calls for income" },
  { market: "Sideways", equity: "65–70%", debt: "30–35%", shorts: "Moderate", overlay: "Short straddles / strangles" },
  { market: "Bear", equity: "65%", debt: "35%", shorts: "High (≤25%)", overlay: "Index hedges + protective puts" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Rajat Chandak",
    initials: "RC",
    role: "Fund Manager — Equity & Derivatives",
    exp: "17+ yrs",
    bio: "Over 17 years of experience in equity research and fund management. Leads equity stock selection and derivative positioning for the long-short book. Associated with ICICI Prudential AMC across multiple hybrid and equity strategies.",
    color: "orange",
  },
  {
    name: "Ayush Shah",
    initials: "AS",
    role: "Fund Manager — Derivatives",
    exp: "Derivatives Desk",
    bio: "Joined ICICI Prudential AMC's derivatives desk; specialist in options structures (straddles, strangles, spreads) and hedging overlays. Responsible for implementing the tactical short sleeve and derivative overlays across equity and debt.",
    color: "orange",
  },
  {
    name: "Manish Banthia",
    initials: "MB",
    role: "CIO — Fixed Income",
    exp: "20+ yrs",
    bio: "Chief Investment Officer for Fixed Income at ICICI Prudential AMC. Oversees the debt sleeve — duration, credit and rate-derivative positioning. Deep experience across credit cycles, corporate bonds and sovereign exposures.",
    color: "blue",
  },
  {
    name: "Akhil Kakkar",
    initials: "AK",
    role: "Fund Manager — Hybrid / Debt",
    exp: "14+ yrs",
    bio: "Joined ICICI Prudential AMC with extensive debt fund management experience. Co-manages the fixed-income sleeve of the SIF including money market, corporate debt and structured exposures.",
    color: "blue",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Market Risk", d: "Equity and debt prices fluctuate with macro, liquidity and sentiment. Hybrid mix dampens but does not eliminate equity-market drawdowns — the fund already saw a sharp March 2026 drawdown near benchmark." },
  { t: "Derivatives & Leverage Risk", d: "Options/futures are leveraged — small moves can amplify P&L. Cumulative gross exposure capped at 100% of NAV; unhedged short capped at 25%." },
  { t: "Short-Selling Risk", d: "Unhedged derivative shorts in both equity and debt can face large losses in sharp rallies. Gap risk on expiry and short-squeeze events are active concerns." },
  { t: "Interest-Rate & Credit Risk", d: "Debt sleeve of 25–35% is exposed to yield-curve shifts and credit spread widening. Quality bias and short-duration positioning mitigate but don't eliminate." },
  { t: "Liquidity Risk", d: "Although redemption is daily, large outflows in stress can force suboptimal unwinds of derivative legs. Daily NAV disclosure aligns with mutual-fund governance." },
  { t: "Concentration Risk", d: "Equity sleeve subject to SIF single-stock and sector caps; derivative overlays can concentrate expiry risk if not laddered." },
  { t: "Overseas / FX Risk", d: "Up to 35% may be invested in overseas securities & ETFs — exposes the fund to currency moves and foreign-market regulatory / liquidity risk." },
  { t: "Model & Execution Risk", d: "Overlay sizing depends on volatility regime and delta assumptions. Expiry concentration, skew changes, and slippage are actively managed." },
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

const IsifHybridPage = () => {
  const __live = useFundNav("iSIF Hybrid Long-Short", FUND.currentNav);
  const liveNav = __live.nav;
  const liveDate = formatNavDate(__live.date) || "Live";
  const METRICS_LIVE = METRICS.map((m, i) =>
    i === 0 ? { ...m, value: `₹${liveNav.toFixed(4)}`, sub: liveDate } : m
  );

  const fundData = getSifBySlug("isif/hybrid");
  const [activeTab, setActiveTab] = useState<string>("Snapshot");
  const [returnMode, setReturnMode] = useState<"absolute" | "annualised">("absolute");

  return (
    <div className="min-h-screen bg-gray-50">
      <NfoBannerTop />
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>

      <main className="pt-[104px] lg:pt-[120px] pb-20 font-sans">
        {/* HERO */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
            <nav className="text-xs text-gray-400 mb-4">
              <a href="/" className="hover:text-gray-600">SIF Universe</a>
              <span className="mx-1.5">›</span>
              <a href="/sif-funds-launched" className="hover:text-gray-600">Hybrid Long-Short</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">iSIF Hybrid</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm text-gray-500">ICICI Prudential Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  iSIF Hybrid Long-Short Fund
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
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
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
                    activeTab === tab ? "text-orange-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-600" />
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
                    <h3 className="text-base font-bold text-gray-900">Trailing returns</h3>
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                      {(["absolute", "annualised"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setReturnMode(mode)}
                          className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                            returnMode === mode ? "bg-orange-600 text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TRAILING.map((t) => {
                      const isPct = t.value.includes("%");
                      const isNeg = isPct && t.value.startsWith("-");
                      const color = !isPct ? "text-gray-700" : isNeg ? "text-red-600" : "text-green-600";
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold font-mono tabular-nums ${color}`}>{t.value}</p>
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
                    Generate long-term capital appreciation and income through a dynamically managed
                    portfolio of <b>equity (65–75%)</b> and <b>debt (25–35%)</b> securities, together
                    with <b>limited unhedged short exposure (≤25%) in both Equity and Debt through
                    derivatives</b>. Benchmark: <b>CRISIL Hybrid 50+50 Moderate Index</b>.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-orange-50 text-xs font-medium text-orange-700 border border-orange-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    iSIF Hybrid is ICICI Prudential's hybrid long-short SIF — combining an equity
                    core (65–75%) for growth with a debt sleeve (25–35%) for stability, and adding
                    up to 25% <b>unhedged short exposure in both equity and debt via derivatives</b>.
                    A sophisticated overlay layers in covered calls, index hedges, short straddles/
                    strangles and interest-rate derivatives for risk management and alpha extraction.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Distinct from ICICI Pru's Ex-Top 100 SIF (equity-only, SMID focus), the Hybrid
                    mandate targets <b>balanced risk-adjusted returns</b> suitable as a core
                    portfolio allocation — not an aggressive satellite.
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-orange-600 hover:text-orange-700">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in iSIF Hybrid</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist. No commitment.</p>
                  <div className="flex gap-2">
                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm">
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
                    {PEERS.map((p) => {
                      const isNeg = p.ret.startsWith("-");
                      return (
                        <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                          <p className="text-xs text-gray-400">{p.amc}</p>
                          <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                          <p className={`text-sm font-bold mt-1 font-mono tabular-nums ${isNeg ? "text-red-600" : "text-green-600"}`}>
                            {p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span>
                          </p>
                        </a>
                      );
                    })}
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
                iSIF Hybrid is built on a <b>core + overlay</b> architecture. The core is a conventional
                hybrid book — 65–75% equity for growth, 25–35% debt for stability. On top of this, an
                <b> unhedged derivative short sleeve of up to 25%</b> (split across equity and debt) is
                deployed tactically for downside protection, pair trades and alpha. Overseas securities
                up to 35% and InvITs up to 10% add diversification.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-orange-50 p-4 text-center">
                  <p className="text-xs text-orange-700 mb-1">Equity long</p>
                  <p className="text-lg font-bold text-orange-700 font-mono tabular-nums">65–75%</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-xs text-blue-700 mb-1">Debt long</p>
                  <p className="text-lg font-bold text-blue-700 font-mono tabular-nums">25–35%</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1">Unhedged short</p>
                  <p className="text-lg font-bold text-rose-700 font-mono tabular-nums">0–25%</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Overseas</p>
                  <p className="text-lg font-bold text-indigo-700 font-mono tabular-nums">0–35%</p>
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
                Source: iSIF Hybrid ISID & fund presentation — ICICI Prudential AMC. Indicative weights only.
              </p>
            </div>

            {/* Asset allocation */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Asset allocation (% of Net Assets)</h3>
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
                Unhedged short position ≤25% of Net Assets (via derivatives). Cumulative gross exposure
                (incl. derivative exposure) ≤100% of Net Assets. Scheme does not invest in overseas derivatives.
              </p>
            </div>

            {/* Derivative playbook */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Derivative playbook</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {DERIV_STRATS.map((d) => (
                  <div key={d.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-gray-900 mb-1">{d.t}</p>
                    <p className="text-xs text-gray-600">{d.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Market regime adaptation */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Market-regime adaptation</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Regime</th>
                      <th className="py-3 px-4 font-semibold">Equity</th>
                      <th className="py-3 px-4 font-semibold">Debt</th>
                      <th className="py-3 px-4 font-semibold">Shorts</th>
                      <th className="py-3 pl-4 font-semibold">Overlay</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {MARKET_REGIME.map((r) => (
                      <tr key={r.market} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-semibold">{r.market}</td>
                        <td className="py-3 px-4 font-mono tabular-nums">{r.equity}</td>
                        <td className="py-3 px-4 font-mono tabular-nums">{r.debt}</td>
                        <td className="py-3 px-4">{r.shorts}</td>
                        <td className="py-3 pl-4 text-xs text-gray-500">{r.overlay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Concentration & exposure limits */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Exposure limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Unhedged short: <b>≤25%</b> of Net Assets</li>
                  <li>• Cumulative gross exposure: <b>≤100%</b> of Net Assets</li>
                  <li>• InvITs: <b>≤10%</b> of Net Assets</li>
                  <li>• Overseas securities / ETFs: <b>≤35%</b></li>
                  <li>• Securitized debt: <b>≤10%</b> of debt sleeve</li>
                  <li>• Tri-party repos: <b>≤35%</b> of Net Assets</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Governance guardrails</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Daily NAV disclosure (MF-style governance)</li>
                  <li>• 30-day rebalancing rule on passive breaches</li>
                  <li>• Trustee oversight — ICICI Prudential Trust Ltd</li>
                  <li>• SEBI-mandated SIF risk-o-meter labelling</li>
                  <li>• Exchange-traded derivatives, CCIL-settled repos</li>
                </ul>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> SIFs do not publish monthly top-10 holdings in the same
                format as regular mutual funds. The ISID and fund presentation disclose strategy-level
                allocation ranges; position-level holdings are reported to the AMC and regulator but
                are not publicly disseminated.
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
                iSIF Hybrid is jointly managed by four fund managers split across <b>equity & derivatives</b>{" "}
                and <b>fixed income</b> sleeves. The team leverages ICICI Prudential AMC's institutional
                platforms — one of India's largest asset managers with deep expertise across equity, debt
                and hybrid strategies.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-xs text-orange-700 font-semibold">EQUITY & DERIVATIVES</p>
                  <p className="text-xs text-gray-600 mt-1">Chandak · Shah</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">FIXED INCOME</p>
                  <p className="text-xs text-gray-600 mt-1">Banthia · Kakkar</p>
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
                        ICICI Prudential AMC
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">AMC leadership</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                CEO: <b>Nimesh Shah</b> (MD &amp; CEO, ICICI Prudential AMC). Sponsors: ICICI Bank Ltd &amp;
                Prudential Plc (UK). ICICI Prudential Mutual Fund is one of India's largest asset managers
                by AUM, with a long track record across hybrid, equity and fixed-income strategies. The
                fund benefits from dedicated dealing, credit research and risk-management desks.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* RISK & SCORES TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "Risk & Scores" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

            <div className="rounded-xl border-2 border-orange-200 bg-orange-50/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">AMFI Risk Band</h3>
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Level 4 · High
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band Level 4 (on a 1–5 scale) indicates <b>high</b> risk driven by the equity-heavy
                (65–75%) long book and the unhedged derivative short sleeve. The benchmark
                (CRISIL Hybrid 50+50) carries a lower Level 3 risk band. Labelling was assigned at NFO
                and may be revised post-launch as actual portfolio characteristics evolve.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">March 2026 drawdown — context</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                The fund delivered <b className="font-mono tabular-nums">{fmtPct(FUND.returns.oneMonth)}</b> in
                its first major stress month (March 2026), closely tracking the benchmark's
                <b className="font-mono tabular-nums"> -6.35%</b>. This confirms that the equity sleeve
                drives NAV behaviour more than the overlay hedges — investors should size exposure
                accordingly and not assume short-sleeve protection will fully offset equity drawdowns.
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
                    InvIT cap (10%), overseas cap (35%). Single-stock and sector limits enforced pre-trade.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Delta hedging for derivative legs, expiry-laddering to spread gamma risk,
                    single-name concentration limits, and liquidity buffers for daily redemption.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily NAV disclosure, daily exposure, factor, liquidity and volatility monitoring.
                    30-day rebalancing rule on passive breaches per SEBI SIF framework.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    ICICI Prudential Trust (independent trustee), AMC Board Risk Committee, SEBI
                    periodic disclosures, and KFin/CAMS RTA reconciliation.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">iSIF Hybrid vs iSIF Ex-Top 100</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">Hybrid L/S</th>
                      <th className="py-3 pl-4">Ex-Top 100 L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Core risk</td><td className="py-3 px-4 font-semibold">Equity + Debt</td><td className="py-3 pl-4">SMID Equity</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Shorts in</td><td className="py-3 px-4 font-semibold">Equity + Debt</td><td className="py-3 pl-4">Equity only</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Objective</td><td className="py-3 px-4 font-semibold">Balanced risk-adj.</td><td className="py-3 pl-4">SMID alpha</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Benchmark</td><td className="py-3 px-4 font-semibold">CRISIL H 50+50</td><td className="py-3 pl-4">Nifty SMID focus</td></tr>
                    <tr><td className="py-3 pr-4">Use case</td><td className="py-3 px-4 font-semibold">Core portfolio</td><td className="py-3 pl-4">Aggressive satellite</td></tr>
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
                All documents are hosted on ICICI Prudential AMC's website.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "iSIF Hybrid fund presentation", d: "Strategy playbook & positioning" },
                  { t: "Monthly factsheet", d: "Portfolio snapshot, TER, performance" },
                  { t: "ICICI Prudential AMC website", d: "icicipruamc.com" },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-100 p-4 hover:border-orange-200 hover:bg-orange-50/30 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-orange-700">{d.t}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.d}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600 shrink-0 mt-0.5" />
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opened</td><td className="py-3 pl-4 font-semibold">16 January 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold">30 January 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold">05 February 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Subscription</td><td className="py-3 pl-4 font-semibold">Daily (continuous)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption</td><td className="py-3 pl-4 font-semibold">Daily</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Settlement</td><td className="py-3 pl-4 font-semibold">T+3 working days</td></tr>
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">First ₹500 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.25%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">Next ₹250 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.00%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">Next ₹1,250 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.75%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-sans">Next ₹3,000 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.60%</td></tr>
                    <tr><td className="py-3 pr-4 font-sans">Balance AUM</td><td className="py-3 pl-4 text-right font-semibold">1.50%</td></tr>
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
                  <li>• Exit load <b>1%</b> if redeemed/switched ≤12 months from allotment</li>
                  <li>• <b>Nil</b> exit load after 12 months</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Dispatch of redemption proceeds: within 3 working days</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Redemption rules</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Redeem/switch-out: every business day</li>
                  <li>• Settlement: T+3 working days</li>
                  <li>• No minimum redemption amount</li>
                  <li>• Min balance post-withdrawal: ₹10L (₹10k for accredited)</li>
                  <li>• SIP / STP / SWP available from ₹1,000+</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="isif-hybrid" fundName="iSIF Hybrid by ICICI Prudential" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default IsifHybridPage;
