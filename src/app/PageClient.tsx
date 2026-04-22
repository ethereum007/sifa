"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Use next/dynamic instead of React.lazy for SSR support
const NfoBannerTop = dynamic(() => import("@/components/NfoBannerTop"), { ssr: true });
const Header = dynamic(() => import("@/components/Header"), { ssr: true });
const QuickActionButtons = dynamic(() => import("@/components/QuickActionButtons"), { ssr: true });
const DistributorNetworkBanner = dynamic(() => import("@/components/DistributorNetworkBanner"), { ssr: true });
const WebinarBanner = dynamic(() => import("@/components/WebinarBanner"), { ssr: true });
const NavTable = dynamic(() => import("@/components/NavTable"), { ssr: true });
const SifReturnsScorecard = dynamic(() => import("@/components/SifReturnsScorecard"), { ssr: true });
const SifAumSection = dynamic(() => import("@/components/SifAumSection"), { ssr: true });
const SifFundsCarousel = dynamic(() => import("@/components/SifFundsCarousel"), { ssr: true });
const SifDirectoryTable = dynamic(() => import("@/components/SifDirectoryTable"), { ssr: true });
const PerformanceBanner = dynamic(() => import("@/components/PerformanceBanner"), { ssr: true });
const UpcomingSifsScroller = dynamic(() => import("@/components/UpcomingSifsScroller"), { ssr: true });
const TerComparison = dynamic(() => import("@/components/TerComparison"), { ssr: true });
const ComparisonTable = dynamic(() => import("@/components/ComparisonTable"), { ssr: true });
const SifFaqs = dynamic(() => import("@/components/SifFaqs"), { ssr: true });
const EarlyAccessForm = dynamic(() => import("@/components/EarlyAccessForm"), { ssr: true });
const MarketConditionsWidget = dynamic(() => import("@/components/MarketConditionsWidget"), { ssr: true });
const AlphaShieldLeaderboard = dynamic(() => import("@/components/AlphaShieldLeaderboard"), { ssr: true });
const PartnerCTA = dynamic(() => import("@/components/PartnerCTA"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
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
