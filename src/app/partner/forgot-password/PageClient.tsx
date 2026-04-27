"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function ForgotPasswordPageClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/partner/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0A1628] pt-24 pb-20">
        <div className="mx-auto max-w-md px-4">
          <h1 className="text-center text-3xl font-bold text-white">
            Forgot your password?
          </h1>
          <p className="mt-3 text-center text-sm text-slate-400">
            Enter your registered email and we&apos;ll send you a reset link.
          </p>

          {submitted ? (
            <div className="mt-8 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
              <p className="text-sm text-emerald-200 leading-relaxed">
                If an account exists with <strong>{email}</strong>, a
                password-reset link has been sent. Check your inbox (and spam).
                The link expires in 30 minutes.
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    className={inputCls}
                    placeholder="rajeev@firm.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 py-6 text-base font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </>
          )}

          <p className="mt-8 text-center text-sm text-slate-400">
            Remembered it?{" "}
            <Link
              href="/partner/login"
              className="font-semibold text-amber-400 hover:text-amber-300"
            >
              Back to login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
