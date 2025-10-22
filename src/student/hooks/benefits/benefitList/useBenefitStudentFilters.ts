import { useState, useCallback } from "react";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import type { BenefitStatus } from "../../../constants/benefitStudent.constants";

export const useBenefitStudentFilters = () => {
  const [activeFilter, setActiveFilter] = useState<BenefitStatus>("AVAILABLE");
  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>({
    id: "ALL",
    name: "Todas las materias",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const resetFilters = useCallback(() => {
    setActiveFilter("AVAILABLE");
    setSelectedSubject({ id: "ALL", name: "Todas las materias" });
    setSelectedCategory("ALL");
  }, []);

  return {
    activeFilter,
    selectedSubject,
    selectedCategory,
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
    resetFilters,
  };
};
