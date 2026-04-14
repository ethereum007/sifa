"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import AmcLogo from "@/components/AmcLogo";
import CrashAnalysis from "@/components/CrashAnalysis";
import NavJourneyChart from "@/components/NavJourneyChart";
import { getSifBySlug, getPeers, fmtPct } from "@/lib/sifData";

// Map sifData slug -> live page URL (handles non-/sifs/{slug} paths)
const PEER_HREF: Record<string, string> = {
  "altiva-hybrid-long-short": "/sifs/altiva-hybrid-long-short",
  "magnum-hybrid-long-short": "/sifs/magnum-hybrid-long-short",
  "qsif-hybrid-long-short": "/sifs/qsif-hybrid-long-short",
  "titanium-hybrid-long-short": "/sifs/titanium-hybrid-long-short",
  "arudha-hybrid-long-short": "/sifs/arudha-hybrid-long-short",
  "isif-hybrid-long-short": "/sifs/isif/hybrid",
  "apex-hybrid-long-short": "/apex-hybrid-long-short",
};

const FUND = getSifBySlug("altiva-hybrid-long-short")!;
const PEER_FUNDS = getPeers("altiva-hybrid-long-short");

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

/* ------------------------------------------------------------------ */
/*  Static data for Altiva                                             */
/* ------------------------------------------------------------------ */

const TAGS = ["Hybrid Long-Short", "Arbitrage", "Special Situations", "Low Volatility", "Interval Strategy", "Low Risk"];

const siColor = FUND.returns.sinceInception >= 0 ? "text-green-600" : "text-red-600";
const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Apr 8, 2026", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "6M Return", value: "+0.91%", sub: "", color: "text-green-600" },
];

const INFO_BAR = [
  { label: "AUM", value: "₹2,784 Cr" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Start Date", value: "24 Oct 2025" },
  { label: "Subscription", value: "Twice-weekly" },
  { label: "SIP", value: "No" },
  { label: "Exit Load", value: "0.50% <90d" },
];

const TRAILING = [
  { period: "1D", value: "+0.04%" },
  { period: "1W", value: "+0.93%" },
  { period: "1M", value: "+1.23%" },
  { period: "3M", value: "+0.91%" },
  { period: "6M", value: "+0.91%" },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "FYTD", value: "+2.86%" },
];

