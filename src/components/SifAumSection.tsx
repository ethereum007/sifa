const aumData = [
  { category: "Equity Long-Short Fund", schemes: 3, folios: 6453, aum: 1051.76 },
  { category: "Equity Ex-Top 100 Long-Short Fund", schemes: 2, folios: 10496, aum: 1269.93 },
  { category: "Hybrid Long-Short Fund", schemes: 6, folios: 22902, aum: 7389.19 },
];

const totalSchemes = 11;
const totalFolios = 39851;
const totalAum = 9710.87;

const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 2 });

const SifAumSection = () => {
  return (
    <section className="py-10 sm:py-16 scroll-mt-28">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-serif-accent text-2xl sm:text-3xl" style={{ color: 'hsl(220, 30%, 10%)' }}>
            AUM of SIF
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Assets Under Management across all Specialized Investment Fund categories
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          {[
            { value: totalSchemes.toString(), label: "Total Schemes" },
            { value: fmt(totalFolios), label: "Total Folios" },
            { value: `₹${fmt(totalAum)} Cr`, label: "Total AUM" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xl sm:text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-sm font-semibold text-foreground">Category-wise Breakdown</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Category</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Schemes</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Folios</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">AUM (₹ Cr)</th>
                  <th className="text-right px-4 py-2.5 font-medium text-muted-foreground hidden sm:table-cell">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {aumData.map((item) => (
                  <tr key={item.category} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">{item.schemes}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">{fmt(item.folios)}</td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium text-foreground">₹{fmt(item.aum)}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground hidden sm:table-cell">
                      {((item.aum / totalAum) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-muted/30 font-bold">
                  <td className="px-4 py-3 text-foreground">Grand Total</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{totalSchemes}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{fmt(totalFolios)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">₹{fmt(totalAum)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground hidden sm:table-cell">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground italic text-center">
          Data as of February 2026. Source: AMFI. AUM figures are in INR Crores.
        </p>
      </div>
    </section>
  );
};

export default SifAumSection;
