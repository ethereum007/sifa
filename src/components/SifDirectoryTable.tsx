"use client";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import AmcLogo from "@/components/AmcLogo";

type Status = "live" | "nfo";

interface Row {
  name: string;
  amc: string;
  strategy: string;
  min: string;
  status: Status;
  statusNote?: string; // e.g. NFO window
  href: string;
}

interface Group {
  category: string;
  rows: Row[];
}

const GROUPS: Group[] = [
  {
    category: "Hybrid Long Short",
    rows: [
      { name: "Altiva Hybrid Long-Short", amc: "Edelweiss Mutual Fund", strategy: "Arbitrage + directional equity + fixed income", min: "₹10L", status: "live", href: "/sifs/altiva-hybrid-long-short" },
      { name: "Magnum Hybrid Long-Short", amc: "SBI Mutual Fund", strategy: "Multi-asset hybrid with tactical equity hedging", min: "₹10L", status: "live", href: "/sifs/magnum-hybrid-long-short" },
      { name: "qSIF Hybrid Long-Short", amc: "Quant Mutual Fund", strategy: "Quant-driven multi-factor hybrid with short overlay", min: "₹10L", status: "live", href: "/sifs/qsif-hybrid-long-short" },
      { name: "Titanium Hybrid Long-Short", amc: "Tata Mutual Fund", strategy: "Conservative hybrid with systematic derivatives hedging", min: "₹10L", status: "live", href: "/sifs/titanium-hybrid-long-short" },
      { name: "Arudha Hybrid Long-Short", amc: "Bandhan Mutual Fund", strategy: "Balanced hybrid with pair-trade hedging", min: "₹10L", status: "live", href: "/sifs/arudha-hybrid-long-short" },
      { name: "iSIF Hybrid Long-Short", amc: "ICICI Prudential", strategy: "Balanced allocation with dynamic hedging framework", min: "₹10L", status: "live", href: "/sifs/isif/hybrid" },
      { name: "Apex Hybrid Long-Short", amc: "Aditya Birla Sun Life Mutual Fund", strategy: "ESF+ multi-strategy: arbitrage, directional, special situations", min: "₹10L", status: "live", href: "/sifs/apex-hybrid-long-short" },
    ],
  },
  {
    category: "Equity Long Short",
    rows: [
      { name: "qSIF Equity Long-Short", amc: "Quant Mutual Fund", strategy: "Quant long-short with momentum + mean-reversion", min: "₹10L", status: "live", href: "/sifs/qsif-equity-long-short" },
      { name: "Diviniti Equity Long-Short", amc: "ITI Mutual Fund", strategy: "Fundamental equity selection with systematic hedging", min: "₹10L", status: "live", href: "/sifs/diviniti-equity-long-short" },
      { name: "Dyna Equity Long-Short", amc: "360 ONE Asset", strategy: "Dynamic equity allocation with tactical short positions", min: "₹10L", status: "live", href: "/sifs/dyna-equity-long-short" },
      { name: "Arudha Equity Long-Short", amc: "Bandhan Mutual Fund", strategy: "Long-biased (80–100% equity) with ≤25% unhedged short", min: "₹10L", status: "live", href: "/sifs/arudha-equity-long-short" },
      { name: "Sapphire Equity Long-Short", amc: "Franklin Templeton", strategy: "Multi-factor quant + macro-driven allocation", min: "₹10L", status: "nfo", statusNote: "10–24 Apr 2026", href: "/sifs/sapphire-equity-long-short" },
      { name: "WSIF Equity Long-Short", amc: "The Wealth Company Mutual Fund", strategy: "Long-biased active management with ≤25% unhedged short", min: "₹10L", status: "nfo", statusNote: "15–29 Apr 2026", href: "/sifs/wsif-equity-long-short" },
      { name: "Titanium Equity Long-Short", amc: "Tata Mutual Fund", strategy: "Long-biased equity (80–100%) with ≤25% unhedged short via derivatives", min: "₹10L", status: "nfo", statusNote: "27 Apr–11 May 2026", href: "/sifs/titanium-equity-long-short" },
    ],
  },
  {
    category: "Equity Ex-Top 100",
    rows: [
      { name: "iSIF Ex-Top 100 Long-Short", amc: "ICICI Prudential", strategy: "Mid/small-cap alpha with systematic short overlay", min: "₹10L", status: "live", href: "/sifs/isif/extop100" },
      { name: "qSIF Ex-Top 100 Long-Short", amc: "Quant Mutual Fund", strategy: "Quant ex-top-100 long-short with derivative hedging", min: "₹10L", status: "live", href: "/sifs/qsif-ex-top-100-long-short" },
      { name: "WSIF Ex-Top 100 Long-Short", amc: "The Wealth Company Mutual Fund", strategy: "65–100% ex-top-100 equity + ≤25% non-large-cap short", min: "₹10L", status: "nfo", statusNote: "15–29 Apr 2026", href: "/sifs/wsif-ex-top-100-long-short" },
    ],
  },
  {
    category: "Active Asset Allocator",
    rows: [
      { name: "Dyna Active Asset Allocator", amc: "360 ONE Asset", strategy: "Dynamic asset allocation across equity, debt, commodities", min: "₹10L", status: "live", href: "/sifs/dyna-active-asset-allocator" },
      { name: "qSIF Active Asset Allocator", amc: "Quant Mutual Fund", strategy: "Quant-driven tactical allocation with long-short overlay", min: "₹10L", status: "live", href: "/sifs/qsif-active-asset-allocator-long-short" },
    ],
  },
];

