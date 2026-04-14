import Link from "next/link";

interface Fund {
  name: string;
  href: string;
  amc: string;
  category: string;
}

const ALL_FUNDS: Fund[] = [
  { name: "qSIF Equity Long Short", href: "/sifs/qsif-equity-long-short", amc: "Quant", category: "Equity Long Short" },
  { name: "qSIF Ex-Top 100 Long Short", href: "/sifs/qsif-ex-top-100-long-short", amc: "Quant", category: "Equity Ex-Top 100" },
  { name: "qSIF Hybrid Long Short", href: "/sifs/qsif-hybrid-long-short", amc: "Quant", category: "Hybrid Long Short" },
  { name: "Diviniti SIF Equity Long Short", href: "/sifs/diviniti-equity-long-short", amc: "ITI", category: "Equity Long Short" },
  { name: "Dyna SIF Equity Long Short", href: "/sifs/dyna-equity-long-short", amc: "360 ONE", category: "Equity Long Short" },
  { name: "Dyna SIF Active Asset Allocator", href: "/sifs/dyna-active-asset-allocator", amc: "360 ONE", category: "Active Asset Allocator" },
  { name: "Arudha Equity Long Short", href: "/arudha-equity-long-short", amc: "Bandhan", category: "Equity Long Short" },
  { name: "Arudha Hybrid Long Short", href: "/sifs/arudha-hybrid-long-short", amc: "Bandhan", category: "Hybrid Long Short" },
  { name: "Altiva Hybrid Long Short", href: "/sifs/altiva-hybrid-long-short", amc: "Edelweiss", category: "Hybrid Long Short" },
  { name: "Magnum SIF Hybrid Long Short", href: "/sifs/magnum-hybrid-long-short", amc: "SBI", category: "Hybrid Long Short" },
  { name: "Titanium SIF Hybrid Long Short", href: "/sifs/titanium-hybrid-long-short", amc: "Tata", category: "Hybrid Long Short" },
  { name: "iSIF Equity Long Short", href: "/sifs/isif", amc: "ICICI", category: "Equity Long Short" },
  { name: "iSIF Ex-Top 100", href: "/sifs/isif/extop100", amc: "ICICI", category: "Equity Ex-Top 100" },
  { name: "iSIF Hybrid Long Short", href: "/sifs/isif/hybrid", amc: "ICICI", category: "Hybrid Long Short" },
  { name: "Apex SIF Hybrid Long Short", href: "/sifs/apex-hybrid-long-short", amc: "ABSL", category: "Hybrid Long Short" },
];

interface RelatedFundsProps {
  currentPath: string;
}

export default function RelatedFunds({ currentPath }: RelatedFundsProps) {
  const current = ALL_FUNDS.find((f) => f.href === currentPath);

  // Pick related: same category first, then others, exclude self
  const others = ALL_FUNDS.filter((f) => f.href !== currentPath);
  const sameCategory = others.filter((f) => f.category === current?.category);
  const differentCategory = others.filter((f) => f.category !== current?.category);
  const related = [...sameCategory, ...differentCategory].slice(0, 4);

  return (
    <section className="py-10 sm:py-14 border-t border-border/50 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center">
          Related SIF Funds
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {related.map((fund) => (
            <Link
              key={fund.href}
              href={fund.href}
              className="p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all"
            >
              <span className="text-xs text-primary font-medium">{fund.amc}</span>
              <h3 className="font-semibold text-foreground text-sm mt-1">{fund.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{fund.category}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 space-x-4">
          <Link href="/" className="text-sm text-primary hover:underline">
            &larr; Back to SIFPrime Home
          </Link>
          <Link href="/sif-funds-launched" className="text-sm text-primary hover:underline">
            View All SIF Funds &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
