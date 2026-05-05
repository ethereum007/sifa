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

const FUND = getSifBySlug("apex-hybrid-long-short")!;
const PEER_FUNDS = getPeers("apex-hybrid-long-short");

const AMC_URL = "https://mutualfund.adityabirlacapital.com/";
const ABSL_ACCENT = "#C8102E"; // ABSL brand red

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
import { useFundNav, formatNavDate } from "@/hooks/useSifNav";

/* ------------------------------------------------------------------ */
/*  Static data for Apex                                               */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Hybrid Long-Short",
  "Arbitrage Core",
  "Fixed Income Core",
  "Derivatives Overlay",
  "Special Situations",
  "Interval Strategy",
];

const siReturn = FUND.returns.sinceInception ?? 0;
const siColor = siReturn >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Regular · Growth", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Max 2.25% equity", color: "" },
  { label: "Min Investment", value: "₹10 L", sub: "₹1L accredited", color: "" },
];

const INFO_BAR = [
  { label: "Inception", value: "Post NFO (Mar 2026)" },
  { label: "Min Investment", value: "₹10L" },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}% max` },
  { label: "Redemption", value: "Mon & Wed" },
  { label: "Exit Load", value: "0.50% <90d" },
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
  "Equity 35–65%",
  "Debt 35–65%",
  "InvITs 0–20%",
  "Overseas 0–35%",
  "Unhedged short 0–25%",
  "Derivatives up to 100%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Aditya Birla Sun Life MF" },
  { label: "Category", value: "Hybrid Long-Short" },
  { label: "Type", value: "Interval" },
  { label: "ISID dated", value: "27 Feb 2026" },
  { label: "NFO period", value: "06–18 Mar 2026" },
  { label: "Benchmark", value: "Nifty 50 Hybrid Debt 50:50" },
  { label: "Strategy code", value: "APEX/I/H/HLSF/26/02/0001" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.25% equity · 2.00% debt" },
  { label: "Exit load", value: "0.50% <90d · Nil after" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Mon & Wed" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "Min additional", value: "₹1,000" },
  { label: "Min redemption", value: "₹10,000" },
  { label: "Listing", value: "NSE (demat)" },
];

const RISK = [
  { label: "Risk band", value: "Assigned at NFO", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Moderate" },
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
  { name: "Lovelish Solanki", initials: "LS", role: "Fund Manager — Equity", sleeve: "Equity" },
  { name: "Mohit Sharma", initials: "MS", role: "Senior Fund Manager — Debt", sleeve: "Debt" },
];

const SUITABLE = [
  "Investors with ≥₹10L surplus seeking hybrid exposure",
  "Low-vol, bond-plus return profile",
  "Post-tax LTCG 12.5% (after 12M) seekers",
  "18+ month horizon, comfortable with Mon/Wed redemption",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Investors needing daily liquidity",
  "Below ₹10L investable surplus (non-accredited)",
  "Short-term traders chasing directional equity",
];

const PILLARS = [
  { title: "Income Anchor — Debt & Arbitrage", desc: "Stability and predictable income via cash-future arbitrage, covered calls and high-quality fixed income (0–3Y duration).", color: "blue" },
  { title: "Derivatives Overlay", desc: "Covered calls, straddles/strangles, put protection to enhance returns and hedge directional risk. Unhedged short ≤25%.", color: "emerald" },
  { title: "Tactical Alpha", desc: "Event-driven gains from special situations — IPO, buyback, open offer, rights issue, delisting, merger/demerger arbitrage.", color: "amber" },
  { title: "Dynamic Equity Allocation", desc: "Directional equity + special situations 0–40%, sized through an in-house equity valuation model. Adapts to market regime.", color: "indigo" },
  { title: "Risk Control", desc: "Call/Put option protection on drawdowns. 100% gross exposure cap, 25% unhedged short cap, single-issuer debt limits.", color: "rose" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity & equity-related instruments (incl. ETFs / EOF)", min: "35%", max: "65%" },
  { t: "Debt & money market instruments (incl. debt ETFs / MF)", min: "35%", max: "65%" },
  { t: "Units issued by InvITs", min: "0%", max: "20%" },
  { t: "Overseas securities (no overseas derivatives)", min: "0%", max: "35%" },
  { t: "Unhedged short via derivatives (equity + debt)", min: "0%", max: "25%" },
  { t: "Securities lending", min: "0%", max: "20% of net assets" },
];

const STRATEGY_MIX = [
  { name: "Arbitrage (Cash-Future + Covered Call + Dividend)", range: "up to 65%", width: "60%", color: "bg-blue-500" },
  { name: "Fixed Income (0–3Y, AAA/Sov to AA)", range: "35–65%", width: "50%", color: "bg-indigo-500" },
  { name: "Directional Equity + Special Situations", range: "0–40%", width: "30%", color: "bg-amber-500" },
  { name: "Derivative Strategies (Options, unhedged short)", range: "0–25%", width: "20%", color: "bg-emerald-500" },
];

const SPECIAL_SITS = [
  { t: "Open Offer / Buyback", window: "4–8 months", note: "Hedge to acceptance ratio for F&O stocks" },
  { t: "Rights Issue", window: "2–4 months", note: "Fully and partly paid-up entitlements" },
  { t: "Merger Arbitrage", window: "6–12 months", note: "Long-short on swap ratio" },
  { t: "Delisting", window: "Event-driven", note: "Premium capture above floor price" },
  { t: "Demerger", window: "6–12 months", note: "Value unlocking post-demerger" },
  { t: "Securities Lending / Borrowing", window: "Continuous", note: "Additional interest on portfolio securities" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios (from ISID & release deck)                       */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Lovelish Solanki",
    initials: "LS",
    role: "Fund Manager — Equity Sleeve",
    exp: "17+ yrs",
    bio: "Fund Manager at Aditya Birla Sun Life AMC since October 2014. Over 17 years in trading and fund management across Equity and Debt. Earlier Equity / Equity Derivatives Trader at Union KBC AMC (Feb 2011 onwards), where he managed the Options part of Capital Protection and close-ended schemes. Prior to that, spent 3 years at Edelweiss AMC executing and managing arbitrage funds. MMS (Finance) and BMS (Finance) from Mumbai University. Level 1 Chartered Market Technician (CMT) — 2012. Currently manages ~₹36,682 Cr across 3 schemes.",
    color: "blue",
    qual: "MMS (Finance), BMS (Finance), CMT L1",
  },
  {
    name: "Mohit Sharma",
    initials: "MS",
    role: "Senior Fund Manager — Debt Sleeve",
    exp: "19+ yrs",
    bio: "Senior Fund Manager with ABSL AMC, where he has been for ~5 years (joined October 2015). 19 years of total experience, 11 years in financial markets. Prior stints as Interest Rates Trader at Standard Chartered Bank (2007–2011) and ICICI Bank (2006–2007); started career in Equity Research at Irevna Ltd (CRISIL subsidiary). Also ran a healthcare-tech business (2012–2015). PGDCM from IIM Calcutta (2005); B.Tech from IIT Madras (2003). Currently manages ~₹1,07,695 Cr across 15 schemes.",
    color: "indigo",
    qual: "PGDCM — IIM Calcutta; B.Tech — IIT Madras",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Equity Market Risk", d: "Equity and equity-related securities are volatile; prone to daily price fluctuations from market, sector and stock-specific factors. Directional equity + special situations can run up to 40%." },
  { t: "Derivatives Risk", d: "Derivatives exposure can be up to 100% (hedging + non-hedging combined). Options premium and futures margin require active collateral management. Small moves can amplify P&L." },
  { t: "Unhedged Short Risk", d: "Unhedged short via derivatives up to 25% of net assets. Theoretical loss is unbounded on the short leg if the underlying rises sharply." },
  { t: "Interest-Rate Risk", d: "Debt sleeve (35–65%) duration up to 3 years. Sensitive to yield curve shifts, repo actions and liquidity conditions." },
  { t: "Credit & Concentration Risk", d: "Debt universe spans Sovereign/AAA down to AA (up to 75% in below-AAA). Structured obligations capped at 10% of debt portfolio; single-issuer group exposure capped at 5%." },
  { t: "Liquidity & Interval Risk", d: "Redemption only on Monday and Wednesday; settlement within T+3 working days. Not a daily-liquid product — investors must plan around the interval cycle." },
  { t: "InvIT Risk", d: "InvIT units subject to price, reinvestment and interest-rate risks. Cash flows can be volatile; the scheme can invest up to 20% in InvITs and 10% per single issuer." },
  { t: "Overseas Securities Risk", d: "Up to 35% overseas exposure (no overseas derivatives). Currency, geopolitical, repatriation and accounting-standard risks apply." },
  { t: "Special-Situation Risk", d: "Open-offer acceptance ratios, buyback tender acceptance, delisting outcomes and merger swap ratios are not guaranteed even when the thesis is sound." },
  { t: "Execution & Counterparty Risk", d: "Securities lending (≤20% of net assets, ≤5% to a single counterparty). Repo/reverse-repo in corporate debt capped at 10% of net assets." },
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

const ApexSif = () => {
  const __live = useFundNav("Apex Hybrid Long-Short", FUND.currentNav);
  const liveNav = __live.nav;
  const liveDate = formatNavDate(__live.date) || "Regular · Growth";
  const METRICS_LIVE = METRICS.map((m, i) =>
    i === 0 ? { ...m, value: `₹${liveNav.toFixed(4)}`, sub: liveDate } : m
  );

  const fundData = getSifBySlug("apex-hybrid-long-short");
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
              <span className="text-gray-600">Apex</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <AmcLogo amc="Aditya Birla Sun Life Mutual Fund" size="md" />
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ABSL_ACCENT }} />
                      <span className="text-sm text-gray-500">Aditya Birla Sun Life Mutual Fund</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-white font-bold px-2 py-0.5 rounded text-[11px]" style={{ backgroundColor: ABSL_ACCENT }}>
                      NFO
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Apex Hybrid Long-Short Fund
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
                  <Button size="sm" className="text-white" style={{ backgroundColor: ABSL_ACCENT }}>
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
                    activeTab === tab ? "" : "text-gray-400 hover:text-gray-600"
                  }`}
                  style={activeTab === tab ? { color: ABSL_ACCENT } : {}}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: ABSL_ACCENT }} />
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
                  <p className="text-[11px] text-gray-400 mt-3">Live NAV data · Source: AMFI NAV API (post-allotment).</p>
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
                            returnMode === mode ? "text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                          style={returnMode === mode ? { backgroundColor: ABSL_ACCENT } : {}}
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
                  <p className="text-[11px] text-gray-400 mt-3">Performance track record not yet available — this is a new investment strategy.</p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    An interval investment strategy investing in <b>arbitrage, long equity, debt,
                    equity and debt derivatives, long short and REITs/InvITs</b> including limited
                    short exposure on permitted instruments through derivatives. Benchmarked to the{" "}
                    <b>Nifty 50 Hybrid Composite Debt 50:50 Index</b>. There is no assurance that the
                    investment objective will be achieved.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy &amp; allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full text-xs font-medium border"
                        style={{ color: ABSL_ACCENT, backgroundColor: "#FDECEF", borderColor: "#F7C8CF" }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Apex is Aditya Birla Sun Life AMC&apos;s entry into the SIF hybrid long-short
                    category. The construct combines an <b>income anchor</b> (arbitrage + fixed income,
                    up to ~65% each) with a <b>derivatives overlay</b> (covered calls, straddles, put
                    protection) and <b>tactical alpha</b> from special situations (IPOs, buybacks,
                    open offers, delistings, merger/demerger arbitrage). Net equity exposure is sized
                    dynamically through an in-house equity valuation model, with unhedged short
                    capped at 25% of net assets.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Taxation at investor level: <b>STCG slab rate</b> on ≤12 months, <b>LTCG 12.5%</b>{" "}
                    (without indexation) on &gt;12 months — listing on NSE qualifies units as
                    long-term capital assets after 12 months.
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
                  <div className="grid grid-cols-2 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className="w-11 h-11 rounded-full bg-gray-100 text-gray-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.role}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold hover:underline" style={{ color: ABSL_ACCENT }}>
                    View full bios →
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border p-5" style={{ borderColor: "#F7C8CF", backgroundColor: "#FDECEF55" }}>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Apex</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist. No commitment.</p>
                  <div className="flex gap-2">
                    <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full text-white text-sm" style={{ backgroundColor: ABSL_ACCENT }}>
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
                      <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-gray-300 hover:bg-gray-50 transition-colors">
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

            {/* Portfolio construction approach */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Apex is built as an <b>Income Anchor + Tactical Alpha</b> architecture. The core
                combines cash-future arbitrage, covered calls and a fixed-income sleeve (blend of
                Sovereign/AAA up to AA, duration 0–3 years). The tactical sleeve adds directional
                equity (Nifty 50 basket) and special situations (0–40%), with a derivatives overlay
                for return enhancement and drawdown control.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-xs text-blue-700 mb-1">Arbitrage core</p>
                  <p className="text-lg font-bold text-blue-700 font-mono tabular-nums">up to 65%</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4 text-center">
                  <p className="text-xs text-indigo-700 mb-1">Fixed income</p>
                  <p className="text-lg font-bold text-indigo-700 font-mono tabular-nums">35–65%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">Directional + Spl Sits</p>
                  <p className="text-lg font-bold text-amber-700 font-mono tabular-nums">0–40%</p>
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
                Source: Apex SIF ISID (27 Feb 2026) and ABSL product release deck. Weights are
                indicative; actual allocation varies with market regime and SEBI asset-allocation
                bands.
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
                Cumulative gross exposure capped at 100% of net assets. Unhedged short position up to
                25% for both equity and debt. Scheme will not invest in overseas derivatives.
                Securitized debt ≤20% of debt portfolio.
              </p>
            </div>

            {/* Debt sleeve breakdown */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Fixed-income sleeve construction</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-4">
                  <p className="text-sm font-bold text-indigo-700 mb-2">Accrual Strategy</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• 0–100% in AAA / Sovereign exposure</li>
                    <li>• Up to 75% in not-below-AA rated securities</li>
                    <li>• Duration range: 0–3 years</li>
                    <li>• Blend of rating profiles for higher accrual</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-blue-100 bg-blue-50/40 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Credit Limits</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• AT1/AT2 bonds: ≤10% of debt, ≤5% single issuer</li>
                    <li>• Structured Obligations / Credit Enhancements ≤10% of debt portfolio</li>
                    <li>• Repo in corporate debt ≤10% of net assets</li>
                    <li>• Securitized debt ≤20% of debt portfolio</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Special situations execution windows */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Special-situation execution playbook</h3>
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
                Combined directional equity + special situations sleeve can go up to 40% of net
                assets. Hedging via derivatives is applied to acceptance-ratio risk on F&amp;O stocks.
              </p>
            </div>

            {/* Derivative exposure summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivative exposure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Total derivatives exposure: <b>up to 100%</b> (hedging + non-hedging combined)</li>
                  <li>• Unhedged short via derivatives: <b>up to 25%</b> of net assets</li>
                  <li>• Covered call writing on equity longs</li>
                  <li>• Long/Short strangles &amp; straddles in volatile regimes</li>
                  <li>• Stock &amp; Index call/put options for protection</li>
                  <li>• No overseas derivatives permitted</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Regulatory limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Gross exposure cap: <b>100%</b> of net assets</li>
                  <li>• InvIT exposure: ≤20% of NAV, ≤10% per single issuer</li>
                  <li>• Overseas securities: ≤35% of net assets</li>
                  <li>• Securities lending: ≤20% net assets, ≤5% single intermediary</li>
                  <li>• Inter-scheme investments: ≤5% of Fund NAV (aggregate)</li>
                  <li>• Units of MFs: ≤20% of net assets</li>
                </ul>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> This is a new investment strategy — top-10 holdings and
                sector allocation will be published on the functional ABSL AMC website once the NFO
                is allotted and the portfolio is deployed (within 30 business days of allotment per
                SEBI circular dated Feb 27, 2025).
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
                Apex is jointly managed across two sleeves — <b>equity (arbitrage, derivatives,
                directional, special situations)</b> and <b>fixed income</b>. The team leverages
                ABSL AMC&apos;s institutional platforms: a 20-person equity desk (CIO + Fund Managers +
                Sector Analysts) managing &gt;₹2 lakh Cr and a 13-member fixed-income team managing
                &gt;₹2 lakh Cr. Cumulative experience of the two fund managers: ~30 years.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">EQUITY PORTION</p>
                  <p className="text-xs text-gray-600 mt-1">Lovelish Solanki</p>
                  <p className="text-[11px] text-gray-400">~₹36,682 Cr · 3 schemes</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-3">
                  <p className="text-xs text-indigo-700 font-semibold">DEBT PORTION</p>
                  <p className="text-xs text-gray-600 mt-1">Mohit Sharma</p>
                  <p className="text-[11px] text-gray-400">~₹1,07,695 Cr · 15 schemes</p>
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
                        Aditya Birla Sun Life AMC
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
              <h3 className="text-base font-bold text-gray-900 mb-3">Institutional platform</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Equity desk</p>
                  <p className="text-xs leading-relaxed">
                    Well-regarded equity house managing &gt;₹2 lakh Cr across strategies. Strong team
                    of 20 people including CIO, fund managers and sector analysts. Same team that
                    has delivered in other arbitrage / hybrid categories.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Fixed income desk</p>
                  <p className="text-xs leading-relaxed">
                    One of the largest and well-regarded fixed-income teams in India — 13 members
                    managing aggregate AUM &gt;₹2 lakh Cr across institutional, retail and treasury
                    mandates.
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: ABSLAMC internal assessment. AUM data as of 30 January 2026.
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
                  Assigned at NFO
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                The product risk-band and benchmark risk-band (Nifty 50 Hybrid Composite Debt 50:50
                Index) are assigned during the NFO based on internal assessment of the model
                portfolio. Labels <b>may vary post-NFO</b> when actual investments are made. ABSL
                notes that episodic short-term underperformance versus arbitrage is possible in
                sharp interest-rate regimes; the strategy aims to outperform arbitrage on a rolling
                6-month basis in volatile and bull markets.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Strategy-specific risks</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {STRATEGY_RISKS.map((r) => (
                  <div key={r.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold mb-1" style={{ color: ABSL_ACCENT }}>{r.t}</p>
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
                    SEBI cumulative gross-exposure cap (100% of NAV), unhedged-short cap (25%),
                    single-issuer debt limits, InvIT single-issuer cap (10%), securitized-debt cap
                    (20% of debt portfolio).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Net equity sized via in-house equity valuation model. Arbitrage margin
                    collateralised. Delta / gamma managed on option overlays. Protection via call
                    and put options on drawdowns.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily exposure, duration, credit-quality and liquidity checks. Net short
                    exposure monitored intraday. Segregated-portfolio mechanism available for debt
                    credit events (SEBI Master Circular).
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Investment Committee, Board Risk Committee, ABSL Trusteeship, SEBI periodic
                    disclosures. Performance reviewed by Investment Committee and Boards of AMC and
                    Trustee Company.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Apex SIF vs MF / PMS / AIF (Cat III)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">Apex SIF</th>
                      <th className="py-3 px-4">MF (Balanced)</th>
                      <th className="py-3 px-4">PMS</th>
                      <th className="py-3 pl-4">Cat III AIF</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min investment</td><td className="py-3 px-4 font-semibold font-mono tabular-nums">₹10 L</td><td className="py-3 px-4 font-mono tabular-nums">₹100</td><td className="py-3 px-4 font-mono tabular-nums">₹50 L</td><td className="py-3 pl-4 font-mono tabular-nums">₹1 Cr</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None</td><td className="py-3 px-4">None</td><td className="py-3 px-4">None</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Unhedged short</td><td className="py-3 px-4 font-semibold">Up to 25%</td><td className="py-3 px-4">Hedging only</td><td className="py-3 px-4">Hedging only</td><td className="py-3 pl-4">Wide</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (pass-through)</td><td className="py-3 px-4">Nil</td><td className="py-3 px-4">Nil</td><td className="py-3 pl-4">MMR ~42.7%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 px-4">No</td><td className="py-3 px-4">Usually yes</td><td className="py-3 pl-4">Yes</td></tr>
                    <tr><td className="py-3 pr-4">LTCG (investor)</td><td className="py-3 px-4 font-semibold">12.5% &gt;12M</td><td className="py-3 px-4">12.5% (equity)</td><td className="py-3 px-4">Per security</td><td className="py-3 pl-4">Slab / business</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">Source: ABSL product release (Apex SIF deck, Mar 2026). SIF structure allows derivatives-driven long-short with MF-like tax and regulation, at a ₹10L minimum.</p>
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
                All documents are hosted on Aditya Birla Sun Life Mutual Fund&apos;s Apex SIF portal.
                The ISID is dated <b>27 February 2026</b>; NFO opened <b>06 March 2026</b> and
                closed <b>18 March 2026</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — dated 27 Feb 2026" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax and risk factors" },
                  { t: "Apex fund presentation", d: "Strategy playbook, return contributors, derivative illustrations" },
                  { t: "Monthly factsheet (post-allotment)", d: "Portfolio snapshot, TER, performance" },
                  { t: "Aditya Birla Sun Life AMC website", d: "mutualfund.adityabirlacapital.com" },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-100 p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 group-hover:underline">{d.t}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.d}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">ISID dated</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">27 February 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opens</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">Friday, 06 March 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closes</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">Wednesday, 18 March 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer</td><td className="py-3 pl-4 font-semibold">Within 5 business days of allotment</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NSE listing</td><td className="py-3 pl-4 font-semibold">In-principle approval NSE/LIST/5921 (09 Oct 2025)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption days</td><td className="py-3 pl-4 font-semibold">Every Monday &amp; Wednesday</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Settlement</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">T+3 working days</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">TER caps (SEBI)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Component</th>
                      <th className="py-3 px-4 text-right">Max TER</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Equity-oriented component</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">2.25%</td></tr>
                    <tr><td className="py-3 pr-4">Debt / money-market component</td><td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">2.00%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Current Regular plan TER: <b className="font-mono tabular-nums">{FUND.terRegular.toFixed(2)}%</b>.
                Direct plan TER is typically 40–70 bps lower (no distributor commission). Actual TER
                updated post-allotment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load <b>0.50%</b> if redeemed/switched ≤90 days from allotment</li>
                  <li>• <b>Nil</b> exit load after 90 days</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Redemption proceeds within 3 working days (15% p.a. penal interest on delay)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Application amounts</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• NFO min: <b>₹10 lakh</b> (multiples of Re. 1 thereafter)</li>
                  <li>• Accredited investor NFO min: <b>₹1 lakh</b></li>
                  <li>• Ongoing purchase: <b>₹10 lakh</b> (accredited: ₹1 lakh)</li>
                  <li>• Additional purchase: <b>₹10,000</b></li>
                  <li>• Min redemption / switch-out: <b>₹10,000</b></li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="apex-hybrid-long-short" fundName="Apex SIF by Aditya Birla Sun Life" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ApexSif;
