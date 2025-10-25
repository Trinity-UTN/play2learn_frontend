import { useMemo } from "react";
import type { AnyBenefit, BenefitVariant } from "../types/benefit.types";
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
} from "../utils/benefit.utils";
import { shouldShowBenefitStats } from "../utils/benefit.validation";

interface UseBenefitCardDataProps {
  benefit: AnyBenefit;
  variant: BenefitVariant;
  isPreview: boolean;
}

export const useBenefitCardData = ({
  benefit,
  variant,
  isPreview,
}: UseBenefitCardDataProps) => {
  const data = useMemo(() => {
    // Iconos y colores básicos
    const IconComponent = getIconByValue(benefit.icon);
    const iconColor = getColorByValue(benefit.color);
    const category = getCategoryByValue(benefit.category);
    const styleSuffix = variant === "student" ? "Student" : "Teacher";

    // Límites de compra
    const purchaseLimit = getPurchaseLimit(benefit);
    const purchaseLimitPerStudent = getPurchaseLimitPerStudent(benefit);

    // Flags de visualización
    const hasEndDate =
      isTeacherBenefit(benefit) || isStudentBenefit(benefit) || benefit.endAt;
    const showStats =
      variant === "teacher" ||
      (isStudentBenefit(benefit) && shouldShowBenefitStats(benefit));

    // Textos
    const descriptionText =
      benefit.description ||
      (isPreview ? "Descripción del beneficio aparecerá aquí..." : "");

    // Subject name según tipo de benefit
    const getSubjectName = () => {
      if ("subjectDto" in benefit) {
        return benefit.subjectDto?.name;
      }
      if ("subjectName" in benefit) {
        return benefit.subjectName;
      }
      return null;
    };

    const subjectName = getSubjectName();
    const subjectColor = subjectName ? getSubjectColor(subjectName) : null;
    const categoryColor = benefit.category
      ? getCategoryColor(benefit.category)
      : null;

    return {
      IconComponent,
      iconColor,
      category,
      styleSuffix,
      purchaseLimit,
      purchaseLimitPerStudent,
      hasEndDate,
      showStats,
      descriptionText,
      subjectName,
      subjectColor,
      categoryColor,
    };
  }, [benefit, variant, isPreview]);

  return data;
};
