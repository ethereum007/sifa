import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import ReportDownloadGate from "@/components/ReportDownloadGate";

const PerformanceBanner = () => {
  return (
    <section className="py-8 sm:py-10">
      <div className="container mx-auto px-4 space-y-4">
        {/* Performance Report Link */}
        <Link href="/performance/march-2026" className="block group">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/40 transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">New Report</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                    LIVE
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  March 2026 SIF Performance Report
                </h3>
                <p className="text-base text-muted-foreground mt-1">
                  Compare returns across Hybrid, Equity & Ex-Top 100 strategies
                </p>
              </div>
              <span className="flex items-center gap-2 text-primary font-semibold text-base group-hover:gap-3 transition-all shrink-0">
                View Report <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* PDF Download */}
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileDown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="text-base font-bold text-foreground">Download PDF Report</h4>
                <p className="text-sm text-muted-foreground">Free — enter email to download</p>
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
