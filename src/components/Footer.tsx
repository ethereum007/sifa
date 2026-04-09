import { WHATSAPP_URL } from "@/lib/whatsapp";

const Footer = () => {
  return (
    <footer className="bg-white" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <a href="/" className="inline-block mb-3">
              <span className="text-[16px] leading-tight tracking-tight">
                <span className="font-medium text-[var(--text-primary)]">SIF</span>
                <span className="font-medium" style={{ color: "var(--brand)" }}>PRIME</span>
              </span>
              <span className="block text-[9px] uppercase tracking-[0.07em] text-[var(--text-tertiary)]">
                Research
              </span>
            </a>
            <p className="text-[13px] text-[var(--text-secondary)] mb-4 max-w-xs">
              India's institutional SIF research and distribution platform.
            </p>
            <div className="space-y-1.5 text-[12px] text-[var(--text-tertiary)]">
              <p>info@sifprime.com</p>
              <p>+91 90329 99466</p>
              <a
                href="https://www.linkedin.com/company/sif-prime"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors mt-1"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.05em] text-[var(--text-tertiary)] font-medium mb-3">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: "Funds", href: "/sif-funds-launched" },
                { label: "Compare", href: "/sif-compare" },
                { label: "Performance", href: "/sifreturns" },
                { label: "NAV Tracker", href: "/sifnav" },
                { label: "SIF Quiz", href: "/which-sif-should-you-invest-in" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.05em] text-[var(--text-tertiary)] font-medium mb-3">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: "What is SIF?", href: "/specialized-investment-fund-sif" },
                { label: "SIF vs MF vs PMS", href: "/sif-vs-pms-vs-aif" },
                { label: "SIF Tax Guide", href: "/sif-tax-guide" },
                { label: "For MFD Partners", href: "/partner" },
                { label: "SIF Liquidity Guide", href: "/sif-liquidity-guide" },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6" style={{ borderTop: "0.5px solid rgba(0,0,0,0.08)" }}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4">
          <p className="text-[11px] text-[var(--text-tertiary)]">
            © 2026 SIF Prime. AMFI Registered MF Distributor.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms", href: "/terms-of-service" },
              { label: "Disclaimer", href: "/disclaimer" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-[11px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <p className="text-[10px] text-[var(--text-tertiary)] text-center pb-4 max-w-3xl mx-auto">
          Disclaimer: Investments in Specialized Investment Funds (SIFs) are subject to market risks.
          Please read all scheme related documents carefully before investing. Past performance is not
          indicative of future returns. SIF Prime is a discovery and comparison platform and does not
          provide investment advice.
        </p>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
        style={{ background: "var(--brand)" }}
        aria-label="Contact via WhatsApp"
      >
        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </footer>
  );
};

export default Footer;
