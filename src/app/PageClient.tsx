"use client";

import { lazy, Suspense, memo } from "react";
import Hero from "@/components/Hero";




// Lazy load non-critical components
const Header = lazy(() => import("@/components/Header"));
const QuickActionButtons = lazy(() => import("@/components/QuickActionButtons"));
const DistributorNetworkBanner = lazy(() => import("@/components/DistributorNetworkBanner"));
const WebinarBanner = lazy(() => import("@/components/WebinarBanner"));
const NavTable = lazy(() => import("@/components/NavTable"));
const SifReturnsScorecard = lazy(() => import("@/components/SifReturnsScorecard"));
const SifAumSection = lazy(() => import("@/components/SifAumSection"));
const SifFundsCarousel = lazy(() => import("@/components/SifFundsCarousel"));
const PerformanceBanner = lazy(() => import("@/components/PerformanceBanner"));
const UpcomingSifsScroller = lazy(() => import("@/components/UpcomingSifsScroller"));
const TerComparison = lazy(() => import("@/components/TerComparison"));
const ComparisonTable = lazy(() => import("@/components/ComparisonTable"));
const SifFaqs = lazy(() => import("@/components/SifFaqs"));
const EarlyAccessForm = lazy(() => import("@/components/EarlyAccessForm"));
const Footer = lazy(() => import("@/components/Footer"));
const ReportPopup = lazy(() => import("@/components/ReportPopup"));


// Minimal header placeholder to prevent layout shift
const HeaderPlaceholder = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-border/50 shadow-sm h-16 lg:h-20" />
);

// Minimal loading fallback
const SectionLoader = () => (
  <div className="w-full py-8 flex justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const Index = memo(() => {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<HeaderPlaceholder />}>
        <Header />
      </Suspense>
      <main className="pt-16 lg:pt-20">
        <Suspense fallback={<SectionLoader />}>
          <PerformanceBanner />
        </Suspense>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <SifFundsCarousel />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <UpcomingSifsScroller />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <QuickActionButtons />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <DistributorNetworkBanner />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WebinarBanner />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SifReturnsScorecard />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SifAumSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <NavTable />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TerComparison />
          <ComparisonTable />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SifFaqs />
          <EarlyAccessForm />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <Suspense fallback={null}>
        <ReportPopup />
      </Suspense>
    </div>
  );
});

Index.displayName = "Index";

export default Index;
