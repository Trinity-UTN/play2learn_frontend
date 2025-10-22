import type {
  BenefitResponseInterface,
  BenefitStudentResponseInterface,
  CreateBenefitInterface,
} from "../../shared/types/Benefits.type";

export type BenefitCardVariant = "student" | "teacher";

export type AnyBenefit =
  | BenefitResponseInterface
  | BenefitStudentResponseInterface
  | CreateBenefitInterface;

/**
 * Type guard para saber si un beneficio es de estudiante o de docente
 */
export const isTeacherBenefit = (
  benefit: AnyBenefit
): benefit is BenefitResponseInterface => {
  return "id" in benefit && "purchaseLimit" in benefit;
};

export const isStudentBenefit = (
  benefit: AnyBenefit
): benefit is BenefitStudentResponseInterface => {
  return "id" in benefit && "purchasesLeft" in benefit;
};

export const isCreateBenefit = (
  benefit: AnyBenefit
): benefit is CreateBenefitInterface => {
  return !("id" in benefit);
};

/**
 * Obtiene el límite de canjes de un beneficio
 */
export const getPurchaseLimit = (benefit: AnyBenefit): number | null => {
  if (isStudentBenefit(benefit)) {
    return benefit.purchasesLeft;
  }
  if (isTeacherBenefit(benefit)) {
    return benefit.purchaseLimit;
  }
  return benefit.purchaseLimit;
};

/**
 * Obtiene el límite de canjes por estudiante de un beneficio
 */
export const getPurchaseLimitPerStudent = (
  benefit: AnyBenefit
): number | null => {
  if (isStudentBenefit(benefit)) {
    return benefit.purchasesLeftByStudent;
  }
  if (isTeacherBenefit(benefit)) {
    return benefit.purchaseLimitPerStudent;
  }
  return benefit.purchaseLimitPerStudent;
};

/**
 * Formato de texto para el límite de canjes
 */
export const formatPurchaseLimitText = (
  limit: number | null,
  variant: BenefitCardVariant
): string => {
  if (limit === null) {
    return "Sin límite de canjes";
  }

  if (variant === "student") {
    return `${limit} ${limit === 1 ? "disponible" : "disponibles"}`;
  }

  return `Puede canjearse hasta ${limit} ${limit > 1 ? "veces" : "vez"}`;
};

/**
 * Formato de texto para el límite de canjes por estudiante
 */
export const formatPurchaseLimitPerStudentText = (
  limit: number | null,
  variant: BenefitCardVariant
): string => {
  if (limit === null) {
    return "Sin límite por estudiante";
  }

  if (variant === "student") {
    return `${limit} ${limit === 1 ? "uso restante" : "usos restantes"}`;
  }

  return `Máx. ${limit} por estudiante`;
};