const TOTAL_FUNDS = GROUPS.reduce((sum, g) => sum + g.rows.length, 0);
const TOTAL_AMCS = new Set(GROUPS.flatMap(g => g.rows.map(r => r.amc))).size;
const LIVE_COUNT = GROUPS.flatMap(g => g.rows).filter(r => r.status === "live").length;
const NFO_COUNT = TOTAL_FUNDS - LIVE_COUNT;

const StatusBadge = ({ status, note }: { status: Status; note?: string }) => {
  if (status === "nfo") {
    return (
      <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 border border-amber-200 rounded px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap">
        NFO OPEN{note ? <span className="text-amber-700 font-normal">· {note}</span> : null}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 border border-green-200 rounded px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap">
      LIVE
    </span>
  );
};

const SifDirectoryTable = () => {
  return (
    <section id="sif-directory" className="py-10 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Every SIF in India — At a Glance
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
              <span className="font-semibold text-foreground">{TOTAL_FUNDS} SIFs</span> from{" "}
              <span className="font-semibold text-foreground">{TOTAL_AMCS} AMCs</span> —{" "}
              <span className="text-green-700 font-semibold">{LIVE_COUNT} live</span>,{" "}
              <span className="text-amber-700 font-semibold">{NFO_COUNT} in NFO</span>.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 border-b border-border text-left">
                  <tr>
                    <th className="px-3 sm:px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[28%]">Fund</th>
                    <th className="px-3 sm:px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[22%]">AMC</th>
                    <th className="px-3 sm:px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">Strategy</th>
                    <th className="px-3 sm:px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell w-[90px]">Min</th>
                    <th className="px-3 sm:px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-[140px]">Status</th>
                    <th className="px-3 sm:px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground text-right w-[70px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {GROUPS.map((group) => (
                    <Fragment key={group.category}>
                      <tr className="bg-muted/30 border-t border-border">
                        <td colSpan={6} className="px-3 sm:px-4 py-2 font-semibold text-xs uppercase tracking-wider text-foreground">
                          {group.category} <span className="text-muted-foreground font-normal normal-case">· {group.rows.length} funds</span>
                        </td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={row.href} className="border-t border-border hover:bg-muted/20 transition-colors">
                          <td className="px-3 sm:px-4 py-3 align-middle">
                            <Link href={row.href} className="font-medium text-foreground hover:text-primary hover:underline">
                              {row.name}
                            </Link>
                          </td>
                          <td className="px-3 sm:px-4 py-3 align-middle text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <AmcLogo amc={row.amc} />
                              <span className="truncate">{row.amc}</span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-4 py-3 align-middle text-muted-foreground hidden md:table-cell">
                            {row.strategy}
                          </td>
                          <td className="px-3 sm:px-4 py-3 align-middle text-foreground font-mono tabular-nums hidden lg:table-cell">
                            {row.min}
                          </td>
                          <td className="px-3 sm:px-4 py-3 align-middle">
                            <StatusBadge status={row.status} note={row.statusNote} />
                          </td>
                          <td className="px-3 sm:px-4 py-3 align-middle text-right">
                            <Link href={row.href} className="inline-flex items-center gap-1 text-primary hover:underline font-medium text-xs">
                              View <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Live NAV, ISID-verified strategy data, and fund reviews for every SIF. Updated as new NFOs launch.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SifDirectoryTable;
