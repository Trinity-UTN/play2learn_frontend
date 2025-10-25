import { useMemo } from "react";
import type { AnyBenefit, BenefitVariant } from "../types/benefit.types";
import { getSubjectColor } from "../../shared/constants/subject.constants";
import {
  getIconByValue,
  getColorByValue,
  getCategoryByValue,
  isStudentBenefit,
  getCategoryColor,
} from "../utils/benefit.utils";
import { shouldShowBenefitStats } from "../utils/benefit.validation";

interface UseBenefitTableDataProps {
  benefit: AnyBenefit;
  variant: BenefitVariant;
}

export const useBenefitTableData = ({
  benefit,
  variant,
}: UseBenefitTableDataProps) => {
  const data = useMemo(() => {
    // Iconos y colores básicos
    const IconComponent = getIconByValue(benefit.icon);
    const iconColor = getColorByValue(benefit.color);
    const category = getCategoryByValue(benefit.category);

    // Flags de visualización
    const showStats =
      variant === "teacher" ||
      (isStudentBenefit(benefit) && shouldShowBenefitStats(benefit));

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

    const categoryName = category?.label || benefit.category;
    const categoryColor = getCategoryColor(benefit.category);
    const subjectName = getSubjectName();
    const subjectColor = subjectName ? getSubjectColor(subjectName) : null;

    return {
      IconComponent,
      iconColor,
      category,
      categoryName,
      categoryColor,
      showStats,
      subjectName,
      subjectColor,
    };
  }, [benefit, variant]);

  return data;
};
