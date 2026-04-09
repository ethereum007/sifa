"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Partner, PartnerLead, PartnerStats } from "@/lib/partner/types";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SIDEBAR_BG = "#0A1628";
const SIDEBAR_W = 260;

const TABS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "prospects", label: "Prospects", icon: "👥" },
  { key: "reports", label: "Reports", icon: "📄" },
  { key: "prospect-tool", label: "Prospect Tool", icon: "🔗" },
  { key: "branding", label: "Branding", icon: "🎨" },
  { key: "embed", label: "Embed Widget", icon: "📦" },
  { key: "settings", label: "Settings", icon: "⚙️" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const SURPLUS_OPTIONS = [
  "₹10–25L",
  "₹25–50L",
  "₹50L–1Cr",
  "₹1Cr+",
];

const INVESTMENT_OPTIONS = [
  "Mutual Funds",
  "PMS",
  "Stocks",
  "Fixed Deposits",
  "NPS",
  "Nothing yet",
];

const RISK_OPTIONS = ["Conservative", "Moderate", "Aggressive"];

const SIF_FAMILIARITY_OPTIONS = [
  "Never heard",
  "Heard of it",
  "Researching",
  "Ready to invest",
];

const STATUS_BADGE: Record<string, { emoji: string; color: string; bg: string; label: string }> = {
  new: { emoji: "🟡", color: "#92400e", bg: "#fef3c7", label: "New" },
  report_sent: { emoji: "🔵", color: "#1e40af", bg: "#dbeafe", label: "Report Sent" },
  consultation_booked: { emoji: "🟢", color: "#065f46", bg: "#d1fae5", label: "Consultation Booked" },
  invested: { emoji: "🟣", color: "#6b21a8", bg: "#ede9fe", label: "Invested" },
  following_up: { emoji: "⏳", color: "#78350f", bg: "#fef9c3", label: "Following Up" },
};

const PLAN_COLORS: Record<string, string> = {
  starter: "#64748b",
  pro: "#2563eb",
  enterprise: "#7c3aed",
};

/* ------------------------------------------------------------------ */
/*  Helper: initials                                                   */
/* ------------------------------------------------------------------ */

function initials(name: string | null): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  suffix,
  action,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "24px 20px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      minWidth: 180,
      flex: 1,
    }}>
      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: "#0f172a" }}>{value}</span>
        {suffix && <span style={{ fontSize: 13, color: "#94a3b8" }}>{suffix}</span>}
        {action}
      </div>
    </div>
  );
}

function Badge({ status }: { status: string }) {
  const s = STATUS_BADGE[status] || STATUS_BADGE.new;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "2px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      color: s.color,
      background: s.bg,
    }}>
      {s.emoji} {s.label}
    </span>
  );
}

function ProgressBar({ pct, color = "#2563eb" }: { pct: number; color?: string }) {
  return (
    <div style={{ background: "#e2e8f0", borderRadius: 999, height: 8, width: "100%" }}>
      <div style={{
        background: color,
        borderRadius: 999,
        height: 8,
        width: `${Math.min(pct, 100)}%`,
        transition: "width 0.4s ease",
      }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal wrapper                                                      */
/* ------------------------------------------------------------------ */

function Modal({
  open,
  onClose,
  title,
  children,
  width = 520,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: number;
}) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 16,
          width: "100%",
          maxWidth: width,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: 28,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#0f172a" }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 22,
              cursor: "pointer",
              color: "#94a3b8",
              lineHeight: 1,
            }}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared input styles                                                */
/* ------------------------------------------------------------------ */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#334155",
  marginBottom: 4,
};

const btnPrimary: React.CSSProperties = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

