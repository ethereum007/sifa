"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function PartnerLoginPageClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/partner/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }
      router.push(`/partner/dashboard?key=${data.widget_key}`);
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
          <h1 className="text-center text-3xl font-bold text-white">Partner Login</h1>
          <p className="mt-3 text-center text-sm text-slate-400">
            Access your SIFPrime partner dashboard.
          </p>

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
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password"
                className={inputCls}
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
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
                  Logging in...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            New partner?{" "}
            <Link href="/partner" className="font-semibold text-amber-400 hover:text-amber-300">
              Create an account
            </Link>
          </p>
          <p className="mt-2 text-center text-xs text-slate-500">
            Lost your dashboard link? Email{" "}
            <a href="mailto:partners@sifprime.com" className="text-amber-500 hover:text-amber-400">
              partners@sifprime.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
