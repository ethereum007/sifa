"use client";

import { useState } from "react";
import Link from "next/link";
import { sifFunds } from "@/lib/sifData";
import { calculateAlphaShield, getAlphaShieldColor } from "@/lib/alphaShield";
import AlphaShieldBadge from "@/components/AlphaShieldBadge";

export default function AlphaShieldLeaderboard() {
  const [theme, setTheme] = useState<"default" | "light">("default");

  const rankedFunds = sifFunds
    .filter((f) => f.marchCrashData.fundReturn !== null)
    .map((f) => ({
      ...f,
      alphaShieldScore: calculateAlphaShield(
        f.marchCrashData.fundReturn,
        f.marchCrashData.benchmarkReturn
      ),
    }))
    .sort((a, b) => (b.alphaShieldScore ?? 0) - (a.alphaShieldScore ?? 0))
    .slice(0, 6);

  const isLight = theme === "light";

  return (
    <section className="py-8 sm:py-16">
      <div className="container mx-auto px-4">
        {/* Header row with toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              🛡️ Alpha Shield Leaderboard
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              How each SIF protected your capital vs its own benchmark during the March 2026 crash
            </p>
          </div>

          {/* Theme toggle pill */}
          <div
            className="flex items-center gap-0.5 shrink-0"
            style={{
              border: "0.5px solid #d1d5db",
              borderRadius: "8px",
              padding: "4px",
            }}
          >
            <button
              onClick={() => setTheme("default")}
              className="text-xs font-medium px-3 py-1 transition-colors"
              style={{
                borderRadius: "6px",
                backgroundColor: !isLight ? "hsl(152 76% 36%)" : "transparent",
                color: !isLight ? "#fff" : "#6b7280",
                border: isLight ? "0.5px solid transparent" : "none",
              }}
            >
              Default
            </button>
            <div className="relative group">
              <button
                onClick={() => setTheme("light")}
                className="text-xs font-medium px-3 py-1 transition-colors"
                style={{
                  borderRadius: "6px",
                  backgroundColor: isLight ? "hsl(152 76% 36%)" : "transparent",
                  color: isLight ? "#fff" : "#6b7280",
                  border: !isLight ? "0.5px solid transparent" : "none",
                }}
              >
                Light
              </button>
              <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-36 rounded-md bg-slate-900 text-white text-[10px] p-2 shadow-lg text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Clean view for sharing
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className={isLight ? "rounded-2xl overflow-hidden" : "bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden"}
          style={isLight ? { background: "#ffffff", border: "0.5px solid #e5e7eb" } : undefined}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={isLight ? { borderBottom: "0.5px solid #e5e7eb" } : undefined} className={isLight ? "" : "border-b border-slate-800"}>
                  {["Rank", "Fund", "AMC", "Benchmark", "March Return", "Alpha vs Benchmark", "Capital Protected", "Alpha Shield"].map((header, i) => {
                    const align = i >= 4 ? "text-right" : "text-left";
                    const hide = i === 2 ? "hidden sm:table-cell" : i === 3 || i === 6 ? "hidden md:table-cell" : i === 5 ? "hidden sm:table-cell" : "";
                    return (
                      <th
                        key={header}
                        className={`${align} px-4 py-3 ${hide}`}
                        style={isLight
                          ? { fontSize: "11px", fontWeight: 600, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.05em" }
                          : { fontSize: "11px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: "0.05em" }
                        }
                      >
                        {header}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rankedFunds.map((fund, index) => {
                  const rank = index + 1;
                  const isWinner = rank === 1;
                  const fundReturn = fund.marchCrashData.fundReturn!;
                  const alphaVsBenchmark = fund.marchCrashData.alphaVsBenchmark;
                  const capitalProtected = fund.marchCrashData.capitalProtected;
                  const benchmarkShort = fund.benchmark
                    .replace('NIFTY 50 Hybrid Composite Debt ', 'Hybrid ')
                    .replace('Nifty ', 'N');

                  // Light theme row styles
                  const lightRowStyle: React.CSSProperties = {
                    borderBottom: "0.5px solid #e5e7eb",
                  };

                  return (
                    <tr
                      key={fund.id}
                      className={
                        isLight
                          ? "transition-colors hover:bg-[#f9fafb]"
                          : `${isWinner ? "bg-emerald-500/5 hover:bg-emerald-500/10" : "hover:bg-slate-800/50"} border-b border-slate-800/50 transition-colors`
                      }
                      style={isLight ? lightRowStyle : undefined}
                    >
                      <td className="px-4 py-3">
                        {isLight ? (
                          <span
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: isWinner ? "#dcfce7" : "#f3f4f6",
                              color: isWinner ? "#16a34a" : "#6b7280",
                            }}
                          >
                            #{rank}
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                              isWinner ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            #{rank}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ color: isLight ? "#0f0f0f" : "#fff" }}>
                        {fund.shortName}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell" style={{ color: isLight ? "#6b7280" : "#94a3b8" }}>
                        {fund.amc}
                      </td>
                      <td className="px-4 py-3 text-xs hidden md:table-cell" style={{ color: isLight ? "#9ca3af" : "#64748b" }}>
                        {benchmarkShort}
                      </td>
                      <td
                        className="px-4 py-3 text-right font-semibold"
                        style={{ color: fundReturn >= 0 ? "#16a34a" : "#dc2626" }}
                      >
                        {fundReturn >= 0 ? "+" : ""}{fundReturn.toFixed(2)}%
                      </td>
                      <td
                        className="px-4 py-3 text-right font-semibold hidden sm:table-cell"
                        style={{ color: "#16a34a" }}
                      >
                        +{alphaVsBenchmark?.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell" style={{ color: isLight ? "#374151" : "#cbd5e1" }}>
                        {capitalProtected?.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 text-right">
                        {isLight ? (
                          <LightAlphaShieldScore score={fund.alphaShieldScore} />
                        ) : (
                          <AlphaShieldBadge
                            score={fund.alphaShieldScore}
                            size="sm"
                            showTooltip={false}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/sifreturns"
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            View Full Analysis →
          </Link>
        </div>
      </div>
    </section>
  );
}

function LightAlphaShieldScore({ score }: { score: number | null }) {
  if (score === null) return <span style={{ color: "#9ca3af", fontSize: "12px" }}>—</span>;
  const color = score >= 8.0 ? "#16a34a" : score >= 5.0 ? "#d97706" : "#dc2626";
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold tabular-nums" style={{ color }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      {score.toFixed(1)}
    </span>
  );
}
