"use client";
import { useState } from "react";
import Link from "next/link";
import AmcLogo from "@/components/AmcLogo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SifFund {
  name: string;
  amc: string;
  link?: string;
  internalLink?: string;
}

type Category = "Hybrid Long Short" | "Equity Long Short" | "Equity Ex-Top 100" | "Active Asset Allocator";

const categories: Category[] = ["Hybrid Long Short", "Equity Long Short", "Equity Ex-Top 100", "Active Asset Allocator"];

const fundsByCategory: Record<Category, SifFund[]> = {
  "Hybrid Long Short": [
    { name: "Altiva Hybrid Long Short Fund", amc: "Edelweiss Mutual Fund", internalLink: "/sifs/altiva-hybrid-long-short" },
    { name: "Magnum Hybrid Long Short Fund", amc: "SBI Mutual Fund", internalLink: "/sifs/magnum-hybrid-long-short" },
    { name: "Titanium Hybrid Long Short Fund", amc: "Tata Mutual Fund", internalLink: "/sifs/titanium-hybrid-long-short" },
    { name: "Arudha Hybrid Long Short", amc: "Bandhan Mutual Fund", internalLink: "/sifs/arudha-hybrid-long-short" },
    { name: "iSIF Hybrid Long Short", amc: "ICICI Prudential Mutual Fund", internalLink: "/sifs/isif/hybrid" },
    { name: "qSIF Hybrid Long Short", amc: "Quant Mutual Fund", internalLink: "/sifs/qsif-hybrid-long-short" },
    { name: "Apex SIF Hybrid Long Short", amc: "DSP Mutual Fund", internalLink: "/sifs/apex-hybrid-long-short" },
  ],
  "Equity Ex-Top 100": [
    { name: "iSIF Ex-Top 100 Long Short Fund", amc: "ICICI Prudential Mutual Fund", internalLink: "/sifs/isif/extop100" },
    { name: "qSIF Ex-Top 100 Long-Short Fund", amc: "Quant Mutual Fund", internalLink: "/qsif-ex-top-100-long-short" },
  ],
  "Equity Long Short": [
    { name: "Diviniti Equity Long Short", amc: "ITI Mutual Fund", internalLink: "/diviniti-equity-long-short" },
    { name: "qSIF Equity Long Short", amc: "Quant Mutual Fund", internalLink: "/qsif-equity-long-short" },
    { name: "DynaSIF Equity Long-Short Fund", amc: "360 ONE Asset", internalLink: "/dyna-equity-long-short" },
    { name: "Arudha Equity Long Short", amc: "Bandhan Mutual Fund", internalLink: "/sifs/arudha-equity-long-short" },
  ],
  "Active Asset Allocator": [
    { name: "DynaSIF Active Asset Allocator", amc: "360 ONE Asset", internalLink: "/dyna-active-asset-allocator" },
  ],
};

const categoryColors: Record<Category, { active: string; inactive: string }> = {
  "Hybrid Long Short": {
    active: "bg-purple-600 text-white border-purple-600",
    inactive: "text-purple-700 bg-purple-50 border-purple-200 hover:bg-purple-100",
  },
  "Equity Long Short": {
    active: "bg-blue-600 text-white border-blue-600",
    inactive: "text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100",
  },
  "Equity Ex-Top 100": {
    active: "bg-emerald-600 text-white border-emerald-600",
    inactive: "text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
  },
  "Active Asset Allocator": {
    active: "bg-orange-600 text-white border-orange-600",
    inactive: "text-orange-700 bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
};

const totalFunds = Object.values(fundsByCategory).flat().length;
const totalAMCs = new Set(Object.values(fundsByCategory).flat().map(f => f.amc)).size;

const SifFundsCarousel = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Hybrid Long Short");
  const funds = fundsByCategory[activeCategory];

  return (
    <section id="sif-funds" className="py-8 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
            SIFs Now Available
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Specialized Investment Funds Launched
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto">
            India's first SIF schemes are now live. Explore the funds from leading AMCs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Side category tabs */}
            <div className="flex md:flex-col gap-2 md:gap-2 md:w-56 flex-shrink-0 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const colors = categoryColors[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2.5 rounded-lg border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                      isActive ? colors.active : colors.inactive
                    }`}
                  >
                    {cat}
                    <span className={`ml-2 text-[10px] font-normal ${isActive ? "opacity-80" : "opacity-60"}`}>
                      ({fundsByCategory[cat].length})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Fund table */}
            <div className="flex-1 rounded-xl border bg-card shadow-sm overflow-hidden min-w-0">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[50%]">Fund Name</TableHead>
                    <TableHead>AMC</TableHead>
                    <TableHead className="text-right w-[80px]">Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {funds.map((fund, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium text-foreground">
                        <div className="flex items-center gap-3">
                          <AmcLogo amc={fund.amc} />
                          <span className="text-sm">{fund.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{fund.amc}</TableCell>
                      <TableCell className="text-right">
                        {(fund.link || fund.internalLink) ? (
                          fund.internalLink ? (
                            <Link href={fund.internalLink} className="text-primary text-sm hover:underline font-medium">
                              View →
                            </Link>
                          ) : (
                            <a href={fund.link} target="_blank" rel="noopener noreferrer" className="text-primary text-sm hover:underline font-medium">
                              Visit →
                            </a>
                          )
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">{totalFunds}</span> SIF schemes launched across{" "}
            <span className="font-semibold text-primary">{totalAMCs}</span> AMCs
          </p>
        </div>
      </div>
    </section>
  );
};

export default SifFundsCarousel;
