"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, Info, PiggyBank } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TerData {
  schemeName: string;
  amc: string;
  category: string;
  terDirect: number;
  terRegular: number;
  aum: string;
}

// Sample TER data - in production this would come from API
const terData: TerData[] = [
  {
    schemeName: "qsif Equity Long Short Fund",
    amc: "quant Mutual Fund",
    category: "Equity",
    terDirect: 1.25,
    terRegular: 2.15,
    aum: "₹250 Cr",
  },
  {
    schemeName: "qsif Hybrid Long-Short Fund",
    amc: "quant Mutual Fund",
    category: "Hybrid",
    terDirect: 1.10,
    terRegular: 1.95,
    aum: "₹180 Cr",
  },
  {
    schemeName: "Altiva Hybrid Long-Short Fund",
    amc: "Edelweiss Mutual Fund",
    category: "Hybrid",
    terDirect: 1.35,
    terRegular: 2.25,
    aum: "₹320 Cr",
  },
  {
    schemeName: "Magnum Hybrid Long Short Fund",
    amc: "SBI Mutual Fund",
    category: "Hybrid",
    terDirect: 1.20,
    terRegular: 2.05,
    aum: "₹450 Cr",
  },
  {
    schemeName: "Diviniti Equity Long Short Fund",
    amc: "ITI Mutual Fund",
    category: "Equity",
    terDirect: 1.40,
    terRegular: 2.30,
    aum: "₹120 Cr",
  },
  {
    schemeName: "Titanium Hybrid Long-Short Fund",
    amc: "Tata Mutual Fund",
    category: "Hybrid",
    terDirect: 1.15,
    terRegular: 2.00,
    aum: "₹280 Cr",
  },
];

type SortKey = "schemeName" | "terDirect" | "terRegular" | "amc";

const TerComparison = () => {
  const [sortKey, setSortKey] = useState<SortKey>("terDirect");
  const [sortAsc, setSortAsc] = useState(true);

  const sortedData = [...terData].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const getTerBadge = (ter: number) => {
    if (ter <= 1.2) return <Badge className="bg-success/10 text-success border-success/20">Low</Badge>;
    if (ter <= 1.5) return <Badge className="bg-warning/10 text-warning border-warning/20">Medium</Badge>;
    return <Badge className="bg-destructive/10 text-destructive border-destructive/20">High</Badge>;
  };

  return (
    <TooltipProvider>
      <section id="ter" className="py-8 sm:py-16 bg-background">
        <div className="container mx-auto px-2 sm:px-4">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-10">
            <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
              Cost Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-foreground">
              Total Expense Ratio (TER)
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto px-2">
              Compare expense ratios across SIF schemes. Lower TER means more of your returns stay with you.
            </p>
          </div>

          {/* Info Card */}
          <div className="glass-card p-4 sm:p-6 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <PiggyBank className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">What is TER?</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Total Expense Ratio (TER) is the annual fee charged by the fund house to manage your investments. 
                It includes management fees, administrative costs, and other operational expenses. 
                <strong className="text-foreground"> Direct plans have lower TER</strong> as they don't include distributor commissions.
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="glass-card p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-sm text-muted-foreground">Lowest TER (Direct)</p>
              <p className="text-lg sm:text-2xl font-bold text-success">
                {Math.min(...terData.map(d => d.terDirect)).toFixed(2)}%
              </p>
            </div>
            <div className="glass-card p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-sm text-muted-foreground">Highest TER (Direct)</p>
              <p className="text-lg sm:text-2xl font-bold text-destructive">
                {Math.max(...terData.map(d => d.terDirect)).toFixed(2)}%
              </p>
            </div>
            <div className="glass-card p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-sm text-muted-foreground">Average TER (Direct)</p>
              <p className="text-lg sm:text-2xl font-bold text-foreground">
                {(terData.reduce((a, b) => a + b.terDirect, 0) / terData.length).toFixed(2)}%
              </p>
            </div>
            <div className="glass-card p-3 sm:p-4 text-center">
              <p className="text-[10px] sm:text-sm text-muted-foreground">Avg Savings (Direct)</p>
              <p className="text-lg sm:text-2xl font-bold text-primary">
                {(terData.reduce((a, b) => a + (b.terRegular - b.terDirect), 0) / terData.length).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead 
                      className="font-semibold cursor-pointer hover:text-primary"
                      onClick={() => handleSort("schemeName")}
                    >
                      <div className="flex items-center gap-1">
                        Scheme Name
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold cursor-pointer hover:text-primary"
                      onClick={() => handleSort("amc")}
                    >
                      <div className="flex items-center gap-1">
                        AMC
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead 
                      className="font-semibold cursor-pointer hover:text-primary text-right"
                      onClick={() => handleSort("terDirect")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        TER (Direct)
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Lower fees, no distributor commission</p>
                          </TooltipContent>
                        </Tooltip>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="font-semibold cursor-pointer hover:text-primary text-right"
                      onClick={() => handleSort("terRegular")}
                    >
                      <div className="flex items-center justify-end gap-1">
                        TER (Regular)
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Includes distributor commission</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedData.map((fund, index) => (
                    <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium max-w-xs">
                        {fund.schemeName}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {fund.amc}
                      </TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {fund.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-success">
                        {fund.terDirect.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {fund.terRegular.toFixed(2)}%
                      </TableCell>
                      <TableCell className="text-right">
                        {getTerBadge(fund.terDirect)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            TER data is indicative and may vary. Please refer to the scheme information document for exact figures.
          </p>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default TerComparison;
