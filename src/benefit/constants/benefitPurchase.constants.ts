import { FaClock, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import type { IconType } from "react-icons";

export type BenefitPurchaseStatus = "PURCHASED" | "USE_REQUESTED" | "USED";

export interface BenefitPurchaseStatusFilter {
  key: BenefitPurchaseStatus;
  label: string;
  icon: IconType;
}

export const BENEFIT_PURCHASE_STATUS_FILTERS: BenefitPurchaseStatusFilter[] = [
  {
    key: "PURCHASED",
    label: "Canjeado",
    icon: FaShoppingCart,
  },
  {
    key: "USE_REQUESTED",
    label: "Uso Solicitado",
    icon: FaClock,
  },
  {
    key: "USED",
    label: "Usado",
    icon: FaCheckCircle,
  },
];

export const BENEFIT_PURCHASE_STATUS_LABELS: Record<string, string> = {
  PURCHASED: "Canjeado",
  USE_REQUESTED: "Uso Solicitado",
  USED: "Usado",
  EXPIRED: "Vencido",
};
