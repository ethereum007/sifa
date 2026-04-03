"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Users, IndianRupee, BarChart3, BadgeCheck } from "lucide-react";

const Hero = () => {
  const stats = [
    { value: "₹10L", label: "Min Investment", icon: IndianRupee },
    { value: "14", label: "Active SIFs", icon: BarChart3 },
    { value: "SEBI", label: "Regulated", icon: BadgeCheck },
  ];

  return (
    <section className="relative flex items-center justify-center pt-4 pb-12 lg:pt-6 lg:pb-16">
      {/* Lightweight background - no blur filters that tax GPU */}
      <div className="absolute inset-0 bg-hero-pattern" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-secondary border border-border mb-5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-base font-medium text-foreground">
              SEBI Regulated • Now Live in India
            </span>
          </div>

          {/* Headline - Clean with serif accent like SIF360 */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight mb-4 animate-slide-up text-heading">
            Specialized Investment Funds{" "}
            <span className="font-serif-accent text-primary">(SIF)</span>
            {" "}in India
          </h1>

          {/* Subheadline - More concise */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 animate-slide-up delay-100">
            Bridge the gap between Mutual Funds and PMS. Access structured investment 
            strategies with just ₹10 Lakhs minimum investment.
          </p>

          {/* CTA Button - Centered */}
          <div className="flex flex-col items-center gap-8 mb-8 animate-slide-up delay-200">
            <Button 
              variant="gold" 
              size="lg" 
              className="px-8"
              onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule a Consultation
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            {/* Stats below button - Mobile optimized */}
            <div className="flex flex-wrap justify-center gap-3 sm:inline-flex sm:flex-nowrap sm:items-center sm:justify-center bg-gradient-to-r from-white via-secondary/50 to-white rounded-2xl border border-border/40 shadow-lg px-3 py-3 sm:px-4 sm:py-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className="group flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1 sm:py-2 cursor-default">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300 shadow-sm">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg sm:text-2xl font-bold text-heading leading-none">{stat.value}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">{stat.label}</div>
                    </div>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="hidden sm:block h-12 w-px bg-gradient-to-b from-transparent via-border to-transparent mx-1 sm:mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators - More compact */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto animate-slide-up delay-400">
          {[
            { icon: Shield, title: "SEBI Regulated", desc: "Full regulatory compliance", href: "/specialized-investment-fund-sif" },
            { icon: TrendingUp, title: "Latest NAV", desc: "Real-time fund values", href: "/sifnav" },
            { icon: Users, title: "For HNI Investors", desc: "Sophisticated investing", href: "/sif-minimum-investment" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="glass-card p-3 sm:p-4 flex items-center gap-3 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
