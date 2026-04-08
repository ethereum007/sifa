"use client";

import { marketConditions } from "@/lib/marketConditions";

const getVixBadgeColor = (label: string) => {
  switch (label.toLowerCase()) {
    case "low":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "moderate":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "high":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    case "extreme":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  }
};

const getConditionDot = (condition: string) => {
  switch (condition) {
    case "favourable":
      return "bg-emerald-400";
    case "neutral":
      return "bg-amber-400";
    case "unfavourable":
      return "bg-red-400";
    default:
      return "bg-slate-400";
  }
};

const getConditionLabel = (condition: string) => {
  switch (condition) {
    case "favourable":
      return "Favourable";
    case "neutral":
      return "Neutral";
    case "unfavourable":
      return "Unfavourable";
    default:
      return condition;
  }
};

export default function MarketConditionsWidget() {
  const mc = marketConditions;

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 border border-slate-800">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
              📊 CURRENT SIF MARKET CONDITIONS
            </span>
            <span className="text-xs text-slate-500">
              Updated: {mc.updatedDate}
            </span>
          </div>

          {/* Grid of 3 items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {/* VIX */}
            <div className="flex items-center gap-3">
              <div className="text-slate-400 text-sm font-medium">VIX:</div>
              <span className="text-white font-bold text-lg">{mc.vix}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full border ${getVixBadgeColor(mc.vixLabel)}`}
              >
                {mc.vixLabel}
              </span>
            </div>

            {/* Nifty Trend */}
            <div className="flex items-center gap-3">
              <div className="text-slate-400 text-sm font-medium">Nifty Trend:</div>
              <span className="text-white font-bold">{mc.niftyTrend}</span>
            </div>

            {/* SIF Conditions */}
            <div className="flex items-center gap-3">
              <div className="text-slate-400 text-sm font-medium">SIF Conditions:</div>
              <span
                className={`w-2.5 h-2.5 rounded-full ${getConditionDot(mc.sifConditions)} inline-block`}
              />
              <span className="text-white font-bold">
                {getConditionLabel(mc.sifConditions)}
              </span>
            </div>
          </div>

          {/* Conditions Text */}
          <p className="text-sm text-slate-400 mb-4">{mc.sifConditionsText}</p>

          {/* Key Signals */}
          <div className="flex flex-wrap gap-2">
            {mc.keySignals.map((signal, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
              >
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
