import { Sparkles, ExternalLink, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import dspLogo from "@/assets/logos/dsp-mutual-fund.png";
import miraeLogo from "@/assets/logos/mirae-asset-mutual-fund.png";

const NFO_DATA = [
  { name: "Apex SIF", amc: "Aditya Birla Capital", category: "Hybrid Long Short Fund", dates: "6th - 18th March", link: "https://apexsif.adityabirlacapital.com/", analysis: "/apex-hybrid-long-short" },
  { name: "Arudha SIF", amc: "Bandhan", category: "Equity Long Short Fund", dates: "5th - 18th March", link: "https://www.arudhasif.com/", analysis: "/arudha-equity-long-short" },
  { name: "Dyna SIF", amc: "360 One", category: "Active Asset Allocator", dates: "6th - 20th March", link: "https://dynasif.360.one/", analysis: "/dyna-active-asset-allocator" },
];

interface UpcomingSif {
  name: string;
  amc: string;
  logo: string;
  url: string;
}

const UPCOMING_SIFS: UpcomingSif[] = [
  { name: "Endurance SIF", amc: "DSP Mutual Fund", logo: dspLogo as unknown as string, url: "https://www.dspim.com/endurance-sif/" },
  { name: "Platinum SIF", amc: "Mirae Asset Mutual Fund", logo: miraeLogo as unknown as string, url: "https://www.miraeassetmf.co.in/sif" },
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
                    <img 
                      src={sif.logo} 
                      alt={sif.name} 
                      className="h-8 w-auto rounded mr-3"
                      loading="lazy"
                    />
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

        {/* NFO Table */}
        <div className="max-w-4xl mx-auto mt-6">
          <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 text-xs sm:text-sm mb-3">
            OPEN NFOs
          </Badge>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold text-foreground">SIF</TableHead>
                  <TableHead className="font-semibold text-foreground">AMC</TableHead>
                  <TableHead className="font-semibold text-foreground hidden sm:table-cell">Category</TableHead>
                  <TableHead className="font-semibold text-foreground">NFO Dates</TableHead>
                  <TableHead className="font-semibold text-foreground text-center hidden sm:table-cell">Analysis</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {NFO_DATA.map((nfo) => (
                  <TableRow key={nfo.name}>
                    <TableCell className="font-medium text-foreground">{nfo.name}</TableCell>
                    <TableCell className="text-muted-foreground">{nfo.amc}</TableCell>
                    <TableCell className="text-muted-foreground hidden sm:table-cell">{nfo.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-50 text-xs whitespace-nowrap">
                        {nfo.dates}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center hidden sm:table-cell">
                      {nfo.analysis ? (
                        <a href={nfo.analysis} className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                          <FileText className="w-3.5 h-3.5" /> Read
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <a href={nfo.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                        Apply <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSifsScroller;
