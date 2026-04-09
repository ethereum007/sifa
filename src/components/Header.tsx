"use client";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Moon, Sun, Search } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const NAV_LINKS = [
  {
    label: "Funds",
    href: "/sif-funds-launched",
    children: [
      { label: "All SIF Funds", href: "/sif-funds-launched" },
      { label: "Hybrid Long-Short", href: "/sif-funds-launched" },
      { label: "Equity Long-Short", href: "/sif-funds-launched" },
      { label: "Ex-Top 100", href: "/sif-funds-launched" },
      { label: "Compare Funds", href: "/sif-compare" },
      { label: "Upcoming SIFs", href: "/upcoming-sifs" },
    ],
  },
  {
    label: "Compare",
    href: "/sif-compare",
  },
  {
    label: "Performance",
    href: "/sifreturns",
    children: [
      { label: "SIF Returns", href: "/sifreturns" },
      { label: "NAV Tracker", href: "/sifnav" },
      { label: "March 2026", href: "/performance/march-2026" },
      { label: "February 2026", href: "/performance/february-2026" },
    ],
  },
  {
    label: "Learn",
    href: "/specialized-investment-fund-sif",
    children: [
      { label: "What is SIF?", href: "/specialized-investment-fund-sif" },
      { label: "SIF vs MF vs PMS", href: "/sif-vs-pms-vs-aif" },
      { label: "SIF Tax Guide", href: "/sif-tax-guide" },
      { label: "SIF Liquidity Guide", href: "/sif-liquidity-guide" },
      { label: "All SIFs Ranked", href: "/all-sifs-india-ranked-explained" },
      { label: "Blog", href: "/sifvsmutualfund" },
    ],
  },
  {
    label: "For Partners",
    href: "/partner",
    children: [
      { label: "Partner Overview", href: "/partner" },
      { label: "Become a Distributor", href: "/become-distributor" },
      { label: "$1B Opportunity", href: "/distributors/sif-billion-dollar-opportunity" },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between" style={{ height: "var(--nav-height)" }}>
          {/* Logo */}
          <a href="/" className="flex items-center gap-0.5 shrink-0">
            <div className="flex flex-col">
              <span className="text-[16px] leading-tight tracking-tight">
                <span className="font-medium text-[var(--text-primary)]">SIF</span>
                <span className="font-medium" style={{ color: "var(--brand)" }}>PRIME</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.07em] text-[var(--text-tertiary)] leading-none">
                Research
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav ref={dropdownRef} className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-0.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-3"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3 h-3" />}
                </a>

                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-0.5" style={{ zIndex: 9999 }}>
                    <div className="bg-white rounded-md py-1 min-w-[180px]" style={{ border: "0.5px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)] transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] text-[var(--text-tertiary)] bg-[var(--surface-hover)]">
              <Search className="w-3 h-3" />
              Search
              <span className="text-[10px] opacity-60">⌘K</span>
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium px-3 py-1 rounded-md transition-colors"
              style={{
                color: "var(--brand)",
                border: "0.5px solid var(--brand-border)",
                background: "transparent",
              }}
            >
              Invest in SIFs
            </a>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1 text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile: logo CTA + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] font-medium px-2 py-0.5 rounded"
              style={{ color: "var(--brand)", border: "0.5px solid var(--brand-border)" }}
            >
              Invest
            </a>
            <button
              className="p-1.5 text-[var(--text-primary)]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 animate-fade-in max-h-[calc(100dvh-var(--nav-height))] overflow-y-auto" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
            <nav className="flex flex-col gap-0.5">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <div className="flex items-center justify-between">
                    <a
                      href={link.href}
                      className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 flex-1"
                      onClick={() => { if (!link.children) setIsMenuOpen(false); }}
                    >
                      {link.label}
                    </a>
                    {link.children && (
                      <button
                        onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                        className="p-2"
                      >
                        <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-tertiary)] transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
                  {link.children && openDropdown === link.label && (
                    <div className="flex flex-col gap-0.5 pl-3 mb-1" style={{ borderLeft: "1.5px solid rgba(0,0,0,0.06)" }}>
                      {link.children.map((child) => (
                        <a
                          key={child.href}
                          href={child.href}
                          className="text-[12px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] py-1.5"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
