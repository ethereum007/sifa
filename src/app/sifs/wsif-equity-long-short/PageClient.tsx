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
/*  Brand palette                                                      */
/* ------------------------------------------------------------------ */

const BRAND_GOLD = "#C9A227";
const BRAND_GOLD_SOFT = "#F7EFD3";
const BRAND_GOLD_LINE = "#E5D68F";
const BRAND_GREEN = "#0F4A2E";
const BRAND_GREEN_SOFT = "#E6F0EB";

/* ------------------------------------------------------------------ */
/*  Static data for WSIF (The Wealth Company)                          */
/* ------------------------------------------------------------------ */

const AMC_URL = "https://www.wealthcompanyamc.in/wsif/";
const ISID_URL = "/sifs/wsif-equity-long-short/ISID.pdf";

const TAGS = [
  "Equity Long-Short",
  "Long-Biased",
  "Up to 25% Unhedged Short",
  "Large / Mid / Small Cap",
  "Active Management",
  "Risk Band 5",
];

const METRICS = [
  { label: "Status", value: "Live", sub: "since 11 May 2026", color: "text-green-600" },
  { label: "Inception NAV", value: "₹10", sub: "Per unit", color: "" },
  { label: "Inception", value: "15 Apr", sub: "2026", color: "" },
  { label: "Allotment", value: "29 Apr", sub: "2026", color: "" },
  { label: "Max TER", value: "2.25%", sub: "Regular plan", color: "" },
  { label: "Min Investment", value: "₹10L", sub: "₹10K additional", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "The Wealth Company MF" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "Status", value: "Live since 11 May 2026" },
  { label: "SIP", value: "Available" },
  { label: "Exit Load", value: "NIL" },
];

