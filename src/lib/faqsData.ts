export interface FAQItem {
  id?: number;
  question: string;
  answer: string;
}

export const HOME_FAQS: FAQItem[] = [
  {
    id: 1,
    question: 'Why Should I Choose Muthoot Gold Point to Sell my Gold?',
    answer: 'We are a dedicated gold buying company – Built on science, not guesswork. With a legacy of over 133+ years, Muthoot Gold Point offers complete transparency, 100% accurate XRF scientific purity evaluation in front of you, and instant spot payment.',
  },
  {
    id: 2,
    question: 'How Much Do Gold Buyers Pay For Gold?',
    answer: 'Payout is calculated strictly based on live gold market rates, net weight measured on calibrated high-precision balances, and exact purity percentage analyzed via XRF technology. At Muthoot Gold Point, you get the maximum value for your gold with zero hidden deductions.',
  },
  {
    id: 3,
    question: 'How Is Valuation Done And How Long Does It Take?',
    answer: 'Valuation is conducted right in front of you using advanced X-Ray Fluorescence (XRF) machines that determine exact gold purity down to 0.01% without damaging your jewellery. Dirt and impurities are first ultrasonic cleaned, and the entire process takes less than 15 minutes.',
  },
  {
    id: 4,
    question: 'How Is Gold Price Per Gram Calculated?',
    answer: 'The price per gram is calculated by multiplying the current live market rate of gold by the net weight of pure gold contained in your ornament (factoring in the karat rating: 24K, 22K, 18K, etc.).',
  },
  {
    id: 5,
    question: 'Do I need any documents for selling my jewelry?',
    answer: 'Yes, as per Government regulations & RBI guidelines for gold transactions, customers must present a valid government-issued Photo ID (Aadhaar Card, PAN Card, Passport, or Voter ID) along with address proof.',
  },
  {
    id: 6,
    question: 'How quickly will I receive payment after valuation?',
    answer: 'Payment is processed immediately after you accept the valuation quote. For amounts up to ₹10,000, cash can be handed over instantly. For higher amounts, direct IMPS/NEFT transfer is credited directly into your bank account within minutes.',
  },
  {
    id: 7,
    question: 'Can I sell gold coins or gold bars at Muthoot Gold Point?',
    answer: 'Yes, we purchase all forms of gold including gold jewellery, scrap gold, gold coins, and gold bars regardless of quantity or condition.',
  },
  {
    id: 8,
    question: 'Can someone else sell my gold on my behalf?',
    answer: "The gold owner must be physically present with their original photo ID proof. If selling on behalf of a family member, an authorization letter along with both parties' ID proofs is required.",
  },
];
