import { useState, useEffect } from "react";

export interface SifNavEntry {
  amc: string;
  fund: string;
  nav: number;
  navRegular: number;
  date: string;
  category: string;
  type?: string;
}

let cachedData: SifNavEntry[] | null = null;

export function useSifNav() {
  const [data, setData] = useState<SifNavEntry[]>(cachedData ?? []);
  const [isLive, setIsLive] = useState(!!cachedData);

  useEffect(() => {
    if (cachedData) return;
    fetch("/api/nav")
      .then((res) => res.json())
      .then((json) => {
        if (json.funds?.length > 0) {
          cachedData = json.funds;
          setData(json.funds);
          setIsLive(true);
        }
      })
      .catch(() => {});
  }, []);

  return { data, isLive };
}

export function getNavByFund(data: SifNavEntry[], fundName: string): number | null {
  const lower = fundName.toLowerCase();
  const match = data.find((f) => f.fund.toLowerCase().includes(lower));
  return match?.nav ?? null;
}

/**
 * Convenience hook for individual fund pages.
 * Returns the live NAV + date for a single fund, falling back to the static value
 * if the API hasn't loaded yet.
 *
 * @param apiName  exact `fund` field name as returned by /api/nav
 * @param fallback static currentNav from sifData.ts (used until live data arrives)
 * @returns { nav, date, isLive }
 */
export function useFundNav(
  apiName: string,
  fallback: number
): { nav: number; date: string; isLive: boolean } {
  const { data, isLive } = useSifNav();
  if (!isLive) return { nav: fallback, date: "", isLive: false };
  const lower = apiName.toLowerCase();
  const match = data.find((f) => f.fund.toLowerCase() === lower);
  if (!match) return { nav: fallback, date: "", isLive: false };
  return { nav: match.nav, date: match.date, isLive: true };
}

/**
 * Format an "04-May-2026" string from /api/nav into "May 4, 2026".
 * Returns the original string if it doesn't match the expected pattern.
 */
export function formatNavDate(navDate: string): string {
  if (!navDate) return "";
  const m = navDate.match(/^(\d{2})-([A-Za-z]{3})-(\d{4})$/);
  if (!m) return navDate;
  const [, dd, mon, yyyy] = m;
  const monthMap: Record<string, string> = {
    Jan: "January", Feb: "February", Mar: "March", Apr: "April",
    May: "May", Jun: "June", Jul: "July", Aug: "August",
    Sep: "September", Oct: "October", Nov: "November", Dec: "December",
  };
  const fullMonth = monthMap[mon] || mon;
  return `${fullMonth} ${parseInt(dd, 10)}, ${yyyy}`;
}
