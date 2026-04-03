"use client";
import { Badge } from "@/components/ui/badge";
import dynaSifLogo from "@/assets/logos/dyna-sif.png";

import { WHATSAPP_URL } from "@/lib/whatsapp";

const NFO_ANNOUNCEMENTS = [
  {
    fund: "Dyna SIF",
    amc: "360 ONE Asset",
    dates: "6th Feb – 20th Feb 2026",
    logo: dynaSifLogo as unknown as string,
    fundLink: "/upcoming-sifs",
  },
];

const NfoAnnouncementBanner = () => {
  // Duplicate for seamless loop
  const duplicated = [...NFO_ANNOUNCEMENTS, ...NFO_ANNOUNCEMENTS, ...NFO_ANNOUNCEMENTS, ...NFO_ANNOUNCEMENTS, ...NFO_ANNOUNCEMENTS, ...NFO_ANNOUNCEMENTS];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white py-2.5 overflow-hidden">
      <div className="flex w-fit animate-scroll-left hover:[animation-play-state:paused]">
        {duplicated.map((nfo, index) => (
          <div key={index} className="flex items-center gap-4 px-6 sm:px-10 flex-shrink-0">
            <Badge className="bg-white text-purple-700 hover:bg-white text-xs sm:text-sm font-bold px-2.5 py-0.5 animate-pulse">
              🔥 NFO OPEN
            </Badge>
            <img
              src={nfo.logo}
              alt={nfo.fund}
              className="h-7 sm:h-8 w-auto rounded"
              loading="eager"
            />
            <a
              href={nfo.fundLink}
              className="font-bold text-sm sm:text-base hover:underline underline-offset-2"
            >
              {nfo.fund} <span className="font-normal text-white/80">by {nfo.amc}</span>
            </a>
            <span className="text-white/60">|</span>
            <span className="text-sm text-white/90 font-medium">{nfo.dates}</span>
            <span className="text-white/60">|</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap"
              onClick={(e) => e.stopPropagation()}
            >
              Schedule a Consultation →
            </a>
            <span className="text-white/30 mx-2">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NfoAnnouncementBanner;
