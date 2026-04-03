"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {


  DollarSign,
  TrendingUp,
  Users,
  Rocket,
  Target,
  Shield,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Calendar,
  User,
  Sparkles,
} from "lucide-react";

const SifBillionDollarOpportunity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <Sparkles className="w-3 h-3 mr-1" /> Distributor Insights
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                MFDs Can Make{" "}
                <span className="text-primary">$1 Billion Per Year</span>{" "}
                From SIFs in the Next 5 Years
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                SEBI's Specialized Investment Funds are unlocking a ₹15 lakh crore opportunity. 
                Here's why every mutual fund distributor needs to pay attention — right now.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">$1B Annual Revenue</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">₹15L Cr AUM Potential</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold">SEBI Regulated</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Nalin Moniz, CEO — Ionic Asset Management</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>March 13, 2025</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kickoff Banner */}
        <section className="py-10 lg:py-14 bg-primary/5 border-y border-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm mb-6">
                <Rocket className="w-4 h-4" />
                The SIF Revolution Has Begun
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                April 1 Changed Everything for MFDs
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                While most distributors are still figuring out SIFs, the early movers are already 
                positioning themselves for what could be the <strong className="text-foreground">single biggest revenue opportunity</strong> in 
                India's mutual fund industry. Here's the original guest column from Cafemutual that 
                started the conversation.
              </p>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-lg max-w-none">
                {/* Opening */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  For the last 7 years, we have celebrated March 31 as the financial advisor day to celebrate 
                  the vital role of mutual fund distributors (MFDs) in India's financial inclusion movement. 
                  This financial year end will be extra special because it marks the start of a new chapter in 
                  India's mutual fund industry and the start of a{" "}
                  <strong className="text-foreground">mega opportunity for MFDs</strong>.
                </p>

                {/* What are SIFs */}
                <Card className="my-8 border-l-4 border-l-primary bg-primary/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      What Makes SIFs Special?
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-0">
                      SEBI's regulations on Specialized Investment Funds (SIFs) came into effect on April 1. 
                      Under this regime, existing mutual funds with an AUM of at least ₹10,000 crore for 
                      the past 3 years, or a specialized fund management team, can launch SIFs. They benefit 
                      from the same strong governance, transparency, professional fund management, taxation 
                      rules, KYC, statements and reporting as a mutual fund.
                    </p>
                  </CardContent>
                </Card>

                <p className="text-muted-foreground leading-relaxed">
                  SIFs will be launched under a brand affiliated with the parent AMC and hence inspire trust 
                  in the retail investor. Hence, SIFs are a{" "}
                  <strong className="text-foreground">natural extension for an MFD looking to grow her business</strong>.
                </p>

                {/* Key Differences */}
                <h2 className="text-2xl font-bold text-foreground mt-10 mb-6 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Key Differences: SIF vs Mutual Fund
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <Card className="bg-secondary/30">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Minimum Investment</h4>
                      <p className="text-2xl font-bold text-primary mb-1">₹10 Lakh</p>
                      <p className="text-xs text-muted-foreground">Per PAN per fund house</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-secondary/30">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Target Audience</h4>
                      <p className="text-2xl font-bold text-primary mb-1">HNI/UHNI</p>
                      <p className="text-xs text-muted-foreground">More affluent investors</p>
                    </CardContent>
                  </Card>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  SIFs also have greater investment flexibility around portfolio concentration, not offering 
                  daily liquidity, and the use of derivatives for shorting. Hence they have risk factors that 
                  MFDs need to educate themselves and inform clients about. This{" "}
                  <strong className="text-foreground">knowledge-based right-selling</strong> has become the 
                  calling card of MFDs/RIAs who are doing well in the industry today.
                </p>

                {/* The Big Number */}
                <div className="my-10 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                    The Opportunity
                  </p>
                  <p className="text-4xl md:text-5xl font-bold text-primary mb-2">₹15 Lakh Crore</p>
                  <p className="text-lg text-foreground font-medium mb-1">Projected SIF Industry AUM in 5 Years</p>
                  <p className="text-muted-foreground text-sm">
                    Revenue opportunity for MFDs: approximately <strong className="text-foreground">$1 billion per year</strong>
                  </p>
                </div>

                {/* How to Get Started */}
                <h2 className="text-2xl font-bold text-foreground mt-10 mb-6 flex items-center gap-2">
                  <Rocket className="w-6 h-6 text-primary" />
                  How Should MFDs Get Started?
                </h2>

                <div className="space-y-5 my-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">SIFs Complement — Not Replace — Mutual Funds</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        SIFs will largely deal with moderate return, low risk strategies like capital protected 
                        schemes, absolute return funds and arbitrage-plus offerings. They appeal to investors 
                        already comfortable with balanced advantage and multi-asset funds. They won't replace 
                        emergency funds in debt MFs or long-term SIPs in small caps.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Start With Tested AMCs</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        As with all new products — let AMCs and fund managers be tested over market cycles. 
                        AMCs with well-run hybrid schemes are a natural initial choice to partner with. 
                        SIFs are launching at a time when both debt and equity markets are volatile, creating 
                        a strong investment case.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Begin With Small Allocations</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Start with small allocations to a few SIFs, let it grow with SIPs and top-up when 
                        both you and clients feel comfortable. Accredited investors can invest less than 
                        ₹10 lakh, so helping investors get accredited via CVL allows them to sample more 
                        SIFs at a smaller size.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Closing Quote */}
                <Card className="my-10 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
                  <CardContent className="p-6">
                    <blockquote className="text-lg italic text-foreground leading-relaxed mb-3">
                      "I'm excited for this new chapter of mutual fund distribution, and I can't wait for the 
                      day when retail investors will acknowledge not just <em>Mutual Funds Sahi Hai</em> but{" "}
                      <strong className="text-primary">SIFs Bhi Sahi Hai!</strong>"
                    </blockquote>
                    <p className="text-sm text-muted-foreground">
                      — Nalin Moniz, CEO, Ionic Asset Management
                    </p>
                  </CardContent>
                </Card>

                {/* Source */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Originally published on </span>
                  <a
                    href="https://cafemutual.com/news/guestcolumn/34402-in-the-next-5-years-mfds-can-make-1-billion-dollars-per-year-from-sifs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Cafemutual
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/10 to-secondary/20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                Ready to Tap Into the SIF Opportunity?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Join India's growing network of SIF distributors. Partner with SIF Prime and 
                start offering your HNI clients access to sophisticated investment strategies.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/become-distributor">
                  <Button variant="gold" size="lg" className="gap-2">
                    <Users className="w-4 h-4" />
                    Set Up a Consultation Call
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                <a href="/sif-funds-launched">
                  <Button variant="outline" size="lg" className="gap-2">
                    Explore SIF Funds
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifBillionDollarOpportunity;
