"use client";
import { useState, type ChangeEvent, type FormEvent, type ComponentType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  BarChart3,
  Shield,
  Layers,
  Calculator,
  TrendingUp,
  Activity,
  Mail,
  MessageCircle,
  Calendar,
  ScrollText,
  FileCheck,
  Sparkles,
  ChevronRight,
  Lock,
  Send,
  CheckCircle2,
} from "lucide-react";

// ----- Toolkit content (12 modules, 4 groups of 3) -----
interface ToolkitItem {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  title: string;
  desc: string;
  meta: string;
  href: string;
}

interface ToolkitSection {
  group: string;
  blurb: string;
  items: ToolkitItem[];
}

const TOOLKIT: ToolkitSection[] = [
  {
    group: "01 — Get started",
    blurb: "From zero to your first SIF transaction.",
    items: [
      { icon: FileCheck, title: "SIF Empanelment Guide", desc: "NISM Series XIII → AMFI ARN → AMC empanelment → EUIN. Step-by-step with screenshots.", meta: "12 min read", href: "/toolkit/empanelment" },
      { icon: BookOpen, title: "SIF 101 Master Deck", desc: "12-slide explainer covering category, strategies, taxation, and HNI suitability.", meta: "PDF · co-brandable", href: "/toolkit/sif-101-deck" },
      { icon: ScrollText, title: "Onboarding Checklist", desc: "Everything to set up before your first SIF transaction — folio, KYC, documentation, disclosures.", meta: "1-page", href: "/toolkit/onboarding-checklist" },
    ],
  },
  {
    group: "02 — Pitch SIF to clients",
    blurb: "Walk into the HNI conversation prepared.",
    items: [
      { icon: FileText, title: "HNI Pitch Deck", desc: "Closing deck for the ₹50L–₹5Cr conversation. Co-branded with your logo and ARN.", meta: "8 slides", href: "/toolkit/hni-pitch-deck" },
      { icon: Layers, title: "SIF vs PMS vs AIF Battle Card", desc: "When to recommend what. Side-by-side on cost, tax, liquidity, strategy flexibility.", meta: "1-page", href: "/toolkit/battle-card" },
      { icon: Calculator, title: "Allocation & Tax Playbook", desc: "How much SIF for ₹1Cr / ₹3Cr / ₹10Cr portfolios. STCG 20% conversation script.", meta: "PDF", href: "/toolkit/allocation-tax" },
    ],
  },
  {
    group: "03 — Analyze the universe",
    blurb: "The frameworks we use ourselves.",
    items: [
      { icon: Sparkles, title: "SIF Selection Framework", desc: "Our proprietary 8-pointer evaluation — strategy fit, manager pedigree, risk-adjusted returns.", meta: "Framework", href: "/toolkit/selection-framework" },
      { icon: Shield, title: "Alpha Shield Scorecard", desc: "Monthly fund ranking on crash-period drawdown protection. Updated after every NAV print.", meta: "Monthly PDF", href: "/toolkit/alpha-shield" },
      { icon: BarChart3, title: "SIF Risk Pointers", desc: "8 risk dimensions every distributor must understand and disclose to HNI clients.", meta: "Framework", href: "/toolkit/risk-pointers" },
    ],
  },
  {
    group: "04 — Stay current",
    blurb: "Live data, refreshed continuously.",
    items: [
      { icon: TrendingUp, title: "Monthly Performance Report", desc: "Full SIF universe with returns, drawdowns, peer rankings. Distributor edition.", meta: "Monthly PDF", href: "/sif-performance" },
      { icon: Activity, title: "Live NAV Tracker", desc: "Daily updated NAVs and inception returns for every SEBI-registered SIF.", meta: "Live page", href: "/sifnav" },
      { icon: Calendar, title: "NFO Calendar", desc: "Upcoming SIF launches, scheme documents, NFO opening windows. Updated weekly.", meta: "Live page", href: "/sif-funds-launched" },
    ],
  },
];

