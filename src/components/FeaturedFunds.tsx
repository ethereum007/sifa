"use client";
import { RefreshCw } from "lucide-react";
import FundCard from "./FundCard";
import { useFundNavs, useSyncNavData } from "@/hooks/useFundNavs";
import { Button } from "./ui/button";
import { format } from "date-fns";

// Import AMC logos
import sbiLogo from "@/assets/logos/sbi-mutual-fund.png";
import quantLogo from "@/assets/logos/quant-mutual-fund.png";
import edelweissLogo from "@/assets/logos/edelweiss-mutual-fund.png";

// Fallback data when database is empty
const fallbackFunds = [
  {
    amc: "SBI Mutual Fund",
    name: "Magnum SIF",
    category: "Hybrid Long-Short Fund",
    nav: "₹10.0096",
    navDate: "02 Apr 2026",
    ter: "1.15",
    change: 0.70,
    logo: sbiLogo as unknown as string
  },
  {
    amc: "Quant Mutual Fund",
    name: "QSIF",
    category: "Equity Long-Short Fund",
    nav: "₹9.0718",
    navDate: "02 Apr 2026",
    ter: "2.24",
    change: 2.92,
    logo: quantLogo as unknown as string
  },
  {
    amc: "Edelweiss Mutual Fund",
    name: "Altiva",
    category: "Hybrid Long-Short Fund",
    nav: "₹10.2967",
    navDate: "01 Apr 2026",
    ter: "1.52",
    change: 1.17,
    logo: edelweissLogo as unknown as string
  },
  {
    amc: "Quant Mutual Fund",
    name: "QSIF Hybrid",
    category: "Hybrid Long-Short Fund",
    nav: "₹9.9268",
    navDate: "02 Apr 2026",
    ter: "2.25",
    change: 1.41,
    logo: quantLogo as unknown as string
  },
];

const getAmcLogo = (amcName: string | null): string => {
  if (!amcName) return sbiLogo as unknown as string;
  
  const lowerName = amcName.toLowerCase();
  if (lowerName.includes("sbi")) return sbiLogo as unknown as string;
  if (lowerName.includes("quant")) return quantLogo as unknown as string;
  if (lowerName.includes("edelweiss")) return edelweissLogo as unknown as string;
  
  return sbiLogo as unknown as string;
};

const FeaturedFunds = () => {
  const { data: navData, isLoading } = useFundNavs();
  const { mutate: syncNav, isPending: isSyncing } = useSyncNavData();

  // Transform database data to fund card format
  const funds = navData && navData.length > 0 
    ? navData.map(fund => ({
        amc: fund.amc_name || "Unknown AMC",
        name: fund.scheme_name.split(" - ")[0].replace(/Specialized Investment Fund/gi, "").trim(),
        category: fund.scheme_category || "Specialized Investment Fund",
        nav: `₹${fund.nav.toFixed(4)}`,
        navDate: format(new Date(fund.nav_date), "dd MMM yyyy"),
        ter: "1.50", // TER not available from AMFI data
        change: 0, // Daily change calculation would need historical data
        logo: getAmcLogo(fund.amc_name),
      }))
    : fallbackFunds;

  return (
    <section id="funds" className="py-20 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Featured SIFs
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Top Performing Funds
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Curated selection of India's best Specialized Investment Funds from leading AMCs
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => syncNav()}
            disabled={isSyncing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing NAVs...' : 'Sync Latest NAVs'}
          </Button>
        </div>

        {/* Fund Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="glass-card p-6 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-muted" />
                  <div className="space-y-2">
                    <div className="h-3 w-20 bg-muted rounded" />
                    <div className="h-4 w-32 bg-muted rounded" />
                  </div>
                </div>
                <div className="h-6 w-24 bg-muted rounded-full mb-4" />
                <div className="space-y-3 mb-6">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                </div>
              </div>
            ))
          ) : (
            funds.map((fund, index) => (
              <div 
                key={index} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FundCard {...fund} />
              </div>
            ))
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View All SIFs
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFunds;
