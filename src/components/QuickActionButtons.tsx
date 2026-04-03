"use client";
import { TrendingUp, FileText, BarChart3, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: TrendingUp,
    label: "Latest NAV",
    description: "Real-time fund values",
    href: "#nav",
    isExternal: false,
  },
  {
    icon: FileText,
    label: "SIF Explained",
    description: "What is SIF?",
    href: "/specialized-investment-fund-sif",
    isExternal: true,
  },
  {
    icon: BarChart3,
    label: "Investment Strategies",
    description: "Long-Short & Hybrid",
    href: "/sif-strategies",
    isExternal: true,
  },
  {
    icon: PiggyBank,
    label: "TER Comparison",
    description: "Expense ratios",
    href: "#ter",
    isExternal: false,
  },
];

const QuickActionButtons = () => {
  const handleClick = (action: typeof actions[0]) => {
    if (action.isExternal) {
      window.location.href = action.href;
    } else {
      const element = document.querySelector(action.href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section className="py-4 sm:py-8 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto py-3 sm:py-4 px-2 sm:px-4 flex flex-col items-center gap-1.5 sm:gap-2 bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
              onClick={() => handleClick(action)}
            >
              <action.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              <div className="text-center">
                <p className="font-semibold text-xs sm:text-sm">{action.label}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                  {action.description}
                </p>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActionButtons;
