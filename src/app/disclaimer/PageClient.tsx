"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";



const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Disclaimer</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: February 10, 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Investment Risks</h2>
              <p className="text-muted-foreground leading-relaxed">
                Investments in Specialized Investment Funds (SIFs) and other securities are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. The value of investments and the income from them may go down as well as up.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">No Guarantee of Returns</h2>
              <p className="text-muted-foreground leading-relaxed">
                There is no guarantee or assurance of returns on any investment. The NAV of SIF schemes can fluctuate based on market conditions, and investors may receive back less than their original investment amount.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Information Only</h2>
              <p className="text-muted-foreground leading-relaxed">
                SIF Prime is a discovery and comparison platform. The information provided on this website is for general informational and educational purposes only. It does not constitute investment advice, financial advice, trading advice, or any other form of professional advice. You should not make any investment decisions based solely on the information provided on this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">SEBI Regulation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Specialized Investment Funds (SIFs) are regulated by the Securities and Exchange Board of India (SEBI). SIF Prime acts as an AMFI-registered distributor and provides information about SEBI-regulated products. We do not operate as an investment advisor, portfolio manager, or stock exchange.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Data Accuracy</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we make every effort to ensure that the NAV data, fund performance figures, and other information on this website are accurate and up-to-date, we do not warrant the completeness, reliability, or accuracy of this information. Data is sourced from publicly available sources including AMFI and respective Asset Management Companies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Minimum Investment Requirements</h2>
              <p className="text-muted-foreground leading-relaxed">
                SIFs typically require a minimum investment of ₹10 Lakhs. Investment requirements may vary by scheme and are subject to change. Please verify the latest minimum investment amounts with the respective fund houses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Third-Party Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website may contain links to third-party websites, advertisements, or content. SIF Prime does not endorse, guarantee, or assume responsibility for any third-party content or websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Consult a Professional</h2>
              <p className="text-muted-foreground leading-relaxed">
                Before making any investment decisions, we strongly recommend consulting with a qualified financial advisor, tax consultant, or investment professional who can assess your individual financial situation, risk tolerance, and investment goals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions or concerns regarding this disclaimer, please contact us at:<br />
                Email: info@sifprime.com<br />
                Phone: +91 90329 99466
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Disclaimer;
