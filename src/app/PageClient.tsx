"use client";

import { memo, useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sifFunds, type SIFund } from "@/lib/sifData";
import { calculateAlphaShield } from "@/lib/alphaShield";
import { useSifNav, type SifNavEntry } from "@/hooks/useSifNav";
import { ChevronUp, ChevronDown, Shield } from "lucide-react";

const AlphaShieldLeaderboard = dynamic(() => import("@/components/AlphaShieldLeaderboard"), { ssr: true });
const SifAumSection = dynamic(() => import("@/components/SifAumSection"), { ssr: true });
const SifFaqs = dynamic(() => import("@/components/SifFaqs"), { ssr: true });

// ── NAV lookup helper ──
const NAV_KEY_MAP: Record<string, string> = {
  "Altiva Hybrid Long-Short": "Altiva Hybrid Long-Short",
  "Apex Hybrid Long-Short": "Apex Hybrid Long-Short",
  "Arudha Hybrid Long-Short": "Arudha Hybrid Long-Short",
  "Magnum Hybrid Long Short": "Magnum Hybrid Long Short",
  "qSIF Hybrid Long-Short": "qSIF Hybrid Long-Short",
  "Titanium Hybrid Long-Short": "Titanium Hybrid Long-Short",
  "iSIF Hybrid Long-Short": "iSIF Hybrid Long-Short",
  "DynaSIF Equity Long-Short": "DynaSIF Equity Long-Short",
  "Diviniti Equity Long Short": "Diviniti Equity Long Short",
  "qSIF Equity Long Short": "qSIF Equity Long Short",
  "Arudha Equity Long-Short": "Arudha Equity Long-Short",
  "iSIF Ex-Top 100 Long-Short": "iSIF Ex-Top 100 Long-Short",
  "qSIF Ex-Top 100 Long-Short": "qSIF Ex-Top 100 Long-Short",
  "DynaSIF Active Asset Allocator": "DynaSIF Active Asset Allocator",
};
function liveNav(apiData: SifNavEntry[], fundName: string, fallback: number): number {
  const apiName = NAV_KEY_MAP[fundName] ?? fundName;
  const m = apiData.find((f) => f.fund === apiName);
  return m?.nav ?? fallback;
}

// ── Category mappings ──
const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Hybrid L-S", value: "Hybrid Long Short" },
  { label: "Equity L-S", value: "Equity Long Short" },
  { label: "EX100 L-S", value: "Equity Ex-Top 100" },
  { label: "Active Alloc.", value: "Active Asset Allocator" },
];

type SortKey = "aum" | "sinceInception" | "oneMonth" | "threeMonth" | "nav" | "ter" | "alphaShield";

// ── Return cell ──
function ReturnCell({ value }: { value: number | null }) {
  if (value === null) return <span className="text-[var(--text-tertiary)] text-[12px]">—</span>;
  const color = value > 0 ? "var(--positive)" : value < 0 ? "var(--negative)" : "var(--text-secondary)";
  return (
    <span className="font-data text-[13px]" style={{ color }}>
      {value > 0 ? "+" : ""}{value.toFixed(2)}%
    </span>
  );
}

// ── Alpha Shield icon ──
function AlphaShieldCell({ score }: { score: number | null }) {
  if (score === null) return <span className="text-[var(--text-tertiary)] text-[12px]">—</span>;
  const color = score >= 8 ? "var(--positive)" : score >= 5 ? "var(--neutral)" : "var(--negative)";
  return (
    <span className="inline-flex items-center gap-0.5 text-[12px] font-medium" style={{ color }}>
      <Shield className="w-3 h-3" />
      {score.toFixed(1)}
    </span>
  );
}

// ── Risk dot ──
function RiskDot({ category }: { category: string }) {
  const isEquity = category.includes("Equity");
  const color = isEquity ? "var(--negative)" : "var(--neutral)";
  return <span className="inline-block w-2 h-2 rounded-full" style={{ background: color }} />;
}

