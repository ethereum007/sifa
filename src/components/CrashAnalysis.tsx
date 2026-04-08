"use client";

import Link from "next/link";
import {
  calculateAlphaShield,
  getAlphaShieldLabel,
  getAlphaShieldColor,
} from "@/lib/alphaShield";
import { getSifsByCategory } from "@/lib/sifData";
import type { SIFund } from "@/lib/sifData";
import AlphaShieldBadge from "@/components/AlphaShieldBadge";

interface CrashAnalysisProps {
  fund: SIFund;
}

const NIFTY_CRASH_RETURN = -11.3;

const RANK_MEDALS: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

function getVerdictText(score: number | null): string {
  if (score === null) {
    return "This fund launched after March 2026. Alpha Shield Score will be calculated during the next major market movement.";
  }
  if (score >= 9) {
    return "Exceptional downside protection. This fund stayed positive when everything else fell. The hedging strategy worked exactly as designed \u2014 this is what separates SIFs from regular mutual funds.";
  }
  if (score >= 7) {
    return "Strong downside protection. The fund outperformed Nifty by nearly 10 percentage points in the crash. Your capital was significantly cushioned.";
  }
  if (score >= 5) {
    return "Moderate protection. The fund cushioned some of the Nifty\u2019s fall but underperformed category peers.";
  }
  return "Limited protection in the March 2026 crash. High net long exposure meant the fund bore significant market impact.";
}

export default function CrashAnalysis({ fund }: CrashAnalysisProps) {
  const marchData = fund.marchCrashData;
  const fundReturn = marchData?.fundReturn ?? null;
  const alphaShieldScore = calculateAlphaShield(fundReturn);

  // --- NULL STATE: Fund launched after March 2026 ---
  if (fundReturn === null || fundReturn === undefined) {
    return (
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            🛡️ ALPHA SHIELD ANALYSIS
          </p>
          <h2 className="text-2xl font-bold mt-1">March 2026 Market Crash</h2>
        </div>
        <hr className="border-slate-700 my-5" />
        <div className="bg-slate-800 rounded-xl p-6 text-center">
          <AlphaShieldBadge score={null} size="lg" />
          <p className="text-slate-400 mt-4 max-w-md mx-auto">
            {fund.shortName} launched after March 2026. Alpha Shield Score will
            be calculated during the next major market movement.
          </p>
        </div>
        <div className="mt-6 text-right">
          <Link
            href="/compare-sifs"
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          >
            Compare with other funds &rarr;
          </Link>
        </div>
      </div>
    );
  }

  // --- FULL ANALYSIS ---
  const alphaVsNifty = (fundReturn - NIFTY_CRASH_RETURN).toFixed(2);
  const capitalProtected = Math.max(0, 100 + fundReturn).toFixed(1);
  const isPositiveReturn = fundReturn >= 0;
  const color = getAlphaShieldColor(alphaShieldScore!);

  // Category comparison
  const categoryFunds = getSifsByCategory(fund.categorySlug);
  const sortedFunds = [...categoryFunds].sort((a, b) => {
    const aReturn = a.marchCrashData?.fundReturn;
    const bReturn = b.marchCrashData?.fundReturn;
    if (aReturn === null || aReturn === undefined) return 1;
    if (bReturn === null || bReturn === undefined) return -1;
    return bReturn - aReturn; // best (highest) first
  });

  const currentFundRank =
    sortedFunds.findIndex(
      (f) => f.shortName === fund.shortName || f.slug === fund.slug
    ) + 1;
  const totalFunds = categoryFunds.length;

  // Calculate max bar width reference: best return distance from Nifty crash
  const bestReturn = sortedFunds[0]?.marchCrashData?.fundReturn ?? 0;
  const barMaxRange = Math.max(bestReturn - NIFTY_CRASH_RETURN, 1);

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
          🛡️ ALPHA SHIELD ANALYSIS
        </p>
        <h2 className="text-2xl font-bold mt-1">March 2026 Market Crash</h2>
      </div>

      <hr className="border-slate-700 my-5" />

      {/* INTRO */}
      <p className="text-slate-300">
        When Nifty crashed {NIFTY_CRASH_RETURN}% in March 2026, here&apos;s how{" "}
        <span className="font-semibold text-white">{fund.shortName}</span>{" "}
        performed:
      </p>

      {/* COMPARISON BOXES */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-red-950/50 rounded-xl p-4">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            Nifty 50
          </p>
          <p className="text-2xl font-bold text-red-400">
            {NIFTY_CRASH_RETURN}%
          </p>
        </div>
        <div
          className={`${
            isPositiveReturn ? "bg-emerald-950/50" : "bg-red-950/50"
          } rounded-xl p-4`}
        >
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
            {fund.shortName}
          </p>
          <p
            className={`text-2xl font-bold ${
              isPositiveReturn ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {fundReturn > 0 ? "+" : ""}
            {fundReturn.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-3 gap-4 mt-6 bg-slate-800 rounded-xl p-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">Alpha vs Nifty</p>
          <p className="text-lg font-bold text-emerald-400">+{alphaVsNifty}%</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Capital Protected</p>
          <p className="text-lg font-bold text-white">{capitalProtected}%</p>
        </div>
        <div>
          <AlphaShieldBadge score={alphaShieldScore} size="md" />
        </div>
      </div>

      {/* CATEGORY COMPARISON */}
      <div className="mt-8">
        <p className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-4">
          How {fund.shortName} compares in {fund.category}:
        </p>

        <div className="space-y-2">
          {sortedFunds.map((f, idx) => {
            const fReturn = f.marchCrashData?.fundReturn;
            const isCurrent =
              f.shortName === fund.shortName || f.slug === fund.slug;
            const rank = idx + 1;
            const medal = RANK_MEDALS[rank] ?? `${rank}.`;

            if (fReturn === null || fReturn === undefined) {
              return (
                <div
                  key={f.slug ?? f.shortName}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                    isCurrent
                      ? "border-l-4 border-emerald-400 bg-slate-800/50"
                      : ""
                  }`}
                >
                  <span className="w-8 text-center text-sm">{medal}</span>
                  <span className="flex-1 text-sm text-slate-500">
                    {f.shortName}
                  </span>
                  <span className="text-xs text-slate-600 italic">
                    Launched after March 2026
                  </span>
                </div>
              );
            }

            const barWidth = Math.max(
              ((fReturn - NIFTY_CRASH_RETURN) / barMaxRange) * 100,
              2
            );
            const isPositive = fReturn >= 0;

            return (
              <div
                key={f.slug ?? f.shortName}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                  isCurrent
                    ? "border-l-4 border-emerald-400 bg-slate-800/50"
                    : "hover:bg-slate-800/30"
                }`}
              >
                <span className="w-8 text-center text-sm">{medal}</span>
                <span
                  className={`w-32 sm:w-40 text-sm truncate ${
                    isCurrent ? "text-white font-semibold" : "text-slate-300"
                  }`}
                >
                  {f.shortName}
                </span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isPositive ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${Math.min(barWidth, 100)}%` }}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium w-16 text-right ${
                      isPositive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {fReturn > 0 ? "+" : ""}
                    {fReturn.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-sm text-slate-400 mt-3">
          Rank: #{currentFundRank} of {totalFunds} {fund.category} funds
        </p>
      </div>

      {/* VERDICT */}
      <div className="mt-6 bg-slate-800 rounded-xl p-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-2">
          What This Means:
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          {getVerdictText(alphaShieldScore)}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6 text-right">
        <Link
          href="/compare-sifs"
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
        >
          Compare with other funds &rarr;
        </Link>
      </div>
    </div>
  );
}
