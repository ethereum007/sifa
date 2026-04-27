"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

function ResetPasswordInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/partner/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/partner/login"), 2500);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition";
  const labelCls = "block text-sm font-medium text-slate-300 mb-1.5";

  if (!token) {
    return (
      <div className="mx-auto max-w-md px-4">
        <h1 className="text-center text-3xl font-bold text-white">
          Invalid reset link
        </h1>
        <p className="mt-3 text-center text-sm text-slate-400">
          This page requires a reset token. If you arrived here from a
          password-reset email, the link may have been truncated.
        </p>
        <p className="mt-6 text-center">
          <Link
            href="/partner/forgot-password"
            className="font-semibold text-amber-400 hover:text-amber-300"
          >
            Request a new reset link →
          </Link>
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4">
        <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-3" />
          <h1 className="text-xl font-bold text-emerald-200 mb-2">
            Password updated
          </h1>
          <p className="text-sm text-emerald-200">
            Redirecting you to the login page…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4">
      <h1 className="text-center text-3xl font-bold text-white">
        Set a new password
      </h1>
      <p className="mt-3 text-center text-sm text-slate-400">
        Choose a strong password (at least 8 characters).
      </p>

      {error && (
        <div className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div>
          <label className={labelCls}>New Password</label>
          <input
            type="password"
            className={inputCls}
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={8}
          />
        </div>
        <div>
          <label className={labelCls}>Confirm Password</label>
          <input
            type="password"
            className={inputCls}
            placeholder="Re-enter your new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            autoComplete="new-password"
            minLength={8}
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
              Updating password...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPageClient() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0A1628] pt-24 pb-20">
        <Suspense
          fallback={
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            </div>
          }
        >
          <ResetPasswordInner />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