const PAIN_POINTS = [
  "Should I even get empanelled for SIF distribution?",
  "How do I explain SIF to my client in 60 seconds?",
  "Which SIF should I recommend out of the 17 funds tracked?",
  "What if my client loses money — how do I defend the recommendation?",
  "How do I position SIF against my client's existing PMS?",
  "What's the right ticket size and allocation?",
  "How do I handle the 20% STCG conversation?",
  "How do I monitor the fund post-investment?",
];

const FAQS = [
  { q: "Is the toolkit really free?", a: "Yes — all 12 modules, the Knowledge Series, and the Live NAV tracker are free for any AMFI-registered MFD or RIA. We make money when you transact, not when you read. As your SIF book grows, we can offer a co-branded report engine and lead routing — but those are optional add-ons, not gates." },
  { q: "Do I need NISM Series XIII to use the toolkit?", a: "No. The toolkit is open to anyone with an active AMFI ARN, regardless of SIF empanelment status. In fact, our Empanelment Guide walks you through getting NISM XIII certified and onboarded with AMCs." },
  { q: "Will SIFPrime contact my clients directly?", a: "No. Co-branded reports go from you to your clients with your name, photo, and ARN — SIFPrime is invisible. We don't have access to your client list, and we don't pitch them." },
  { q: "How is this different from the AMC factsheets?", a: "AMC factsheets cover one fund. We cover the whole universe — peer comparison, crash-period analysis, manager track records, and our proprietary Alpha Shield Score. AMC content is also written for compliance; ours is written for the distributor conversation." },
  { q: "What's the catch?", a: "There isn't one. Our economics work because every MFD who succeeds in SIF distribution becomes a long-term partner. We're playing the 10-year game, not the ₹999/month game." },
  { q: "When can I expect the first email?", a: "Immediately after signup. The Welcome Brief lands in your inbox within 60 seconds, with the empanelment guide and selection framework links." },
];

const PARTNERSHIP_WHATSAPP = "https://wa.me/919032999466?text=" + encodeURIComponent("Hi Kiran, I'm an active MFD interested in SIFPrime Pro");

interface FormState {
  name: string;
  firm: string;
  arn: string;
  email: string;
  phone: string;
  city: string;
  aum: string;
  sifStatus: string;
}

