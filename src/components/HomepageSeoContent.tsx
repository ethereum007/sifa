import Link from "next/link";

const FAQ_DATA = [
  {
    q: "What is a Specialized Investment Fund (SIF)?",
    a: "A SIF is a new SEBI-regulated investment product introduced in 2024 that bridges the gap between Mutual Funds and Portfolio Management Services (PMS). SIFs combine the ease and transparency of mutual funds with advanced long-short strategies using derivatives. They allow fund managers to take unhedged short positions up to 25% of net assets, enabling potential returns in both rising and falling markets.",
  },
  {
    q: "What is the minimum investment for SIF in India?",
    a: "The minimum aggregate investment for SIF is \u20b910,00,000 (\u20b910 lakhs) at the PAN level across all SIF strategies offered by an AMC. Accredited investors are exempt from this threshold. After meeting the initial \u20b910 lakh threshold via lumpsum, SIP/STP/SWP options become available with amounts as low as \u20b95,000\u2013\u20b910,000 per installment.",
  },
  {
    q: "How is SIF different from PMS (Portfolio Management Services)?",
    a: "SIFs have a much lower entry point (\u20b910 lakhs vs \u20b950 lakhs for PMS), offer mutual fund-like taxation benefits (12.5% LTCG vs per-transaction taxation in PMS), provide daily/weekly liquidity, and are pooled investment vehicles. PMS provides individually managed portfolios with higher customization but comes with higher fees and tax complexity.",
  },
  {
    q: "How is SIF different from Mutual Funds?",
    a: "While Mutual Funds can only use derivatives for hedging purposes, SIFs can take unhedged short positions up to 25% of net assets. This allows SIF fund managers to potentially generate alpha from both rising and falling markets. SIFs require a higher minimum investment (\u20b910 lakhs vs \u20b9500 for MFs) but retain MF-like taxation benefits and SEBI regulation.",
  },
  {
    q: "Who can invest in SIF?",
    a: "Any Indian resident, HUF, or NRI with a minimum investment capacity of \u20b910 lakhs can invest in SIFs. Investors must complete standard KYC/AML/FATCA requirements and open a separate SIF folio with the AMC. Accredited investors (as defined by SEBI) are exempt from the minimum investment threshold.",
  },
  {
    q: "How are Specialized Investment Funds taxed?",
    a: "SIF taxation follows mutual fund taxation rules. Equity-oriented SIFs: 12.5% LTCG (holding period over 12 months), 20% STCG. Debt-oriented SIFs: taxed as per the investor\u2019s income tax slab rate. Hybrid SIFs (less than 65% in equity or debt): 12.5% LTCG after 12 months, STCG as per slab. Fund-level taxation is nil under Section 10(23D).",
  },
  {
    q: "What types of SIF strategies are available?",
    a: "SIFs offer strategies across three categories: (1) Equity-Oriented \u2014 Equity Long-Short, Equity Ex-Top 100 Long-Short, Sector Rotation Long-Short; (2) Debt-Oriented \u2014 Debt Long-Short, Sectoral Debt Long-Short; (3) Hybrid \u2014 Active Asset Allocator Long-Short, Hybrid Long-Short Fund. Each uses derivatives for long-short positioning.",
  },
  {
    q: "How many SIFs are currently active in India?",
    a: "As of April 2026, SIFPrime tracks 19 SIF strategies — 17 live funds plus 2 in NFO — across 11 AMCs including Quant (qSIF), Edelweiss (Altiva), SBI (Magnum), Tata (Titanium), ICICI (iSIF), Bandhan (Arudha), ITI (Diviniti), 360 ONE (Dyna), ABSL (Apex), Franklin Templeton (Sapphire) and The Wealth Company (WSIF). Live NAV, returns and strategy analysis for every fund.",
  },
];

const COMPARISON_DATA = [
  { feature: "Minimum Investment", sif: "\u20b910 Lakh", mf: "\u20b9500", pms: "\u20b950 Lakh", aif: "\u20b91 Crore" },
  { feature: "Short Selling", sif: "Yes (25%)", mf: "No", pms: "No", aif: "Yes" },
  { feature: "Derivatives Use", sif: "25% + Hedging", mf: "Only Hedging", pms: "Only Hedging", aif: "Allowed" },
  { feature: "LTCG Tax (Equity)", sif: "12.5%", mf: "12.5%", pms: "Per Transaction", aif: "Category Dependent" },
  { feature: "STCG Tax (Equity)", sif: "20%", mf: "20%", pms: "Per Transaction", aif: "Category Dependent" },
  { feature: "Liquidity", sif: "Daily/Weekly", mf: "Daily", pms: "Monthly", aif: "Lock-in Period" },
  { feature: "SEBI Regulated", sif: "Yes", mf: "Yes", pms: "Yes", aif: "Yes" },
  { feature: "Strategy Flexibility", sif: "High", mf: "Low", pms: "High", aif: "Very High" },
  { feature: "Investor Type", sif: "HNI", mf: "Retail / HNI", pms: "HNI", aif: "Ultra HNI" },
  { feature: "Portfolio Type", sif: "Pooled", mf: "Pooled", pms: "Individual", aif: "Pooled" },
];

