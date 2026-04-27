"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ExternalLink } from "lucide-react";
import AmcLogo from "@/components/AmcLogo";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data for qSIF Sector Rotation Long-Short (Quant MF)         */
/* ------------------------------------------------------------------ */

const AMC_URL = "https://www.qsif.com/";

const TAGS = [
  "Sector Rotation Long-Short",
  "First in Category",
  "Concentrated 4-Sector Equity",
  "Limited Short Overlay",
  "Nifty 500 TRI Benchmark",
  "Risk Band 5",
];

const METRICS = [
  { label: "NFO Price", value: "₹10", sub: "Per unit", color: "" },
  { label: "NFO Opens", value: "27 Apr", sub: "2026", color: "text-green-600" },
  { label: "NFO Closes", value: "11 May", sub: "2026", color: "text-amber-600" },
  { label: "Sectors", value: "4 of 12", sub: "Concentrated", color: "text-purple-700" },
  { label: "Risk Band", value: "Level 5", sub: "Higher Risk", color: "text-amber-600" },
  { label: "Min Investment", value: "₹10L", sub: "₹1L accredited", color: "" },
];

const INFO_BAR = [
  { label: "AMC", value: "Quant Mutual Fund" },
  { label: "Category", value: "Sector Rotation L/S" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "NFO", value: "27 Apr – 11 May 2026" },
  { label: "Min", value: "₹10,00,000" },
  { label: "Exit Load", value: "1% < 15d" },
];

