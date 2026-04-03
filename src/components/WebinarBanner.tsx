"use client";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const YOUTUBE_URL = "https://youtu.be/IoFsv9R0DTc?si=9ivzvUx4IELjM9k8";

const WebinarBanner = () => {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-r from-primary/5 via-secondary/50 to-primary/5 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-5 md:gap-8">
          {/* Thumbnail / Play icon area */}
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group shrink-0 w-full md:w-auto"
          >
            <div className="w-full md:w-56 h-32 rounded-xl bg-gradient-to-br from-foreground/90 to-foreground/70 border border-border/50 flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)] group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
              </div>
            </div>
          </a>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Featured Webinar
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-heading mb-1.5">
              Understanding SIFs: A Complete Guide
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Watch our in-depth webinar covering everything about Specialized Investment Funds — 
              strategies, regulations, and how to get started.
            </p>
            <Button
              variant="gold"
              size="sm"
              className="gap-2"
              onClick={() => window.open(YOUTUBE_URL, "_blank", "noopener,noreferrer")}
            >
              Watch on YouTube
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarBanner;
