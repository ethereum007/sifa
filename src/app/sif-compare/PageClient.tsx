"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { ChevronDown, X, Share2 } from "lucide-react";
import { sifFunds, type SIFund } from "@/lib/sifData";
import { calculateAlphaShield, getAlphaShieldColor } from "@/lib/alphaShield";
import AlphaShieldBadge from "@/components/AlphaShieldBadge";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

const DEFAULT_FUND_IDS = [
  "altiva-hybrid-long-short",
  "qsif-hybrid-long-short",
  "arudha-hybrid-long-short",
];

const MAX_FUNDS = 3;

const categoryColors: Record<string, string> = {
  "Hybrid Long Short":
    "bg-green-900/30 text-green-300 border border-green-800/40",
  "Equity Long Short":
    "bg-blue-900/30 text-blue-300 border border-blue-800/40",
  "Ex-Top 100": "bg-purple-900/30 text-purple-300 border border-purple-800/40",
  "Active Asset Allocator":
    "bg-amber-900/30 text-amber-300 border border-amber-800/40",
};

function formatPercent(val: number | null | undefined): string {
  if (val === null || val === undefined) return "\u2014";
  const sign = val > 0 ? "+" : "";
  return `${sign}${val.toFixed(2)}%`;
}

function formatCurrency(val: number): string {
  return "\u20b9" + val.toLocaleString("en-IN");
}

function percentColor(val: number | null | undefined): string {
  if (val === null || val === undefined) return "text-slate-500";
  if (val > 0) return "text-emerald-400";
  if (val < 0) return "text-red-400";
  return "text-slate-300";
}

interface ResolvedFund {
  fund: SIFund;
  alphaShield: number | null;
}

