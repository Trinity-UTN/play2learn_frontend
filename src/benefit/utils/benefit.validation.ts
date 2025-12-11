import type { Wallet } from "@/admin";
import type {
  BenefitStudentResponseInterface,
  BenefitPurchaseValidation,
} from "../types/benefit.types";
import { BENEFIT_STATUS } from "../constants/benefit.constants";
import { formatPrice } from "@/shared";

// ============================================
// PURCHASE VALIDATION
// ============================================

export const validateBenefitPurchase = (
  benefit: BenefitStudentResponseInterface,
  wallet: Wallet | undefined
): BenefitPurchaseValidation => {
  // Validar que el beneficio esté disponible
  if (benefit.state !== BENEFIT_STATUS.AVAILABLE) {
    return {
      canPurchase: false,
      reason: "El beneficio no está disponible para compra",
    };
  }

  // Validar que haya compras disponibles para el estudiante
  if (benefit.purchasesLeftByStudent === 0) {
    return {
      canPurchase: false,
      reason: "Ya utilizaste todas tus compras disponibles para este beneficio",
    };
  }

  // Validar que el estudiante tenga suficientes monedas
  if (!wallet || wallet.balance < benefit.cost) {
    return {
      canPurchase: false,
      reason: `No tienes suficientes monedas líquidas. Necesitas ${
        benefit.cost
      } monedas líquidas pero solo tienes ${formatPrice(wallet?.balance) || 0}`,
    };
  }

  // Validar que haya compras disponibles en general (si hay límite)
  if (benefit.purchasesLeft !== null && benefit.purchasesLeft === 0) {
    return {
      canPurchase: false,
      reason: "No quedan canjes disponibles para este beneficio",
    };
  }

  return {
    canPurchase: true,
  };
};

// ============================================
// STATE CHECKS
// ============================================

export const canRequestBenefitUse = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.PURCHASED;
};

export const isUseRequested = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.USE_REQUESTED;
};

export const isExpired = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.EXPIRED;
};

export const shouldShowBenefitStats = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.AVAILABLE;
};
