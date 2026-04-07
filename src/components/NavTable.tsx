"use client";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Search, ChevronDown, ChevronRight, Filter, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AmcLogo from "@/components/AmcLogo";

interface FundEntry {
  amc: string;
  fund: string;
  nav: number;
  navRegular: number;
  date: string;
  category: string;
  type?: string;
}

// Fallback data used until API responds
const fallbackData: FundEntry[] = [
  { amc: "Edelweiss", fund: "Altiva Hybrid Long-Short", nav: 10.2967, navRegular: 10.2504, date: "01 Apr 2026", category: "Hybrid Long Short", type: "Interval" },
  { amc: "DSP", fund: "Apex Hybrid Long-Short", nav: 10.02, navRegular: 10.02, date: "01 Apr 2026", category: "Hybrid Long Short", type: "Interval" },
  { amc: "Bandhan", fund: "Arudha Hybrid Long-Short", nav: 10.087, navRegular: 10.079, date: "02 Apr 2026", category: "Hybrid Long Short", type: "Interval" },
  { amc: "ICICI Prudential", fund: "iSIF Hybrid Long-Short", nav: 9.3867, navRegular: 9.3664, date: "01 Apr 2026", category: "Hybrid Long Short" },
  { amc: "SBI", fund: "Magnum Hybrid Long Short", nav: 10.0096, navRegular: 9.9759, date: "02 Apr 2026", category: "Hybrid Long Short", type: "Interval" },
  { amc: "Quant", fund: "qSIF Hybrid Long-Short", nav: 9.9268, navRegular: 9.8559, date: "02 Apr 2026", category: "Hybrid Long Short", type: "Interval" },
  { amc: "Tata", fund: "Titanium Hybrid Long-Short", nav: 9.5246, navRegular: 9.4725, date: "02 Apr 2026", category: "Hybrid Long Short", type: "Interval" },
  { amc: "Bandhan", fund: "Arudha Equity Long-Short", nav: 9.902, navRegular: 9.899, date: "02 Apr 2026", category: "Equity Long Short" },
  { amc: "ITI", fund: "Diviniti Equity Long Short", nav: 948.4573, navRegular: 943.5562, date: "02 Apr 2026", category: "Equity Long Short" },
  { amc: "360 ONE", fund: "DynaSIF Equity Long-Short", nav: 9.63, navRegular: 9.6155, date: "02 Apr 2026", category: "Equity Long Short" },
  { amc: "Quant", fund: "qSIF Equity Long Short", nav: 9.0718, navRegular: 9.0071, date: "02 Apr 2026", category: "Equity Long Short" },
  { amc: "ICICI Prudential", fund: "iSIF Ex-Top 100 Long-Short", nav: 9.18, navRegular: 9.16, date: "01 Apr 2026", category: "Equity Ex-Top 100" },
  { amc: "Quant", fund: "qSIF Ex-Top 100 Long-Short", nav: 8.7758, navRegular: 8.7247, date: "02 Apr 2026", category: "Equity Ex-Top 100" },
  { amc: "360 ONE", fund: "DynaSIF Active Asset Allocator", nav: 10.0087, navRegular: 10.0055, date: "02 Apr 2026", category: "Active Asset Allocator" },
];

const categoryList = ["Hybrid Long Short", "Equity Long Short", "Equity Ex-Top 100", "Active Asset Allocator"];

