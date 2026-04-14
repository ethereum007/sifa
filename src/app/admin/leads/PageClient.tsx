"use client";

import { useState, useEffect, useMemo } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  fund_slug: string | null;
  fund_name: string | null;
  message: string | null;
  source: string | null;
  status: string | null;
  created_at: string;
};

type Stats = {
  total: number;
  newCount: number;
  contacted: number;
  converted: number;
  byFund: Record<string, number>;
};

const STATUS_OPTIONS = ["new", "contacted", "converted", "not-interested"] as const;

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  contacted: "bg-amber-500/20 text-amber-400",
  converted: "bg-emerald-500/20 text-emerald-400",
  "not-interested": "bg-slate-600/20 text-slate-400",
};

export default function AdminLeadsPageClient() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, newCount: 0, contacted: 0, converted: 0, byFund: {} });
  const [loading, setLoading] = useState(false);
  const [fundFilter, setFundFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
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
    const res = await fetch("/api/admin/leads");
    if (res.ok) {
      const data = await res.json();
      setLeads(data.leads || []);
      setStats(data.stats || stats);
    }
  }

  async function updateStatus(id: string, status: string) {
    // Optimistic update
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      alert("Could not update status — refresh and try again.");
      await loadData();
    } else {
      // Refresh stats
      loadData();
    }
  }

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (fundFilter !== "all" && (l.fund_slug || "unknown") !== fundFilter) return false;
      const currentStatus = l.status || "new";
      if (statusFilter !== "all" && currentStatus !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        const hay = `${l.name} ${l.email} ${l.phone || ""} ${l.fund_name || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, fundFilter, statusFilter, search]);

  const fundOptions = useMemo(() => {
    const keys = Object.keys(stats.byFund || {}).sort();
    return keys;
  }, [stats.byFund]);

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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Lead Management</h1>
            <p className="text-slate-400 text-sm mt-1">Direct leads from fund pages (sifprime.com)</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/admin/partners"
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm"
            >
              Partners →
            </a>
            <button
              onClick={loadData}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-xs text-slate-400 uppercase tracking-wider">Total Leads</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-blue-800/50">
            <p className="text-xs text-blue-400 uppercase tracking-wider">New (Unworked)</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">{stats.newCount}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
            <p className="text-xs text-amber-400 uppercase tracking-wider">Contacted</p>
            <p className="text-3xl font-bold text-white mt-1">{stats.contacted}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 border border-emerald-800/50">
            <p className="text-xs text-emerald-400 uppercase tracking-wider">Converted</p>
            <p className="text-3xl font-bold text-emerald-400 mt-1">{stats.converted}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="text"
            placeholder="Search name, email, phone, fund…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500"
          />
          <select
            value={fundFilter}
            onChange={(e) => setFundFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white"
          >
            <option value="all">All funds ({stats.total})</option>
            {fundOptions.map((slug) => (
              <option key={slug} value={slug}>
                {slug} ({stats.byFund[slug]})
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-white"
          >
            <option value="all">All statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Leads Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Name / Email</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden md:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Fund</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden sm:table-cell">Source</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase hidden lg:table-cell">Received</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-400 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-500">
                      {leads.length === 0 ? "No leads yet" : "No leads match your filters"}
                    </td>
                  </tr>
                )}
                {filteredLeads.map((lead) => {
                  const status = lead.status || "new";
                  return (
                    <tr
                      key={lead.id}
                      className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${
                        status === "new" ? "bg-blue-500/5" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{lead.name}</p>
                        <a href={`mailto:${lead.email}`} className="text-xs text-emerald-400 hover:text-emerald-300">
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-300 hidden md:table-cell">
                        {lead.phone ? (
                          <a href={`tel:${lead.phone}`} className="hover:text-emerald-400">
                            {lead.phone}
                          </a>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-200 text-xs">{lead.fund_name || "—"}</p>
                        <p className="text-slate-500 text-[11px] font-mono">{lead.fund_slug || ""}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs hidden sm:table-cell">{lead.source || "—"}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell whitespace-nowrap">
                        {new Date(lead.created_at).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || ""}`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <select
                          value={status}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:bg-slate-700"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              Mark {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-600 mt-4">
          Showing {filteredLeads.length} of {leads.length} leads. Last 500 loaded.
        </p>
      </div>
    </div>
  );
}
