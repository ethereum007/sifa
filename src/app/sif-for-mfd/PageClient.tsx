"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  TrendingUp,
  Users,
  IndianRupee,
  Shield,
  BookOpen,
  Building2,
  Handshake,
  Rocket,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { CONSULTATION_URL, DISTRIBUTOR_WHATSAPP_GROUP } from "@/lib/whatsapp";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const SifForMfd = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                For Distributors
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 px-2">
                SIF — The Biggest Opportunity for MFDs Since Mutual Funds
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
                Specialized Investment Funds are creating a new revenue stream for Mutual Fund Distributors. Higher ticket sizes, HNI client acquisition, recurring trail income, and a first-mover advantage that will not last long. Here is everything you need to know.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                    Schedule a Consultation <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href={DISTRIBUTOR_WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                    Join Distributor WhatsApp Group <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why SIF is a Game-Changer */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              Why SIF Is a Game-Changer for MFDs
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              The mutual fund distribution business has become intensely competitive with shrinking margins. SIFs offer MFDs a fundamentally different value proposition that can transform your practice.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <IndianRupee className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Higher Ticket Size</h3>
                <p className="text-muted-foreground text-sm">
                  Every SIF investment starts at &#8377;10 Lakhs minimum. A single SIF transaction equals what might take 10-20 mutual fund SIPs to accumulate. Your AUM grows faster with fewer clients, letting you focus on quality relationships rather than volume.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">HNI Client Access</h3>
                <p className="text-muted-foreground text-sm">
                  SIF clients are high-net-worth individuals who were previously out of reach for most MFDs. They needed PMS or AIF, which required separate licences. Now you can serve HNIs with your existing AMFI registration and build lasting relationships with affluent families.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Less Competition</h3>
                <p className="text-muted-foreground text-sm">
                  Most MFDs have not yet understood or started distributing SIFs. The early movers will capture the HNI market share while others are still figuring out what SIF means. This window of reduced competition will not stay open indefinitely.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Recurring Income</h3>
                <p className="text-muted-foreground text-sm">
                  SIF trail commissions work similarly to mutual fund trails but on significantly higher base amounts. A portfolio of 50 SIF clients at &#8377;10 Lakhs each represents &#8377;5 Crore in AUM, providing a stable and growing trail income stream.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commission Structure */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              Commission Structure for SIF Distribution
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-6 text-center">
                SIF commissions follow the mutual fund distribution model with trail fees paid on AUM. While exact rates vary by AMC and scheme, here is the general structure that MFDs can expect.
              </p>
              <div className="glass-card p-6 sm:p-8 mb-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Trail Commission</h4>
                      <p className="text-muted-foreground text-sm">SIFs pay trail fees similar to mutual funds, calculated as a percentage of AUM. Trail rates for SIF schemes are competitive and comparable to regular mutual fund plans. Since the minimum ticket size is &#8377;10 Lakhs, even a modest trail percentage translates to meaningful absolute income per client.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">No Upfront Commission Pressure</h4>
                      <p className="text-muted-foreground text-sm">Unlike insurance or structured products, SIFs follow the clean trail model. This aligns distributor incentives with investor outcomes, building long-term trust and reducing regulatory risk. Your income grows as your client&apos;s investment grows.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">Regular Plan Availability</h4>
                      <p className="text-muted-foreground text-sm">SIFs are available in both Direct and Regular plans, just like mutual funds. MFDs earn commissions through the Regular plan while providing value-added advisory services to their clients. The Regular plan structure is familiar and straightforward for existing MFDs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Become a SIF Distributor */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              How to Become a SIF Distributor
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              The good news is that if you are already an MFD, you are most of the way there. SIF distribution does not require a separate licence. Here is the step-by-step process.
            </p>
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">1. AMFI Registration</h3>
                    <p className="text-muted-foreground">
                      You need a valid AMFI Registration Number (ARN) to distribute SIFs. If you are already distributing mutual funds, your existing ARN works for SIF distribution as well. New distributors need to pass the NISM Series V-A exam and register with AMFI. Ensure your ARN is active and KYC is up to date.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">2. Platform Empanelment</h3>
                    <p className="text-muted-foreground">
                      SIF transactions are processed through BSE StAR MF and NSE NMF II platforms, the same platforms you use for mutual fund transactions. Ensure you are empanelled on at least one of these platforms. Most MFDs already have BSE StAR MF access. Contact your platform relationship manager to confirm SIF transaction capability is enabled on your account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Handshake className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">3. AMC Empanelment</h3>
                    <p className="text-muted-foreground">
                      Register with individual AMCs that offer SIF schemes. You will need to complete an empanelment form with each AMC, similar to the mutual fund empanelment process. Start with AMCs whose SIF schemes you plan to distribute first. Most AMCs have streamlined the empanelment process for existing MFDs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Which AMCs Offer SIF */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              AMCs Offering SIF Distribution Partnerships
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              As of April 2026, nine major AMCs have launched SIF schemes. Each offers distribution partnerships to registered MFDs. Early empanelment gives you access to NFO distribution opportunities and dedicated support from AMC SIF teams.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              {[
                { name: "Quant Mutual Fund", schemes: "3 SIF schemes" },
                { name: "ICICI Prudential", schemes: "2 SIF schemes" },
                { name: "360 ONE", schemes: "2 SIF schemes" },
                { name: "Bandhan Mutual Fund", schemes: "2 SIF schemes" },
                { name: "ITI Mutual Fund", schemes: "1 SIF scheme" },
                { name: "SBI Mutual Fund", schemes: "1 SIF scheme" },
                { name: "Tata Mutual Fund", schemes: "1 SIF scheme" },
                { name: "Edelweiss Mutual Fund", schemes: "1 SIF scheme" },
                { name: "ABSL Mutual Fund", schemes: "1 SIF scheme" },
              ].map((amc) => (
                <div key={amc.name} className="glass-card p-4 flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{amc.name}</p>
                    <p className="text-xs text-muted-foreground">{amc.schemes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How SIFPrime Helps MFDs */}
        <section className="py-8 sm:py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground text-center mb-4 sm:mb-6">
              How SIFPrime Helps MFDs Succeed
            </h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto">
              SIFPrime is building India&apos;s most comprehensive SIF distribution support ecosystem. We provide the tools, training, and leads you need to build a thriving SIF practice.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Training &amp; Education</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive SIF training modules covering product knowledge, client pitching techniques, objection handling, and compliance requirements. We conduct regular webinars and one-on-one training sessions to ensure you can confidently explain SIF strategies to your clients.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Lead Sharing</h3>
                <p className="text-muted-foreground text-sm">
                  SIFPrime generates thousands of SIF-interested leads every month through our content and advertising. Qualified leads from your region are shared with empanelled distributors, giving you a head start on client acquisition without spending on marketing.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Technology Platform</h3>
                <p className="text-muted-foreground text-sm">
                  Access SIFPrime&apos;s data tools including live NAV tracking, performance comparison, fund analysis reports, and client-ready presentations. Our technology makes it easy to monitor your clients&apos; SIF portfolios and provide professional advisory services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Ready to Start Your SIF Distribution Journey?
            </h2>
            <p className="text-base sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Join hundreds of MFDs who are already building their SIF practice. Get started with a free consultation or join our distributor community on WhatsApp for daily updates, training content, and lead-sharing opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  Schedule a Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href={DISTRIBUTOR_WHATSAPP_GROUP} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Join Distributor WhatsApp Group <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <a href="/become-distributor" className="hover:text-primary underline">Become a Distributor</a>
              <span>|</span>
              <a href="/distributors/sif-billion-dollar-opportunity" className="hover:text-primary underline">SIF: The Billion Dollar Opportunity</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifForMfd;
