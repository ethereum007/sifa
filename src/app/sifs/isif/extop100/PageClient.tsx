"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle, ExternalLink } from "lucide-react";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChart";
import MonthlyHeatmap from "@/components/MonthlyHeatmap";
import { getSifBySlug, getPeers, fmtPct } from "@/lib/sifData";

/* ------------------------------------------------------------------ */
/*  Peer href map                                                      */
/* ------------------------------------------------------------------ */

const PEER_HREF: Record<string, string> = {
  "sifs/isif/extop100": "/sifs/isif/extop100",
  "qsif-ex-top-100": "/sifs/qsif-ex-top-100",
  "sifs/isif/hybrid": "/sifs/isif/hybrid",
  "altiva-hybrid-long-short": "/sifs/altiva-hybrid-long-short",
  "sapphire-equity-long-short": "/sifs/sapphire-equity-long-short",
  "arudha-equity-long-short": "/sifs/arudha-equity-long-short",
  "dyna-equity-long-short": "/sifs/dyna-equity-long-short",
};

const FUND = getSifBySlug("sifs/isif/extop100")!;
const PEER_FUNDS = getPeers("sifs/isif/extop100");

const AMC_URL = "https://www.icicipruamc.com";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data — iSIF Ex-Top 100 (ICICI Prudential)                   */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Equity Long-Short",
  "Ex-Top 100 Universe",
  "Mid & Small Cap Focus",
  "Unhedged Shorts ≤25%",
  "ICICI Prudential",
  "Moderate–High Risk",
];

const siColor = (FUND.returns.sinceInception ?? 0) >= 0 ? "text-green-600" : "text-red-600";
const m1Color = (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";
const m3Color = (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600";

const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Apr 2026", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: m1Color },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: m3Color },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Min Investment", value: "₹10L", sub: "₹1K multiples", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "ICICI Prudential MF" },
  { label: "Inception", value: "05 Feb 2026" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "Redemption", value: "Daily · T+3" },
  { label: "SIP", value: "₹1,000+" },
  { label: "Exit Load", value: "1% <12M" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth), color: m1Color },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth), color: m3Color },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception), color: siColor },
  { period: "Benchmark (SI)", value: "-11.06%", color: "text-red-600" },
  { period: "Alpha vs Nifty 500", value: "+3.76%", color: "text-green-600" },
  { period: "Category Avg", value: "-6.79%", color: "text-red-600" },
  { period: "Rank", value: "2 / 2", color: "text-gray-900" },
];

