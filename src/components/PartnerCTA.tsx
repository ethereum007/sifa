"use client";

import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";

export default function PartnerCTA() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto rounded-xl border border-border bg-card p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-5">
            <Handshake className="w-6 h-6 text-primary" />
          </div>

          <h2 className="font-serif-accent text-2xl sm:text-3xl mb-3" style={{ color: 'hsl(220, 30%, 10%)' }}>
            Are you an MFD or RIA?
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
            SIFs are brand new — most of your HNI clients haven&apos;t heard of them yet.
            Be the first to tell them. Send co-branded SIF education and recommendation
            reports in 2 clicks.
          </p>

          <Link
            href="/partner"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
          >
            Become a SIF Partner
            <ArrowRight className="w-4 h-4" />
          </Link>

          <p className="text-muted-foreground text-xs mt-4">
            First 30 days free. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
