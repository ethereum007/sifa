"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle, ExternalLink } from "lucide-react";
import AmcLogo from "@/components/AmcLogo";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data for Titanium Equity Long-Short (Tata MF)               */
/* ------------------------------------------------------------------ */

const AMC_URL = "https://www.tatamutualfund.com/titanium-sif";
const ISID_URL = "/sifs/titanium-equity-long-short/ISID.pdf";

const TAGS = [
  "Equity Long-Short",
  "80–100% Equity",
  "Up to 25% Unhedged Short",
  "Nifty 500 TRI Benchmark",
  "Daily Subscription / Redemption",
  "Risk Band 5",
];

const METRICS = [
  { label: "NFO Price", value: "₹10", sub: "Per unit", color: "" },
  { label: "NFO Opens", value: "27 Apr", sub: "2026", color: "text-green-600" },
  { label: "NFO Closes", value: "11 May", sub: "2026", color: "text-amber-600" },
  { label: "Re-opens", value: "20 May", sub: "2026", color: "" },
  { label: "Risk Band", value: "Level 5", sub: "Higher Risk", color: "text-amber-600" },
  { label: "Min Investment", value: "₹10L", sub: "₹1 multiples", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "Tata Mutual Fund" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "NFO", value: "27 Apr – 11 May 2026" },
  { label: "Min", value: "₹10,00,000" },
  { label: "Exit Load", value: "1% < 1M" },
];

