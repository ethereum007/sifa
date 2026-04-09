"use client";

import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";

export default function PartnerCTA() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0A1628] to-[#1B3A5C] rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px"
            }} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/20 mb-6">
              <Handshake className="w-7 h-7 text-emerald-400" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Are you an MFD or RIA?
            </h2>

            <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              SIFs are brand new — most of your HNI clients haven&apos;t heard of them yet.
              Be the first to tell them. Send co-branded SIF education and recommendation
              reports in 2 clicks.
            </p>

            <Link
              href="/partner"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg"
            >
              Become a SIF Partner
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="text-slate-500 text-sm mt-4">
              First 30 days free. No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
