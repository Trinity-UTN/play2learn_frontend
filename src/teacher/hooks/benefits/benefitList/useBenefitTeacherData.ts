import { useEffect, useCallback, useMemo } from "react";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import { COMMON_SECONDARY_SUBJECTS } from "../../../../shared/constants/subject.constants";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useBenefitTeacherFilters } from "./useBenefitTeacherFilters";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";

/**
 * Hook central para cargar y manejar los datos de beneficios del teacher
 */
export const useBenefitTeacherData = () => {
  const {
    loading,
    paginatedBenefits,
    paginatedBenefitsUseRequested,
    getPaginatedBenefits,
    getPaginatedBenefitsUseRequested,
  } = useBenefitAPI();

  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    setPaginationParams,
  } = usePaginationParams();

  const {
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
    setSearch,
    setBenefitId,
    applyFilters,
    resetFilters,
  } = useBenefitTeacherFilters();

  /**
   * Carga de beneficios filtrados y paginados
   */
  const loadBenefits = useCallback(async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    // Estado (benefit.state)
    filters.push("state");
    filtersValues.push(activeFilter);

    // Materia (benefit.subjectId)
    if (selectedSubject && selectedSubject.id !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }

    // Categoría (benefit.category)
    if (selectedCategory && selectedCategory !== "ALL") {
      filters.push("category");
      filtersValues.push(selectedCategory);
    }

    // Filtro por beneficio (solo en uso solicitado)
    if (activeFilter === "USE_REQUESTED" && benefitId) {
      filters.push("benefitId");
      filtersValues.push(benefitId);
    }

    if (activeFilter === "USE_REQUESTED") {
      await getPaginatedBenefitsUseRequested({
        ...paginationParams,
        search,
        filters,
        filtersValues,
      });
    } else {
      await getPaginatedBenefits({
        ...paginationParams,
        search,
        filters,
        filtersValues,
      });
    }
  }, [
    activeFilter,
    paginationParams,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    getPaginatedBenefits,
    getPaginatedBenefitsUseRequested,
  ]);

  /**
   * Carga inicial de beneficios
   */
  useEffect(() => {
    loadBenefits();
  }, [loadBenefits, search, benefitId]);

  /**
   * Reinicia la paginación al cambiar el filtro
   */
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    setPaginationParams,
  ]);

  // Datos Generales
  const subjects: FilterOption[] = useMemo(() => {
    const mapped: FilterOption[] = COMMON_SECONDARY_SUBJECTS.map(
      (name, index) => ({
        id: String(index + 1),
        name,
      })
    );
    return [{ id: "ALL", name: "Todas las materias" }, ...mapped];
  }, []);

  const availableBenefits = useMemo(() => {
    const items = [
      ...(paginatedBenefitsUseRequested?.results ?? []),
      ...(paginatedBenefits?.results ?? []),
    ];
    const unique = new Map<number, string>();
    for (const item of items) {
      if ("benefitId" in item && item.benefitId) {
        unique.set(item.benefitId, (item as any).benefitName);
      } else if ("id" in item && "name" in item) {
        unique.set((item as any).id, (item as any).name);
      }
    }
    return Array.from(unique, ([id, name]) => ({ id, name }));
  }, [paginatedBenefits, paginatedBenefitsUseRequested]);

  const filteredBenefits = useMemo(() => {
    if (activeFilter === "USE_REQUESTED") {
      return paginatedBenefitsUseRequested?.results ?? [];
    }
    return paginatedBenefits?.results ?? [];
  }, [activeFilter, paginatedBenefits, paginatedBenefitsUseRequested]);

  const paginationInfo = useMemo(() => {
    const data =
      activeFilter === "USE_REQUESTED"
        ? paginatedBenefitsUseRequested
        : paginatedBenefits;

    return data
      ? {
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          pageSize: data.pageSize,
          totalItems: data.count,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }
      : null;
  }, [
    activeFilter,
    paginatedBenefits,
    paginatedBenefitsUseRequested,
    handlePageChange,
    handlePageSizeChange,
  ]);

  return {
    // Estados y handlers
    loading,
    activeFilter,
    selectedSubject,
    selectedCategory,
    search,
    benefitId,
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
    setSearch,
    setBenefitId,
    applyFilters,
    resetFilters,

    // Datos
    filteredBenefits,
    subjects,
    availableBenefits,
    paginationInfo,
  };
};
