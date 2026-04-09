"use client";

import { marketConditions } from "@/lib/marketConditions";

const getVixColor = (label: string) => {
  switch (label.toLowerCase()) {
    case "low": return "text-emerald-400";
    case "moderate": return "text-emerald-400";
    case "high": return "text-amber-400";
    case "extreme": return "text-red-400";
    default: return "text-slate-400";
  }
};

const getConditionDot = (condition: string) => {
  switch (condition) {
    case "favourable": return "bg-emerald-400";
    case "neutral": return "bg-amber-400";
    case "unfavourable": return "bg-red-400";
    default: return "bg-slate-400";
  }
};

const getConditionLabel = (condition: string) => {
  switch (condition) {
    case "favourable": return "Favourable";
    case "neutral": return "Neutral";
    case "unfavourable": return "Unfavourable";
    default: return condition;
  }
};

export default function MarketConditionsWidget() {
  const mc = marketConditions;

  return (
    <section className="py-5">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-[#0A1628] border border-slate-800 p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
              Current SIF Market Conditions
            </span>
            <span className="text-xs text-slate-500">
              Updated: {mc.updatedDate}
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium">VIX:</span>
              <span className="text-xl font-bold text-white">{mc.vix}</span>
              <span className={`text-xs font-semibold ${getVixColor(mc.vixLabel)}`}>
                {mc.vixLabel}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium">Nifty Trend:</span>
              <span className="text-lg font-bold text-white">{mc.niftyTrend}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 font-medium">SIF Conditions:</span>
              <span className={`w-2.5 h-2.5 rounded-full ${getConditionDot(mc.sifConditions)}`} />
              <span className="text-lg font-bold text-white">{getConditionLabel(mc.sifConditions)}</span>
            </div>
          </div>

          {/* Text */}
          <p className="text-sm text-slate-400 mb-5 leading-relaxed">{mc.sifConditionsText}</p>

          {/* Signals */}
          <div className="flex flex-wrap gap-2">
            {mc.keySignals.map((signal, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700"
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