/* ---------- Inner component that reads searchParams ---------- */
function SifCompareInner() {
  const searchParams = useSearchParams();

  const initialFunds = useMemo(() => {
    const paramFunds = searchParams.get("funds");
    if (paramFunds) {
      const ids = paramFunds.split(",").filter(Boolean);
      const valid = ids.filter((id) => sifFunds.some((f) => f.id === id));
      if (valid.length > 0) return valid.slice(0, MAX_FUNDS);
    }
    return DEFAULT_FUND_IDS;
  }, [searchParams]);

  const [selectedFundIds, setSelectedFundIds] = useState<string[]>(initialFunds);
  const [selectorOpen, setSelectorOpen] = useState(false);

  const resolved: ResolvedFund[] = useMemo(
    () =>
      selectedFundIds
        .map((id) => {
          const fund = sifFunds.find((f) => f.id === id);
          if (!fund) return null;
          return {
            fund,
            alphaShield: calculateAlphaShield(
              fund.marchCrashData?.fundReturn ?? null,
              fund.marchCrashData?.benchmarkReturn ?? -11.30
            ),
          };
        })
        .filter(Boolean) as ResolvedFund[],
    [selectedFundIds]
  );

  const addFund = useCallback(
    (id: string) => {
      if (selectedFundIds.length >= MAX_FUNDS) return;
      if (selectedFundIds.includes(id)) return;
      setSelectedFundIds((prev) => [...prev, id]);
      setSelectorOpen(false);
    },
    [selectedFundIds]
  );

  const removeFund = useCallback((id: string) => {
    setSelectedFundIds((prev) => prev.filter((fid) => fid !== id));
  }, []);

  const availableFunds = useMemo(
    () => sifFunds.filter((f) => !selectedFundIds.includes(f.id)),
    [selectedFundIds]
  );

  /* ---------- Winner / loser helpers ---------- */
  function bestIdx(
    vals: (number | null | undefined)[],
    higherIsBetter: boolean
  ): number {
    let best = -1;
    let bestVal: number | null = null;
    for (let i = 0; i < vals.length; i++) {
      const v = vals[i];
      if (v === null || v === undefined) continue;
      if (
        bestVal === null ||
        (higherIsBetter ? v > bestVal : v < bestVal)
      ) {
        bestVal = v;
        best = i;
      }
    }
    return best;
  }

  function worstIdx(
    vals: (number | null | undefined)[],
    higherIsBetter: boolean
  ): number {
    return bestIdx(vals, !higherIsBetter);
  }

  function cellHighlight(
    idx: number,
    vals: (number | null | undefined)[],
    higherIsBetter: boolean
  ): string {
    if (resolved.length < 2) return "";
    const nonNull = vals.filter((v) => v !== null && v !== undefined);
    if (nonNull.length < 2) return "";
    const b = bestIdx(vals, higherIsBetter);
    const w = worstIdx(vals, higherIsBetter);
    if (idx === b)
      return "bg-emerald-500/10 border-l-2 border-emerald-500";
    if (idx === w && b !== w) return "bg-red-500/5";
    return "";
  }

  /* ---------- Comparison verdict ---------- */
  const verdict = useMemo(() => {
    if (resolved.length < 2) return null;

    let bestProtection: ResolvedFund | null = null;
    let bestReturn: ResolvedFund | null = null;
    let lowestTer: ResolvedFund | null = null;

    for (const r of resolved) {
      if (
        !bestProtection ||
        (r.alphaShield ?? -1) > (bestProtection.alphaShield ?? -1)
      )
        bestProtection = r;
      if (
        !bestReturn ||
        r.fund.returns.sinceInception >
          bestReturn.fund.returns.sinceInception
      )
        bestReturn = r;
      if (!lowestTer || r.fund.ter < lowestTer.fund.ter) lowestTer = r;
    }

    return { bestProtection, bestReturn, lowestTer };
  }, [resolved]);

  /* ---------- WhatsApp share ---------- */
  const shareOnWhatsApp = useCallback(() => {
    const lines = resolved.map(
      (r) =>
        `${r.fund.shortName}: \ud83d\udee1\ufe0f ${
          r.alphaShield !== null ? r.alphaShield.toFixed(1) : "N/A"
        }/10 | Since inception: ${
          r.fund.returns.sinceInception > 0 ? "+" : ""
        }${r.fund.returns.sinceInception.toFixed(2)}%`
    );

    const bestProt = verdict?.bestProtection?.fund.shortName ?? "";
    const bestRet = verdict?.bestReturn?.fund.shortName ?? "";
    const slugs = selectedFundIds.join(",");

    const msg = `\ud83d\udcca SIF Comparison \u2014 SIFPrime\n\n${lines.join(
      "\n"
    )}\n\nBest protection: ${bestProt}\nBest returns: ${bestRet}\n\nFull comparison: sifprime.com/sif-compare?funds=${slugs}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  }, [resolved, verdict, selectedFundIds]);

  /* ---------- Table row helpers ---------- */
  type RowDef = {
    label: string;
    values: (string | number | null | undefined)[];
    rawValues?: (number | null | undefined)[];
    higherIsBetter?: boolean;
    renderCell?: (val: string | number | null | undefined, idx: number) => React.ReactNode;
  };

  function buildRows(): { section: string; rows: RowDef[] }[] {
    const alphaShields = resolved.map((r) => r.alphaShield);
    const marchReturns = resolved.map(
      (r) => r.fund.marchCrashData?.fundReturn ?? null
    );
    const alphaVsBenchmark = resolved.map(
      (r) => r.fund.marchCrashData?.alphaVsBenchmark ?? null
    );
    const capitalProtected = resolved.map(
      (r) => r.fund.marchCrashData?.capitalProtected ?? null
    );

    return [
      {
        section: "\ud83d\udee1\ufe0f ALPHA SHIELD",
        rows: [
          {
            label: "Alpha Shield Score",
            values: alphaShields,
            rawValues: alphaShields,
            higherIsBetter: true,
            renderCell: (_, idx) => (
              <AlphaShieldBadge
                score={resolved[idx].alphaShield}
                size="sm"
                showTooltip={false}
              />
            ),
          },
          {
            label: "March 2026 Return",
            values: marchReturns.map(formatPercent),
            rawValues: marchReturns,
            higherIsBetter: true,
            renderCell: (_, idx) => {
              const val = marchReturns[idx];
              return (
                <span className={percentColor(val)}>
                  {formatPercent(val)}
                </span>
              );
            },
          },
          {
            label: "Alpha vs Benchmark (%)",
            values: alphaVsBenchmark.map((v) =>
              v !== null && v !== undefined ? `+${v.toFixed(2)}%` : "\u2014"
            ),
            rawValues: alphaVsBenchmark,
            higherIsBetter: true,
            renderCell: (_, idx) => {
              const val = alphaVsBenchmark[idx];
              return (
                <span className="text-emerald-400">
                  {val !== null && val !== undefined
                    ? `+${val.toFixed(2)}%`
                    : "\u2014"}
                </span>
              );
            },
          },
          {
            label: "Capital Protected (%)",
            values: capitalProtected.map((v) =>
              v !== null && v !== undefined ? `${v.toFixed(1)}%` : "\u2014"
            ),
            rawValues: capitalProtected,
            higherIsBetter: true,
          },
          {
            label: "Category Rank",
            values: resolved.map((r) => {
              const d = r.fund.marchCrashData;
              if (!d || d.rank === null) return "\u2014";
              return `#${d.rank} of ${d.totalFunds}`;
            }),
            rawValues: resolved.map(
              (r) => -(r.fund.marchCrashData?.rank ?? 999)
            ),
            higherIsBetter: true,
          },
        ],
      },
      {
        section: "\ud83d\udcc8 RETURNS",
        rows: [
          {
            label: "Since Inception (%)",
            values: resolved.map((r) =>
              formatPercent(r.fund.returns.sinceInception)
            ),
            rawValues: resolved.map((r) => r.fund.returns.sinceInception),
            higherIsBetter: true,
            renderCell: (_, idx) => {
              const val = resolved[idx].fund.returns.sinceInception;
              return (
                <span className={percentColor(val)}>
                  {formatPercent(val)}
                </span>
              );
            },
          },
          {
            label: "3 Month (%)",
            values: resolved.map((r) =>
              formatPercent(r.fund.returns.threeMonth)
            ),
            rawValues: resolved.map((r) => r.fund.returns.threeMonth),
            higherIsBetter: true,
            renderCell: (_, idx) => {
              const val = resolved[idx].fund.returns.threeMonth;
              return (
                <span className={percentColor(val)}>
                  {formatPercent(val)}
                </span>
              );
            },
          },
          {
            label: "1 Month March (%)",
            values: resolved.map((r) =>
              formatPercent(r.fund.returns.oneMonth)
            ),
            rawValues: resolved.map((r) => r.fund.returns.oneMonth),
            higherIsBetter: true,
            renderCell: (_, idx) => {
              const val = resolved[idx].fund.returns.oneMonth;
              return (
                <span className={percentColor(val)}>
                  {formatPercent(val)}
                </span>
              );
            },
          },
        ],
      },
      {
        section: "\ud83d\udcb0 COST",
        rows: [
          {
            label: "TER Direct (%)",
            values: resolved.map((r) => `${r.fund.ter.toFixed(2)}%`),
            rawValues: resolved.map((r) => r.fund.ter),
            higherIsBetter: false,
          },
          {
            label: "TER Regular (%)",
            values: resolved.map((r) => `${r.fund.terRegular.toFixed(2)}%`),
            rawValues: resolved.map((r) => r.fund.terRegular),
            higherIsBetter: false,
          },
          {
            label: "Annual Saving Direct",
            values: resolved.map((r) => {
              const saving = r.fund.terRegular - r.fund.ter;
              return `${saving.toFixed(2)}% saved`;
            }),
            rawValues: resolved.map(
              (r) => r.fund.terRegular - r.fund.ter
            ),
            higherIsBetter: true,
          },
        ],
      },
      {
        section: "\ud83c\udfd7\ufe0f STRUCTURE",
        rows: [
          {
            label: "Min Investment",
            values: resolved.map((r) => formatCurrency(r.fund.minInvestment)),
          },
          {
            label: "Redemption Freq",
            values: resolved.map((r) => r.fund.redemptionFreq),
          },
          {
            label: "Settlement",
            values: resolved.map((r) => r.fund.settlement),
          },
          {
            label: "Exit Load",
            values: resolved.map((r) => r.fund.exitLoad),
          },
        ],
      },
      {
        section: "\ud83d\udcca STRATEGY",
        rows: [
          {
            label: "Strategy Type",
            values: resolved.map(
              (r) =>
                r.fund.strategyType
                  .split("-")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")
            ),
          },
          {
            label: "Net Long Range",
            values: resolved.map((r) => r.fund.netLongRange),
          },
          {
            label: "AMC",
            values: resolved.map((r) => r.fund.amc),
          },
          {
            label: "Fund Managers",
            values: resolved.map(
              (r) => `${r.fund.managers.length} manager${r.fund.managers.length !== 1 ? "s" : ""}`
            ),
          },
          {
            label: "Benchmark",
            values: resolved.map((r) => r.fund.benchmark),
          },
        ],
      },
    ];
  }

  const sections = useMemo(buildRows, [resolved]);

  /* ---------- RENDER ---------- */
  return (
    <div className="container mx-auto px-4 max-w-6xl">
      {/* ---- FUND SELECTOR ---- */}
      <section className="py-6">
        <p className="text-muted-foreground text-center mb-6 text-sm">
          Select up to 3 funds to compare
        </p>

        {/* Selector dropdown */}
            {selectedFundIds.length < MAX_FUNDS && (
              <div className="relative max-w-lg mx-auto mb-6">
                <button
                  type="button"
                  onClick={() => setSelectorOpen((v) => !v)}
                  className="w-full flex items-center justify-between gap-2 rounded-xl border border-border bg-slate-900 px-4 py-3 text-sm text-foreground hover:border-primary/50 transition-colors"
                >
                  <span className="text-muted-foreground">
                    Add a fund to compare...
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${
                      selectorOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {selectorOpen && (
                  <div className="absolute z-50 mt-1 w-full max-h-72 overflow-y-auto rounded-xl border border-border bg-slate-900 shadow-xl">
                    {availableFunds.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => addFund(f.id)}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                      >
                        <span className="inline-flex items-center justify-center rounded bg-slate-700 px-1.5 py-0.5 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                          {f.amcCode}
                        </span>
                        <span className="text-foreground">{f.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">
                          ({f.category})
                        </span>
                      </button>
                    ))}
                    {availableFunds.length === 0 && (
                      <div className="px-4 py-3 text-sm text-muted-foreground">
                        All funds selected
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Selected fund chips */}
            <div className="flex flex-wrap justify-center gap-2">
              {resolved.map((r) => (
                <span
                  key={r.fund.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 border border-slate-700 px-3 py-1.5 text-sm text-foreground"
                >
                  <span className="inline-flex items-center justify-center rounded bg-slate-700 px-1.5 py-0.5 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {r.fund.amcCode}
                  </span>
                  {r.fund.shortName}
                  <button
                    type="button"
                    onClick={() => removeFund(r.fund.id)}
                    className="ml-1 rounded-full hover:bg-slate-600 p-0.5 transition-colors"
                    aria-label={`Remove ${r.fund.shortName}`}
                  >
                    <X className="w-3 h-3 text-slate-400" />
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* ---- COMPARISON TABLE ---- */}
          {resolved.length >= 2 && (
            <>
              <div className="bg-slate-900 rounded-2xl p-0 overflow-hidden mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    {/* Table header: fund columns */}
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left px-4 py-4 text-muted-foreground font-medium w-44 min-w-[176px]">
                          &nbsp;
                        </th>
                        {resolved.map((r) => (
                          <th
                            key={r.fund.id}
                            className="text-center px-4 py-4 min-w-[180px]"
                          >
                            <div className="flex flex-col items-center gap-1.5">
                              <span className="inline-flex items-center justify-center rounded bg-slate-700 px-2 py-0.5 text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                                {r.fund.amcCode}
                              </span>
                              <span className="font-semibold text-foreground text-sm">
                                {r.fund.shortName}
                              </span>
                              <span
                                className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                  categoryColors[r.fund.category] ?? ""
                                }`}
                              >
                                {r.fund.category}
                              </span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {sections.map((section) => (
                        <SectionBlock
                          key={section.section}
                          section={section}
                          resolved={resolved}
                          cellHighlight={cellHighlight}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ---- COMPARISON VERDICT ---- */}
              {verdict && (
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6 mt-6">
                  <h3 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-4">
                    SIFPrime Comparison Verdict
                  </h3>
                  <div className="space-y-3">
                    {verdict.bestProtection && (
                      <div className="flex items-start gap-2 text-sm">
                        <span className="shrink-0">{"\ud83d\udee1\ufe0f"}</span>
                        <span className="text-slate-300">
                          <span className="font-semibold text-white">
                            Best capital protection:
                          </span>{" "}
                          {verdict.bestProtection.fund.shortName} &mdash;
                          Protected{" "}
                          {verdict.bestProtection.fund.marchCrashData
                            ?.capitalProtected !== null &&
                          verdict.bestProtection.fund.marchCrashData
                            ?.capitalProtected !== undefined
                            ? `${verdict.bestProtection.fund.marchCrashData.capitalProtected.toFixed(
                                1
                              )}%`
                            : "N/A"}{" "}
                          of capital
                        </span>
                      </div>
                    )}
                    {verdict.bestReturn && (
                      <div className="flex items-start gap-2 text-sm">
                        <span className="shrink-0">{"\ud83d\udcc8"}</span>
                        <span className="text-slate-300">
                          <span className="font-semibold text-white">
                            Best since inception:
                          </span>{" "}
                          {verdict.bestReturn.fund.shortName} &mdash;{" "}
                          {formatPercent(
                            verdict.bestReturn.fund.returns.sinceInception
                          )}{" "}
                          from launch
                        </span>
                      </div>
                    )}
                    {verdict.lowestTer && (
                      <div className="flex items-start gap-2 text-sm">
                        <span className="shrink-0">{"\ud83d\udcb0"}</span>
                        <span className="text-slate-300">
                          <span className="font-semibold text-white">
                            Lowest cost:
                          </span>{" "}
                          {verdict.lowestTer.fund.shortName} &mdash;{" "}
                          {verdict.lowestTer.fund.ter.toFixed(2)}% TER Direct
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ---- SHARE BUTTON ---- */}
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2"
                  onClick={shareOnWhatsApp}
                >
                  <Share2 className="w-4 h-4" />
                  Share Comparison
                </Button>
              </div>
            </>
          )}

          {resolved.length < 2 && resolved.length > 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Select at least 2 funds to see the comparison table.
            </div>
          )}

          {resolved.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Select funds above to start comparing.
            </div>
          )}
    </div>
  );
}

/* ---------- Section block sub-component ---------- */
function SectionBlock({
  section,
  resolved,
  cellHighlight,
}: {
  section: {
    section: string;
    rows: {
      label: string;
      values: (string | number | null | undefined)[];
      rawValues?: (number | null | undefined)[];
      higherIsBetter?: boolean;
      renderCell?: (
        val: string | number | null | undefined,
        idx: number
      ) => React.ReactNode;
    }[];
  };
  resolved: ResolvedFund[];
  cellHighlight: (
    idx: number,
    vals: (number | null | undefined)[],
    higherIsBetter: boolean
  ) => string;
}) {
  return (
    <>
      {/* Section header */}
      <tr>
        <td
          colSpan={resolved.length + 1}
          className="bg-slate-800 px-4 py-2.5 text-sm font-bold text-white tracking-wide"
        >
          {section.section}
        </td>
      </tr>

      {/* Data rows */}
      {section.rows.map((row, rowIdx) => (
        <tr
          key={row.label}
          className={rowIdx % 2 === 0 ? "bg-slate-900" : "bg-slate-950"}
        >
          <td className="px-4 py-3 text-slate-400 font-medium text-xs whitespace-nowrap">
            {row.label}
          </td>
          {row.values.map((val, colIdx) => {
            const highlight =
              row.rawValues && row.higherIsBetter !== undefined
                ? cellHighlight(colIdx, row.rawValues, row.higherIsBetter)
                : "";

            return (
              <td
                key={colIdx}
                className={`px-4 py-3 text-center text-sm ${highlight}`}
              >
                {row.renderCell ? (
                  row.renderCell(val, colIdx)
                ) : val === null || val === undefined ? (
                  <span className="text-slate-500">{"\u2014"}</span>
                ) : (
                  <span className="text-slate-200">{String(val)}</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}

/* ---------- Exported wrapper with Suspense for useSearchParams ---------- */
export default function SifComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-muted-foreground">Loading comparison tool...</div>
        </div>
      }
    >
      <SifCompareInner />
    </Suspense>
  );
}