const NavTable = () => {
  const [navData, setNavData] = useState<FundEntry[]>(fallbackData);
  const [latestDate, setLatestDate] = useState("02 Apr 2026");
  const [isLive, setIsLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAmc, setSelectedAmc] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/nav")
      .then((res) => res.json())
      .then((data) => {
        if (data.funds && data.funds.length > 0) {
          setNavData(data.funds);
          // Find the most recent date across all funds
          const dates = data.funds.map((f: FundEntry) => f.date).filter(Boolean);
          if (dates.length > 0) setLatestDate(dates[0]);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Silently fall back to hardcoded data
      });
  }, []);

  const amcList = [...new Set(navData.map(d => d.amc))];

  const filteredData = navData.filter(fund => {
    if (selectedAmc !== "all" && fund.amc !== selectedAmc) return false;
    if (selectedCategory !== "all" && fund.category !== selectedCategory) return false;
    if (searchQuery && !fund.fund.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !fund.amc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const groupedByCategory = filteredData.reduce((acc, fund) => {
    if (!acc[fund.category]) acc[fund.category] = [];
    acc[fund.category].push(fund);
    return acc;
  }, {} as Record<string, FundEntry[]>);

  return (
    <section id="nav" className="py-8 sm:py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Compact Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                SIF NAV Tracker
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {filteredData.length} funds • {isLive ? "Live from AMFI" : "Updated daily"}
              </p>
            </div>
          </div>

          {/* Search & Filter Toggle */}
          <div className="flex gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search funds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="h-9"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Collapsible Filters */}
        <Collapsible open={showFilters}>
          <CollapsibleContent>
            <div className="flex flex-wrap gap-3 mb-4 p-3 bg-background rounded-lg border border-border/50">
              <Select value={selectedAmc} onValueChange={setSelectedAmc}>
                <SelectTrigger className="w-32 h-8 text-sm">
                  <SelectValue placeholder="AMC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All AMCs</SelectItem>
                  {amcList.map(amc => (
                    <SelectItem key={amc} value={amc}>{amc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 h-8 text-sm">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryList.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(selectedAmc !== "all" || selectedCategory !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => { setSelectedAmc("all"); setSelectedCategory("all"); }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Compact Table */}
        <div className="bg-background rounded-lg sm:rounded-xl border border-border/50 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 bg-muted/50 border-b border-border/50 text-[10px] sm:text-xs font-medium text-muted-foreground">
            <div className="col-span-5 sm:col-span-4">Fund</div>
            <div className="col-span-3 sm:col-span-2 text-center">AMC</div>
            <div className="col-span-4 sm:col-span-3 text-right">Direct NAV</div>
            <div className="hidden sm:block col-span-3 text-right">Regular NAV</div>
          </div>

          {/* Grouped Rows by Category */}
          <div className="divide-y divide-border/30">
            {categoryList.map(category => {
              const categoryFunds = groupedByCategory[category];
              if (!categoryFunds || categoryFunds.length === 0) return null;
              return <CategoryGroup key={category} category={category} funds={categoryFunds} />;
            })}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No funds match your criteria
            </div>
          )}
        </div>

        {/* Footer with date */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 text-sm text-muted-foreground">
          <p className="font-medium">
            NAV as on: <span className="text-foreground">{latestDate}</span>
          </p>
          <p className="text-xs">
            NAV shown for Growth option • IDCW options available • Min investment ₹10L
          </p>
        </div>

      </div>
    </section>
  );
};

// Collapsible Category Group
const CategoryGroup = ({ category, funds }: { category: string; funds: FundEntry[] }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer border-l-4 border-primary">
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-primary" />
          ) : (
            <ChevronRight className="w-4 h-4 text-primary" />
          )}
          <span className="font-bold text-sm text-foreground">{category}</span>
          <Badge variant="default" className="text-xs ml-auto">
            {funds.length} fund{funds.length > 1 ? "s" : ""}
          </Badge>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {funds.map((fund, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-muted/10 transition-colors ${
              idx % 2 === 1 ? "bg-muted/5" : ""
            }`}
          >
            <div className="col-span-5 sm:col-span-4 flex items-center gap-2">
              <AmcLogo amc={fund.amc} size="sm" />
              <div className="min-w-0">
                <span className="text-sm font-medium text-foreground line-clamp-1">{fund.fund}</span>
                {fund.type && (
                  <span className="text-xs text-muted-foreground ml-1">({fund.type})</span>
                )}
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2 text-center">
              <span className="text-xs text-muted-foreground">{fund.amc}</span>
            </div>
            <div className="col-span-4 sm:col-span-3 text-right">
              <span className="font-semibold text-foreground tabular-nums text-sm">
                ₹{fund.nav.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
            </div>
            <div className="hidden sm:block col-span-3 text-right">
              <span className="text-muted-foreground tabular-nums text-sm">
                ₹{fund.navRegular.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </span>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default NavTable;
