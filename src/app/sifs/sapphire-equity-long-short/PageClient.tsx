"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle, ExternalLink } from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";
/* ------------------------------------------------------------------ */
/*  Static data for Sapphire (Franklin Templeton)                      */
/* ------------------------------------------------------------------ */

const AMC_URL = "https://www.franklintempletonindia.com/sapphiresif";

const TAGS = [
  "Equity Long-Short",
  "Quant Strategy",
  "Multi-Factor Model",
  "Macro-Driven Allocation",
  "Large/Mid/Small Cap",
  "Moderate–High Risk",
];

const METRICS = [
  { label: "NFO Price", value: "₹1,000", sub: "Per unit", color: "" },
  { label: "Status", value: "Live", sub: "since 04 May 2026", color: "text-green-600" },
  { label: "Inception", value: "10 Apr", sub: "2026", color: "" },
  { label: "Allotment", value: "29 Apr", sub: "2026", color: "" },
  { label: "Max TER", value: "2.25%", sub: "Regular plan", color: "" },
  { label: "Min Investment", value: "₹10L", sub: "₹10K multiples", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "Franklin Templeton MF" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "Status", value: "Live since 04 May 2026" },
  { label: "SIP", value: "Available" },
  { label: "Exit Load", value: "1% <1Y" },
];

