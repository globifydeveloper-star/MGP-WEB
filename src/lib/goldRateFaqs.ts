/**
 * FAQ content for the /gold-rate page. Shared between the accordion UI and
 * the FAQPage JSON-LD schema so the two never drift out of sync.
 */

export interface GoldRateFaq {
  question: string;
  answer: string;
}

export const GOLD_RATE_FAQS: GoldRateFaq[] = [
  {
    question: "What is today's gold rate?",
    answer:
      "The rate shown at the top of this page is our indicative rate for 24K (999) gold per gram, updated through the day. Rates for 22K and 18K gold are shown alongside it in the purity cards below.",
  },
  {
    question: 'How often is the gold rate updated?',
    answer:
      'Gold rates are tracked through the trading day and revised whenever the underlying market price moves, so the figure you see reflects the latest available update at Gold Point.',
  },
  {
    question: 'Which gold purity is used to calculate the value?',
    answer:
      'We publish rates for 24K (999), 22K (916) and 18K (750) gold. The purity of your specific item is confirmed at the branch and that verified purity is what your final value is based on.',
  },
  {
    question: 'How is my gold value calculated?',
    answer:
      'Your estimated value is the applicable gold rate per gram multiplied by the verified weight of your gold, adjusted for any making charges or deductions relevant to your item.',
  },
  {
    question: 'Does the gold rate include making charges?',
    answer:
      'No. The published gold rate reflects only the value of the gold itself. Making charges and any other deductions are calculated separately and shown transparently before you accept an offer.',
  },
  {
    question: 'Can I sell my gold at Gold Point?',
    answer:
      'Yes. Bring your gold to any Gold Point branch for a free, transparent valuation using our scientific purity testing process, and receive payment the same day.',
  },
  {
    question: 'How is the purity of gold verified?',
    answer:
      'We use scientific testing methods to determine the exact purity of your gold in front of you at the branch, rather than relying on estimates or touchstone testing alone.',
  },
  {
    question: 'Do I need any documents to sell my gold?',
    answer:
      'Yes, a valid government-issued photo ID is required to sell gold at any Gold Point branch, in line with standard regulatory requirements for gold buying transactions.',
  },
];
