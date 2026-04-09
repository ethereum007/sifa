"use client";
import { Play, ExternalLink } from "lucide-react";

const YOUTUBE_URL = "https://youtu.be/IoFsv9R0DTc?si=9ivzvUx4IELjM9k8";

const WebinarBanner = () => {
  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Thumbnail */}
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group shrink-0"
            >
              <div className="w-full md:w-48 h-28 rounded-lg bg-foreground/5 border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Play className="w-5 h-5 text-primary ml-0.5" fill="currentColor" />
                </div>
              </div>
            </a>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                Featured Webinar
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-1.5">
                Understanding SIFs: A Complete Guide
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Watch our in-depth webinar covering everything about Specialized Investment Funds —
                strategies, regulations, and how to get started.
              </p>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebinarBanner;
