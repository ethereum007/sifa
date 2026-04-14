"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Shield, Target, TrendingUp, Layers, HelpCircle } from "lucide-react";
import { CONSULTATION_URL } from "@/lib/whatsapp";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const sifData = [
  { name: "qSIF Equity Long Short", amc: "Quant", category: "Equity LS", launch: "Feb 2025", path: "/sifs/qsif-equity-long-short" },
  { name: "Diviniti Equity Long Short", amc: "ITI", category: "Equity LS", launch: "Mar 2025", path: "/sifs/diviniti-equity-long-short" },
  { name: "Dyna SIF Equity Long Short", amc: "360 ONE", category: "Equity LS", launch: "Mar 2025", path: "/sifs/dyna-equity-long-short" },
  { name: "Arudha Equity Long Short", amc: "Bandhan", category: "Equity LS", launch: "Apr 2025", path: "/arudha-equity-long-short" },
  { name: "qSIF Ex-Top 100", amc: "Quant", category: "Ex-Top 100", launch: "Feb 2025", path: "/sifs/qsif-ex-top-100-long-short" },
  { name: "iSIF Ex-Top 100", amc: "ICICI Prudential", category: "Ex-Top 100", launch: "Apr 2025", path: "/sifs/isif/extop100" },
  { name: "qSIF Hybrid Long Short", amc: "Quant", category: "Hybrid LS", launch: "Feb 2025", path: "/sifs/qsif-hybrid-long-short" },
  { name: "iSIF Hybrid Long Short", amc: "ICICI Prudential", category: "Hybrid LS", launch: "Apr 2025", path: "/sifs/isif/hybrid" },
  { name: "Magnum SIF Hybrid Long Short", amc: "SBI", category: "Hybrid LS", launch: "Mar 2025", path: "/sifs/magnum-hybrid-long-short" },
  { name: "Titanium SIF Hybrid Long Short", amc: "Tata", category: "Hybrid LS", launch: "Mar 2025", path: "/sifs/titanium-hybrid-long-short" },
  { name: "Altiva Hybrid Long Short", amc: "Edelweiss", category: "Hybrid LS", launch: "Mar 2025", path: "/sifs/altiva-hybrid-long-short" },
  { name: "Arudha Hybrid Long Short", amc: "Bandhan", category: "Hybrid LS", launch: "Apr 2025", path: "/sifs/arudha-hybrid-long-short" },
  { name: "Apex SIF Hybrid Long Short", amc: "ABSL", category: "Hybrid LS", launch: "Mar 2025", path: "/apex-hybrid-long-short" },
  { name: "Dyna SIF Active Asset Allocator", amc: "360 ONE", category: "AAA", launch: "Mar 2025", path: "/sifs/dyna-active-asset-allocator" },
];