const ALLOCATION_TAGS = [
  "Equity in up to 4 sectors 80–100%",
  "Limited short via derivatives",
  "Debt & money market 0–20%",
  "InvITs 0–20%",
  "Stock lending ≤ 20% (≤ 5% per intermediary)",
  "Cumulative gross ≤ 100% net assets",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Quant Mutual Fund" },
  { label: "Category", value: "Sector Rotation L/S" },
  { label: "Type", value: "Open-ended" },
  { label: "NFO opens", value: "27 Apr 2026" },
  { label: "NFO closes", value: "11 May 2026" },
  { label: "NFO price", value: "₹10 / unit" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "Strategy code", value: "QSIF/O/E/SRLS/25/10/0005/QNTM" },
  { label: "First in category", value: "Yes" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (business days)" },
  { label: "Redemption", value: "Daily (business days)" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Min redemption", value: "₹1,000" },
  { label: "SIP / STP / SWP", value: "₹10,000+ × 6" },
  { label: "Listing", value: "Not listed" },
];

const RISK = [
  { label: "Fund risk band", value: "Level 5", color: "text-amber-600" },
  { label: "Benchmark risk band", value: "Level 5", color: "text-amber-600" },
  { label: "Short selling", value: "Via derivatives" },
  { label: "Lock-in period", value: "None" },
  { label: "Exit load", value: "1% if < 15d; Nil after" },
  { label: "Concentration", value: "Up to 4 sectors" },
];

const QUANT_SIBLINGS = [
  { name: "qSIF Equity L/S", amc: "Quant MF", note: "Live · Diversified equity sibling", href: "/sifs/qsif-equity-long-short" },
  { name: "qSIF Hybrid L/S", amc: "Quant MF", note: "Live · Hybrid sibling", href: "/sifs/qsif-hybrid-long-short" },
  { name: "qSIF Ex-Top 100 L/S", amc: "Quant MF", note: "Mid/small-cap sibling", href: "/sifs/qsif-ex-top-100-long-short" },
  { name: "qSIF Active Asset Allocator", amc: "Quant MF", note: "Allocator sibling", href: "/sifs/qsif-active-asset-allocator-long-short" },
];

const TEAM = [
  { name: "Sandeep Tandon", role: "Founder & CIO — quant Group", creds: "MBA (Finance) · Age 56 · 33+ yrs", initials: "ST" },
  { name: "Jignesh Shah", role: "Fund Manager — Equity", creds: "B.Com + CFA · Age 54 · 30+ yrs", initials: "JS" },
  { name: "Ankit Pande", role: "Fund Manager — Equity", creds: "BE + MBA + CFA L3 · Age 40 · 14+ yrs", initials: "AP" },
  { name: "Sameer Kate", role: "Chief Dealer — Derivatives", creds: "B.Comp Sci + MBA · Age 55 · 20+ yrs", initials: "SK" },
  { name: "Sanjeev Sharma", role: "Fund Manager — Debt", creds: "PGDBA + M.Com + CerTM · Age 49 · 20+ yrs", initials: "SS" },
];

const SUITABLE = [
  "Investors with conviction in sectoral concentration",
  "Long-term horizon (5+ yrs) seeking high-potential sectors",
  "HNIs comfortable with Risk Band 5 · Very High",
  "₹10L+ investable surplus (₹1L for accredited)",
  "Believers in Quant MF's VLRT framework & quant heritage",
];

const NOT_SUITABLE = [
  "Investors needing broad diversification across sectors",
  "Capital-preservation / guaranteed-return seekers",
  "Short horizons under 3 years",
  "Below ₹10L investable surplus (non-accredited)",
  "Risk-averse profiles uncomfortable with concentration",
];

const SECTORS = [
  "Commodities",
  "Financial Services",
  "Information Technology",
  "Diversified",
  "Services",
  "Energy",
  "Healthcare",
  "Industrials",
  "Consumer Discretionary",
  "Fast Moving Consumer Goods",
  "Telecommunication",
  "Utilities",
];

const ASSET_ALLOC = [
  { t: "Equity & equity-related instruments — across maximum 4 sectors", min: "80%", max: "100%" },
  { t: "Debt & money market instruments", min: "0%", max: "20%" },
  { t: "Units issued by InvITs", min: "0%", max: "20%" },
];

const STRATEGY_RISKS = [
  { t: "Sector Concentration Risk", d: "Concentrating 80–100% of equity in just 4 sectors out of 12 magnifies idiosyncratic risk. A sharp downturn in one or more chosen sectors can hit NAV materially harder than a broadly diversified equity fund." },
  { t: "Sector Selection Risk", d: "Performance hinges on the manager's ability to identify the right 4 high-potential sectors and rotate timely. Wrong calls or delayed rotations can erode alpha for extended periods." },
  { t: "Equity Market Risk", d: "An 80–100% equity allocation remains exposed to broad equity market drawdowns and sentiment shifts that can hurt all chosen sectors simultaneously." },
  { t: "Derivatives & Short-Selling Risk", d: "Limited short exposure via derivatives carries leverage risk. Theoretically unlimited loss on naked shorts; option premia can be lost entirely; futures positions require margin discipline." },
  { t: "Strategy Risk — New Category", d: "Sector Rotation Long-Short is a brand-new SIF category — qSIF Sector Rotation is the first product launched in this category in India. No category-level track record exists." },
  { t: "Liquidity Risk", d: "Concentrated single-sector positions can face liquidity stress during sharp drawdowns. Up to 20% stock lending exposure adds counterparty and recall risk." },
  { t: "Model & Execution Risk", d: "Quant MF's VLRT-style framework relies on model stability, factor regimes and execution. Sector rotation cadence depends on signal latency and trading discipline." },
  { t: "Interest-Rate & Credit Risk", d: "Up to 20% in debt / money market. Securitised debt and AT1 / Tier-2 exposures are capped within debt sleeve; segregated portfolio permitted in case of credit events." },
  { t: "Regulatory & Tax Risk", d: "SIFs operate under SEBI's framework circular dated 27 February 2025. Tax treatment is evolving; investors should consult tax advisors." },
  { t: "Manager Concentration Risk", d: "Five managers from the same AMC and franchise — common-style risk if the Quant MF house view underperforms across regimes." },
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

const QsifSectorRotationLongShort = () => {
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
            <nav className="text-xs text-gray-400 mb-4">
              <a href="/" className="hover:text-gray-600">SIF Universe</a>
              <span className="mx-1.5">›</span>
              <a href="/sif-funds-launched" className="hover:text-gray-600">Sector Rotation L/S</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">qSIF Sector Rotation</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <AmcLogo amc="Quant Mutual Fund" size="md" />
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      <span className="text-sm text-gray-500">Quant Mutual Fund</span>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-purple-600 text-white font-bold px-2 py-0.5 rounded text-[11px] animate-pulse">
                      NFO OPEN
                    </span>
                    <span className="inline-flex items-center gap-1 bg-amber-500 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                      FIRST IN CATEGORY
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    qSIF Sector Rotation Long-Short Fund
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
                <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
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

              {/* ====== MAIN COLUMN ====== */}
              <div className="flex-1 min-w-0 space-y-6">

                {/* A) NFO STATUS CARD */}
                <div className="rounded-xl border-2 border-purple-200 bg-purple-50/60 overflow-hidden">
                  <div className="px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 bg-purple-600 text-white">
                    <span className="font-bold text-sm flex items-center gap-2">
                      ⚡ NFO Open — Subscribe before 11 May 2026
                    </span>
                    <span className="bg-white/20 text-xs font-bold px-3 py-1 rounded-full">
                      First in Category
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
                      Quant Mutual Fund&apos;s fifth SIF strategy and India&apos;s <b>first Sector Rotation
                      Long-Short Fund</b> — a brand-new SIF category. The strategy concentrates 80–100% of
                      equity in <b>up to four high-potential sectors</b> (chosen from 12 candidates) with
                      limited short overlay via derivatives. Accredited investors qualify at a reduced
                      <b> ₹1,00,000</b> minimum.
                    </p>
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="font-bold bg-purple-600 hover:bg-purple-700 text-white">
                        Invest on qsif.com <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                  </div>
                </div>

                {/* B) FIRST-IN-CATEGORY CALLOUT */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2">
                    A new SIF category — Sector Rotation Long-Short
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Existing Indian SIFs to date have been diversified equity, hybrid or multi-asset
                    long-short structures. <b>qSIF Sector Rotation</b> introduces sector concentration as
                    its core thesis: pick the 4 highest-potential sectors from a 12-sector universe, take
                    long positions, and use derivatives to hedge sector-specific downside or express
                    bearish sector views. There are no direct peers in this category — every other SIF in
                    the market is broadly diversified or cap-based.
                  </p>
                </div>

                {/* C) INVESTMENT OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    To achieve <b>long-term capital appreciation</b> by concentrating investments in
                    equity and equity-related instruments of <b>up to four high-potential sectors</b>,
                    while employing <b>limited short exposure through derivatives</b> to capitalize on
                    sector-specific downturns and enhance risk-adjusted returns.
                  </p>
                </div>

                {/* D) STRATEGY SUMMARY + ALLOCATION */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-4">Strategy & allocation</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ALLOCATION_TAGS.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full bg-purple-50 text-xs font-medium text-purple-700 border border-purple-100">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    qSIF Sector Rotation is a <b>concentrated sector-rotation strategy</b>: the manager
                    selects up to <b>4 sectors out of a 12-sector universe</b> spanning Commodities,
                    Financial Services, IT, Diversified, Services, Energy, Healthcare, Industrials,
                    Consumer Discretionary, FMCG, Telecommunication and Utilities. The 80–100% equity
                    allocation sits inside those 4 sectors at any time.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A <b>limited short overlay via derivatives</b> targets sector-specific downturns to
                    enhance risk-adjusted returns. Cumulative gross exposure (longs + shorts + debt +
                    derivatives) is capped at <b>100% of net assets</b> per SEBI&apos;s SIF framework
                    (27 February 2025).
                  </p>
                </div>

                {/* E) 12-SECTOR UNIVERSE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-2">The 12-sector universe — pick 4</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    The fund manager rotates between any <b>4 of these 12 candidate sectors</b> at a
                    time, based on Quant MF&apos;s VLRT framework (Valuation, Liquidity, Risk, Time).
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SECTORS.map((s, i) => (
                      <div key={s} className="rounded-lg border border-purple-100 bg-purple-50/40 p-3 text-center">
                        <p className="text-[10px] text-purple-500 font-mono tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                        <p className="text-xs font-semibold text-purple-800 mt-0.5">{s}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* F) INVESTOR SUITABILITY */}
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

                {/* G) FUND MANAGEMENT TEAM MINI-GRID */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-1">Fund management team</h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Five-manager team — the largest in any SIF — spanning equity, derivatives and debt.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TEAM.map((m) => (
                      <div key={m.name} className="rounded-lg border border-gray-100 p-4 text-center">
                        <div className="w-11 h-11 rounded-full bg-purple-100 text-purple-700 font-bold text-sm flex items-center justify-center mx-auto mb-2">
                          {m.initials}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.role}</p>
                        <p className="text-[11px] text-gray-400 mt-1">{m.creds}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("Fund Managers")} className="mt-4 text-xs font-semibold text-purple-700 hover:text-purple-800">
                    View full bios →
                  </button>
                </div>
              </div>

              {/* ====== SIDEBAR ====== */}
              <div className="w-full lg:w-[340px] shrink-0 space-y-5 lg:sticky lg:top-32">
                {/* S1) CTA */}
                <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Subscribe to qSIF Sector Rotation</h3>
                  <p className="text-sm text-gray-500 mb-4">Speak with our SIF specialist, or invest directly with the AMC.</p>
                  <div className="flex flex-col gap-2">
                    <a href={AMC_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="w-full font-bold bg-purple-600 hover:bg-purple-700 text-white text-sm">
                        Invest via qsif.com <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </a>
                    <div className="flex gap-2">
                      <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm">
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
                  {FUND_DETAILS.map((d) => <DetailRow key={d.label} label={d.label} value={d.value} />)}
                </SidebarCard>

                <SidebarCard title="Redemption & Liquidity">
                  {REDEMPTION.map((d) => <DetailRow key={d.label} label={d.label} value={d.value} />)}
                </SidebarCard>

                <SidebarCard title="Risk & compliance">
                  {RISK.map((d) => <DetailRow key={d.label} label={d.label} value={d.value} color={d.color} />)}
                </SidebarCard>

                <SidebarCard title="Quant SIF siblings">
                  <div className="space-y-2">
                    {QUANT_SIBLINGS.map((p) => (
                      <a
                        key={p.name}
                        href={p.href}
                        className="block rounded-lg border border-gray-100 p-3 hover:border-purple-200 hover:bg-purple-50/30 transition-colors"
                      >
                        <p className="text-xs text-gray-400">{p.amc}</p>
                        <p className="text-sm font-semibold text-gray-900 mt-0.5">{p.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{p.note}</p>
                      </a>
                    ))}
                  </div>
                </SidebarCard>

                <SidebarCard title="Direct peers">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    No direct peers exist in the Sector Rotation Long-Short SIF category — qSIF Sector
                    Rotation is the <b>first product</b> launched in this category in India. Other Indian
                    SIFs are diversified equity, hybrid or multi-asset long-short structures.
                  </p>
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
              <h3 className="text-base font-bold text-gray-900 mb-3">Sector-rotation methodology</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                qSIF Sector Rotation is a <b>concentrated long-biased equity strategy</b>: the manager
                identifies up to <b>4 high-potential sectors</b> from a fixed 12-sector universe and
                deploys 80–100% of net assets across long equity positions in those sectors. A <b>limited
                short overlay</b> through equity derivatives is used to express sector-specific bearish
                views or hedge downside.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-purple-100 bg-purple-50 p-4">
                  <p className="text-sm font-bold text-purple-700 mb-2">Long sleeve (core 80–100%)</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Concentrated across up to 4 high-potential sectors, identified using Quant MF&apos;s
                    VLRT framework (Valuation, Liquidity, Risk, Time). Names selected bottom-up within
                    chosen sectors.
                  </p>
                </div>
                <div className="rounded-lg border border-rose-100 bg-rose-50 p-4">
                  <p className="text-sm font-bold text-rose-700 mb-2">Short sleeve (limited)</p>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Equity derivatives used to short specific names or indices for sector-level hedging
                    and tactical alpha. Cumulative gross exposure cap of 100% of net assets per SEBI SIF
                    framework.
                  </p>
                </div>
              </div>
            </div>

            {/* 12 sectors panel */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-2">Candidate sectors (12)</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                The strategy can rotate across any <b>4 sectors</b> from this 12-sector universe at a
                time. Selection is dynamic and reflects the manager&apos;s evolving view on relative
                attractiveness and momentum.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {SECTORS.map((s, i) => (
                  <div key={s} className="rounded-lg border border-gray-100 p-3 text-center hover:border-purple-200 hover:bg-purple-50/30 transition-colors">
                    <p className="text-[10px] text-gray-400 font-mono tabular-nums">SECTOR {String(i + 1).padStart(2, "0")}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exposure ranges */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Exposure ranges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-purple-50 p-4 text-center">
                  <p className="text-xs text-purple-700 mb-1">Equity (4 sectors)</p>
                  <p className="text-lg font-bold text-purple-700 font-mono tabular-nums">80–100%</p>
                  <p className="text-[10px] text-gray-400 mt-1">Max 4 sectors</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1">Short overlay</p>
                  <p className="text-lg font-bold text-rose-700 font-mono tabular-nums">Limited</p>
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
                  <p className="text-[10px] text-gray-400 mt-1">Single-issuer caps</p>
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
                Source: qSIF Sector Rotation ISID — Section II.A. Cumulative gross exposure capped at
                100% of net assets per SEBI Master Circular and SIF framework circular dated 27 Feb 2025.
              </p>
            </div>

            {/* Instrument-level limits */}
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
                      ["Maximum sectors held simultaneously", "4 (out of 12 candidate sectors)"],
                      ["Stock lending & short selling", "≤ 20% of net assets (≤ 5% per single intermediary)"],
                      ["Short exposure via derivatives", "Limited — sector-specific downside"],
                      ["Debt & money market instruments", "Up to 20% of net assets"],
                      ["InvITs", "Up to 20% of net assets (single-issuer caps apply)"],
                      ["Cumulative gross exposure", "≤ 100% of net assets"],
                      ["Overseas securities", "Not invested until dedicated overseas FM appointed"],
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

            {/* Sector rotation cadence */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Rotation cadence</h3>
              <ul className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <li>• <b>Sector selection:</b> identify 4 sectors with the strongest forward potential using Quant MF&apos;s VLRT framework</li>
                <li>• <b>Stock selection within sectors:</b> bottom-up using fundamental + quant signals, leveraging the same playbook applied across qSIF Equity, qSIF Hybrid and qSIF Ex-Top 100</li>
                <li>• <b>Short overlay deployment:</b> when a held sector or single name shows deteriorating signals, derivatives are used to hedge or take the bearish side</li>
                <li>• <b>Rotation timing:</b> dynamic — there is no fixed rebalance frequency; positions rotate when signals warrant</li>
                <li>• <b>Cap discipline:</b> cumulative gross exposure stays within 100% of net assets at all times</li>
              </ul>
            </div>

            {/* Benchmark */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Benchmark</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Performance is benchmarked to the <b>Nifty 500 Total Return Index (TRI)</b>. Although the
                strategy is sector-concentrated, the broad-market benchmark is used to compare against the
                full investable equity universe — alpha is measured as outperformance from sector
                concentration and rotation skill.
              </p>
              <p className="text-[11px] text-gray-400">
                The AMC / Trustees reserve the right to change the benchmark in future as per SEBI
                guidelines.
              </p>
            </div>

            {/* Comparative angle vs other Quant SIFs */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">How this differs from other Quant SIFs</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Strategy</th>
                      <th className="py-3 px-4">Concentration</th>
                      <th className="py-3 pl-4">Universe</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4 font-semibold text-purple-700">qSIF Sector Rotation</td>
                      <td className="py-3 px-4">Up to 4 sectors</td>
                      <td className="py-3 pl-4">Sector-concentrated equity</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4">qSIF Equity L/S</td>
                      <td className="py-3 px-4">Diversified multi-cap</td>
                      <td className="py-3 pl-4">Broad equity universe</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4">qSIF Hybrid L/S</td>
                      <td className="py-3 px-4">Diversified hybrid</td>
                      <td className="py-3 pl-4">Equity + debt</td>
                    </tr>
                    <tr className="border-b border-gray-50">
                      <td className="py-3 pr-4">qSIF Ex-Top 100 L/S</td>
                      <td className="py-3 px-4">Diversified mid/small</td>
                      <td className="py-3 pl-4">Excludes top 100 stocks</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">qSIF Active Asset Allocator</td>
                      <td className="py-3 px-4">Multi-asset</td>
                      <td className="py-3 pl-4">Cross-asset rotation</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                qSIF Sector Rotation is the <b>most concentrated equity SIF in the universe</b> — every
                other equity-oriented SIF in India today is diversified across the broader market or
                cap-segmented.
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
              <h3 className="text-base font-bold text-gray-900 mb-3">Five-manager management structure</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                qSIF Sector Rotation is managed by a <b>five-member team — the largest in any Indian
                SIF</b> — spanning equity research, derivatives execution and debt. The same team manages
                qSIF Equity L/S, qSIF Ex-Top 100 L/S, qSIF Hybrid L/S and qSIF Active Asset Allocator.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-purple-50 p-3">
                  <p className="text-xs text-purple-700 font-semibold">EQUITY</p>
                  <p className="text-xs text-gray-600 mt-1">Tandon · Shah · Pande</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-3">
                  <p className="text-xs text-rose-700 font-semibold">DERIVATIVES</p>
                  <p className="text-xs text-gray-600 mt-1">Kate</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-700 font-semibold">DEBT</p>
                  <p className="text-xs text-gray-600 mt-1">Sharma</p>
                </div>
              </div>
            </div>

            {/* Manager 1 — Sandeep Tandon */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  ST
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Sandeep Tandon</h3>
                  <p className="text-sm text-gray-500 mb-3">Founder & Chief Investment Officer — quant Group</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">MBA (Finance)</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">Age 56</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">33+ yrs experience</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Started money management in 1992–93 at <b>GIC Mutual Fund</b> (JV with Soros). Founding
                    member of <b>IDBI AMC</b> (now Principal AMC). Earlier at <b>ICICI Securities</b>
                    (JV with J P Morgan), <b>Kotak Securities</b> (JV with Goldman Sachs) and <b>REFCO</b>.
                    As CEO of <b>Quant Broking</b> from 2008–2018, ran a proprietary derivatives desk
                    averaging <b>&gt;$1 billion in daily turnover with no reported yearly or quarterly
                    losses for 10 years</b> — across equity arbitrage, vol arb, pair trading, sectoral &
                    event-driven long-short and spreads.
                  </p>
                </div>
              </div>
            </div>

            {/* Manager 2 — Jignesh Shah */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  JS
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Jignesh Shah</h3>
                  <p className="text-sm text-gray-500 mb-3">Fund Manager — Equity</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">B.Com (Sydenham)</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">CFA (ICFAI)</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">Age 54</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">30+ yrs experience</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Over 30 years across the securities markets since 1993. Previously with <b>Nippon Life
                    AMC</b> as Investment Analyst covering global commodities, <b>ICICI Prudential
                    AMC</b> and <b>Aditya Birla Sun Life AMC</b> in senior portfolio-management roles.
                    Brings deep cross-cycle equity research experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Manager 3 — Ankit Pande */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-purple-100 text-purple-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  AP
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Ankit Pande</h3>
                  <p className="text-sm text-gray-500 mb-3">Fund Manager — Equity</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">BE Electronics (Pune)</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">MBA (CUHK)</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">CFA L3</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">Age 40</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-medium text-purple-700">14+ yrs experience</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Over 14 years in equity research since 2011. Won the <b>Thomson Reuters StarMine
                    award for IT-sector best stock picker (2014)</b>; lifetime member of Beta Gamma Sigma.
                    Previously developed fundamental long-short investment ideas under Sandeep Tandon at
                    <b> Quant Broking</b>, including covered calls and protective puts. Manager on
                    multiple quant Mutual Fund schemes with strong risk-adjusted track record.
                  </p>
                </div>
              </div>
            </div>

            {/* Manager 4 — Sameer Kate */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  SK
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Sameer Kate</h3>
                  <p className="text-sm text-gray-500 mb-3">Chief Dealer — Derivatives & Fund Manager</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-medium text-rose-700">B.Comp Sci (Pune)</span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-medium text-rose-700">MBA (IME Pune)</span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-medium text-rose-700">Age 55</span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-medium text-rose-700">20+ yrs experience</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Over 20 years in equities and derivatives. Currently Chief Dealer at quant. Started
                    his career at <b>REFCO</b>; spent <b>16 years at Kotak Securities</b> (Institutional
                    Equities — JV with Goldman Sachs) as Senior Derivatives Sales Trader and advisor to
                    Kotak proprietary desk. Later Senior Sales Trader at <b>Investec Capital</b>.
                    Renowned for synthetic-derivative strategies — directly relevant to the limited short
                    overlay.
                  </p>
                </div>
              </div>
            </div>

            {/* Manager 5 — Sanjeev Sharma */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-700 font-bold text-2xl flex items-center justify-center shrink-0">
                  SS
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Sanjeev Sharma</h3>
                  <p className="text-sm text-gray-500 mb-3">Fund Manager — Debt & Treasury</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">PGDBA (Finance)</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">M.Com</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">CerTM (Treasury & Forex Risk)</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">Age 49</span>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-medium text-blue-700">20+ yrs experience</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Over two decades in equity, debt, fund management and treasury operations. Manages
                    the fixed-income & money-market sleeve for qSIF Sector Rotation and deploys allied
                    strategies across equity, debt and derivatives.
                  </p>
                </div>
              </div>
            </div>

            {/* Institutional context */}
            <div className="rounded-xl border border-purple-100 bg-purple-50/40 p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">Institutional context</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                qsif is the Specialized Investment Fund offering of <b>quant Mutual Fund</b>, managed by
                <b> quant Money Managers Limited</b> with <b>quant Capital Trustee Limited</b> as
                trustee. Registered office: 6th Floor, Sea Breeze Building, Appasaheb Marathe Marg,
                Prabhadevi, Mumbai – 400 025.
              </p>
              <p className="text-[11px] text-gray-400">
                The same five-manager team also manages qSIF Equity L/S, qSIF Hybrid L/S, qSIF Ex-Top 100
                L/S and qSIF Active Asset Allocator. Tenure on qSIF Sector Rotation: NA (this is a new
                strategy in a new SIF category).
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
            <div className="rounded-xl border-2 border-purple-200 bg-purple-50/60 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-base font-bold text-gray-900">Risk band</h3>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600 text-white">
                  Level 5 (AMFI)
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk band is <b>Level 5</b> for both the Investment Strategy and the benchmark
                (<b>Nifty 500 TRI</b>). Concentration in only 4 sectors out of 12 amplifies idiosyncratic
                sector risk relative to a diversified equity SIF — investors should be comfortable with
                potential capital loss, sharper drawdowns, and longer recovery periods if the chosen
                sectors underperform. Suitable only for informed HNI / institutional investors with ≥
                ₹10L investable surplus (or ₹1L for accredited investors).
              </p>
            </div>

            {/* Strategy risks grid */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Sector Rotation strategy risks</h3>
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
              <h3 className="text-base font-bold text-gray-900 mb-4">Risk mitigation framework</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold mb-1 text-purple-700">Structural caps</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    SEBI SIF-mandated cumulative gross-exposure cap (100% of NAV); maximum 4 sectors;
                    InvIT cap (20%); debt cap (20%); stock-lending cap (20% with 5% single-intermediary
                    limit). No CDS. No overseas derivatives.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-purple-700">Sector discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Sector rotation is signal-driven via Quant MF&apos;s VLRT framework. Position sizing
                    within each chosen sector aligned to liquidity profile. Single-stock concentration
                    governed by SEBI single-issuer caps.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-purple-700">Derivatives discipline</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Limited short via derivatives — sized within cumulative gross exposure cap.
                    Sameer Kate&apos;s 20+ years of synthetic derivatives experience anchors execution.
                    Internal stop-loss limits for outright shorts.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-purple-700">Liquidity management tools</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Per SEBI&apos;s SIF framework, the AMC may employ swing pricing, anti-dilution
                    levies, in-specie redemption or notice periods (up to 15 days) under stress
                    conditions. Refer ISID Section II.C.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-purple-700">Debt sleeve & settlement</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Debt / money market allocation capped at 20%. DVP settlement and rated counterparties
                    for OTC exposures. Segregated portfolio is permitted in the event of a credit event
                    in the debt sleeve.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold mb-1 text-purple-700">Oversight</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent quant Capital Trustee Ltd, AMC Investment Committee oversight, SEBI
                    periodic disclosures, daily NAV computation, and AMFI reporting. KFin Technologies
                    as RTA.
                  </p>
                </div>
              </div>
            </div>

            {/* Investor checklist */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Investor checklist before subscribing</h3>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
                <li>• Understand sector concentration vs broad-market diversification</li>
                <li>• Confirm ≥ ₹10L investable surplus (or ₹1L if accredited)</li>
                <li>• Ensure 5+ year horizon — sector rotation cycles can be lengthy</li>
                <li>• Read the ISID, SAI and KIM in full before applying</li>
                <li>• Note exit load: 1% if redeemed within 15 days from allotment</li>
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
                All documents are hosted on <b>qsif.com</b>. The strategy is in NFO stage; daily TER and
                factsheet become applicable post-launch.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, risk factors" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form" },
                  { t: "Scheme factsheet (post-launch)", d: "Available after allotment — qsif.com" },
                  { t: "Portfolio holdings disclosure", d: "Top 10 holdings & sector allocation (post-launch)" },
                  { t: "Statutory disclosures", d: "qsif.com/statutory-disclosures" },
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

            {/* Key dates & operational details */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Key dates & operational details</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="text-gray-700">
                    {[
                      ["NFO opens", "27 April 2026"],
                      ["NFO closes", "11 May 2026"],
                      ["NFO price per unit", "₹10"],
                      ["Face value", "₹10"],
                      ["Min application (NFO)", "₹10,00,000 (accredited: ₹1,00,000)"],
                      ["Min additional purchase", "₹10,000"],
                      ["Min redemption", "₹1,000"],
                      ["SIP / SWP / STP", "₹10,000+ × min 6 instalments (post-NFO)"],
                      ["Subscription frequency", "Daily (all business days)"],
                      ["Redemption frequency", "Daily (all business days)"],
                      ["Settlement", "T+3 working days"],
                      ["NAV declaration", "All business days"],
                      ["Plans", "Growth / IDCW — Regular & Direct"],
                      ["Default plan / option", "Direct / Growth"],
                      ["Strategy code", "QSIF/O/E/SRLS/25/10/0005/QNTM"],
                      ["Benchmark", "Nifty 500 Total Return Index (TRI)"],
                      ["Listing", "Not listed (open-ended)"],
                      ["Stock lending", "Permitted (≤ 20% net assets; ≤ 5% per intermediary)"],
                      ["Risk Band (fund / benchmark)", "Level 5 / Level 5"],
                      ["Exit load", "1% if redeemed/switched out within 15 days; Nil after"],
                    ].map(([k, v]) => (
                      <tr key={k} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-2.5 pr-4 text-gray-500 text-sm">{k}</td>
                        <td className="py-2.5 text-sm font-semibold font-mono tabular-nums">{v}</td>
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
                1. Redemption / Switch-out within <b>15 days</b> from the date of allotment: <b>1.00%</b><br />
                2. Redemption / Switch-out after expiry of 15 days: <b>Nil</b>
              </p>
            </div>

            {/* AMC / Trustee info */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">AMC &amp; Trustee</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 leading-relaxed">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Asset Management Company</p>
                  <p>quant Money Managers Limited</p>
                  <p className="text-xs text-gray-500 mt-1">
                    6th Floor, Sea Breeze Building, Appasaheb Marathe Marg, Prabhadevi, Mumbai – 400 025
                  </p>
                  <a
                    href={AMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold mt-2 text-purple-700"
                  >
                    qsif.com <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Trustee Company</p>
                  <p>quant Capital Trustee Limited</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mutual Fund: quant Mutual Fund. Refer SAI for full sponsor / trustee structure.
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
              fundSlug="qsif-sector-rotation-long-short"
              fundName="qSIF Sector Rotation Long-Short Fund by Quant Mutual Fund"
              source="fund-page"
            />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default QsifSectorRotationLongShort;
