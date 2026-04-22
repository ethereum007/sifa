"use client";
import { useState } from "react";
import Link from "next/link";
import AmcLogo from "@/components/AmcLogo";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
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
    { name: "Apex SIF Hybrid Long Short", amc: "Aditya Birla Sun Life Mutual Fund", internalLink: "/sifs/apex-hybrid-long-short" },
  ],
  "Equity Ex-Top 100": [
    { name: "iSIF Ex-Top 100 Long Short Fund", amc: "ICICI Prudential Mutual Fund", internalLink: "/sifs/isif/extop100" },
    { name: "qSIF Ex-Top 100 Long-Short Fund", amc: "Quant Mutual Fund", internalLink: "/sifs/qsif-ex-top-100-long-short" },
    { name: "WSIF Equity Ex-Top 100 Long-Short Fund", amc: "The Wealth Company Mutual Fund", internalLink: "/sifs/wsif-ex-top-100-long-short" },
  ],
  "Equity Long Short": [
    { name: "Diviniti Equity Long Short", amc: "ITI Mutual Fund", internalLink: "/sifs/diviniti-equity-long-short" },
    { name: "qSIF Equity Long Short", amc: "Quant Mutual Fund", internalLink: "/sifs/qsif-equity-long-short" },
    { name: "DynaSIF Equity Long-Short Fund", amc: "360 ONE Asset", internalLink: "/sifs/dyna-equity-long-short" },
    { name: "Arudha Equity Long Short", amc: "Bandhan Mutual Fund", internalLink: "/sifs/arudha-equity-long-short" },
    { name: "Sapphire Equity Long-Short SIF", amc: "Franklin Templeton", internalLink: "/sifs/sapphire-equity-long-short" },
    { name: "WSIF Equity Long-Short Fund", amc: "The Wealth Company Mutual Fund", internalLink: "/sifs/wsif-equity-long-short" },
  ],
  "Active Asset Allocator": [
    { name: "DynaSIF Active Asset Allocator", amc: "360 ONE Asset", internalLink: "/sifs/dyna-active-asset-allocator" },
    { name: "qSIF Active Asset Allocator Long-Short", amc: "Quant Mutual Fund", internalLink: "/sifs/qsif-active-asset-allocator-long-short" },
  ],
};

const totalFunds = Object.values(fundsByCategory).flat().length;
const totalAMCs = new Set(Object.values(fundsByCategory).flat().map(f => f.amc)).size;

const SifFundsCarousel = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Hybrid Long Short");
  const funds = fundsByCategory[activeCategory];

  return (
    <section id="sif-funds" className="py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Specialized Investment Funds Launched
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
            India&apos;s first SIF schemes are now live. Explore funds from leading AMCs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Tab navigation */}
          <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors relative ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {fundsByCategory[cat].length}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Fund table */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50%] text-sm">Fund Name</TableHead>
                  <TableHead className="text-sm">AMC</TableHead>
                  <TableHead className="text-right w-[80px] text-sm">Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {funds.map((fund, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium text-foreground">
                      <div className="flex items-center gap-3">
                        <AmcLogo amc={fund.amc} />
                        <span>{fund.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{fund.amc}</TableCell>
                    <TableCell className="text-right">
                      {fund.internalLink ? (
                        <Link href={fund.internalLink} className="text-primary hover:underline font-medium">
                          View →
                        </Link>
                      ) : fund.link ? (
                        <a href={fund.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                          Visit →
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-base text-muted-foreground">
            <span className="font-bold text-foreground">{totalFunds}</span> SIF schemes across{" "}
            <span className="font-bold text-foreground">{totalAMCs}</span> AMCs
          </p>
        </div>
      </div>
    </section>
  );
};

export default SifFundsCarousel;
