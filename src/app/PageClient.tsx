"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// SSR=true: SEO-critical content (text, fund data, FAQs, schema-bearing tables).
// SSR=false: interactive widgets, banners, forms, popups — render after hydration.
const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"), { ssr: true });
const Header = dynamic(() => import("@/components/Header"), { ssr: true });
const PerformanceBanner = dynamic(() => import("@/components/PerformanceBanner"), { ssr: true });
const SifDirectoryTable = dynamic(() => import("@/components/SifDirectoryTable"), { ssr: true });
const SifReturnsScorecard = dynamic(() => import("@/components/SifReturnsScorecard"), { ssr: true });
const ComparisonTable = dynamic(() => import("@/components/ComparisonTable"), { ssr: true });
const SifFaqs = dynamic(() => import("@/components/SifFaqs"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

// Below-fold interactive widgets — defer to hydration to cut initial HTML size
const QuickActionButtons = dynamic(() => import("@/components/QuickActionButtons"), { ssr: false });
const DistributorNetworkBanner = dynamic(() => import("@/components/DistributorNetworkBanner"), { ssr: false });
const WebinarBanner = dynamic(() => import("@/components/WebinarBanner"), { ssr: false });
const NavTable = dynamic(() => import("@/components/NavTable"), { ssr: false });
const SifAumSection = dynamic(() => import("@/components/SifAumSection"), { ssr: false });
const SifFundsCarousel = dynamic(() => import("@/components/SifFundsCarousel"), { ssr: false });
const UpcomingSifsScroller = dynamic(() => import("@/components/UpcomingSifsScroller"), { ssr: false });
const TerComparison = dynamic(() => import("@/components/TerComparison"), { ssr: false });
const EarlyAccessForm = dynamic(() => import("@/components/EarlyAccessForm"), { ssr: false });
const MarketConditionsWidget = dynamic(() => import("@/components/MarketConditionsWidget"), { ssr: false });
const AlphaShieldLeaderboard = dynamic(() => import("@/components/AlphaShieldLeaderboard"), { ssr: false });
const PartnerCTA = dynamic(() => import("@/components/PartnerCTA"), { ssr: false });
const ReportPopup = dynamic(() => import("@/components/ReportPopup"), { ssr: false });
const ExitIntentPopup = dynamic(() => import("@/components/ExitIntentPopup"), { ssr: false });

const Index = memo(() => {
  return (
    <div className="min-h-screen bg-background">
      <NfoBannerTop />
      <Header />
      <main className="pt-[104px] lg:pt-[120px]">
        <Hero />
        <PerformanceBanner />
        {/* <MarketConditionsWidget /> */}
        <SifDirectoryTable />
        <SifFundsCarousel />
        <UpcomingSifsScroller />
        <QuickActionButtons />
        <DistributorNetworkBanner />
        <WebinarBanner />
        <SifReturnsScorecard />
        <SifAumSection />
        <AlphaShieldLeaderboard />
        <NavTable />
        <TerComparison />
        <ComparisonTable />
        <SifFaqs />
        <PartnerCTA />
        <EarlyAccessForm />
      </main>
      <Footer />
      <ReportPopup />
      <ExitIntentPopup />
    </div>
  );
});

Index.displayName = "Index";

export default Index;
