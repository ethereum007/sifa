"use client";
import { useState, useMemo } from "react";
import { TrendingUp, ChevronDown, ChevronUp, BarChart3, ArrowUpDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSifNav, type SifNavEntry } from "@/hooks/useSifNav";

interface Fund {
  name: string;
  inception: string;
  endNav: number;
  m1: number | null;
  m3: number | null;
  sinceInception: number;
  href: string;
}

// Fund name mapping: our display name -> API fund name
const NAV_KEY_MAP: Record<string, string> = {
  "Altiva Hybrid Long-Short": "Altiva Hybrid Long-Short",
  "Apex Hybrid Long-Short": "Apex Hybrid Long-Short",
  "Arudha Hybrid Long-Short": "Arudha Hybrid Long-Short",
  "Magnum Hybrid Long-Short": "Magnum Hybrid Long Short",
  "qSIF Hybrid Long-Short": "qSIF Hybrid Long-Short",
  "Titanium Hybrid Long-Short": "Titanium Hybrid Long-Short",
  "iSIF Hybrid Long-Short": "iSIF Hybrid Long-Short",
  "DynaSIF Equity Long-Short": "DynaSIF Equity Long-Short",
  "Diviniti Equity Long-Short": "Diviniti Equity Long Short",
  "qSIF Equity Long-Short": "qSIF Equity Long Short",
  "Arudha Equity Long-Short": "Arudha Equity Long-Short",
  "iSIF Ex-Top 100 Long-Short": "iSIF Ex-Top 100 Long-Short",
  "qSIF Ex-Top 100 Long-Short": "qSIF Ex-Top 100 Long-Short",
};

function lookupNav(liveData: SifNavEntry[], fundName: string, fallback: number): number {
  const apiName = NAV_KEY_MAP[fundName] ?? fundName;
  const match = liveData.find((f) => f.fund === apiName);
  return match?.nav ?? fallback;
}

const baseFundData: { category: string; tag: string; funds: Fund[] }[] = [
  {
    category: "Hybrid Long Short",
    tag: "hybrid",
    funds: [
      { name: "Altiva Hybrid Long-Short", inception: "24-Oct-25", endNav: 10.5455, m1: 3.17, m3: 2.32, sinceInception: 5.35, href: "/sifs/altiva-hybrid-long-short" },
      { name: "Apex Hybrid Long-Short", inception: "30-Mar-26", endNav: 10.0600, m1: 0.40, m3: null, sinceInception: 0.40, href: "/sifs/apex-hybrid-long-short" },
      { name: "Arudha Hybrid Long-Short", inception: "04-Feb-26", endNav: 10.1290, m1: 0.38, m3: null, sinceInception: 0.95, href: "/sifs/arudha-hybrid-long-short" },
      { name: "Magnum Hybrid Long-Short", inception: "29-Oct-25", endNav: 10.2218, m1: 2.28, m3: 0.84, sinceInception: 1.85, href: "/sifs/magnum-hybrid-long-short" },
      { name: "qSIF Hybrid Long-Short", inception: "20-Oct-25", endNav: 10.5297, m1: 6.94, m3: 6.48, sinceInception: 5.10, href: "/sifs/qsif-hybrid-long-short" },
      { name: "Titanium Hybrid Long-Short", inception: "17-Dec-25", endNav: 9.9291, m1: 5.51, m3: -0.35, sinceInception: -0.74, href: "/sifs/titanium-hybrid-long-short" },
      { name: "iSIF Hybrid Long-Short", inception: "05-Feb-26", endNav: 9.9185, m1: 7.45, m3: null, sinceInception: -0.99, href: "/sifs/isif/hybrid" },
    ],
  },
  {
    category: "Equity Long Short",
    tag: "equity",
    funds: [
      { name: "qSIF Equity Long-Short", inception: "08-Oct-25", endNav: 10.1492, m1: 13.68, m3: 4.35, sinceInception: 1.44, href: "/sifs/qsif-equity-long-short" },
      { name: "DynaSIF Equity Long-Short", inception: "27-Feb-26", endNav: 10.1990, m1: 6.59, m3: null, sinceInception: 1.92, href: "/sifs/dyna-equity-long-short" },
      { name: "Arudha Equity Long-Short", inception: "30-Mar-26", endNav: 10.1630, m1: 3.42, m3: null, sinceInception: 3.43, href: "/sifs/arudha-equity-long-short" },
      { name: "Diviniti Equity Long-Short", inception: "03-Dec-25", endNav: 955.1524, m1: 0.71, m3: -3.64, sinceInception: -4.58, href: "/sifs/diviniti-equity-long-short" },
    ],
  },
  {
    category: "Equity Ex-Top 100",
    tag: "extop",
    funds: [
      { name: "iSIF Ex-Top 100 Long-Short", inception: "05-Feb-26", endNav: 9.8200, m1: 8.87, m3: null, sinceInception: -1.70, href: "/sifs/isif/extop100" },
      { name: "qSIF Ex-Top 100 Long-Short", inception: "13-Nov-25", endNav: 9.9324, m1: 15.38, m3: 5.65, sinceInception: -0.79, href: "/sifs/qsif-ex-top-100-long-short" },
    ],
  },
  {
    category: "Active Asset Allocator",
    tag: "aaa",
    funds: [
      { name: "DynaSIF Active Asset Allocator", inception: "30-Mar-26", endNav: 10.1242, m1: 1.02, m3: null, sinceInception: 1.03, href: "/sifs/dyna-active-asset-allocator" },
      { name: "qSIF Active Asset Allocator", inception: "24-Apr-26", endNav: 10.0072, m1: null, m3: null, sinceInception: -0.04, href: "/sifs/qsif-active-asset-allocator-long-short" },
    ],
  },
];

