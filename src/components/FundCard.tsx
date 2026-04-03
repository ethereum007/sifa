import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Info } from "lucide-react";

interface FundCardProps {
  amc: string;
  name: string;
  category: string;
  nav: string;
  navDate: string;
  ter: string;
  change?: number;
  logo: string;
}

const FundCard = ({ amc, name, category, nav, navDate, ter, change = 0.15, logo }: FundCardProps) => {
  const isPositive = change >= 0;

  return (
    <div className="glass-card p-6 hover:border-primary/30 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
            <img 
              src={logo} 
              alt={amc} 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23f5a623' stroke-width='2'%3E%3Cpath d='m3 15 4-8 4 4 4-4 4 8'/%3E%3Cpath d='M6 19h12'/%3E%3C/svg%3E";
              }}
            />
          </div>
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