// ── Sort header ──
function SortHeader({ label, sublabel, col, active, dir, onSort, className = "" }: {
  label: string; sublabel?: string; col: SortKey; active: boolean; dir: "asc" | "desc"; onSort: (c: SortKey) => void; className?: string;
}) {
  return (
    <th
      className={`text-right cursor-pointer select-none hover:text-[var(--text-primary)] transition-colors text-[11px] uppercase tracking-[0.04em] text-[var(--text-tertiary)] font-medium px-3 py-2 whitespace-nowrap ${className}`}
      style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}
      onClick={() => onSort(col)}
    >
      <span className="inline-flex items-center gap-0.5 justify-end">
        <span className="flex flex-col items-end leading-tight">
          <span>{label}</span>
          {sublabel && <span className="text-[9px] font-normal normal-case tracking-normal">{sublabel}</span>}
        </span>
        {active ? (dir === "desc" ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />) : null}
      </span>
    </th>
  );
}

// ── Fake AUM data (will be replaced with real data later) ──
const AUM_MAP: Record<string, number> = {
  "altiva-hybrid-long-short": 2580,
  "qsif-hybrid-long-short": 1820,
  "magnum-hybrid-long-short": 1340,
  "titanium-hybrid-long-short": 890,
  "arudha-hybrid-long-short": 620,
  "isif-hybrid-long-short": 410,
  "apex-hybrid-long-short": 180,
  "qsif-equity-long-short": 620,
  "diviniti-equity-long-short": 310,
  "dynasif-equity-long-short": 90,
  "arudha-equity-long-short": 40,
  "isif-ex-top-100-long-short": 480,
  "qsif-ex-top-100-long-short": 350,
  "dynasif-active-asset-allocator": 30,
};

const maxAum = Math.max(...Object.values(AUM_MAP));

