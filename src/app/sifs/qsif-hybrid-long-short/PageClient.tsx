"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle, ExternalLink } from "lucide-react";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChartLazy";
import AmcLogo from "@/components/AmcLogo";
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

const FUND = getSifBySlug("qsif-hybrid-long-short")!;
const PEER_FUNDS = getPeers("qsif-hybrid-long-short");

const AMC_URL = "https://qsif.com/";
const QUANT_ACCENT = "#7C3AED"; // Quant purple (tailwind purple-600)

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useFundNav, formatNavDate } from "@/hooks/useSifNav";

/* ------------------------------------------------------------------ */
/*  Static data for qSIF Hybrid                                        */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Hybrid Long-Short",
  "Balanced Equity + Debt",
  "Derivatives Overlay",
  "VLRT Framework",
  "Interval Strategy",
];

const siReturn = FUND.returns.sinceInception ?? 0;
const siColor = siReturn >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Regular · Growth", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Max 2.25%", color: "" },
  { label: "Min Investment", value: "₹10 L", sub: "₹1L accredited", color: "" },
];

const INFO_BAR = [
  { label: "Inception", value: "20 Oct 2025" },
  { label: "Min Investment", value: "₹10L" },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}% max` },
  { label: "Redemption", value: "Tue & Wed" },
  { label: "Exit Load", value: "1% <15d" },
  { label: "Benchmark", value: "Nifty 50 Hybrid 50:50" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "Benchmark", value: "—" },
  { period: "Category Avg", value: "—" },
  { period: "Alpha vs BM", value: "—" },
  { period: "NAV (Direct)", value: "—" },
];

const ALLOCATION_TAGS = [
  "Equity 25–75%",
  "Debt 25–75%",
  "REITs/InvITs 0–20%",
  "Unhedged short 0–25%",
  "Long derivatives up to 50%",
  "Hedged positions up to 100%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "quant Mutual Fund" },
  { label: "AMC", value: "quant Money Managers Ltd" },
  { label: "Trustee", value: "quant Capital Trustee Ltd" },
  { label: "Category", value: "Hybrid Long-Short" },
  { label: "Type", value: "Interval" },
  { label: "ISID dated", value: "10 Sep 2025" },
  { label: "NFO period", value: "25 Sep – 09 Oct 2025" },
  { label: "Inception", value: "20 Oct 2025" },
  { label: "Benchmark", value: "Nifty 50 Hybrid Debt 50:50" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.25% (first ₹500 Cr)" },
  { label: "Exit load", value: "1% <15d · Nil after" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (business days)" },
  { label: "Redemption", value: "Tue & Wed" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹1,000" },
  { label: "Listing", value: "NSE (demat)" },
];

const RISK = [
  { label: "Risk band", value: "Level 5 (Very High)", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Level 5" },
  { label: "Short selling", value: "Derivatives only · ≤25%" },
  { label: "Gross exposure cap", value: "100% of NAV" },
  { label: "Lock-in", value: "None" },
];

const PEERS = PEER_FUNDS
  .slice()
  .sort((a, b) => (b.returns.sinceInception ?? 0) - (a.returns.sinceInception ?? 0))
  .slice(0, 4)
  .map(f => ({
    name: f.shortName + " " + f.category.replace("Long Short", "").trim(),
    amc: f.amc,
    ret: fmtPct(f.returns.sinceInception, 1),
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
  }));

const TEAM = [
  { name: "Sandeep Tandon", initials: "ST", role: "Founder & CIO — Lead" },
  { name: "Lokesh Garg", initials: "LG", role: "Fund Manager — Equity" },
  { name: "Ankit Pande", initials: "AP", role: "Fund Manager — Equity" },
  { name: "Sameer Kate", initials: "SK", role: "Fund Manager — Derivatives" },
  { name: "Sanjeev Sharma", initials: "SS", role: "Fund Manager — Debt" },
];

const SUITABLE = [
  "Investors with ≥₹10L surplus seeking balanced hybrid exposure",
  "25–75% equity-debt flexibility across market cycles",
  "Post-tax LTCG 12.5% (after 12M) seekers",
  "Comfortable with Tuesday/Wednesday redemption windows",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Investors needing daily liquidity",
  "Below ₹10L investable surplus (non-accredited)",
  "Short-term traders chasing directional equity",
];

const PILLARS = [
  { title: "Balanced Core — Equity (25–75%)", desc: "Diversified long equity book built on quant's VLRT (Valuation, Liquidity, Risk, Time) framework — bottom-up, multi-factor, dynamic rebalancing across market caps.", color: "purple" },
  { title: "Debt Anchor (25–75%)", desc: "Investment-grade debt and money-market instruments providing stability, accrual income and drawdown cushion during equity volatility.", color: "indigo" },
  { title: "Derivatives Overlay (≤25% unhedged short)", desc: "Tactical short exposure via stock/index futures and options to hedge directional risk or express bearish views. Long derivatives up to 50% of net assets.", color: "amber" },
  { title: "Special Situations & REITs (≤20%)", desc: "Additional income via REIT/InvIT exposure and event-driven strategies — covered calls, protective puts, arbitrage spreads.", color: "blue" },
  { title: "Risk Control", desc: "100% gross exposure cap (SEBI). Stock lending ≤20%/≤5% per broker. Securitized debt ≤10% of debt. Single-issuer REIT cap 10%. Segregated portfolio mechanism for credit events.", color: "rose" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity & equity-related instruments", min: "25%", max: "75%" },
  { t: "Debt & money market instruments", min: "25%", max: "75%" },
  { t: "Units of REITs / InvITs", min: "0%", max: "20%" },
];

const DERIV_LIMITS = [
  { t: "Long derivatives (non-hedging)", limit: "Up to 50%" },
  { t: "Unhedged short exposure via derivatives", limit: "Up to 25%" },
  { t: "Hedged positions in equity & debt", limit: "Up to 100%" },
  { t: "Securitized debt", limit: "≤10% of debt portfolio" },
  { t: "Overseas securities (pending FM appt.)", limit: "Up to 20% (not active)" },
  { t: "Stock lending", limit: "≤20% net assets · ≤5% single broker" },
  { t: "TREPS on Gsec / T-Bills", limit: "Up to 20% of net assets" },
  { t: "Repo in corporate debt", limit: "Up to 10% of net assets" },
  { t: "SO/CE/AT1/Tier 2 debt instruments", limit: "≤10% of debt portfolio" },
  { t: "REIT/InvIT single-issuer", limit: "≤10% of NAV" },
  { t: "Credit Default Swaps", limit: "Not permitted" },
];

const STRATEGY_MIX = [
  { name: "Long Equity (VLRT framework)", range: "25–75%", width: "60%", color: "bg-purple-500" },
  { name: "Debt & Money Market", range: "25–75%", width: "55%", color: "bg-indigo-500" },
  { name: "Long Derivatives (non-hedging)", range: "0–50%", width: "30%", color: "bg-amber-500" },
  { name: "Unhedged Short (derivatives)", range: "0–25%", width: "20%", color: "bg-emerald-500" },
  { name: "REITs / InvITs", range: "0–20%", width: "15%", color: "bg-blue-500" },
];

const SHORT_STRATS = [
  { t: "Short Index / Stock Futures", note: "Express bearish view; unhedged short ≤25% of net assets", risk: "Very High" },
  { t: "Long Put Options", note: "Bounded downside — premium at risk, bearish payoff", risk: "Low" },
  { t: "Bear Put Spread", note: "Buy higher-strike put, sell lower-strike put; moderate bearish view", risk: "Low" },
  { t: "Bear Call Spread", note: "Sell lower-strike call, buy higher-strike call; mild bearish/neutral", risk: "Moderate" },
  { t: "Synthetic Short (Long Put + Short Call)", note: "Mimics short futures payoff; strong bearish conviction", risk: "Very High" },
  { t: "Covered Calls / Protective Puts", note: "Overlay on long book — income or downside protection", risk: "Low–Moderate" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios (from ISID)                                      */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Sandeep Tandon",
    initials: "ST",
    role: "Founder & CIO — Lead Manager",
    exp: "33+ yrs",
    bio: "Founder & Chief Investment Officer of the quant Group. 33+ years in capital markets — started FY 1992-93 at GIC Mutual Fund (JV with George Soros), founding member at IDBI Asset Management (key role in IDBI I-NITS 95). Pivotal roles at ICICI Securities (JP Morgan JV), Kotak Securities (Goldman Sachs JV) and REFCO. As CEO of Quant Broking (2008–2018), led the proprietary trading vertical with $1B+ daily turnover across equity arbitrage, volatility arbitrage, pair trading, sectoral long-short, event-driven and spread strategies — with no yearly or quarterly losses at aggregate level over the 10-year period.",
    color: "purple",
    qual: "MBA (Finance)",
    age: "55",
  },
  {
    name: "Lokesh Garg",
    initials: "LG",
    role: "Fund Manager — Equity",
    exp: "20+ yrs",
    bio: "Two decades of equity market experience. Most recent role: Executive Director at UBS India Institutional Equities (post UBS–Credit Suisse merger). Previously Director at Credit Suisse India Institutional Equities — ranked as a top analyst in capital goods with institutional-investor coverage across multiple sectors. Earlier stints at Kotak Institutional Equities, ICICI Bank Treasury and Infosys. Focus on fundamental long-short investment ideas.",
    color: "indigo",
    qual: "MBA — IIM Ahmedabad · B.Tech — IIT Roorkee (Gold Medal) · CFA L3",
    age: "46",
  },
  {
    name: "Ankit Pande",
    initials: "AP",
    role: "Fund Manager — Equity",
    exp: "14+ yrs",
    bio: "14+ years in Indian equities, plus 3+ years in software products (Infosys Finacle). Won the Thomson Reuters StarMine Award for best stock picker (IT sector, 2014). Lifetime member of Beta Gamma Sigma Honour Society. Under Sandeep Tandon's leadership at Quant Broking, developed fundamental long-short ideas including covered calls and protective puts. Currently Fund Manager across several quant Mutual Fund schemes — generated superior risk-adjusted returns through his tenure.",
    color: "amber",
    qual: "B.E. (Electronics & Telecom) Pune · MBA — CUHK · CFA L3",
    age: "40",
  },
  {
    name: "Sameer Kate",
    initials: "SK",
    role: "Fund Manager — Derivatives",
    exp: "20+ yrs",
    bio: "Two decades in Indian equities and derivatives dealing. Prior to quant MF, was Senior Sales Trader at Investec Capital covering equity and derivatives for domestic and foreign institutional clients. 16+ years at Kotak Securities Institutional Equities as Derivatives Sales Trader. Deep experience deploying strategies across equity, debt and derivatives instruments.",
    color: "blue",
    qual: "B.Sc. (Computer Science) Pune · MBA — IME Pune",
    age: "55",
  },
  {
    name: "Sanjeev Sharma",
    initials: "SS",
    role: "Fund Manager — Debt",
    exp: "20+ yrs",
    bio: "Two decades of experience in equity, debt, fund management and treasury operations. Extensive experience deploying strategies across equity, debt and derivative instruments. Certified Treasury Manager (Treasury & Forex Risk).",
    color: "emerald",
    qual: "PGDBA (Finance) · M.Com · CerTM (Treasury & Forex Risk)",
    age: "49",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Equity Market Risk", d: "Equity sleeve can range 25–75%. Prices volatile, subject to market, sector and stock-specific shocks. Model-driven VLRT sizing reduces but does not eliminate drawdown risk." },
  { t: "Derivatives Risk", d: "Long derivatives up to 50%, unhedged short up to 25%. Leverage magnifies P&L; margin calls require active collateral. Basis, rollover and liquidity risks on F&O positions." },
  { t: "Unhedged Short Risk", d: "Up to 25% of net assets in unhedged short via derivatives. Theoretical loss is unbounded on the short leg if the underlying rises sharply. Short-squeeze risk in single stocks." },
  { t: "Interest-Rate Risk", d: "Debt sleeve 25–75%. Sensitivity to yield-curve moves, repo actions and liquidity windows. Credit spreads affect valuations." },
  { t: "Credit & Concentration Risk", d: "Securitized debt ≤10% of debt portfolio. SO/CE/AT1/Tier 2 ≤10% of debt. Single-issuer REIT cap 10% of NAV. Segregated portfolio on credit events." },
  { t: "Liquidity & Interval Risk", d: "Redemption limited to Tuesday & Wednesday; proceeds within 3 business days. Not a daily-liquid product — plan around the interval cycle. NSE listing enables demat-mode secondary trading." },
  { t: "REIT / InvIT Risk", d: "Units subject to price, reinvestment and interest-rate risks. Cash flows can be volatile. Strategy exposure ≤20% of NAV, ≤10% per single issuer." },
  { t: "Model Risk", d: "VLRT framework is systematic; regimes where valuation, liquidity, risk and time signals diverge can cause underperformance. Model parameters are periodically reviewed." },
  { t: "Execution & Counterparty Risk", d: "Stock lending ≤20%/≤5% single intermediary. Repo in corporate debt ≤10%. Settlement risk on derivatives and secondary-market trades." },
  { t: "New-Strategy Risk", d: "qSIF Hybrid Long-Short is the first Interval investment strategy under qsif. No historical track record on this exact mandate — performance attribution builds only post-allotment." },
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

const QsifHybridSif = () => {
  const __live = useFundNav("qSIF Hybrid Long-Short", FUND.currentNav);
  const liveNav = __live.nav;
  const liveDate = formatNavDate(__live.date) || "Regular · Growth";
  const METRICS_LIVE = METRICS.map((m, i) =>
    i === 0 ? { ...m, value: `₹${liveNav.toFixed(4)}`, sub: liveDate } : m
  );

  const fundData = getSifBySlug("qsif-hybrid-long-short");
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
              <span className="text-gray-600">qSIF Hybrid</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <AmcLogo amc="Quant Mutual Fund" size="md" />
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      <span className="text-sm text-gray-500">quant Mutual Fund</span>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-purple-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                      LAUNCHED
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    qSIF Hybrid Long-Short Fund
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {TAGS.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                        {t}
                      </span>
                    ))}
                  </div>
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
                    <span className="text-2xl font-bold text-gray-900 font-mono tabular-nums">₹{liveNav.toFixed(4)}</span>
                    <span className={`text-sm font-semibold ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
                  </div>
                  <div className="h-[280px] mt-4">
                    {fundData && (
                      <NavJourneyChart funds={[fundData]} showBenchmark={false} height={280} />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">Live NAV data · Source: AMFI NAV API.</p>
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
                    {TRAILING.slice(0, 4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className="text-base font-bold text-gray-900 font-mono tabular-nums">{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TRAILING.slice(4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className="text-base font-bold text-gray-900 font-mono tabular-nums">{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">Short track record — strategy incepted 20 Oct 2025. Benchmark and category averages populate as AMFI history accrues.</p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To achieve a blend of <b>capital appreciation and income generation</b> by maintaining a{" "}
                    <b>balanced exposure to equity and debt instruments</b>, with a minimum of 25% in each, while
                    utilizing up to <b>25% in short derivative positions</b> to enhance returns and manage risk.
                    Benchmarked to the <b>Nifty 50 Hybrid Composite Debt 50:50 Index (TRI)</b>. There is no assurance
                    that the investment objective will be achieved.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy &amp; allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-200">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    qSIF Hybrid is quant Mutual Fund&apos;s first <b>Interval</b> investment strategy under the qsif
                    SIF vehicle. Construction blends a <b>balanced equity-debt core</b> (25–75% each) sized via
                    quant&apos;s <b>VLRT</b> framework (Valuation, Liquidity, Risk, Time) with a <b>derivatives overlay</b>{" "}
                    — long up to 50% for return enhancement and unhedged short up to 25% for hedging directional risk
                    or expressing bearish conviction. Hedged positions can go up to 100% of net assets.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Taxation at investor level: <b>STCG slab rate</b> on ≤12 months, <b>LTCG 12.5%</b>{" "}
                    (without indexation) on &gt;12 months — NSE listing qualifies units as long-term capital assets
                    after 12 months.
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
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in qSIF Hybrid</h3>
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
                        <p className="text-xs text-gray-400 truncate">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className="text-sm font-bold text-green-600 mt-1 font-mono tabular-nums">{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
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
                qSIF Hybrid is built as a <b>balanced equity-debt core</b> with a disciplined derivatives overlay.
                The equity sleeve (25–75%) is sized using quant&apos;s proprietary <b>VLRT</b> framework — combining
                Valuation, Liquidity, Risk and Time dimensions for multi-factor stock selection. The debt sleeve
                (25–75%) provides accrual income and drawdown cushion. A derivatives overlay allows unhedged short
                exposure up to 25% of net assets for tactical hedging and directional bearish views.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <p className="text-xs text-purple-700 mb-1">Equity core</p>
                  <p className="text-lg font-bold text-purple-700 font-mono tabular-nums">25–75%</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Debt core</p>
                  <p className="text-lg font-bold text-indigo-700 font-mono tabular-nums">25–75%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">Long derivatives</p>
                  <p className="text-lg font-bold text-amber-700 font-mono tabular-nums">0–50%</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4 text-center">
                  <p className="text-xs text-emerald-700 mb-1">Unhedged short</p>
                  <p className="text-lg font-bold text-emerald-700 font-mono tabular-nums">0–25%</p>
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
                Source: qSIF Hybrid ISID (10 Sep 2025). Weights indicative; actual allocation varies with market
                regime and SEBI asset-allocation bands.
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
                Cumulative gross exposure capped at <b>100% of net assets</b> (SEBI SIF framework). Cash /
                cash-equivalents with residual maturity &lt;91 days are treated as not creating exposure.
              </p>
            </div>

            {/* Derivatives & instrument limits */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Derivative &amp; instrument limits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Exposure</th>
                      <th className="py-3 pl-4 font-semibold text-right">Limit</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {DERIV_LIMITS.map((r) => (
                      <tr key={r.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4">{r.t}</td>
                        <td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">{r.limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Source: ISID Part II-A &amp; SEBI Master Circular (27 Jun 2024) + SIF Framework Circular (27 Feb 2025).
                The fund will <b>not invest in Credit Default Swaps</b>. Overseas securities permitted up to 20% of net
                assets but not active until AMC appoints a dedicated overseas fund manager.
              </p>
            </div>

            {/* Short / derivative playbook */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Short-exposure playbook</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Strategy</th>
                      <th className="py-3 px-4 font-semibold">When used / structure</th>
                      <th className="py-3 pl-4 font-semibold text-right">Risk profile</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {SHORT_STRATS.map((s) => (
                      <tr key={s.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{s.t}</td>
                        <td className="py-3 px-4 text-gray-500 text-xs">{s.note}</td>
                        <td className="py-3 pl-4 text-right text-xs text-gray-600">{s.risk}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Unhedged short positions capped at <b>25% of net assets</b> (SIF regulatory ceiling). Hedged
                positions may reach up to 100% of net assets.
              </p>
            </div>

            {/* Debt sleeve rules + Equity framework */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Equity sleeve — VLRT framework</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>V</b>aluation — relative &amp; absolute fair-value anchors</li>
                  <li>• <b>L</b>iquidity — money-flow, cost-of-liquidity signals</li>
                  <li>• <b>R</b>isk — macro, sectoral, idiosyncratic risk decomposition</li>
                  <li>• <b>T</b>ime — cycle &amp; regime-aware rebalancing cadence</li>
                  <li>• Multi-cap universe, dynamic sizing</li>
                  <li>• Covered calls / protective puts overlay</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Debt sleeve — rules &amp; limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Government securities, T-Bills, corporate debt, money-market</li>
                  <li>• Securitized debt ≤10% of debt portfolio</li>
                  <li>• SO/CE/AT1/Tier 2 combined ≤10% of debt portfolio</li>
                  <li>• TREPS on Gsec/T-Bills up to 20% of net assets</li>
                  <li>• Repo in corporate debt ≤10% of net assets</li>
                  <li>• Segregated portfolio on credit events (SEBI Master Circular)</li>
                </ul>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> Top-10 holdings, sector allocation and portfolio turnover will be
                published on the functional qsif website (<a href="https://qsif.com/statutory-disclosures" className="underline">qsif.com/statutory-disclosures</a>).
                As a newly-launched strategy (inception 20 Oct 2025), early portfolio data is still building;
                refer to monthly factsheet post-allotment for live snapshots.
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
                qSIF Hybrid is jointly managed by a five-member team led by <b>Sandeep Tandon</b> (Founder &amp; CIO
                of quant Group, 33+ years in capital markets). The team brings combined experience across proprietary
                derivative trading, institutional equity research, fundamental long-short idea generation, derivatives
                dealing and fixed-income treasury operations. Cumulative team experience exceeds 100 years.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-purple-700 font-semibold">LEAD / CIO</p>
                  <p className="text-xs text-gray-600 mt-1">Sandeep Tandon</p>
                  <p className="text-[11px] text-gray-400">33+ yrs</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">EQUITY</p>
                  <p className="text-xs text-gray-600 mt-1">Lokesh Garg</p>
                  <p className="text-[11px] text-gray-400">20+ yrs</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-xs text-amber-700 font-semibold">EQUITY</p>
                  <p className="text-xs text-gray-600 mt-1">Ankit Pande</p>
                  <p className="text-[11px] text-gray-400">14+ yrs</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">DERIVATIVES</p>
                  <p className="text-xs text-gray-600 mt-1">Sameer Kate</p>
                  <p className="text-[11px] text-gray-400">20+ yrs</p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3">
                  <p className="text-xs text-emerald-700 font-semibold">DEBT</p>
                  <p className="text-xs text-gray-600 mt-1">Sanjeev Sharma</p>
                  <p className="text-[11px] text-gray-400">20+ yrs</p>
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
                    <p className="text-sm text-gray-500 mb-3">{m.role} · Age {m.age}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-full bg-${m.color}-50 text-xs font-medium text-${m.color}-700 border border-${m.color}-100`}>
                        {m.exp}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                        quant Mutual Fund
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-gray-50 text-xs font-medium text-gray-600 border border-gray-100">
                        {m.qual}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Institutional heritage</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                quant Group&apos;s investment DNA traces back to 1992–93 with founder Sandeep Tandon&apos;s roles at
                GIC Mutual Fund, IDBI AMC and later as CEO of Quant Broking (2008–2018), where the proprietary
                trading vertical executed a $1B+ daily turnover across equity arbitrage, volatility arbitrage,
                pair trading, sectoral long-short, event-driven and spread strategies — with no recorded yearly
                or quarterly losses over the full 10-year period. The same quantitative long-short toolkit
                underpins the qSIF Hybrid approach, adapted to the SIF regulatory framework (SEBI circular of
                27 Feb 2025) and a balanced equity-debt mandate.
              </p>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: qSIF Hybrid ISID, Part II-E (Who manages the investment strategy).
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
                <h3 className="text-base font-bold text-gray-900">Risk labelling</h3>
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Level 5 · Very High Risk
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Product and benchmark risk bands are both <b>Level 5 (Very High)</b> as assigned per AMFI guidance.
                Labels were assigned during the NFO based on internal assessment of the model portfolio and{" "}
                <b>may vary post-NFO</b> when actual investments are made. Investors must read the risk-o-meter
                and product-suitability statement on the ISID first page before investing.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Strategy-specific risks</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {STRATEGY_RISKS.map((r) => (
                  <div key={r.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-purple-700 mb-1">{r.t}</p>
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
                    SEBI 100% gross exposure cap, 25% unhedged-short cap, securitized-debt ≤10% of debt,
                    single-issuer REIT cap 10% of NAV, stock lending ≤20%/≤5% per broker.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Equity sizing via VLRT model. Derivatives collateral managed daily. Options delta/gamma
                    monitored on overlay positions. Segregated portfolio mechanism available on debt credit events.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily exposure, duration, credit-quality and liquidity checks. Net short exposure monitored
                    intraday. NAV disclosed on AMFI &amp; qsif.com before 11:00 pm each business day.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Investment Committee, Risk Committee, quant Capital Trustee Ltd, SEBI periodic disclosures.
                    Grievance escalation to CIRO (Ms. Sudha Biju, help.investor@qsif.com).
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">qSIF Hybrid vs MF / PMS / AIF (Cat III)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">qSIF Hybrid</th>
                      <th className="py-3 px-4">MF (Balanced)</th>
                      <th className="py-3 px-4">PMS</th>
                      <th className="py-3 pl-4">Cat III AIF</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min investment</td><td className="py-3 px-4 font-semibold font-mono tabular-nums">₹10 L</td><td className="py-3 px-4 font-mono tabular-nums">₹100</td><td className="py-3 px-4 font-mono tabular-nums">₹50 L</td><td className="py-3 pl-4 font-mono tabular-nums">₹1 Cr</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None (100% gross cap)</td><td className="py-3 px-4">None</td><td className="py-3 px-4">None</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Unhedged short</td><td className="py-3 px-4 font-semibold">Up to 25%</td><td className="py-3 px-4">Hedging only</td><td className="py-3 px-4">Hedging only</td><td className="py-3 pl-4">Wide</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (pass-through)</td><td className="py-3 px-4">Nil</td><td className="py-3 px-4">Nil</td><td className="py-3 pl-4">MMR ~42.7%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Usually yes</td><td className="py-3 pl-4">Yes</td></tr>
                    <tr><td className="py-3 pr-4">LTCG (investor)</td><td className="py-3 px-4 font-semibold">12.5% &gt;12M</td><td className="py-3 px-4">12.5% (equity)</td><td className="py-3 px-4">Per security</td><td className="py-3 pl-4">Slab / business</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">Source: SEBI SIF framework (27 Feb 2025). SIF structure allows derivatives-driven long-short with MF-like tax and regulation, at a ₹10L PAN-level minimum.</p>
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
                All documents are hosted on quant Mutual Fund&apos;s qsif SIF portal. The ISID is dated{" "}
                <b>10 September 2025</b>; NFO opened <b>25 September 2025</b> and closed{" "}
                <b>09 October 2025</b>. Units were allotted on <b>20 October 2025</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — dated 10 Sep 2025" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax and risk factors" },
                  { t: "Statutory disclosures portal", d: "Portfolio holdings, TER, factsheet (qsif.com)" },
                  { t: "Monthly factsheet", d: "Portfolio snapshot, TER, performance" },
                  { t: "NAV history", d: "qsif.com/NAV/historic-Nav-Details.aspx" },
                  { t: "quant Mutual Fund website", d: "qsif.com" },
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">ISID dated</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">10 September 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opens</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">Thursday, 25 September 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closes</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">Thursday, 09 October 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / reopen</td><td className="py-3 pl-4 font-semibold">Within 5 business days of allotment</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NSE listing</td><td className="py-3 pl-4 font-semibold">In-principle: NSE/LIST/5909 (08 Sep 2025)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption days</td><td className="py-3 pl-4 font-semibold">Every Tuesday &amp; Wednesday</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Settlement</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">T+3 working days</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">TER caps (SEBI Regulation 52)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">AUM slab</th>
                      <th className="py-3 px-4 text-right">Max TER</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">First ₹500 Cr of daily net assets</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">2.25%</td></tr>
                    <tr><td className="py-3 pr-4">Investor-communication &amp; other costs</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">Up to 2.25%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Current Regular plan TER: <b className="font-mono tabular-nums">{FUND.terRegular.toFixed(2)}%</b>.
                Direct plan TER: <b className="font-mono tabular-nums">{FUND.ter.toFixed(2)}%</b> (typically 40–70 bps lower — no distributor commission).
                Additional B30 incentive and GST applicable as per SEBI regulations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load <b>1%</b> if redeemed / switched-out on or before <b>15 days</b> from allotment</li>
                  <li>• <b>Nil</b> exit load after 15 days</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Redemption proceeds within 3 business days</li>
                  <li>• Redemption price will not be lower than 95% of applicable NAV</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Application amounts</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• NFO min: <b>₹10 lakh</b> (multiples of Re. 1 thereafter)</li>
                  <li>• Accredited investor NFO min: <b>₹1 lakh</b></li>
                  <li>• Ongoing purchase: <b>₹10 lakh</b> (PAN-level aggregated across all qsif strategies)</li>
                  <li>• Additional purchase: <b>₹10,000</b></li>
                  <li>• Min redemption / switch-out: <b>₹1,000</b></li>
                  <li>• SIP / SWP / STP: ₹10,000 (min 6 instalments), post-reopen</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="qsif-hybrid-long-short" fundName="qSIF Hybrid by Quant" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default QsifHybridSif;