export default function HomepageSeoContent() {
  return (
    <div className="bg-background">
      {/* Why SIFPrime Section */}
      <section className="py-12 sm:py-16 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
            Why SIFPrime?
          </h2>
          <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-8">
            SIFPrime is India&apos;s most comprehensive platform for Specialized Investment Funds.
            Here&apos;s why thousands of investors and distributors trust us:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">All 19 SIFs Tracked</h3>
              <p className="text-sm text-muted-foreground">
                Live NAV, returns, AUM, and strategy breakdowns for every SEBI-registered Specialized Investment Fund in India.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Independent Comparison</h3>
              <p className="text-sm text-muted-foreground">
                Unbiased SIF vs MF vs PMS vs AIF comparison. Compare minimum investment, taxation, strategy flexibility and returns side-by-side.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Expert SIF Guidance</h3>
              <p className="text-sm text-muted-foreground">
                Free consultation with AMFI-registered SIF distributors. Get personalized advice on which SIF strategy suits your goals.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold text-foreground mb-2">Distributor Network</h3>
              <p className="text-sm text-muted-foreground">
                MFDs and RIAs can partner with SIFPrime to offer SIF products to their clients and earn commissions from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIF vs MF vs PMS vs AIF — Server-rendered HTML Table */}
      <section className="py-12 sm:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
            SIF vs Mutual Fund vs PMS vs AIF — Full Comparison
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Understand how Specialized Investment Funds compare with other Indian investment products on key parameters.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Feature</th>
                  <th className="text-center p-3 font-bold text-primary bg-primary/5">SIF</th>
                  <th className="text-center p-3 font-semibold text-foreground">Mutual Fund</th>
                  <th className="text-center p-3 font-semibold text-foreground">PMS</th>
                  <th className="text-center p-3 font-semibold text-foreground">AIF</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/50">
                    <td className="p-3 font-medium text-foreground">{row.feature}</td>
                    <td className="p-3 text-center font-semibold text-primary bg-primary/5">{row.sif}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.mf}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.pms}</td>
                    <td className="p-3 text-center text-muted-foreground">{row.aif}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-6">
            <Link href="/sif-vs-pms-vs-aif" className="text-primary font-medium hover:underline">
              Read detailed SIF vs PMS vs AIF comparison &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ Accordion — Server-rendered HTML */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 text-center">
            Frequently Asked Questions About SIF
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Everything you need to know about Specialized Investment Funds in India
          </p>
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQ_DATA.map((faq, i) => (
              <details
                key={i}
                className="group bg-card border border-border rounded-lg overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-foreground hover:text-primary list-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 shrink-0 text-muted-foreground group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-4 pb-4 text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links Section */}
      <section className="py-8 sm:py-12 border-t border-border/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
            Explore More on SIFPrime
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-sm">
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Learn About SIFs</h3>
              <ul className="space-y-1.5">
                <li><Link href="/what-is-sif" className="text-muted-foreground hover:text-primary">What is SIF?</Link></li>
                <li><Link href="/sif-strategies" className="text-muted-foreground hover:text-primary">SIF Strategies</Link></li>
                <li><Link href="/sif-minimum-investment" className="text-muted-foreground hover:text-primary">Minimum Investment</Link></li>
                <li><Link href="/sif-tax-guide" className="text-muted-foreground hover:text-primary">SIF Tax Guide</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Compare</h3>
              <ul className="space-y-1.5">
                <li><Link href="/sif-vs-mf" className="text-muted-foreground hover:text-primary">SIF vs Mutual Fund</Link></li>
                <li><Link href="/sif-vs-pms-vs-aif" className="text-muted-foreground hover:text-primary">SIF vs PMS vs AIF</Link></li>
                <li><Link href="/best-hybrid-sif" className="text-muted-foreground hover:text-primary">Best Hybrid SIF</Link></li>
                <li><Link href="/all-sifs-india-ranked-explained" className="text-muted-foreground hover:text-primary">All SIFs Ranked</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Performance</h3>
              <ul className="space-y-1.5">
                <li><Link href="/sifperformance" className="text-muted-foreground hover:text-primary">SIF Performance</Link></li>
                <li><Link href="/sifreturns" className="text-muted-foreground hover:text-primary">SIF Returns</Link></li>
                <li><Link href="/sifnav" className="text-muted-foreground hover:text-primary">Live SIF NAV</Link></li>
                <li><Link href="/sif-funds-launched" className="text-muted-foreground hover:text-primary">SIF Funds Launched</Link></li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">For Distributors</h3>
              <ul className="space-y-1.5">
                <li><Link href="/become-distributor" className="text-muted-foreground hover:text-primary">Become a SIF Distributor</Link></li>
                <li><Link href="/distributors/sif-billion-dollar-opportunity" className="text-muted-foreground hover:text-primary">MFD Opportunity</Link></li>
                <li><Link href="/sif-liquidity-guide" className="text-muted-foreground hover:text-primary">SIF Liquidity Guide</Link></li>
                <li><Link href="/sif-sip-swp-guide" className="text-muted-foreground hover:text-primary">SIP/SWP in SIF</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
