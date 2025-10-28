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
  isStudentBenefit,
  getCategoryColor,
  isFullBenefitResponse,
  hasBenefitBasicProperties,
} from "../utils/benefit.utils";
import { shouldShowBenefitStats } from "../utils/benefit.validation";

interface UseBenefitTableDataProps {
  benefit: AnyBenefit | TeacherBenefitType;
  variant: BenefitVariant;
}

export const useBenefitTableData = ({
  benefit,
  variant,
}: UseBenefitTableDataProps) => {
  const data = useMemo(() => {
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

    // Flags de visualización
    const showStats =
      variant === "teacher" ||
      (isStudentBenefit(benefit) && shouldShowBenefitStats(benefit));

    // Subject name según tipo de benefit
    const getSubjectName = () => {
      if ("subjectDto" in benefit && benefit.subjectDto) {
        return benefit.subjectDto.name;
      }
      if ("subjectName" in benefit) {
        return benefit.subjectName;
      }
      return null;
    };

    // Propiedades básicas con Type Guards
    const benefitName = hasBasicProperties ? benefit.name : "";
    const benefitDescription = hasBasicProperties ? benefit.description : "";
    const benefitCost = hasBasicProperties ? benefit.cost : 0;

    const categoryName =
      category?.label || (hasFullProperties ? benefit.category : "");
    const categoryColor = hasFullProperties
      ? getCategoryColor(benefit.category)
      : { bg: "#f3f4f6", text: "#374151" };
    const subjectName = getSubjectName();
    const subjectColor = subjectName ? getSubjectColor(subjectName) : null;

    return {
      IconComponent,
      iconColor,
      category,
      categoryName,
      categoryColor,
      showStats,
      benefitName,
      benefitDescription,
      benefitCost,
      subjectName,
      subjectColor,
      hasFullProperties,
      hasBasicProperties,
    };
  }, [benefit, variant]);

  return data;
};