const ALPHA_SHIELD_SCORES: Record<string, number | null> = {
  "Arudha Hybrid Long-Short": 10.0,
  "qSIF Hybrid Long-Short": 8.6,
  "Altiva Hybrid Long-Short": 7.8,
  "Magnum Hybrid Long-Short": 7.0,
  "DynaSIF Equity Long-Short": 6.1,
  "Titanium Hybrid Long-Short": 4.5,
  "iSIF Hybrid Long-Short": 4.4,
  "Apex Hybrid Long-Short": null,
  "Diviniti Equity Long-Short": 8.0,
  "Arudha Equity Long-Short": null,
  "qSIF Equity Long-Short": null,
  "iSIF Ex-Top 100 Long-Short": null,
  "qSIF Ex-Top 100 Long-Short": null,
  "DynaSIF Active Asset Allocator": null,
  "qSIF Active Asset Allocator": null,
};

const AlphaShieldCell = ({ fundName }: { fundName: string }) => {
  const score = ALPHA_SHIELD_SCORES[fundName] ?? null;
  if (score === null) return <span className="text-xs" style={{ color: "#9ca3af" }}>—</span>;
  const color = score >= 8.0 ? "#16a34a" : score >= 5.0 ? "#d97706" : "#dc2626";
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium tabular-nums" style={{ color }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      {score.toFixed(1)}
    </span>
  );
};

const indexData = [
  { name: "Nifty 50", m1: 7.49, m3: -5.15, y1: -0.28 },
  { name: "Nifty 500", m1: 10.52, m3: -1.59, y1: 3.96 },
  { name: "Nifty Midcap 150", m1: 13.24, m3: 2.52, y1: 11.40 },
  { name: "Nifty Smallcap 250", m1: 17.10, m3: 6.23, y1: 9.56 },
  { name: "Nifty Total Market", m1: 10.93, m3: -1.24, y1: 4.19 },
];

const ReturnCell = ({ value, bold = false }: { value: number | null; bold?: boolean }) => {
  if (value === null) return <span className="text-muted-foreground text-xs">—</span>;
  const isPositive = value > 0;
  const isNegative = value < 0;
  const colorClass = isPositive
    ? "text-emerald-600 dark:text-emerald-400"
    : isNegative
    ? "text-red-600 dark:text-red-400"
    : "text-muted-foreground";

  return (
    <span className={`tabular-nums ${colorClass} ${bold ? "font-bold text-sm" : "font-medium text-xs sm:text-sm"}`}>
      {isPositive ? "+" : ""}{value.toFixed(2)}%
    </span>
  );
};

