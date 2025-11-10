import type { IconType } from "react-icons";
import { FaGift } from "react-icons/fa";
import type {
  BenefitResponseInterface,
  BenefitStudentResponseInterface,
  BenefitPurchasedUsedResponse,
  CreateBenefitInterface,
  AnyBenefit,
  TeacherBenefitType,
  BenefitVariant,
  Category,
  Color,
  Icon,
  BenefitUseRequestedResponseInterface,
  BenefitPurchaseSimpleResponse,
} from "../types/benefit.types";
import {
  BENEFIT_CATEGORIES,
  BENEFIT_COLOR_OPTIONS,
  BENEFIT_ICON_OPTIONS,
} from "../constants/benefit.constants";

// ============================================
// TYPE GUARDS
// ============================================

export const isTeacherBenefit = (
  benefit: AnyBenefit | TeacherBenefitType
): benefit is BenefitResponseInterface => {
  return (
    "id" in benefit && "purchaseLimit" in benefit && "subjectDto" in benefit
  );
};

export const isStudentBenefit = (
  benefit: AnyBenefit | TeacherBenefitType
): benefit is BenefitStudentResponseInterface => {
  return (
    "id" in benefit &&
    "purchasesLeft" in benefit &&
    "state" in benefit &&
    "subjectId" in benefit &&
    !("subjectDto" in benefit) &&
    !("benefitId" in benefit)
  );
};

export const isCreateBenefit = (
  benefit: AnyBenefit
): benefit is CreateBenefitInterface => {
  return !("id" in benefit) && "name" in benefit;
};

export const isFullBenefitResponse = (
  benefit: any
): benefit is BenefitResponseInterface => {
  return (
    "id" in benefit &&
    "icon" in benefit &&
    "color" in benefit &&
    "category" in benefit &&
    "description" in benefit &&
    "name" in benefit &&
    !("benefitId" in benefit)
  );
};

export const isBenefitUseRequested = (
  benefit: any
): benefit is BenefitUseRequestedResponseInterface => {
  return (
    "id" in benefit &&
    "state" in benefit &&
    benefit.state === "USE_REQUESTED" &&
    "benefitId" in benefit &&
    "benefitName" in benefit &&
    "studentName" in benefit
  );
};

export const isBenefitPurchase = (
  benefit: any
): benefit is BenefitPurchaseSimpleResponse => {
  return (
    "benefitName" in benefit &&
    "benefitId" in benefit &&
    "studentName" in benefit &&
    "state" in benefit &&
    (benefit.state === "PURCHASED" ||
      benefit.state === "USE_REQUESTED" ||
      benefit.state === "USED")
  );
};

export const isBenefitPurchasedUsed = (
  benefit: any
): benefit is BenefitPurchasedUsedResponse => {
  return (
    "id" in benefit &&
    "state" in benefit &&
    benefit.state === "USED" &&
    "benefitId" in benefit &&
    "benefitName" in benefit &&
    "usedAt" in benefit &&
    !("name" in benefit)
  );
};

export const hasBenefitBasicProperties = (
  benefit: any
): benefit is
  | BenefitResponseInterface
  | BenefitStudentResponseInterface
  | CreateBenefitInterface => {
  return "name" in benefit && "description" in benefit && "cost" in benefit;
};

// ============================================
// ICON & COLOR UTILITIES
// ============================================

export const getIconByValue = (icon?: Icon): IconType => {
  if (!icon) return FaGift;
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

export const getPurchaseLimit = (
  benefit: AnyBenefit | TeacherBenefitType
): number | null => {
  if (isBenefitPurchase(benefit)) {
    return null;
  }
  if (isStudentBenefit(benefit)) {
    return benefit.purchasesLeft;
  }
  if (isTeacherBenefit(benefit)) {
    return benefit.purchaseLimit;
  }
  if (isBenefitUseRequested(benefit)) {
    return null;
  }

  // CreateBenefitInterface
  if ("purchaseLimit" in benefit) {
    return benefit.purchaseLimit ?? null;
  }

  return null;
};

export const getPurchaseLimitPerStudent = (
  benefit: AnyBenefit | TeacherBenefitType
): number | null => {
  if (isBenefitPurchase(benefit)) {
    return null;
  }
  if (isStudentBenefit(benefit)) {
    return benefit.purchasesLeftByStudent;
  }
  if (isTeacherBenefit(benefit)) {
    return benefit.purchaseLimitPerStudent;
  }
  if (isBenefitUseRequested(benefit)) {
    return null;
  }

  // CreateBenefitInterface
  if ("purchaseLimitPerStudent" in benefit) {
    return benefit.purchaseLimitPerStudent ?? null;
  }

  return null;
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
  const subjectsMap = new Map<string, { id: string; name: string }>();

  benefits.forEach((b) => {
    if (b.subjectId != null && b.subjectName) {
      const subjectId = b.subjectId.toString();
      if (!subjectsMap.has(subjectId)) {
        subjectsMap.set(subjectId, {
          id: subjectId,
          name: b.subjectName,
        });
      }
    }
  });

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

// ============================================
// BENEFIT REQUEST UTILITIES
// ============================================

export const getBenefitDisplayName = (benefit: TeacherBenefitType): string => {
  if (isBenefitUseRequested(benefit)) {
    return benefit.benefitName;
  }
  if (isBenefitPurchase(benefit)) {
    return benefit.benefitName;
  }
  return benefit.name;
};

export const getBenefitId = (benefit: TeacherBenefitType): number => {
  return benefit.id;
};

export const getActualBenefitId = (benefit: TeacherBenefitType): number => {
  if (isBenefitUseRequested(benefit)) {
    return benefit.benefitId;
  }
  if (isBenefitPurchase(benefit)) {
    return benefit.benefitId;
  }
  return benefit.id;
};

export const getBenefitSubjectName = (benefit: TeacherBenefitType): string => {
  if (isBenefitUseRequested(benefit)) {
    return benefit.subjectName;
  }
  if (isBenefitPurchase(benefit)) {
    return benefit.subjectName;
  }
  if ("subjectDto" in benefit) {
    return benefit.subjectDto.name;
  }
  return "";
};
