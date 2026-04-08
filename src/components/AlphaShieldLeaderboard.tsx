"use client";

import Link from "next/link";
import { sifFunds } from "@/lib/sifData";
import { calculateAlphaShield, getAlphaShieldColor } from "@/lib/alphaShield";
import AlphaShieldBadge from "@/components/AlphaShieldBadge";

export default function AlphaShieldLeaderboard() {
  // Filter funds with march crash data, calculate scores using per-fund benchmark, sort by score descending, take top 6
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

  return (
    <section className="py-8 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            🛡️ Alpha Shield Leaderboard
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            How each SIF protected your capital vs its own benchmark during the March 2026 crash
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rank</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Fund</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">AMC</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Benchmark</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">March Return</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Alpha vs Benchmark</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">Capital Protected</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Alpha Shield</th>
                </tr>
              </thead>
              <tbody>
                {rankedFunds.map((fund, index) => {
                  const rank = index + 1;
                  const isWinner = rank === 1;
                  const fundReturn = fund.marchCrashData.fundReturn!;
                  const alphaVsBenchmark = fund.marchCrashData.alphaVsBenchmark;
                  const capitalProtected = fund.marchCrashData.capitalProtected;
                  // Short benchmark name for display
                  const benchmarkShort = fund.benchmark
                    .replace('NIFTY 50 Hybrid Composite Debt ', 'Hybrid ')
                    .replace('Nifty ', 'N');

                  return (
                    <tr
                      key={fund.id}
                      className={`border-b border-slate-800/50 ${
                        isWinner
                          ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                          : "hover:bg-slate-800/50"
                      } transition-colors`}
                    >
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                            isWinner
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          #{rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-white">
                        {fund.shortName}
                      </td>
                      <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">
                        {fund.amc}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs hidden md:table-cell">
                        {benchmarkShort}
                      </td>
                      <td className={`px-4 py-3 text-right font-semibold ${fundReturn >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                        {fundReturn >= 0 ? "+" : ""}
                        {fundReturn.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-emerald-400 hidden sm:table-cell">
                        +{alphaVsBenchmark?.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3 text-right text-slate-300 hidden md:table-cell">
                        {capitalProtected?.toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 text-right">
                        <AlphaShieldBadge
                          score={fund.alphaShieldScore}
                          size="sm"
                          showTooltip={false}
                        />
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
