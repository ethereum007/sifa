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
