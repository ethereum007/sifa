"use client";

import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";



const SifReturnsScorecard = lazy(() => import("@/components/SifReturnsScorecard"));

const sifReturnsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "SIF Returns Scorecard – Feb 2026",
  "description": "Absolute returns (%) for India's Specialized Investment Funds (SIFs) as of 28-Feb-2026. Covers Hybrid Long Short, Equity Long Short, and Equity Ex-Top 100 categories.",
  "url": "https://sifa.lovable.app/sifreturns",
  "temporalCoverage": "2025-10/2026-02",
  "dateModified": "2026-02-28",
  "creator": {
    "@type": "Organization",
    "name": "SIFPrime",
    "url": "https://sifa.lovable.app"
  },
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "text/html",
    "contentUrl": "https://sifa.lovable.app/sifreturns"
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "SIF Fund Performance",
    "numberOfItems": 11,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "FinancialProduct",
          "name": "Altiva Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 24-Oct-25 | End NAV: ₹10.3894 | 1M Return: +0.79% | 3M Return: +2.64% | Since Inception: +3.79%"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "FinancialProduct",
          "name": "Magnum Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 29-Oct-25 | End NAV: ₹10.2146 | 1M Return: +0.92% | 3M Return: +0.76% | Since Inception: +1.78%"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "FinancialProduct",
          "name": "Titanium Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 17-Dec-25 | End NAV: ₹10.1052 | 1M Return: +1.70% | 3M Return: +1.02% | Since Inception: +1.02%"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "FinancialProduct",
          "name": "Arudha Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 04-Feb-26 | End NAV: ₹10.0780 | 1M Return: +0.44% | 3M Return: +0.44% | Since Inception: +0.44%"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "FinancialProduct",
          "name": "iSIF Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 05-Feb-26 | End NAV: ₹9.9585 | 1M Return: -0.59% | 3M Return: -0.59% | Since Inception: -0.59%"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "FinancialProduct",
          "name": "qSIF Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 20-Oct-25 | End NAV: ₹9.9368 | 1M Return: +0.58% | 3M Return: -0.88% | Since Inception: -0.82%"
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "FinancialProduct",
          "name": "qSIF Equity Long-Short",
          "category": "Equity Long Short",
          "description": "Inception: 08-Oct-25 | End NAV: ₹9.8056 | 1M Return: +1.23% | 3M Return: -2.93% | Since Inception: -2.00%"
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "FinancialProduct",
          "name": "DynaSIF Equity Long-Short",
          "category": "Equity Long Short",
          "description": "Inception: 27-Feb-26 | End NAV: ₹10.0072 | 1M Return: 0.00% | 3M Return: 0.00% | Since Inception: 0.00%"
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "FinancialProduct",
          "name": "Diviniti Equity Long-Short",
          "category": "Equity Long Short",
          "description": "Inception: 03-Dec-25 | End NAV: ₹977.6434 | 1M Return: -1.05% | 3M Return: -2.33% | Since Inception: -2.33%"
        }
      },
      {
        "@type": "ListItem",
        "position": 10,
        "item": {
          "@type": "FinancialProduct",
          "name": "iSIF Ex-Top 100 Long-Short",
          "category": "Equity Ex-Top 100",
          "description": "Inception: 05-Feb-26 | End NAV: ₹9.8700 | 1M Return: -1.20% | 3M Return: -1.20% | Since Inception: -1.20%"
        }
      },
      {
        "@type": "ListItem",
        "position": 11,
        "item": {
          "@type": "FinancialProduct",
          "name": "qSIF Ex-Top 100 Long-Short",
          "category": "Equity Ex-Top 100",
          "description": "Inception: 13-Nov-25 | End NAV: ₹9.3161 | 1M Return: -0.05% | 3M Return: -6.51% | Since Inception: -6.94%"
        }
      }
    ]
  }
};

const SifReturns = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 lg:pt-24">
        <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
          <SifReturnsScorecard />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default SifReturns;
