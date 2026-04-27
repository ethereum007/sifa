"use client";

import { useState } from "react";
import { X } from "lucide-react";

const NfoBannerTop = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return null;
  }

  const tickerContent = (
    <div className="flex items-center gap-3 sm:gap-6 px-2 sm:px-4 whitespace-nowrap" style={{ fontSize: "13px" }}>
      <span className="inline-flex items-center gap-2">
        <span className="bg-amber-500 text-[#0f1f3d] font-bold px-2 py-0.5 rounded animate-pulse" style={{ fontSize: "11px" }}>
          NFO OPEN
        </span>
        <span className="font-semibold text-white">
          Franklin Templeton Sapphire Equity Long-Short SIF
        </span>
      </span>
      <span className="text-amber-500 font-medium">|</span>
      <span className="text-white/90">April 10 to April 24, 2026</span>
      <span className="text-amber-500 font-medium">|</span>
      <a
        href="https://www.franklintempletonindia.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-[#0f1f3d] font-bold px-3 py-1 rounded-full transition-colors"
        style={{ fontSize: "13px" }}
        onClick={(e) => e.stopPropagation()}
      >
        Invest Now
      </a>
      <span className="text-[#0f1f3d]/30 mx-4">•</span>
      <span className="inline-flex items-center gap-2">
        <span className="bg-amber-500 text-[#0f1f3d] font-bold px-2 py-0.5 rounded animate-pulse" style={{ fontSize: "11px" }}>
          NFO OPEN
        </span>
        <span className="font-semibold text-white">
          WSIF by Wealth — Equity Long Short
        </span>
      </span>
      <span className="text-amber-500 font-medium">|</span>
      <span className="text-white/90">April 15 to April 29, 2026</span>
      <span className="text-amber-500 font-medium">|</span>
      <a
        href="https://www.wealthcompanyamc.in/wsif/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-[#0f1f3d] font-bold px-3 py-1 rounded-full transition-colors"
        style={{ fontSize: "13px" }}
        onClick={(e) => e.stopPropagation()}
      >
        Invest Now
      </a>
      <span className="text-[#0f1f3d]/30 mx-4">•</span>
      <span className="inline-flex items-center gap-2">
        <span className="bg-amber-500 text-[#0f1f3d] font-bold px-2 py-0.5 rounded animate-pulse" style={{ fontSize: "11px" }}>
          NFO OPEN
        </span>
        <span className="font-semibold text-white">
          WSIF by Wealth — Equity Ex-Top 100 Long Short
        </span>
      </span>
      <span className="text-amber-500 font-medium">|</span>
      <span className="text-white/90">April 15 to April 29, 2026</span>
      <span className="text-amber-500 font-medium">|</span>
      <a
        href="https://www.wealthcompanyamc.in/wsif/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-[#0f1f3d] font-bold px-3 py-1 rounded-full transition-colors"
        style={{ fontSize: "13px" }}
        onClick={(e) => e.stopPropagation()}
      >
        Invest Now
      </a>
      <span className="text-[#0f1f3d]/30 mx-4">•</span>
      <span className="inline-flex items-center gap-2">
        <span className="bg-amber-500 text-[#0f1f3d] font-bold px-2 py-0.5 rounded animate-pulse" style={{ fontSize: "11px" }}>
          NFO OPEN
        </span>
        <span className="font-semibold text-white">
          Titanium by Tata — Equity Long Short
        </span>
      </span>
      <span className="text-amber-500 font-medium">|</span>
      <span className="text-white/90">April 27 to May 11, 2026</span>
      <span className="text-amber-500 font-medium">|</span>
      <a
        href="https://www.tatamutualfund.com/titanium-sif"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-[#0f1f3d] font-bold px-3 py-1 rounded-full transition-colors"
        style={{ fontSize: "13px" }}
        onClick={(e) => e.stopPropagation()}
      >
        Invest Now
      </a>
      <span className="text-[#0f1f3d]/30 mx-4">•</span>
    </div>
  );

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[70] overflow-hidden"
      style={{ backgroundColor: "#0f1f3d" }}
    >
      {/* Scrolling ticker */}
      <div className="relative flex items-center h-10">
        {/* Scrolling content container */}
        <div className="flex animate-nfo-ticker hover:[animation-play-state:paused]">
          {/* Duplicate content 4 times for seamless loop */}
          {tickerContent}
          {tickerContent}
          {tickerContent}
          {tickerContent}
        </div>

        {/* Dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-10"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gradient fade on right side (before dismiss button) */}
        <div
          className="absolute right-10 top-0 bottom-0 w-16 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, #0f1f3d)",
          }}
        />
      </div>
    </div>
  );
};

export default NfoBannerTop;
