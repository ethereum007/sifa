"use client";

/**
 * Lazy wrapper around NavJourneyChart so recharts isn't pulled into
 * the initial JS bundle for every page that mounts a NAV chart.
 *
 * Drop-in replacement: import the same way you'd import the original.
 *
 *   import NavJourneyChart from "@/components/NavJourneyChartLazy";
 */

import dynamic from "next/dynamic";

const NavJourneyChart = dynamic(() => import("./NavJourneyChart"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px] rounded-2xl bg-muted/20 border border-border/40">
      <div className="text-sm text-muted-foreground animate-pulse">
        Loading NAV chart…
      </div>
    </div>
  ),
});

export default NavJourneyChart;
