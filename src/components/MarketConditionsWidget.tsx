"use client";

import { marketConditions } from "@/lib/marketConditions";

const getVixColor = (label: string) => {
  switch (label.toLowerCase()) {
    case "low": return "text-emerald-600";
    case "moderate": return "text-emerald-600";
    case "high": return "text-amber-600";
    case "extreme": return "text-red-600";
    default: return "text-muted-foreground";
  }
};

const getConditionDot = (condition: string) => {
  switch (condition) {
    case "favourable": return "bg-emerald-500";
    case "neutral": return "bg-amber-500";
    case "unfavourable": return "bg-red-500";
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
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
              Current SIF Market Conditions
            </span>
            <span className="text-xs text-muted-foreground">
              Updated: {mc.updatedDate}
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">VIX:</span>
              <span className="text-lg font-bold text-foreground">{mc.vix}</span>
              <span className={`text-xs font-medium ${getVixColor(mc.vixLabel)}`}>
                {mc.vixLabel}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Nifty Trend:</span>
              <span className="font-bold text-foreground">{mc.niftyTrend}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">SIF Conditions:</span>
              <span className={`w-2 h-2 rounded-full ${getConditionDot(mc.sifConditions)}`} />
              <span className="font-bold text-foreground">{getConditionLabel(mc.sifConditions)}</span>
            </div>
          </div>

          {/* Text */}
          <p className="text-sm text-muted-foreground mb-4">{mc.sifConditionsText}</p>

          {/* Signals */}
          <div className="flex flex-wrap gap-2">
            {mc.keySignals.map((signal, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
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
