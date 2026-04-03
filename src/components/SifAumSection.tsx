import { IndianRupee, Users, Layers, TrendingUp } from "lucide-react";

const aumData = [
  {
    category: "Equity Long-Short Fund",
    schemes: 3,
    folios: 6453,
    aum: 1051.76,
  },
  {
    category: "Equity Ex-Top 100 Long-Short Fund",
    schemes: 2,
    folios: 10496,
    aum: 1269.93,
  },
  {
    category: "Hybrid Long-Short Fund",
    schemes: 6,
    folios: 22902,
    aum: 7389.19,
  },
];

const totalSchemes = 11;
const totalFolios = 39851;
const totalAum = 9710.87;

const formatNumber = (n: number) =>
  n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

const SifAumSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background scroll-mt-28">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-3">
            <IndianRupee className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">
              Industry Overview
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            AUM of SIF
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Assets Under Management across all Specialized Investment Fund categories
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="rounded-xl border bg-card shadow-sm p-4 text-center">
            <Layers className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <p className="text-lg sm:text-2xl font-bold text-foreground">{totalSchemes}</p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">Total Schemes</p>
          </div>
          <div className="rounded-xl border bg-card shadow-sm p-4 text-center">
            <Users className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <p className="text-lg sm:text-2xl font-bold text-foreground">
              {formatNumber(totalFolios)}
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">Total Folios</p>
          </div>
          <div className="rounded-xl border bg-card shadow-sm p-4 text-center">
            <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <p className="text-lg sm:text-2xl font-bold text-foreground">
              ₹{formatNumber(totalAum)} Cr
            </p>
            <p className="text-[11px] sm:text-xs text-muted-foreground">Total AUM</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b bg-muted/40">
            <span className="text-sm font-semibold text-foreground">Category-wise Breakdown</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/20">
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Category</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Schemes</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Folios</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">AUM (₹ Cr)</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground hidden sm:table-cell">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {aumData.map((item) => (
                  <tr key={item.category} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">{item.schemes}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">{formatNumber(item.folios)}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-foreground">
                      ₹{formatNumber(item.aum)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden sm:table-cell">
                      {((item.aum / totalAum) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/40 font-bold">
                  <td className="px-4 py-3 text-foreground">Grand Total</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{totalSchemes}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{formatNumber(totalFolios)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">₹{formatNumber(totalAum)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground hidden sm:table-cell">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="mt-4 text-[11px] text-muted-foreground italic text-center">
          Data as of February 2026. Source: AMFI. AUM figures are in INR Crores. Debt & Active Asset Allocator categories currently have no launched schemes.
        </p>
      </div>
    </section>
  );
};

export default SifAumSection;
