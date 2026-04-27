"use client";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import { CONSULTATION_URL } from "@/lib/whatsapp";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";

const Header = dynamic(() => import("@/components/Header"));
const Footer = dynamic(() => import("@/components/Footer"));

import AmcLogo from "@/components/AmcLogo";



interface SifFund {
  name: string;
  amc: string;
  href: string;
  linkText?: string;
  status: "live" | "nfo";
  nfoWindow?: string;
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
      { name: "Altiva Hybrid Long Short Fund", amc: "Edelweiss Mutual Fund", href: "/sifs/altiva-hybrid-long-short", status: "live" },
      { name: "Magnum Hybrid Long Short Fund", amc: "SBI Mutual Fund", href: "/sifs/magnum-hybrid-long-short", status: "live" },
      { name: "qSIF Hybrid Long Short", amc: "Quant Mutual Fund", href: "/sifs/qsif-hybrid-long-short", status: "live" },
      { name: "Titanium Hybrid Long Short Fund", amc: "Tata Mutual Fund", href: "/sifs/titanium-hybrid-long-short", status: "live" },
      { name: "Arudha Hybrid Long Short", amc: "Bandhan Mutual Fund", href: "/sifs/arudha-hybrid-long-short", status: "live" },
      { name: "iSIF Hybrid Long Short", amc: "ICICI Prudential Mutual Fund", href: "/sifs/isif/hybrid", status: "live" },
      { name: "Apex Hybrid Long Short", amc: "Aditya Birla Sun Life Mutual Fund", href: "/sifs/apex-hybrid-long-short", status: "live" },
    ],
  },
  {
    label: "Equity Long Short",
    badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
    funds: [
      { name: "qSIF Equity Long Short", amc: "Quant Mutual Fund", href: "/sifs/qsif-equity-long-short", status: "live" },
      { name: "Diviniti Equity Long Short", amc: "ITI Mutual Fund", href: "/sifs/diviniti-equity-long-short", status: "live" },
      { name: "DynaSIF Equity Long-Short Fund", amc: "360 ONE Asset", href: "/sifs/dyna-equity-long-short", status: "live" },
      { name: "Arudha Equity Long Short", amc: "Bandhan Mutual Fund", href: "/sifs/arudha-equity-long-short", status: "live" },
      { name: "Sapphire Equity Long-Short SIF", amc: "Franklin Templeton", href: "/sifs/sapphire-equity-long-short", status: "nfo", nfoWindow: "10–24 Apr 2026" },
      { name: "WSIF Equity Long-Short Fund", amc: "The Wealth Company Mutual Fund", href: "/sifs/wsif-equity-long-short", status: "nfo", nfoWindow: "15–29 Apr 2026" },
      { name: "Titanium Equity Long-Short Fund", amc: "Tata Mutual Fund", href: "/sifs/titanium-equity-long-short", status: "nfo", nfoWindow: "27 Apr–11 May 2026" },
    ],
  },
  {
    label: "Equity Ex-Top 100",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    funds: [
      { name: "iSIF Ex-Top 100 Long Short Fund", amc: "ICICI Prudential Mutual Fund", href: "/sifs/isif/extop100", status: "live" },
      { name: "qSIF Ex-Top 100 Long-Short Fund", amc: "Quant Mutual Fund", href: "/sifs/qsif-ex-top-100-long-short", status: "live" },
      { name: "WSIF Equity Ex-Top 100 Long-Short Fund", amc: "The Wealth Company Mutual Fund", href: "/sifs/wsif-ex-top-100-long-short", status: "nfo", nfoWindow: "15–29 Apr 2026" },
    ],
  },
  {
    label: "Sector Rotation",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    funds: [
      { name: "qSIF Sector Rotation Long-Short Fund", amc: "Quant Mutual Fund", href: "/sifs/qsif-sector-rotation-long-short", status: "nfo", nfoWindow: "27 Apr–11 May 2026" },
    ],
  },
  {
    label: "Active Asset Allocator",
    badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
    funds: [
      { name: "DynaSIF Active Asset Allocator", amc: "360 ONE Asset", href: "/sifs/dyna-active-asset-allocator", status: "live" },
      { name: "qSIF Active Asset Allocator Long-Short", amc: "Quant Mutual Fund", href: "/sifs/qsif-active-asset-allocator-long-short", status: "live" },
    ],
  },
];

const allFunds = categories.flatMap((cat) => cat.funds);
const totalFunds = allFunds.length;
const liveCount = allFunds.filter((f) => f.status === "live").length;
const nfoCount = allFunds.filter((f) => f.status === "nfo").length;
const uniqueAMCs = new Set(allFunds.map((f) => f.amc)).size;

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
              Every SIF in India — live and in NFO. Explore the full universe across leading AMCs.
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
                        <TableHead className="hidden sm:table-cell">Status</TableHead>
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
                          <TableCell className="hidden sm:table-cell">
                            {fund.status === "nfo" ? (
                              <span className="inline-flex items-center gap-1.5 rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 whitespace-nowrap">
                                NFO OPEN
                                {fund.nfoWindow && <span className="font-normal text-amber-700">· {fund.nfoWindow}</span>}
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded border border-green-200 bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-800">
                                LIVE
                              </span>
                            )}
                          </TableCell>
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
              <span className="text-2xl font-bold text-primary">{totalFunds}</span> SIFs across{" "}
              <span className="text-2xl font-bold text-primary">{uniqueAMCs}</span> AMCs —{" "}
              <span className="font-semibold text-green-700">{liveCount} live</span>,{" "}
              <span className="font-semibold text-amber-700">{nfoCount} in NFO</span>
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