const Index = memo(() => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat) setActiveCategory(cat);
  }, []);
  const [sortKey, setSortKey] = useState<SortKey>("aum");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const { data: liveNavs } = useSifNav();

  const handleSort = useCallback((col: SortKey) => {
    if (sortKey === col) setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    else { setSortKey(col); setSortDir("desc"); }
  }, [sortKey]);

  const handleCategory = useCallback((value: string) => {
    setActiveCategory(value);
    const params = new URLSearchParams(window.location.search);
    if (value === "all") params.delete("category");
    else params.set("category", value);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : "/");
  }, []);

  const funds = useMemo(() => {
    let list = sifFunds.map((f) => ({
      ...f,
      liveNav: liveNav(liveNavs, f.name, f.currentNav),
      aum: AUM_MAP[f.id] ?? 0,
      alphaShield: calculateAlphaShield(f.marchCrashData.fundReturn),
    }));

    if (activeCategory !== "all") {
      list = list.filter((f) => f.category === activeCategory);
    }

    list.sort((a, b) => {
      let aV: number, bV: number;
      switch (sortKey) {
        case "aum": aV = a.aum; bV = b.aum; break;
        case "sinceInception": aV = a.returns.sinceInception; bV = b.returns.sinceInception; break;
        case "oneMonth": aV = a.returns.oneMonth ?? -Infinity; bV = b.returns.oneMonth ?? -Infinity; break;
        case "threeMonth": aV = a.returns.threeMonth ?? -Infinity; bV = b.returns.threeMonth ?? -Infinity; break;
        case "nav": aV = a.liveNav; bV = b.liveNav; break;
        case "ter": aV = a.ter; bV = b.ter; break;
        case "alphaShield": aV = a.alphaShield ?? -Infinity; bV = b.alphaShield ?? -Infinity; break;
        default: aV = 0; bV = 0;
      }
      return sortDir === "desc" ? bV - aV : aV - bV;
    });

    return list;
  }, [activeCategory, sortKey, sortDir, liveNavs]);

  // Find best performing fund for hero stat
  const bestFund = useMemo(() => {
    let best: typeof funds[0] | null = null;
    for (const f of sifFunds as any[]) {
      const ret = f.returns?.oneMonth;
      if (ret != null && (best === null || ret > (best as any).returns.oneMonth)) best = f;
    }
    return best;
  }, []);

  // Get latest NAV date from live data
  const latestDate = useMemo(() => {
    if (liveNavs.length > 0) return liveNavs[0].date;
    return "06 Apr 2026";
  }, [liveNavs]);

  return (
    <div className="min-h-screen" style={{ background: "var(--surface-page)" }}>
      <Header />
      <main style={{ paddingTop: "var(--nav-height)" }}>

        {/* ── SECTION 1: Compact Hero ── */}
        <section className="bg-white" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 pb-5">
            <span className="text-[11px] uppercase tracking-[0.07em] font-medium" style={{ color: "var(--brand)" }}>
              SIF Universe
            </span>
            <h1 className="text-[22px] sm:text-[26px] font-medium text-[var(--text-primary)] mt-1">
              All 14 Specialised Investment Funds
            </h1>
            <p className="text-[13px] text-[var(--text-secondary)] mt-1">
              Direct Growth NAV & returns from AMFI · Updated {latestDate}
            </p>

            <div className="flex flex-wrap gap-6 sm:gap-8 mt-5">
              <Stat label="Total AUM" value="₹9,710 Cr" />
              <Stat label="Live SIFs" value="14" />
              <Stat label="AMCs" value="9" />
              {bestFund && (
                <Stat
                  label={`Best fund Mar '26`}
                  value={`${(bestFund as any).returns.oneMonth > 0 ? "+" : ""}${(bestFund as any).returns.oneMonth?.toFixed(2)}%`}
                  sub={`(${(bestFund as any).shortName})`}
                  color="var(--positive)"
                />
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION 2: Filter bar ── */}
        <section className="sticky top-[var(--nav-height)] z-10 bg-white" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleCategory(cat.value)}
                className="text-[12px] px-3 py-1 rounded-full whitespace-nowrap transition-colors"
                style={{
                  background: activeCategory === cat.value ? "var(--brand-light)" : "var(--surface-hover)",
                  color: activeCategory === cat.value ? "var(--brand)" : "var(--text-secondary)",
                  border: activeCategory === cat.value ? "0.5px solid var(--brand-border)" : "0.5px solid transparent",
                }}
              >
                {cat.label}
              </button>
            ))}

            <div className="w-px h-5 mx-1" style={{ background: "rgba(0,0,0,0.08)" }} />

            <span className="text-[12px] text-[var(--text-tertiary)] ml-auto whitespace-nowrap hidden sm:block">
              Direct Growth · {funds.length} funds
            </span>
          </div>
        </section>

        {/* ── SECTION 3: Fund Data Table ── */}
        <section className="bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="table-scroll-container">
              <table className="w-full text-left" style={{ minWidth: 960 }}>
                <thead>
                  <tr>
                    <th className="text-[11px] uppercase tracking-[0.04em] text-[var(--text-tertiary)] font-medium px-3 py-2 w-7" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>#</th>
                    <th className="text-[11px] uppercase tracking-[0.04em] text-[var(--text-tertiary)] font-medium px-3 py-2 text-left" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)", minWidth: 220 }}>Fund</th>
                    <SortHeader label="NAV (₹)" col="nav" active={sortKey === "nav"} dir={sortDir} onSort={handleSort} />
                    <SortHeader label="1M" col="oneMonth" active={sortKey === "oneMonth"} dir={sortDir} onSort={handleSort} />
                    <SortHeader label="3M" col="threeMonth" active={sortKey === "threeMonth"} dir={sortDir} onSort={handleSort} />
                    <SortHeader label="Since" sublabel="inception" col="sinceInception" active={sortKey === "sinceInception"} dir={sortDir} onSort={handleSort} />
                    <SortHeader label="TER" col="ter" active={sortKey === "ter"} dir={sortDir} onSort={handleSort} />
                    <th className="text-[11px] uppercase tracking-[0.04em] text-[var(--text-tertiary)] font-medium px-3 py-2 text-center" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>Risk</th>
                    <SortHeader label="AUM" sublabel="₹ Cr" col="aum" active={sortKey === "aum"} dir={sortDir} onSort={handleSort} className="text-[#378ADD]" />
                    <SortHeader label="Alpha" sublabel="Shield" col="alphaShield" active={sortKey === "alphaShield"} dir={sortDir} onSort={handleSort} />
                    <th className="text-[11px] uppercase tracking-[0.04em] text-[var(--text-tertiary)] font-medium px-3 py-2 text-right" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map((fund, i) => (
                    <tr
                      key={fund.id}
                      className="cursor-pointer transition-colors hover:bg-[var(--surface-hover)]"
                      style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)", height: 52 }}
                      onClick={() => router.push(`/sifs/${fund.slug}`)}
                    >
                      <td className="px-3 text-[12px] text-[var(--text-tertiary)]">{i + 1}</td>
                      <td className="px-3">
                        <div className="text-[13px] font-medium text-[var(--text-primary)] leading-tight">{fund.shortName} {fund.category.includes("Hybrid") ? "Hybrid" : fund.category.includes("Ex-Top") ? "Ex100" : fund.category.includes("Active") ? "AAA" : "Equity"} L-S</div>
                        <div className="text-[11px] text-[var(--text-tertiary)]">{fund.amc}</div>
                        <span className="inline-block text-[10px] px-1.5 py-px rounded mt-0.5 text-[var(--text-secondary)]" style={{ background: "var(--surface-hover)" }}>
                          {fund.category}
                        </span>
                      </td>
                      <td className="px-3 text-right">
                        <div className="font-data text-[13px] font-medium text-[var(--text-primary)]">
                          {fund.liveNav.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                        </div>
                        <div className="text-[10px] text-[var(--text-tertiary)]">{latestDate}</div>
                      </td>
                      <td className="px-3 text-right"><ReturnCell value={fund.returns.oneMonth} /></td>
                      <td className="px-3 text-right"><ReturnCell value={fund.returns.threeMonth} /></td>
                      <td className="px-3 text-right"><ReturnCell value={fund.returns.sinceInception} /></td>
                      <td className="px-3 text-right text-[12px] text-[var(--text-secondary)]">{fund.ter.toFixed(2)}%</td>
                      <td className="px-3 text-center"><RiskDot category={fund.category} /></td>
                      <td className="px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <span className="font-data text-[12px] text-[var(--text-secondary)]">{fund.aum > 0 ? fund.aum : "—"}</span>
                          {fund.aum > 0 && (
                            <div className="w-10 h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
                              <div className="h-full rounded-full" style={{ width: `${(fund.aum / maxAum) * 100}%`, background: "#378ADD" }} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-3 text-right"><AlphaShieldCell score={fund.alphaShield} /></td>
                      <td className="px-3 text-right">
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{
                          background: "rgba(22,163,74,0.1)",
                          color: "var(--positive)",
                        }}>
                          LIVE
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: Alpha Shield Leaderboard ── */}
        <section style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
          <AlphaShieldLeaderboard />
        </section>

        {/* ── SECTION 5: AUM Breakdown ── */}
        <section style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
          <SifAumSection />
        </section>

        {/* ── SECTION 6: FAQ ── */}
        <section style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
          <SifFaqs />
        </section>

        {/* ── SECTION 7: Minimal CTA strip ── */}
        <section className="bg-white" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[13px] text-[var(--text-secondary)]">
              AMFI Registered SIF Distributor · info@sifprime.com
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919032999466?text=Hi%20Kiran%2C%20I%20want%20details%20on%20Specialized%20Investment%20Funds%20(SIF)"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] font-medium px-4 py-1.5 rounded-md transition-colors"
                style={{ color: "var(--brand)", border: "0.5px solid var(--brand-border)" }}
              >
                Invest in SIFs
              </a>
              <a
                href="/partner"
                className="text-[13px] font-medium px-4 py-1.5 rounded-md transition-colors text-[var(--text-secondary)]"
                style={{ border: "0.5px solid rgba(0,0,0,0.15)" }}
              >
                Partner with us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
});

// ── Stat component ──
function Stat({ label, value, sub, color }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div>
      <div className="text-[20px] font-medium stat-number" style={{ color: color || "var(--text-primary)" }}>
        {value}
        {sub && <span className="text-[12px] font-normal text-[var(--text-secondary)] ml-1">{sub}</span>}
      </div>
      <div className="text-[11px] text-[var(--text-tertiary)]">{label}</div>
    </div>
  );
}

Index.displayName = "Index";

export default Index;
