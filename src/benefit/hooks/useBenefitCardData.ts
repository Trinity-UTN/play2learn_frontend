import { useMemo } from "react";
import { FaGift } from "react-icons/fa";
import type {
  AnyBenefit,
  BenefitVariant,
  TeacherBenefitType,
} from "../types/benefit.types";
import { getSubjectColor } from "../../shared/constants/subject.constants";
import {
  getIconByValue,
  getColorByValue,
  getCategoryByValue,
  getCategoryColor,
  getPurchaseLimit,
  getPurchaseLimitPerStudent,
  isTeacherBenefit,
  isStudentBenefit,
  isFullBenefitResponse,
  hasBenefitBasicProperties,
  isBenefitUseRequested,
  getBenefitSubjectName,
} from "../utils/benefit.utils";
import { shouldShowBenefitStats } from "../utils/benefit.validation";

interface UseBenefitCardDataProps {
  benefit: AnyBenefit | TeacherBenefitType;
  variant: BenefitVariant;
  isPreview: boolean;
}

export const useBenefitCardData = ({
  benefit,
  variant,
  isPreview,
}: UseBenefitCardDataProps) => {
  const data = useMemo(() => {
    const isUseRequest = isBenefitUseRequested(benefit);

    // ============================================
    // CASO 1: Solicitud de uso (USE_REQUESTED)
    // ============================================
    if (isUseRequest) {
      const iconComponent = getIconByValue(benefit.benefitIcon);
      const iconColor = getColorByValue(benefit.benefitColor) ?? "#94a3b8";
      const category = getCategoryByValue(benefit.benefitCategory);
      const categoryColor = getCategoryColor(benefit.benefitCategory);

      const subjectName = benefit.subjectName;
      const subjectColor = getSubjectColor(subjectName);

      return {
        IconComponent: iconComponent,
        iconColor,
        category,
        styleSuffix: "Teacher",
        purchaseLimit: null,
        purchaseLimitPerStudent: null,
        hasEndDate: false,
        showStats: false,
        benefitName: benefit.benefitName,
        benefitCost: 0,
        descriptionText: "Solicitud de uso de beneficio",
        subjectName,
        subjectColor,
        categoryColor,
        hasFullProperties: true,
        hasBasicProperties: true,
        isUseRequest: true,
        studentName: benefit.studentName,
      };
    }

    // ============================================
    // CASO 2: Beneficios normales
    // ============================================
    const hasFullProperties = isFullBenefitResponse(benefit);
    const hasBasicProperties = hasBenefitBasicProperties(benefit);

    // Iconos y colores básicos
    const IconComponent = hasFullProperties
      ? getIconByValue(benefit.icon)
      : FaGift;
    const iconColor = hasFullProperties
      ? getColorByValue(benefit.color)
      : "#94a3b8";
    const category = hasFullProperties
      ? getCategoryByValue(benefit.category)
      : undefined;
    const styleSuffix = variant === "student" ? "Student" : "Teacher";

    // Límites de compra
    const purchaseLimit = getPurchaseLimit(benefit);
    const purchaseLimitPerStudent = getPurchaseLimitPerStudent(benefit);

    // Flags de visualización
    const hasEndDate =
      isTeacherBenefit(benefit) ||
      isStudentBenefit(benefit) ||
      ("endAt" in benefit && !!benefit.endAt);
    const showStats =
      variant === "teacher" ||
      (isStudentBenefit(benefit) && shouldShowBenefitStats(benefit));

    // Textos con Type Guards
    const benefitName = hasBasicProperties
      ? benefit.name
      : isPreview
      ? "Nombre del Beneficio"
      : "";

    const benefitCost = hasBasicProperties ? benefit.cost : 0;

    const descriptionText = hasBasicProperties
      ? benefit.description
      : isPreview
      ? "Descripción del beneficio aparecerá aquí..."
      : "";

    const subjectName = getBenefitSubjectName(benefit as TeacherBenefitType);
    const subjectColor = subjectName ? getSubjectColor(subjectName) : null;
    const categoryColor =
      hasFullProperties && benefit.category
        ? getCategoryColor(benefit.category)
        : { bg: "#f3f4f6", text: "#374151" };

    return {
      IconComponent,
      iconColor,
      category,
      styleSuffix,
      purchaseLimit,
      purchaseLimitPerStudent,
      hasEndDate,
      showStats,
      benefitName,
      benefitCost,
      descriptionText,
      subjectName,
      subjectColor,
      categoryColor,
      hasFullProperties,
      hasBasicProperties,
      isUseRequest: false,
      studentName: undefined,
    };
  }, [benefit, variant, isPreview]);

  return data;
};
