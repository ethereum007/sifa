"use client";

import { useState } from "react";
import { getAlphaShieldLabel, getAlphaShieldColor } from "@/lib/alphaShield";

interface AlphaShieldBadgeProps {
  score: number | null;
  size: "sm" | "md" | "lg";
  showLabel?: boolean;
  showTooltip?: boolean;
}

const TOOLTIP_TEXT =
  "Alpha Shield Score measures how much capital this fund protected when Nifty fell 11.3% in March 2026. Score 10 = stayed positive. Score 0 = fell as much as Nifty.";

export default function AlphaShieldBadge({
  score,
  size,
  showLabel = true,
  showTooltip = true,
}: AlphaShieldBadgeProps) {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const color = score !== null ? getAlphaShieldColor(score) : "#6b7280";
  const label = score !== null ? getAlphaShieldLabel(score) : "Insufficient Data";
  const displayScore = score !== null ? score.toFixed(1) : "N/A";

  const tooltipHandlers = showTooltip
    ? {
        onMouseEnter: () => setTooltipVisible(true),
        onMouseLeave: () => setTooltipVisible(false),
      }
    : {};

  const tooltip = tooltipVisible && (
    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg bg-slate-900 text-white text-xs p-3 shadow-lg leading-relaxed pointer-events-none">
      {TOOLTIP_TEXT}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
    </div>
  );

  // --- SIZE: SM ---
  if (size === "sm") {
    return (
      <span
        className="relative inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold cursor-default"
        style={{
          backgroundColor: score !== null ? `${color}1a` : "#6b72801a",
          color: color,
        }}
        {...tooltipHandlers}
      >
        {tooltip}
        🛡️ {displayScore}
      </span>
    );
  }

  // --- SIZE: MD ---
  if (size === "md") {
    return (
      <div
        className="relative bg-card rounded-lg p-3 cursor-default"
        style={{ borderLeft: `4px solid ${color}` }}
        {...tooltipHandlers}
      >
        {tooltip}
        <div className="font-bold text-lg" style={{ color }}>
          🛡️ {score !== null ? `${displayScore}/10` : "N/A"}
        </div>
        {showLabel && (
          <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
        )}
      </div>
    );
  }

  // --- SIZE: LG ---
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const progress = score !== null ? (score / 10) * circumference : 0;

  return (
    <div
      className="relative bg-card rounded-xl p-6 flex flex-col items-center cursor-default"
      {...tooltipHandlers}
    >
      {tooltip}
      <div className="relative w-32 h-32">
        <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
          {/* Background ring */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#374151"
            strokeWidth="8"
          />
          {/* Score ring */}
          {score !== null && (
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference - progress}`}
            />
          )}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {displayScore}
          </span>
        </div>
      </div>
      {showLabel && (
        <div className="text-sm text-muted-foreground mt-3 text-center">
          {label}
        </div>
      )}
    </div>
  );
}
