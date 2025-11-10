import {
  BENEFIT_CATEGORIES,
  type BenefitTeacherStatus,
} from "../../benefit/constants/benefit.constants";

export const getCategoryLabel = (value: string): string => {
  if (value === "ALL") return "Todas las categorías";
  const category = BENEFIT_CATEGORIES.find((c) => c.value === value);
  return category?.label || value;
};

export const getSearchPlaceholder = (
  activeFilter: BenefitTeacherStatus
): string => {
  return activeFilter === "USE_REQUESTED"
    ? "Nombre del estudiante"
    : "Nombre del beneficio";
};

export const hasActiveFilters = (
  search: string,
  subjectId: string,
  benefitId: string
): boolean => {
  return !!search || !!subjectId || !!benefitId;
};
