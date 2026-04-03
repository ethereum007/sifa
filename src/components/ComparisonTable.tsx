import { Check, X, Minus } from "lucide-react";

const ComparisonTable = () => {
  const features = [
    {
      name: "Minimum Investment",
      sif: "₹10 Lakh",
      mf: "₹100",
      pms: "₹50 Lakh",
      aif: "₹1 Crore",
    },
    {
      name: "Investor Type",
      sif: "HNI",
      mf: "Retail / HNI",
      pms: "HNI",
      aif: "Ultra HNI",
    },
    {
      name: "STCG (< 12m)",
      sif: "20% / Slab",
      mf: "20% / Slab",
      pms: "Per Transaction",
      aif: "Category Dep.",
    },
    {
      name: "LTCG (> 12m)",
      sif: "12.5% / Slab",
      mf: "12.5% / Slab",
      pms: "Per Transaction",
      aif: "Category Dep.",
    },
    {
      name: "Derivatives",
      sif: "25% + Hedging",
      mf: "Only Hedging",
      pms: "Only Hedging",
      aif: "Allowed",
    },
    {
      name: "SEBI Regulated",
      sif: true,
      mf: true,
      pms: true,
      aif: true,
    },
    {
      name: "Short Selling",
      sif: true,
      mf: false,
      pms: false,
      aif: true,
    },
    {
      name: "Flexibility",
      sif: "High",
      mf: "Low",
      pms: "High",
      aif: "Very High",
    },
  ];

  const renderValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-success mx-auto" />
      ) : (
        <X className="w-5 h-5 text-destructive mx-auto" />
      );
    }
    return value;
  };

  return (
    <section id="compare" className="py-10 sm:py-20 lg:py-32">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-12 lg:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Compare Options
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            SIF vs MF vs PMS vs AIF
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto px-2">
            Compare across key features to find what suits your investment goals
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
          <div className="min-w-[600px] sm:min-w-[800px]">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-4 mb-2 sm:mb-4">
              <div className="p-2 sm:p-4">
                <span className="text-muted-foreground font-medium text-xs sm:text-base">Feature</span>
              </div>
              <div className="glass-card p-2 sm:p-4 text-center border-primary/50 bg-primary/5">
                <span className="text-primary font-bold text-sm sm:text-lg">SIF</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Recommended</p>
              </div>
              <div className="glass-card p-2 sm:p-4 text-center">
                <span className="text-foreground font-bold text-sm sm:text-lg">MF</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Mutual Fund</p>
              </div>
              <div className="glass-card p-2 sm:p-4 text-center">
                <span className="text-foreground font-bold text-sm sm:text-lg">PMS</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Portfolio Mgmt</p>
              </div>
              <div className="glass-card p-2 sm:p-4 text-center">
                <span className="text-foreground font-bold text-sm sm:text-lg">AIF</span>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Alt Investment</p>
              </div>
            </div>

            {/* Table Body */}
            <div className="space-y-1 sm:space-y-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-1.5 sm:gap-4 group hover:bg-secondary/30 rounded-lg transition-colors"
                >
                  <div className="p-2 sm:p-4 flex items-center">
                    <span className="text-foreground font-medium text-[10px] sm:text-sm">
                      {feature.name}
                    </span>
                  </div>
                  <div className="p-2 sm:p-4 text-center glass-card border-primary/20 bg-primary/5">
                    <span className="text-foreground font-semibold text-[10px] sm:text-sm">
                      {renderValue(feature.sif)}
                    </span>
                  </div>
                  <div className="p-2 sm:p-4 text-center glass-card">
                    <span className="text-muted-foreground text-[10px] sm:text-sm">
                      {renderValue(feature.mf)}
                    </span>
                  </div>
                  <div className="p-2 sm:p-4 text-center glass-card">
                    <span className="text-muted-foreground text-[10px] sm:text-sm">
                      {renderValue(feature.pms)}
                    </span>
                  </div>
                  <div className="p-2 sm:p-4 text-center glass-card">
                    <span className="text-muted-foreground text-[10px] sm:text-sm">
                      {renderValue(feature.aif)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