const ALLOCATION_TAGS = [
  "Equity & equity related 80–100%",
  "Unhedged short via derivatives ≤ 25%",
  "Debt & money market 0–20%",
  "InvITs 0–20%",
  "Stock lending ≤ 20% (≤5% per broker)",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "The Wealth Company MF" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception", value: "15 Apr 2026" },
  { label: "Allotment", value: "29 Apr 2026" },
  { label: "Live since", value: "11 May 2026" },
  { label: "Inception NAV", value: "₹10 / unit" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "Max TER", value: "2.25%" },
  { label: "Strategy code", value: "WSIF/O/E/ELSF/26/01/0001/TWCF" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Daily" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP / STP / SWP", value: "Available · ₹1,000" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹1,000" },
  { label: "Listing", value: "Not listed" },
];

const RISK = [
  { label: "Risk band", value: "Level 5", color: "text-amber-600" },
  { label: "Short selling", value: "Via derivatives (≤25%)" },
  { label: "Lock-in period", value: "None" },
  { label: "Exit load", value: "NIL" },
  { label: "Segregated portfolio", value: "Allowed" },
];

const PEERS = [
  { name: "Sapphire Equity L/S", amc: "Franklin Templeton", ret: "—", href: "/sifs/sapphire-equity-long-short" },
  { name: "qSIF Equity L/S", amc: "Quant", ret: "—", href: "/sifs/qsif-equity-long-short" },
  { name: "Diviniti Equity L/S", amc: "ITI", ret: "—", href: "/sifs/diviniti-equity-long-short" },
  { name: "Dyna Equity L/S", amc: "360 ONE", ret: "—", href: "/sifs/dyna-equity-long-short" },
  { name: "Arudha Equity L/S", amc: "Bandhan", ret: "—", href: "/sifs/arudha-equity-long-short" },
];

const TEAM = [
  {
    name: "Chinmay Sathe",
    role: "Fund Manager",
    creds: "B.E., PGDM · Age 48 · 21+ yrs",
    initials: "CS",
  },
];

const SUITABLE = [
  "Long-term capital appreciation seekers",
  "HNIs comfortable with equity volatility",
  "Investors seeking limited-short alpha overlay",
  "5+ year investment horizon",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Investors needing frequent liquidity",
  "Below ₹10L investable surplus",
  "Low risk tolerance profiles",
];

const PORTFOLIO_OPTIONS = [
  { title: "Unhedged long-only", desc: "Long-only equity portfolio with no derivative overlay." },
  { title: "Partially-hedged long-only", desc: "Long equity with partial hedges via index / stock futures or options." },
  { title: "Fully-hedged long-only", desc: "Long equity fully hedged via index / stock futures or options." },
  { title: "Unhedged long-short", desc: "Long book with up to 25% naked-short via stock futures or options." },
  { title: "Partially-hedged long-short", desc: "Long book with partial hedges plus up to 25% naked-short positions." },
  { title: "Fully-hedged long with naked short", desc: "Fully-hedged long book combined with up to 25% naked-short via stock derivatives." },
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

const WsifEquityLongShort = () => {
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
              <span className="text-gray-600">WSIF</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                {/* AMC + NFO badge */}
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_GOLD }} />
                    <span className="text-sm text-gray-500">The Wealth Company Mutual Fund</span>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-500 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                    LIVE
                  </span>
                </div>
                {/* Fund name */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  WSIF Equity Long-Short Fund
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
                  <Button
                    size="sm"
                    className="text-white hover:opacity-90"
                    style={{ backgroundColor: BRAND_GREEN }}
                  >
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
                  style={activeTab === tab ? { color: BRAND_GREEN } : undefined}
                >
                  {tab}
                  {activeTab === tab && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ backgroundColor: BRAND_GREEN }}
                    />
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

                {/* A) NFO STATUS CARD */}
                <div
                  className="rounded-xl border-2 overflow-hidden"
                  style={{ borderColor: BRAND_GOLD_LINE, backgroundColor: BRAND_GOLD_SOFT + "66" }}
                >
                  <div
                    className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-2"
                    style={{ backgroundColor: BRAND_GOLD }}
                  >
                    <span className="font-bold text-sm flex items-center gap-2" style={{ color: BRAND_GREEN }}>
                      ✓ Live since 11 May 2026 — Subscribe daily
                    </span>
                    <span
                      className="bg-white/40 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ color: BRAND_GREEN }}
                    >
                      Open for Subscription
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5">
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Inception</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">15 Apr 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Live since</p>
                        <p className="text-base sm:text-xl font-bold text-emerald-600">11 May 2026</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Inception NAV</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">₹10</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Min Investment</p>
                        <p className="text-base sm:text-xl font-bold text-gray-900">₹10,00,000</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      The Wealth Company&apos;s first Specialized Investment Fund. NFO ran 15–29 April
                      2026 at <b>₹10 per unit</b>; the strategy is now <b>live for continuous Sale and
                      Repurchase</b> from 11 May 2026. Accredited investors: minimum application{" "}
                      <b>₹1,00,000</b>.
                    </p>
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="font-bold hover:opacity-90"
                        style={{ backgroundColor: BRAND_GOLD, color: BRAND_GREEN }}
                      >
                        Invest on wealthcompanyamc.in <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* B) INVESTMENT OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold mb-3" style={{ color: BRAND_GREEN }}>Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To generate <b>long-term capital appreciation</b> by investing in a diversified portfolio
                    of equity and equity-related instruments while utilising <b>limited short exposure
                    through derivatives</b>. There is no assurance that the investment objective of the
                    Investment Strategy will be achieved.
                  </p>
                </div>

                {/* C) STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border"
                        style={{
                          backgroundColor: BRAND_GREEN_SOFT,
                          color: BRAND_GREEN,
                          borderColor: "#BFD8CA",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    WSIF Equity Long-Short Fund is a <b>long-biased equity strategy</b> investing across
                    large, mid and small cap names, with a limited <b>unhedged short sleeve of up to 25%
                    of net assets</b> implemented via stock and index derivatives — per SEBI&apos;s SIF
                    framework circular dated 27 February 2025.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The fund manager may combine the long sleeve with unhedged long-only, partially-hedged
                    or fully-hedged overlays (index / stock futures and options), alongside the up-to-25%
                    naked-short positions. Cumulative gross exposure is capped at 100% of net assets.
                  </p>
                </div>

                {/* D) PORTFOLIO CONSTRUCTION OPTIONS */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>
                    Portfolio construction options
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {PORTFOLIO_OPTIONS.map((f) => (
                      <div key={f.title} className="rounded-lg border border-gray-100 p-4">
                        <p className="text-sm font-bold mb-1" style={{ color: BRAND_GOLD }}>{f.title}</p>
                        <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">
                    The fund may toggle between these construction modes for portfolio rebalancing or
                    to reflect the manager&apos;s view on market conditions.
                  </p>
                </div>

                {/* E) INVESTOR SUITABILITY */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Investor suitability</h3>
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
                  <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Fund management</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-full font-bold text-sm flex items-center justify-center shrink-0"
                          style={{ backgroundColor: BRAND_GOLD_SOFT, color: BRAND_GREEN }}
                        >
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
                    Mr. Sathe brings over 21 years of experience in Asset Management Services, with
                    expertise in fund management, equity research and diverse asset classes. Prior roles:
                    11+ years at Bajaj Allianz Life as Senior Fund Manager; earlier stints at L&amp;T Mutual
                    Fund, DSP Merrill Lynch and UTI Mutual Fund as Equity Research Analyst. This is his
                    first investment strategy at WSIF.
                  </p>
                </div>
              </div>

              {/* ====== SIDEBAR ====== */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">

                {/* S1) CTA */}
                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: BRAND_GOLD_LINE, backgroundColor: BRAND_GOLD_SOFT + "66" }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Subscribe to WSIF NFO</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist, or invest directly with the AMC.</p>
                  <div className="flex flex-col gap-2">
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button
                        className="w-full font-bold text-sm hover:opacity-90"
                        style={{ backgroundColor: BRAND_GOLD, color: BRAND_GREEN }}
                      >
                        Invest via AMC <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                    <div className="flex gap-2">
                      <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button
                          className="w-full text-white text-sm hover:opacity-90"
                          style={{ backgroundColor: BRAND_GREEN }}
                        >
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
                        className="rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors"
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
            {/* Approach */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-3" style={{ color: BRAND_GREEN }}>Long-biased investment process</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                WSIF Equity Long-Short is a <b>long-biased strategy</b>: the core 80–100% allocation sits
                in equity and equity-related instruments, while a limited <b>unhedged short sleeve of up
                to 25%</b> is implemented via stock and index derivatives. The combination is intended to
                pursue capital appreciation with a layer of hedging flexibility.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div
                  className="rounded-lg border p-4"
                  style={{ backgroundColor: BRAND_GREEN_SOFT, borderColor: "#BFD8CA" }}
                >
                  <p className="text-sm font-bold mb-2" style={{ color: BRAND_GREEN }}>Long sleeve (core)</p>
                  <p className="text-xs leading-relaxed" style={{ color: BRAND_GREEN }}>
                    Diversified across large, mid and small cap names. Selection reflects the
                    manager&apos;s fundamental assessment of business quality, financial strength and
                    relative valuation.
                  </p>
                </div>
                <div
                  className="rounded-lg border p-4"
                  style={{ backgroundColor: BRAND_GOLD_SOFT, borderColor: BRAND_GOLD_LINE }}
                >
                  <p className="text-sm font-bold mb-2" style={{ color: BRAND_GREEN }}>Short sleeve (≤25%)</p>
                  <p className="text-xs leading-relaxed" style={{ color: BRAND_GREEN }}>
                    Unhedged short exposure using stock and index futures or options, capped at 25% of
                    net assets per SEBI&apos;s SIF framework (27 Feb 2025). Used for alpha and downside
                    management.
                  </p>
                </div>
              </div>
            </div>

            {/* Exposure ranges */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Exposure ranges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Equity (incl. short)</p>
                  <p className="text-lg font-bold text-green-600">80–100%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Long + short combined</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Unhedged short</p>
                  <p className="text-lg font-bold text-red-600">0–25%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Via derivatives</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Debt / money mkt</p>
                  <p className="text-lg font-bold text-gray-900">0–20%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Liquidity / cash mgmt</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">InvITs</p>
                  <p className="text-lg font-bold text-gray-900">0–20%</p>
                  <p className="text-[10px] text-gray-400 mt-1">≤10% per single issuer</p>
                </div>
              </div>
            </div>

            {/* Asset allocation table */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Asset allocation (% of total assets)</h3>
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
                      <td className="py-3 pr-4">Equity & equity-related instruments (incl. unhedged short)</td>
                      <td className="py-3 px-4 text-right font-semibold">80%</td>
                      <td className="py-3 pl-4 text-right font-semibold">100%</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4">Unhedged short via equity derivatives</td>
                      <td className="py-3 px-4 text-right font-semibold">0%</td>
                      <td className="py-3 pl-4 text-right font-semibold">25%</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4">Debt & money market instruments</td>
                      <td className="py-3 px-4 text-right font-semibold">0%</td>
                      <td className="py-3 pl-4 text-right font-semibold">20%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">InvITs</td>
                      <td className="py-3 px-4 text-right font-semibold">0%</td>
                      <td className="py-3 pl-4 text-right font-semibold">20%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Cumulative gross exposure through equity, debt, derivatives, repos and credit default swaps
                shall not exceed 100% of net assets, per SEBI SIF circular dated 27 February 2025 and
                Master Circular dated 27 June 2024. REITs are included within equity-related instruments.
              </p>
            </div>

            {/* Instrument limits */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Instrument-level limits</h3>
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
                      ["Stock lending", "≤ 20% of net assets (≤ 5% per single broker)"],
                      ["Derivatives — unhedged short exposure", "Up to 25% of net assets"],
                      ["Securitized debt", "Up to 10% of debt portion"],
                      ["Overseas securities", "Up to 20% of net assets (not invested until dedicated FM appointed)"],
                      ["Structured / Credit-enhanced debt (SO / CE)", "≤ 10% of debt portfolio; group ≤ 5%"],
                      ["AT1 / Perpetual & Tier-2 bonds", "≤ 10% of debt portfolio; group ≤ 5%"],
                      ["Triparty Repo (TREPS)", "Up to 20% of net assets"],
                      ["Repo / reverse repo in corporate debt", "Up to 10% of net assets"],
                      ["Hedged equity positions", "Up to 100% of net assets"],
                      ["Credit Default Swaps", "Not permitted"],
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
              <h3 className="text-base font-bold mb-3" style={{ color: BRAND_GREEN }}>Portfolio construction modes</h3>
              <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>• <b>Unhedged long-only:</b> long equity without any derivative overlay</li>
                <li>• <b>Partially-hedged long-only:</b> long equity with partial hedges via index / stock futures or options</li>
                <li>• <b>Fully-hedged long-only:</b> long equity fully hedged via index / stock futures or options</li>
                <li>• <b>Unhedged long-short:</b> long book + up to 25% naked-short using stock futures or options</li>
                <li>• <b>Partially-hedged long-short:</b> long book partially hedged + up to 25% naked-short positions</li>
                <li>• <b>Fully-hedged long with naked short:</b> fully-hedged long book combined with up to 25% naked-short via stock derivatives</li>
              </ul>
            </div>

            {/* Turnover & derivatives */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold mb-3" style={{ color: BRAND_GREEN }}>Portfolio turnover</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The fund manager may trade more frequently when subscription / redemption flows or
                  market views warrant it — increasing transaction costs. The strategy has no specific
                  turnover target; the manager aims to optimise turnover to maximise gains and minimise
                  cost impact.
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold mb-3" style={{ color: BRAND_GREEN }}>Derivatives usage</h3>
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
            {/* Manager profile */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div
                  className="w-20 h-20 rounded-full font-bold text-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: BRAND_GOLD_SOFT, color: BRAND_GREEN }}
                >
                  CS
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Chinmay Sathe</h3>
                  <p className="text-sm text-gray-500 mb-3">Fund Manager · The Wealth Company Mutual Fund</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{ backgroundColor: BRAND_GOLD_SOFT, color: BRAND_GREEN, borderColor: BRAND_GOLD_LINE }}
                    >
                      B.E.
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{ backgroundColor: BRAND_GOLD_SOFT, color: BRAND_GREEN, borderColor: BRAND_GOLD_LINE }}
                    >
                      PGDM
                    </span>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{ backgroundColor: BRAND_GOLD_SOFT, color: BRAND_GREEN, borderColor: BRAND_GOLD_LINE }}
                    >
                      Age 48 · 21+ yrs exp
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">Profile</h4>
                  <ul className="text-sm text-gray-600 space-y-1.5 leading-relaxed">
                    <li>• Over 21 years of experience in the Asset Management Services industry, with expertise across fund management, equity research and diverse asset classes</li>
                    <li>• This is his first investment strategy at WSIF — tenure recorded as NA in the ISID</li>
                    <li>• No other investment strategies currently managed (per ISID disclosure)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Career timeline */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-5" style={{ color: BRAND_GREEN }}>Career timeline</h3>
              <div className="space-y-5">
                <div className="border-l-2 pl-4" style={{ borderColor: BRAND_GOLD }}>
                  <p className="text-xs text-gray-400">2026 – Present</p>
                  <p className="text-sm font-bold text-gray-900">Fund Manager — The Wealth Company Mutual Fund</p>
                  <p className="text-xs text-gray-600 mt-1">Managing WSIF Equity Long-Short Fund, the AMC&apos;s first investment strategy.</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">~11+ years prior</p>
                  <p className="text-sm font-bold text-gray-900">Senior Fund Manager — Bajaj Allianz Life</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Longest stint: over 11 years at Bajaj Allianz Life in a senior fund-management capacity.
                  </p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">Earlier</p>
                  <p className="text-sm font-bold text-gray-900">Equity Research Analyst — L&amp;T Mutual Fund</p>
                  <p className="text-xs text-gray-600 mt-1">Earlier stint in equity research covering Indian equities.</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">Earlier</p>
                  <p className="text-sm font-bold text-gray-900">Equity Research — DSP Merrill Lynch</p>
                  <p className="text-xs text-gray-600 mt-1">Equity research role covering Indian listed companies.</p>
                </div>
                <div className="border-l-2 border-gray-200 pl-4">
                  <p className="text-xs text-gray-400">Earlier</p>
                  <p className="text-sm font-bold text-gray-900">Equity Research Analyst — UTI Mutual Fund</p>
                  <p className="text-xs text-gray-600 mt-1">Early-career equity research role at UTI Mutual Fund.</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Exact dates for pre-2026 roles are not disclosed in the ISID beyond a cumulative 21+ years
                of industry experience.
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
            <div
              className="rounded-xl border-2 p-5 sm:p-6"
              style={{ borderColor: BRAND_GOLD_LINE, backgroundColor: BRAND_GOLD_SOFT + "66" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">Risk band</h3>
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ backgroundColor: BRAND_GOLD, color: BRAND_GREEN }}
                >
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

            {/* SIF-specific risks */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Equity Long/Short strategy risks</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Strategy & Manager Risk", d: "SIF is a new asset class without an established track record. Returns depend heavily on the fund manager's skill and risk-management discipline." },
                  { t: "Market Risk", d: "A long-biased portfolio remains exposed to broad equity market drawdowns. Sentiment swings can hurt both long and short legs simultaneously." },
                  { t: "Short-Sale Risk", d: "If a shorted stock rises sharply, potential losses via derivatives are amplified — making shorts riskier than long positions." },
                  { t: "Leverage Risk", d: "Derivatives amplify both returns and drawdowns. Leverage increases downside and volatility in stress periods." },
                  { t: "Idiosyncratic / Stock-Specific", d: "Earnings surprises, management changes, scandals or regulatory action can hit specific names regardless of market direction." },
                  { t: "Execution & Liquidity", d: "Shorts may be hard to establish or maintain in less liquid stocks. Short-squeeze and borrow-cost spikes are real risks during stress." },
                  { t: "Mid / Small Cap Risk", d: "Investments across large, mid and small cap names can introduce higher liquidity, price-impact and drawdown volatility than a purely large-cap portfolio." },
                  { t: "Concentration Risk", d: "Poor diversification or excessive single-stock / sector bets raises risk. Regular rebalancing and position limits mitigate this." },
                  { t: "Higher Costs", d: "Derivative premia, borrow expenses and frequent rebalancing can erode returns, especially with elevated portfolio turnover." },
                  { t: "Liquidity & Redemption", d: "Redemption dispatch within 3 working days under normal circumstances; in stress, liquidity of underlying may affect timing." },
                ].map((r) => (
                  <div key={r.t} className="rounded-lg border border-gray-100 p-4">
                    <p className="text-sm font-bold text-red-700 mb-1">{r.t}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{r.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk mitigation */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Risk mitigation</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: BRAND_GREEN }}>Equity risk controls</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI exposure limits, attribution analysis versus benchmark, portfolio volatility
                    monitoring, liquidity maintained via actively-traded large / mid / small cap names and
                    a debt / cash buffer for redemptions. Portfolio turnover monitored at regular intervals.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: BRAND_GREEN }}>Derivatives discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Regulatory caps on unhedged short (≤25%) and cumulative gross exposure (≤100%).
                    Restricts contracts with low liquidity / open interest. Diversified across indices,
                    sectors and expiries. Covered calls only within regulatory limits.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: BRAND_GREEN }}>Stock lending</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Stock lending capped at 20% of net assets overall, and 5% of net assets with any single
                    approved intermediary (broker-level cap) per clause 12.11 of SEBI&apos;s Master Circular.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: BRAND_GREEN }}>Debt sleeve & settlement</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Debt / money market allocation capped at 20%. Tri-party repos backed by CCIL margin and
                    guaranteed settlement. Securitized debt capped at 10% of the debt portion; AT1 /
                    perpetual and Tier-2 bonds capped at 10% of debt with 5% group limit.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: BRAND_GREEN }}>Segregated portfolio</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Creation of a segregated portfolio is permitted in the event of a credit event in the
                    debt sleeve — details are covered in the SAI.
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
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Official documents</h3>
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                The Investment Strategy Information Document (ISID) is dated <b>25 March 2026</b>. The
                SAI is incorporated by reference and is legally a part of the ISID. Daily TER and the
                factsheet are not yet applicable — the strategy has not launched.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — dated 25 Mar 2026", href: ISID_URL, pdf: true },
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
                    className="rounded-lg border border-gray-100 p-4 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 group-hover:underline" style={{ textDecorationColor: BRAND_GREEN }}>{d.t}</p>
                        <p className="text-xs text-gray-500 mt-1">{d.d}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                ISID PDF link is a placeholder — the file will be copied to{" "}
                <code className="bg-gray-50 px-1 rounded">/sifs/wsif-equity-long-short/ISID.pdf</code>.
              </p>
            </div>

            {/* Key dates & operational details */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Key dates & operational details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    {[
                      ["ISID date", "25 March 2026"],
                      ["NFO opens", "15 April 2026"],
                      ["NFO closes", "29 April 2026"],
                      ["Strategy re-opens (subscription/redemption)", "11 May 2026"],
                      ["NFO price per unit", "₹10"],
                      ["Face value", "₹10"],
                      ["Min application (NFO)", "₹10,00,000 (accredited: ₹1,00,000)"],
                      ["Min additional purchase", "₹10,000 in multiples of ₹100"],
                      ["Min redemption", "₹1,000 in multiples of Re. 1"],
                      ["SIP / STP / SWP", "Post-NFO · ₹1,000 min · 6 instalments min"],
                      ["Redemption dispatch", "Within 3 working days (T+3)"],
                      ["NAV declaration", "Business days (as applicable)"],
                      ["Plans", "Growth / IDCW — Regular & Direct"],
                      ["Default plan / option", "Direct / Growth"],
                      ["Strategy code", "WSIF/O/E/ELSF/26/01/0001/TWCF"],
                      ["Benchmark", "Nifty 500 TRI"],
                      ["Listing", "Not listed"],
                      ["Segregated portfolio", "Permitted — refer SAI"],
                      ["Stock lending", "Permitted (≤20% net assets; ≤5% per broker)"],
                      ["Overseas securities", "Not invested until dedicated FM appointed"],
                      ["Exit load", "NIL"],
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
              <h3 className="text-base font-bold mb-4" style={{ color: BRAND_GREEN }}>Expense structure (Reg 52)</h3>
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
                      ["Next ₹40,000 Cr", "Reduction of 0.05% per ₹5,000 Cr tranche"],
                      ["Balance of assets", "1.05%"],
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
                Additional expenses up to 0.05% of daily net assets permissible under Reg 52(6A)(c) when
                exit load is levied (not applicable here — exit load is NIL). GST on management &amp;
                advisory fees and brokerage &amp; transaction costs are charged in addition, within
                regulatory limits. Direct Plan has lower TER (no distributor commission). NFO launch
                expenses are borne by the AMC.
              </p>
            </div>

            {/* Load structure */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-3" style={{ color: BRAND_GREEN }}>Load structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <b>Entry load:</b> Nil (per SEBI).<br />
                <b>Exit load:</b> NIL.<br />
                Switches between plans / options within the same strategy are free of load. Switches
                across strategies are treated as redemption plus subscription and loads, if any, would
                apply accordingly.
              </p>
            </div>

            {/* AMC / Trustee info */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold mb-3" style={{ color: BRAND_GREEN }}>AMC &amp; Trustee</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 leading-relaxed">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Asset Management Company</p>
                  <p>Wealth Company Asset Management Holdings Private Limited</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pantomath Nucleus House, Saki Vihar Road, Andheri East, Mumbai 400072
                  </p>
                  <a
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-2"
                    style={{ color: BRAND_GREEN }}
                  >
                    wealthcompanyamc.in/wsif <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Trustee Company</p>
                  <p>Pantomath Trustee Private Limited</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Sponsor: The Wealth Company group entities (refer ISID / SAI for full structure)
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
            <LeadCaptureForm fundSlug="wsif-equity-long-short" fundName="WSIF Equity Long-Short Fund by The Wealth Company" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default WsifEquityLongShort;