export default function PartnerPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    firm: "",
    arn: "",
    email: "",
    phone: "",
    city: "",
    aum: "",
    sifStatus: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/partner/toolkit-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data.hint || data.error || "Something went wrong. Please try again.";
        setErrorMsg(msg);
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setErrorMsg("Network error. Please try again or message us on WhatsApp.");
    }
    setSubmitting(false);
  };

  const update = (k: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div
      className="min-h-screen bg-[#FAF7F0] text-[#0F1419]"
      style={{ fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Geist:wght@300..600&display=swap');
        .serif { font-family: 'Fraunces', ui-serif, Georgia, serif; font-optical-sizing: auto; }
        .num { font-feature-settings: "tnum"; }
      `}</style>

      {/* TOP ANNOUNCE */}
      <div className="border-b border-[#E5E0D5] bg-[#0F1419] text-[#FAF7F0]">
        <div className="mx-auto max-w-6xl px-6 py-2.5 text-xs tracking-wide flex items-center justify-between">
          <span>SIFPrime Partner Programme · For India&rsquo;s wealth managers</span>
          <span className="hidden md:inline opacity-70">First Friday Brief publishes 2 May 2026</span>
        </div>
      </div>

      {/* NAV */}
      <header className="border-b border-[#E5E0D5]">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="serif text-2xl tracking-tight">SIFPrime</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5C5C58]">Partner</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#3A3A36]">
            <a href="#toolkit" className="hover:text-[#7B2D26]">The toolkit</a>
            <a href="#knowledge" className="hover:text-[#7B2D26]">Knowledge series</a>
            <a href="#advanced" className="hover:text-[#7B2D26]">For active distributors</a>
            <a href="#signup" className="hover:text-[#7B2D26]">Sign up</a>
          </nav>
          <a
            href="#signup"
            className="text-sm border border-[#0F1419] px-4 py-2 hover:bg-[#0F1419] hover:text-[#FAF7F0] transition-colors"
          >
            Get the toolkit
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-[#E5E0D5]">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-6">Issue 01 · April 2026</div>
            <h1 className="serif text-5xl md:text-7xl leading-[1.05] tracking-tight">
              The complete SIF playbook for India&rsquo;s wealth managers.
            </h1>
            <p className="mt-8 text-lg md:text-xl text-[#3A3A36] leading-relaxed max-w-2xl">
              Empanelment guides, fund analysis, client pitch decks, branded reports.
              Everything you need to bring Specialized Investment Funds to your HNI clients.
              <span className="text-[#0F1419] font-medium"> Free for distributors. Forever.</span>
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#signup"
                className="inline-flex items-center gap-2 bg-[#0F1419] text-[#FAF7F0] px-6 py-3.5 text-sm font-medium hover:bg-[#7B2D26] transition-colors"
              >
                Get the free toolkit
                <ArrowRight size={16} />
              </a>
              <a
                href="#knowledge"
                className="inline-flex items-center gap-2 border border-[#0F1419] px-6 py-3.5 text-sm font-medium hover:bg-[#0F1419] hover:text-[#FAF7F0] transition-colors"
              >
                Subscribe to the Friday Brief
              </a>
            </div>
            <div className="mt-12 pt-8 border-t border-[#E5E0D5] grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="serif text-3xl num">17</div>
                <div className="text-xs text-[#5C5C58] mt-1 uppercase tracking-wider">SIFs tracked</div>
              </div>
              <div>
                <div className="serif text-3xl num">11</div>
                <div className="text-xs text-[#5C5C58] mt-1 uppercase tracking-wider">AMCs covered</div>
              </div>
              <div>
                <div className="serif text-3xl num">₹10,400 Cr</div>
                <div className="text-xs text-[#5C5C58] mt-1 uppercase tracking-wider">Category AUM</div>
              </div>
            </div>
          </div>

          <aside className="md:col-span-4 md:pl-8 md:border-l md:border-[#E5E0D5]">
            <div className="text-xs uppercase tracking-[0.2em] text-[#5C5C58] mb-4">From the editor</div>
            <p className="serif text-lg leading-relaxed text-[#0F1419] italic">
              &ldquo;SIFs are the biggest mutual fund category innovation in 20 years.
              Most MFDs aren&rsquo;t ready for the conversation their HNI clients are about to start.
              We built this toolkit so you walk into that meeting as the expert in the room.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7B2D26] text-[#FAF7F0] flex items-center justify-center text-sm font-medium">KD</div>
              <div>
                <div className="text-sm font-medium">Kiran Dutta</div>
                <div className="text-xs text-[#5C5C58]">Founder, SIFPrime · ARN-306593</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* PAIN POINT STRIP */}
      <section className="border-b border-[#E5E0D5] bg-[#F1ECDF]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-4">Why this exists</div>
          <h2 className="serif text-3xl md:text-4xl leading-tight max-w-3xl mb-10">
            When an HNI asks you about SIF, eight questions follow. We&rsquo;ve answered them all.
          </h2>
          <ul className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {PAIN_POINTS.map((p, i) => (
              <li key={i} className="flex items-baseline gap-3 text-[15px] text-[#3A3A36]">
                <span className="num text-xs text-[#7B2D26] w-6">{String(i + 1).padStart(2, "0")}</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TOOLKIT */}
      <section id="toolkit" className="border-b border-[#E5E0D5]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div className="md:col-span-4">
              <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-4">The toolkit</div>
              <h2 className="serif text-4xl md:text-5xl leading-[1.1] tracking-tight">
                Twelve modules. <span className="italic">All free.</span>
              </h2>
            </div>
            <div className="md:col-span-7 md:col-start-6 self-end">
              <p className="text-[#3A3A36] leading-relaxed">
                Everything from your first NISM XIII certification to peer-benchmarked fund analysis.
                Built by an AMFI-registered MFD and former PwC consultant —
                the resources we wish someone had handed us.
              </p>
            </div>
          </div>

          <div className="space-y-16">
            {TOOLKIT.map((section, idx) => (
              <div key={idx}>
                <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-[#E5E0D5]">
                  <div>
                    <div className="serif text-xl tracking-tight">{section.group}</div>
                    <div className="text-sm text-[#5C5C58] mt-1">{section.blurb}</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-px bg-[#E5E0D5]">
                  {section.items.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={i}
                        href={item.href}
                        className="group bg-[#FAF7F0] hover:bg-white p-7 transition-colors flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-5">
                          <Icon size={22} strokeWidth={1.5} className="text-[#7B2D26]" />
                          <ChevronRight size={16} className="text-[#5C5C58] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h3 className="serif text-lg leading-snug mb-3 text-[#0F1419]">{item.title}</h3>
                        <p className="text-sm text-[#3A3A36] leading-relaxed mb-5 flex-1">{item.desc}</p>
                        <div className="text-xs uppercase tracking-wider text-[#5C5C58]">{item.meta}</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KNOWLEDGE SERIES */}
      <section id="knowledge" className="border-b border-[#E5E0D5] bg-[#0F1419] text-[#FAF7F0]">
        <div className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#B8923A] mb-4">The Knowledge Series</div>
            <h2 className="serif text-4xl md:text-5xl leading-[1.1] tracking-tight mb-6">
              Become the most informed person in the SIF conversation.
            </h2>
            <p className="text-[#C9C3B5] leading-relaxed mb-8">
              Independent SIF research from the ground up — written for distributors, RIAs,
              private bankers, and family-office advisors. No AMC sponsorships. No promoted funds.
            </p>

            <div className="space-y-6 mb-10">
              <SeriesItem tag="Weekly" title="Friday Brief" desc="Five-minute read. NAV moves, NFO updates, one strategy insight." />
              <SeriesItem tag="Monthly" title="Masterclass" desc="Live webinar on one deep-dive topic. Replays in your library." />
              <SeriesItem tag="Quarterly" title="Deep Dive" desc="Long-form research. The April 2026 'SIFs vs The Storm' edition is out now." />
              <SeriesItem tag="Annually" title="SIF Outlook" desc="The definitive year-in-review. Launches every December." />
            </div>

            <a
              href="#signup"
              className="inline-flex items-center gap-2 bg-[#B8923A] text-[#0F1419] px-6 py-3.5 text-sm font-medium hover:bg-[#FAF7F0] transition-colors"
            >
              <Mail size={16} />
              Subscribe — first issue Friday 2 May
            </a>
          </div>

          <div className="md:col-span-7">
            <div className="bg-[#FAF7F0] text-[#0F1419] p-8 md:p-10">
              <div className="flex items-baseline justify-between border-b-2 border-[#0F1419] pb-3 mb-6">
                <div className="serif text-2xl tracking-tight">The Friday Brief</div>
                <div className="text-xs uppercase tracking-wider text-[#5C5C58]">Issue №1 · 02 May 2026</div>
              </div>
              <div className="serif text-3xl leading-tight mb-6">
                The category nobody is talking about just survived a -11% Nifty drawdown — most of it.
              </div>
              <div className="text-sm leading-relaxed text-[#3A3A36] space-y-4 mb-6">
                <p>
                  In March 2026, the Nifty 50 dropped 11.30%. Across the SIF universe,
                  the average fund was down just 2.76%. Five funds posted single-digit drawdowns.
                  One was actually positive.
                </p>
                <p className="text-[#5C5C58] italic">
                  This week: the Alpha Shield ranking, what the worst performer got wrong,
                  and what the qSIF book looked like through the crash...
                </p>
              </div>
              <div className="flex items-center gap-2 pt-4 border-t border-[#E5E0D5] text-xs text-[#5C5C58]">
                <Lock size={12} />
                <span>Reserved for partner subscribers</span>
              </div>
            </div>
            <div className="text-xs text-[#C9C3B5] mt-4 italic">
              A preview of Issue 1, publishing Friday 2 May 2026.
            </div>
          </div>
        </div>
      </section>

      {/* FOR ACTIVE DISTRIBUTORS */}
      <section id="advanced" className="border-b border-[#E5E0D5]">
        <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-4">For active distributors</div>
            <h2 className="serif text-4xl leading-[1.1] tracking-tight mb-6">
              When you&rsquo;re ready to scale, we have more.
            </h2>
            <p className="text-[#3A3A36] leading-relaxed mb-8">
              Distributors transacting on SIFs regularly can opt into our advanced platform —
              co-branded report engine, prospect tracker, and lead routing from sifprime.com traffic.
              No subscription. We earn through transaction-level partnership.
            </p>
            <a
              href={PARTNERSHIP_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#0F1419] px-6 py-3.5 text-sm font-medium hover:bg-[#0F1419] hover:text-[#FAF7F0] transition-colors"
            >
              <MessageCircle size={16} />
              Schedule a partnership call
            </a>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-4">
            <ProRow title="Co-branded report engine" desc="HNI-ready PDFs with your logo, photo, brand colours, ARN." />
            <ProRow title="Prospect tracker" desc="See which clients opened, downloaded, and asked questions." />
            <ProRow title="Lead routing" desc="HNI enquiries from your city, with first-right-of-refusal." />
            <ProRow title="Quarterly partner briefing" desc="Closed-door call with the SIFPrime research desk." />
            <ProRow title="Co-branded webinars" desc="Host SIF education events for your client base." />
          </div>
        </div>
      </section>

      {/* SIGNUP */}
      <section id="signup" className="border-b border-[#E5E0D5] bg-[#F1ECDF]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          {!submitted ? (
            <>
              <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-4 text-center">Get the toolkit</div>
              <h2 className="serif text-4xl md:text-5xl leading-tight tracking-tight text-center mb-4">
                Five fields. No credit card.
              </h2>
              <p className="text-center text-[#3A3A36] mb-12 max-w-xl mx-auto">
                Welcome Brief lands in your inbox in 60 seconds with the Empanelment Guide
                and Selection Framework links.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5 bg-[#FAF7F0] border border-[#E5E0D5] p-8">
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Full name" value={form.name} onChange={update("name")} required />
                  <Field label="Firm / business" value={form.firm} onChange={update("firm")} required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="ARN number" value={form.arn} onChange={update("arn")} required hint="e.g. ARN-12345" />
                  <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Mobile" value={form.phone} onChange={update("phone")} required />
                  <Field label="City" value={form.city} onChange={update("city")} required />
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <SelectField label="AUM band" value={form.aum} onChange={update("aum")} options={["< ₹5 Cr", "₹5–25 Cr", "₹25–100 Cr", "₹100 Cr+"]} required />
                  <SelectField label="SIF distribution status" value={form.sifStatus} onChange={update("sifStatus")} options={["Already empanelled", "Empanelment in progress", "Need help getting empanelled", "Just exploring"]} required />
                </div>

                {errorMsg && (
                  <div className="text-sm text-[#7B2D26] bg-[#7B2D26]/10 border border-[#7B2D26]/30 px-4 py-3">{errorMsg}</div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#0F1419] text-[#FAF7F0] py-4 text-sm font-medium hover:bg-[#7B2D26] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? "Sending..." : (<><Send size={16} /> Get the toolkit</>)}
                </button>

                <p className="text-xs text-[#5C5C58] text-center pt-2">
                  By signing up you agree to receive the Friday Brief and toolkit emails. Unsubscribe anytime.
                </p>
              </form>
            </>
          ) : (
            <div className="text-center py-12">
              <CheckCircle2 size={48} className="text-[#7B2D26] mx-auto mb-6" />
              <h2 className="serif text-4xl mb-4">Welcome, partner.</h2>
              <p className="text-[#3A3A36] mb-2">Your Welcome Brief is on its way.</p>
              <p className="text-[#5C5C58] text-sm">
                Check your inbox in the next minute. If you don&rsquo;t see it, look in Promotions or write to{" "}
                <a href="mailto:info@sifprime.com" className="text-[#7B2D26] underline">info@sifprime.com</a>.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[#E5E0D5]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-xs uppercase tracking-[0.25em] text-[#7B2D26] mb-4 text-center">Frequently asked</div>
          <h2 className="serif text-4xl text-center mb-12">Honest answers to fair questions.</h2>
          <div className="divide-y divide-[#E5E0D5] border-y border-[#E5E0D5]">
            {FAQS.map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left hover:text-[#7B2D26] transition-colors"
                >
                  <span className="serif text-lg pr-6">{f.q}</span>
                  <ChevronRight size={18} className={`flex-shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-[15px] text-[#3A3A36] leading-relaxed">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F1419] text-[#C9C3B5]">
        <div className="mx-auto max-w-6xl px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="serif text-xl text-[#FAF7F0] mb-2">SIFPrime Partner</div>
            <p className="text-xs leading-relaxed">
              India&rsquo;s research-led platform for Specialized Investment Funds. Built for distributors, by a distributor.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#FAF7F0] mb-3">Contact</div>
            <p className="text-xs">info@sifprime.com</p>
            <p className="text-xs mt-1">+91 90329 99466</p>
            <p className="text-xs mt-3">
              <Link href="/partner/login" className="underline hover:text-[#FAF7F0]">Existing partner? Log in →</Link>
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-[#FAF7F0] mb-3">Compliance</div>
            <p className="text-xs leading-relaxed">
              SIFPrime is an AMFI-registered Mutual Fund Distributor (ARN-306593). We do not provide investment advice.
              Investments in SIFs are subject to market risk. Past performance is not indicative of future returns.
            </p>
          </div>
        </div>
        <div className="border-t border-[#1F2530] py-4 text-center text-xs text-[#5C5C58]">
          © 2026 SIFPrime · All rights reserved
        </div>
      </footer>
    </div>
  );
}

// ----- Helper components -----
function SeriesItem({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <div className="flex items-baseline gap-6 border-b border-[#1F2530] pb-5">
      <div className="text-[10px] uppercase tracking-[0.2em] text-[#B8923A] w-16 flex-shrink-0">{tag}</div>
      <div>
        <div className="serif text-xl text-[#FAF7F0] mb-1">{title}</div>
        <div className="text-sm text-[#C9C3B5]">{desc}</div>
      </div>
    </div>
  );
}

function ProRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-[#E5E0D5] last:border-0">
      <div className="w-2 h-2 rounded-full bg-[#7B2D26] mt-2 flex-shrink-0" />
      <div>
        <div className="font-medium mb-1">{title}</div>
        <div className="text-sm text-[#5C5C58]">{desc}</div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  hint?: string;
}

function Field({ label, value, onChange, type = "text", required, hint }: FieldProps) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-[#5C5C58] mb-1.5">
        {label} {required && <span className="text-[#7B2D26]">*</span>}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-[#E5E0D5] bg-[#FAF7F0] px-3.5 py-3 text-sm focus:outline-none focus:border-[#0F1419] transition-colors"
      />
      {hint && <div className="text-xs text-[#5C5C58] mt-1">{hint}</div>}
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

function SelectField({ label, value, onChange, options, required }: SelectFieldProps) {
  return (
    <label className="block">
      <div className="text-xs uppercase tracking-wider text-[#5C5C58] mb-1.5">
        {label} {required && <span className="text-[#7B2D26]">*</span>}
      </div>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-[#E5E0D5] bg-[#FAF7F0] px-3.5 py-3 text-sm focus:outline-none focus:border-[#0F1419] transition-colors"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
