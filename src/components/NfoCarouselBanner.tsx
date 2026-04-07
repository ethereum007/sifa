import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AmcLogo from "@/components/AmcLogo";

const NFO_ITEMS = [
  {
    name: "Apex SIF",
    amc: "Aditya Birla Capital",
    category: "Hybrid Long Short Fund",
    dates: "6th - 18th March",
    link: "https://apexsif.adityabirlacapital.com/",
    accent: "from-red-600/90 to-red-800/90",
    badgeClass: "bg-red-500/20 text-red-100 border-red-400/30",
  },
  {
    name: "Arudha SIF",
    amc: "Bandhan Mutual Fund",
    category: "Equity Long Short Fund",
    dates: "5th - 18th March",
    link: "/arudha-equity-long-short",
    accent: "from-blue-700/90 to-blue-900/90",
    badgeClass: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    name: "Dyna SIF",
    amc: "360 ONE Asset",
    category: "Active Asset Allocator",
    dates: "6th - 20th March",
    link: "https://dynasif.360.one/",
    accent: "from-violet-600/90 to-violet-900/90",
    badgeClass: "bg-violet-500/20 text-violet-100 border-violet-400/30",
  },
];

const NfoCarouselBanner = () => {
  return (
    <div className="w-full overflow-hidden bg-slate-950">
      <div className="flex animate-marquee">
        {[...Array(6)].map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex shrink-0">
            {NFO_ITEMS.map((nfo, i) => (
              <a
                key={`${nfo.name}-${repeatIdx}-${i}`}
                href={nfo.link}
                target={nfo.link.startsWith("http") ? "_blank" : undefined}
                rel={nfo.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex items-center gap-3 px-6 py-2.5 bg-gradient-to-r ${nfo.accent} hover:brightness-110 transition-all shrink-0`}
              >
                <AmcLogo amc={nfo.amc} />
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm whitespace-nowrap">{nfo.name}</span>
                  <Badge variant="outline" className={`text-[10px] ${nfo.badgeClass} whitespace-nowrap`}>
                    NFO: {nfo.dates}
                  </Badge>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/60 shrink-0" />
                <span className="text-white/20 ml-2">|</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NfoCarouselBanner;