const ALLOCATION_TAGS = [
  "Equity & equity related 80–100%",
  "Long exposure 75–100%",
  "Short (derivatives) 0–25%",
  "Debt & money market 0–20%",
  "InvITs / REITs up to 20%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Franklin Templeton MF" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception", value: "10 Apr 2026" },
  { label: "Allotment", value: "29 Apr 2026" },
  { label: "Live since", value: "04 May 2026" },
  { label: "Inception NAV", value: "₹1,000 / unit" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "Max TER", value: "2.25%" },
  { label: "Strategy code", value: "FSIF/O/E/ELSF" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Daily" },
  { label: "Settlement", value: "T+2 days" },
  { label: "SIP / STP / SWP", value: "Available" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹10,000" },
  { label: "Listing", value: "Not listed" },
];

const RISK = [
  { label: "Risk band", value: "As per AMFI", color: "text-amber-600" },
  { label: "Short selling", value: "Via derivatives" },
  { label: "Lock-in period", value: "None" },
  { label: "Exit load", value: "1% if <1 year" },
  { label: "Segregated portfolio", value: "Allowed" },
];

const PEERS = [
  { name: "Dyna Equity L/S", amc: "DSP", ret: "—", href: "/sifs/dyna-equity-long-short" },
  { name: "Diviniti Equity L/S", amc: "ITI", ret: "—", href: "/sifs/diviniti-equity-long-short" },
  { name: "Arudha Equity L/S", amc: "Bandhan", ret: "—", href: "/arudha-equity-long-short" },
  { name: "qSIF Equity L/S", amc: "Quant", ret: "—", href: "/sifs/qsif-equity-long-short" },
];

const TEAM = [
  {
    name: "Arihant Jain",
    role: "Portfolio Manager",
    creds: "B.E. (Hons) BITS Pilani · CFA · 8 yrs",
    initials: "AJ",
  },
];

const SUITABLE = [
  "Long-term capital appreciation seekers",
  "HNIs comfortable with equity volatility",
  "Investors wanting quant + macro-driven alpha",
  "5+ year investment horizon",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Investors needing frequent liquidity",
  "Below ₹10L investable surplus",
  "Low risk tolerance profiles",
];

const QUANT_FACTORS = [
  { factor: "Quality", desc: "Profitability, balance sheet strength, asset efficiency" },
  { factor: "Innovation", desc: "R&D, capex coverage, investment in future growth" },
  { factor: "Value", desc: "Relative valuations, cash flow availability" },
  { factor: "Sentiment", desc: "Earnings growth, analyst revisions, price momentum" },
  { factor: "Alternatives", desc: "Options data — put/call OI, implied volatility" },
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
    <div className="flex justify-between py-2.5 border-b border-gray-50 last:border-b-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${color || "text-gray-900"}`}>{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

const TABS = ["Snapshot", "Strategy", "Fund Managers", "Risk & Scores", "Documents"] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const SapphireSif = () => {
  const [activeTab, setActiveTab] = useState<string>("Snapshot");

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>

      <main className="pt-24 lg:pt-28 pb-20">
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
              <span className="text-gray-600">Sapphire</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                {/* AMC + NFO badge */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm text-gray-500">Franklin Templeton Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-500 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                {/* Fund name */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Sapphire Equity Long-Short SIF
                </h1>
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {TAGS.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                      {t}
                    </span>
                  ))}
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
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Invest Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* METRICS BAR (NFO variant)                                    */}
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
                  <p className={`text-lg sm:text-xl font-bold ${m.color || "text-gray-900"}`}>{m.value}</p>
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
                  <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* TAB NAV                                                      */}
        {/* ============================================================ */}
        <section className="bg-white border-b border-gray-100 sticky top-[88px] lg:top-[104px] z-30">
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
        {/* CONTENT: 2-COLUMN LAYOUT                                     */}
        {/* ============================================================ */}
        {activeTab === "Snapshot" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">

              {/* ====== MAIN COLUMN ====== */}
              <div className="flex-1 min-w-0 space-y-6">

                {/* A) FUND STATUS CARD */}
                <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/40 overflow-hidden">
                  <div className="bg-emerald-500 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      ✓ Live since 4 May 2026 — Subscribe daily
                    </span>
                    <span className="bg-white/25 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Open for Subscription
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Inception</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">10 Apr 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Live since</p>
                        <p className="text-base sm:text-xl font-bold text-emerald-600">4 May 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Inception NAV</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">₹1,000</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Min Investment</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">₹10,00,000</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Franklin Templeton&apos;s first Specialized Investment Fund. NFO ran 10–24 April 2026
                      at <b>₹1,000 per unit</b> with allotment on 29 April. The strategy is now
                      <b> live for daily subscription and redemption</b> from 4 May 2026.
                    </p>
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold">
                        Invest on franklintempletonindia.com <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* B) INVESTMENT OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The strategy seeks to generate alpha over the long term by investing across a spectrum
                    of <b>large, mid and small cap</b> companies using long/short equity strategies. Long
                    exposure ranges 75–100% while short exposure via unhedged derivatives goes up to 25%,
                    dynamically adjusted by the macro model.
                  </p>
                </div>

                {/* C) STRATEGY SUMMARY + ALLOCATION */}
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
                    Sapphire runs a <b>dual-layered</b> process: a top-down macro model for dynamic capital
                    allocation and a bottom-up proprietary multi-factor quant model for stock selection.
                    Capital allocation is driven by macro indicators, street sentiment and index valuation —
                    tilting long in constructive regimes and raising shorts in uncertain/negative ones.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Stock selection uses five primary factors with proprietary sub-factors. The long sleeve
                    overweights best-scoring names; the short sleeve targets stocks with weak multi-factor
                    scores and bearish sentiment. Risk management is embedded in portfolio construction.
                  </p>
                </div>

                {/* D) QUANT FACTORS */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Five-factor quant model</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {QUANT_FACTORS.map((f) => (
                      <div key={f.factor} className="rounded-lg border border-gray-100 p-4">
                        <p className="text-sm font-bold text-blue-700 mb-1">{f.factor}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">
                    Sub-factors include Return on Assets, Capex Coverage, Enterprise Multiples, Shareholder
                    Yield, Earnings Momentum and more. Portfolio Manager may add/remove factors.
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

                {/* F) FUND MANAGEMENT TEAM */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center shrink-0">
                          {m.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                          <p className="text-xs text-gray-500">{m.role}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{m.creds}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mt-4">
                    Prior roles: Senior Investment Analyst at Franklin Templeton Services (India),
                    Senior Associate at MSCI (quant factor indexes), Market-Neutral Strategy analyst at
                    Morgan Stanley, Quant Research Analyst at Quant One.
                  </p>
                </div>
              </div>

              {/* ====== SIDEBAR ====== */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">

                {/* S1) CTA */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Subscribe to Sapphire NFO</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist, or invest directly with AMC.</p>
                  <div className="flex flex-col gap-2">
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full bg-amber-500 hover:bg-amber-400 text-[#0f1f3d] font-bold text-sm">
                        Invest via AMC <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                    <div className="flex gap-2">
                      <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
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

                {/* S5) Other funds */}
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
                        <p className="text-sm font-bold text-gray-400 mt-1">{p.ret} <span className="text-[10px] font-normal text-gray-400">SI</span></p>
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
            {/* Dual-layered approach */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Dual-layered investment process</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Sapphire combines a <b>top-down macro model for dynamic capital allocation</b> with a{" "}
                <b>bottom-up proprietary active quantitative multi-factor model for stock selection</b>.
                This approach builds a high-conviction, risk-aware portfolio that is adaptive to
                macroeconomic conditions and consistent in capturing stock-level alpha.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-blue-50 border border-blue-100 p-4">
                  <p className="text-sm font-bold text-blue-800 mb-2">Macro model (capital allocation)</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Evaluates macro indicators, street sentiment and index valuation to set exposure levels.
                    Tilts long in constructive regimes; raises shorts in uncertain / negative regimes.
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 border border-green-100 p-4">
                  <p className="text-sm font-bold text-green-800 mb-2">Quant model (stock selection)</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Systematic multi-factor model blending fundamental + behavioural signals via
                    proprietary forward/backward-looking factors. Seeks risk-adjusted alpha.
                  </p>
                </div>
              </div>
            </div>

            {/* Exposure ranges */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Dynamic exposure ranges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Long exposure</p>
                  <p className="text-lg font-bold text-green-600">75–100%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Up in constructive macro</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Short (unhedged)</p>
                  <p className="text-lg font-bold text-red-600">0–25%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Up in uncertainty</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Derivatives (hedging)</p>
                  <p className="text-lg font-bold text-gray-900">Up to 50%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Portfolio rebalancing</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Debt / money mkt</p>
                  <p className="text-lg font-bold text-gray-900">0–20%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Cash mgmt</p>
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
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4">Equity & equity-related instruments (incl. long + short)</td>
                      <td className="py-3 px-4 text-right font-semibold">80%</td>
                      <td className="py-3 pl-4 text-right font-semibold">100%</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4">Short exposure via unhedged equity derivatives</td>
                      <td className="py-3 px-4 text-right font-semibold">0%</td>
                      <td className="py-3 pl-4 text-right font-semibold">25%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Debt, money market, InvITs, ETFs, debt MF units</td>
                      <td className="py-3 px-4 text-right font-semibold">0%</td>
                      <td className="py-3 pl-4 text-right font-semibold">20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                At least 65% of total proceeds invested in equity of domestic listed companies.
                Cumulative gross exposure capped at 100% of net assets per SEBI SIF circular.
              </p>
            </div>

            {/* Five-factor deep dive */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Five-factor quant model — deep dive</h3>
              <div className="space-y-4">
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Quality</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <b>Profitability:</b> assessing earnings quality and margins</li>
                    <li>• <b>Balance Sheet:</b> debt quality & leverage resilience</li>
                    <li>• <b>Efficiency:</b> asset utilisation & capital productivity</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Innovation</p>
                  <p className="text-xs text-gray-600">R&D intensity, capex coverage, investment in future growth drivers</p>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Value</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <b>Value:</b> relative valuation vs sector peers</li>
                    <li>• <b>Cash Flow:</b> availability for dividends or reinvestment</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Sentiment</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <b>Earnings Growth:</b> history & forward potential</li>
                    <li>• <b>Expectations:</b> analyst upgrades/downgrades & earnings surprises</li>
                    <li>• <b>Behavioural:</b> price momentum, trend reversals</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-gray-100 p-4">
                  <p className="text-sm font-bold text-blue-700 mb-2">Alternatives</p>
                  <p className="text-xs text-gray-600">Options data — put & call open interest, implied volatility</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Sub-factors include Return on Assets, Capex Coverage, Enterprise Multiples, Shareholder Yield,
                Earnings Momentum, etc. List is non-exhaustive; the portfolio manager may add or delete factors.
              </p>
            </div>

            {/* Portfolio construction */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction</h3>
              <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>• <b>Long sleeve:</b> selects best-scoring stocks, applies negative screen on poor quality scores, high price volatility and weak corporate governance</li>
                <li>• <b>Short sleeve:</b> targets stocks with weak multi-factor scores and bearish market sentiment</li>
                <li>• <b>Universe filter:</b> minimum market cap, liquidity threshold, and reliable financial history required</li>
                <li>• <b>Integrated optimisation:</b> manages factor / sector / beta exposures alongside capital allocation from macro model</li>
                <li>• <b>Risk management:</b> embedded in construction, monitored continuously</li>
              </ul>
            </div>

            {/* Turnover & derivatives */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio turnover</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Because of the macro signal layer and long/short component, the strategy expects
                  more frequent trading than traditional long-only funds — which may result in
                  relatively higher brokerage and transaction costs.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Derivatives usage</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Derivatives are leveraged instruments and can produce disproportionate gains or losses.
                  Used for hedging, portfolio rebalancing, and up to 25% net assets for unhedged short exposure,
                  per SEBI SIF circular (27 Feb 2025) and Master Circular (27 Jun 2024).
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
            {/* Manager profile */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  AJ
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Arihant Jain</h3>
                  <p className="text-sm text-gray-500 mb-3">Portfolio Manager / Senior Investment Analyst · Mumbai</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
                      B.E. (Hons) BITS Pilani
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
                      CFA Charterholder
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
                      Age 29 · 8 yrs exp
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Current responsibilities</h4>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed">
                    <li>• Daily oversight of live portfolios; tracking quantitative model outputs, identifying drifts or anomalies and adjusting strategies to maintain alignment with investment objectives</li>
                    <li>• Partnering with traders to ensure timely, efficient execution — minimising transaction costs and market impact</li>
                    <li>• Thought leadership in portfolio construction, traditional quantitative, ESG and alternative factors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Career timeline */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-5">Career timeline</h3>
              <div className="space-y-5">
                <div className="border-l-2 border-blue-500 pl-4">
                  <p className="text-xs text-gray-400">2025 – Present</p>
                  <p className="text-sm font-bold text-gray-900">Portfolio Manager — Franklin Templeton AMC (India)</p>
                  <p className="text-xs text-gray-600 mt-1">Managing Sapphire Equity Long-Short SIF.</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">2022 – Jul 2025</p>
                  <p className="text-sm font-bold text-gray-900">Senior Investment Analyst — Franklin Templeton Services (India)</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Designed solutions and managed data processes for investment systems. Implemented
                    quantitative models for factor-based (traditional + ESG) equities, risk premia, multi-asset
                    portfolios and volatility management. Cross-functional work with research, global PMs
                    and investment-platform teams.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">2020 – 2022</p>
                  <p className="text-sm font-bold text-gray-900">Senior Associate — MSCI</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Quantitative research supporting new & existing indexes including factor indexes.
                    Co-authored <i>&quot;Value&apos;s Lost Decade&quot;</i> and <i>&quot;Managing Portfolios in a Low-Rates Age&quot;</i>.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">2018 – 2020</p>
                  <p className="text-sm font-bold text-gray-900">Analyst — Morgan Stanley</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Developed market-neutral strategy for the equity market to extract alpha.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">2017 – 2018</p>
                  <p className="text-sm font-bold text-gray-900">Quant Research Analyst — Quant One</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Designed long-term momentum strategy; optimised results using machine learning to capture alpha.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* RISK & SCORES TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "Risk & Scores" && (
          <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
            {/* Risk band summary */}
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">Risk band</h3>
                <span className="bg-amber-500 text-[#0f1f3d] text-xs font-bold px-3 py-1 rounded-full">
                  As per AMFI
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                The risk band shall be as specified by AMFI. Benchmark risk-band: <b>Nifty 500 TRI</b>.
                SIFs involve relatively higher risk including potential loss of capital, liquidity risk
                and market volatility. Suitable only for informed HNI / institutional investors with
                ≥₹10L investable surplus.
              </p>
            </div>

            {/* SIF-specific risks */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Equity Long/Short strategy risks</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Strategy & Manager Risk", d: "SIF is a new asset class without an established track record. Returns depend heavily on manager skill and risk-management discipline." },
                  { t: "Market Risk", d: "Long/short aims to minimise market exposure but is still affected by recessions and macro shocks. Sentiment swings can hurt both long and short legs simultaneously." },
                  { t: "Short-Sale Risk", d: "If a shorted stock rises sharply, potential losses are theoretically unlimited — making shorts riskier than longs." },
                  { t: "Leverage Risk", d: "Derivatives amplify both returns and drawdowns. Leverage increases downside and volatility in stress periods." },
                  { t: "Idiosyncratic / Stock-Specific", d: "Earnings surprises, management changes, scandals or regulatory action can hit specific names regardless of market." },
                  { t: "Execution & Liquidity", d: "Shorts may be hard to establish/maintain in less liquid stocks. Short-squeeze and borrow-cost spikes are real risks during stress." },
                  { t: "Factor / Sector Exposure", d: "Unexpected shifts in factor performance (value, momentum, quality) or sector trends can impact portfolio returns." },
                  { t: "Concentration Risk", d: "Poor diversification or excessive single-stock / sector bets raises risk. Regular rebalancing and position limits mitigate this." },
                  { t: "Higher Costs", d: "Short-sale fees, borrow expenses and frequent rebalancing can erode returns, especially with high turnover." },
                  { t: "Risk Management Complexity", d: "Leverage + derivatives require sophisticated risk systems and active exposure monitoring to prevent surprise losses." },
                ].map((r) => (
                  <div key={r.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-red-700 mb-1">{r.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quant model risks */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Quantitative model risks</h3>
              <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>• <b>Model limitations:</b> proprietary quant model is built on historical data and assumptions that may not hold in future — can lead to losses</li>
                <li>• <b>Short-term opportunities:</b> model may miss short-term market opportunities due to the underlying factors used</li>
                <li>• <b>Theme risk:</b> quant-based thematic exposure can involve potentially greater volatility than diversified strategies</li>
                <li>• <b>Factor drift:</b> factor efficacy can deteriorate over time; requires ongoing research and refinement</li>
              </ul>
            </div>

            {/* Risk mitigation */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Risk mitigation strategies</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Equity risk controls</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI exposure limits, attribution analysis vs benchmark, portfolio volatility monitored
                    vs benchmark and peer set, liquidity maintained via actively-traded large/mid/small caps
                    and debt/cash buffer for redemptions. Stock turnover monitored at regular intervals.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Derivatives discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Regulatory caps on unhedged short positions and gross exposure. Restricts contracts with
                    low liquidity / low open interest. Diversifies across indices, sectors, and expiries to
                    reduce concentration. Position-level liquidity monitored continuously.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Debt sleeve</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Short-duration debt / money-market instruments, Liquid & Overnight MF units only —
                    mitigating interest-rate, rating-migration, spread and reinvestment risks. Credit risk
                    managed via management & financial analysis before entering positions.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Settlement & counterparty</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Tri-party repos backed by CCIL margin & guaranteed settlement.
                    Repo counterparties vetted on credit rating; trades settled DVP basis.
                  </p>
                </div>
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
                All documents are hosted on Franklin Templeton&apos;s SIF website. The Investment
                Strategy Information Document (ISID) is dated <b>26 March 2026</b>.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II", href: AMC_URL },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors — incorporated by reference", href: AMC_URL },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form", href: AMC_URL },
                  { t: "Scheme factsheet (monthly)", d: "Available from first NAV date", href: AMC_URL },
                  { t: "TER disclosure (last 6 months + daily)", d: "Published on AMC SIF website", href: AMC_URL },
                  { t: "Portfolio holdings disclosure", d: "Top 10 holdings & sector allocation (post-launch)", href: AMC_URL },
                ].map((d) => (
                  <a
                    key={d.t}
                    href={d.href}
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

            {/* Key dates & operational details */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Key dates & operational details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    {[
                      ["ISID date", "26 March 2026"],
                      ["Inception", "10 April 2026"],
                      ["Allotment", "29 April 2026"],
                      ["Live since (continuous subscription/redemption)", "04 May 2026"],
                      ["Inception NAV per unit", "₹1,000"],
                      ["Face value", "₹1,000"],
                      ["First NAV", "Within 5 business days of allotment"],
                      ["NAV declaration time", "By 11:00 PM on each business day"],
                      ["Redemption settlement", "T+2 days (AMFI guideline)"],
                      ["IDCW payout", "7 working days from record date"],
                      ["Plans", "Growth / IDCW (Reinvestment + Payout) — Regular & Direct"],
                      ["Default plan / option", "Direct / Growth"],
                      ["Strategy code", "FSIF/O/E/ELSF/25/10/0001/FTMF"],
                      ["Benchmark", "Nifty 500 TRI"],
                      ["Listing", "Not listed"],
                      ["Segregated portfolio", "Permitted — refer SAI"],
                      ["Stock lending / short selling", "Permitted per SEBI guidelines"],
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

            {/* Expenses */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Expense structure (Reg 52)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Daily net assets slab</th>
                      <th className="py-3 pl-4 font-semibold text-right">Max TER</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {[
                      ["First ₹500 Cr", "2.25%"],
                      ["Next ₹250 Cr", "2.00%"],
                      ["Next ₹1,250 Cr", "1.75%"],
                      ["Next ₹3,000 Cr", "1.60%"],
                      ["Next ₹5,000 Cr", "1.50%"],
                      ["Above ₹50,000 Cr", "1.05%"],
                    ].map(([s, t]) => (
                      <tr key={s} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-2.5 pr-4">{s}</td>
                        <td className="py-2.5 pl-4 text-right font-semibold">{t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Brokerage & transaction costs up to 0.12% (cash) / 0.05% (derivatives). Additional 0.05%
                for permissible expenses, 0.30% for retail inflows from specified cities (in abeyance since
                Mar 2023). Direct Plan has lower TER — no distributor commission.
              </p>
            </div>

            {/* Load structure */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <b>Entry load:</b> Nil (per SEBI).<br />
                <b>Exit load:</b> 1% of applicable NAV if redeemed within 1 year of allotment; Nil thereafter.
                Switches between plans / options within the same strategy are free of load. Switches across
                strategies treated as redemption + subscription — loads apply.
              </p>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="sapphire-equity-long-short" fundName="Sapphire SIF by Franklin Templeton" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default SapphireSif;
