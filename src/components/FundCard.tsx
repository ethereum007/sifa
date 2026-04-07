import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import AmcLogo from "@/components/AmcLogo";

interface FundCardProps {
  amc: string;
  name: string;
  category: string;
  nav: string;
  navDate: string;
  ter: string;
  change?: number;
  logo?: string;
}

const FundCard = ({ amc, name, category, nav, navDate, ter, change = 0.15 }: FundCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <AmcLogo amc={amc} size="md" />
          <div>
            <p className="text-xs text-muted-foreground">{amc}</p>
            <h3 className="font-semibold text-foreground">{name}</h3>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <Info className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Category Badge */}
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
        {category}
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">NAV</span>
          <div className="text-right">
            <span className="font-semibold text-foreground">{nav}</span>
            <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isPositive ? '+' : ''}{change}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">TER</span>
          <span className="font-medium text-foreground">{ter}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">As of</span>
          <span className="text-sm text-muted-foreground">{navDate}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          Compare
        </Button>
        <Button variant="gold" size="sm" className="flex-1">
          Invest
        </Button>
      </div>
    </div>
  );
};

export default FundCard;
