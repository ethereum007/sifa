import { Users, ArrowRight } from "lucide-react";
import { DISTRIBUTOR_WHATSAPP_GROUP } from "@/lib/whatsapp";

const DistributorNetworkBanner = () => {
  return (
    <section className="py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <a
          href={DISTRIBUTOR_WHATSAPP_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-border bg-card p-6 sm:p-8 hover:border-primary/30 transition-all duration-200 group"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Join Our Distributor Network
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Connect with 500+ MFDs & distributors. Get early access to SIF launches & exclusive insights.
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 text-primary font-semibold text-sm shrink-0 group-hover:gap-3 transition-all">
              Join Now <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
};

export default DistributorNetworkBanner;
