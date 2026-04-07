"use client";

import { lazy, Suspense } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";

const Header = lazy(() => import("@/components/Header"));
const Footer = lazy(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



interface SifFund {
  name: string;
  amc: string;
  href: string;
  linkText?: string;
}

interface CategoryData {
  label: string;
  badgeClass: string;
  funds: SifFund[];
}

const categories: CategoryData[] = [
  {
    label: "Hybrid Long Short",
    badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
    funds: [
      { name: "Altiva Hybrid Long Short Fund", amc: "Edelweiss Mutual Fund", href: "/sifs/altiva-hybrid-long-short" },
      { name: "Magnum Hybrid Long Short Fund", amc: "SBI Mutual Fund", href: "/sifs/magnum-hybrid-long-short" },
      { name: "Titanium Hybrid Long Short Fund", amc: "Tata Mutual Fund", href: "/sifs/titanium-hybrid-long-short" },
      { name: "Arudha Hybrid Long Short", amc: "Bandhan Mutual Fund", href: "/sifs/arudha-hybrid-long-short" },
      { name: "iSIF Hybrid Long Short", amc: "ICICI Prudential Mutual Fund", href: "/sifs/isif/hybrid" },
      { name: "qSIF Hybrid Long Short", amc: "Quant Mutual Fund", href: "/sifs/qsif-hybrid-long-short" },
      { name: "Apex SIF Hybrid Long Short", amc: "DSP Mutual Fund", href: "/sifs/apex-hybrid-long-short" },
    ],
  },
  {
    label: "Equity Ex-Top 100",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    funds: [
      { name: "iSIF Ex-Top 100 Long Short Fund", amc: "ICICI Prudential Mutual Fund", href: "/sifs/isif/extop100" },
      { name: "qSIF Ex-Top 100 Long-Short Fund", amc: "Quant Mutual Fund", href: "/qsif-ex-top-100-long-short" },
    ],
  },
  {
    label: "Equity Long Short",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    funds: [
      { name: "Diviniti Equity Long Short", amc: "ITI Mutual Fund", href: "/diviniti-equity-long-short" },
      { name: "qSIF Equity Long Short", amc: "Quant Mutual Fund", href: "/qsif-equity-long-short" },
      { name: "DynaSIF Equity Long-Short Fund", amc: "360 ONE Asset", href: "/dyna-equity-long-short" },
      { name: "Arudha Equity Long Short", amc: "Bandhan Mutual Fund", href: "/sifs/arudha-equity-long-short" },
    ],
  },
  {
    label: "Active Asset Allocator",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
    funds: [
      { name: "DynaSIF Active Asset Allocator", amc: "360 ONE Asset", href: "/dyna-active-asset-allocator", linkText: "View" },
    ],
  },
];

const totalFunds = categories.reduce((sum, cat) => sum + cat.funds.length, 0);
const uniqueAMCs = new Set(categories.flatMap(cat => cat.funds.map(f => f.amc))).size;

const SifFundsLaunched = () => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="h-16 lg:h-20" />}>
        <Header />
      </Suspense>
      
      <main className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Specialized Investment Funds Launched
            </h1>
            <p className="text-lg text-muted-foreground">
              India's first SIF schemes are now live. Explore the funds from leading AMCs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-10">
            {categories.map((category) => (
              <Card key={category.label} className="overflow-hidden">
                <CardHeader className="pb-2 pt-5 px-6">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`text-sm font-semibold ${category.badgeClass}`}>
                      {category.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {category.funds.length} {category.funds.length === 1 ? "fund" : "funds"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="pl-6">Fund Name</TableHead>
                        <TableHead>AMC</TableHead>
                        <TableHead className="pr-6 text-right">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {category.funds.map((fund, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="pl-6">
                            <div className="flex items-center gap-3">
                              <AmcLogo amc={fund.amc} />
                              <span className="font-medium text-foreground">{fund.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{fund.amc}</TableCell>
                          <TableCell className="pr-6 text-right">
                            <Link 
                              href={fund.href}
                              className="text-sm font-medium text-primary hover:underline"
                            >
                              {fund.linkText || "Visit"} →
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground">
              <span className="text-2xl font-bold text-primary">{totalFunds}</span> SIF schemes launched across{" "}
              <span className="text-2xl font-bold text-primary">{uniqueAMCs}</span> AMCs
            </p>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-secondary border border-border">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                Want to invest in SIFs?{" "}
                <a 
                  href={CONSULTATION_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Schedule a Consultation
                </a>
              </span>
            </div>
          </div>
        </div>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default SifFundsLaunched;
