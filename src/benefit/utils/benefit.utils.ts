import type { IconType } from "react-icons";
import { FaGift } from "react-icons/fa";
import type {
  BenefitResponseInterface,
  BenefitStudentResponseInterface,
  CreateBenefitInterface,
  AnyBenefit,
  BenefitVariant,
  Category,
  Color,
  Icon,
} from "../types/benefit.types";
import {
  BENEFIT_CATEGORIES,
  BENEFIT_COLOR_OPTIONS,
  BENEFIT_ICON_OPTIONS,
} from "../constants/benefit.constants";

// ============================================
// TYPE GUARDS ()
// ============================================

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

// ============================================
// ICON & COLOR UTILITIES
// ============================================

export const getIconByValue = (icon: Icon): IconType => {
  const selected = BENEFIT_ICON_OPTIONS.find((option) => option.value === icon);
  return selected ? selected.icon : FaGift;
};

export const getColorByValue = (color: Color): string | undefined => {
  const colorResult = BENEFIT_COLOR_OPTIONS.find((co) => co.value === color);
  return colorResult?.color;
};

// ============================================
// CATEGORY UTILITIES
// ============================================

export const getCategoryByValue = (
  category: Category
):
  | { value: Category; label: string; icon: IconType; color: string }
  | undefined => {
  return BENEFIT_CATEGORIES.find((cat) => cat.value === category);
};

export const getCategoryColor = (category: Category) => {
  const categoryConfig = BENEFIT_CATEGORIES.find(
    (cat) => cat.value === category
  );
  return categoryConfig
    ? { bg: categoryConfig.color, text: categoryConfig.textColor }
    : { bg: "#f3f4f6", text: "#374151" };
};

// ============================================
// DATE UTILITIES
// ============================================

export const formatBenefitDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// ============================================
// PURCHASE LIMIT UTILITIES
// ============================================

export const getPurchaseLimit = (benefit: AnyBenefit): number | null => {
  if (isStudentBenefit(benefit)) {
    return benefit.purchasesLeft;
  }
  if (isTeacherBenefit(benefit)) {
    return benefit.purchaseLimit;
  }
  return benefit.purchaseLimit;
};

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

export const formatPurchaseLimitText = (
  limit: number | null,
  variant: BenefitVariant
): string => {
  if (limit === null) {
    return "Sin límite de canjes";
  }

  if (variant === "student") {
    return `${limit} ${limit === 1 ? "disponible" : "disponibles"}`;
  }

  return `Puede canjearse hasta ${limit} ${limit > 1 ? "veces" : "vez"}`;
};

export const formatPurchaseLimitPerStudentText = (
  limit: number | null,
  variant: BenefitVariant
): string => {
  if (limit === null) {
    return "Sin límite por estudiante";
  }

  if (variant === "student") {
    return `${limit} ${limit === 1 ? "uso restante" : "usos restantes"}`;
  }

  return `Máx. ${limit} por estudiante`;
};

// ============================================
// CALCULATION UTILITIES
// ============================================

export const calculateUsagePercentage = (
  used: number,
  total: number
): number => {
  if (total === 0) return 0;
  return Math.min((used / total) * 100, 100);
};

// ============================================
// SUBJECT UTILITIES
// ============================================

export const extractUniqueSubjectsFromBenefits = (benefits: any[]) => {
  const subjectsMap = new Map(
    benefits.map((b) => [
      b.subjectId.toString(),
      { id: b.subjectId.toString(), name: b.subjectName },
    ])
  );

  return [
    { id: "ALL", name: "Todas las materias" },
    ...Array.from(subjectsMap.values()),
  ];
};

// ============================================
// AVAILABILITY UTILITIES
// ============================================

export const isBenefitAvailable = (benefit: any): boolean => {
  return benefit.state === "AVAILABLE" && benefit.purchasesLeft > 0;
};

export const canUseBenefit = (benefit: any): boolean => {
  return benefit.state === "PURCHASED" && benefit.purchasesLeftByStudent > 0;
};

export const getBenefitAvailabilityStatus = (benefit: any): string => {
  if (benefit.state === "EXPIRED") return "Vencido";
  if (benefit.state === "USE_REQUESTED") return "Uso solicitado";
  if (benefit.state === "PURCHASED") {
    if (benefit.purchasesLeftByStudent === 0) return "Sin usos disponibles";
    return `${benefit.purchasesLeftByStudent} uso${
      benefit.purchasesLeftByStudent > 1 ? "s" : ""
    } disponible${benefit.purchasesLeftByStudent > 1 ? "s" : ""}`;
  }
  if (benefit.purchasesLeft === 0) return "Agotado";
  return "Disponible";
};
