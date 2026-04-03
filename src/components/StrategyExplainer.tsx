import { TrendingUp, TrendingDown, ArrowUpDown, Layers, BarChart3, PieChart, Wallet, RefreshCw, Scale } from "lucide-react";


const equityStrategies = [
  {
    icon: ArrowUpDown,
    name: "Equity Long-Short Fund",
    description: "Minimum 80% in equity with up to 25% short exposure through unhedged derivatives for market-neutral returns.",
    characteristics: [
      "Min. 80% in equity & equity-related instruments",
      "Max. 25% short exposure via derivatives",
      "Daily redemption frequency available",
    ],
    redemption: "Daily or lesser",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: BarChart3,
    name: "Equity Ex-Top 100 Long-Short Fund",
    description: "Focus on mid & small-cap stocks (excluding top 100) with strategic short positions for higher growth potential.",
    characteristics: [
      "Min. 65% in stocks outside top 100 by market cap",
      "Max. 25% short exposure via derivatives",
      "Targets mid & small-cap opportunities",
    ],
    redemption: "Daily or lesser",
    color: "from-orange-500 to-red-600",
  },
  {
    icon: RefreshCw,
    name: "Sector Rotation Long-Short Fund",
    description: "Dynamic allocation across maximum 4 sectors with ability to short entire sectors for tactical positioning.",
    characteristics: [
      "Min. 80% in max 4 sectors",
      "Max. 25% short exposure at sector level",
      "Short positions cover all stocks in a sector",
    ],
    redemption: "Daily or lesser",
    color: "from-violet-500 to-purple-600",
  },
];

const debtStrategies = [
  {
    icon: Wallet,
    name: "Debt Long-Short Fund",
    description: "Investment in debt instruments across duration with unhedged short exposure through exchange traded debt derivatives.",
    characteristics: [
      "Investment across debt duration spectrum",
      "Short exposure via exchange traded debt derivatives",
      "Interval investment strategy structure",
    ],
    redemption: "Weekly or lesser",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: PieChart,
    name: "Sectoral Debt Long-Short Fund",
    description: "Sector-focused debt investment across minimum 2 sectors with ability to short entire sectors for tactical positioning.",
    characteristics: [
      "Min. 2 sectors, max 75% in single sector",
      "Max. 25% short exposure at sector level",
      "Short positions cover all sector instruments",
    ],
    redemption: "Weekly or lesser",
    color: "from-indigo-500 to-purple-600",
  },
];

const hybridStrategies = [
  {
    icon: Layers,
    name: "Active Asset Allocator",
    description: "Dynamic allocation across equity, debt, REITs/InVITs, and commodity derivatives with tactical short exposure.",
    characteristics: [
      "Dynamic investment across multiple asset classes",
      "Includes equity, debt, derivatives, REITs/InVITs",
      "Max. 25% short exposure via derivatives",
    ],
    redemption: "Twice weekly or lesser",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Scale,
    name: "Hybrid Long-Short Fund",
    description: "Balanced exposure to both equity and debt with strategic short positions across both asset classes.",
    characteristics: [
      "Min. 25% in equity instruments",
      "Min. 25% in debt instruments",
      "Max. 25% short exposure in equity & debt",
    ],
    redemption: "Twice weekly or lesser",
    color: "from-amber-500 to-orange-600",
  },
];

interface Strategy {
  icon: React.ElementType;
  name: string;
  description: string;
  characteristics: string[];
  redemption: string;
  color: string;
}

const StrategyCard = ({ strategy }: { strategy: Strategy }) => (
  <div className="glass-card overflow-hidden hover:shadow-lg transition-all duration-300 group">
    {/* Header with gradient */}
    <div className={`bg-gradient-to-r ${strategy.color} p-5`}>
      <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
        <strategy.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-white">{strategy.name}</h3>
    </div>
    
    {/* Body */}
    <div className="p-5">
      <p className="text-muted-foreground text-sm mb-4">
        {strategy.description}
      </p>
      
      {/* Characteristics */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
          Key Characteristics
        </p>
        <ul className="space-y-1.5">
          {strategy.characteristics.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Redemption</p>
            <p className="text-sm font-semibold text-foreground">{strategy.redemption}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Min. Investment</p>
            <p className="text-sm font-semibold text-primary">₹10 Lakhs</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StrategyExplainer = () => {
  return (
    <section id="strategies" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            SEBI Regulated Framework
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            SIF Investment Strategies
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            SEBI-approved investment strategies under the Specialized Investment Fund framework, offering sophisticated approaches previously available only to institutional investors.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-10 glass-card p-6 md:p-8">
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            How Long-Short Strategies Work
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Long Position</h4>
                <p className="text-sm text-muted-foreground">
                  Buy securities expected to rise in value. Profit when prices increase.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Short Position</h4>
                <p className="text-sm text-muted-foreground">
                  Take derivative positions to profit from declining prices. Max 25% exposure.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-foreground">
              <strong>The Result:</strong> By combining both positions, fund managers can generate returns in any market condition — 
              whether markets go up, down, or sideways. This reduces overall portfolio risk while seeking alpha.
            </p>
          </div>
        </div>

        {/* Strategy Sections */}
        <div className="space-y-12">
          {/* Equity Strategies */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Equity Strategies</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {equityStrategies.map((strategy, index) => (
                <StrategyCard key={index} strategy={strategy} />
              ))}
            </div>
          </div>

          {/* Debt Strategies */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Debt Strategies</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {debtStrategies.map((strategy, index) => (
                <StrategyCard key={index} strategy={strategy} />
              ))}
            </div>
          </div>

          {/* Hybrid Strategies */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Hybrid Strategies</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {hybridStrategies.map((strategy, index) => (
                <StrategyCard key={index} strategy={strategy} />
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center mt-10 max-w-3xl mx-auto">
          As per SEBI Circular No. SEBI/HO/IMD/IMD-PoD-1/P/CIR/2025/26 dated February 27, 2025. 
          Minimum investment threshold of ₹10 Lakhs across all SIF strategies (PAN level). 
          Investment in SIFs involves risks. Past performance is not indicative of future results.
        </p>
      </div>
    </section>
  );
};

export default StrategyExplainer;
