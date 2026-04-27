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

const FUND = getSifBySlug("arudha-hybrid-long-short")!;
const PEER_FUNDS = getPeers("arudha-hybrid-long-short");

const AMC_URL = "https://bandhanmutual.com/";
const SIF_URL = "https://www.arudhasif.com/";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
/* ------------------------------------------------------------------ */
/*  Static data for Arudha                                             */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Hybrid Long-Short",
  "Interval Strategy",
  "Balanced Equity-Debt",
  "Derivative Overlay",
  "Capital Protection",
  "Moderate Risk",
];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";
const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Apr 8, 2026", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "March Alpha", value: "+6.42%", sub: "vs benchmark", color: "text-green-600" },
];

const INFO_BAR = [
  { label: "AUM", value: "NFO-era" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "04 Feb 2026" },
  { label: "Redemption", value: "Mon & Thu" },
  { label: "SIP", value: "₹10,000+" },
  { label: "Exit Load", value: "Nil" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "Feb 2026", value: "+0.00%" },
  { period: "Mar 2026", value: "+0.49%" },
];

const ALLOCATION_TAGS = [
  "Equity 35–65%",
  "Debt 35–65%",
  "InvITs 0–20%",
  "Short derivatives 0–25%",
  "Overseas ≤50%",
  "Physical short ≤20%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Bandhan AMC" },
  { label: "SIF", value: "Arudha SIF" },
  { label: "Category", value: "Hybrid Long-Short" },
  { label: "Type", value: "Interval" },
  { label: "Inception date", value: "04 Feb 2026" },
  { label: "Benchmark", value: "CRISIL Hybrid 85+15 Conservative" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.00%" },
  { label: "Exit load", value: "Nil" },
  { label: "NFO price", value: "₹10 / unit" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Mon & Thu" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP / STP / SWP", value: "₹10,000+ (6 instalments)" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Notice period", value: "≤15 working days" },
  { label: "Listing", value: "NSE & BSE (proposed)" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 3 · Moderate", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Level 2" },
  { label: "Short selling (physical)", value: "≤20% (5% single party)" },
  { label: "Unhedged short (deriv.)", value: "≤25%" },
  { label: "Gross exposure", value: "≤100% NAV" },
  { label: "Segregated portfolio", value: "Permitted" },
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
  { name: "Kapil Kankonkar", initials: "KK", role: "Fund Manager — Equity", sleeve: "Equity" },
  { name: "Nilesh Saha", initials: "NS", role: "Fund Manager — Equity / L-S", sleeve: "Equity" },
  { name: "Brijesh Shah", initials: "BS", role: "VP — Fixed Income & Overseas", sleeve: "Debt" },
  { name: "Debraj Lahiri", initials: "DL", role: "VP — Credit Research, FI", sleeve: "Debt" },
];

const SUITABLE = [
  "Income-oriented investors with ≥₹10L surplus",
  "Seekers of balanced equity-debt with downside hedge",
  "3+ year horizon with moderate risk appetite",
  "Investors comfortable with twice-weekly liquidity",
];
const NOT_SUITABLE = [
  "Guaranteed-return seekers",
  "Investors needing daily liquidity",
  "Below ₹10L investable surplus (non-accredited)",
  "Short-term traders / leverage seekers",
];

const PILLARS = [
  { title: "Core — Equity Longs", desc: "35–65% equity & equity-related instruments for capital appreciation across market caps", color: "orange" },
  { title: "Core — Fixed Income", desc: "35–65% in debt and money-market instruments for accrual, stability and portfolio ballast", color: "red" },
  { title: "Enhancer — Short via Derivatives", desc: "Up to 25% unhedged short exposure (naked) via exchange-traded derivatives in equity and debt", color: "rose" },
  { title: "Enhancer — Derivative Strategies", desc: "23+ derivative strategies: covered calls, protective puts, spreads, straddles, strangles, iron condors, pair trades", color: "amber" },
  { title: "Diversifier — InvITs & Overseas", desc: "Up to 20% InvITs for yield; up to 50% in ADR/GDR, foreign equity and overseas ETFs (subject to RBI/SEBI limits)", color: "blue" },
  { title: "Risk — Structural", desc: "Gross exposure cap at 100% NAV. Physical short selling ≤20% (≤5% per party). No leverage. No commodity derivatives.", color: "emerald" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equities and equity-related instruments", min: "35%", max: "65%" },
  { t: "Debt and money market instruments", min: "35%", max: "65%" },
  { t: "Units issued by InvITs", min: "0%", max: "20%" },
  { t: "Short exposure via unhedged derivatives (equity + debt)", min: "0%", max: "25%" },
  { t: "Overseas securities (ADR/GDR/foreign equity/ETFs)", min: "0%", max: "50%" },
  { t: "Physical short selling of securities", min: "0%", max: "20%" },
];

const STRATEGY_MIX = [
  { name: "Equity Long (Core)", range: "35–65%", width: "55%", color: "bg-orange-500" },
  { name: "Debt & Money Market", range: "35–65%", width: "50%", color: "bg-red-500" },
  { name: "Short Derivatives (Unhedged)", range: "0–25%", width: "20%", color: "bg-rose-500" },
  { name: "InvITs / Overseas diversifiers", range: "0–20%", width: "12%", color: "bg-amber-500" },
];

const DERIV_STRATS = [
  { t: "Income Generation", note: "Covered calls, cash-secured puts, premium capture" },
  { t: "Protection", note: "Protective puts, collars, portfolio hedging" },
  { t: "Directional", note: "Bull / bear spreads, long calls/puts, synthetic positions" },
  { t: "Volatility", note: "Straddles, strangles, butterflies, iron condors" },
  { t: "Hedging & Pairs", note: "Pair trades, market-neutral, synthetic hedges" },
  { t: "Fixed Income Derivatives", note: "IRS, FRA, permitted credit derivatives" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Kapil Kankonkar",
    initials: "KK",
    role: "Fund Manager — Equity (Arbitrage lead)",
    exp: "19+ yrs",
    bio: "Associated with Bandhan AMC since June 2025 as part of the equity fund management team, responsible for equity investment function. Previously at Kotak Securities (Feb 2023 – Jun 2025) and JM Financial Services (Jun 2007 – Feb 2023), where he managed Arbitrage Funds. Also fund manager for Bandhan Arbitrage Fund, Bandhan Equity Savings Fund and Bandhan Multi Asset Allocation Fund. BE + Master of Management Studies.",
    color: "orange",
  },
  {
    name: "Nilesh Saha",
    initials: "NS",
    role: "Fund Manager — Equity / Long-Short",
    exp: "11+ yrs",
    bio: "Joined Bandhan AMC on 29 September 2025 as part of the equity investment team. Previously at Julius Baer Wealth Advisors (India) (Sep 2023 – Sep 2025) managing investment research and portfolio management for a Category III AIF, and at Edelweiss AMC (May 2014 – Aug 2023) on investment research and portfolio management for Category III AIF — bringing long-short and hedge-fund-style derivative experience. BE (Hons) Mechanical, IIM Bangalore MBA, CFA charter-holder.",
    color: "amber",
  },
  {
    name: "Brijesh Shah",
    initials: "BS",
    role: "Vice President — Fixed Income & Overseas",
    exp: "15+ yrs",
    bio: "With Bandhan AMC since August 2015 as part of the Fixed Income team; now handles FI and overseas fund management for the strategy. Prior roles: IDBI AMC (2013–2015), Indiabulls AMC (2011–2012), Mata Securities and Twenty First Century (wholesale debt). Current manager for Bandhan Liquid, Money Market, Floater, Overnight, Balanced Advantage (debt), Multi-Factor Fund and several index/FOF debt strategies. PGDF in Finance.",
    color: "red",
  },
  {
    name: "Debraj Lahiri",
    initials: "DL",
    role: "VP — Credit Research, Fixed Income",
    exp: "14+ yrs",
    bio: "Joined Bandhan AMC on 03 April 2023 as Fund Manager and VP — Credit Research, Fixed Income. Previously at ICICI Prudential AMC (2018–2023) and Invesco India (2013–2018) as Credit Analyst for fixed-income and hybrid fund credit appraisal. Earlier at CARE Ratings (2010–2013) as Credit Rating Analyst. Current manager of Bandhan Floating Rate Fund and Bandhan Credit Risk Fund. PGDM IMT Ghaziabad, BTech (Electronics & Instrumentation) Heritage Institute.",
    color: "rose",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Market Risk", d: "Equity and debt prices fluctuate with macro, liquidity and sentiment. Balanced 35–65% equity + 35–65% debt dampens but does not eliminate drawdowns." },
  { t: "Derivatives Risk", d: "Options/futures are leveraged — small moves can amplify gains or losses. Used extensively for covered calls, straddles, strangles, spreads and hedging; execution depends on FM skill." },
  { t: "Short-Selling Risk", d: "Unhedged short via derivatives up to 25% can face theoretically unlimited loss on underlying rallies. Physical short selling capped at 20% net assets with 5% single-party cap." },
  { t: "Interest-Rate Risk", d: "Debt sleeve of 35–65% is sensitive to yield curve moves. Managed via duration positioning and high-grade debt bias." },
  { t: "Credit & Default Risk", d: "Debt sleeve exposed to credit migration and default. No investment in unrated debt. Segregated-portfolio mechanism allowed in case of credit event." },
  { t: "Liquidity & Interval Risk", d: "Redemption only Monday & Thursday with notice period up to 15 working days. T+3 settlement. Not a daily-liquid product — investors must plan cash needs." },
  { t: "Concentration Risk", d: "SEBI single-issuer and group exposure caps apply. Physical short selling limited to 5% per party; InvITs ≤20%; overseas ≤50%." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives mitigate counterparty risk. DVP and CCIL-settled where applicable. OTC exposures limited to rated counterparties." },
  { t: "Overseas / FX Risk", d: "Up to US $25M overseas securities + $25M overseas ETFs (within RBI/SEBI headroom). Currency and country risks apply; no overseas ETF investment until SEBI permission refreshed." },
  { t: "Model & Execution Risk", d: "Derivative overlay depends on volatility regime and liquidity. Pair-trade correlation breakdown, expiry slippage and rebalancing (30-day SEBI deviation rule) are actively managed." },
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

const ArudhaSif = () => {
  const fundData = getSifBySlug("arudha-hybrid-long-short");
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
              <span className="text-gray-600">Arudha</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    <span className="text-sm text-gray-500">Bandhan Mutual Fund · Arudha SIF</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-green-600 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Arudha Hybrid Long-Short Fund
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
                    <span className="text-2xl font-bold text-gray-900">₹{FUND.currentNav.toFixed(4)}</span>
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
                            returnMode === mode ? "bg-orange-600 text-white" : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {TRAILING.map((t) => {
                      const pos = !t.value.startsWith("-") && t.value !== "+0.00%";
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold ${pos ? "text-green-600" : t.value.startsWith("-") ? "text-red-600" : "text-gray-700"}`}>{t.value}</p>
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
                    Generate short- to medium-term optimal returns by investing predominantly in a combination of{" "}
                    <b>equity and debt securities</b>, while also utilising <b>limited short exposure</b> in both
                    asset classes through derivatives. A balanced interval strategy using both market-neutral
                    and directional approaches based on the prevailing market outlook. Benchmarked to the{" "}
                    <b>CRISIL Hybrid 85+15 Conservative Index</b>.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-orange-50 text-xs font-medium text-orange-700 border border-orange-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Arudha is Bandhan&apos;s flagship SIF: a balanced equity-debt long-short vehicle that can
                    flexibly tilt between equity (35–65%) and debt (35–65%) while using up to{" "}
                    <b>25% unhedged short exposure</b> via derivatives for downside protection and alpha.
                    The interval structure (daily subscribe, redeem Mon/Thu) supports disciplined, tax-
                    efficient return generation without daily liquidity pressures on the portfolio.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Cumulative gross exposure is hard-capped at <b>100% of NAV</b>. No leverage. No
                    commodity derivatives. No unrated debt. Physical short selling is capped at 20% net
                    assets with a 5% single-party limit.
                  </p>
                </div>

                {/* SIX PILLARS */}
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
                <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Arudha</h3>
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
                    {PEERS.map((p) => (
                      <a key={p.name} href={p.href} className="rounded-lg border border-gray-100 p-3 hover:border-orange-200 hover:bg-orange-50/30 transition-colors">
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className="text-sm font-bold text-green-600 mt-1">{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
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
                Arudha is constructed as a <b>balanced equity-debt core</b> augmented by a
                <b> derivative overlay</b> for short exposure and return enhancement. Equity and debt
                each occupy a 35–65% wide band, letting the fund tilt defensively (higher debt, deeper
                hedges) or aggressively (higher equity, directional options) based on the market regime.
                A disciplined 100% gross-exposure cap keeps the book un-leveraged at all times.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-orange-50 p-4 text-center">
                  <p className="text-xs text-orange-700 mb-1">Equity long</p>
                  <p className="text-lg font-bold text-orange-700">35–65%</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4 text-center">
                  <p className="text-xs text-red-700 mb-1">Debt & MM</p>
                  <p className="text-lg font-bold text-red-700">35–65%</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1">Short (deriv.)</p>
                  <p className="text-lg font-bold text-rose-700">0–25%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">InvITs</p>
                  <p className="text-lg font-bold text-amber-700">0–20%</p>
                </div>
              </div>
            </div>

            {/* Strategy mix — horizontal bars */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Indicative sleeve mix</h3>
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
                Source: Arudha Hybrid Long-Short Fund ISID (January 2, 2026) — Bandhan AMC. Weights are
                indicative ranges; actual allocation varies with market regime and fund-manager view.
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
                Cumulative gross exposure capped at 100% of net assets. Overseas: up to US $25M in
                overseas securities + US $25M in overseas ETFs (soft limit for 6 months post-NFO; no
                overseas ETF investment until SEBI permission refreshed). No investment in unrated debt.
                No commodity derivatives.
              </p>
            </div>

            {/* Derivative strategies toolkit */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Derivative toolkit</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The ISID lists an extensive set of permitted derivative strategies across six buckets.
                The fund manager deploys these selectively based on volatility regime, expected range,
                and directional view — always within the 25% unhedged-short ceiling and 100% gross cap.
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {DERIV_STRATS.map((s) => (
                  <div key={s.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-orange-700 mb-1">{s.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Derivative exposure summary */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivative exposure limits</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Unhedged short via derivatives: <b>up to 25%</b> of net assets (equity + debt)</li>
                  <li>• Hedging-purpose derivatives: <b>not counted</b> toward the 25% limit</li>
                  <li>• Cumulative gross exposure: <b>≤100%</b> of NAV</li>
                  <li>• Physical short selling: <b>≤20%</b> of net assets</li>
                  <li>• Single-party short limit: <b>≤5%</b> of net assets</li>
                  <li>• No commodity derivatives</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Exposure calculation</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>Futures:</b> Futures price × lot size × contracts</li>
                  <li>• <b>Options sold:</b> Market price of underlying × lot × contracts</li>
                  <li>• <b>Other derivatives:</b> Notional market value</li>
                  <li>• Exposure measured as maximum possible loss on the position</li>
                  <li>• Rebalancing within <b>30 days</b> on passive breach (ISID Part II.A)</li>
                </ul>
              </div>
            </div>

            {/* Scenario table */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Portfolio behaviour across market regimes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Regime</th>
                      <th className="py-3 px-4 font-semibold">Long equity</th>
                      <th className="py-3 px-4 font-semibold">Short book</th>
                      <th className="py-3 pl-4 font-semibold">Debt</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-medium">Bull (Nifty +15%)</td><td className="py-3 px-4 text-green-600">Gains</td><td className="py-3 px-4 text-red-600">Drag</td><td className="py-3 pl-4 text-gray-500">Accrual</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-medium">Bear (Nifty −15%)</td><td className="py-3 px-4 text-red-600">Losses</td><td className="py-3 px-4 text-green-600">Hedge gains</td><td className="py-3 pl-4 text-gray-500">Stable / positive</td></tr>
                    <tr><td className="py-3 pr-4 font-medium">Range-bound</td><td className="py-3 px-4 text-gray-500">Flat</td><td className="py-3 px-4 text-green-600">Premium capture</td><td className="py-3 pl-4 text-gray-500">Accrual</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> SIFs do not publish monthly top-10 holdings in the same
                format as regular mutual funds. The Arudha ISID discloses strategy-level allocation
                ranges and derivative-strategy categories; position-level holdings are reported to
                the AMC and regulator but are not publicly disseminated on a monthly basis.
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
                Arudha is jointly managed across two core sleeves — <b>equity &amp; long-short</b> and{" "}
                <b>fixed income (incl. overseas)</b>. The team combines arbitrage-fund experience
                (Kankonkar), Cat III long-short AIF expertise (Saha), and deep debt &amp; credit
                research bench (Shah, Lahiri) from Bandhan&apos;s ₹1.5 lakh-crore mutual fund platform.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-xs text-orange-700 font-semibold">EQUITY / L-S</p>
                  <p className="text-xs text-gray-600 mt-1">Kankonkar · Saha</p>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-xs text-red-700 font-semibold">DEBT / OVERSEAS</p>
                  <p className="text-xs text-gray-600 mt-1">Shah · Lahiri</p>
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
                        Bandhan AMC
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{m.bio}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Oversight &amp; platform</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• <b>AMC:</b> Bandhan AMC Limited, 6th Floor, One World Centre, Prabhadevi, Mumbai</li>
                <li>• <b>Trustee:</b> Bandhan Mutual Fund Trustee Limited (independent)</li>
                <li>• <b>Compliance Officer:</b> Vijayalaxmi Khatri</li>
                <li>• <b>Investor Relation Officer:</b> Ms. Neeta Singh (022-66289999)</li>
                <li>• <b>Registrar:</b> CAMS (camsonline.com)</li>
                <li>• <b>Websites:</b> arudhasif.com · bandhanmutual.com</li>
              </ul>
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
                  Level 3 · Moderate
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band Level 3 (on a 1–5 scale) indicates <b>moderate-to-high</b> risk. The benchmark
                (CRISIL Hybrid 85+15 Conservative Index) carries a Level 2 risk band. The product
                labelling was assigned during NFO based on internal assessment of strategy
                characteristics; it may be revised post-launch as actual portfolio attributes evolve.
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
                  <p className="text-sm font-bold text-green-700 mb-1">Structural (SEBI-mandated)</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Cumulative gross-exposure cap of 100% NAV. Unhedged short cap of 25%. Physical
                    short limited to 20% (single-party ≤5%). No unrated debt. No commodity derivatives.
                    30-day rebalancing on passive breach.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Exchange-traded derivatives with DVP/CCIL settlement. Segregated-portfolio
                    mechanism allowed for credit events. Notice period of ≤15 working days to manage
                    liquidity. Delta, vega and expiry monitoring on derivative book.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily exposure, factor and volatility monitoring. Credit surveillance led by
                    dedicated VP-Credit Research. Overseas soft limits tracked monthly per SEBI
                    Paragraph 12.19.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Governance</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent Trustee (Bandhan MF Trustee Ltd), AMC Board Investment/Risk
                    Committees, Compliance Officer (Vijayalaxmi Khatri), SEBI periodic disclosures,
                    and RTA reconciliation via CAMS.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">March 2026 crash performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">Arudha</th>
                      <th className="py-3 pl-4">Benchmark / Category</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund return</td><td className="py-3 px-4 font-semibold text-green-600">+0.07%</td><td className="py-3 pl-4">Benchmark −6.35%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Capital protected</td><td className="py-3 px-4 font-semibold text-green-600">100.0%</td><td className="py-3 pl-4">Category avg −2.76%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Alpha vs benchmark</td><td className="py-3 px-4 font-semibold text-green-600">+6.42%</td><td className="py-3 pl-4">vs Category +2.83%</td></tr>
                    <tr><td className="py-3 pr-4">Rank in category</td><td className="py-3 px-4 font-semibold text-green-600">1 of 6</td><td className="py-3 pl-4">Hybrid L-S peers</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Comparison vs Cat III AIF (Long-Short)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">Arudha SIF</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min ticket</td><td className="py-3 px-4 font-semibold text-green-600">₹10 lakh</td><td className="py-3 pl-4">₹1 crore</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None (100% gross)</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7%</td></tr>
                    <tr><td className="py-3 pr-4">Investor LTCG</td><td className="py-3 px-4 font-semibold text-green-600">12.5% post 24M</td><td className="py-3 pl-4">Slab / business income</td></tr>
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
                All documents are hosted on the Arudha SIF portal. The ISID is dated{" "}
                <b>2 January 2026</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Scheme scrip code", d: "ASIF/I/H/HLSF/25/12/0001/BNDN" },
                  { t: "Monthly factsheet (post-launch)", d: "Portfolio snapshot, TER, performance" },
                  { t: "Arudha SIF website", d: "arudhasif.com" },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={SIF_URL}
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">ISID dated</td><td className="py-3 pl-4 font-semibold">2 January 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opened</td><td className="py-3 pl-4 font-semibold">9 January 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold">22 January 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer reopened</td><td className="py-3 pl-4 font-semibold">4 February 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO price</td><td className="py-3 pl-4 font-semibold">₹10 / unit</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Exchange listing</td><td className="py-3 pl-4 font-semibold">BSE (07 Nov 2025) · NSE (12 Nov 2025)</td></tr>
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
                typically 40–70 bps lower (no distributor commission). TER and daily TER will be
                published on arudhasif.com/downloads post-launch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load: <b>Nil</b></li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Dispatch of redemption proceeds: within 3 working days</li>
                  <li>• Delay interest: 15% p.a. beyond T+3</li>
                  <li>• IDCW dispatch: within 7 working days of record date</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Redemption &amp; investment rules</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Redeem: every Monday &amp; Thursday (cut-off 3:00 PM)</li>
                  <li>• Next business day NAV if Mon/Thu is a holiday</li>
                  <li>• Notice period: up to 15 working days</li>
                  <li>• Min initial: ₹10 lakh (₹1 lakh for accredited investors)</li>
                  <li>• Min additional: ₹10,000</li>
                  <li>• Min SIP/SWP/STP: ₹10,000 × 6 instalments</li>
                  <li>• Segregated portfolio permitted on credit event</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Plans &amp; options</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">
                Regular Plan &amp; Direct Plan (common portfolio, separate NAVs). Each plan offers{" "}
                <b>Growth</b> and <b>IDCW</b> options. IDCW frequencies: Daily, Weekly, Fortnightly,
                Monthly, Quarterly, Half-yearly, Annual &amp; Periodic (each with Payout / Reinvestment
                / Transfer facility). Default: Growth Option; within IDCW, Monthly Reinvestment.
              </p>
              <p className="text-[11px] text-gray-400">
                IDCW payouts ≤ ₹100/folio will be compulsorily reinvested. Investor service:
                investormf@bandhanamc.com · 1-800-300-66688 · 1-800-266-6688.
              </p>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="arudha-hybrid-long-short" fundName="Arudha SIF by Bandhan" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ArudhaSif;
