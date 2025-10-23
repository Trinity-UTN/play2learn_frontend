import type { BenefitStudentResponseInterface } from "../../shared/types/Benefits.type";
import type { Wallet } from "../../admin/services/student/StudentService";
import { BENEFIT_STATUS } from "../constants/benefitStudent.constants";

export interface BenefitPurchaseValidation {
  canPurchase: boolean;
  reason?: string;
}

/**
 * Valida si un estudiante puede comprar un beneficio
 */
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
  if (!wallet || wallet.totalBalance < benefit.cost) {
    return {
      canPurchase: false,
      reason: `No tienes suficientes monedas. Necesitas ${
        benefit.cost
      } monedas pero solo tienes ${wallet?.totalBalance || 0}`,
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

/**
 * Verifica si un beneficio puede ser usado (solicitar uso)
 */
export const canRequestBenefitUse = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.PURCHASED;
};

/**
 * Verifica si un beneficio está en estado de uso solicitado
 */
export const isUseRequested = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.USE_REQUESTED;
};

/**
 * Verifica si un beneficio está vencido
 */
export const isExpired = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.EXPIRED;
};

/**
 * Verifica si se deben mostrar las estadísticas del beneficio
 * Solo se muestran cuando el beneficio está disponible
 */
export const shouldShowBenefitStats = (
  benefit: BenefitStudentResponseInterface
): boolean => {
  return benefit.state === BENEFIT_STATUS.AVAILABLE;
};
