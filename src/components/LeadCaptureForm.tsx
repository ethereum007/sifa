"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

type Props = {
  fundSlug?: string;
  fundName?: string;
  source?: string;
  heading?: string;
  subheading?: string;
  compact?: boolean;
};

const LeadCaptureForm = ({
  fundSlug,
  fundName,
  source = "fund-page",
  heading,
  subheading,
  compact = false,
}: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const defaultHeading = fundName
    ? `Interested in ${fundName}?`
    : "Get personalized SIF recommendations";
  const defaultSub = fundName
    ? "Leave your details — a SIFPrime specialist will reach out within 24 hours with fund details, fit check, and onboarding steps."
    : "Share your details and we'll match you to the right SIF based on your goals and risk profile.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          fund_slug: fundSlug,
          fund_name: fundName,
          source,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Could not reach the server. Please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className={`rounded-xl border border-primary/30 bg-primary/5 ${compact ? "p-5" : "p-6 lg:p-8"}`}>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-foreground mb-1">Thanks, {name.split(" ")[0]} — we'll be in touch.</h3>
            <p className="text-sm text-foreground/70 mb-4">
              A SIFPrime specialist will reach out within 24 hours. For anything urgent, ping us on WhatsApp.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp us now
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-border bg-white shadow-sm ${compact ? "p-5" : "p-6 lg:p-8"}`}>
      <h3 className={`font-bold text-foreground mb-1 ${compact ? "text-lg" : "text-xl lg:text-2xl"}`}>
        {heading || defaultHeading}
      </h3>
      <p className="text-sm text-foreground/60 mb-4">{subheading || defaultSub}</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-border bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button type="submit" disabled={submitting} className="bg-primary hover:bg-primary/90 text-white gap-2 flex-1 sm:flex-initial">
            {submitting ? "Sending…" : "Get a callback"}
            {!submitting && <ArrowRight className="w-4 h-4" />}
          </Button>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial">
            <Button type="button" variant="outline" className="gap-2 w-full">
              <MessageCircle className="w-4 h-4" /> WhatsApp instead
            </Button>
          </a>
        </div>

        <p className="text-[11px] text-foreground/40 pt-1">
          By submitting, you agree to be contacted by SIFPrime. No spam — we only reach out about your enquiry.
        </p>
      </form>
    </div>
  );
};

export default LeadCaptureForm;
