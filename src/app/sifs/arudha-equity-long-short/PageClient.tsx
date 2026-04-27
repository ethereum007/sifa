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

// Map sifData slug -> live page URL (prioritise Equity L/S peers)
const PEER_HREF: Record<string, string> = {
  "qsif-equity-long-short": "/sifs/qsif-equity-long-short",
  "diviniti-equity-long-short": "/sifs/diviniti-equity-long-short",
  "dyna-equity-long-short": "/sifs/dyna-equity-long-short",
  "sapphire-equity-long-short": "/sifs/sapphire-equity-long-short",
  "arudha-hybrid-long-short": "/sifs/arudha-hybrid-long-short",
  "altiva-hybrid-long-short": "/sifs/altiva-hybrid-long-short",
  "apex-hybrid-long-short": "/sifs/apex-hybrid-long-short",
};

const FUND = getSifBySlug("arudha-equity-long-short")!;
const PEER_FUNDS = getPeers("arudha-equity-long-short");

const AMC_URL = "https://bandhanmutual.com/";
const SIF_URL = "https://www.arudhasif.com/";

const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"));
const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import LeadCaptureForm from "@/components/LeadCaptureForm";

/* ------------------------------------------------------------------ */
/*  Static data for Arudha Equity                                      */
/* ------------------------------------------------------------------ */

const TAGS = [
  "Equity Long-Short",
  "Open-Ended",
  "Nifty 500 Benchmark",
  "Derivative Overlay",
  "Up to 25% Unhedged Short",
  "Risk Band 5 · High",
];

