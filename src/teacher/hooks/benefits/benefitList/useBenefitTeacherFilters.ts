import { useState, useCallback } from "react";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import type { BenefitTeacherStatus } from "../../../../benefit/constants/benefit.constants";

/**
 * Hook para manejar los filtros de beneficios del teacher
 */
export const useBenefitTeacherFilters = () => {
  const [activeFilter, setActiveFilter] =
    useState<BenefitTeacherStatus>("PUBLISHED");
  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>({
    id: "ALL",
    name: "Todas las materias",
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [search, setSearch] = useState<string>("");
  const [benefitId, setBenefitId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const applyFilters = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resetFilters = useCallback(() => {
    setActiveFilter("PUBLISHED");
    setSelectedSubject({ id: "ALL", name: "Todas las materias" });
    setSelectedCategory("ALL");
    setSearch("");
    setBenefitId("");
  }, []);

  return {
    // Estados
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    viewMode,

    // Handlers
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
    setSearch,
    setBenefitId,
    setViewMode,
    applyFilters,
    resetFilters,
  };
};