const ALLOCATION_TAGS = [
  "Equity long 25–75%", "Debt 25–75%", "Short derivatives 0–25%", "Overseas 0–30%", "REITs/InvITs 0–20%"
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Edelweiss AMC" },
  { label: "Category", value: "Hybrid Long-Short" },
  { label: "Inception date", value: "24 Oct 2025" },
  { label: "AUM", value: "₹2,784 Cr" },
  { label: "Benchmark", value: "Nifty 50 Hybrid 50:50" },
  { label: "TER (Regular)", value: "1.67%" },
  { label: "Max TER", value: "2.00%" },
  { label: "Exit load", value: "0.50% <90d" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily" },
  { label: "Redemption", value: "Mon & Wed" },
  { label: "Settlement", value: "T+3 days" },
  { label: "SIP allowed", value: "No" },
  { label: "Min additional", value: "₹1,000" },
];

const RISK = [
  { label: "Risk level", value: "Moderate", color: "text-amber-600" },
  { label: "Short selling", value: "Allowed" },
  { label: "Lock-in period", value: "None" },
  { label: "Portfolio disclosure", value: "Not monthly" },
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
  { name: "Bhavesh Jain", initials: "BJ" },
  { name: "Bharat Lahoti", initials: "BL" },
  { name: "Dhawal Dalal", initials: "DD" },
  { name: "Pranavi Kulkarni", initials: "PK" },
  { name: "Amit Vora", initials: "AV" },
];

const SUITABLE = [
  "HNIs seeking multi-strategy diversification",
  "Hybrid equity-debt comfort",
  "Global exposure seekers",
  "3+ year investment horizon",
];
const NOT_SUITABLE = [
  "Guaranteed return seekers",
  "Requiring daily liquidity",
  "Below ₹10L investable surplus",
  "Short-term traders",
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

const TABS = ["Snapshot", "Portfolio", "Fund Managers", "Risk & Scores", "Documents"] as const;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const AltivaSif = () => {
  const fundData = getSifBySlug("altiva-hybrid-long-short");
  const [activeTab, setActiveTab] = useState<string>("Snapshot");
  const [returnMode, setReturnMode] = useState<"absolute" | "annualised">("absolute");

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
              <a href="/sif-funds-launched" className="hover:text-gray-600">Hybrid Long-Short</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">Altiva</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div>
                {/* AMC */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-500">Edelweiss Mutual Fund</span>
                </div>
                {/* Fund name */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Altiva Hybrid Long-Short Fund
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
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Start Investing <ArrowRight className="w-3.5 h-3.5 ml-1" />
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
        {/* CONTENT: 2-COLUMN LAYOUT                                     */}
        {/* ============================================================ */}
        {activeTab === "Snapshot" && (
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start">

              {/* ====== MAIN COLUMN ====== */}
              <div className="flex-1 min-w-0 space-y-6">

                {/* A) NAV CHART */}
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
                  <p className="text-[11px] text-gray-400 mt-3">193 data points · Source: AMFI NAV API</p>
                </div>

                {/* B) TRAILING RETURNS */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-base font-bold text-gray-900">Trailing returns</h3>
                    <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                      {(["absolute", "annualised"] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setReturnMode(mode)}
                          className={`px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                            returnMode === mode
                              ? "bg-blue-600 text-white"
                              : "text-gray-500 hover:text-gray-700"
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
                        <p className="text-base font-bold text-green-600">{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TRAILING.slice(4).map((t) => (
                      <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                        <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                        <p className="text-base font-bold text-green-600">{t.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Date calculator */}
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-end gap-3">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">From</label>
                        <input type="date" defaultValue="2024-10-24" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">To</label>
                        <input type="date" defaultValue="2026-04-08" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700" />
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white col-span-2 sm:col-span-1">Calculate</Button>
                    </div>
                  </div>
                </div>

                {/* C) ALPHA SHIELD */}
                <div className="rounded-xl border-2 border-green-200 bg-green-50/30 overflow-hidden">
                  {/* Header */}
                  <div className="bg-green-600 px-5 py-3.5 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-white font-bold text-sm flex items-center gap-2">
                      <span className="text-base">🛡</span> Alpha Shield — March 2026 Crash Analysis
                    </span>
                    <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                      8.7 / 10 · Strong Protection
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    {/* 3-stat row */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Benchmark fell</p>
                        <p className="text-base sm:text-xl font-bold text-red-600">-6.35%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Altiva performance</p>
                        <p className="text-base sm:text-xl font-bold text-green-600">-1.42%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Capital preserved</p>
                        <p className="text-base sm:text-xl font-bold text-blue-600">77.6%</p>
                      </div>
                    </div>

                    {/* Peer ranking */}
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                      Hybrid Long-Short Peer Ranking — March 2026
                    </p>
                    <div className="space-y-2">
                      {[
                        { rank: "🥇", name: "Arudha Hybrid", ret: "+0.1%", color: "text-green-600", w: "100%" },
                        { rank: "🥈", name: "qSIF Hybrid", ret: "-0.9%", color: "text-red-600", w: "85%" },
                        { rank: "🥉", name: "Altiva", ret: "-1.4%", color: "text-blue-600", w: "75%", you: true },
                        { rank: "4", name: "Magnum SIF", ret: "-1.9%", color: "text-red-600", w: "60%" },
                        { rank: "5", name: "Titanium SIF", ret: "-6.2%", color: "text-red-600", w: "25%" },
                        { rank: "6", name: "iSIF Hybrid", ret: "-6.3%", color: "text-red-600", w: "22%" },
                      ].map((p) => (
                        <div key={p.name} className={`flex items-center gap-3 text-sm ${p.you ? "bg-blue-50 rounded-lg p-2 -mx-2" : ""}`}>
                          <span className="w-6 text-center">{p.rank}</span>
                          <span className={`flex-1 font-medium ${p.you ? "text-blue-700" : "text-gray-700"}`}>
                            {p.name} {p.you && <span className="text-xs text-blue-500">← you</span>}
                          </span>
                          <div className="hidden sm:block w-32 bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full" style={{ width: p.w }} />
                          </div>
                          <span className={`w-12 sm:w-14 text-right font-bold text-xs sm:text-sm ${p.color}`}>{p.ret}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* D) STRATEGY SUMMARY */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy summary</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-blue-50 text-xs font-medium text-blue-700 border border-blue-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    India&apos;s largest SIF scheme by AUM. Combines equity arbitrage, high-quality fixed income,
                    and special situation plays (IPOs, buybacks, open offers, pair trades, covered calls, and straddles).
                    The interval/arbitrage-heavy structure keeps risk low while targeting superior post-tax returns
                    versus fixed deposits. Managed by Edelweiss CEO Radhika Gupta&apos;s team.
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
                  <h3 className="text-base font-bold text-gray-900 mb-4">Fund management team</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-400">Fund Manager</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ====== SIDEBAR ====== */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">

                {/* S1) CTA */}
                <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Altiva</h3>
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
                <SidebarCard title="Other funds in category">
                  <div className="grid grid-cols-2 gap-2">
                    {PEERS.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        className="rounded-lg border border-gray-100 p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                      >
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

        {/* Placeholder for other tabs */}
        {activeTab !== "Snapshot" && (
          <div className="max-w-6xl mx-auto px-4 py-16 text-center">
            <p className="text-gray-400 text-lg">
              {activeTab} tab — coming soon
            </p>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default AltivaSif;