const siColor = (FUND.returns.sinceInception ?? 0) >= 0 ? "text-green-600" : "text-red-600";
const METRICS = [
  { label: "Latest NAV", value: `₹${FUND.currentNav.toFixed(4)}`, sub: "Apr 8, 2026", color: "" },
  { label: "1M Return", value: fmtPct(FUND.returns.oneMonth), sub: "", color: (FUND.returns.oneMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "3M Return", value: fmtPct(FUND.returns.threeMonth), sub: "", color: (FUND.returns.threeMonth ?? 0) >= 0 ? "text-green-600" : "text-red-600" },
  { label: "Since Inception", value: fmtPct(FUND.returns.sinceInception), sub: "", color: siColor },
  { label: "TER", value: `${FUND.terRegular.toFixed(2)}%`, sub: "Regular plan", color: "" },
  { label: "Min Invest", value: "₹10L", sub: "₹1L accredited", color: "" },
];

const INFO_BAR = [
  { label: "AUM", value: "NFO-era" },
  { label: "Min Investment", value: "₹10L" },
  { label: "Inception", value: "30 Mar 2026" },
  { label: "Redemption", value: "Daily" },
  { label: "SIP", value: "₹10,000+" },
  { label: "Exit Load", value: "0.50% ≤30d" },
];

const TRAILING = [
  { period: "1M", value: fmtPct(FUND.returns.oneMonth) },
  { period: "3M", value: fmtPct(FUND.returns.threeMonth) },
  { period: "Since Inception", value: fmtPct(FUND.returns.sinceInception) },
  { period: "Mar 2026", value: "+0.00%" },
  { period: "Apr 2026", value: "—" },
];

const ALLOCATION_TAGS = [
  "Equity 80–100%",
  "Debt & MM 0–20%",
  "InvITs 0–20%",
  "Unhedged short ≤25%",
  "Overseas ≤20%",
  "Securities lending ≤20%",
];

const FUND_DETAILS = [
  { label: "Fund house", value: "Bandhan AMC" },
  { label: "SIF", value: "Arudha SIF" },
  { label: "Category", value: "Equity Long-Short" },
  { label: "Type", value: "Open-ended" },
  { label: "Inception date", value: "30 Mar 2026" },
  { label: "Benchmark", value: "Nifty 500 TRI" },
  { label: "TER (Regular)", value: `${FUND.terRegular.toFixed(2)}%` },
  { label: "Max TER", value: "2.25% + 0.05%" },
  { label: "Exit load", value: "0.50% if ≤30 days" },
  { label: "NFO price", value: "₹10 / unit" },
];

const REDEMPTION = [
  { label: "Subscription", value: "Daily (business days)" },
  { label: "Redemption", value: "Daily (business days)" },
  { label: "Settlement", value: "T+3 working days" },
  { label: "SIP / STP / SWP", value: "₹10,000+ (6 instalments)" },
  { label: "Min initial", value: "₹10,00,000" },
  { label: "Min additional", value: "₹10,000" },
  { label: "Notice period", value: "Not applicable (open-ended)" },
];

const RISK = [
  { label: "Risk band (AMFI)", value: "Level 5 · High", color: "text-red-600" },
  { label: "Benchmark risk band", value: "Level 5" },
  { label: "Unhedged short (deriv.)", value: "≤25%" },
  { label: "Unhedged long (deriv.)", value: "≤50%" },
  { label: "Gross exposure", value: "≤100% NAV" },
  { label: "Securities lending", value: "≤20% (5% single party)" },
];

const PEERS = PEER_FUNDS
  .slice()
  .sort((a, b) => (b.returns.sinceInception ?? -999) - (a.returns.sinceInception ?? -999))
  .slice(0, 4)
  .map(f => ({
    name: f.shortName + " " + f.category.replace("Long Short", "").trim(),
    amc: f.amc,
    ret: fmtPct(f.returns.sinceInception, 1),
    href: PEER_HREF[f.slug] ?? `/sifs/${f.slug}`,
  }));

const TEAM = [
  { name: "Nilesh Saha", initials: "NS", role: "Fund Manager — Equity / Long-Short", sleeve: "Equity" },
  { name: "Brijesh Shah", initials: "BS", role: "VP — Fixed Income & Overseas", sleeve: "Debt / Overseas" },
];

const SUITABLE = [
  "Long-term capital appreciation seekers (5+ year horizon)",
  "Investors with ≥₹10L surplus seeking active equity strategy",
  "Aggressive risk appetite (Risk Band 5)",
  "Belief in hedged-equity / derivative overlay for alpha",
];
const NOT_SUITABLE = [
  "Guaranteed-return or capital-protection seekers",
  "Short-term traders / leverage seekers",
  "Below ₹10L investable surplus (non-accredited)",
  "Investors uncomfortable with equity drawdowns",
];

const PILLARS = [
  { title: "Core — Long Equity", desc: "80–100% in listed equity and equity-related instruments, diversified across market caps for long-term capital appreciation", color: "orange" },
  { title: "Enhancer — Unhedged Short (Derivatives)", desc: "Up to 25% unhedged short exposure in equity and debt via exchange-traded derivatives — for alpha and downside hedging", color: "rose" },
  { title: "Enhancer — Unhedged Long Derivatives", desc: "Up to 50% unhedged long exposure through derivatives for tactical positioning, all within 100% gross cap", color: "amber" },
  { title: "Diversifier — InvITs", desc: "Up to 20% InvITs for yield diversification and non-correlated income stream", color: "blue" },
  { title: "Diversifier — Overseas", desc: "Up to 20% in ADR/GDR, foreign equity and overseas ETFs (subject to RBI/SEBI limits and SIF headroom)", color: "emerald" },
  { title: "Risk — Structural", desc: "Gross exposure hard-capped at 100% NAV. No leverage. No commodity derivatives. No unrated debt. 30-day rebalancing on passive breach.", color: "red" },
];

/* ------------------------------------------------------------------ */
/*  Portfolio tab data                                                 */
/* ------------------------------------------------------------------ */

const ASSET_ALLOC = [
  { t: "Equity and equity-related instruments (incl. unhedged short)", min: "80%", max: "100%" },
  { t: "Debt and money market instruments", min: "0%", max: "20%" },
  { t: "Units issued by InvITs", min: "0%", max: "20%" },
];

const EXPOSURE_TABLE = [
  { t: "Securities Lending", pct: "≤20% of net assets (single-party ≤5%)" },
  { t: "Unhedged Long (derivatives)", pct: "≤50% of net assets" },
  { t: "Unhedged Short (derivatives)", pct: "≤25% of net assets (equity + debt)" },
  { t: "Securitized Debt", pct: "≤10% of debt portion (single-party ≤5%)" },
  { t: "Overseas Securities", pct: "≤20% of net assets" },
  { t: "InvITs", pct: "≤20% of net assets" },
  { t: "AT1 / AT2 Bonds", pct: "≤10% of debt NAV (≤5% single issuer)" },
  { t: "Repo in corporate debt", pct: "≤10% of total assets" },
  { t: "Derivatives for hedging", pct: "up to 100% of net assets (not counted)" },
];

const STRATEGY_MIX = [
  { name: "Long Equity (Core)", range: "80–100%", width: "90%", color: "bg-orange-500" },
  { name: "Unhedged Short (Derivatives)", range: "0–25%", width: "20%", color: "bg-rose-500" },
  { name: "Debt & Money Market", range: "0–20%", width: "12%", color: "bg-red-400" },
  { name: "InvITs / Overseas diversifiers", range: "0–20%", width: "12%", color: "bg-amber-500" },
];

const DERIV_STRATS = [
  { t: "Income Generation", note: "Covered calls, cash-secured puts, premium capture" },
  { t: "Protection", note: "Protective puts, protective collars, portfolio hedging" },
  { t: "Directional", note: "Bull call / bear put / bull put / bear call spreads, long calls/puts, synthetics" },
  { t: "Volatility", note: "Straddles, strangles, butterflies, iron condors, iron butterflies" },
  { t: "Hedging & Pairs", note: "Pair trades (sector-relative), calendar spreads, short-on-long hedges" },
  { t: "Rates Derivatives", note: "IRS, FRA, Interest Rate Futures, permitted CDS for debt sleeve" },
];

/* ------------------------------------------------------------------ */
/*  Fund manager bios                                                  */
/* ------------------------------------------------------------------ */

const MANAGERS = [
  {
    name: "Nilesh Saha",
    initials: "NS",
    role: "Fund Manager — Equity / Long-Short",
    exp: "11+ yrs",
    bio: "Joined Bandhan AMC on 29 September 2025 as part of the equity investment team and is the designated Fund Manager for Arudha Equity Long-Short Fund. Previously at Julius Baer Wealth Advisors (India) (Sep 2023 – Sep 2025) responsible for investment research and portfolio management for a Category III AIF; and at Edelweiss Asset Management (May 2014 – Aug 2023) on investment research and portfolio management of Category III AIFs — bringing direct long-short and hedge-fund-style derivative experience. Age 33. BE (Hons) Mechanical Engineering, MBA from IIM Bangalore, CFA charter-holder.",
    color: "orange",
  },
  {
    name: "Brijesh Shah",
    initials: "BS",
    role: "Vice President — Fixed Income & Overseas",
    exp: "15+ yrs",
    bio: "Associated with Bandhan AMC since August 2015 as part of the Fixed Income team; now handles fixed income and overseas fund management for Arudha Equity. Prior roles: IDBI AMC (Jan 2013 – Aug 2015), Indiabulls AMC (Jun 2011 – Dec 2012), Mata Securities (Jun 2010 – Jun 2011) and Twenty First Century (Jan 2009 – May 2010) in wholesale debt. Currently manager of Bandhan Liquid, Money Market, Floater, Overnight, Balanced Advantage (debt portion), Multi-Factor Fund and several CRISIL-IBX index / FOF debt strategies. Age 39. Post Graduate Diploma in Finance.",
    color: "red",
  },
];

/* ------------------------------------------------------------------ */
/*  Risk tab data                                                      */
/* ------------------------------------------------------------------ */

const STRATEGY_RISKS = [
  { t: "Market Risk", d: "Equity prices fluctuate with macro, liquidity and sentiment. With 80–100% in equity, the strategy will experience material drawdowns during equity bear markets despite the derivative overlay." },
  { t: "Derivatives Risk", d: "Options/futures are leveraged — small moves can amplify gains or losses. Used extensively for covered calls, straddles, strangles, spreads and hedging; execution depends on FM skill and volatility regime." },
  { t: "Short-Selling Risk", d: "Unhedged short via derivatives up to 25% can face theoretically unlimited loss on underlying rallies. Short-selling subject to margin calls, settlement/liquidity risk and mark-to-market pressure." },
  { t: "Concentration Risk", d: "SEBI single-issuer and group exposure caps apply. Securities lending limited to 5% per party. InvITs ≤20%; overseas ≤20%." },
  { t: "Liquidity Risk", d: "While listed equities carry lower liquidity risk, trading volumes constrain exit in a stress market. Unlisted securities (if any, within regulatory limits) are inherently illiquid." },
  { t: "Interest-Rate & Credit Risk", d: "Debt sleeve (≤20%) sensitive to yield curve moves and credit migration. No unrated debt. Segregated-portfolio mechanism allowed for credit events." },
  { t: "Counterparty & Settlement Risk", d: "Exchange-traded derivatives mitigate counterparty risk (DVP / CCIL settled). OTC exposures (IRS, FRA, CDS) limited to rated counterparties per SEBI circulars." },
  { t: "Overseas / FX Risk", d: "Up to 20% in overseas securities within industry-level RBI/SEBI headroom. Currency and country risks apply; no overseas ETF investment until SEBI permission refreshed." },
  { t: "Model & Execution Risk", d: "Derivative overlay depends on volatility regime and liquidity. Pair-trade correlation breakdown, expiry slippage and 30-day SEBI rebalancing rule are actively managed." },
  { t: "New-Strategy Risk", d: "Arudha Equity Long-Short has no performance track record as of launch (30 March 2026). Fund manager Nilesh Saha joined Bandhan AMC only in September 2025 — Cat III AIF pedigree differs from SIF execution." },
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

const ArudhaEquitySif = () => {
  const fundData = getSifBySlug("arudha-equity-long-short");
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
              <a href="/sif-funds-launched" className="hover:text-gray-600">Equity Long-Short</a>
              <span className="mx-1.5">›</span>
              <span className="text-gray-600">Arudha Equity</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <AmcLogo amc="Bandhan Mutual Fund" size="md" />
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
                    Arudha Equity Long-Short Fund
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
                    <span className="text-2xl font-bold text-gray-900 font-mono tabular-nums">₹{FUND.currentNav.toFixed(4)}</span>
                    <span className={`text-sm font-semibold font-mono tabular-nums ${siColor}`}>{fmtPct(FUND.returns.sinceInception)} since inception</span>
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
                      const pos = !t.value.startsWith("-") && t.value !== "+0.00%" && t.value !== "—";
                      return (
                        <div key={t.period} className="text-center p-3 rounded-lg bg-gray-50">
                          <p className="text-xs text-gray-400 mb-1">{t.period}</p>
                          <p className={`text-base font-bold font-mono tabular-nums ${pos ? "text-green-600" : t.value.startsWith("-") ? "text-red-600" : "text-gray-700"}`}>{t.value}</p>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-3">
                    Strategy re-opened for continuous subscription on 30 March 2026. Since-inception
                    figures reflect absolute change in NAV from the ₹10 allotment price.
                  </p>
                </div>

                {/* CRASH ANALYSIS */}
                {fundData && <CrashAnalysis fund={fundData} />}

                {/* FUND OBJECTIVE */}
                <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Investment objective</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    The investment strategy seeks to generate <b>long-term capital appreciation</b> by
                    investing in a diversified portfolio of <b>equity and equity-related instruments</b>,
                    including <b>limited short exposure through derivatives</b>. Benchmarked to the{" "}
                    <b>Nifty 500 Total Return Index</b>. All equity investments are restricted to listed
                    or to-be-listed securities. There is no assurance that the investment objective will
                    be realised.
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
                    Arudha Equity Long-Short is Bandhan&apos;s equity-oriented SIF strategy: an open-ended
                    vehicle running <b>80–100% long equity</b> augmented by a derivative overlay offering
                    up to <b>25% unhedged short exposure</b> and up to 50% unhedged long exposure — all
                    sized within a hard 100% gross-exposure cap. The fund captures upside across market
                    caps while using options and futures to hedge downside and monetise volatility.
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    No leverage. No commodity derivatives. No unrated debt. Cash equivalents (G-Secs,
                    T-Bills, Repo on G-Secs) with residual maturity {'<'}91 days are excluded from exposure
                    calculations per Clause 12.25.3 of the SEBI Master Circular.
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
                  <div className="grid grid-cols-2 gap-3">
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
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invest in Arudha Equity</h3>
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

                <SidebarCard title="Equity L/S peers">
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
              <h3 className="text-base font-bold text-gray-900 mb-3">Portfolio construction</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Arudha Equity is constructed as a <b>predominantly long equity book</b> (80–100%)
                overlaid with a <b>derivative toolkit</b> for short exposure and tactical positioning.
                The fund manager uses up to 25% unhedged short via exchange-traded derivatives to
                hedge downside or express bearish views on overvalued names, while up to 50% unhedged
                long derivatives can enhance upside participation. A hard 100% gross-exposure cap
                keeps the book un-leveraged at all times.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-lg bg-orange-50 p-4 text-center">
                  <p className="text-xs text-orange-700 mb-1">Long equity</p>
                  <p className="text-lg font-bold text-orange-700 font-mono tabular-nums">80–100%</p>
                </div>
                <div className="rounded-lg bg-rose-50 p-4 text-center">
                  <p className="text-xs text-rose-700 mb-1">Short (deriv.)</p>
                  <p className="text-lg font-bold text-rose-700 font-mono tabular-nums">0–25%</p>
                </div>
                <div className="rounded-lg bg-red-50 p-4 text-center">
                  <p className="text-xs text-red-700 mb-1">Debt & MM</p>
                  <p className="text-lg font-bold text-red-700 font-mono tabular-nums">0–20%</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4 text-center">
                  <p className="text-xs text-amber-700 mb-1">InvITs</p>
                  <p className="text-lg font-bold text-amber-700 font-mono tabular-nums">0–20%</p>
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
                      <span className="text-gray-500 font-mono tabular-nums">{s.range}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div className={`${s.color} h-full rounded-full`} style={{ width: s.width }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-4">
                Source: Arudha Equity Long-Short Fund ISID &amp; KIM — Bandhan AMC. Weights are
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
                        <td className="py-3 px-4 text-right font-semibold font-mono tabular-nums">{r.min}</td>
                        <td className="py-3 pl-4 text-right font-semibold font-mono tabular-nums">{r.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Maximum short exposure through unhedged derivative positions in equity and equity-related
                instruments: 25%. Cumulative gross exposure across equity, debt, MM, derivatives, repo and
                CDS capped at 100% of net assets. No investment in unrated debt or commodity derivatives.
              </p>
            </div>

            {/* Exposure limits table */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Instrument-level limits (per KIM)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4 font-semibold">Instrument</th>
                      <th className="py-3 pl-4 font-semibold">Permitted exposure</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {EXPOSURE_TABLE.map((r) => (
                      <tr key={r.t} className="border-b border-gray-50 last:border-b-0">
                        <td className="py-3 pr-4 font-medium">{r.t}</td>
                        <td className="py-3 pl-4">{r.pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Derivative strategies toolkit */}
            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">Derivative toolkit</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                The KIM lists an extensive set of permitted derivative strategies — covered calls,
                protective puts / collars, cash-secured puts, long calls/puts, bull &amp; bear call/put
                spreads, calendar spreads, straddles, strangles, butterfly &amp; iron condor / iron
                butterfly, synthetic long/short, pair trades, hedging, plus rates derivatives (IRS, FRA,
                IRF, CDS) for the debt sleeve. Positions are always maintained within the 100% gross cap
                and the 25% unhedged-short ceiling.
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
                  <li>• Unhedged <b>long</b> via derivatives: up to <b>50%</b> of net assets</li>
                  <li>• Unhedged <b>short</b> via derivatives: up to <b>25%</b> of net assets (equity + debt)</li>
                  <li>• Hedging-purpose derivatives: up to <b>100%</b> (not counted toward limits)</li>
                  <li>• Cumulative gross exposure: <b>≤100%</b> of NAV</li>
                  <li>• No commodity derivatives, no unrated debt</li>
                  <li>• Only <b>exchange-traded</b> derivatives permitted for non-hedging purposes (SEBI Feb 27, 2025)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Exposure calculation</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• <b>Futures:</b> Futures price × lot size × contracts</li>
                  <li>• <b>Options sold:</b> Market price of underlying × lot × contracts</li>
                  <li>• <b>Other derivatives:</b> Notional market value</li>
                  <li>• NFO funds to be deployed within <b>30 business days</b></li>
                  <li>• Rebalancing within <b>30 calendar days</b> on defensive deviation</li>
                  <li>• Rebalancing within <b>30 business days</b> on passive breach</li>
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
                      <th className="py-3 pl-4 font-semibold">Expected outcome</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-medium">Bull (Nifty 500 +15%)</td><td className="py-3 px-4 text-green-600">Gains</td><td className="py-3 px-4 text-red-600">Drag</td><td className="py-3 pl-4 text-gray-500">Beats benchmark if stock-picking works</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 font-medium">Bear (Nifty 500 −15%)</td><td className="py-3 px-4 text-red-600">Losses</td><td className="py-3 px-4 text-green-600">Hedge gains</td><td className="py-3 pl-4 text-gray-500">Softer drawdown than passive equity</td></tr>
                    <tr><td className="py-3 pr-4 font-medium">Range-bound</td><td className="py-3 px-4 text-gray-500">Flat</td><td className="py-3 px-4 text-green-600">Premium capture</td><td className="py-3 pl-4 text-gray-500">Yield via covered calls / iron condors</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Disclosure note */}
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5">
              <p className="text-sm text-amber-800 leading-relaxed">
                <b>Holdings disclosure:</b> SIFs do not publish monthly top-10 holdings in the same
                format as regular mutual funds. The Arudha Equity ISID &amp; KIM disclose strategy-level
                allocation ranges and derivative-strategy categories. Position-level holdings are
                reported to the AMC and regulator but not publicly disseminated on a monthly basis.
                Portfolio disclosures will appear on <a href={SIF_URL} className="underline text-orange-700" target="_blank" rel="noopener noreferrer">arudhasif.com</a> post-deployment.
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
                Arudha Equity is jointly managed across two sleeves — <b>equity &amp; long-short</b>{" "}
                (Nilesh Saha, lead FM) and <b>fixed income + overseas</b> (Brijesh Shah). Saha brings 11+
                years of Category III AIF long-short experience from Julius Baer and Edelweiss; Shah
                brings 15+ years of fixed-income management at Bandhan AMC. Together they execute the
                equity-predominant portfolio with the derivative overlay and debt/overseas diversifiers.
              </p>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg bg-orange-50 p-3">
                  <p className="text-xs text-orange-700 font-semibold">EQUITY / L-S</p>
                  <p className="text-xs text-gray-600 mt-1">Nilesh Saha (Lead)</p>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-xs text-red-700 font-semibold">DEBT / OVERSEAS</p>
                  <p className="text-xs text-gray-600 mt-1">Brijesh Shah</p>
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
                <li>• <b>AMC:</b> Bandhan AMC Limited, 6th Floor, One World Centre, Jupiter Mills Compound, Prabhadevi, Mumbai 400013</li>
                <li>• <b>Trustee:</b> Bandhan Mutual Fund Trustee Limited (independent)</li>
                <li>• <b>Registrar:</b> CAMS (camsonline.com)</li>
                <li>• <b>Toll-free:</b> 1-800-300-66688 / 1-800-266-6688</li>
                <li>• <b>Websites:</b> <a href={SIF_URL} className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">arudhasif.com</a> · <a href={AMC_URL} className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">bandhanmutual.com</a></li>
              </ul>
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
                  Level 5 · High
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Risk Band <b>Level 5</b> (on a 1–5 scale) indicates the <b>highest</b> risk classification.
                The benchmark (Nifty 500 TRI) also sits at Level 5. With 80–100% equity exposure and
                active use of derivatives including unhedged short positions, the strategy can experience
                significant NAV volatility. The product labelling was assigned during NFO based on
                internal assessment of strategy characteristics and may be revised post-launch as actual
                portfolio attributes evolve.
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
                    Cumulative gross-exposure cap of 100% NAV. Unhedged short cap of 25% (equity + debt
                    combined). Unhedged long derivatives capped at 50%. No unrated debt. No commodity
                    derivatives. 30-day rebalancing on defensive deviation and passive breach.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Operational</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Exchange-traded derivatives with DVP/CCIL settlement. Segregated-portfolio
                    mechanism allowed for credit events. Daily NAV publication by 11 pm. Delta, vega
                    and expiry monitoring on the derivative book.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Ongoing monitoring</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Daily exposure, factor and volatility monitoring. Sector &amp; single-issuer caps per
                    SEBI. Overseas soft limits tracked per SEBI Paragraph 12.19. NFO deployment window
                    of 30 business days with Investment Committee escalation.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-green-700 mb-1">Governance</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Independent Trustee (Bandhan MF Trustee Ltd), AMC Board Investment / Risk
                    Committees, SEBI periodic disclosures and RTA reconciliation via CAMS. Full trail
                    model of distributor commission.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 mb-3">March 2026 crash reference</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Arudha Equity Long-Short re-opened for continuous subscription only on <b>30 March 2026</b>,
                effectively at the tail-end of the March 2026 equity drawdown. As a result, the fund
                has <b>no meaningful March crash performance</b> to report. The Nifty 500 fell{" "}
                <span className="font-mono tabular-nums">−11.36%</span> during the episode; category-average SIF equity L/S drawdown
                was <span className="font-mono tabular-nums">−6.31%</span>. Subsequent drawdown behaviour will be disclosed on the
                factsheet once meaningful data accumulates.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-left text-xs text-gray-500 uppercase tracking-wider">
                      <th className="py-3 pr-4">Attribute</th>
                      <th className="py-3 px-4">Arudha Equity</th>
                      <th className="py-3 pl-4">Benchmark / Category</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund return (March)</td><td className="py-3 px-4 font-semibold text-gray-500 font-mono tabular-nums">Not applicable</td><td className="py-3 pl-4 font-mono tabular-nums">Nifty 500 −11.36%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Capital protected</td><td className="py-3 px-4 font-semibold text-gray-500">N/A (post-crash launch)</td><td className="py-3 pl-4 font-mono tabular-nums">Category avg −6.31%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Since-inception NAV</td><td className="py-3 px-4 font-semibold font-mono tabular-nums text-red-600">₹9.959 · −0.41%</td><td className="py-3 pl-4">2 weeks of data</td></tr>
                    <tr><td className="py-3 pr-4">Rank in category</td><td className="py-3 px-4 font-semibold text-gray-500">Unranked</td><td className="py-3 pl-4">3 live Equity L-S SIFs</td></tr>
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
                      <th className="py-3 px-4">Arudha Equity SIF</th>
                      <th className="py-3 pl-4">Cat III AIF L/S</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Min ticket</td><td className="py-3 px-4 font-semibold text-green-600 font-mono tabular-nums">₹10 lakh</td><td className="py-3 pl-4 font-mono tabular-nums">₹1 crore</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Leverage</td><td className="py-3 px-4 font-semibold text-green-600">None (100% gross cap)</td><td className="py-3 pl-4">Up to 200% gross</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Performance fee</td><td className="py-3 px-4 font-semibold text-green-600">No</td><td className="py-3 pl-4">Yes (typically 20% of profits)</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Fund-level tax</td><td className="py-3 px-4 font-semibold text-green-600">Nil (Sec 10(23D))</td><td className="py-3 pl-4">MMR 42.7%</td></tr>
                    <tr><td className="py-3 pr-4">Investor LTCG</td><td className="py-3 px-4 font-semibold text-green-600">12.5% post 12M (equity)</td><td className="py-3 pl-4">Slab / business income</td></tr>
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
                All documents are hosted on the Arudha SIF portal.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Investment Strategy Information Document (ISID)", d: "Full strategy disclosure — Section I & II (77 pp)" },
                  { t: "Key Information Memorandum (KIM)", d: "Quick-reference summary + application form (27 pp)" },
                  { t: "Statement of Additional Information (SAI)", d: "Legal terms, tax, detailed risk factors" },
                  { t: "Common Application Form", d: "NFO / continuous-offer application" },
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO opened</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">5 March 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO closed</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">18 March 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">Continuous offer reopened</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">30 March 2026</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO price</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">₹10 / unit</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4 text-gray-500">NFO deployment window</td><td className="py-3 pl-4 font-semibold font-mono tabular-nums">30 business days (extendable)</td></tr>
                    <tr><td className="py-3 pr-4 text-gray-500">Redemption days</td><td className="py-3 pl-4 font-semibold">Every business day (3 pm cut-off)</td></tr>
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
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">First ₹500 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.25%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹250 Cr</td><td className="py-3 pl-4 text-right font-semibold">2.00%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹1,250 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.75%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹3,000 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.60%</td></tr>
                    <tr className="border-b border-gray-50"><td className="py-3 pr-4">Next ₹5,000 Cr</td><td className="py-3 pl-4 text-right font-semibold">1.50%</td></tr>
                    <tr><td className="py-3 pr-4">Balance AUM</td><td className="py-3 pl-4 text-right font-semibold">1.05%</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 mt-3">
                Current Regular plan TER: <b className="font-mono tabular-nums">{FUND.terRegular.toFixed(2)}%</b>.
                Additional 0.05% permissible under Regulation 52(6A)(c) (only where exit load is levied).
                Direct plan TER is typically 40–70 bps lower (no distributor commission). TER and daily
                TER will be published on arudhasif.com/downloads post-launch.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Load structure</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Exit load: <b>0.50%</b> if redeemed / switched out on or within <b>30 days</b> from allotment</li>
                  <li>• Exit load: <b>Nil</b> after 30 days</li>
                  <li>• No entry load (SEBI rule)</li>
                  <li>• No exit load on switches between Plans / Options of the same strategy</li>
                  <li>• Dispatch of redemption proceeds: within <b>3 working days</b></li>
                  <li>• Delay interest: 15% p.a. beyond T+3</li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-100 bg-white p-5 sm:p-6">
                <h3 className="text-base font-bold text-gray-900 mb-3">Redemption &amp; investment rules</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Subscribe &amp; redeem: <b>daily</b> on business days (3:00 PM cut-off)</li>
                  <li>• Min initial: <b>₹10 lakh</b> (₹1 lakh for accredited investors)</li>
                  <li>• Min additional: ₹10,000</li>
                  <li>• Min SIP / SWP / STP: ₹10,000 × 6 instalments</li>
                  <li>• PAN-level aggregate ≥ ₹10L across all SIF strategies (Minimum Investment Threshold)</li>
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
                1-800-300-66688 · 1-800-266-6688. Registrar: CAMS (camsonline.com).
              </p>
            </div>
          </div>
        )}
      </main>

      <Suspense fallback={null}>
        <section className="py-10 lg:py-14 bg-muted/30 border-t border-border/60">
          <div className="container mx-auto px-4 max-w-3xl">
            <LeadCaptureForm fundSlug="arudha-equity-long-short" fundName="Arudha Equity Long-Short by Bandhan" source="fund-page" />
          </div>
        </section>
        <Footer />
      </Suspense>
    </div>
  );
};

export default ArudhaEquitySif;
