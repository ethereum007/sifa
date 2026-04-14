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
/*  Static data for qSIF Active Asset Allocator (quant MF)             */
/* ------------------------------------------------------------------ */

const AMC_URL = "http://qsif.com/";

const TAGS = [
  "Active Asset Allocator",
  "Multi-Asset Long-Short",
  "Interval Strategy",
  "Commodity Derivatives",
  "InvITs",
  "Risk Band Level 5",
];

const METRICS = [
  { label: "NFO Price", value: "₹10", sub: "Per unit", color: "" },
  { label: "NFO Opens", value: "02 Apr", sub: "2026", color: "text-green-600" },
  { label: "NFO Closes", value: "16 Apr", sub: "2026", color: "text-amber-600" },
  { label: "Re-opens", value: "T+5", sub: "From allotment", color: "" },
  { label: "Risk Band", value: "Level 5", sub: "AMFI", color: "text-amber-600" },
  { label: "Min Investment", value: "₹10L", sub: "₹1L accredited", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "quant Mutual Fund" },
  { label: "Category", value: "Active Asset Allocator" },
  { label: "Benchmark", value: "40:30:30 Composite" },
  { label: "NFO", value: "02–16 Apr 2026" },
  { label: "Redemption", value: "Tue & Wed" },
  { label: "Exit Load", value: "1% <15d" },
];

