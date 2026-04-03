import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISTRIBUTOR_WHATSAPP_GROUP } from "@/lib/whatsapp";

const DistributorNetworkBanner = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        <a
          href={DISTRIBUTOR_WHATSAPP_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl border-2 border-primary bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-6 sm:p-8 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.2)] transition-all duration-300 group"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary flex items-center justify-center shadow-[0_4px_20px_hsl(var(--primary)/0.3)] shrink-0">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  Join Our Distributor Network
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Connect with 500+ MFDs & distributors. Get early access to SIF launches & exclusive insights.
                </p>
              </div>
            </div>
            <Button
              variant="gold"
              size="lg"
              className="shrink-0 group-hover:scale-105 transition-transform"
              asChild
            >
              <span>
                Join Now
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </div>

          {/* Animated pulse ring */}
          <div className="absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 rounded-full bg-primary/5 animate-ping hidden sm:block pointer-events-none" />
        </a>
      </div>
    </section>
  );
};

export default DistributorNetworkBanner;
