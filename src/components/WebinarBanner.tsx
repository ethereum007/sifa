"use client";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const YOUTUBE_URL = "https://youtu.be/IoFsv9R0DTc?si=9ivzvUx4IELjM9k8";

const WebinarBanner = () => {
  return (
    <section className="py-10 sm:py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-8 sm:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Thumbnail */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group shrink-0"
            >
              <div className="w-full md:w-56 h-32 rounded-xl bg-foreground/5 border border-border flex items-center justify-center group-hover:border-primary/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-6 h-6 text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
            </a>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                Featured Webinar
              </p>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Understanding SIFs: A Complete Guide
              </h3>
              <p className="text-base text-muted-foreground mb-5">
                Watch our in-depth webinar covering everything about Specialized Investment Funds —
                strategies, regulations, and how to get started.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-6"
                onClick={() => window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer")}
              >
                Watch on YouTube <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarBanner;
