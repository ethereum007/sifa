"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, TrendingUp } from "lucide-react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fundsItems = [
    { label: "All Funds", href: "/sif-funds-launched", section: true },
    { label: "NAV Tracker", href: "/sifnav" },
    { label: "NFO Centre", href: "/upcoming-sifs" },
    { label: "Equity Long Short", href: "/sif-funds-launched", section: true },
    { label: "qSIF by Quant", href: "/qsif-equity-long-short" },
    { label: "Diviniti SIF by ITI", href: "/diviniti-equity-long-short" },
    { label: "Dyna SIF by 360 ONE", href: "/sifs/dyna-equity-long-short" },
    { label: "Arudha Equity L/S by Bandhan", href: "/arudha-equity-long-short" },
    { label: "Sapphire by Franklin Templeton", href: "/sifs/sapphire-equity-long-short" },
    { label: "Ex-Top 100 Long Short", href: "/sif-funds-launched", section: true },
    { label: "qSIF Ex-Top 100 by Quant", href: "/qsif-ex-top-100-long-short" },
    { label: "iSIF Ex-Top 100 by ICICI", href: "/sifs/isif/extop100" },
    { label: "Hybrid Long Short", href: "/sif-funds-launched", section: true },
    { label: "qSIF Hybrid by Quant", href: "/sifs/qsif-hybrid-long-short" },
    { label: "iSIF Hybrid by ICICI", href: "/sifs/isif/hybrid" },
    { label: "Magnum SIF by SBI", href: "/sifs/magnum-hybrid-long-short" },
    { label: "Titanium SIF by Tata", href: "/sifs/titanium-hybrid-long-short" },
    { label: "Altiva SIF by Edelweiss", href: "/sifs/altiva-hybrid-long-short" },
    { label: "Arudha SIF by Bandhan", href: "/sifs/arudha-hybrid-long-short" },
    { label: "Apex SIF by ABSL", href: "/apex-hybrid-long-short" },
    { label: "Active Asset Allocator", href: "/sif-funds-launched", section: true },
    { label: "Dyna AAA by 360 ONE", href: "/dyna-active-asset-allocator" },
    { label: "qSIF by Quant", href: "/sifs/qsif-active-asset-allocator-long-short" },
  ];

  const learnItems = [
    { label: "Guides", href: "/specialized-investment-fund-sif", section: true },
    { label: "What is SIF?", href: "/specialized-investment-fund-sif" },
    { label: "What is a SIF?", href: "/what-is-sif" },
    { label: "All 14 SIFs Ranked & Explained", href: "/all-sifs-india-ranked-explained" },
    { label: "Which SIF Should You Invest In?", href: "/which-sif-should-you-invest-in" },
    { label: "Best SIF to Invest in 2026", href: "/blog/best-sif-to-invest-2026" },
    { label: "Compare SIFs Side by Side", href: "/compare-sifs" },
    { label: "Best Hybrid SIF Comparison", href: "/best-hybrid-sif" },
    { label: "Ex-Top 100 SIF Explained", href: "/ex-top-100-sif-explained" },
    { label: "Comparisons", href: "/sif-vs-pms-vs-aif", section: true },
    { label: "SIF vs PMS vs AIF", href: "/sif-vs-pms-vs-aif" },
    { label: "SIF vs Mutual Fund", href: "/sifvsmutualfund" },
    { label: "SIF vs AIF vs PMS vs MF", href: "/sif-vs-mf" },
    { label: "SIF vs PMS: Detailed", href: "/blog/sif-vs-pms-detailed-comparison" },
    { label: "Rules & Tax", href: "/sif-tax-guide", section: true },
    { label: "Tax Guide: LTCG & STCG", href: "/sif-tax-guide" },
    { label: "Redemption Rules", href: "/sif-redemption-rules" },
    { label: "Liquidity Guide", href: "/sif-liquidity-guide" },
    { label: "Derivatives Explained", href: "/sif-derivatives-explained" },
    { label: "SWP & SIP Guide", href: "/sif-sip-swp-guide" },
    { label: "SIP Minimum Amount", href: "/blog/sif-sip-minimum-amount" },
    { label: "More", href: "/blog", section: true },
    { label: "NRI Guide to SIF", href: "/nri-sif-guide" },
    { label: "NRI Complete Guide", href: "/blog/sif-for-nri-complete-guide" },
    { label: "SIF for MFDs & Distributors", href: "/sif-for-mfd" },
    { label: "All Blogs", href: "/blog" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  type DropdownItem = { label: string; href: string; section?: boolean };

  const DropdownMenu = ({ name, label, items }: { name: string; label: string; items: DropdownItem[] }) => {
    const isOpen = openDropdown === name;
    return (
      <div
        className="relative"
        onMouseEnter={() => setOpenDropdown(name)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <button
          onClick={() => toggleDropdown(name)}
          className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium py-2"
        >
          {label}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 pt-2 w-64" style={{ zIndex: 9999 }}>
            <div className="rounded-lg border border-border bg-white shadow-lg py-1.5 max-h-[70vh] overflow-y-auto" style={{ backgroundColor: 'white' }}>
              {items.map((item, index) =>
                item.section ? (
                  <div key={`${item.label}-${index}`} className="px-4 pt-3 pb-1 text-[11px] font-semibold text-foreground/40 uppercase tracking-wider first:pt-1.5">
                    {item.label}
                  </div>
                ) : (
                  <a
                    key={`${item.href}-${index}`}
                    href={item.href}
                    className="block px-4 py-2 text-[14px] text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed top-10 left-0 right-0 z-50 bg-white border-b border-border/60" style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_20px_hsl(152_76%_36%/0.3)] group-hover:shadow-[0_6px_30px_hsl(152_76%_36%/0.4)] transition-all duration-300">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-[22px] font-bold text-foreground">
              SIF<span className="text-primary">Prime</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-8" style={{ overflow: 'visible', fontSize: '16px' }}>
            <DropdownMenu name="funds" label="Funds" items={fundsItems} />

            <a href="/sifreturns" className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium">
              Performance
            </a>

            <a href="/sif-compare" className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium">
              Compare
            </a>

            <DropdownMenu name="learn" label="Learn" items={learnItems} />

            <a href="/partner" className="text-foreground/70 hover:text-foreground transition-colors duration-200 font-medium">
              For Partners
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-border text-foreground/70 hover:text-foreground hover:border-foreground/30">
                Book a Call
              </Button>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                Start Investing
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => toggleDropdown("funds-mobile")}
                className="flex items-center justify-between text-foreground/70 hover:text-foreground transition-colors py-2.5 font-medium"
              >
                Funds
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "funds-mobile" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "funds-mobile" && (
                <div className="flex flex-col pl-4 border-l-2 border-primary/20 ml-2 mb-1">
                  {fundsItems.map((item, index) =>
                    item.section ? (
                      <div key={`${item.label}-${index}`} className="pt-3 pb-1 text-[11px] font-semibold text-foreground/40 uppercase tracking-wider first:pt-0">
                        {item.label}
                      </div>
                    ) : (
                      <a key={`${item.href}-${index}`} href={item.href} className="py-2 text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {item.label}
                      </a>
                    )
                  )}
                </div>
              )}

              <a href="/sifreturns" className="text-foreground/70 hover:text-foreground transition-colors py-2.5 font-medium" onClick={() => setIsMenuOpen(false)}>
                Performance
              </a>
              <a href="/sif-compare" className="text-foreground/70 hover:text-foreground transition-colors py-2.5 font-medium" onClick={() => setIsMenuOpen(false)}>
                Compare
              </a>

              <button
                onClick={() => toggleDropdown("learn-mobile")}
                className="flex items-center justify-between text-foreground/70 hover:text-foreground transition-colors py-2.5 font-medium"
              >
                Learn
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "learn-mobile" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "learn-mobile" && (
                <div className="flex flex-col pl-4 border-l-2 border-primary/20 ml-2 mb-1">
                  {learnItems.map((item, index) =>
                    item.section ? (
                      <div key={`${item.label}-${index}`} className="pt-3 pb-1 text-[11px] font-semibold text-foreground/40 uppercase tracking-wider first:pt-0">
                        {item.label}
                      </div>
                    ) : (
                      <a key={`${item.href}-${index}`} href={item.href} className="py-2 text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                        {item.label}
                      </a>
                    )
                  )}
                </div>
              )}

              <a href="/partner" className="text-foreground/70 hover:text-foreground transition-colors py-2.5 font-medium" onClick={() => setIsMenuOpen(false)}>
                For Partners
              </a>

              <div className="pt-4 mt-2 border-t border-border/50 flex flex-col gap-3">
                <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-border text-foreground/70">Book a Call</Button>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">Start Investing</Button>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
