"use client";

import { useState, useEffect } from "react";
import type { Partner } from "@/lib/partner/types";

export default function AdminPartnersPageClient() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stats, setStats] = useState({ total: 0, totalProspects: 0, totalReports: 0, needHelp: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authed via cookie
    if (document.cookie.includes("admin_auth=true")) {
      setAuthenticated(true);
      loadData();
    }
  }, []);

  async function handleLogin() {
    setLoading(true);
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      document.cookie = "admin_auth=true;path=/;max-age=86400";
      setAuthenticated(true);
      await loadData();
    } else {
      alert("Invalid password");
    }
    setLoading(false);
  }

  async function loadData() {
    const res = await fetch("/api/admin/partners");
    if (res.ok) {
      const data = await res.json();
      setPartners(data.partners || []);
      setStats(data.stats || stats);
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-sm">
          <h1 className="text-xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-slate-400 text-sm mb-6">Enter admin password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 mb-4"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    empanelled: "bg-emerald-500/20 text-emerald-400",
    in_progress: "bg-blue-500/20 text-blue-400",
    need_help: "bg-amber-500/20 text-amber-400",
    exploring: "bg-slate-500/20 text-slate-400",
  };

  const planColors: Record<string, string> = {
    starter: "bg-slate-700 text-slate-300",
    pro: "bg-blue-600/20 text-blue-400",
    enterprise: "bg-purple-600/20 text-purple-400",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Partner Management</h1>
            <p className="text-slate-400 text-sm mt-1">SIFPrime Admin Panel</p>
          </div>
          <button
            onClick={loadData}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm"
          >
            Refresh
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Total Partners</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Total Prospects</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.totalProspects}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Reports Sent</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.totalReports}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-amber-800/50">
            <p className="text-xs text-amber-400 uppercase tracking-wider">Empanelment Help Needed</p>
            <p className="text-3xl font-bold text-amber-400 mt-1">{stats.needHelp}</p>
          </div>
        </div>

        {/* Partners Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Firm</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">ARN</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden md:table-cell">City</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Plan</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">SIF Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden sm:table-cell">Prospects</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden sm:table-cell">Reports</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden lg:table-cell">Joined</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Active</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.length === 0 && (
                  <tr>
                    <td colSpan={10} className="text-center py-12 text-slate-500">
                      No partners yet
                    </td>
                  </tr>
                )}
                {partners.map((p) => (
                  <tr
                    key={p.id}
                    className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${
                      p.distributor_status === "need_help" ? "bg-amber-500/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{p.firm_name || p.full_name}</p>
                      <p className="text-xs text-slate-500">{p.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">{p.arn_number}</td>
                    <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{p.city || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${planColors[p.plan] || "bg-slate-700 text-slate-300"}`}>
                        {p.plan}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[p.distributor_status] || ""}`}>
                        {p.distributor_status === "need_help" ? "⚠️ Need Help" : p.distributor_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-slate-300 hidden sm:table-cell">—</td>
                    <td className="px-4 py-3 text-right text-slate-300 hidden sm:table-cell">{p.reports_sent}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">
                      {new Date(p.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block w-2 h-2 rounded-full ${p.is_active ? "bg-emerald-500" : "bg-red-500"}`} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`/partner/dashboard?key=${p.widget_key}`}
                        target="_blank"
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        Dashboard
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
