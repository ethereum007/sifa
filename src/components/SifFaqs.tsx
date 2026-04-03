import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "What is a Specialized Investment Fund (SIF)?",
    answer:
      "A SIF is a new investment product framework introduced by SEBI to bridge the gap between Mutual Funds and Portfolio Management Services (PMS). It combines the ease of mutual funds with more advanced strategies typically found in PMS/AIFs, offering long-short strategies using derivatives.",
  },
  {
    question: "What is the minimum investment required for SIF?",
    answer:
      "The minimum aggregate investment is ₹10,00,000 (₹10 lakhs) at the PAN level across all SIF strategies offered by an AMC. Accredited investors are exempt from this threshold. Investments can be made via lumpsum, and after meeting the threshold, SIP/STP/SWP are also available.",
  },
  {
    question: "What types of investment strategies are allowed under SIF?",
    answer:
      "SIF allows investment strategies across three broad categories: (1) Equity-Oriented (Equity Long-Short, Equity Ex-Top 100 Long-Short, Sector Rotation Long-Short), (2) Debt-Oriented (Debt Long-Short, Sectoral Debt Long-Short), and (3) Hybrid (Active Asset Allocator Long-Short, Hybrid Long-Short Fund). Each category includes long-short strategies using equity, debt, and derivative instruments.",
  },
  {
    question: "How is SIF different from Mutual Funds?",
    answer:
      "While Mutual Funds can only use derivatives for hedging, SIFs can take unhedged short positions up to 25% of net assets. This allows SIF managers to potentially profit from both rising and falling markets. SIFs also have a higher minimum investment (₹10 lakhs vs ₹500 for MFs) but retain MF-like taxation benefits.",
  },
  {
    question: "What is the taxation in SIF?",
    answer:
      "Taxation in SIFs is aligned with Mutual Fund taxation. Equity strategies: 12.5% LTCG (after 12 months), 20% STCG. Debt strategies: taxed as per investor's slab rate. Hybrid strategies (with <65% in equity/debt, 12-month horizon): 12.5% LTCG, STCG as per slab. Fund-level taxation is nil under Section 10(23D).",
  },
  {
    question: "Are there limits on short exposure for SIF strategies?",
    answer:
      "Yes. Across all strategies, unhedged short exposure through exchange-traded derivatives is capped at 25% of net assets. This can be used for portfolio enhancement and risk management, in addition to regular hedging activities.",
  },
  {
    question: "What is the subscription and redemption frequency?",
    answer:
      "The frequency varies by strategy type: Equity strategies offer daily or lesser frequency, Debt strategies offer weekly or lesser, and Hybrid strategies offer twice a week or lesser. Subscription and redemption frequencies may differ for the same strategy.",
  },
  {
    question: "Can I invest through SIP in SIF?",
    answer:
      "Yes, but only after meeting the initial ₹10 lakh threshold via lumpsum. The minimum SIP amount is typically ₹5,000-₹10,000 depending on the AMC. SIP frequencies available include daily, weekly, and monthly options.",
  },
  {
    question: "What happens if my investment value falls below ₹10 lakhs?",
    answer:
      "If the fall is due to market movements (passive breach), you may only redeem the entire remaining amount—no partial redemptions allowed. If it's due to your own transactions (active breach), your units will be frozen and you'll have 30 days to rebalance. Failure to do so results in automatic redemption.",
  },
  {
    question: "Do I need a separate folio for SIF?",
    answer:
      "Yes. As per SEBI regulations, a separate folio must be created for SIF investments, even if you already hold a Mutual Fund folio with the same AMC. However, KYC/AML/FATCA details can be shared since they are PAN-based.",
  },
  {
    question: "What are the risks involved in SIF?",
    answer:
      "Risk levels vary by strategy. Equity strategies carry higher risk including market volatility and concentration risk. Debt strategies face interest rate and credit risks. Derivatives add risks like price volatility and limited liquidity. The 25% short exposure cap may elevate risk if not managed prudently.",
  },
  {
    question: "How long should I stay invested in SIF?",
    answer:
      "The appropriate horizon depends on the strategy and your risk appetite. Short-term investors should consider a minimum of 2 years. Medium-term goals suit a 2-5 year horizon. Long-term investors should ideally remain invested for over 5 years to fully benefit from the strategy.",
  },
];

const SifFaqs = () => {
  return (
    <section id="faqs" className="py-8 sm:py-16 bg-background">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-xs sm:text-sm font-medium text-primary uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto px-2">
            Common questions about Specialized Investment Funds answered
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {FAQ_ITEMS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-4 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Source: Information compiled from official SIF websites including Quant SIF, Edelweiss Altiva, 
          ITI Diviniti, SBI Magnum SIF, and Tata Titanium SIF. Please refer to official scheme documents for complete details.
        </p>
      </div>
    </section>
  );
};

export default SifFaqs;
