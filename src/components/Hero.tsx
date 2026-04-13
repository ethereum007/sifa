"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] pt-16 pb-12 sm:pt-28 sm:pb-24">
      {/* Subtle gradient orb */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <span className="mb-6 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          SEBI Regulated &middot; Now Live in India
        </span>

        {/* Headline */}
        <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-6xl">
          India&apos;s First{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
            Specialized Investment Funds
          </span>{" "}
          Platform
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
          Bridge the gap between Mutual Funds and PMS. Compare, track and invest in
          SEBI-regulated SIFs with just{" "}
          <strong className="text-white">₹10 Lakhs</strong> minimum investment.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="bg-emerald-500 text-white hover:bg-emerald-400 font-semibold px-8 py-6 text-base"
            onClick={() => document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Schedule a Consultation
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
          <a href="/sif-quiz">
            <Button
              variant="outline"
              size="lg"
              className="border-slate-500 text-slate-200 hover:bg-slate-800 px-8 py-6 text-base"
            >
              Find My SIF
            </Button>
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-4 sm:gap-8 max-w-sm sm:max-w-lg mx-auto">
          {[
            { value: "₹10L", label: "Min Investment" },
            { value: "14", label: "Active SIFs" },
            { value: "SEBI", label: "Regulated" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl sm:text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
