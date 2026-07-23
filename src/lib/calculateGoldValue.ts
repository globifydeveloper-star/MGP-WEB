/**
 * Reusable gold valuation logic, kept separate from any UI component so the
 * underlying business rules (how making charges/deductions are applied) can
 * change without touching the calculator UI.
 */

export interface GoldValueCalculationInput {
  ratePerGram: number;
  weightInGrams: number;
  makingChargesPerGram?: number;
  otherDeductions?: number;
}

export interface GoldValueCalculationResult {
  baseValue: number;
  makingCharges: number;
  otherDeductions: number;
  totalValue: number;
}

export function calculateGoldValue({
  ratePerGram,
  weightInGrams,
  makingChargesPerGram = 0,
  otherDeductions = 0,
}: GoldValueCalculationInput): GoldValueCalculationResult {
  const safeRate = Number.isFinite(ratePerGram) && ratePerGram > 0 ? ratePerGram : 0;
  const safeWeight = Number.isFinite(weightInGrams) && weightInGrams > 0 ? weightInGrams : 0;
  const safeMakingCharges = Number.isFinite(makingChargesPerGram) && makingChargesPerGram > 0 ? makingChargesPerGram : 0;
  const safeDeductions = Number.isFinite(otherDeductions) && otherDeductions > 0 ? otherDeductions : 0;

  const baseValue = safeRate * safeWeight;
  const makingCharges = safeMakingCharges * safeWeight;
  const totalValue = Math.max(0, baseValue + makingCharges - safeDeductions);

  return {
    baseValue,
    makingCharges,
    otherDeductions: safeDeductions,
    totalValue,
  };
}