const categoryColors: Record<string, string> = {
  "Equity LS": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Ex-Top 100": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "Hybrid LS": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "AAA": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

const CompareSifs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                SIF Comparison Tool
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-2">
                Compare All 14 SIFs in India
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                A comprehensive side-by-side comparison of every Specialized Investment Fund launched in India. View fund names, AMCs, categories, launch dates, and minimum investment requirements in one place to make an informed decision.
              </p>
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2">
                  Schedule a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-8 sm:py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              All 14 Specialized Investment Funds at a Glance
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              SEBI introduced Specialized Investment Funds (SIFs) in 2025 as a new category sitting between mutual funds and portfolio management services. As of early 2026, fourteen SIF schemes have been launched by leading AMCs across four distinct categories. The table below captures the essential data points for every SIF available to investors today.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">#</th>
                    <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Fund Name</th>
                    <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">AMC</th>
                    <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Launch Date</th>
                    <th className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">Min Investment</th>
                  </tr>
                </thead>
                <tbody>
                  {sifData.map((sif, idx) => (
                    <tr key={sif.path} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 text-muted-foreground">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium">
                        <a href={sif.path} className="text-primary hover:underline">
                          {sif.name}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-foreground">{sif.amc}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[sif.category] || ""}`}>
                          {sif.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{sif.launch}</td>
                      <td className="px-4 py-3 text-foreground font-medium">&#8377;10,00,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Data as of April 2026. Launch dates are approximate NFO close dates. All SIFs require a minimum investment of &#8377;10 Lakhs as mandated by SEBI.
            </p>
          </div>
        </section>

        {/* 4 SIF Categories */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              Understanding the 4 SIF Categories
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              SIFs are classified into four categories based on their investment mandate and risk profile. Each category serves a distinct investor need, from aggressive equity bets to conservative hybrid income strategies. Understanding these categories is the first step to choosing the right SIF for your portfolio.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Equity Long Short</h3>
                <p className="text-muted-foreground mb-3">
                  These SIFs invest primarily in equities and can take both long and short positions. They are allowed up to 25% unhedged short exposure using derivatives, enabling fund managers to profit during market corrections. Equity Long Short SIFs are best suited for investors who want equity market participation with downside protection through active hedging.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Funds:</strong> qSIF Equity LS (Quant), Diviniti (ITI), Dyna Equity LS (360 ONE), Arudha Equity LS (Bandhan)
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Ex-Top 100 Long Short</h3>
                <p className="text-muted-foreground mb-3">
                  Ex-Top 100 SIFs focus on mid-cap and small-cap equities by excluding the top 100 companies by market capitalisation. This gives investors concentrated exposure to high-growth companies outside the large-cap universe while retaining the ability to hedge through short positions. These funds carry higher volatility but offer potentially higher alpha generation.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Funds:</strong> qSIF Ex-Top 100 (Quant), iSIF Ex-Top 100 (ICICI Prudential)
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Hybrid Long Short</h3>
                <p className="text-muted-foreground mb-3">
                  The largest category with seven SIFs, Hybrid Long Short funds invest across both equity and debt. They can use derivatives for hedging and have flexibility to adjust their equity-debt allocation based on market conditions. Hybrid SIFs are designed for investors seeking moderate returns with lower volatility than pure equity strategies, making them an excellent alternative to traditional balanced funds.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Funds:</strong> qSIF Hybrid (Quant), iSIF Hybrid (ICICI Pru), Magnum (SBI), Titanium (Tata), Altiva (Edelweiss), Arudha Hybrid (Bandhan), Apex (ABSL)
                </p>
              </div>

              <div className="glass-card p-6">
                <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Active Asset Allocator (AAA)</h3>
                <p className="text-muted-foreground mb-3">
                  The Active Asset Allocator category is currently represented by a single SIF from 360 ONE. This fund dynamically shifts allocations across equities, debt, gold, and other asset classes based on market conditions and quantitative models. The AAA category suits investors who want a fully managed multi-asset solution without having to rebalance their portfolio manually.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Funds:</strong> Dyna SIF Active Asset Allocator (360 ONE)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Choose */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              How to Choose a SIF Based on Your Risk Appetite
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              Selecting the right SIF requires matching your risk tolerance, investment horizon, and return expectations with the right fund category. Here is a practical framework to guide your decision.
            </p>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 mt-1">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Conservative Investors (Low Risk)</h3>
                    <p className="text-muted-foreground">
                      If capital preservation is your primary goal and you are looking for returns better than fixed deposits with minimal equity risk, Hybrid Long Short SIFs are your best fit. Funds like Arudha Hybrid (Bandhan) and Magnum (SBI) maintain conservative equity allocations and focus on generating steady income through debt instruments while using derivatives only for protection. Expect annualised returns in the 8-10% range with significantly lower drawdowns than pure equity strategies. These are ideal for a 1-2 year investment horizon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 mt-1">
                    <Target className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Moderate Risk Investors</h3>
                    <p className="text-muted-foreground">
                      Investors comfortable with some equity volatility but seeking downside protection should consider Equity Long Short SIFs or the Active Asset Allocator. These funds can generate alpha in both rising and falling markets through their short positions. The Dyna SIF Active Asset Allocator from 360 ONE is particularly suitable as it dynamically manages allocation across asset classes. Equity Long Short SIFs from established AMCs like Quant and ITI offer a good balance of growth potential and risk management for a 2-3 year horizon.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Aggressive Investors (High Risk)</h3>
                    <p className="text-muted-foreground">
                      If you have a high risk appetite and a longer investment horizon of 3+ years, Ex-Top 100 Long Short SIFs provide exposure to the high-growth mid and small-cap universe with hedging capabilities. The qSIF Ex-Top 100 from Quant and iSIF Ex-Top 100 from ICICI Prudential focus on companies outside the Nifty 100, offering the potential for outsized returns. These funds are suitable for investors who already have large-cap exposure through mutual funds and want to diversify into a differentiated strategy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-1">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Key Factors to Consider</h3>
                    <p className="text-muted-foreground">
                      Beyond risk appetite, evaluate these factors when comparing SIFs: (1) AMC track record and fund manager experience, (2) redemption frequency, which varies from daily to monthly depending on the fund, (3) expense ratio and exit load structure, (4) the specific derivative strategies employed, and (5) the fund&apos;s benchmark and how it measures performance. Remember that all SIFs require a minimum investment of &#8377;10 Lakhs and are best suited for investors who meet SEBI&apos;s specified criteria for this product category.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Need Help Choosing the Right SIF?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Our SIF specialists can analyse your portfolio, risk profile, and investment goals to recommend the most suitable Specialized Investment Fund for you. Schedule a free consultation today.
            </p>
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="gold" size="lg" className="gap-2">
                Schedule a Consultation <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CompareSifs;
