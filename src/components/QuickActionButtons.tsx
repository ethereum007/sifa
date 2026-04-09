"use client";
import { TrendingUp, FileText, BarChart3, PiggyBank } from "lucide-react";

const actions = [
  { icon: TrendingUp, label: "Latest NAV", description: "Real-time fund values", href: "#nav", isExternal: false },
  { icon: FileText, label: "SIF Explained", description: "What is SIF?", href: "/specialized-investment-fund-sif", isExternal: true },
  { icon: BarChart3, label: "Strategies", description: "Long-Short & Hybrid", href: "/sif-strategies", isExternal: true },
  { icon: PiggyBank, label: "TER Comparison", description: "Expense ratios", href: "#ter", isExternal: false },
];

const QuickActionButtons = () => {
  const handleClick = (action: typeof actions[0]) => {
    if (action.isExternal) {
      window.location.href = action.href;
    } else {
      const el = document.querySelector(action.href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-4 sm:py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleClick(action)}
              className="rounded-xl border border-border bg-card p-4 text-left hover:border-primary/30 transition-all duration-200 group"
            >
              <action.icon className="w-5 h-5 text-primary mb-2" />
              <p className="font-semibold text-sm text-foreground">{action.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionButtons;
