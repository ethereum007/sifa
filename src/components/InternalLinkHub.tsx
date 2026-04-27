const FUND_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Equity Long Short Funds",
    links: [
      { label: "qSIF by Quant", href: "/sifs/qsif-equity-long-short" },
      { label: "Diviniti SIF by ITI", href: "/sifs/diviniti-equity-long-short" },
      { label: "Dyna SIF by 360 ONE", href: "/sifs/dyna-equity-long-short" },
      { label: "Arudha by Bandhan", href: "/arudha-equity-long-short" },
      { label: "Sapphire by Franklin Templeton", href: "/sifs/sapphire-equity-long-short" },
    ],
  },
  {
    title: "Ex-Top 100 Long Short",
    links: [
      { label: "qSIF Ex-Top 100 by Quant", href: "/sifs/qsif-ex-top-100-long-short" },
      { label: "iSIF Ex-Top 100 by ICICI", href: "/sifs/isif/extop100" },
    ],
  },
  {
    title: "Hybrid Long Short Funds",
    links: [
      { label: "qSIF Hybrid by Quant", href: "/sifs/qsif-hybrid-long-short" },
      { label: "iSIF Hybrid by ICICI", href: "/sifs/isif/hybrid" },
      { label: "Magnum SIF by SBI", href: "/sifs/magnum-hybrid-long-short" },
      { label: "Titanium SIF by Tata", href: "/sifs/titanium-hybrid-long-short" },
      { label: "Altiva SIF by Edelweiss", href: "/sifs/altiva-hybrid-long-short" },
      { label: "Arudha SIF by Bandhan", href: "/sifs/arudha-hybrid-long-short" },
      { label: "Apex SIF by ABSL", href: "/sifs/apex-hybrid-long-short" },
    ],
  },
  {
    title: "Active Asset Allocator",
    links: [
      { label: "Dyna AAA by 360 ONE", href: "/sifs/dyna-active-asset-allocator" },
      { label: "qSIF AAA by Quant", href: "/sifs/qsif-active-asset-allocator-long-short" },
    ],
  },
];

const GUIDE_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Basics & Selection",
    links: [
      { label: "What is a SIF?", href: "/what-is-sif" },
      { label: "All 18 SIFs Ranked", href: "/all-sifs-india-ranked-explained" },
      { label: "Which SIF Should You Invest In?", href: "/which-sif-should-you-invest-in" },
      { label: "Best SIF to Invest in 2026", href: "/blog/best-sif-to-invest-2026" },
      { label: "Compare SIFs Side by Side", href: "/sif-compare" },
      { label: "Best Hybrid SIF", href: "/best-hybrid-sif" },
      { label: "Ex-Top 100 SIF Explained", href: "/ex-top-100-sif-explained" },
    ],
  },
  {
    title: "Comparisons",
    links: [
      { label: "SIF vs PMS vs AIF", href: "/sif-vs-pms-vs-aif" },
      { label: "SIF vs Mutual Fund", href: "/sif-vs-mf" },
      { label: "SIF vs PMS: Detailed", href: "/blog/sif-vs-pms-detailed-comparison" },
    ],
  },
  {
    title: "Rules, Tax & Mechanics",
    links: [
      { label: "Tax Guide: LTCG & STCG", href: "/sif-tax-guide" },
      { label: "Redemption Rules", href: "/sif-redemption-rules" },
      { label: "Liquidity Guide", href: "/sif-liquidity-guide" },
      { label: "Derivatives Explained", href: "/sif-derivatives-explained" },
      { label: "SWP & SIP Guide", href: "/sif-sip-swp-guide" },
      { label: "SIP Minimum Amount", href: "/blog/sif-sip-minimum-amount" },
    ],
  },
  {
    title: "For NRIs & Advisors",
    links: [
      { label: "NRI Guide to SIF", href: "/nri-sif-guide" },
      { label: "NRI Complete Guide", href: "/blog/sif-for-nri-complete-guide" },
      { label: "SIF for MFDs & Distributors", href: "/sif-for-mfd" },
    ],
  },
  {
    title: "Live Data",
    links: [
      { label: "SIF Performance", href: "/sif-performance" },
      { label: "NAV Tracker", href: "/sifnav" },
      { label: "NFO Centre", href: "/upcoming-sifs" },
    ],
  },
];

type Props = {
  variant?: "full" | "funds" | "guides";
  heading?: string;
  subheading?: string;
};

const InternalLinkHub = ({
  variant = "full",
  heading = "Explore All SIFs & Guides",
  subheading = "Every SIF fund page, guide, and comparison on SIFPrime — in one place.",
}: Props) => {
  const showFunds = variant === "full" || variant === "funds";
  const showGuides = variant === "full" || variant === "guides";

  return (
    <section className="py-12 lg:py-16 border-t border-border/60 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{heading}</h2>
          <p className="text-sm text-muted-foreground">{subheading}</p>
        </div>

        {showFunds && (
          <div className="mb-10">
            <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4">
              SIF Funds (18 tracked)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FUND_GROUPS.map((group) => (
                <div key={group.title}>
                  <h4 className="text-sm font-semibold text-foreground mb-3">{group.title}</h4>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-foreground/70 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {showGuides && (
          <div>
            <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4">
              Guides & Resources
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {GUIDE_GROUPS.map((group) => (
                <div key={group.title}>
                  <h4 className="text-sm font-semibold text-foreground mb-3">{group.title}</h4>
                  <ul className="space-y-2">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-foreground/70 hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InternalLinkHub;
