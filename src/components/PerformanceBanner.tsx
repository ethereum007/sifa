import Link from "next/link";
import { ArrowRight, FileDown } from "lucide-react";
import ReportDownloadGate from "@/components/ReportDownloadGate";

const PerformanceBanner = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4 space-y-3">
        {/* Performance Report Link */}
        <Link href="/performance/march-2026" className="block group">
          <div className="rounded-xl border border-border bg-card p-5 sm:p-6 hover:border-primary/30 transition-all duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">New Report</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary">
                    LIVE
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  March 2026 SIF Performance Report
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Compare returns across Hybrid, Equity & Ex-Top 100 strategies
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-primary font-medium text-sm group-hover:gap-2.5 transition-all shrink-0">
                View Report <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>

        {/* PDF Download */}
        <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileDown className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">Download PDF Report</h4>
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
