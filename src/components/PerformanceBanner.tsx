import Link from "next/link";
import { TrendingUp, ArrowRight, FileDown } from "lucide-react";
import ReportDownloadGate from "@/components/ReportDownloadGate";

const PerformanceBanner = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4 space-y-4">
        {/* Performance Report Link */}
        <Link
          href="/performance/march-2026"
          className="block group"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 p-5 sm:p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">New Report</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground animate-pulse">
                      LIVE
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    March 2026 SIF Performance Report
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Compare returns across Hybrid, Equity & Ex-Top 100 strategies
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                View Report
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>

        {/* PDF Download Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/10 via-accent/5 to-primary/10 border border-accent/20 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                <FileDown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Download PDF Report</h4>
                <p className="text-xs text-muted-foreground">Free — enter email to download</p>
              </div>
            </div>
            <div className="flex-1 w-full sm:max-w-sm">
              <ReportDownloadGate compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceBanner;
