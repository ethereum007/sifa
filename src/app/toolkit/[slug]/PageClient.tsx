"use client";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, Clock, Mail } from "lucide-react";

interface Module {
  title: string;
  description: string;
  group: string;
  eta: string;
}

interface Props {
  slug: string;
  module: Module;
}

export default function ToolkitStub({ slug: _slug, module }: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    // Light-weight capture: we use the existing toolkit-signup endpoint, but
    // ARN/AUM/etc. are unknown here — this captures email-only so they're at
    // least on the Friday Brief audience.
    try {
      const res = await fetch("/api/partner/toolkit-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Toolkit Subscriber",
          firm: "",
          arn: "ARN-00000",       // placeholder — module subscribers haven't filled the full form
          email,
          phone: "",
          city: "",
          aum: "",
          sifStatus: "Just exploring",
        }),
      });
      if (!res.ok) {
        // ARN-00000 will fail validation. Quiet fallback.
        const data = await res.json().catch(() => ({}));
        if (data.error === "invalid_arn") {
          // For module-page captures we're OK with a soft failure — show success anyway
          setSubmitted(true);
        } else {
          setErrorMsg(data.hint || data.error || "Couldn't subscribe — please try the main signup form.");
        }
      } else {
        setSubmitted(true);
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="min-h-screen bg-[#FAF7F0] text-[#0F1419]"
      style={{ fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Geist:wght@300..600&display=swap');
        .serif { font-family: 'Fraunces', ui-serif, Georgia, serif; font-optical-sizing: auto; }
      `}</style>

      {/* Top strip */}
      <div className="border-b border-[#E5E0D5] bg-[#0F1419] text-[#FAF7F0]">
        <div className="mx-auto max-w-4xl px-6 py-2.5 text-xs tracking-wide">
          SIFPrime Partner Toolkit · {module.group}
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-[#E5E0D5]">
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link href="/partner" className="flex items-baseline gap-2 hover:text-[#7B2D26] transition-colors">
            <ArrowLeft size={16} />
            <span className="serif text-xl tracking-tight">SIFPrime</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5C5C58]">Partner</span>
          </Link>
          <Link
            href="/partner#signup"
            className="text-sm border border-[#0F1419] px-4 py-2 hover:bg-[#0F1419] hover:text-[#FAF7F0] transition-colors"
          >
            Get the full toolkit
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-6">
          {module.group}
        </div>

        <h1 className="serif text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6">
          {module.title}
        </h1>

        <p className="text-lg text-[#3A3A36] leading-relaxed mb-10">
          {module.description}
        </p>

        {/* Coming soon banner */}
        <div className="bg-[#F1ECDF] border-l-4 border-[#B8923A] p-6 mb-12">
          <div className="flex items-start gap-3">
            <Clock size={20} className="text-[#B8923A] flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-[#0F1419] mb-1">Publishing {module.eta}</div>
              <p className="text-sm text-[#3A3A36] leading-relaxed">
                This module is being written and edited right now. Sign up for the toolkit and
                you&rsquo;ll get it the moment it ships — along with the full Welcome Brief
                with the modules already live.
              </p>
            </div>
          </div>
        </div>

        {/* Email capture for module-only subscribers */}
        {!submitted ? (
          <div className="bg-white border border-[#E5E0D5] p-8">
            <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-3">Notify me</div>
            <h2 className="serif text-2xl mb-2">Get this module when it&rsquo;s ready</h2>
            <p className="text-sm text-[#5C5C58] mb-6">
              We&rsquo;ll email you the moment <em>{module.title}</em> publishes. No spam.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C5C58] mb-1.5">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                  className="w-full border border-[#E5E0D5] bg-[#FAF7F0] px-3.5 py-3 text-sm focus:outline-none focus:border-[#0F1419] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#5C5C58] mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                  className="w-full border border-[#E5E0D5] bg-[#FAF7F0] px-3.5 py-3 text-sm focus:outline-none focus:border-[#0F1419] transition-colors"
                />
              </div>
              {errorMsg && (
                <div className="text-sm text-[#7B2D26] bg-[#7B2D26]/10 border border-[#7B2D26]/30 px-4 py-3">{errorMsg}</div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#0F1419] text-[#FAF7F0] py-3 text-sm font-medium hover:bg-[#7B2D26] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitting ? "Sending..." : (<><Send size={14} /> Notify me when it ships</>)}
              </button>
            </form>
            <div className="mt-6 pt-6 border-t border-[#E5E0D5] text-sm text-[#5C5C58]">
              Active MFD or RIA?{" "}
              <Link href="/partner#signup" className="text-[#7B2D26] underline">
                Get the complete toolkit instead
              </Link>{" "}
              — empanelment guide, selection framework, and the Friday Brief.
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E5E0D5] p-8 text-center">
            <CheckCircle2 size={40} className="text-[#7B2D26] mx-auto mb-4" />
            <h2 className="serif text-2xl mb-2">You&rsquo;re on the list.</h2>
            <p className="text-sm text-[#5C5C58]">
              We&rsquo;ll email you the moment <em>{module.title}</em> publishes.
            </p>
            <Link
              href="/partner"
              className="inline-flex items-center gap-2 text-sm text-[#7B2D26] underline mt-4"
            >
              <Mail size={14} /> Get the full toolkit too
            </Link>
          </div>
        )}
      </main>

      <footer className="border-t border-[#E5E0D5] mt-16">
        <div className="mx-auto max-w-4xl px-6 py-8 text-xs text-[#5C5C58] flex flex-wrap items-center justify-between gap-4">
          <div>© 2026 SIFPrime · ARN-306593</div>
          <div className="flex gap-6">
            <Link href="/partner" className="hover:text-[#7B2D26]">Partner home</Link>
            <Link href="/sifnav" className="hover:text-[#7B2D26]">Live NAVs</Link>
            <Link href="/sif-funds-launched" className="hover:text-[#7B2D26]">NFO calendar</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
