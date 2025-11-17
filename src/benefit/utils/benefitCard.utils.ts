import { BENEFIT_PURCHASE_STATE_CONFIG } from "../constants/benefitCard.constants";
import type { BenefitPurchaseStatus } from "../../benefit/constants/benefitPurchase.constants";

/**
 * Devuelve la configuración visual de un estado de canje
 */
export const getPurchaseStateConfig = (state?: BenefitPurchaseStatus) => {
  if (!state) return BENEFIT_PURCHASE_STATE_CONFIG.DEFAULT;
  return (
    BENEFIT_PURCHASE_STATE_CONFIG[state] ??
    BENEFIT_PURCHASE_STATE_CONFIG.DEFAULT
  );
};