const categoryBadgeColors: Record<string, string> = {
  hybrid: "text-blue-700 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/50 dark:border-blue-800/50",
  equity: "text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/50 dark:border-amber-800/50",
  extop: "text-purple-700 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/50 dark:border-purple-800/50",
  aaa: "text-teal-700 bg-teal-50 border-teal-200 dark:text-teal-400 dark:bg-teal-950/50 dark:border-teal-800/50",
};

type SortKey = "sinceInception" | "m1" | "m3" | null;

const SifReturnsScorecard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("sinceInception");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const { data: liveNavs } = useSifNav();

  // Merge live NAVs into fund data, falling back to hardcoded values
  const fundData = useMemo(() => {
    if (liveNavs.length === 0) return baseFundData;
    return baseFundData.map((group) => ({
      ...group,
      funds: group.funds.map((f) => ({
        ...f,
        endNav: lookupNav(liveNavs, f.name, f.endNav),
      })),
    }));
  }, [liveNavs]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const filteredData = useMemo(() => {
    const groups = activeTab === "all" ? fundData : fundData.filter(g => g.tag === activeTab);
    if (!sortKey) return groups;
    return groups.map(g => ({
      ...g,
      funds: [...g.funds].sort((a, b) => {
        const aV = a[sortKey] ?? -Infinity;
        const bV = b[sortKey] ?? -Infinity;
        return sortDir === "desc" ? bV - aV : aV - bV;
      }),
    }));
  }, [activeTab, sortKey, sortDir, fundData]);

  const topPerformer = useMemo(() => {
    let best: Fund | null = null;
    fundData.forEach(g => g.funds.forEach(f => {
      if (!best || f.sinceInception > best.sinceInception) best = f;
    }));
    return best as Fund | null;
  }, [fundData]);

  const SortableHead = ({ label, sublabel, col, className = "" }: { label: string; sublabel?: string; col: SortKey; className?: string }) => (
    <TableHead className={`text-right cursor-pointer select-none hover:text-foreground transition-colors ${className}`} onClick={() => handleSort(col)}>
      <span className="inline-flex items-center gap-0.5">
        <span className="flex flex-col items-end leading-tight">
          <span>{label}</span>
          {sublabel && <span className="text-[10px] text-muted-foreground font-normal">{sublabel}</span>}
        </span>
        {sortKey === col ? (
          sortDir === "desc" ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-40" />
        )}
      </span>
    </TableHead>
  );

  return (
    <section id="sif-returns-scorecard" className="py-8 sm:py-12 lg:py-16 bg-background scroll-mt-28">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-3">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Performance Tracker</span>
          </div>
          <a href="/sifreturns" className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground hover:text-primary transition-colors">
            SIF Returns Scorecard
          </a>
          <p className="text-sm text-muted-foreground mt-1">
            Absolute returns (%) • Data as of 30-Apr-2026
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            1M: 01-Apr-2026 to 30-Apr-2026 &nbsp;|&nbsp; 3M: 01-Feb-2026 to 30-Apr-2026 &nbsp;|&nbsp; Overall: Inception to 30-Apr-2026
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1.5 italic">
            Alpha Shield reflects each fund&apos;s capital protection during the March 2026 market crash (Nifty -11.30%). It is a stress-test snapshot, not a monthly metric — next refresh on the next ≥5% Nifty drawdown. Score out of 10.
          </p>
        </div>

        {/* Top performer */}
        {topPerformer && (
          <div className="mb-6 rounded-xl border border-emerald-200 dark:border-emerald-800/50 bg-gradient-to-r from-emerald-50 via-background to-emerald-50 dark:from-emerald-950/30 dark:via-background dark:to-emerald-950/30 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold">Top Performer</p>
                <p className="text-sm font-bold text-foreground">{topPerformer.name}</p>
              </div>
            </div>
            <div className="sm:ml-auto flex items-center gap-2">
              <ReturnCell value={topPerformer.sinceInception} bold />
              <span className="text-xs text-muted-foreground">since inception</span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-9 bg-muted/60">
              <TabsTrigger value="all" className="text-xs px-3">All Funds</TabsTrigger>
              <TabsTrigger value="hybrid" className="text-xs px-3">Hybrid</TabsTrigger>
              <TabsTrigger value="equity" className="text-xs px-3">Equity</TabsTrigger>
              <TabsTrigger value="extop" className="text-xs px-3">Ex-Top 100</TabsTrigger>
              <TabsTrigger value="aaa" className="text-xs px-3">Active AA</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Fund tables by category */}
        <div className="space-y-6">
          {filteredData.map(group => (
            <div key={group.tag} className="rounded-xl border bg-card shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
              <div className="px-4 py-3 border-b bg-muted/40 flex items-center gap-3">
                <Badge variant="secondary" className={`text-xs font-semibold ${categoryBadgeColors[group.tag]}`}>
                  {group.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{group.funds.length} fund{group.funds.length > 1 ? "s" : ""}</span>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Fund Name</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">Inception Date</TableHead>
                    <TableHead className="text-right hidden sm:table-cell">End NAV (₹)</TableHead>
                    <SortableHead label="1M Return" sublabel="(April 2026)" col="m1" />
                    <SortableHead label="3M Return" sublabel="(Feb–Apr)" col="m3" />
                    <SortableHead label="Since Inception" col="sinceInception" />
                    <TableHead className="text-right hidden sm:table-cell">🛡 Alpha Shield</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.funds.map(fund => (
                    <TableRow key={fund.name} className="group cursor-pointer" onClick={() => window.location.href = fund.href}>
                      <TableCell>
                        <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                          {fund.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 sm:hidden">
                          {fund.inception}
                        </p>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground hidden sm:table-cell">
                        {fund.inception}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm font-medium text-foreground hidden sm:table-cell">
                        ₹{fund.endNav.toLocaleString("en-IN", { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
                      </TableCell>
                      <TableCell className="text-right"><ReturnCell value={fund.m1} /></TableCell>
                      <TableCell className="text-right"><ReturnCell value={fund.m3} /></TableCell>
                      <TableCell className="text-right"><ReturnCell value={fund.sinceInception} bold /></TableCell>
                      <TableCell className="text-right hidden sm:table-cell"><AlphaShieldCell fundName={fund.name} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </div>
          ))}
        </div>

        {/* Benchmark table */}
        <div className="mt-8 rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b bg-muted/40">
            <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider">
              Benchmark Indices
            </Badge>
          </div>
          <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40%]">Index</TableHead>
                <TableHead className="text-right">1M</TableHead>
                <TableHead className="text-right">3M</TableHead>
                <TableHead className="text-right">1Y</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {indexData.map(idx => (
                <TableRow key={idx.name}>
                  <TableCell className="font-medium text-sm text-foreground">{idx.name}</TableCell>
                  <TableCell className="text-right"><ReturnCell value={idx.m1} /></TableCell>
                  <TableCell className="text-right"><ReturnCell value={idx.m3} /></TableCell>
                  <TableCell className="text-right"><ReturnCell value={idx.y1} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 rounded-lg bg-muted/30 border border-border/40 p-3 space-y-2">
          <p className="text-xs text-muted-foreground font-medium">
            Source: AMFI, niftyindices.com • NAV as of April 30th, 2026 • Returns as of April 30th, 2026
          </p>
          <p className="text-[10px] text-muted-foreground/80 leading-relaxed italic">
            Note: Start NAV taken as first available trading day on or after the period start date. Diviniti NAV is on a 1000-base face value. N/A = Fund launched after period start / insufficient data.
          </p>
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed">
            Disclaimer: Investments in specialized investment fund involves relatively higher risk including potential loss of capital, liquidity risk and market volatility. Please read all investment strategy related documents carefully before making the investment decision. Past Performance is not indicative of future returns. NAVs taken are for Direct Plan Growth Option.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SifReturnsScorecard;
