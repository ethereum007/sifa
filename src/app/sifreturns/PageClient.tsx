"use client";
import dynamic from "next/dynamic";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavJourneyChart from "@/components/NavJourneyChartLazy";
import MonthlyHeatmap from "@/components/MonthlyHeatmap";
import { sifFunds, getHybridFunds } from "@/lib/sifData";
import Link from "next/link";



const SifReturnsScorecard = dynamic(() => import("@/components/SifReturnsScorecard"));

const sifReturnsJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "SIF Returns Scorecard – April 2026",
  "description": "Absolute returns (%) for India's Specialized Investment Funds (SIFs) as of 30-Apr-2026. Covers Hybrid Long Short, Equity Long Short, and Equity Ex-Top 100 categories.",
  "url": "https://sifa.lovable.app/sifreturns",
  "temporalCoverage": "2025-10/2026-04",
  "dateModified": "2026-04-30",
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
          "description": "Inception: 24-Oct-25 | End NAV: ₹10.5455 | 1M Return: +3.17% | 3M Return: +2.32% | Since Inception: +5.35%"
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "FinancialProduct",
          "name": "Magnum Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 29-Oct-25 | End NAV: ₹10.2218 | 1M Return: +2.28% | 3M Return: +0.84% | Since Inception: +1.85%"
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "FinancialProduct",
          "name": "Titanium Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 17-Dec-25 | End NAV: ₹9.9291 | 1M Return: +5.51% | 3M Return: -0.35% | Since Inception: -0.74%"
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "FinancialProduct",
          "name": "Arudha Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 04-Feb-26 | End NAV: ₹10.1290 | 1M Return: +0.38% | Since Inception: +0.95%"
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "FinancialProduct",
          "name": "iSIF Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 05-Feb-26 | End NAV: ₹9.9185 | 1M Return: +7.45% | Since Inception: -0.99%"
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "FinancialProduct",
          "name": "qSIF Hybrid Long-Short",
          "category": "Hybrid Long Short",
          "description": "Inception: 20-Oct-25 | End NAV: ₹10.5297 | 1M Return: +6.94% | 3M Return: +6.48% | Since Inception: +5.10%"
        }
      },
      {
        "@type": "ListItem",
        "position": 7,
        "item": {
          "@type": "FinancialProduct",
          "name": "qSIF Equity Long-Short",
          "category": "Equity Long Short",
          "description": "Inception: 08-Oct-25 | End NAV: ₹10.1492 | 1M Return: +13.68% | 3M Return: +4.35% | Since Inception: +1.44%"
        }
      },
      {
        "@type": "ListItem",
        "position": 8,
        "item": {
          "@type": "FinancialProduct",
          "name": "DynaSIF Equity Long-Short",
          "category": "Equity Long Short",
          "description": "Inception: 27-Feb-26 | End NAV: ₹10.1990 | 1M Return: +6.59% | Since Inception: +1.92%"
        }
      },
      {
        "@type": "ListItem",
        "position": 9,
        "item": {
          "@type": "FinancialProduct",
          "name": "Diviniti Equity Long-Short",
          "category": "Equity Long Short",
          "description": "Inception: 03-Dec-25 | End NAV: ₹955.1524 | 1M Return: +0.71% | 3M Return: -3.64% | Since Inception: -4.58%"
        }
      },
      {
        "@type": "ListItem",
        "position": 10,
        "item": {
          "@type": "FinancialProduct",
          "name": "iSIF Ex-Top 100 Long-Short",
          "category": "Equity Ex-Top 100",
          "description": "Inception: 05-Feb-26 | End NAV: ₹9.8200 | 1M Return: +8.87% | Since Inception: -1.70%"
        }
      },
      {
        "@type": "ListItem",
        "position": 11,
        "item": {
          "@type": "FinancialProduct",
          "name": "qSIF Ex-Top 100 Long-Short",
          "category": "Equity Ex-Top 100",
          "description": "Inception: 13-Nov-25 | End NAV: ₹9.9324 | 1M Return: +15.38% | 3M Return: +5.65% | Since Inception: -0.79%"
        }
      }
    ]
  }
};

const SifReturns = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <SifReturnsScorecard />
      </Suspense>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <NavJourneyChart funds={sifFunds} showNifty={true} height={400} />
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <MonthlyHeatmap funds={sifFunds} showNifty={true} mode="all" />
        </div>
      </section>
    </>
  );
};

export default SifReturns;
