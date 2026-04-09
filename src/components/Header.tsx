"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fundsItems = [
    { label: "All Funds", href: "/sif-funds-launched" },
    { label: "NAV Tracker", href: "/sifnav" },
    { label: "NFO Centre", href: "/upcoming-sifs" },
  ];

  const learnItems = [
    { label: "What is SIF", href: "/specialized-investment-fund-sif" },
    { label: "SIF vs MF / PMS / AIF", href: "/sif-vs-pms-vs-aif" },
    { label: "Tax Guide", href: "/sif-tax-guide" },
    { label: "Liquidity Guide", href: "/sif-liquidity-guide" },
    { label: "Blog", href: "/blog" },
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

  type DropdownItem = { label: string; href: string };

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
          <div className="absolute top-full left-0 pt-2 w-52" style={{ zIndex: 9999 }}>
            <div className="rounded-lg border border-border bg-white shadow-lg py-1.5" style={{ backgroundColor: 'white' }}>
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-2.5 text-[14px] text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                  onClick={() => setOpenDropdown(null)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="fixed top-8 left-0 right-0 z-50 bg-white border-b border-border/60" style={{ overflow: 'visible' }}>
      <div className="container mx-auto px-4" style={{ overflow: 'visible' }}>
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo — text-based like SIFScan */}
          <a href="/" className="flex items-center gap-0 group">
            <span className="relative">
              <span className="text-[26px] font-bold tracking-tight" style={{ color: 'hsl(220, 30%, 10%)' }}>
                SIF
              </span>
              {/* Green underline accent */}
              <span
                className="absolute bottom-0 left-0 w-full h-[3px] rounded-full"
                style={{ backgroundColor: 'hsl(152, 76%, 36%)' }}
              />
            </span>
            <span className="text-[26px] font-bold tracking-tight text-primary ml-[-1px]">
              PRIME
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav ref={dropdownRef} className="hidden lg:flex items-center gap-8" style={{ overflow: 'visible', fontSize: '15px' }}>
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
                  {fundsItems.map((item) => (
                    <a key={item.href} href={item.href} className="py-2 text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </a>
                  ))}
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
                  {learnItems.map((item) => (
                    <a key={item.href} href={item.href} className="py-2 text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </a>
                  ))}
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