const ALLOCATION_TAGS = [
  "Ex-Top 100 equity 65–100%",
  "Other equity / debt 0–35%",
  "Unhedged shorts 0–25%",
  "Overseas 0–35%",
  "REITs/InvITs 0–10%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "ICICI Prudential MF" },
  { label: "Category", value: "Equity Ex-Top 100 L/S" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception date", value: "05 Feb 2026" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.25%" },
  { label: "Exit load", value: "1% <12M, nil after" },
  { label: "ISID dated", value: "31 Dec 2025" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Daily" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP", value: "₹1,000 / monthly" },
  { label: "Quarterly SIP", value: "₹20,000+" },
  { label: "Min additional", value: "₹1,000" },
  { label: "Lock-in", value: "None" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Very High", color: "text-red-600" },
  { label: "Benchmark risk band", value: "Very High" },
  { label: "Short selling", value: "Derivatives only" },
  { label: "Unhedged short cap", value: "25% of NAV" },
  { label: "Gross exposure cap", value: "100% of NAV" },
];

const PEERS = PEER_FUNDS
  .slice()
  .sort((a, b) => (b.returns.sinceInception ?? 0) - (a.returns.sinceInception ?? 0))
  .slice(0, 4)
  .map((f) => ({
    name: f.shortName + " " + f.category.replace("Long Short", "").replace("Long-Short", "").trim(),
    amc: f.amc,
    ret: fmtPct(f.returns.sinceInception, 1),
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
  }));

const SUITABLE = [
  "HNIs seeking SMID alpha with guardrails",
  "Investors bored of large-cap MF drawdowns",
  "PMS seekers wanting ₹10L ticket entry",
  "3–5 year horizon, tolerant of SMID volatility",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Sub-₹10L investable surplus",
  "Short-term traders / momentum chasers",
  "Investors needing low-volatility / income focus",
];

const PILLARS = [
  { title: "Ex-Top 100 Universe", desc: "Invests 65–100% in companies outside AMFI-defined top 100 by market cap — the mid & small cap opportunity set.", color: "orange" },
  { title: "Unhedged Short Sleeve", desc: "Up to 25% of NAV via unhedged derivative short positions in Ex-Top 100 F&O stocks — downside buffer in drawdowns.", color: "rose" },
  { title: "109 F&O Stocks", desc: "Ex-Top 100 names in F&O universe (~32–37% of total OI) enable institutional-grade short book construction.", color: "amber" },
  { title: "Dynamic Allocation", desc: "Bull: 100% long, low shorts. Bear: min 65% long, up to 25% short, higher options use. 30-day rebalancing rule.", color: "orange" },
  { title: "Risk Discipline", desc: "100% cumulative gross exposure cap, 20% options-premium cap, single-stock and sector limits per SEBI Ch VI-C.", color: "rose" },
];

const STOCK_FILTERS = [
  { t: "Potential Market Leaders", d: "Sector challengers with scalable moats and rising market share." },
  { t: "Strengthening Balance Sheet", d: "Deleveraging, improving return ratios, cash-flow visibility." },
  { t: "Low-Cost Producer", d: "Structural cost advantage that compounds through cycles." },
  { t: "Earnings Visibility", d: "Multi-year earnings growth with low forecast dispersion." },
  { t: "Valuation Comfort", d: "Relative and absolute valuations provide margin of safety." },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity & equity-related of Ex-Top 100 companies", min: "65%", max: "100%" },
  { t: "Other equity / debt & money market", min: "0%", max: "35%" },
  { t: "Units of REITs and InvITs", min: "0%", max: "10%" },
  { t: "Overseas securities (incl. ADR / GDR)", min: "0%", max: "35%" },
  { t: "Unhedged short exposure via derivatives", min: "0%", max: "25%" },
];

const MARKET_BEHAVIOR = [
  { market: "Bullish", smidLong: "Up to 100%", shorts: "Low", options: "Low", debt: "Tactical" },
  { market: "Neutral / Sideways", smidLong: "80–95%", shorts: "10–15%", options: "Moderate", debt: "Accrual" },
  { market: "Bearish", smidLong: "Min 65%", shorts: "Up to 25%", options: "High", debt: "Defensive" },
];

const ALPHA_ENGINES = [
  { t: "Long SMID Book", d: "65–100% in quality Ex-Top 100 equities selected bottom-up." },
  { t: "Unhedged Shorts", d: "F&O shorts on overvalued Ex-Top 100 names (≤25% NAV)." },
  { t: "Covered Calls", d: "Option writing on long positions for income pickup." },
  { t: "Index Hedges", d: "Nifty / Midcap index puts during high-volatility regimes." },
  { t: "Protective Puts", d: "Tail-risk hedges on concentrated long names." },
  { t: "Bear Call / Put Spreads", d: "Defined-risk short-delta structures." },
  { t: "Straddles / Strangles", d: "Vol-harvesting in range-bound regimes." },
  { t: "IPO / QIP Participation", d: "Selective participation in Ex-Top 100 primary issues." },
];

/* ------------------------------------------------------------------ */
/*  Fund managers                                                      */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Sankaran Naren",
    initials: "SN",
    role: "Executive Director & CIO — ICICI Prudential AMC",
    exp: "30+ yrs",
    bio: "One of India's most respected equity investors. Heads all investments across equity and hybrid strategies at ICICI Prudential AMC. Known for contrarian, valuation-driven style. Oversight responsibility on the Ex-Top 100 Long-Short strategy.",
    color: "orange",
  },
  {
    name: "Manan Tijoriwala",
    initials: "MT",
    role: "Fund Manager — Equity & Derivatives",
    exp: "Equity L/S",
    bio: "Equity and derivatives specialist in the ICICI Prudential AMC investment team. Hands-on management of the long book construction and the unhedged short overlay via F&O on the Ex-Top 100 universe.",
    color: "orange",
  },
  {
    name: "Divya Jain",
    initials: "DJ",
    role: "Fund Manager — Equity",
    exp: "Mid/Small Cap",
    bio: "Fund manager with focus on Indian mid and small caps. Bottom-up stock selection across the Ex-Top 100 universe spanning 655+ companies and 24 sectors covered by ICICI Prudential's in-house research desk.",
    color: "amber",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Equity Volatility Risk", d: "Ex-Top 100 (mid & small cap) stocks are structurally more volatile than large caps. Drawdowns of 30–45% in a single year are historical precedent (CY2008, CY2011, CY2018, CY2022 SMID corrections)." },
  { t: "Derivatives Risk", d: "F&O positions are leveraged — adverse moves can amplify losses. Used for up to 25% unhedged short and options overlays (covered calls, protective puts, spreads)." },
  { t: "Short-Selling Risk", d: "Shorts via derivatives face theoretically unlimited loss if underlying rallies. Mitigated by 25% cap, single-stock limits and 30-day rebalancing discipline." },
  { t: "Liquidity Risk", d: "Ex-Top 100 stocks have lower impact-cost tolerance than large caps. Fund sizes positions to the F&O sleeve of 109 Ex-Top 100 derivative names." },
  { t: "Concentration Risk", d: "Single-stock and sector limits enforced per SEBI Ch VI-C. Fund maintains diversified long book across sectors with deviation controls vs Nifty 500." },
  { t: "Overseas / Currency Risk", d: "Up to 35% in overseas securities (ADRs/GDRs) brings INR/USD translation risk and regulatory-jurisdiction risk." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives via CCIL / clearing corporations reduce counterparty risk. DVP settlement for cash market." },
  { t: "Model & Execution Risk", d: "Active short-book and option-overlay selection depends on volatility regime and manager judgement. Expiry concentration and delta-slippage actively managed." },
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

const IsifExTop100 = () => {
  const fundData = getSifBySlug("sifs/isif/extop100");
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
              <a href="/sif-funds-launched" className="hover:text-gray-600">Equity Ex-Top 100</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">iSIF Ex-Top 100</span>
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
                  iSIF Equity Ex-Top 100 Long-Short Fund
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 font-mono tabular-nums">
              {METRICS.map((m, i) => (
                <div
                  key={i}
                  className={`py-4 px-3 sm:px-4 text-center ${i < METRICS.length - 1 ? "border-r border-gray-100" : ""}`}
                >
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-sans">{m.label}</p>
                  <p className={`text-lg sm:text-xl font-bold ${m.color || "text-gray-900"}`}>{m.value}</p>
                  {m.sub && <p className="text-[11px] text-gray-400 mt-0.5 font-sans">{m.sub}</p>}
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
                  <div className="flex items-baseline gap-3 mb-1 font-mono tabular-nums">
                    <span className="text-2xl font-bold text-gray-900">₹{FUND.currentNav.toFixed(4)}</span>
                    <span className={`text-sm font-semibold ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
                  </div>
                  <div className="h-[280px] mt-4">
                    {fundData && (
                      <NavJourneyChart funds={[fundData]} showBenchmark={true} showNifty={true} height={280} />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">Live NAV data · Source: AMFI NAV API · Benchmark: Nifty 500 TRI</p>
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 font-mono tabular-nums">
                    {TRAILING.slice(0, 4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1 font-sans">{t.period}</p>
                        <p className={`text-base font-bold ${t.color}`}>{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono tabular-nums">
                    {TRAILING.slice(4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1 font-sans">{t.period}</p>
                        <p className={`text-base font-bold ${t.color}`}>{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-4">
                    Since-inception returns are absolute (not annualised) given fund launched 05 Feb 2026.
                  </p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* MONTHLY HEATMAP */}
                {fundData && <MonthlyHeatmap funds={[fundData]} showNifty={true} mode="single" />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Generate long-term capital appreciation by <b>predominantly investing in equity and equity-related
                    securities of companies outside the AMFI top 100 by market cap</b> (the &quot;Ex-Top 100&quot; universe).
                    The strategy may use derivative instruments including <b>unhedged short exposure on Ex-Top 100 stocks
                    up to 25% of NAV</b>. Benchmarked to <b>Nifty 500 TRI</b>. There is no assurance the objective will
                    be achieved.
                  </p>
                </div>

                {/* STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Ex-Top 100 strategy &amp; allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-orange-50 text-xs font-medium text-orange-700 border border-orange-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    iSIF Ex-Top 100 targets the mid and small cap universe that sits{" "}
                    <b>outside the AMFI top-100 large-cap set</b> — 400+ investable companies where
                    the ICICI Prudential research desk (655+ companies, 24 sectors) has a structural
                    information edge. The long book runs 65–100% of NAV; the short sleeve uses F&amp;O on the
                    109 Ex-Top 100 derivative names (~32–37% of Indian F&amp;O open interest) to
                    express shorts on overvalued peers, hedge drawdowns and harvest volatility.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Taxation: <b>Equity LTCG 12.5%</b> after 12 months; STCG 20% under 12 months.
                    Exposure discipline: <b>100% cumulative gross cap</b> per SEBI Ch VI-C.
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
                    {MANAGERS.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className={`w-11 h-11 rounded-full bg-${m.color}-100 text-${m.color}-700 font-bold text-sm flex items-center justify-center mx-auto mb-2`}>
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in iSIF Ex-Top 100</h3>
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
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction — Ex-Top 100 universe</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The investable universe is <b>all listed Indian companies OUTSIDE the AMFI top 100
                by market capitalisation</b> — i.e. the mid-cap, small-cap and micro-cap bucket. The
                long book (65–100% of NAV) is a <b>bottom-up concentrated portfolio</b> of 30–60
                quality names. The short sleeve leverages the 109 Ex-Top 100 stocks with active F&amp;O
                derivatives (32–37% of total Indian F&amp;O open interest) to size institutional-grade
                short positions up to 25% of NAV, unhedged.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono tabular-nums">
                <div className="rounded-lg bg-orange-50 p-4 text-center">
                  <p className="text-xs text-orange-700 mb-1 font-sans">Long — Ex-Top 100</p>
                  <p className="text-lg font-bold text-orange-700">65–100%</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1 font-sans">Unhedged short</p>
                  <p className="text-lg font-bold text-rose-700">0–25%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1 font-sans">Other equity / debt</p>
                  <p className="text-lg font-bold text-amber-700">0–35%</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <p className="text-xs text-purple-700 mb-1 font-sans">Overseas</p>
                  <p className="text-lg font-bold text-purple-700">0–35%</p>
                </div>
              </div>
            </div>

            {/* Asset allocation SEBI-filed */}
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
                  <tbody className="text-gray-700 font-mono tabular-nums">
                    {ASSET_ALLOC.map((r) => (
                      <tr key={r.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-sans">{r.t}</td>
                        <td className="py-3 px-4 text-right font-semibold">{r.min}</td>
                        <td className="py-3 pl-4 text-right font-semibold">{r.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Source: iSIF Ex-Top 100 ISID dated 31 Dec 2025. Cumulative gross exposure capped at 100%
                of net assets. Options premium paid capped at 20%. Ex-Top 100 companies are all companies
                other than large cap companies as identified and disclosed by AMFI.
              </p>
            </div>

            {/* Stock selection framework */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Stock selection framework</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {STOCK_FILTERS.map((s) => (
                  <div key={s.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-orange-700 mb-1">{s.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic allocation table */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Dynamic market adaptation</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Market regime</th>
                      <th className="py-3 px-4 font-semibold">SMID Long</th>
                      <th className="py-3 px-4 font-semibold">Shorts</th>
                      <th className="py-3 px-4 font-semibold">Options</th>
                      <th className="py-3 pl-4 font-semibold">Debt sleeve</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {MARKET_BEHAVIOR.map((r) => (
                      <tr key={r.market} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{r.market}</td>
                        <td className="py-3 px-4 font-mono tabular-nums">{r.smidLong}</td>
                        <td className="py-3 px-4 font-mono tabular-nums">{r.shorts}</td>
                        <td className="py-3 px-4">{r.options}</td>
                        <td className="py-3 pl-4">{r.debt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Indicative only. Actual allocation decided by the investment team subject to SEBI limits
                and the 30-day rebalancing discipline.
              </p>
            </div>

            {/* Alpha engines */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Alpha generation engines</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {ALPHA_ENGINES.map((e) => (
                  <div key={e.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-gray-900 mb-1">{e.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{e.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Concentration + F&O universe */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Ex-Top 100 F&amp;O universe</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>109</b> Ex-Top 100 stocks in F&amp;O segment</li>
                  <li>• <b>32–37%</b> of Indian F&amp;O open interest</li>
                  <li>• <b>₹159,579 Cr</b> futures OI, <b>₹65,886 Cr</b> options OI (Dec-25)</li>
                  <li>• Enables institutional-sized short book construction</li>
                  <li>• Daily settlement, exchange-cleared counterparty risk</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Concentration &amp; discipline</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cumulative gross exposure: <b>100%</b> of NAV max</li>
                  <li>• Unhedged short cap: <b>25%</b> of NAV</li>
                  <li>• Options premium paid: <b>≤20%</b> of NAV</li>
                  <li>• Single-stock and sector limits per SEBI Ch VI-C</li>
                  <li>• 30-day rebalancing rule for deviation-to-limits</li>
                </ul>
              </div>
            </div>

            {/* Disclosure */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> SIFs do not publish monthly top-10 holdings in the same
                format as regular mutual funds. The iSIF Ex-Top 100 presentation and ISID disclose
                strategy-level allocation ranges; position-level holdings are reported to the AMC and
                regulator but are not publicly disseminated on a monthly basis.
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
                iSIF Ex-Top 100 Long-Short is jointly managed by <b>Sankaran Naren</b> (CIO oversight),{" "}
                <b>Manan Tijoriwala</b> (equity and derivatives execution) and <b>Divya Jain</b>{" "}
                (mid/small-cap equity selection). The team draws on ICICI Prudential AMC&apos;s in-house
                research of 655+ companies across 24 sectors and the AMC&apos;s ~₹1.49 lakh Cr SMID exposure
                managed across schemes.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-xs text-orange-700 font-semibold">CIO</p>
                  <p className="text-xs text-gray-600 mt-1">Naren</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-3">
                  <p className="text-xs text-rose-700 font-semibold">EQUITY + DERIVATIVES</p>
                  <p className="text-xs text-gray-600 mt-1">Tijoriwala</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <p className="text-xs text-amber-700 font-semibold">EQUITY — MID/SMALL</p>
                  <p className="text-xs text-gray-600 mt-1">Jain</p>
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
              <h3 className="text-base font-bold text-gray-900 mb-3">Team edge</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center font-mono tabular-nums">
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-2xl font-bold text-orange-600">30+</p>
                  <p className="text-xs text-gray-500 font-sans mt-1">Years CIO experience</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-2xl font-bold text-orange-600">655+</p>
                  <p className="text-xs text-gray-500 font-sans mt-1">Companies / 24 sectors covered</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-2xl font-bold text-orange-600">₹1.49L Cr</p>
                  <p className="text-xs text-gray-500 font-sans mt-1">SMID exposure at AMC</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Sponsor: ICICI Bank Limited and Prudential plc (UK). Trustee: ICICI Prudential Trust Limited.
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
                  Very High
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band assigned during NFO based on internal assessment of the Ex-Top 100 mid/small-cap
                equity exposure plus derivative short overlay. Benchmark (Nifty 500 TRI) also carries a
                Very High risk band. The fund is suitable for investors with high risk tolerance and a
                3–5 year minimum horizon.
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
                    options premium cap (20%). Single-stock and sector limits enforced pre-trade
                    per Ch VI-C of SEBI MF Regulations.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    30-day rebalancing rule whenever portfolio deviates from stated limits. Daily NAV
                    disclosure. Exchange-cleared derivatives reduce counterparty risk.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily exposure, factor, liquidity and volatility monitoring. F&amp;O roll-risk and
                    short-squeeze exposure tracked continuously.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent Trustee (ICICI Prudential Trust Ltd), AMC Board Risk Committee,
                    SEBI periodic disclosures, and RTA settlement reconciliation.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">SIF vs Mutual Fund vs PMS/AIF</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">Mutual Fund</th>
                      <th className="py-3 px-4">iSIF Ex-Top 100</th>
                      <th className="py-3 pl-4">PMS / AIF Cat-III</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min investment</td><td className="py-3 px-4 font-mono">₹100+</td><td className="py-3 px-4 font-semibold text-orange-600 font-mono">₹10 lakh</td><td className="py-3 pl-4 font-mono">₹50 lakh+</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Derivative flexibility</td><td className="py-3 px-4">Limited</td><td className="py-3 px-4 font-semibold text-orange-600">Unhedged ≤25%</td><td className="py-3 pl-4">High</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Governance</td><td className="py-3 px-4">MF grade</td><td className="py-3 px-4 font-semibold text-orange-600">MF grade (Ch VI-C)</td><td className="py-3 pl-4">AIF regs</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7% (Cat-III)</td></tr>
                    <tr><td className="py-3 pr-4">Investor LTCG</td><td className="py-3 px-4 font-mono">12.5%</td><td className="py-3 px-4 font-semibold text-green-600 font-mono">12.5%</td><td className="py-3 pl-4">Slab / business income</td></tr>
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
                All official documents are hosted on ICICI Prudential AMC&apos;s iSIF portal. The ISID
                is dated <b>31 December 2025</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Sections I & II" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "iSIF Ex-Top 100 fund presentation", d: "29-page strategy playbook" },
                  { t: "Monthly factsheet (post-launch)", d: "Portfolio snapshot, TER, performance" },
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">ISID dated</td><td className="py-3 pl-4 font-semibold">31 December 2025</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold">30 January 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Allotment / Inception</td><td className="py-3 pl-4 font-semibold">05 February 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Subscription</td><td className="py-3 pl-4 font-semibold">Daily</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Redemption</td><td className="py-3 pl-4 font-semibold">Daily</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Settlement</td><td className="py-3 pl-4 font-semibold">T+3 business days</td></tr>
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
                  <li>• Exit load <b>1.00%</b> if redeemed ≤12 months from allotment</li>
                  <li>• <b>Nil</b> exit load after 12 months</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• Dispatch of redemption proceeds: per SEBI Master Circular</li>
                  <li>• Penal interest 15% p.a. for delayed redemption</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">SIP / STP / SWP</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Monthly SIP: <b>₹1,000+</b> (multiples of ₹1, min 6 installments)</li>
                  <li>• Quarterly SIP: <b>₹20,000+</b> (min 4 installments)</li>
                  <li>• Min additional purchase: <b>₹1,000</b></li>
                  <li>• Min investor balance: <b>₹10 lakh</b> across iSIF strategies</li>
                  <li>• No lock-in; daily NAV disclosure</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="isif-ex-top-100" fundName="iSIF Ex-Top 100 by ICICI Prudential" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default IsifExTop100;
