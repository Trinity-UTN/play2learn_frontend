import { useMemo } from "react";
import { FaGift, FaHandPaper } from "react-icons/fa";
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

interface UseBenefitTableDataProps {
  benefit: AnyBenefit | TeacherBenefitType;
  variant: BenefitVariant;
}

export const useBenefitTableData = ({
  benefit,
  variant,
}: UseBenefitTableDataProps) => {
  const data = useMemo(() => {
    const isUseRequest = isBenefitUseRequested(benefit);

    // Si es una solicitud de uso, retornar data específica (POR AHORA) TODO: Agg icon, category, color backend
    if (isUseRequest) {
      const subjectName = benefit.subjectName;
      const subjectColor = getSubjectColor(subjectName);

      return {
        IconComponent: FaHandPaper,
        iconColor: "#F59E0B",
        category: undefined,
        categoryName: "",
        categoryColor: { bg: "#FEF3C7", text: "#92400E" },
        showStats: false,
        benefitName: benefit.benefitName,
        benefitDescription: `Solicitado por ${benefit.studentName}`,
        benefitCost: 0,
        subjectName,
        subjectColor,
        hasFullProperties: false,
        hasBasicProperties: false,
        isUseRequest: true,
        studentName: benefit.studentName,
      };
    }

    // Lógica original para beneficios normales
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

    // Propiedades básicas con Type Guards
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
      hasFullProperties,
      hasBasicProperties,
      isUseRequest: false,
      studentName: undefined,
    };
  }, [benefit, variant]);

  return data;
};
