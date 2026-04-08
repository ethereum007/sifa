"use client";

import { useMemo } from "react";
import { SIFund } from "@/lib/sifData";
import { niftyMonthlyReturns } from "@/lib/benchmarkData";

interface MonthlyHeatmapProps {
  funds: SIFund[];
  showNifty?: boolean;
  mode: "single" | "all";
}

const MONTHS = [
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
];

/* Map month label to approximate start date for inception comparison */
const MONTH_START_DATES: Record<string, Date> = {
  "Oct 2025": new Date(2025, 9, 1),
  "Nov 2025": new Date(2025, 10, 1),
  "Dec 2025": new Date(2025, 11, 1),
  "Jan 2026": new Date(2026, 0, 1),
  "Feb 2026": new Date(2026, 1, 1),
  "Mar 2026": new Date(2026, 2, 1),
  "Apr 2026": new Date(2026, 3, 1),
};

const CATEGORY_ORDER = [
  "Hybrid Long Short",
  "Equity Long Short",
  "Equity Ex-Top 100",
  "Active Asset Allocator",
];

const CATEGORY_HEADERS: Record<string, string> = {
  "Hybrid Long Short": "HYBRID LONG SHORT",
  "Equity Long Short": "EQUITY LONG SHORT",
  "Equity Ex-Top 100": "EQUITY EX-TOP 100",
  "Active Asset Allocator": "ACTIVE ASSET ALLOCATOR",
};

function getHeatColor(value: number | null, isActive: boolean): string {
  if (!isActive) return "bg-slate-800 text-slate-600";
  if (value === null) return "bg-slate-700 text-slate-400";
  if (value >= 3) return "bg-emerald-600 text-white";
  if (value >= 1) return "bg-emerald-700 text-white";
  if (value >= 0) return "bg-emerald-800 text-emerald-200";
  if (value >= -2) return "bg-red-900 text-red-300";
  if (value >= -5) return "bg-red-800 text-red-200";
  return "bg-red-700 text-white";
}

function parseInceptionDate(dateStr: string): Date {
  // Handle format like "24-Oct-25" or "04-Feb-26"
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthMap: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const month = monthMap[parts[1]] ?? 0;
    const yearShort = parseInt(parts[2], 10);
    const year = yearShort >= 50 ? 1900 + yearShort : 2000 + yearShort;
    return new Date(year, month, day);
  }
  return new Date(dateStr);
}

function isFundActiveInMonth(fund: SIFund, month: string): boolean {
  const monthStart = MONTH_START_DATES[month];
  if (!monthStart) return false;
  const inception = parseInceptionDate(fund.inceptionDate);
  // Fund is active if inception is before the end of that month
  const monthEnd = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 0);
  return inception <= monthEnd;
}

function getFundMonthlyReturn(fund: SIFund, month: string): number | null {
  if (!fund.monthlyReturns) return null;
  return fund.monthlyReturns[month] ?? null;
}

function getMonthAbbrev(month: string): string {
  const parts = month.split(" ");
  return parts[0].substring(0, 3) + " " + parts[1]?.slice(-2);
}

