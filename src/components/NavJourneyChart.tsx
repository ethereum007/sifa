"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import { SIFund } from "@/lib/sifData";
import { getBenchmarkForFund, niftyMonthlyReturns } from "@/lib/benchmarkData";

interface NavJourneyChartProps {
  funds: SIFund[];
  showBenchmark?: boolean;
  /** @deprecated use showBenchmark instead */
  showNifty?: boolean;
  height?: number;
}

const FUND_COLORS = [
  "#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
  "#14b8a6", "#e11d48", "#0ea5e9", "#a855f7",
];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  Hybrid: "Hybrid",
  Equity: "Equity",
  "Ex-Top 100": "Ex-Top 100",
};

interface SingleFundTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; name: string }>;
  label?: string;
  fundName: string;
  benchmarkName: string;
  inceptionNav: number;
}

function SingleFundTooltip({ active, payload, label, fundName, benchmarkName, inceptionNav }: SingleFundTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const fundEntry = payload.find((p) => p.dataKey === "fundNav");
  const bmEntry = payload.find((p) => p.dataKey === "benchmarkNav");

  const fundNav = fundEntry?.value ?? null;
  const bmNav = bmEntry?.value ?? null;

  const fundReturn = fundNav !== null ? (((fundNav - inceptionNav) / inceptionNav) * 100).toFixed(2) : "—";
  const bmReturn = bmNav !== null ? (((bmNav - inceptionNav) / inceptionNav) * 100).toFixed(2) : "—";

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm shadow-xl">
      <p className="text-slate-300 font-medium mb-1">{label}</p>
      {fundNav !== null && (
        <p className="text-emerald-400">
          {fundName}: ₹{fundNav.toFixed(4)} ({fundReturn}%)
        </p>
      )}
      {bmNav !== null && (
        <p className="text-gray-400">
          {benchmarkName}: ₹{bmNav.toFixed(4)} ({bmReturn}%)
        </p>
      )}
    </div>
  );
}

interface MultiFundTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; name: string; color: string }>;
  label?: string;
}

function MultiFundTooltip({ active, payload, label }: MultiFundTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm shadow-xl max-h-64 overflow-y-auto">
      <p className="text-slate-300 font-medium mb-2">{label}</p>
      {payload.map((entry) => {
        const returnPct = ((entry.value - 10) / 10 * 100).toFixed(2);
        return (
          <p key={entry.dataKey} style={{ color: entry.color }} className="leading-relaxed">
            {entry.name}: ₹{entry.value.toFixed(2)} ({returnPct}%)
          </p>
        );
      })}
    </div>
  );
}

export default function NavJourneyChart({ funds, showBenchmark, showNifty, height }: NavJourneyChartProps) {
  // Support both old showNifty and new showBenchmark prop
  const showBm = showBenchmark ?? showNifty ?? true;

  if (funds.length === 1) {
    return <SingleFundChart fund={funds[0]} showBenchmark={showBm} height={height} />;
  }

  return <MultiFundChart funds={funds} showBenchmark={showBm} height={height} />;
}

/* ─── SINGLE FUND MODE ─── */

