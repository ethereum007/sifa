"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, AlertTriangle, Globe, FileText, Wallet, Shield, Users, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CONSULTATION_URL } from "@/lib/whatsapp";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

const kycDocuments = [
  { document: "Passport", details: "Valid passport with current visa/residence permit" },
  { document: "PAN Card", details: "Indian PAN card (mandatory for all investment in India)" },
  { document: "Overseas Address Proof", details: "Utility bill, bank statement, or government-issued ID from country of residence" },
  { document: "Indian Address Proof", details: "If maintaining an Indian address (optional but helpful)" },
  { document: "Photograph", details: "Recent passport-sized photograph" },
  { document: "FATCA Self-Declaration", details: "Foreign Account Tax Compliance Act declaration form" },
  { document: "NRE/NRO Bank Account Details", details: "IFSC code, account number, and cancelled cheque" },
  { document: "In-Person Verification (IPV)", details: "Can be done at Indian embassy/consulate or through authorised agents abroad" },
];

const taxRates = [
  { type: "LTCG (Equity-Oriented SIF)", holding: "> 12 months", rate: "12.5% above ₹1.25L", tds: "Yes — TDS at applicable rate" },
  { type: "STCG (Equity-Oriented SIF)", holding: "< 12 months", rate: "20%", tds: "Yes — TDS at applicable rate" },
  { type: "LTCG (Debt-Oriented SIF)", holding: "Any period", rate: "At slab rate", tds: "Yes — TDS at 20% (without indexation)" },
  { type: "Dividend Income", holding: "N/A", rate: "At slab rate", tds: "Yes — TDS at 20%" },
];

const SifForNriCompleteGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Hero */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary">Guide</Badge>
              <span className="text-sm text-muted-foreground">April 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              Can NRIs Invest in SIF? Complete Guide to SIF Investment for NRIs
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Everything Non-Resident Indians need to know about investing in Specialized Investment Funds — eligibility, KYC, bank accounts, FEMA rules, taxation, repatriation, and which SIFs accept NRI investors.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl space-y-8">

            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                <Link href="/what-is-sif" className="text-primary hover:underline">Specialized Investment Funds (SIFs)</Link> have generated significant interest among Non-Resident Indians (NRIs) looking for sophisticated, SEBI-regulated investment options in India. With a minimum ticket of ₹10 Lakhs and access to long-short strategies previously available only through PMS and AIFs, SIFs represent a compelling opportunity for NRIs who want to invest in India beyond traditional mutual funds.
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                The short answer is: <strong className="text-foreground">Yes, NRIs can invest in SIFs</strong> — but there are specific eligibility requirements, documentation needs, and regulatory considerations. This guide covers everything step by step. For a broader overview, see our <Link href="/nri-sif-guide" className="text-primary hover:underline">NRI SIF Guide</Link>.
              </p>
            </div>

            {/* Eligibility */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Users className="w-7 h-7 text-primary" />
                NRI Eligibility for SIF Investment
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                SIFs operate under SEBI&apos;s Mutual Fund Regulations, and NRI eligibility follows the same framework as mutual fund investments. Here is who can invest:
              </p>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Eligible NRI Investor Categories</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">NRIs (Non-Resident Indians)</strong> — Indian citizens residing outside India for employment, business, or any other purpose with the intention of staying abroad for an uncertain period</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">PIOs (Persons of Indian Origin)</strong> — Foreign citizens of Indian origin or descent, including OCI (Overseas Citizen of India) cardholders</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">OCIs (Overseas Citizens of India)</strong> — Holders of OCI cards issued under the Citizenship Act</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-6 flex gap-4">
                  <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                  <div className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">US and Canada-based NRIs:</strong> Some AMCs may have restrictions on accepting investments from NRIs based in the United States or Canada due to FATCA/CRS compliance requirements and the complexity of US tax reporting (PFIC rules). Check with the specific AMC before investing. As of April 2026, most SIF AMCs accept US/Canada-based NRIs, but additional documentation may be required.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bank Account Requirements */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Building2 className="w-7 h-7 text-primary" />
                Bank Account Requirements for NRI SIF Investment
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                NRIs must invest through designated Indian bank accounts. The type of account determines repatriation rights:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-3">NRE Account (Non-Resident External)</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li><strong className="text-foreground">Repatriation:</strong> Fully repatriable — principal + returns</li>
                      <li><strong className="text-foreground">Source of Funds:</strong> Foreign earnings deposited in India</li>
                      <li><strong className="text-foreground">Tax in India:</strong> Interest is tax-free</li>
                      <li><strong className="text-foreground">Best For:</strong> NRIs who want to repatriate SIF returns to their country of residence</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-3">NRO Account (Non-Resident Ordinary)</h3>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li><strong className="text-foreground">Repatriation:</strong> Limited — up to USD 1 million per financial year (after tax)</li>
                      <li><strong className="text-foreground">Source of Funds:</strong> Indian income (rent, dividends, etc.)</li>
                      <li><strong className="text-foreground">Tax in India:</strong> Interest taxable at slab rate</li>
                      <li><strong className="text-foreground">Best For:</strong> NRIs investing Indian-source income in SIFs</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 flex gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Key Rule:</strong> If you invest through an NRE account, redemption proceeds must be credited back to the NRE account. Similarly, NRO investments must be redeemed to the NRO account. You cannot cross-transfer between the two for investment purposes.
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* KYC Requirements */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <FileText className="w-7 h-7 text-primary" />
                KYC Requirements for NRI SIF Investors
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                NRIs must complete KYC (Know Your Customer) compliance before investing in any SIF. If you already have a KYC-compliant mutual fund account in India, the same KYC may be valid for SIF investment (check with your AMC). For new KYC, here are the required documents:
              </p>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Document</TableHead>
                      <TableHead className="font-semibold">Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {kycDocuments.map((doc, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-foreground">{doc.document}</TableCell>
                        <TableCell className="text-muted-foreground">{doc.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Many AMCs now support digital KYC completion for NRIs through video verification. Check with the specific AMC or distributor for their NRI onboarding process.
              </p>
            </div>

            {/* FEMA Compliance */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Shield className="w-7 h-7 text-primary" />
                FEMA Compliance and RBI Regulations
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                NRI investments in Indian mutual funds (including SIFs) are governed by the Foreign Exchange Management Act (FEMA) and RBI regulations. Key compliance points:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">General Permission:</strong> RBI has granted general permission to NRIs to invest in Indian mutual funds (including SIFs) on a repatriation or non-repatriation basis. No specific RBI approval is needed for each investment.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">Investment Route:</strong> SIF investment qualifies under the Portfolio Investment Scheme (PIS) or general route depending on the account type used (NRE/NRO).</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">No Ceiling:</strong> There is no upper limit on NRI investment in mutual funds/SIFs, unlike direct equity investment which has sectoral caps.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">Repatriation:</strong> Investments made from NRE account are fully repatriable. NRO investments are repatriable up to USD 1 million per year after payment of applicable taxes.</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">Currency:</strong> Investment must be made in Indian Rupees. Foreign currency payments are not directly accepted.</li>
              </ul>
            </div>

            {/* Taxation */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Wallet className="w-7 h-7 text-primary" />
                Taxation of SIF for NRIs
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                NRI taxation on SIF investments is similar to resident Indian taxation, but with important differences around TDS (Tax Deducted at Source) and DTAA (Double Taxation Avoidance Agreement) benefits. For a comprehensive overview, see the <Link href="/sif-tax-guide" className="text-primary hover:underline">SIF Tax Guide</Link>.
              </p>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">Type of Gain</TableHead>
                      <TableHead className="font-semibold">Holding Period</TableHead>
                      <TableHead className="font-semibold">Tax Rate</TableHead>
                      <TableHead className="font-semibold">TDS Applicable</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxRates.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-foreground">{row.type}</TableCell>
                        <TableCell className="text-muted-foreground">{row.holding}</TableCell>
                        <TableCell className="text-muted-foreground">{row.rate}</TableCell>
                        <TableCell className="text-muted-foreground">{row.tds}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 flex gap-4">
                  <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div className="space-y-2 text-muted-foreground leading-relaxed">
                    <p><strong className="text-foreground">DTAA Benefits:</strong> If India has a Double Taxation Avoidance Agreement with your country of residence, you may be able to claim credit for taxes paid in India against your tax liability in the resident country. NRIs in the US, UK, UAE, Singapore, Canada, and Australia can typically benefit from DTAA provisions.</p>
                    <p><strong className="text-foreground">Key Difference from Residents:</strong> Unlike resident Indians, NRIs face TDS on all redemption proceeds. The AMC deducts TDS before crediting the redemption amount to your bank account. You can claim a refund of excess TDS by filing an Indian income tax return.</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Repatriation */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Globe className="w-7 h-7 text-primary" />
                Repatriation of SIF Proceeds
              </h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                Repatriation — the process of transferring your investment proceeds back to your country of residence — depends on the type of bank account used:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h3 className="font-bold text-foreground mb-2">NRE Account Investments (Fully Repatriable)</h3>
                  <p className="text-sm text-muted-foreground">Both the principal and returns (capital gains + dividends) can be freely repatriated without any limit. The AMC credits redemption proceeds to your NRE account, from which you can transfer to your overseas bank account.</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <h3 className="font-bold text-foreground mb-2">NRO Account Investments (Limited Repatriation)</h3>
                  <p className="text-sm text-muted-foreground">Repatriation is limited to USD 1 million per financial year (after paying applicable taxes). You will need to provide Form 15CA and 15CB (CA certificate) for repatriation. The bank may require additional documentation for large transfers.</p>
                </div>
              </div>
            </div>

            {/* Step by Step Process */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-3">
                <Clock className="w-7 h-7 text-primary" />
                Step-by-Step Process: How NRIs Can Invest in SIF
              </h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Open an NRE or NRO Bank Account", desc: "If you don't already have one, open an NRE or NRO account with a major Indian bank. Most banks allow remote account opening for NRIs with proper documentation." },
                  { step: 2, title: "Complete KYC", desc: "Submit all required KYC documents (see table above). Many AMCs now offer video KYC for NRIs. Alternatively, complete In-Person Verification at an Indian consulate or through authorised agents." },
                  { step: 3, title: "Choose Your SIF Scheme", desc: "Research and select the SIF scheme(s) that align with your investment goals. Use the SIFPrime comparison tool to evaluate options. Not all AMCs accept NRI investments in every scheme — verify with the AMC." },
                  { step: 4, title: "Submit Application", desc: "Apply through the AMC website, app, or an authorised distributor. Ensure your NRI status is correctly declared in the application form. Provide PAN, bank account details, and FATCA declaration." },
                  { step: 5, title: "Fund Transfer", desc: "Transfer the investment amount (minimum ₹10 Lakhs) from your NRE/NRO account to the AMC's designated bank account. Payment must be in INR through banking channels only." },
                  { step: 6, title: "Receive Confirmation", desc: "The AMC will allot units at the applicable NAV and send a confirmation (CAS — Consolidated Account Statement). Track your investment through the AMC portal or SIFPrime." },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-5 rounded-lg bg-card border border-border/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary font-bold">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Which SIFs Accept NRIs */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Which SIFs Accept NRI Investors?</h2>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                As of April 2026, most major SIF AMCs accept NRI investors. However, acceptance may vary for NRIs from certain countries (particularly the US and Canada due to FATCA compliance). Here is the current status:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">Quant Mutual Fund (qSIF)</strong> — Accepts NRIs including US/Canada (subject to additional documentation)</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">ICICI Prudential (iSIF)</strong> — Accepts NRIs from most countries; US/Canada NRIs may face restrictions on certain schemes</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">Edelweiss (Altiva, Diviniti)</strong> — Accepts NRIs; check for US/Canada restrictions</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">DSP (Dyna, Titanium)</strong> — Accepts NRIs from most jurisdictions</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">White Oak (Arudha)</strong> — Accepts NRIs; verify specific country eligibility</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" /> <strong className="text-foreground">Motilal Oswal (Magnum)</strong> — Accepts NRIs from most countries</li>
              </ul>
              <p className="text-base text-muted-foreground leading-relaxed">
                We recommend confirming NRI acceptance directly with the AMC or through an authorised distributor before initiating the investment process. Browse all available funds on the <Link href="/sif-funds-launched" className="text-primary hover:underline">SIF Funds Launched</Link> page.
              </p>
            </div>

            {/* Common Mistakes */}
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Common Mistakes NRIs Make with SIF Investment</h2>
              <Card>
                <CardContent className="p-6">
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" /> <strong className="text-foreground">Not updating KYC status:</strong> If you became an NRI after opening your MF account, update your KYC status to NRI before investing in SIF. Investing with resident status as an NRI is a compliance violation.</li>
                    <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" /> <strong className="text-foreground">Using a resident savings account:</strong> NRIs must invest only through NRE or NRO accounts. Using a resident savings account for SIF investment is not permitted under FEMA.</li>
                    <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" /> <strong className="text-foreground">Ignoring DTAA benefits:</strong> Many NRIs pay double tax because they don&apos;t claim DTAA credits. Work with a CA who understands cross-border taxation.</li>
                    <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" /> <strong className="text-foreground">Not considering PFIC implications (US NRIs):</strong> For US-based NRIs, Indian mutual funds (including SIFs) may be classified as PFICs, which have adverse tax consequences. Consult a US tax advisor.</li>
                    <li className="flex items-start gap-3"><AlertTriangle className="w-5 h-5 text-destructive mt-0.5 shrink-0" /> <strong className="text-foreground">Missing the ₹10L minimum requirement:</strong> The ₹10 Lakh minimum applies to NRIs as well. Ensure your initial investment meets this threshold at the PAN level per AMC.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">NRI? Get Expert Help with SIF Investment</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Navigating SIF investment as an NRI involves multiple regulatory and tax considerations. Our team can guide you through KYC, fund selection, and compliance — so you can focus on building wealth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="gold" size="lg" className="gap-2 w-full sm:w-auto">
                  Book NRI Consultation <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Link href="/sif-funds-launched">
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                  Explore All SIF Funds <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <p className="text-xs text-muted-foreground">
              Disclaimer: This article is for educational purposes only and does not constitute investment, legal, or tax advice. NRI investment in SIFs is subject to FEMA regulations, SEBI guidelines, and applicable tax laws. Tax rates and regulations may change. NRIs should consult with qualified tax advisors in both India and their country of residence before making investment decisions. SIF investments are subject to market risk. Please read all scheme-related documents carefully before investing.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SifForNriCompleteGuide;
