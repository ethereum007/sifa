import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISTRIBUTOR_WHATSAPP_GROUP } from "@/lib/whatsapp";

const DistributorNetworkBanner = () => {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <a
          href={DISTRIBUTOR_WHATSAPP_GROUP}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-border bg-card p-8 sm:p-10 hover:border-primary/40 transition-all duration-200 group"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Join Our Distributor Network
                </h3>
                <p className="text-base text-muted-foreground mt-1">
                  Connect with 500+ MFDs & distributors. Get early access to SIF launches & exclusive insights.
                </p>
              </div>
            </div>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-5 shrink-0">
              Join Now <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </a>
      </div>
    </section>
  );
};

export default DistributorNetworkBanner;
