import { useState, useCallback } from "react";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import type { BenefitPurchaseStatus } from "../../../../benefit/constants/benefitPurchase.constants";

/**
 * Hook para manejar los filtros de beneficios del teacher
 */
export const useBenefitTeacherFilters = () => {
  const [activeStatusFilter, setActiveStatusFilter] =
    useState<BenefitPurchaseStatus>("ALL");
  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>({
    id: "ALL",
    name: "Todas las materias",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const resetFilters = useCallback(() => {
    setActiveStatusFilter("ALL");
    setSelectedSubject({ id: "ALL", name: "Todas las materias" });
    setSelectedCategory("ALL");
  }, []);

  return {
    activeStatusFilter,
    selectedSubject,
    selectedCategory,
    setActiveStatusFilter,
    setSelectedSubject,
    setSelectedCategory,
    resetFilters,
  };
};
