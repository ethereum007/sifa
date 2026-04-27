"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleShow = useCallback(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem("sifprime_exit_popup_dismissed");
    if (dismissed) return;
    setShow(true);
  }, []);

  useEffect(() => {
    // Desktop: mouse leaves viewport upward
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) handleShow();
    };
    document.addEventListener("mouseleave", handleMouseLeave);

    // Mobile: show after 45 seconds
    const timer = setTimeout(() => {
      handleShow();
    }, 45000);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [handleShow]);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("sifprime_exit_popup_dismissed", "true");
  };

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = "https://qawkanomagvilmiplyjr.supabase.co/storage/v1/object/public/reports/SIF_March_2026_Performance.pdf";
    a.download = "SIF_Comparison_Guide.pdf";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);

    try {
      await supabase.functions.invoke("submit-lead", {
        body: {
          name: "SIF Guide Download",
          email,
          phone: "N/A",
        },
      });
    } catch {
      // silently fail — still deliver the guide
    }

    triggerDownload();
    setSubmitted(true);
    setSubmitting(false);
    localStorage.setItem("sifprime_exit_popup_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-fade-in">
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-3">&#9989;</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Your guide is downloading!
            </h3>
            <p className="text-sm text-muted-foreground">
              Check your downloads folder for the SIF Comparison Guide. If it didn&apos;t start,{" "}
              <button onClick={triggerDownload} className="text-primary underline">click here</button>.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <div className="text-3xl mb-2">&#128218;</div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                Get our Free SIF Comparison Guide
              </h3>
              <p className="text-sm text-muted-foreground">
                Compare all 19 SIFs side-by-side — returns, strategy, taxation, and minimum investment in one PDF.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg text-sm bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg text-sm transition-colors disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Download Free Guide"}
              </button>
              <p className="text-xs text-muted-foreground text-center">
                No spam. Unsubscribe anytime.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
