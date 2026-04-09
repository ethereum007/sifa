"use client";

import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PartnerCTA() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-[#0A1628] p-10 sm:p-14 text-center">
          {/* Subtle pattern */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-600/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 mb-6">
              <Handshake className="w-7 h-7 text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Are you an MFD or RIA?
            </h2>

            <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
              SIFs are brand new — most of your HNI clients haven&apos;t heard of them yet.
              Be the first to tell them. Send co-branded SIF education and recommendation
              reports in 2 clicks.
            </p>

            <Link href="/partner">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-6 text-base">
                Become a SIF Partner
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>

            <p className="text-slate-500 text-sm mt-5">
              First 30 days free. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
