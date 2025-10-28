import { FaClock, FaShoppingCart } from "react-icons/fa";
import type { IconType } from "react-icons";

export type BenefitPurchaseStatus = "ALL" | "USE_REQUESTED" | "PURCHASED";

export interface BenefitPurchaseStatusFilter {
  key: BenefitPurchaseStatus;
  label: string;
  icon: IconType;
}

export const BENEFIT_PURCHASE_STATUS_FILTERS: BenefitPurchaseStatusFilter[] = [
  {
    key: "ALL",
    label: "Todos",
    icon: FaShoppingCart,
  },
  {
    key: "USE_REQUESTED",
    label: "Uso Solicitado",
    icon: FaClock,
  },
];

export const BENEFIT_PURCHASE_STATUS_LABELS: Record<string, string> = {
  PURCHASED: "Canjeado",
  USE_REQUESTED: "Uso Solicitado",
  USED: "Usado",
  EXPIRED: "Vencido",
};