function formatReturn(value: number | null): string {
  if (value === null) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/* ─── SINGLE MODE ─── */

function SingleModeHeatmap({
  fund,
  showNifty,
}: {
  fund: SIFund;
  showNifty?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left text-slate-400 text-xs font-medium py-2 px-3 min-w-[120px]">
              Fund
            </th>
            {MONTHS.map((m) => (
              <th
                key={m}
                className="text-center text-slate-400 text-xs font-medium py-2 px-3"
              >
                {getMonthAbbrev(m)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Fund row */}
          <tr>
            <td className="text-left text-white text-sm font-medium py-1 px-3 whitespace-nowrap">
              {fund.shortName}
            </td>
            {MONTHS.map((month) => {
              const isActive = isFundActiveInMonth(fund, month);
              const value = isActive ? getFundMonthlyReturn(fund, month) : null;
              const niftyValue = niftyMonthlyReturns[month] ?? null;
              const alpha = value !== null && niftyValue !== null ? value - niftyValue : null;

              return (
                <td key={month} className="py-1 px-1">
                  <div
                    className={`rounded py-2 px-3 text-center text-sm font-medium cursor-default ${getHeatColor(value, isActive)}`}
                    title={
                      isActive
                        ? `${month}: ${formatReturn(value)} (Nifty: ${formatReturn(niftyValue)} | Alpha: ${alpha !== null ? formatReturn(alpha) : "—"})`
                        : `${month}: Not yet launched`
                    }
                  >
                    {isActive ? (value !== null ? formatReturn(value) : "—") : "—"}
                  </div>
                </td>
              );
            })}
          </tr>

          {/* Nifty row */}
          {showNifty && (
            <tr>
              <td className="text-left text-slate-400 text-sm font-medium py-1 px-3 whitespace-nowrap">
                Nifty 50
              </td>
              {MONTHS.map((month) => {
                const value = niftyMonthlyReturns[month] ?? null;
                return (
                  <td key={month} className="py-1 px-1">
                    <div
                      className={`rounded py-2 px-3 text-center text-sm font-medium ${getHeatColor(value, true)}`}
                      title={`${month}: ${formatReturn(value)}`}
                    >
                      {value !== null ? formatReturn(value) : "—"}
                    </div>
                  </td>
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ─── ALL MODE ─── */

function AllModeHeatmap({
  funds,
  showNifty,
}: {
  funds: SIFund[];
  showNifty?: boolean;
}) {
  const groupedFunds = useMemo(() => {
    const groups: Record<string, SIFund[]> = {};

    CATEGORY_ORDER.forEach((cat) => {
      groups[cat] = [];
    });

    funds.forEach((fund) => {
      const category = fund.category ?? "Hybrid Long Short";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(fund);
    });

    // Sort each category by inception date (oldest first)
    Object.keys(groups).forEach((cat) => {
      groups[cat].sort((a, b) => {
        const dateA = parseInceptionDate(a.inceptionDate);
        const dateB = parseInceptionDate(b.inceptionDate);
        return dateA.getTime() - dateB.getTime();
      });
    });

    return groups;
  }, [funds]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse min-w-[640px]">
        <thead>
          <tr>
            <th className="text-left text-slate-400 text-xs font-medium py-2 px-3 sticky left-0 bg-slate-900 z-10 min-w-[140px]">
              Fund
            </th>
            {MONTHS.map((m) => (
              <th
                key={m}
                className="text-center text-slate-400 text-xs font-medium py-2 px-3"
              >
                {getMonthAbbrev(m)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CATEGORY_ORDER.map((category) => {
            const categoryFunds = groupedFunds[category];
            if (!categoryFunds || categoryFunds.length === 0) return null;

            return (
              <FundCategoryGroup
                key={category}
                category={category}
                funds={categoryFunds}
                showNifty={showNifty}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function FundCategoryGroup({
  category,
  funds,
  showNifty,
}: {
  category: string;
  funds: SIFund[];
  showNifty?: boolean;
}) {
  return (
    <>
      {/* Category header row */}
      <tr>
        <td
          colSpan={MONTHS.length + 1}
          className="text-left text-xs font-bold tracking-wider text-slate-400 bg-slate-800/50 py-2 px-3 sticky left-0"
        >
          {CATEGORY_HEADERS[category] ?? category.toUpperCase()}
        </td>
      </tr>

      {/* Fund rows */}
      {funds.map((fund) => (
        <tr key={fund.slug} className="hover:bg-slate-800/30 transition-colors">
          <td className="text-left text-white text-sm font-medium py-1 px-3 whitespace-nowrap sticky left-0 bg-slate-900 z-10">
            {fund.shortName}
          </td>
          {MONTHS.map((month) => {
            const isActive = isFundActiveInMonth(fund, month);
            const value = isActive ? getFundMonthlyReturn(fund, month) : null;
            const niftyValue = niftyMonthlyReturns[month] ?? null;
            const alpha = value !== null && niftyValue !== null ? value - niftyValue : null;

            return (
              <td key={month} className="py-1 px-1">
                <div
                  className={`rounded py-2 px-3 text-center text-sm font-medium cursor-default ${getHeatColor(value, isActive)}`}
                  title={
                    isActive
                      ? `${month}: ${formatReturn(value)} (Nifty: ${formatReturn(niftyValue)} | Alpha: ${alpha !== null ? formatReturn(alpha) : "—"})`
                      : `${month}: Not yet launched`
                  }
                >
                  {isActive ? (value !== null ? formatReturn(value) : "—") : "—"}
                </div>
              </td>
            );
          })}
        </tr>
      ))}

      {/* Nifty reference row */}
      {showNifty && (
        <tr className="border-b border-slate-700/50">
          <td className="text-left text-slate-500 text-sm italic py-1 px-3 whitespace-nowrap sticky left-0 bg-slate-900 z-10">
            Nifty 50
          </td>
          {MONTHS.map((month) => {
            const value = niftyMonthlyReturns[month] ?? null;
            return (
              <td key={month} className="py-1 px-1">
                <div
                  className={`rounded py-2 px-3 text-center text-sm font-medium ${getHeatColor(value, true)}`}
                  title={`${month}: ${formatReturn(value)}`}
                >
                  {value !== null ? formatReturn(value) : "—"}
                </div>
              </td>
            );
          })}
        </tr>
      )}
    </>
  );
}

/* ─── MAIN EXPORT ─── */

export default function MonthlyHeatmap({ funds, showNifty = true, mode }: MonthlyHeatmapProps) {
  if (mode === "single" && funds.length >= 1) {
    return (
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-white mb-4">Monthly Returns Heatmap</h3>
        <SingleModeHeatmap fund={funds[0]} showNifty={showNifty} />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-4 sm:p-6">
      <h3 className="text-lg font-bold text-white mb-4">Monthly Returns Heatmap</h3>
      <AllModeHeatmap funds={funds} showNifty={showNifty} />
    </div>
  );
}
