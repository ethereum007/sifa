"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              SEBI Regulated
            </span>
          </div>

          {/* Headline — serif for institutional authority */}
          <h1 className="font-serif-accent text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6" style={{ color: 'hsl(220, 30%, 10%)' }}>
            Specialized Investment Funds in India
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Bridge the gap between Mutual Funds and PMS. Access structured
            investment strategies with just ₹10 Lakhs minimum investment.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 h-12"
              onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <a href="/sif-quiz">
              <Button variant="outline" size="lg" className="px-8 h-12 border-border text-foreground/70 hover:text-foreground hover:border-foreground/30">
                Find My SIF
              </Button>
            </a>
          </div>

          {/* Stats strip — minimal, institutional */}
          <div className="flex items-center justify-center gap-8 sm:gap-12 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">₹10L</p>
              <p className="text-xs text-muted-foreground mt-0.5">Min Investment</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">14</p>
              <p className="text-xs text-muted-foreground mt-0.5">Active SIFs</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">SEBI</p>
              <p className="text-xs text-muted-foreground mt-0.5">Regulated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
