"use client";

import { Sparkles, ArrowRight, Calendar, Building2, ExternalLink } from "lucide-react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dspLogo from "@/assets/logos/dsp-mutual-fund.png";
import miraeLogo from "@/assets/logos/mirae-asset-mutual-fund.png";



interface UpcomingSif {
  name: string;
  amc: string;
  logo: string;
  url: string;
  description: string;
  expectedLaunch?: string;
}

const UPCOMING_SIFS: UpcomingSif[] = [
  { 
    name: "Endurance SIF", 
    amc: "DSP Mutual Fund", 
    logo: dspLogo as unknown as string, 
    url: "https://www.dspim.com/endurance-sif/",
    description: "A resilient investment strategy from DSP Mutual Fund designed to endure market cycles and deliver consistent long-term performance.",
    expectedLaunch: "Coming Soon"
  },
  { 
    name: "Platinum SIF", 
    amc: "Mirae Asset Mutual Fund", 
    logo: miraeLogo as unknown as string, 
    url: "https://www.miraeassetmf.co.in/sif",
    description: "A premium specialized investment fund from Mirae Asset, leveraging their global expertise to offer differentiated investment strategies.",
    expectedLaunch: "Coming Soon"
  },
];

const UpcomingSifs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
          <div className="container mx-auto px-4 py-16 lg:py-24 relative">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-50 mb-6">
                <Sparkles className="w-3 h-3 mr-1" />
                UPCOMING LAUNCHES
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Upcoming <span className="text-primary">SIFs</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay ahead of the curve. Discover new Specialized Investment Funds being launched by India's top asset managers.
              </p>
            </div>
          </div>
        </section>

        {/* Upcoming Funds Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {UPCOMING_SIFS.map((sif) => (
                  <div
                    key={sif.name}
                    className="group relative p-6 rounded-2xl bg-card border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
                  >
                    {/* Coming Soon Badge */}
                    <div className="absolute -top-3 right-6">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {sif.expectedLaunch}
                      </Badge>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-white border border-border/50 p-2 flex items-center justify-center shadow-sm">
                        <img 
                          src={sif.logo} 
                          alt={sif.name} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {sif.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{sif.amc}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6">
                      {sif.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-2 text-amber-600 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{sif.expectedLaunch}</span>
                      </div>
                      
                      <a
                        href={sif.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all"
                      >
                        Learn More
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-amber-900/90 via-slate-900 to-amber-900/90">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="w-10 h-10 text-amber-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Notified When They Launch
              </h2>
              <p className="text-amber-100/80 mb-8">
                Be the first to know when new SIFs become available for investment. 
                Register your interest and our team will keep you updated.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="gold" 
                  size="xl"
                  onClick={() => window.open(CONSULTATION_URL, "_blank")}
                >
                  Schedule a Consultation
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="xl"
                  className="border-amber-400/50 text-amber-100 hover:bg-amber-400/10"
                  asChild
                >
                  <a href="/sif-funds-launched">
                    View Launched SIFs
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default UpcomingSifs;