const ALLOCATION_TAGS = [
  "Equity & equity-related 80–100%",
  "Unhedged short via derivatives 0–25%",
  "Debt & money market 0–20%",
  "InvITs 0–20%",
  "Stock lending ≤ 20% (≤ 5% per intermediary)",
  "Cumulative gross ≤ 100% net assets",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Tata Mutual Fund" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "NFO opens", value: "27 Apr 2026" },
  { label: "NFO closes", value: "11 May 2026" },
  { label: "Re-opens", value: "20 May 2026" },
  { label: "NFO price", value: "₹10 / unit" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "Strategy code", value: "TSIF/O/E/ELSF/26/02/0002/TATA" },
  { label: "ISID date", value: "9 Apr 2026" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (business days)" },
  { label: "Redemption", value: "Daily (business days)" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "Min additional", value: "₹1 multiples" },
  { label: "Min redemption", value: "₹1 multiples" },
  { label: "SIP / STP / SWP", value: "Post-NFO" },
  { label: "Listing", value: "Not listed" },
];

const RISK = [
  { label: "Fund risk band", value: "Level 5", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Level 5", color: "text-amber-600" },
  { label: "Short selling", value: "Via derivatives (≤ 25%)" },
  { label: "Lock-in period", value: "None" },
  { label: "Exit load", value: "1% if < 1M; Nil after" },
  { label: "Segregated portfolio", value: "Permitted" },
];

const PEERS = [
  { name: "Sapphire Equity L/S", amc: "Franklin Templeton", ret: "—", href: "/sifs/sapphire-equity-long-short" },
  { name: "WSIF Equity L/S", amc: "The Wealth Company", ret: "—", href: "/sifs/wsif-equity-long-short" },
  { name: "qSIF Equity L/S", amc: "Quant", ret: "—", href: "/sifs/qsif-equity-long-short" },
  { name: "Diviniti Equity L/S", amc: "ITI", ret: "—", href: "/sifs/diviniti-equity-long-short" },
  { name: "Dyna Equity L/S", amc: "360 ONE", ret: "—", href: "/sifs/dyna-equity-long-short" },
  { name: "Arudha Equity L/S", amc: "Bandhan", ret: "—", href: "/sifs/arudha-equity-long-short" },
];

const SIBLINGS = [
  { name: "Titanium Hybrid Long-Short", amc: "Tata MF", note: "Live · Hybrid sibling", href: "/sifs/titanium-hybrid-long-short" },
];

const TEAM = [
  { name: "Suraj Nanda", role: "Fund Manager — Equity", creds: "PGDM (Finance) · Age 36 · 9+ yrs", initials: "SN" },
  { name: "Amit Somani", role: "Fund Manager — Fixed Income", creds: "B.Com, PGDBM, CFA · Age 46 · 19+ yrs", initials: "AS" },
  { name: "Hasmukh Devji Vishariya", role: "Fund Manager — Overseas", creds: "CA · Age 29 · 8+ yrs", initials: "HV" },
];

const SUITABLE = [
  "Long-term capital appreciation seekers",
  "HNIs comfortable with equity volatility",
  "Investors seeking limited-short alpha overlay",
  "5+ year investment horizon",
  "Investable surplus ≥ ₹10L (or ₹1L for accredited)",
];

const NOT_SUITABLE = [
  "Capital-protection / guaranteed-return seekers",
  "Investors needing daily withdrawable liquidity",
  "Short-term traders chasing intraday alpha",
  "Below ₹10L investable surplus (non-accredited)",
  "Low risk-tolerance profiles (Risk Band 5)",
];

const PORTFOLIO_OPTIONS = [
  { title: "Unhedged long-only", desc: "Long-only equity portfolio with no derivative overlay." },
  { title: "Partially-hedged long-only", desc: "Long equity with partial hedges via index / stock futures or options." },
  { title: "Fully-hedged long-only", desc: "Long equity fully hedged via index / stock futures or options." },
  { title: "Unhedged long-short", desc: "Long book with up to 25% naked-short via stock futures or options." },
  { title: "Partially-hedged long-short", desc: "Long book with partial hedges plus up to 25% naked-short positions." },
  { title: "Fully-hedged long with naked short", desc: "Fully-hedged long book combined with up to 25% naked-short via stock derivatives." },
];

const ASSET_ALLOC = [
  { t: "Equity & equity-related instruments", min: "80%", max: "100%" },
  { t: "Short exposure via unhedged equity derivatives", min: "0%", max: "25%" },
  { t: "Debt & money market instruments (incl. fixed-income derivatives)", min: "0%", max: "20%" },
  { t: "Units issued by InvITs", min: "0%", max: "20%" },
];

const STRATEGY_RISKS = [
  { t: "Strategy & Manager Risk", d: "SIF is a new asset class without an established track record. Returns depend heavily on the fund manager's skill and risk-management discipline. The strategy is being launched as a new product with no historical performance." },
  { t: "Equity Market Risk", d: "An 80–100% equity allocation remains exposed to broad equity market drawdowns. Sentiment swings can hurt both long and short legs simultaneously during regime shifts." },
  { t: "Short-Sale / Derivatives Risk", d: "Unhedged short exposure (up to 25% via stock / index derivatives) faces theoretically unlimited loss if the underlying rises sharply. Premia paid on options can be lost entirely; futures positions require margin discipline." },
  { t: "Leverage Risk", d: "Cumulative gross exposure can reach 100% of net assets via derivatives. Leverage amplifies both upside and drawdowns and increases volatility during stress periods." },
  { t: "Mid / Small Cap Risk", d: "Universe spans large, mid and small caps. Mid / small cap names introduce higher liquidity, price-impact and drawdown volatility versus a purely large-cap portfolio." },
  { t: "Concentration Risk", d: "Single-stock and sector concentration governed by SEBI limits. Poor diversification or excessive sector bets raises idiosyncratic risk; rebalancing and position limits mitigate." },
  { t: "Liquidity & Redemption Risk", d: "Open-ended with daily redemption, but redemption liquidity depends on the underlying portfolio. AMC may impose notice periods up to 15 days under stress (refer SAI / SEBI norms)." },
  { t: "Stock Lending Risk", d: "Stock lending capped at 20% of net assets and 5% per single approved intermediary. Counterparty default and recall friction are residual risks even with collateralisation." },
  { t: "Execution & Borrow-Cost Risk", d: "Establishing or maintaining shorts in less liquid stocks is harder; short-squeeze and borrow-cost spikes are real risks during market stress." },
  { t: "Regulatory & Tax Risk", d: "Specialized Investment Funds operate under the SEBI SIF framework (circular dated 27 February 2025). Tax treatment for SIF is evolving; investors should consult tax advisors." },
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

const TABS = ["Snapshot", "Strategy", "Fund Managers", "Risk & Scores", "Documents"] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const TitaniumEquityLongShort = () => {
  const [activeTab, setActiveTab] = useState<string>("Snapshot");

  return (
    <div className="min-h-screen bg-gray-50">
      <NfoBannerTop />
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>

      <main className="pt-[104px] lg:pt-[120px] pb-20">
        {/* ============================================================ */}
        {/* HERO                                                         */}
        {/* ============================================================ */}
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 mb-4">
              <a href="/" className="hover:text-gray-600">SIF Universe</a>
              <span className="mx-1.5">›</span>
              <a href="/sif-funds-launched" className="hover:text-gray-600">Equity Long-Short</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">Titanium Equity</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <AmcLogo amc="Tata Mutual Fund" size="md" />
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-700" />
                      <span className="text-sm text-gray-500">Tata Mutual Fund</span>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-blue-700 text-white font-bold px-2 py-0.5 rounded text-[11px] animate-pulse">
                      NFO OPEN
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Titanium Equity Long-Short Fund
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

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:text-gray-900">
                  + Compare
                </Button>
                <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:text-gray-900">
                  Track Fund
                </Button>
                <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white">
                    Invest Now <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* METRICS BAR                                                  */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/* INFO BAR                                                     */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/* TAB NAV                                                      */}
        {/* ============================================================ */}
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

              {/* ====== MAIN COLUMN ====== */}
              <div className="flex-1 min-w-0 space-y-6">

                {/* A) NFO STATUS CARD */}
                <div className="rounded-xl border-2 border-blue-200 bg-blue-50/60 overflow-hidden">
                  <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 bg-blue-700 text-white">
                    <span className="font-bold text-sm flex items-center gap-2">
                      ⚡ NFO Open — Subscribe before 11 May 2026
                    </span>
                    <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full">
                      New Launch
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">NFO Opens</p>
                        <p className="text-base sm:text-xl font-bold text-green-600 font-mono tabular-nums">27 Apr 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">NFO Closes</p>
                        <p className="text-base sm:text-xl font-bold text-amber-600 font-mono tabular-nums">11 May 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">NFO Price</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900 font-mono tabular-nums">₹10</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Min Investment</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900 font-mono tabular-nums">₹10,00,000</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Tata Mutual Fund&apos;s second SIF strategy and its first <b>equity-only</b> long-short fund.
                      Offering price is <b>₹10 per unit</b> during the NFO; the Investment Strategy re-opens
                      for continuous Sale and Repurchase on <b>20 May 2026</b>. Accredited investors are
                      eligible at a reduced minimum application of <b>₹1,00,000</b>.
                    </p>
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="font-bold bg-blue-700 hover:bg-blue-800 text-white">
                        Invest on tatamutualfund.com <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* B) INVESTMENT OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To generate <b>medium to long term capital appreciation</b> by investing in listed
                    equity and equity related instruments including <b>limited short exposure in equity
                    through derivative instruments</b>. There is no assurance that the investment objective
                    of the Investment Strategy will be achieved.
                  </p>
                </div>

                {/* C) STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Titanium Equity Long-Short is a <b>long-biased equity strategy</b> investing across
                    large, mid and small cap names. The fund pairs an 80–100% equity core with a limited
                    <b> unhedged short sleeve of up to 25% of net assets</b>, implemented through stock and
                    index derivatives — per SEBI&apos;s SIF framework circular dated 27 February 2025.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The fund manager may toggle between unhedged long-only, partially-hedged or
                    fully-hedged long-only constructions, alongside up to 25% unhedged shorts. Cumulative
                    gross exposure (equity, debt, derivatives, repos and CDS) is capped at 100% of net
                    assets.
                  </p>
                </div>

                {/* D) PORTFOLIO CONSTRUCTION OPTIONS */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Portfolio construction options</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PORTFOLIO_OPTIONS.map((f) => (
                      <div key={f.title} className="rounded-lg border border-gray-100 p-4">
                        <p className="text-sm font-bold mb-1 text-blue-700">{f.title}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">
                    The fund may toggle between these construction modes for portfolio rebalancing or to
                    reflect the manager&apos;s view on market conditions.
                  </p>
                </div>

                {/* E) INVESTOR SUITABILITY */}
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

                {/* F) FUND MANAGEMENT TEAM MINI-GRID */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management team</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.role}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{m.creds}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab("Fund Managers")}
                    className="mt-4 text-xs font-semibold text-blue-700 hover:text-blue-800"
                  >
                    View full bios →
                  </button>
                </div>
              </div>

              {/* ====== SIDEBAR ====== */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">

                {/* S1) CTA */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Subscribe to Titanium NFO</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist, or invest directly with the AMC.</p>
                  <div className="flex flex-col gap-2">
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full font-bold bg-blue-700 hover:bg-blue-800 text-white text-sm">
                        Invest via Tata MF <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                    <div className="flex gap-2">
                      <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm">
                          <Phone className="w-3.5 h-3.5 mr-1.5" /> Call
                        </Button>
                      </a>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50 text-sm">
                          <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> WA
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                {/* S2) Fund Details */}
                <SidebarCard title="Fund details">
                  {FUND_DETAILS.map((d) => (
                    <DetailRow key={d.label} label={d.label} value={d.value} />
                  ))}
                </SidebarCard>

                {/* S3) Redemption & Liquidity */}
                <SidebarCard title="Redemption & Liquidity">
                  {REDEMPTION.map((d) => (
                    <DetailRow key={d.label} label={d.label} value={d.value} />
                  ))}
                </SidebarCard>

                {/* S4) Risk & Compliance */}
                <SidebarCard title="Risk & compliance">
                  {RISK.map((d) => (
                    <DetailRow key={d.label} label={d.label} value={d.value} color={d.color} />
                  ))}
                </SidebarCard>

                {/* S5) Sibling funds from Tata */}
                <SidebarCard title="Sibling funds from Tata">
                  <div className="space-y-2">
                    {SIBLINGS.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        className="block rounded-lg border border-gray-100 p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                      >
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{p.note}</p>
                      </a>
                    ))}
                  </div>
                </SidebarCard>

                {/* S6) Other Equity L/S funds */}
                <SidebarCard title="Other equity L/S funds">
                  <div className="grid grid-cols-2 gap-2">
                    {PEERS.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        className="rounded-lg border border-gray-100 p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                      >
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className="text-sm font-bold text-gray-400 mt-1 font-mono tabular-nums">
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
        {/* STRATEGY TAB                                                 */}
        {/* ============================================================ */}
        {activeTab === "Strategy" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
            {/* Approach */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Long-biased investment process</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Titanium Equity Long-Short is a <b>long-biased strategy</b>: the core 80–100% allocation
                sits in equity and equity-related instruments, while a limited <b>unhedged short sleeve of
                up to 25%</b> is implemented via stock and index derivatives. The combination is intended
                to pursue medium-to-long-term capital appreciation with a layer of hedging flexibility.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Long sleeve (core 80–100%)</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Diversified across large, mid and small cap names. Selection reflects the
                    manager&apos;s fundamental assessment of business quality, financial strength and
                    relative valuation.
                  </p>
                </div>
                <div className="rounded-lg border border-amber-100 bg-amber-50 p-4">
                  <p className="text-sm font-bold text-amber-700 mb-2">Short sleeve (≤ 25%)</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Unhedged short exposure using stock and index futures or options, capped at 25% of net
                    assets per SEBI&apos;s SIF framework (27 Feb 2025). Used for tactical alpha and
                    downside management.
                  </p>
                </div>
              </div>
            </div>

            {/* Exposure ranges */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Exposure ranges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center">
                  <p className="text-xs text-blue-700 mb-1">Equity (incl. short)</p>
                  <p className="text-lg font-bold text-blue-700 font-mono tabular-nums">80–100%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Long + short combined</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">Unhedged short</p>
                  <p className="text-lg font-bold text-amber-700 font-mono tabular-nums">0–25%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Via derivatives</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Debt / money mkt</p>
                  <p className="text-lg font-bold text-gray-900 font-mono tabular-nums">0–20%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Liquidity / cash mgmt</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">InvITs</p>
                  <p className="text-lg font-bold text-gray-900 font-mono tabular-nums">0–20%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Single-issuer caps apply</p>
                </div>
              </div>
            </div>

            {/* Asset allocation table */}
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
                Source: Titanium Equity Long-Short ISID (Section II.A — Asset Allocation Pattern).
                Cumulative gross exposure capped at 100% of net assets per SEBI Master Circular dated 27
                June 2024 and SIF framework circular dated 27 February 2025.
              </p>
            </div>

            {/* Instrument limits */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Instrument-level limits</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Instrument</th>
                      <th className="py-3 pl-4 font-semibold text-right">Limit</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {[
                      ["Stock lending & short selling", "≤ 20% of net assets (≤ 5% per single intermediary)"],
                      ["Derivatives — unhedged short exposure", "Up to 25% of net assets"],
                      ["Hedged equity derivative positions", "Permitted within cumulative gross exposure cap"],
                      ["Debt & money market instruments", "Up to 20% of net assets"],
                      ["InvITs", "Up to 20% of net assets (single-issuer caps apply)"],
                      ["Cumulative gross exposure", "≤ 100% of net assets"],
                      ["Repo / TREPS for liquidity management", "Within debt sleeve allocation"],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-2.5 pr-4">{k}</td>
                        <td className="py-2.5 pl-4 text-right font-semibold">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Portfolio construction modes */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction modes</h3>
              <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>• <b>Unhedged long-only:</b> long equity without any derivative overlay</li>
                <li>• <b>Partially-hedged long-only:</b> long equity with partial hedges via index / stock futures or options</li>
                <li>• <b>Fully-hedged long-only:</b> long equity fully hedged via index / stock futures or options</li>
                <li>• <b>Unhedged long-short:</b> long book + up to 25% naked-short using stock futures or options</li>
                <li>• <b>Partially-hedged long-short:</b> long book partially hedged + up to 25% naked-short positions</li>
                <li>• <b>Fully-hedged long with naked short:</b> fully-hedged long book combined with up to 25% naked-short via stock derivatives</li>
              </ul>
            </div>

            {/* Benchmark */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Benchmark</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Performance is benchmarked to the <b>Nifty 500 Total Return Index (TRI)</b>. The
                composition of the benchmark is suited for comparing performance of an equity-oriented
                long-short strategy. The Total Return variant is used so that distributions are reinvested
                in the comparison series.
              </p>
              <p className="text-[11px] text-gray-400">
                The AMC / Trustees reserve the right to change the benchmark in future for measuring
                performance of the strategy and as per SEBI guidelines from time to time.
              </p>
            </div>

            {/* Turnover & derivatives */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio turnover</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The fund manager may trade more frequently when subscription / redemption flows or
                  market views warrant it — increasing transaction costs. The strategy has no specific
                  turnover target; the manager aims to optimise turnover to maximise gains and minimise
                  cost impact. As the strategy is new, no historical turnover figure is available.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivatives usage</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Derivatives are used for hedging, portfolio rebalancing and up to <b>25%</b> of net
                  assets for unhedged short exposure, in line with SEBI&apos;s SIF circular (27 Feb 2025)
                  and the Master Circular for Mutual Funds (27 Jun 2024). Covered-call options are
                  permitted within regulatory limits.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* FUND MANAGERS TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "Fund Managers" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
            {/* Manager 1 — Suraj Nanda */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  SN
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Suraj Nanda</h3>
                  <p className="text-sm text-gray-500 mb-3">Fund Manager — Equity · Tata Mutual Fund</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">PGDM (Finance)</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">Bachelor in Electronics</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">Age 36</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">9+ yrs experience</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Profile</h4>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed">
                    <li>• Joined <b>Tata Asset Management Pvt Ltd</b> on <b>16 August 2025</b> as Fund Manager, reporting to the Chief Investment Officer</li>
                    <li>• Previously with <b>ICICI Prudential Asset Management</b> from May 2016 to June 2025 as Fund Manager, reporting to the Head of AIF (Long Short Fund)</li>
                    <li>• Brings ~9 years of professional asset-management experience, with specific focus on long-short equity AIF mandates</li>
                    <li>• Tenure on Titanium Equity Long-Short: NA (this is a new strategy)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Manager 2 — Amit Somani */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  AS
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Amit Somani</h3>
                  <p className="text-sm text-gray-500 mb-3">Fund Manager — Fixed Income · Tata Mutual Fund</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">B.Com</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">PGDBM</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">CFA</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">Age 46</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">19+ yrs experience</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Profile</h4>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed">
                    <li>• With <b>Tata Asset Management Pvt Ltd</b> since <b>September 2012</b> as Fund Manager (Fixed Income), reporting to Head — Fixed Income</li>
                    <li>• Earlier at Tata AMC as Credit Analyst (Jun 2010 – Aug 2012), reporting to Head of Fixed Income</li>
                    <li>• <b>Canara Robeco Asset Management</b> as Fund Manager — Fixed Income (Sep 2008 – Nov 2010)</li>
                    <li>• <b>Edelweiss Securities Ltd</b> as Senior Manager (Jun 2006 – Aug 2008)</li>
                    <li>• Tenure on Titanium Equity Long-Short: NA (this is a new strategy)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Manager 3 — Hasmukh Devji Vishariya */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  HV
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Hasmukh Devji Vishariya</h3>
                  <p className="text-sm text-gray-500 mb-3">Fund Manager — Overseas Investments · Tata Mutual Fund</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">Chartered Accountant</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">Age 29</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">8+ yrs experience</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">Dedicated Overseas FM</span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Profile</h4>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed">
                    <li>• <b>Tata Asset Management Pvt Ltd</b> from <b>1 March 2025</b> onwards as Fund Manager &amp; Research Analyst, covering IT, Internet, Telecom &amp; Media sectors and reporting to CIO — Equities</li>
                    <li>• Tata AMC Research Analyst (Mar 2024 – Feb 2025), same sector coverage</li>
                    <li>• <b>Star Union Dai-Ichi Life Insurance</b> as Research Analyst (Feb 2019 – Mar 2024) covering IT, Consumer and Building Materials</li>
                    <li>• Star Union Dai-Ichi Life Insurance as Assistant Manager — Investment Back &amp; Mid Office (Oct 2017 – Jan 2019)</li>
                    <li>• Dedicated <b>Overseas Investment</b> manager for the strategy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Team summary */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Why three managers?</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Per SEBI regulation, an open-ended SIF that may invest across equity, debt and overseas
                securities requires dedicated fund managers for each sleeve. Suraj Nanda leads the equity
                long-short book; Amit Somani manages the limited debt &amp; money market sleeve (up to 20%);
                Hasmukh Devji Vishariya is the dedicated overseas-investment fund manager. The strategy
                has no historical performance — Tata AMC&apos;s Titanium franchise launched its first SIF
                (Titanium Hybrid Long-Short) in December 2025.
              </p>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* RISK & SCORES TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "Risk & Scores" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
            {/* Risk band summary */}
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50/60 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">Risk band</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-700 text-white">
                  Level 5 (AMFI)
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk band is <b>Level 5</b> for both the Investment Strategy and the benchmark
                (<b>Nifty 500 TRI</b>). Product labelling assigned during NFO is based on internal
                assessment of the investment strategy characteristics or model portfolio, and may vary
                post-NFO when actual investments are made. SIFs involve relatively higher risk including
                potential loss of capital, liquidity risk and market volatility. Suitable only for
                informed HNI / institutional investors with ≥ ₹10L investable surplus (or ₹1L for
                accredited investors).
              </p>
            </div>

            {/* Strategy risks grid */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Equity Long/Short strategy risks</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {STRATEGY_RISKS.map((r) => (
                  <div key={r.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-red-700 mb-1">{r.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk mitigation */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Risk mitigation</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold mb-1 text-blue-700">Equity risk controls</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI single-stock and sector exposure limits, attribution analysis versus benchmark,
                    portfolio volatility monitoring, and a debt / cash buffer for redemptions. Liquidity
                    maintained via large-cap-tilted holdings; mid / small cap exposure sized within
                    overall portfolio liquidity profile.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-blue-700">Derivatives discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Regulatory caps on unhedged short (≤ 25%) and cumulative gross exposure (≤ 100%).
                    Restricts contracts with low liquidity / open interest. Diversified across indices,
                    sectors and expiries. Covered calls only within regulatory limits. Futures positions
                    covered via &lt; 91-day T-bills per SEBI valuation norms.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-blue-700">Stock lending</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Stock lending capped at 20% of net assets overall and 5% of net assets with any
                    single approved intermediary (broker-level cap) per SEBI&apos;s Master Circular for
                    Mutual Funds.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-blue-700">Debt sleeve & settlement</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Debt / money market allocation capped at 20%. Tri-party repos backed by CCIL margin
                    and guaranteed settlement. DVP settlement and rated counterparties for OTC exposures.
                    Segregated portfolio is permitted in the event of a credit event in the debt sleeve —
                    refer SAI for details.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-blue-700">Liquidity management tools</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Per SEBI&apos;s SIF framework, the AMC may employ swing pricing, anti-dilution levies,
                    in-specie redemption or notice periods (up to 15 days) under stress conditions.
                    Refer Section II.C — Risk mitigation strategies and Section III.C — Liquidity risk
                    management tools in the ISID.
                  </p>
                </div>
              </div>
            </div>

            {/* Investor checklist */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Investor checklist before subscribing</h3>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                <li>• Confirm ≥ ₹10L investable surplus (or ₹1L if accredited)</li>
                <li>• Ensure 5+ year horizon — SIFs are not for short-term cash needs</li>
                <li>• Read the ISID, SAI and KIM in full before applying</li>
                <li>• Understand Risk Band 5 implies potential capital loss</li>
                <li>• Note exit load: 1% if redeemed within 1 month from allotment</li>
                <li>• Tax treatment for SIF is evolving — consult your tax advisor</li>
              </ul>
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
                The Investment Strategy Information Document (ISID) is dated <b>9 April 2026</b>. The SAI
                is incorporated by reference and is legally a part of the ISID. Daily TER and the
                factsheet are not yet applicable — the strategy has not launched.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — dated 9 Apr 2026", href: ISID_URL, pdf: true },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors — incorporated by reference", href: AMC_URL, pdf: false },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form (AMC site)", href: AMC_URL, pdf: false },
                  { t: "Scheme factsheet (monthly)", d: "Not applicable until launch — check AMC site", href: AMC_URL, pdf: false },
                  { t: "TER disclosure (last 6 months + daily)", d: "Not applicable until launch — check AMC site", href: AMC_URL, pdf: false },
                  { t: "Portfolio holdings disclosure", d: "Top 10 holdings & sector allocation (post-launch)", href: AMC_URL, pdf: false },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={d.href}
                    target={d.pdf ? undefined : "_blank"}
                    rel={d.pdf ? undefined : "noopener noreferrer"}
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
              <p className="text-[11px] text-gray-400 mt-3">
                ISID PDF link is a placeholder — the file will be copied to{" "}
                <code className="bg-gray-50 px-1 rounded">/sifs/titanium-equity-long-short/ISID.pdf</code>.
              </p>
            </div>

            {/* Key dates & operational details */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Key dates & operational details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    {[
                      ["ISID date", "9 April 2026"],
                      ["NFO opens", "27 April 2026"],
                      ["NFO closes", "11 May 2026"],
                      ["Strategy re-opens (subscription/redemption)", "20 May 2026"],
                      ["NFO price per unit", "₹10"],
                      ["Face value", "₹10"],
                      ["Min application (NFO)", "₹10,00,000 (accredited: ₹1,00,000)"],
                      ["Min additional purchase", "In multiples of ₹1 thereafter"],
                      ["Min redemption", "In multiples of ₹1 thereafter"],
                      ["SIP / STP / SWP", "Available post-NFO"],
                      ["Redemption frequency", "Daily (all business days)"],
                      ["Subscription frequency", "Daily (all business days)"],
                      ["Redemption dispatch", "T+3 working days"],
                      ["NAV declaration", "All business days (BSE open)"],
                      ["Plans", "Growth / IDCW — Regular & Direct"],
                      ["Default plan / option", "Direct / Growth"],
                      ["Strategy code", "TSIF/O/E/ELSF/26/02/0002/TATA"],
                      ["Benchmark", "Nifty 500 Total Return Index (TRI)"],
                      ["Listing", "Not listed (open-ended)"],
                      ["Segregated portfolio", "Permitted — refer SAI"],
                      ["Stock lending", "Permitted (≤ 20% net assets; ≤ 5% per intermediary)"],
                      ["Risk Band (fund / benchmark)", "Level 5 / Level 5"],
                      ["Exit load", "1% if redeemed within 1 month from allotment; Nil after"],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-2.5 pr-4 text-gray-500 text-sm">{k}</td>
                        <td className="py-2.5 text-sm font-semibold">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Load structure */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <b>Entry load:</b> Nil (per SEBI).<br />
                <b>Exit load:</b><br />
                1. Redemption / Switch-out on or before expiry of <b>1 month</b> from the date of allotment: <b>1.00%</b><br />
                2. Redemption / Switch-out after expiry of 1 month from the date of allotment: <b>Nil</b>
              </p>
              <p className="text-[11px] text-gray-400 mt-3">
                Pursuant to AMFI&apos;s communication dated 9 April 2025, exit load is not charged on
                certain switch / systematic transfer transactions — refer ISID Part III.D for the full
                list of exempted transactions. Switches between plans / options within the same strategy
                are free of load.
              </p>
            </div>

            {/* Illustrative NAV math */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Illustrative sale & repurchase price</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Assumed NAV: <b>₹11.00</b> per unit · Entry Load: NIL · Exit Load: 1%
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500 mb-1">Sale Price</p>
                  <p className="text-sm font-mono tabular-nums text-gray-700">NAV + (Entry Load × NAV)</p>
                  <p className="text-sm font-mono tabular-nums text-gray-700">= 11 + (0% × 11) = <b>₹11.00</b></p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500 mb-1">Repurchase Price (within 1M)</p>
                  <p className="text-sm font-mono tabular-nums text-gray-700">NAV − (Exit Load × NAV)</p>
                  <p className="text-sm font-mono tabular-nums text-gray-700">= 11 − (1% × 11) = <b>₹10.89</b></p>
                </div>
              </div>
            </div>

            {/* AMC / Trustee info */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">AMC &amp; Trustee</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 leading-relaxed">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Asset Management Company</p>
                  <p>Tata Asset Management Pvt Ltd</p>
                  <p className="text-xs text-gray-500 mt-1">
                    1903, B Wing, Parinee Crescenzo, G Block, BKC, Bandra East, Mumbai 400 051
                  </p>
                  <a
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-2 text-blue-700"
                  >
                    tatamutualfund.com/titanium-sif <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Trustee Company</p>
                  <p>Tata Trustee Co. Pvt Ltd</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mutual Fund: Tata Mutual Fund. Refer SAI for full sponsor / trustee structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm
              fundSlug="titanium-equity-long-short"
              fundName="Titanium Equity Long-Short Fund by Tata Mutual Fund"
              source="fund-page"
            />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default TitaniumEquityLongShort;
