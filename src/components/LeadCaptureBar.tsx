"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

const INVESTOR_TYPES = ["Investor", "MFD", "RIA", "Family Office"] as const;

export default function LeadCaptureBar() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<string>("Investor");

  const handleWhatsApp = () => {
    const message = `Hi, I'm ${name || "interested"}. Phone: ${phone || "N/A"}. I am a ${type}. I want details on Specialized Investment Funds (SIF).`;
    window.open(
      `https://wa.me/919032999466?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="sticky top-0 z-[60] bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 text-white shadow-lg">
      <div className="container mx-auto px-3 py-2">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center">
          <span className="text-xs sm:text-sm font-medium whitespace-nowrap hidden sm:inline">
            Get Free SIF Consultation:
          </span>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full sm:w-28 px-2.5 py-1.5 rounded text-xs text-foreground bg-white border-0 placeholder:text-muted-foreground"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full sm:w-28 px-2.5 py-1.5 rounded text-xs text-foreground bg-white border-0 placeholder:text-muted-foreground"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full sm:w-32 px-2.5 py-1.5 rounded text-xs text-foreground bg-white border-0"
          >
            {INVESTOR_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <button
            onClick={handleWhatsApp}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-green-500 hover:bg-green-400 text-white text-xs font-semibold rounded transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Us
          </button>
          <a
            href="https://calendly.com/sifprime/strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-semibold rounded transition-colors whitespace-nowrap"
          >
            Book a SIF Strategy Call
          </a>
        </div>
      </div>
    </div>
  );
}