const btnOutline: React.CSSProperties = {
  background: "#fff",
  color: "#2563eb",
  border: "1px solid #2563eb",
  borderRadius: 8,
  padding: "10px 20px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function PageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const key = searchParams.get("key") || "";

  /* ---- state ---- */
  const [partner, setPartner] = useState<Partner | null>(null);
  const [stats, setStats] = useState<PartnerStats>({
    total_prospects: 0,
    reports_sent: 0,
    consultations_booked: 0,
    aum_in_pipeline: 0,
    branding_completeness_pct: 0,
  });
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* modals */
  const [addProspectOpen, setAddProspectOpen] = useState(false);
  const [csvUploadOpen, setCsvUploadOpen] = useState(false);
  const [aumModalOpen, setAumModalOpen] = useState(false);

  /* add prospect form */
  const [pName, setPName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pSurplus, setPSurplus] = useState("");
  const [pInvestments, setPInvestments] = useState<string[]>([]);
  const [pRisk, setPRisk] = useState("");
  const [pFamiliarity, setPFamiliarity] = useState("");
  const [saving, setSaving] = useState(false);

  /* branding form */
  const [brandForm, setBrandForm] = useState({
    tagline: "",
    about_text: "",
    sebi_reg_number: "",
    website: "",
    brand_color: "#1B4B8A",
    secondary_color: "#E2E8F0",
    report_header_style: "professional" as "professional" | "clean" | "bold",
    address: "",
    whatsapp_number: "",
    linkedin_url: "",
    cta_text: "Schedule a SIF Consultation",
    cta_url: "",
    custom_disclaimer: "",
  });

  /* settings form */
  const [settingsForm, setSettingsForm] = useState({
    email: "",
    phone: "",
    password: "",
    distributor_status: "",
  });

  /* reports filter */
  const [reportFilter, setReportFilter] = useState<"all" | "sent" | "unsent" | "viewed">("all");

  /* aum input */
  const [aumInput, setAumInput] = useState("");

  /* search */
  const [searchQ, setSearchQ] = useState("");

  /* csv */
  const csvRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);

  /* ---- fetch partner ---- */
  const fetchPartner = useCallback(async () => {
    if (!key) {
      router.replace("/partner");
      return;
    }
    try {
      const res = await fetch(`/api/partner/me?key=${encodeURIComponent(key)}`);
      if (!res.ok) {
        router.replace("/partner");
        return;
      }
      const data = await res.json();
      setPartner(data.partner);
      setStats(data.stats || {
        total_prospects: 0,
        reports_sent: data.partner?.reports_sent || 0,
        consultations_booked: 0,
        aum_in_pipeline: 0,
        branding_completeness_pct: 0,
      });
      setLeads(data.leads || []);
      /* prefill branding form */
      const p = data.partner as Partner;
      setBrandForm({
        tagline: p.tagline || "",
        about_text: p.about_text || "",
        sebi_reg_number: p.sebi_reg_number || "",
        website: p.website || "",
        brand_color: p.brand_color || "#1B4B8A",
        secondary_color: p.secondary_color || "#E2E8F0",
        report_header_style: p.report_header_style || "professional",
        address: p.address || "",
        whatsapp_number: p.whatsapp_number || "",
        linkedin_url: p.linkedin_url || "",
        cta_text: p.cta_text || "Schedule a SIF Consultation",
        cta_url: p.cta_url || "",
        custom_disclaimer: p.custom_disclaimer || "",
      });
      setSettingsForm({
        email: p.email || "",
        phone: p.phone || "",
        password: "",
        distributor_status: p.distributor_status || "",
      });
      setAumInput(String(data.stats?.aum_in_pipeline || 0));
    } catch {
      router.replace("/partner");
    } finally {
      setLoading(false);
    }
  }, [key, router]);

  useEffect(() => {
    fetchPartner();
  }, [fetchPartner]);

  /* ---- add prospect handler ---- */
  const handleAddProspect = async () => {
    if (!pName || !pEmail) return;
    setSaving(true);
    try {
      await fetch("/api/partner/prospects/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          client_name: pName,
          client_email: pEmail,
          client_phone: pPhone,
          investable_surplus: pSurplus,
          current_investments: pInvestments,
          risk_profile: pRisk,
          sif_familiarity: pFamiliarity,
        }),
      });
      setAddProspectOpen(false);
      setPName(""); setPEmail(""); setPPhone(""); setPSurplus(""); setPInvestments([]); setPRisk(""); setPFamiliarity("");
      fetchPartner();
    } catch {
      alert("Failed to add prospect");
    } finally {
      setSaving(false);
    }
  };

  /* ---- prospect actions ---- */
  const prospectAction = async (action: string, leadId: string) => {
    try {
      await fetch(`/api/partner/prospects/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, lead_id: leadId }),
      });
      fetchPartner();
    } catch {
      alert(`Failed: ${action}`);
    }
  };

  /* ---- branding save ---- */
  const handleBrandingSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/partner/branding/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, ...brandForm }),
      });
      fetchPartner();
    } catch {
      alert("Failed to save branding");
    } finally {
      setSaving(false);
    }
  };

  /* ---- settings save ---- */
  const handleSettingsSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/partner/settings/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, ...settingsForm }),
      });
      fetchPartner();
    } catch {
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  /* ---- file upload helper ---- */
  const uploadAsset = async (file: File, field: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("key", key);
    fd.append("field", field);
    try {
      const res = await fetch("/api/partner/upload-asset", { method: "POST", body: fd });
      if (res.ok) fetchPartner();
    } catch {
      alert("Upload failed");
    }
  };

  /* ---- AUM update ---- */
  const handleAumUpdate = async () => {
    try {
      await fetch("/api/partner/stats/update-aum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, aum_in_pipeline: Number(aumInput) }),
      });
      setAumModalOpen(false);
      fetchPartner();
    } catch {
      alert("Failed to update AUM");
    }
  };

  /* ---- CSV upload ---- */
  const handleCsvUpload = async () => {
    if (!csvFile) return;
    const fd = new FormData();
    fd.append("file", csvFile);
    fd.append("key", key);
    try {
      await fetch("/api/partner/prospects/upload-csv", { method: "POST", body: fd });
      setCsvUploadOpen(false);
      setCsvFile(null);
      fetchPartner();
    } catch {
      alert("CSV upload failed");
    }
  };

  /* ---- copy helper ---- */
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => alert("Copied!"));
  };

  /* ---- filtered leads ---- */
  const filteredLeads = leads.filter((l) => {
    if (searchQ) {
      const q = searchQ.toLowerCase();
      if (
        !l.client_name.toLowerCase().includes(q) &&
        !l.client_email.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  /* ---- filtered reports ---- */
  const filteredReports = leads.filter((l) => {
    if (reportFilter === "sent") return !!l.report_sent_at;
    if (reportFilter === "unsent") return !l.report_sent_at;
    if (reportFilter === "viewed") return !!l.report_sent_at; // placeholder
    return true;
  });

  /* ---- loading/auth ---- */
  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#f1f5f9" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>Loading...</div>
          <div style={{ color: "#64748b" }}>Authenticating partner session</div>
        </div>
      </div>
    );
  }

  if (!partner) return null;

  const firmName = partner.firm_name || partner.full_name;
  const avatarColor = partner.brand_color || "#2563eb";
  const prospectLink = `https://sifprime.com/invest/${partner.widget_key}`;

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* ---- Mobile hamburger ---- */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 1100,
          background: SIDEBAR_BG,
          color: "#fff",
          border: "none",
          borderRadius: 8,
          width: 40,
          height: 40,
          fontSize: 20,
          cursor: "pointer",
          display: "none",
        }}
        className="hamburger-btn"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>

      {/* ---- Sidebar ---- */}
      <aside
        style={{
          width: SIDEBAR_W,
          minHeight: "100vh",
          background: SIDEBAR_BG,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : undefined,
          zIndex: 1050,
          transition: "transform 0.25s ease",
        }}
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
      >
        {/* Logo */}
        <div style={{ padding: "28px 20px 8px" }}>
          <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
            SIF<span style={{ color: "#3b82f6" }}>Prime</span>
          </div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Partner Portal</div>
        </div>

        {/* Profile */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 16,
              flexShrink: 0,
            }}>
              {initials(firmName)}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {firmName}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>ARN: {partner.arn_number}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => { setActiveTab(t.key); setSidebarOpen(false); }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderRadius: 8,
                border: "none",
                background: activeTab === t.key ? "rgba(59,130,246,0.15)" : "transparent",
                color: activeTab === t.key ? "#60a5fa" : "#94a3b8",
                fontSize: 14,
                fontWeight: activeTab === t.key ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                marginBottom: 2,
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </nav>

        {/* Plan badge */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{
              display: "inline-block",
              padding: "3px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              background: PLAN_COLORS[partner.plan] || "#64748b",
              color: "#fff",
            }}>
              {partner.plan}
            </span>
            {partner.plan !== "enterprise" && (
              <button
                onClick={() => setActiveTab("settings")}
                style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 12, cursor: "pointer", fontWeight: 600 }}
              >
                Upgrade
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ---- Sidebar overlay (mobile) ---- */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1040 }}
          className="sidebar-overlay"
        />
      )}

      {/* ---- Main content ---- */}
      <main
        style={{
          marginLeft: SIDEBAR_W,
          flex: 1,
          padding: "32px 36px",
          maxWidth: 1200,
          minHeight: "100vh",
        }}
        className="main-content"
      >
        {/* ============================================================ */}
        {/*  DASHBOARD TAB                                                */}
        {/* ============================================================ */}
        {activeTab === "dashboard" && (
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>
              Welcome back, {partner.full_name.split(" ")[0]}
            </h1>
            <p style={{ color: "#64748b", marginBottom: 28, fontSize: 14 }}>
              Here is your partner overview.
            </p>

            {/* Stat cards */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
              <StatCard label="Prospects Added" value={stats.total_prospects} />
              <StatCard label="Reports Sent" value={stats.reports_sent} />
              <StatCard label="Consultations Booked" value={stats.consultations_booked} />
              <StatCard
                label="AUM in Pipeline"
                value={`₹${stats.aum_in_pipeline}`}
                suffix="Cr"
                action={
                  <button
                    onClick={() => setAumModalOpen(true)}
                    style={{
                      background: "#f1f5f9",
                      border: "1px solid #e2e8f0",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 11,
                      cursor: "pointer",
                      color: "#2563eb",
                      fontWeight: 600,
                      marginLeft: 6,
                    }}
                  >
                    Update
                  </button>
                }
              />
            </div>

            {/* Branding completeness */}
            <div style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              marginBottom: 16,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontWeight: 600, color: "#0f172a" }}>Branding Completeness</span>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>{stats.branding_completeness_pct}%</span>
              </div>
              <ProgressBar pct={stats.branding_completeness_pct} />
              {stats.branding_completeness_pct < 80 && (
                <button
                  onClick={() => setActiveTab("branding")}
                  style={{ marginTop: 10, fontSize: 13, color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                >
                  Complete your branding to unlock co-branded reports &rarr;
                </button>
              )}
            </div>

            {/* Empanelment banner */}
            {(partner.distributor_status === "need_help" || partner.distributor_status === "in_progress") && (
              <div style={{
                background: partner.distributor_status === "need_help" ? "#fffbeb" : "#eff6ff",
                border: `1px solid ${partner.distributor_status === "need_help" ? "#fbbf24" : "#93c5fd"}`,
                borderRadius: 12,
                padding: "14px 20px",
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}>
                <span style={{ fontSize: 20 }}>{partner.distributor_status === "need_help" ? "⚠️" : "ℹ️"}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>
                    SIF Empanelment: {partner.distributor_status === "need_help" ? "Need Help" : "In Progress"}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b" }}>
                    {partner.distributor_status === "need_help"
                      ? "Contact us to get help with your SIF distributor empanelment process."
                      : "Your empanelment application is being processed. We'll update you soon."}
                  </div>
                </div>
              </div>
            )}

            {/* Quick actions */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
              <button onClick={() => { setActiveTab("prospects"); setAddProspectOpen(true); }} style={btnPrimary}>
                + Add Prospect
              </button>
              <button onClick={() => setActiveTab("reports")} style={btnOutline}>
                📤 Send Reports
              </button>
              <button onClick={() => copyText(prospectLink)} style={btnOutline}>
                🔗 Copy Prospect Link
              </button>
              <button onClick={() => setActiveTab("reports")} style={btnOutline}>
                👁️ Preview Report
              </button>
            </div>

            {/* Recent activity */}
            <div style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginBottom: 12, marginTop: 0 }}>
                Recent Activity
              </h3>
              {leads.length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
                  No activity yet. Add your first prospect to get started.
                </p>
              ) : (
                <div>
                  {leads.slice(0, 5).map((l) => (
                    <div key={l.id} style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid #f1f5f9",
                    }}>
                      <div>
                        <span style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>{l.client_name}</span>
                        <span style={{ color: "#94a3b8", fontSize: 13, marginLeft: 8 }}>
                          {l.sif_category_match || "—"}
                        </span>
                      </div>
                      <Badge status={l.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  PROSPECTS TAB                                                */}
        {/* ============================================================ */}
        {activeTab === "prospects" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>Prospects</h1>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setAddProspectOpen(true)} style={btnPrimary}>+ Add Prospect</button>
                <button onClick={() => setCsvUploadOpen(true)} style={btnOutline}>📥 Upload CSV</button>
                <button onClick={() => prospectAction("send-all-reports", "")} style={btnOutline}>📤 Send All Reports</button>
              </div>
            </div>

            {/* Search */}
            <div style={{ marginBottom: 16 }}>
              <input
                placeholder="Search by name or email..."
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                style={{ ...inputStyle, maxWidth: 360 }}
              />
            </div>

            {/* Table */}
            <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    {["Name", "Email", "Phone", "Surplus", "Risk Profile", "SIF Match", "Status", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "12px 14px", fontWeight: 600, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                        No prospects yet. Click &quot;+ Add Prospect&quot; to get started.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((l) => (
                      <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0f172a" }}>{l.client_name}</td>
                        <td style={{ padding: "10px 14px", color: "#64748b" }}>{l.client_email}</td>
                        <td style={{ padding: "10px 14px", color: "#64748b" }}>{l.client_phone || "—"}</td>
                        <td style={{ padding: "10px 14px", color: "#64748b" }}>{l.investable_surplus || "—"}</td>
                        <td style={{ padding: "10px 14px", color: "#64748b" }}>{l.risk_profile || "—"}</td>
                        <td style={{ padding: "10px 14px", color: "#2563eb", fontWeight: 600 }}>{l.sif_category_match || "—"}</td>
                        <td style={{ padding: "10px 14px" }}><Badge status={l.status} /></td>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            <button onClick={() => prospectAction("view-report", l.id)} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#334155" }}>View Report</button>
                            <button onClick={() => prospectAction("send-report", l.id)} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#334155" }}>Send Report</button>
                            <button onClick={() => prospectAction("mark-consulted", l.id)} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#334155" }}>Mark Consulted</button>
                            <button onClick={() => { const ph = l.client_phone || ""; window.open(`https://wa.me/${ph.replace(/\D/g, "")}`, "_blank"); }} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#334155" }}>WhatsApp</button>
                            <button onClick={() => { if (confirm("Delete this prospect?")) prospectAction("delete", l.id); }} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #fca5a5", background: "#fff", cursor: "pointer", color: "#dc2626" }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  REPORTS TAB                                                  */}
        {/* ============================================================ */}
        {activeTab === "reports" && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 16 }}>Reports</h1>

            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {(["all", "sent", "unsent", "viewed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setReportFilter(f)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 999,
                    border: reportFilter === f ? "2px solid #2563eb" : "1px solid #e2e8f0",
                    background: reportFilter === f ? "#eff6ff" : "#fff",
                    color: reportFilter === f ? "#2563eb" : "#64748b",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                    {["Report", "Prospect", "SIF Match", "Generated", "Sent", "Views", "Actions"].map((h) => (
                      <th key={h} style={{ padding: "12px 14px", fontWeight: 600, color: "#475569", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>No reports found.</td>
                    </tr>
                  ) : (
                    filteredReports.map((l) => (
                      <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "10px 14px", fontWeight: 600, color: "#0f172a", fontFamily: "monospace", fontSize: 13 }}>
                          {l.report_id.slice(0, 8)}...
                        </td>
                        <td style={{ padding: "10px 14px", color: "#0f172a" }}>{l.client_name}</td>
                        <td style={{ padding: "10px 14px", color: "#2563eb", fontWeight: 600 }}>{l.sif_category_match || "—"}</td>
                        <td style={{ padding: "10px 14px", color: "#64748b" }}>
                          {new Date(l.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "10px 14px", color: "#64748b" }}>
                          {l.report_sent_at ? new Date(l.report_sent_at).toLocaleDateString() : "—"}
                        </td>
                        <td style={{ padding: "10px 14px", color: "#64748b" }}>—</td>
                        <td style={{ padding: "10px 14px" }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => prospectAction("view-report", l.id)} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#334155" }}>View</button>
                            <button onClick={() => prospectAction("send-report", l.id)} style={{ fontSize: 12, padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", color: "#334155" }}>Send</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  PROSPECT TOOL TAB                                            */}
        {/* ============================================================ */}
        {activeTab === "prospect-tool" && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Prospect Tool</h1>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
              Share this link with potential investors. When they fill in their details, they appear as prospects in your dashboard automatically.
            </p>

            {/* Link card */}
            <div style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              marginBottom: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              <label style={labelStyle}>Your unique prospect link</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <code style={{
                  flex: 1,
                  padding: "10px 14px",
                  background: "#f8fafc",
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                  fontSize: 14,
                  color: "#0f172a",
                  wordBreak: "break-all",
                }}>
                  {prospectLink}
                </code>
                <button onClick={() => copyText(prospectLink)} style={btnPrimary}>Copy</button>
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Hi! I'd like to share an exclusive SIF investment analysis with you. Please fill in your details here: ${prospectLink}`
                    );
                    window.open(`https://wa.me/?text=${msg}`, "_blank");
                  }}
                  style={{ ...btnOutline, whiteSpace: "nowrap" }}
                >
                  Share via WhatsApp
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              marginBottom: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginTop: 0, marginBottom: 16 }}>
                How it works
              </h3>
              <ol style={{ margin: 0, paddingLeft: 20, color: "#475569", lineHeight: 2 }}>
                <li>Share your unique link with potential investors via WhatsApp, email, or social media.</li>
                <li>The prospect fills in their investment profile (risk, surplus, current investments).</li>
                <li>They are automatically added to your Prospects list with their SIF match.</li>
                <li>Review their profile and send them a co-branded SIF report with one click.</li>
                <li>Follow up, book a consultation, and convert them into SIF investors.</li>
              </ol>
            </div>

            {/* Prospects from this link */}
            <div style={{
              background: "#fff",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", marginTop: 0, marginBottom: 12 }}>
                Prospects from this link
              </h3>
              {leads.filter((l) => l.source === "widget").length === 0 ? (
                <p style={{ color: "#94a3b8", fontSize: 14, margin: 0 }}>
                  No prospects from your link yet. Start sharing to see them here.
                </p>
              ) : (
                <div>
                  {leads
                    .filter((l) => l.source === "widget")
                    .map((l) => (
                      <div key={l.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                        <div>
                          <span style={{ fontWeight: 600, color: "#0f172a" }}>{l.client_name}</span>
                          <span style={{ color: "#94a3b8", fontSize: 13, marginLeft: 8 }}>{l.client_email}</span>
                        </div>
                        <Badge status={l.status} />
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  BRANDING TAB                                                 */}
        {/* ============================================================ */}
        {activeTab === "branding" && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Branding</h1>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
              Customise your co-branded SIF reports. Changes are reflected in all future reports.
            </p>

            <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flexWrap: "wrap" }}>
              {/* Left: edit form */}
              <div style={{ flex: 1, minWidth: 340 }}>
                {/* Section A: Identity */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16, color: "#0f172a" }}>
                    A — Identity
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Logo</label>
                      <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) uploadAsset(e.target.files[0], "logo_url"); }} />
                      {partner.logo_url && <img src={partner.logo_url} alt="Logo" style={{ height: 40, marginTop: 6, borderRadius: 4 }} />}
                    </div>
                    <div>
                      <label style={labelStyle}>Profile Photo</label>
                      <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) uploadAsset(e.target.files[0], "profile_photo_url"); }} />
                      {partner.profile_photo_url && <img src={partner.profile_photo_url} alt="Photo" style={{ height: 60, marginTop: 6, borderRadius: 8 }} />}
                    </div>
                    <div>
                      <label style={labelStyle}>Signature</label>
                      <input type="file" accept="image/*" onChange={(e) => { if (e.target.files?.[0]) uploadAsset(e.target.files[0], "signature_url"); }} />
                      {partner.signature_url && <img src={partner.signature_url} alt="Signature" style={{ height: 30, marginTop: 6 }} />}
                    </div>
                    <div>
                      <label style={labelStyle}>Tagline</label>
                      <input value={brandForm.tagline} onChange={(e) => setBrandForm((f) => ({ ...f, tagline: e.target.value }))} placeholder="Your professional tagline" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>About</label>
                      <textarea value={brandForm.about_text} onChange={(e) => setBrandForm((f) => ({ ...f, about_text: e.target.value }))} placeholder="Brief description of your practice" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                    <div>
                      <label style={labelStyle}>SEBI Registration Number</label>
                      <input value={brandForm.sebi_reg_number} onChange={(e) => setBrandForm((f) => ({ ...f, sebi_reg_number: e.target.value }))} placeholder="INA000XXXXXX" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Website</label>
                      <input value={brandForm.website} onChange={(e) => setBrandForm((f) => ({ ...f, website: e.target.value }))} placeholder="https://yourfirm.com" style={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* Section B: Brand Colours */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16, color: "#0f172a" }}>
                    B — Brand Colours
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Primary Colour</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="color" value={brandForm.brand_color} onChange={(e) => setBrandForm((f) => ({ ...f, brand_color: e.target.value }))} style={{ width: 44, height: 36, border: "none", cursor: "pointer" }} />
                        <input value={brandForm.brand_color} onChange={(e) => setBrandForm((f) => ({ ...f, brand_color: e.target.value }))} style={{ ...inputStyle, maxWidth: 120 }} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Secondary Colour</label>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="color" value={brandForm.secondary_color} onChange={(e) => setBrandForm((f) => ({ ...f, secondary_color: e.target.value }))} style={{ width: 44, height: 36, border: "none", cursor: "pointer" }} />
                        <input value={brandForm.secondary_color} onChange={(e) => setBrandForm((f) => ({ ...f, secondary_color: e.target.value }))} style={{ ...inputStyle, maxWidth: 120 }} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Header Style</label>
                      <div style={{ display: "flex", gap: 10 }}>
                        {(["professional", "clean", "bold"] as const).map((s) => (
                          <button
                            key={s}
                            onClick={() => setBrandForm((f) => ({ ...f, report_header_style: s }))}
                            style={{
                              padding: "8px 18px",
                              borderRadius: 8,
                              border: brandForm.report_header_style === s ? "2px solid #2563eb" : "1px solid #e2e8f0",
                              background: brandForm.report_header_style === s ? "#eff6ff" : "#fff",
                              color: brandForm.report_header_style === s ? "#2563eb" : "#64748b",
                              fontWeight: 600,
                              fontSize: 13,
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section C: Contact & CTA */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 16, color: "#0f172a" }}>
                    C — Contact &amp; CTA
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                      <label style={labelStyle}>Address</label>
                      <textarea value={brandForm.address} onChange={(e) => setBrandForm((f) => ({ ...f, address: e.target.value }))} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                    <div>
                      <label style={labelStyle}>WhatsApp Number</label>
                      <input value={brandForm.whatsapp_number} onChange={(e) => setBrandForm((f) => ({ ...f, whatsapp_number: e.target.value }))} placeholder="+91XXXXXXXXXX" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>LinkedIn URL</label>
                      <input value={brandForm.linkedin_url} onChange={(e) => setBrandForm((f) => ({ ...f, linkedin_url: e.target.value }))} placeholder="https://linkedin.com/in/yourname" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>CTA Button Text</label>
                      <input value={brandForm.cta_text} onChange={(e) => setBrandForm((f) => ({ ...f, cta_text: e.target.value }))} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>CTA URL</label>
                      <input value={brandForm.cta_url} onChange={(e) => setBrandForm((f) => ({ ...f, cta_url: e.target.value }))} placeholder="https://calendly.com/yourname" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Custom Disclaimer</label>
                      <textarea value={brandForm.custom_disclaimer} onChange={(e) => setBrandForm((f) => ({ ...f, custom_disclaimer: e.target.value }))} rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="Optional legal disclaimer text" />
                    </div>
                  </div>
                </div>

                {/* Completeness checklist */}
                <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 12, color: "#0f172a" }}>
                    Completeness Checklist
                  </h3>
                  <ProgressBar pct={stats.branding_completeness_pct} />
                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      { label: "Firm name", done: !!partner.firm_name, pts: 15 },
                      { label: "Logo uploaded", done: !!partner.logo_url, pts: 20 },
                      { label: "Profile photo", done: !!partner.profile_photo_url, pts: 15 },
                      { label: "Custom brand colour", done: !!partner.brand_color && partner.brand_color !== "#1B4B8A", pts: 10 },
                      { label: "Tagline", done: !!partner.tagline, pts: 10 },
                      { label: "Phone & email", done: !!(partner.phone && partner.email), pts: 15 },
                      { label: "Custom CTA", done: !!partner.cta_text && partner.cta_text !== "Schedule a SIF Consultation", pts: 10 },
                      { label: "Signature", done: !!partner.signature_url, pts: 5 },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                        <span style={{ color: item.done ? "#16a34a" : "#cbd5e1" }}>{item.done ? "✓" : "○"}</span>
                        <span style={{ color: item.done ? "#0f172a" : "#94a3b8" }}>{item.label}</span>
                        <span style={{ color: "#94a3b8", fontSize: 11, marginLeft: "auto" }}>+{item.pts}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={handleBrandingSave} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.6 : 1, width: "100%" }}>
                  {saving ? "Saving..." : "Save Branding"}
                </button>
              </div>

              {/* Right: Live preview */}
              <div style={{ width: 340, flexShrink: 0, position: "sticky", top: 32 }}>
                <div style={{
                  background: "#fff",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", padding: "10px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textTransform: "uppercase", letterSpacing: 0.5 }}>
                    D — Live Preview
                  </div>
                  {/* Header preview */}
                  <div style={{
                    background: brandForm.brand_color,
                    padding: "20px 16px",
                    color: "#fff",
                    ...(brandForm.report_header_style === "bold" ? { padding: "28px 16px" } : {}),
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {partner.logo_url ? (
                        <img src={partner.logo_url} alt="Logo" style={{ height: 36, borderRadius: 4 }} />
                      ) : partner.profile_photo_url ? (
                        <img src={partner.profile_photo_url} alt="Photo" style={{ height: 44, width: 44, borderRadius: "50%", objectFit: "cover" }} />
                      ) : (
                        <div style={{
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 16,
                        }}>
                          {initials(firmName)}
                        </div>
                      )}
                      <div>
                        <div style={{
                          fontWeight: brandForm.report_header_style === "bold" ? 800 : 700,
                          fontSize: brandForm.report_header_style === "bold" ? 18 : 16,
                        }}>
                          {firmName}
                        </div>
                        {brandForm.tagline && (
                          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>
                            {brandForm.tagline}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Contact preview */}
                  <div style={{ padding: "14px 16px", fontSize: 12, color: "#64748b" }}>
                    {partner.email && <div>{partner.email}</div>}
                    {partner.phone && <div>{partner.phone}</div>}
                    {brandForm.whatsapp_number && <div>WhatsApp: {brandForm.whatsapp_number}</div>}
                    {brandForm.address && <div style={{ marginTop: 4 }}>{brandForm.address}</div>}
                  </div>
                  {/* CTA preview */}
                  <div style={{ padding: "0 16px 16px" }}>
                    <button style={{
                      ...btnPrimary,
                      width: "100%",
                      background: brandForm.brand_color,
                      fontSize: 13,
                    }}>
                      {brandForm.cta_text || "Schedule a SIF Consultation"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  EMBED WIDGET TAB                                             */}
        {/* ============================================================ */}
        {activeTab === "embed" && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>Embed Widget</h1>
            <p style={{ color: "#64748b", fontSize: 14, marginBottom: 24 }}>
              Add a SIF investment widget to your website. Prospects who fill it in are automatically added to your dashboard.
            </p>

            <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <label style={labelStyle}>Embed Code</label>
              <textarea
                readOnly
                rows={4}
                value={`<iframe src="${prospectLink}" width="100%" height="700" frameborder="0" style="border-radius:12px;max-width:600px;"></iframe>`}
                style={{ ...inputStyle, fontFamily: "monospace", fontSize: 13, background: "#f8fafc" }}
              />
              <button
                onClick={() => copyText(`<iframe src="${prospectLink}" width="100%" height="700" frameborder="0" style="border-radius:12px;max-width:600px;"></iframe>`)}
                style={{ ...btnPrimary, marginTop: 12 }}
              >
                Copy Embed Code
              </button>
            </div>

            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginTop: 0, marginBottom: 12, color: "#0f172a" }}>
                Instructions
              </h3>
              <ol style={{ margin: 0, paddingLeft: 20, color: "#475569", lineHeight: 2, fontSize: 14 }}>
                <li>Copy the embed code above.</li>
                <li>Paste it into your website HTML where you want the widget to appear.</li>
                <li>The widget adapts to its container width (recommended max-width: 600px).</li>
                <li>Prospects who submit the form will appear in your Prospects tab.</li>
              </ol>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/*  SETTINGS TAB                                                 */}
        {/* ============================================================ */}
        {activeTab === "settings" && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>Settings</h1>

            <div style={{ background: "#fff", borderRadius: 12, padding: 24, maxWidth: 520, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input value={settingsForm.email} onChange={(e) => setSettingsForm((f) => ({ ...f, email: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input value={settingsForm.phone} onChange={(e) => setSettingsForm((f) => ({ ...f, phone: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>New Password</label>
                  <input type="password" value={settingsForm.password} onChange={(e) => setSettingsForm((f) => ({ ...f, password: e.target.value }))} placeholder="Leave blank to keep current" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Distributor Status</label>
                  <select
                    value={settingsForm.distributor_status}
                    onChange={(e) => setSettingsForm((f) => ({ ...f, distributor_status: e.target.value }))}
                    style={inputStyle}
                  >
                    <option value="empanelled">Empanelled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="need_help">Need Help</option>
                    <option value="exploring">Exploring</option>
                  </select>
                </div>
                <button onClick={handleSettingsSave} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }}>
                  {saving ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================ */}
      {/*  MODALS                                                       */}
      {/* ============================================================ */}

      {/* Add Prospect Modal */}
      <Modal open={addProspectOpen} onClose={() => setAddProspectOpen(false)} title="Add Prospect">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input value={pName} onChange={(e) => setPName(e.target.value)} placeholder="Full name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input value={pEmail} onChange={(e) => setPEmail(e.target.value)} placeholder="email@example.com" type="email" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input value={pPhone} onChange={(e) => setPPhone(e.target.value)} placeholder="+91XXXXXXXXXX" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Investable Surplus</label>
            <select value={pSurplus} onChange={(e) => setPSurplus(e.target.value)} style={inputStyle}>
              <option value="">Select...</option>
              {SURPLUS_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Current Investments</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {INVESTMENT_OPTIONS.map((o) => (
                <label key={o} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#334155", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={pInvestments.includes(o)}
                    onChange={(e) => {
                      if (e.target.checked) setPInvestments((p) => [...p, o]);
                      else setPInvestments((p) => p.filter((x) => x !== o));
                    }}
                  />
                  {o}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Risk Profile</label>
            <select value={pRisk} onChange={(e) => setPRisk(e.target.value)} style={inputStyle}>
              <option value="">Select...</option>
              {RISK_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>SIF Familiarity</label>
            <select value={pFamiliarity} onChange={(e) => setPFamiliarity(e.target.value)} style={inputStyle}>
              <option value="">Select...</option>
              {SIF_FAMILIARITY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <button onClick={handleAddProspect} disabled={saving || !pName || !pEmail} style={{ ...btnPrimary, opacity: saving || !pName || !pEmail ? 0.6 : 1, marginTop: 8 }}>
            {saving ? "Saving..." : "Save Prospect"}
          </button>
        </div>
      </Modal>

      {/* CSV Upload Modal */}
      <Modal open={csvUploadOpen} onClose={() => setCsvUploadOpen(false)} title="Upload CSV">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <p style={{ fontSize: 14, color: "#475569", marginTop: 0 }}>
              Upload a CSV file with prospect data. The file should have columns: Name, Email, Phone, Investable Surplus, Risk Profile.
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                const csv = "Name,Email,Phone,Investable Surplus,Risk Profile\nJohn Doe,john@example.com,+919876543210,₹25–50L,Moderate";
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "sifprime-prospect-template.csv";
                a.click();
                URL.revokeObjectURL(url);
              }}
              style={{ color: "#2563eb", fontWeight: 600, fontSize: 14 }}
            >
              Download template CSV
            </a>
          </div>
          <div>
            <input
              ref={csvRef}
              type="file"
              accept=".csv"
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
            />
          </div>
          {csvFile && (
            <div style={{ padding: 12, background: "#f8fafc", borderRadius: 8, fontSize: 13, color: "#475569" }}>
              Selected: <strong>{csvFile.name}</strong> ({(csvFile.size / 1024).toFixed(1)} KB)
            </div>
          )}
          <button onClick={handleCsvUpload} disabled={!csvFile} style={{ ...btnPrimary, opacity: csvFile ? 1 : 0.6 }}>
            Upload &amp; Import
          </button>
        </div>
      </Modal>

      {/* AUM Update Modal */}
      <Modal open={aumModalOpen} onClose={() => setAumModalOpen(false)} title="Update AUM in Pipeline" width={380}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={labelStyle}>AUM in Pipeline (in Cr)</label>
            <input
              type="number"
              value={aumInput}
              onChange={(e) => setAumInput(e.target.value)}
              placeholder="e.g. 5.5"
              style={inputStyle}
            />
          </div>
          <button onClick={handleAumUpdate} style={btnPrimary}>Save</button>
        </div>
      </Modal>

      {/* ---- Responsive styles ---- */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger-btn { display: block !important; }
          .sidebar { transform: translateX(-100%); }
          .sidebar-open { transform: translateX(0) !important; }
          .main-content { margin-left: 0 !important; padding: 20px 16px !important; }
        }
      `}</style>
    </div>
  );
}
