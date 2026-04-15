import { createClient } from "@supabase/supabase-js";

// Read-only helpers for querying public.nav_snapshots.
// NAV history is public data; uses the anon/publishable key.

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "";

const supabase =
  SUPABASE_URL && SUPABASE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

export interface NavPoint {
  date: string;       // ISO YYYY-MM-DD
  navDirect: number | null;
  navRegular: number | null;
}

export interface TrailingReturns {
  oneMonth: number | null;       // %
  threeMonth: number | null;     // %
  sixMonth: number | null;       // %
  sinceInception: number | null; // %
  latestNav: number | null;
  latestDate: string | null;
  dataPoints: number;
}

/** Fetch chronological NAV history for a SIF. Empty array if no data / no client. */
export async function getNavHistory(sifId: string): Promise<NavPoint[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("nav_snapshots")
    .select("nav_date, nav_direct, nav_regular")
    .eq("sif_id", sifId)
    .order("nav_date", { ascending: true });
  if (error || !data) return [];
  return data.map((r: { nav_date: string; nav_direct: number | null; nav_regular: number | null }) => ({
    date: r.nav_date,
    navDirect: r.nav_direct,
    navRegular: r.nav_regular,
  }));
}

/** Given chronological history, compute trailing %returns using Direct NAV. */
export function computeTrailingReturns(
  history: NavPoint[],
  inceptionNav: number | null | undefined,
): TrailingReturns {
  const clean = history.filter((p) => p.navDirect != null) as Array<NavPoint & { navDirect: number }>;
  if (clean.length === 0) {
    return {
      oneMonth: null, threeMonth: null, sixMonth: null,
      sinceInception: null, latestNav: null, latestDate: null, dataPoints: 0,
    };
  }
  const latest = clean[clean.length - 1];
  const latestTs = new Date(latest.date).getTime();

  // Find closest point on/before target date
  const navAtOrBefore = (daysBack: number): number | null => {
    const target = latestTs - daysBack * 86_400_000;
    let best: typeof clean[number] | null = null;
    for (const p of clean) {
      if (new Date(p.date).getTime() <= target) best = p;
      else break;
    }
    return best?.navDirect ?? null;
  };

  const pct = (from: number | null, to: number) =>
    from != null && from > 0 ? ((to / from - 1) * 100) : null;

  const firstNav = clean[0].navDirect;
  // Prefer face-value baseline if supplied (handles funds like Diviniti @ ₹1000)
  const siBase = inceptionNav != null && inceptionNav > 0 ? inceptionNav : firstNav;

  return {
    oneMonth:       pct(navAtOrBefore(30),  latest.navDirect),
    threeMonth:     pct(navAtOrBefore(91),  latest.navDirect),
    sixMonth:       pct(navAtOrBefore(182), latest.navDirect),
    sinceInception: pct(siBase,             latest.navDirect),
    latestNav: latest.navDirect,
    latestDate: latest.date,
    dataPoints: clean.length,
  };
}

/** Compute month-end return series. Returns { "YYYY-MM": pct } keyed by month. */
export function computeMonthlyReturns(
  history: NavPoint[],
  inceptionNav: number | null | undefined,
): Record<string, number | null> {
  const clean = history.filter((p) => p.navDirect != null) as Array<NavPoint & { navDirect: number }>;
  if (clean.length === 0) return {};

  // Group by YYYY-MM, keep last NAV of each month
  const byMonth = new Map<string, { date: string; nav: number }>();
  for (const p of clean) {
    const key = p.date.slice(0, 7); // YYYY-MM
    const prev = byMonth.get(key);
    if (!prev || p.date > prev.date) byMonth.set(key, { date: p.date, nav: p.navDirect });
  }

  const months = [...byMonth.keys()].sort();
  const result: Record<string, number | null> = {};
  let prevNav: number | null = inceptionNav ?? null;

  for (const m of months) {
    const endNav = byMonth.get(m)!.nav;
    if (prevNav != null && prevNav > 0) {
      result[m] = (endNav / prevNav - 1) * 100;
    } else {
      result[m] = null;
    }
    prevNav = endNav;
  }
  return result;
}
