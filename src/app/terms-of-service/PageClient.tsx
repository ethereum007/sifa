"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";



const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: February 10, 2026</p>

          <div className="prose prose-sm max-w-none space-y-6 text-foreground/90">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the SIF Prime website (sifprime.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                SIF Prime is an information and discovery platform for SEBI-regulated Specialized Investment Funds (SIFs) in India. We provide fund data, NAV information, comparisons, and educational content. SIF Prime is not a stock exchange, investment advisor, or portfolio manager.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. No Investment Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                The content on this website is for informational purposes only and does not constitute investment advice, financial advice, or any form of recommendation. You should consult with a qualified financial advisor before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. User Obligations</h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>You agree to provide accurate and complete information when using our forms</li>
                <li>You agree not to use the website for any unlawful purpose</li>
                <li>You agree not to attempt to gain unauthorized access to any part of the website</li>
                <li>You agree not to scrape, copy, or reproduce content without prior written consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, data compilations, and software, is the property of SIF Prime or its content suppliers and is protected by Indian and international intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">6. Accuracy of Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide accurate and up-to-date information, we make no warranties or representations regarding the accuracy, completeness, or reliability of any content on this website. NAV data and fund performance figures are sourced from public sources and may be subject to delays.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                SIF Prime shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from the use of or inability to use this website or any information provided herein. This includes but is not limited to losses arising from investment decisions made based on information found on this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">8. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">9. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms of Service at any time without prior notice. Continued use of the website after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms of Service, contact us at:<br />
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

export default TermsOfService;
