import { TrendingUp, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { WHATSAPP_URL, CONSULTATION_URL } from "@/lib/whatsapp";

const Footer = () => {
  const links = {
    platform: [
      { label: "Schedule a Consultation", href: CONSULTATION_URL, external: true },
      { label: "Compare Funds", href: "/sif-vs-mf" },
      { label: "Strategies", href: "/sif-strategies" },
      { label: "Minimum Investment", href: "/sif-minimum-investment" },
    ],
    resources: [
      { label: "Specialized Investment Fund (SIF)", href: "/specialized-investment-fund-sif" },
      { label: "NAV", href: "/sifnav" },
      { label: "FAQs", href: "/#faqs" },
    ],
    blog: [
      { label: "SIF vs Mutual Fund", href: "/sifvsmutualfund" },
      { label: "SIF Liquidity Guide", href: "/sif-liquidity-guide" },
    ],
    distributors: [
      { label: "Set Up a Consultation Call", href: "/become-distributor" },
      { label: "MFDs $1B Opportunity", href: "/distributors/sif-billion-dollar-opportunity" },
    ],
    company: [
      { label: "About Us", href: "/specialized-investment-fund-sif" },
      { label: "Contact", href: WHATSAPP_URL, external: true },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  };

  return (
    <footer id="about" className="bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_20px_hsl(43_96%_56%/0.3)]">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground">
                SIF<span className="text-primary">Prime</span>
              </span>
            </a>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-sm">
              India's premier platform for discovering, comparing, and investing in SEBI-regulated Specialized Investment Funds.
            </p>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>info@sifprime.com</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>+91 90329 99466</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>India</span>
              </div>
              <a 
                href="https://www.linkedin.com/company/sif-prime" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors mt-2"
              >
                <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                <span>Follow us on LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Platform</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.platform.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h5 className="font-semibold text-foreground mt-4 sm:mt-5 mb-2 sm:mb-3 text-xs sm:text-sm">Blog</h5>
            <ul className="space-y-2 sm:space-y-3">
              {links.blog.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>



          <div>
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Distributors</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.distributors.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden sm:block">
            <h4 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
            <ul className="space-y-2 sm:space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-6 sm:pt-8">
          {/* AMFI Registration Badge */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 border border-primary/20 rounded-full">
              <span className="text-xs sm:text-sm font-medium text-primary">AMFI Registered SIF Distributor</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2026 SIF Prime. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              {links.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] sm:text-xs text-muted-foreground mt-4 sm:mt-6 text-center max-w-4xl mx-auto px-2">
            Disclaimer: Investments in Specialized Investment Funds (SIFs) are subject to market risks. 
            Please read all scheme related documents carefully before investing. Past performance is not 
            indicative of future returns. SIF Prime is a discovery and comparison platform and does not 
            provide investment advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