const ALLOCATION_TAGS = [
  "Equity 0–100%",
  "Debt & money market 0–100%",
  "ETCDs (commodity) 0–30%",
  "InvITs 0–20%",
  "Short derivatives up to 25%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "quant Mutual Fund" },
  { label: "Category", value: "Active Asset Allocator" },
  { label: "Type", value: "Interval" },
  { label: "NFO opens", value: "02 Apr 2026" },
  { label: "NFO closes", value: "16 Apr 2026" },
  { label: "Re-opens", value: "T+5 business days" },
  { label: "NFO price", value: "₹10 / unit" },
  { label: "Benchmark", value: "40 NSE 500 + 30 CRISIL ST + 30 iCOMDEX" },
  { label: "Risk band", value: "Level 5" },
  { label: "Strategy code", value: "QSIF/I/H/AALS" },
  { label: "Listing", value: "NSE (to be listed)" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Tue & Wed" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP / STP / SWP", value: "Post-NFO, ₹10K" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹1,000" },
  { label: "Demat redemption", value: "Via NSE exchange" },
];

const RISK = [
  { label: "Risk band", value: "Level 5", color: "text-amber-600" },
  { label: "Short selling", value: "Up to 25% (derivatives)" },
  { label: "Stock lending cap", value: "20% / 5% per broker" },
  { label: "Segregated portfolio", value: "Permitted" },
  { label: "Lock-in", value: "None (interval)" },
];

const PEERS = [
  { name: "Dyna Active AA", amc: "DSP", ret: "—", href: "/sifs/dyna-active-asset-allocator" },
  { name: "qSIF Equity L/S", amc: "Quant", ret: "—", href: "/sifs/qsif-equity-long-short" },
  { name: "qSIF Ex-Top 100", amc: "Quant", ret: "—", href: "/sifs/qsif-ex-top-100-long-short" },
  { name: "qSIF Hybrid", amc: "Quant", ret: "—", href: "/sifs/qsif-hybrid-long-short" },
];

const TEAM = [
  { name: "Sandeep Tandon", role: "Founder & CIO — quant Group", creds: "MBA Finance · 33+ yrs", initials: "ST" },
  { name: "Jignesh Shah", role: "Portfolio Manager", creds: "CFA (ICFAI) · 30+ yrs", initials: "JS" },
  { name: "Ankit Pande", role: "Portfolio Manager", creds: "BE Pune · MBA CUHK · CFA L3 · 14 yrs", initials: "AP" },
  { name: "Sameer Kate", role: "Chief Dealer", creds: "BCS Pune · MBA · 20+ yrs", initials: "SK" },
  { name: "Sanjeev Sharma", role: "Treasury / Debt PM", creds: "PGDBA Fin · CerTM · 20+ yrs", initials: "SS" },
];

const SUITABLE = [
  "Long-term capital appreciation + income seekers",
  "HNIs wanting multi-asset diversification",
  "Investors comfortable with derivatives & commodities",
  "5+ year horizon, moderate-to-high risk appetite",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Investors needing daily liquidity",
  "Below ₹10L investable surplus (non-accredited)",
  "Low risk tolerance profiles",
];

const ASSET_CLASSES = [
  { title: "Equity & equity-related", desc: "Dynamic 0–100% across large, mid & small caps based on market conditions and macro outlook" },
  { title: "Debt & money market", desc: "0–100% in government securities, CP, CD, T-bills, short-term corporate debt for cash management & duration plays" },
  { title: "Commodity derivatives (ETCDs)", desc: "Up to 30% exposure via exchange-traded commodity derivatives or commodity-linked ETFs" },
  { title: "InvITs", desc: "Up to 20% in listed Infrastructure Investment Trusts for yield + infra exposure" },
  { title: "Equity & debt derivatives", desc: "Used for hedging, rebalancing, and up to 25% unhedged short exposure on permitted instruments" },
];

const SHORT_STRATEGIES = [
  { name: "Short Futures", desc: "Shorting Index or Stock Futures to benefit from price decline", level: "Very High" },
  { name: "Synthetic Short", desc: "Buy a put + sell a call at same strike/expiry to mimic short stock", level: "Very High" },
  { name: "Long Put", desc: "Buy a put option to profit from decline below the strike", level: "Low" },
  { name: "Bear Put Spread", desc: "Buy higher-strike put + sell lower-strike put (same expiry)", level: "Low" },
  { name: "Short Call", desc: "Sell a call option — profits if price stays below strike", level: "Very High" },
  { name: "Bear Call Spread", desc: "Sell lower-strike call + buy higher-strike call", level: "Moderate" },
  { name: "Long Put Butterfly", desc: "Buy/sell/buy puts at ascending strikes for limited bearish moves", level: "Low" },
  { name: "Long Put Calendar", desc: "Sell near-term put + buy longer-term put at same strike", level: "Low" },
  { name: "Long Put Diagonal", desc: "Sell near-term lower-strike put + buy longer-term higher-strike put", level: "Low" },
  { name: "Ratio Put Spread", desc: "Buy 1 put at higher strike + sell multiple puts at lower strike", level: "High" },
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

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

const TABS = ["Snapshot", "Strategy", "Fund Managers", "Risk & Scores", "Documents"] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const QsifAaaSif = () => {
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
            <nav className="text-xs text-gray-400 mb-4">
              <a href="/" className="hover:text-gray-600">SIF Universe</a>
              <span className="mx-1.5">›</span>
              <a href="/sif-funds-launched" className="hover:text-gray-600">Active Asset Allocator</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">qSIF AAA</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-sm text-gray-500">quant Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-amber-500 text-[#0f1f3d] font-bold px-2 py-0.5 rounded text-[11px] animate-pulse">
                    NFO OPEN
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  qsif Active Asset Allocator Long-Short Fund
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
        {/* SNAPSHOT TAB                                                 */}
        {/* ============================================================ */}
        {activeTab === "Snapshot" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* ====== MAIN COLUMN ====== */}
              <div className="flex-1 min-w-0 space-y-6">
                {/* A) NFO STATUS */}
                <div className="rounded-xl border-2 border-amber-200 bg-amber-50/40 overflow-hidden">
                  <div className="bg-amber-500 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[#0f1f3d] font-bold text-sm flex items-center gap-2">
                      ⚡ NFO Open — Subscribe before 16 April 2026
                    </span>
                    <span className="bg-white/25 text-[#0f1f3d] text-xs font-bold px-3 py-1 rounded-full">
                      New Launch
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">NFO Opens</p>
                        <p className="text-base sm:text-xl font-bold text-green-600">02 Apr 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">NFO Closes</p>
                        <p className="text-base sm:text-xl font-bold text-amber-600">16 Apr 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">NFO Price</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">₹10</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Min Investment</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">₹10,00,000</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      Quant&apos;s fourth SIF strategy and first <b>multi-asset allocator</b>. Offering price
                      is <b>₹10 per unit</b> during the NFO. Strategy re-opens for continuous sale/repurchase
                      within <b>5 business days</b> of allotment. Accredited investors may enter at ₹1L min.
                    </p>
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-amber-500 hover:bg-amber-400 text-[#0f1f3d] font-bold">
                        Invest on qsif.com <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* B) OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Achieve <b>long-term capital appreciation and income generation</b> by dynamically
                    allocating across multiple asset classes — equity, debt, equity & debt derivatives,
                    InvITs and commodity derivatives — while using <b>up to 25% short exposure</b> on
                    permitted instruments through derivatives to optimize returns and manage risk efficiently.
                  </p>
                </div>

                {/* C) STRATEGY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A dynamic multi-asset approach that actively allocates across equities, debt, InvITs,
                    commodity derivatives and hedging/rebalancing derivative overlays. Up to 25% of the book
                    may be allocated to unhedged short derivative positions (short equity/bond futures) to
                    capitalize on bearish opportunities — ensuring liquidity, adaptability and cycle-aware risk-adjusted returns.
                  </p>
                </div>

                {/* D) ASSET CLASSES */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Asset classes covered</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {ASSET_CLASSES.map((a) => (
                      <div key={a.title} className="rounded-lg border border-gray-100 p-4">
                        <p className="text-sm font-bold text-purple-700 mb-1">{a.title}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{a.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* E) SUITABILITY */}
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

                {/* F) TEAM */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management team (5)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center shrink-0">
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
                </div>
              </div>

              {/* ====== SIDEBAR ====== */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Subscribe to qSIF AAA NFO</h3>
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

                <SidebarCard title="Fund details">
                  {FUND_DETAILS.map((d) => (
                    <DetailRow key={d.label} label={d.label} value={d.value} />
                  ))}
                </SidebarCard>

                <SidebarCard title="Redemption & Liquidity">
                  {REDEMPTION.map((d) => (
                    <DetailRow key={d.label} label={d.label} value={d.value} />
                  ))}
                </SidebarCard>

                <SidebarCard title="Risk & compliance">
                  {RISK.map((d) => (
                    <DetailRow key={d.label} label={d.label} value={d.value} color={d.color} />
                  ))}
                </SidebarCard>

                <SidebarCard title="Other allocator / qSIF funds">
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
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Dynamic multi-asset approach</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The strategy actively allocates capital across equities, debt, equity & debt derivatives,
                InvITs and commodity derivatives (or commodity-linked ETFs), based on prevailing market
                conditions, economic trends, and risk-return opportunities. Up to 25% of the portfolio may
                be in unhedged short derivative positions to capitalize on bearish views; additional
                derivative exposure is used for hedging and rebalancing.
              </p>
            </div>

            {/* Allocation table */}
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
                    {[
                      ["Equity and equity-related instruments", "0%", "100%"],
                      ["Debt and money market instruments", "0%", "100%"],
                      ["Exchange Traded Commodity Derivatives (ETCDs)", "0%", "30%"],
                      ["InvITs", "0%", "20%"],
                    ].map(([inst, min, max]) => (
                      <tr key={inst} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4">{inst}</td>
                        <td className="py-3 px-4 text-right font-semibold">{min}</td>
                        <td className="py-3 pl-4 text-right font-semibold">{max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Cumulative gross exposure capped at 100% of net assets (SEBI Master Circular,
                20 Mar 2026). Short exposure via unhedged derivatives: up to 25%. Stock lending:
                ≤20% of net assets, ≤5% per broker.
              </p>
            </div>

            {/* Short strategies */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Short / bearish derivative strategies</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Strategy</th>
                      <th className="py-3 px-4 font-semibold">Description</th>
                      <th className="py-3 pl-4 font-semibold text-right">Risk</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {SHORT_STRATEGIES.map((s) => (
                      <tr key={s.name} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-semibold">{s.name}</td>
                        <td className="py-3 px-4 text-xs text-gray-600">{s.desc}</td>
                        <td className={`py-3 pl-4 text-right font-semibold text-xs ${
                          s.level === "Very High" ? "text-red-600" :
                          s.level === "High" ? "text-orange-600" :
                          s.level === "Moderate" ? "text-amber-600" :
                          "text-green-600"
                        }`}>{s.level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Position sizing, loss limits and exposure caps enforced by internal risk framework.
                Full derivative strategy library available in SAI.
              </p>
            </div>

            {/* Benchmark */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Composite benchmark</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                <b>40% NSE 500 TRI + 30% CRISIL Short Term Bond Fund Index + 30% iCOMDEX Composite Index</b>.
                The composite blend mirrors the strategy&apos;s cross-asset mandate — equities, short-duration debt
                and commodities — providing a fair comparator for the multi-asset return stream.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Equity</p>
                  <p className="text-lg font-bold text-gray-900">40%</p>
                  <p className="text-[10px] text-gray-400 mt-1">NSE 500 TRI</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Debt</p>
                  <p className="text-lg font-bold text-gray-900">30%</p>
                  <p className="text-[10px] text-gray-400 mt-1">CRISIL ST Bond</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Commodities</p>
                  <p className="text-lg font-bold text-gray-900">30%</p>
                  <p className="text-[10px] text-gray-400 mt-1">iCOMDEX</p>
                </div>
              </div>
            </div>

            {/* Turnover */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio turnover</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                No specific target. As an interval fund, turnover depends on market opportunities. Frequent
                trading can increase brokerage, but AMC aims to optimise turnover for risk-adjusted return.
                High turnover may reflect arbitrage opportunities rather than a change in views.
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
              <h3 className="text-base font-bold text-gray-900 mb-2">Five-person portfolio team</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The strategy is co-managed by the full quant SIF team — combining equity, derivatives,
                commodity, and fixed-income expertise. All managers also run the three existing qsif
                strategies (Equity L/S, Ex-Top 100 L/S, Hybrid L/S).
              </p>
            </div>

            {/* Sandeep */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">ST</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Sandeep Tandon</h3>
                  <p className="text-sm text-gray-500 mb-3">Founder & Chief Investment Officer, quant Group · Age 55 · 33+ yrs</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">MBA Finance</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">Founder CIO</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Started at GIC Mutual Fund (JV with George Soros) in 1992–93. Founding member of
                    IDBI Asset Management (now Principal), key role in India&apos;s successful IDBI I-NITS 95
                    scheme. Worked at ICICI Securities (JV with JP Morgan), Kotak Securities (JV with Goldman Sachs),
                    REFCO, Economic Times Research Bureau. As CEO of Quant Broking (2008–2018), led prop trading
                    with $1B+ daily turnover — no recorded yearly or quarterly losses over the 10-year period.
                  </p>
                </div>
              </div>
            </div>

            {/* Jignesh */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">JS</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Jignesh Shah</h3>
                  <p className="text-sm text-gray-500 mb-3">Portfolio Manager · Age 54 · 30+ yrs</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">CFA (ICFAI)</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">Sydenham College</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Three decades across equity, macro, and commodities through multiple cycles. Prior:
                    Nippon Life AMC (Investment Analyst tracking global commodities), senior PM roles at
                    ICICI Prudential AMC and Aditya Birla Sun Life AMC managing diversified equity portfolios.
                    Previously associated with the quant group — deep familiarity with its investment philosophy
                    and disciplined risk framework.
                  </p>
                </div>
              </div>
            </div>

            {/* Ankit */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">AP</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Ankit Pande</h3>
                  <p className="text-sm text-gray-500 mb-3">Portfolio Manager · Age 40 · 14+ yrs</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">BE Electronics — Pune</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">MBA — CUHK</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">CFA Level III</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    14+ years in Indian equities; 3+ years prior in Infosys Finacle core banking software.
                    Thomson Reuters StarMine Award (best IT stock picker, 2014). Beta Gamma Sigma honour society.
                    At Quant Broking under Sandeep Tandon, developed fundamental long-short ideas with covered calls
                    and protective puts. Currently fund manager across quant MF schemes with superior risk-adjusted returns.
                  </p>
                </div>
              </div>
            </div>

            {/* Sameer */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">SK</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Sameer Kate</h3>
                  <p className="text-sm text-gray-500 mb-3">Chief Dealer · Age 55 · 20+ yrs</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">BCS — Pune</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">MBA — IME Pune</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Career started at REFCO (world&apos;s largest derivatives group) as a derivatives dealer. 16 years
                    at Kotak Group — Senior Derivatives Sales Trader at Kotak Securities (JV with Goldman Sachs);
                    advisor to Kotak prop desk (AUM ₹500 Cr+). Recognised industry expert in synthetic derivatives.
                    Joined Investec Capital covering equity/derivatives for institutional clients. Currently Chief
                    Dealer at quant, focused on arbitrage.
                  </p>
                </div>
              </div>
            </div>

            {/* Sanjeev */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">SS</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Sanjeev Sharma</h3>
                  <p className="text-sm text-gray-500 mb-3">Treasury / Debt PM · Age 49 · 20+ yrs</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">PGDBA (Finance)</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">M.Com</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">CerTM (Treasury & Forex Risk)</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Two decades+ in equity, debt, fund management and treasury operations. Extensive experience
                    deploying strategies across equity, debt, and derivatives instruments.
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
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50/40 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">Risk band — Level 5</h3>
                <span className="bg-amber-500 text-[#0f1f3d] text-xs font-bold px-3 py-1 rounded-full">
                  AMFI
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk band assigned at <b>Level 5</b> per AMFI, matching the benchmark risk band. Benchmark:
                40% NSE 500 TRI + 30% CRISIL Short Term Bond Fund Index + 30% iCOMDEX Composite Index.
                SIFs involve higher risk including potential capital loss, liquidity and market volatility —
                suitable only for informed HNI / accredited investors.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Strategy-level risks</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Multi-Asset Risk", d: "Returns depend on correctly calling equity/debt/commodity cycles. Wrong allocation calls can compound losses across sleeves." },
                  { t: "Short-Sale Risk", d: "Losses on short positions are theoretically unlimited. Short squeezes and borrow costs in stress can amplify drawdowns." },
                  { t: "Leverage / Derivatives Risk", d: "Up to 100% gross exposure across cash + derivatives. Leverage amplifies both upside and downside during volatile regimes." },
                  { t: "Commodity Derivative Risk", d: "ETCD exposure (up to 30%) carries commodity-specific volatility, margin calls, delivery and regulatory risks." },
                  { t: "Interval Liquidity Risk", d: "Redemption is only on Tue & Wed (physical) or via NSE (demat). Investors may not access capital between redemption windows." },
                  { t: "Interest Rate & Credit Risk", d: "Debt sleeve (up to 100%) exposed to rate shifts, credit events, spread expansion and rating migration." },
                  { t: "InvIT Concentration", d: "InvIT allocation (up to 20%) carries infra-specific concentration, regulatory and distribution risks." },
                  { t: "Manager / New Strategy Risk", d: "New strategy without live track record. Execution quality depends on manager skill, risk systems, and discipline." },
                ].map((r) => (
                  <div key={r.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-red-700 mb-1">{r.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Risk mitigation framework</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Exposure limits</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI gross-exposure cap at 100% of net assets. Short exposure ≤ 25%. Stock lending ≤ 20%
                    (≤ 5% per broker). ETCDs ≤ 30%. InvITs ≤ 20%.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Derivatives discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Position sizing and loss limits enforced via internal risk framework. Diversification
                    across indices, sectors, expiries to reduce concentration. Prefers derivative contracts
                    with adequate liquidity and open interest.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Debt sleeve</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Shorter-duration instruments and highly-rated issuers preferred to mitigate rate,
                    credit, spread and rating-migration risk.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Segregated portfolio option</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    AMC/Trustee may carve out a segregated portfolio on credit events / defaults to
                    protect remaining unitholders.
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
                All documents hosted on qsif.com. The Investment Strategy Information Document (ISID) is
                dated <b>27 March 2026</b>. Signed by Sandeep Tandon (CEO).
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II", href: AMC_URL },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors — incorporated by reference", href: AMC_URL },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form", href: AMC_URL },
                  { t: "Scheme factsheet (monthly)", d: "Available from first NAV date", href: AMC_URL },
                  { t: "Portfolio disclosures", d: "Top 10 holdings & sector allocation (post-launch)", href: "http://qsif.com/statutory-disclosures" },
                  { t: "NAV history", d: "Daily NAV on AMFI + qsif.com", href: "http://qsif.com/NAV/historic-Nav-Details.aspx" },
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

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Key dates & operational details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    {[
                      ["ISID date", "27 March 2026"],
                      ["NFO opens", "02 April 2026"],
                      ["NFO closes", "16 April 2026"],
                      ["Strategy re-opens", "Within 5 business days of allotment"],
                      ["NFO price per unit", "₹10"],
                      ["Face value", "₹10"],
                      ["First NAV", "Within 5 business days of allotment"],
                      ["NAV declaration", "By 11:00 PM each business day on qsif.com + AMFI"],
                      ["Subscription", "Daily (business days)"],
                      ["Redemption (physical)", "Tuesday & Wednesday"],
                      ["Redemption (demat)", "Via NSE (any business day once listed)"],
                      ["Redemption settlement", "T+3 business days"],
                      ["IDCW payout", "7 working days from record date"],
                      ["Plans", "Growth / IDCW (Payout + Reinvestment) — Regular & Direct"],
                      ["Default option", "Growth · IDCW Reinvestment (if IDCW chosen)"],
                      ["Strategy code", "QSIF/I/H/AALS/25/10/0004/QNTM"],
                      ["Benchmark", "40% NSE 500 TRI + 30% CRISIL ST Bond + 30% iCOMDEX"],
                      ["Listing", "NSE (scrip code on listing)"],
                      ["Segregated portfolio", "Permitted — refer SAI"],
                      ["Stock lending", "Up to 20% net assets; 5% per broker"],
                      ["Short selling", "Permitted via derivatives (up to 25%)"],
                      ["Registrar", "KFin Technologies"],
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

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <b>Entry load:</b> Nil (per SEBI).<br />
                <b>Exit load:</b> 1% if redeemed / switched out on or before completion of 15 days from
                allotment; Nil thereafter. Switches between plans/options within the same strategy treated
                as load-exempt; switches across strategies treated as redemption + subscription with
                applicable loads.
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Systematic facilities (post-NFO)</h3>
              <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed">
                <li>• <b>SIP:</b> Weekly / Fortnightly / Monthly / Quarterly — ₹10,000 minimum, 6 instalments</li>
                <li>• <b>STP:</b> Daily / Weekly / Fortnightly / Monthly / Quarterly — ₹10,000 minimum</li>
                <li>• <b>SWP:</b> Monthly / Quarterly — ₹10,000 minimum, 6 instalments</li>
                <li>• <b>SIP Pause:</b> Up to 3 months</li>
                <li>• <b>Channels:</b> AMC website, MF Utility, NSE MFSS, BSEStAR MF, KFinKart, ASBA</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="qsif-active-asset-allocator" fundName="qSIF AAA by Quant" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default QsifAaaSif;
