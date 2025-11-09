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
  isBenefitUseRequested,
  getBenefitSubjectName,
} from "../utils/benefit.utils";
import { shouldShowBenefitStats } from "../utils/benefit.validation";

export const useBenefitTableData = ({
  benefit,
  variant,
}: {
  benefit: AnyBenefit | TeacherBenefitType;
  variant: BenefitVariant;
}) => {
  return useMemo(() => {
    const isUseRequest = isBenefitUseRequested(benefit);

    // Caso 1: USE REQUEST
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
        categoryName: category?.label || "",
        categoryColor,
        showStats: false,
        benefitName: benefit.benefitName,
        benefitDescription: benefit.studentName,
        benefitCost: 0,
        subjectName,
        subjectColor,
        isUseRequest: true,
        studentName: benefit.studentName,
      };
    }

    // Caso 2: BENEFICIO NORMAL
    const hasFullProperties = isFullBenefitResponse(benefit);
    const hasBasicProperties = hasBenefitBasicProperties(benefit);

    const IconComponent = hasFullProperties
      ? getIconByValue(benefit.icon)
      : FaGift;
    const iconColor = hasFullProperties
      ? getColorByValue(benefit.color)
      : "#94a3b8";
    const category = hasFullProperties
      ? getCategoryByValue(benefit.category)
      : undefined;

    const showStats =
      variant === "teacher" ||
      (isStudentBenefit(benefit) && shouldShowBenefitStats(benefit));

    const benefitName = hasBasicProperties ? benefit.name : "";
    const benefitDescription = hasBasicProperties ? benefit.description : "";
    const benefitCost = hasBasicProperties ? benefit.cost : 0;

    const categoryName =
      category?.label || (hasFullProperties ? benefit.category : "");
    const categoryColor = hasFullProperties
      ? getCategoryColor(benefit.category)
      : { bg: "#f3f4f6", text: "#374151" };

    const subjectName = getBenefitSubjectName(benefit as TeacherBenefitType);
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
      isUseRequest: false,
      studentName: undefined,
    };
  }, [benefit, variant]);
};