function SingleFundChart({
  fund,
  showBenchmark,
  height,
}: {
  fund: SIFund;
  showBenchmark?: boolean;
  height?: number;
}) {
  const benchmarkInfo = getBenchmarkForFund(fund.benchmark);

  const data = useMemo(() => {
    if (!fund.navHistory || fund.navHistory.length === 0) return [];

    const startNav = fund.navHistory[0]?.nav ?? 10;
    let bmNav: number = startNav;

    return fund.navHistory.map((point) => {
      const bmReturn = benchmarkInfo.monthlyReturns[point.month] ?? 0;
      bmNav = bmNav * (1 + bmReturn / 100);

      return {
        month: point.month,
        fundNav: point.nav,
        benchmarkNav: showBenchmark ? parseFloat(bmNav.toFixed(4)) : undefined,
      };
    });
  }, [fund, showBenchmark, benchmarkInfo]);

  const inceptionNav = fund.navHistory?.[0]?.nav ?? 10;

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-6">
      <h3 className="text-lg font-bold text-white mb-4">NAV Journey Since Inception</h3>
      <ResponsiveContainer width="100%" height={height || 300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={["auto", "auto"]} />
          <Tooltip
            content={
              <SingleFundTooltip
                fundName={fund.shortName}
                benchmarkName={benchmarkInfo.shortName}
                inceptionNav={inceptionNav}
              />
            }
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="fundNav"
            stroke="#0e7c6a"
            strokeWidth={2}
            dot={false}
            name={fund.shortName}
          />
          {showBenchmark && (
            <Line
              type="monotone"
              dataKey="benchmarkNav"
              stroke="#6b7280"
              strokeDasharray="5 5"
              strokeWidth={1.5}
              dot={false}
              name={`${benchmarkInfo.shortName} (Normalized)`}
            />
          )}
          <ReferenceLine
            x="Mar 2026"
            stroke="#ef4444"
            strokeDasharray="3 3"
            label={{ value: "📉 Crash", fill: "#ef4444", fontSize: 11 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ─── MULTI FUND MODE ─── */

function MultiFundChart({
  funds,
  showBenchmark,
  height,
}: {
  funds: SIFund[];
  showBenchmark?: boolean;
  height?: number;
}) {
  const [visibleFunds, setVisibleFunds] = useState<Set<string>>(() => new Set(funds.map((f) => f.slug)));
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const filteredFunds = useMemo(() => {
    if (categoryFilter === "All") return funds;
    return funds.filter((f) => {
      const cat = f.category?.toLowerCase() ?? "";
      const filter = categoryFilter.toLowerCase();
      return cat.includes(filter.toLowerCase());
    });
  }, [funds, categoryFilter]);

  const toggleFund = (slug: string) => {
    setVisibleFunds((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  // Build unified month list from all funds
  const { data, niftyDataKey } = useMemo(() => {
    const allMonths = new Set<string>();
    funds.forEach((fund) => {
      fund.navHistory?.forEach((point) => allMonths.add(point.month));
    });

    const monthsArray = Array.from(allMonths);
    const monthOrder = [
      "Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026",
      "Feb 2026", "Mar 2026", "Apr 2026", "May 2026",
      "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026",
    ];
    monthsArray.sort((a, b) => {
      const ia = monthOrder.indexOf(a);
      const ib = monthOrder.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    // Build normalized data: each fund starts at 10
    const dataPoints = monthsArray.map((month) => {
      const point: Record<string, string | number | undefined> = { month };

      funds.forEach((fund) => {
        if (!fund.navHistory) return;
        const inceptionNav = fund.navHistory[0]?.nav ?? 10;
        const navPoint = fund.navHistory.find((p) => p.month === month);
        if (navPoint) {
          point[fund.slug] = navPoint.nav != null ? parseFloat(((navPoint.nav / inceptionNav) * 10).toFixed(4)) : undefined;
        }
      });

      return point;
    });

    // In multi-fund mode, show Nifty 50 as common reference (since funds have different benchmarks)
    let niftyVal = 10;
    dataPoints.forEach((point) => {
      const monthKey = point.month as string;
      const niftyReturn = niftyMonthlyReturns[monthKey] ?? 0;
      niftyVal = niftyVal * (1 + niftyReturn / 100);
      point["nifty50"] = parseFloat(niftyVal.toFixed(4));
    });

    return { data: dataPoints, niftyDataKey: "nifty50" };
  }, [funds]);

  const categories = ["All", "Hybrid", "Equity", "Ex-Top 100"];

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-6">
      <h3 className="text-lg font-bold text-white mb-4">NAV Journey — Compare SIFs vs Nifty 50</h3>

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2 mb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              categoryFilter === cat
                ? "bg-emerald-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-300"
            }`}
          >
            {CATEGORY_LABELS[cat] ?? cat}
          </button>
        ))}
      </div>

      {/* Fund toggle pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filteredFunds.map((fund, idx) => {
          const color = FUND_COLORS[funds.indexOf(fund) % FUND_COLORS.length];
          const isVisible = visibleFunds.has(fund.slug);
          return (
            <button
              key={fund.slug}
              onClick={() => toggleFund(fund.slug)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                isVisible
                  ? "border-transparent text-white"
                  : "border-slate-600 text-slate-500 bg-transparent"
              }`}
              style={isVisible ? { backgroundColor: color } : {}}
            >
              {fund.shortName}
            </button>
          );
        })}
      </div>

      <ResponsiveContainer width="100%" height={height || 400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} domain={["auto", "auto"]} />
          <Tooltip content={<MultiFundTooltip />} />
          <Legend />

          {funds.map((fund, idx) => {
            const color = FUND_COLORS[idx % FUND_COLORS.length];
            if (!visibleFunds.has(fund.slug)) return null;
            return (
              <Line
                key={fund.slug}
                type="monotone"
                dataKey={fund.slug}
                stroke={color}
                strokeWidth={2}
                dot={false}
                name={fund.shortName}
                connectNulls={false}
              />
            );
          })}

          {showBenchmark && (
            <Line
              type="monotone"
              dataKey={niftyDataKey}
              stroke="#6b7280"
              strokeDasharray="5 5"
              strokeWidth={2.5}
              dot={false}
              name="Nifty 50"
            />
          )}

          <ReferenceLine
            x="Mar 2026"
            stroke="#ef4444"
            strokeDasharray="3 3"
            label={{ value: "📉 Crash", fill: "#ef4444", fontSize: 11 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
