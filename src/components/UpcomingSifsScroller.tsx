import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AmcLogo from "@/components/AmcLogo";

interface UpcomingSif {
  name: string;
  amc: string;
  url: string;
}

const UPCOMING_SIFS: UpcomingSif[] = [
  { name: "Endurance SIF", amc: "DSP Mutual Fund", url: "https://www.dspim.com/endurance-sif/" },
  { name: "Platinum SIF", amc: "Mirae Asset Mutual Fund", url: "https://www.miraeassetmf.co.in/sif" },
];

const UpcomingSifsScroller = () => {
  return (
    <section className="py-6 sm:py-10 bg-background">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-3 sm:mb-4">
          <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-50 text-xs sm:text-sm">
            UPCOMING SIFS
          </Badge>
        </div>
        
        <div className="max-w-4xl mx-auto overflow-hidden rounded-lg bg-gradient-to-r from-amber-900/90 via-slate-900 to-amber-900/90 border border-amber-600/30">
          <div className="flex items-center animate-marquee whitespace-nowrap py-3 px-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center mx-8">
                {UPCOMING_SIFS.map((sif, sifIndex) => (
                  <a 
                    key={`${sif.name}-${i}-${sifIndex}`} 
                    href={sif.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center hover:opacity-80 transition-opacity"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
                    <span className="text-amber-400 font-semibold text-sm mr-3">COMING SOON</span>
                    <AmcLogo amc={sif.amc} className="mr-3" />
                    <span className="text-white font-medium">
                      {sif.name} by {sif.amc}
                    </span>
                    <span className="text-amber-400/70 ml-3 mr-8">•</span>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-4">
          <a
            href="/upcoming-sifs"
            className="text-sm text-primary hover:underline font-medium"
          >
            View all upcoming SIFs →
          </a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSifsScroller;
