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
    <section className="py-6 sm:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={() => handleClick(action)}
              className="rounded-2xl border border-border bg-card p-5 sm:p-6 text-left hover:border-primary/40 transition-all duration-200 group"
            >
              <action.icon className="w-6 h-6 text-primary mb-3" />
              <p className="font-bold text-base text-foreground">{action.label}</p>
              <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionButtons;
