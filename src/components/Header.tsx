"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, TrendingUp, ChevronDown, Handshake } from "lucide-react";
import { WHATSAPP_URL, CONSULTATION_URL, DISTRIBUTOR_WHATSAPP_GROUP } from "@/lib/whatsapp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const exploreItems = [
    { label: "SIF Funds Launched", href: "/sif-funds-launched", isHeader: true },
    { 
      label: "Equity Long Short Funds", 
      href: "/sif-funds-launched",
      isToggle: true, 
      children: [
        { label: "qSIF by Quant", href: "/qsif-equity-long-short" },
        { label: "Diviniti SIF by ITI", href: "/diviniti-equity-long-short" },
        { label: "Dyna SIF by 360 ONE", href: "/dyna-equity-long-short" },
        { label: "Arudha Equity L/S by Bandhan", href: "/arudha-equity-long-short" },
      ]
    },
    { 
      label: "Equity Ex-Top 100 Long Short", 
      href: "/sif-funds-launched",
      isToggle: true, 
      children: [
        { label: "qSIF Ex-Top 100 by Quant", href: "/qsif-ex-top-100-long-short" },
        { label: "iSIF Ex-Top 100 by ICICI", href: "/sifs/isif/extop100" },
      ]
    },
    { 
      label: "Hybrid Long Short Funds", 
      href: "/sif-funds-launched",
      isToggle: true, 
      children: [
        { label: "qSIF Hybrid by Quant", href: "/sifs/qsif-hybrid-long-short" },
        { label: "iSIF Hybrid by ICICI", href: "/sifs/isif/hybrid" },
        { label: "Magnum SIF by SBI", href: "/sifs/magnum-hybrid-long-short" },
        { label: "Titanium SIF by Tata", href: "/sifs/titanium-hybrid-long-short" },
        { label: "Altiva SIF by Edelweiss", href: "/sifs/altiva-hybrid-long-short" },
        { label: "Arudha SIF by Bandhan", href: "/sifs/arudha-hybrid-long-short" },
        { label: "Apex SIF by ABSL", href: "/apex-hybrid-long-short" },
      ]
    },
    { 
      label: "Active Asset Allocator", 
      href: "/sif-funds-launched",
      isToggle: true, 
      children: [
        { label: "Dyna SIF by 360 ONE", href: "/dyna-active-asset-allocator" },
      ]
    },
    { label: "Upcoming SIFs", href: "/upcoming-sifs" },
    { label: "SIF Strategies", href: "/sif-strategies" },
    { label: "SIF Compare", href: "/sif-compare" },
  ];

  const investItems = [
    { label: "Schedule a Consultation", href: CONSULTATION_URL, external: true },
    { label: "Minimum Investment", href: "/sif-minimum-investment" },
  ];

  const distributorItems = [
    { label: "Join Distributor Network", href: DISTRIBUTOR_WHATSAPP_GROUP, external: true, highlight: true },
    { label: "Set Up a Consultation Call", href: "/become-distributor" },
    { label: "MFDs Can Make $1B/Year from SIFs", href: "/distributors/sif-billion-dollar-opportunity" },
  ];

  const insightsItems = [
    { label: "SIF NAVs", href: "/sifnav" },
    { label: "SIF Performance", href: "/sifperformance", isHeader: true },
    { label: "March 2026", href: "/performance/march-2026", isToggle: true, children: [
      { label: "Hybrid Long Short", href: "/performance/march-2026" },
      { label: "Equity Long Short", href: "/performance/march-2026/equity-long-short" },
      { label: "Equity Ex-Top 100", href: "/performance/march-2026/equity-ex-top-100" },
    ]},
    { label: "February 2026", href: "/performance/february-2026", isToggle: true, children: [
      { label: "Equity Long Short", href: "/performance/february-2026/equity-long-short" },
      { label: "Hybrid Long Short", href: "/performance/february-2026/hybrid-long-short" },
      { label: "Equity Ex-Top 100", href: "/performance/february-2026/equity-ex-top-100" },
    ]},
    { label: "January 2026", href: "/performance/hybrid-long-short", isToggle: true, children: [
      { label: "Hybrid Long Short", href: "/performance/hybrid-long-short" },
      { label: "Equity Long Short", href: "/performance/equity-long-short" },
    ]},
  ];

  const resourcesItems = [
    { label: "All 14 SIFs Ranked & Explained", href: "/all-sifs-india-ranked-explained" },
    { label: "Which SIF Should You Invest In?", href: "/which-sif-should-you-invest-in" },
    { label: "SIF vs PMS vs AIF", href: "/sif-vs-pms-vs-aif" },
    { label: "SIF Tax Guide: LTCG & STCG", href: "/sif-tax-guide" },
    { label: "SIF Redemption Rules", href: "/sif-redemption-rules" },
    { label: "Ex-Top 100 SIF Explained", href: "/ex-top-100-sif-explained" },
    { label: "Best Hybrid SIF Comparison", href: "/best-hybrid-sif" },
    { label: "NRI Guide to SIF", href: "/nri-sif-guide" },
    { label: "SIF Derivatives Explained", href: "/sif-derivatives-explained" },
    { label: "SIF vs Mutual Fund", href: "/sifvsmutualfund" },
    { label: "SIF Liquidity Guide", href: "/sif-liquidity-guide" },
    { label: "Is SWP Available in SIF?", href: "/sif-sip-swp-guide" },
  ];

  // Close dropdown when clicking outside
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

  const toggleSection = (label: string) => {
    setExpandedSections(prev => 
      prev.includes(label) 
        ? prev.filter(s => s !== label)
        : [...prev, label]
    );
  };

  type DropdownChild = {
    label: string;
    href: string;
  };

  type DropdownItem = {
    label: string;
    href?: string;
    external?: boolean;
    highlight?: boolean;
    isHeader?: boolean;
    isSubHeader?: boolean;
    indent?: boolean;
    isToggle?: boolean;
    children?: DropdownChild[];
  };

  const DropdownMenu = ({ 
    name, 
    label, 
    items,
    href
  }: { 
    name: string; 
    label: string; 
    items: DropdownItem[];
    href?: string;
  }) => {
    const isOpen = openDropdown === name;
    
    return (
      <div 
        className="relative group"
        onMouseEnter={() => setOpenDropdown(name)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        {href ? (
          <a
            href={href}
            className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors duration-200 text-sm font-medium py-2"
          >
            {label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </a>
        ) : (
          <button
            onClick={() => toggleDropdown(name)}
            className="flex items-center gap-1 text-foreground/80 hover:text-primary transition-colors duration-200 text-sm font-medium py-2"
          >
            {label}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
          </button>
        )}
        {isOpen && (
          <div 
            className="absolute top-full left-0 pt-1 w-56"
            style={{ zIndex: 9999 }}
          >
            <div className="rounded-lg border border-border bg-white shadow-2xl py-2" style={{ backgroundColor: 'white' }}>
              {items.map((item, index) => {
                if (item.isHeader) {
                  return item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-xs font-semibold text-heading uppercase tracking-wide hover:bg-gray-100 hover:text-primary transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <div key={index} className="px-4 py-2 text-xs font-semibold text-heading uppercase tracking-wide">
                      {item.label}
                    </div>
                  );
                }
                if (item.isSubHeader) {
                  return item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-1.5 text-xs font-medium text-primary border-b border-border/50 mb-1 hover:underline"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label} →
                    </a>
                  ) : (
                    <div key={index} className="px-4 py-1.5 text-xs font-medium text-muted-foreground border-b border-border/50 mb-1">
                      {item.label}
                    </div>
                  );
                }
                if (item.isToggle && item.children) {
                  const isExpanded = expandedSections.includes(item.label);
                  return (
                    <div key={index}>
                      <div className="flex items-center">
                        <a
                          href={item.href}
                          className="flex-1 py-2 px-4 text-sm font-semibold text-heading hover:bg-gray-100 hover:text-primary transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.label}
                        </a>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection(item.label);
                          }}
                          className="p-2 mr-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="bg-gray-50">
                          {item.children.map((child) => (
                            <a
                              key={child.href}
                              href={child.href}
                              className="block py-1.5 pl-6 pr-4 text-xs text-foreground/70 hover:bg-gray-100 hover:text-primary transition-colors"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <a
                    key={item.href || index}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className={`block py-2 text-sm transition-colors ${
                      item.indent ? "pl-6 pr-4" : "px-4"
                    } ${
                      item.highlight
                        ? "text-primary font-medium hover:bg-gray-100"
                        : "text-foreground/80 hover:bg-gray-100 hover:text-primary"
                    }`}
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed top-10 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-border/50 shadow-sm" style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_20px_hsl(152_76%_36%/0.3)] group-hover:shadow-[0_6px_30px_hsl(152_76%_36%/0.4)] transition-all duration-300">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              SIF<span className="text-primary">Prime</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-6" style={{ overflow: 'visible' }}>
            {/* SIF Explained */}
            <a
              href="/specialized-investment-fund-sif"
              className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              SIF Explained
            </a>

            {/* SIF Returns */}
            <a
              href="/sifreturns"
              className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              SIF Returns
            </a>

            {/* SIF Funds Dropdown */}
            <DropdownMenu name="explore" label="SIF Funds List" items={exploreItems} href="/sif-funds" />

            {/* SIF Fund Insights Dropdown */}
            <DropdownMenu name="insights" label="SIF NAV & Performance" items={insightsItems} href="/sif-fund-insights" />

            {/* Invest Dropdown */}
            <DropdownMenu name="invest" label="Invest" items={investItems} />

            {/* Resources Dropdown */}
            <DropdownMenu name="resources" label="Blog" items={resourcesItems} />

            {/* Contact */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-primary transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </a>

            {/* Distributors Dropdown */}
            <DropdownMenu name="distributors" label="Distributors" items={distributorItems} />
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="sm">
                Start Investing
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border/50 animate-fade-in max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <nav className="flex flex-col gap-2">
              {/* SIF Explained */}
              <a
                href="/specialized-investment-fund-sif"
                className="text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                SIF Explained
              </a>

              {/* SIF Returns */}
              <a
                href="/sifreturns"
                className="text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                SIF Returns
              </a>

              {/* SIF Funds - Mobile Collapsible */}
              <button
                onClick={() => toggleDropdown("explore-mobile")}
                className="flex items-center justify-between text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
              >
                SIF Funds List
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "explore-mobile" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "explore-mobile" && (
                <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 ml-2">
                  {exploreItems.map((item, index) => {
                    if (item.isHeader) {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className="py-2 text-foreground font-medium hover:text-primary transition-colors duration-200"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </a>
                      );
                    }
                    if (item.isToggle && item.children) {
                      const isExpanded = expandedSections.includes(item.label);
                      return (
                        <div key={index}>
                          <button
                            onClick={() => toggleSection(item.label)}
                            className="flex items-center justify-between w-full py-2 text-foreground font-semibold hover:text-primary transition-colors duration-200"
                          >
                            {item.label}
                            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                          {isExpanded && (
                            <div className="flex flex-col gap-1 pl-3 border-l border-primary/10 ml-1">
                              {item.children.map((child) => (
                                <a
                                  key={child.href}
                                  href={child.href}
                                  className="py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {child.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className="py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* SIF Fund Insights - Mobile Collapsible */}
              <button
                onClick={() => toggleDropdown("insights-mobile")}
                className="flex items-center justify-between text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
              >
                SIF NAV & Performance
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "insights-mobile" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "insights-mobile" && (
                <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 ml-2">
                  {insightsItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Invest - Mobile Collapsible */}
              <button
                onClick={() => toggleDropdown("invest-mobile")}
                className="flex items-center justify-between text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
              >
                Invest
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "invest-mobile" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "invest-mobile" && (
                <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 ml-2">
                  {investItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Resources - Mobile Collapsible */}
              <button
                onClick={() => toggleDropdown("resources-mobile")}
                className="flex items-center justify-between text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
              >
                Blog
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "resources-mobile" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "resources-mobile" && (
                <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 ml-2">
                  {resourcesItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Distributors - Mobile Collapsible */}
              <button
                onClick={() => toggleDropdown("distributors-mobile")}
                className="flex items-center justify-between text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
              >
                Distributors
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === "distributors-mobile" ? "rotate-180" : ""}`} />
              </button>
              {openDropdown === "distributors-mobile" && (
                <div className="flex flex-col gap-1 pl-4 border-l-2 border-primary/20 ml-2">
                  {distributorItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`py-2 transition-colors duration-200 ${
                        item.highlight ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition-colors duration-200 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>

              <div className="pt-4 border-t border-border/50">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="gold" className="w-full">
                    Start Investing
                  </Button>
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
