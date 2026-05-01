"use client";

import { useMemo, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { SIFund } from "@/lib/sifData";
import { niftyMonthlyReturns } from "@/lib/benchmarkData";

interface MonthlyHeatmapProps {
  funds: SIFund[];
  showNifty?: boolean;
  mode: "single" | "all";
}

type Theme = "dark" | "light";

const MONTHS = [
  "Oct 2025",
  "Nov 2025",
  "Dec 2025",
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
];

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

interface ThemeColors {
  bg: string;
  title: string;
  textMuted: string;
  textSubtle: string;
  textFund: string;
  catBg: string;
  inactive: string;
  noData: string;
  rowHover: string;
  border: string;
  stickyBg: string;
  toggleBg: string;
  toggleText: string;
}

function themeColors(theme: Theme): ThemeColors {
  if (theme === "light") {
    return {
      bg: "bg-white border border-slate-200",
      title: "text-slate-900",
      textMuted: "text-slate-600",
      textSubtle: "text-slate-500",
      textFund: "text-slate-900",
      catBg: "bg-slate-100",
      inactive: "bg-slate-100 text-slate-400",
      noData: "bg-slate-200 text-slate-500",
      rowHover: "hover:bg-slate-50",
      border: "border-slate-200",
      stickyBg: "bg-white",
      toggleBg: "bg-slate-100 hover:bg-slate-200",
      toggleText: "text-slate-700",
    };
  }
  return {
    bg: "bg-slate-900",
    title: "text-white",
    textMuted: "text-slate-400",
    textSubtle: "text-slate-500",
    textFund: "text-white",
    catBg: "bg-slate-800/50",
    inactive: "bg-slate-800 text-slate-600",
    noData: "bg-slate-700 text-slate-400",
    rowHover: "hover:bg-slate-800/30",
    border: "border-slate-700/50",
    stickyBg: "bg-slate-900",
    toggleBg: "bg-slate-800 hover:bg-slate-700",
    toggleText: "text-slate-300",
  };
}

function getHeatColor(value: number | null, isActive: boolean, c: ThemeColors): string {
  if (!isActive) return c.inactive;
  if (value === null) return c.noData;
  if (value >= 3) return "bg-emerald-600 text-white";
  if (value >= 1) return "bg-emerald-700 text-white";
  if (value >= 0) return "bg-emerald-800 text-emerald-200";
  if (value >= -2) return "bg-red-900 text-red-300";
  if (value >= -5) return "bg-red-800 text-red-200";
  return "bg-red-700 text-white";
}

function parseInceptionDate(dateStr: string): Date {
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr + "T00:00:00");
  }
  const parts = dateStr.split("-");
  if (parts.length === 3 && parts[1].length === 3) {
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

function ThemeToggle({ theme, onToggle, c }: { theme: Theme; onToggle: () => void; c: ThemeColors }) {
  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${c.toggleBg} ${c.toggleText}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

/* ─── SINGLE MODE ─── */

function SingleModeHeatmap({
  fund,
  showNifty,
  c,
}: {
  fund: SIFund;
  showNifty?: boolean;
  c: ThemeColors;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={`text-left ${c.textMuted} text-xs font-medium py-2 px-3 min-w-[120px]`}>
              Fund
            </th>
            {MONTHS.map((m) => (
              <th
                key={m}
                className={`text-center ${c.textMuted} text-xs font-medium py-2 px-3`}
              >
                {getMonthAbbrev(m)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`text-left ${c.textFund} text-sm font-medium py-1 px-3 whitespace-nowrap`}>
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
                    className={`rounded py-2 px-3 text-center text-sm font-medium cursor-default ${getHeatColor(value, isActive, c)}`}
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

          {showNifty && (
            <tr>
              <td className={`text-left ${c.textMuted} text-sm font-medium py-1 px-3 whitespace-nowrap`}>
                Nifty 50
              </td>
              {MONTHS.map((month) => {
                const value = niftyMonthlyReturns[month] ?? null;
                return (
                  <td key={month} className="py-1 px-1">
                    <div
                      className={`rounded py-2 px-3 text-center text-sm font-medium ${getHeatColor(value, true, c)}`}
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
  c,
}: {
  funds: SIFund[];
  showNifty?: boolean;
  c: ThemeColors;
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
            <th className={`text-left ${c.textMuted} text-xs font-medium py-2 px-3 sticky left-0 ${c.stickyBg} z-10 min-w-[140px]`}>
              Fund
            </th>
            {MONTHS.map((m) => (
              <th
                key={m}
                className={`text-center ${c.textMuted} text-xs font-medium py-2 px-3`}
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
                c={c}
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
  c,
}: {
  category: string;
  funds: SIFund[];
  showNifty?: boolean;
  c: ThemeColors;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={MONTHS.length + 1}
          className={`text-left text-xs font-bold tracking-wider ${c.textMuted} ${c.catBg} py-2 px-3 sticky left-0`}
        >
          {CATEGORY_HEADERS[category] ?? category.toUpperCase()}
        </td>
      </tr>

      {funds.map((fund) => (
        <tr key={fund.slug} className={`${c.rowHover} transition-colors`}>
          <td className={`text-left ${c.textFund} text-sm font-medium py-1 px-3 whitespace-nowrap sticky left-0 ${c.stickyBg} z-10`}>
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
                  className={`rounded py-2 px-3 text-center text-sm font-medium cursor-default ${getHeatColor(value, isActive, c)}`}
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

      {showNifty && (
        <tr className={`border-b ${c.border}`}>
          <td className={`text-left ${c.textSubtle} text-sm italic py-1 px-3 whitespace-nowrap sticky left-0 ${c.stickyBg} z-10`}>
            Nifty 50
          </td>
          {MONTHS.map((month) => {
            const value = niftyMonthlyReturns[month] ?? null;
            return (
              <td key={month} className="py-1 px-1">
                <div
                  className={`rounded py-2 px-3 text-center text-sm font-medium ${getHeatColor(value, true, c)}`}
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
  const [theme, setTheme] = useState<Theme>("dark");
  const c = themeColors(theme);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className={`${c.bg} rounded-2xl p-4 sm:p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-bold ${c.title}`}>Monthly Returns Heatmap</h3>
        <ThemeToggle theme={theme} onToggle={toggle} c={c} />
      </div>
      {mode === "single" && funds.length >= 1 ? (
        <SingleModeHeatmap fund={funds[0]} showNifty={showNifty} c={c} />
      ) : (
        <AllModeHeatmap funds={funds} showNifty={showNifty} c={c} />
      )}
    </div>
  );
}
