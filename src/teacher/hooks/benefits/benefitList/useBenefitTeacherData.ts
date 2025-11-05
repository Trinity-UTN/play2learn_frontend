import { useEffect, useCallback, useMemo } from "react";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useBenefitTeacherFilters } from "./useBenefitTeacherFilters";
import { extractUniqueSubjectsFromBenefits } from "../../../../benefit/utils/benefit.utils";
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
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,
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

    if (activeFilter === "USE_REQUESTED") {
      await getPaginatedBenefitsUseRequested({
        ...paginationParams,
        filters,
        filtersValues,
      });
    } else {
      await getPaginatedBenefits({
        ...paginationParams,
        filters,
        filtersValues,
      });
    }
  }, [
    activeFilter,
    paginationParams,
    selectedSubject,
    selectedCategory,
    getPaginatedBenefits,
    getPaginatedBenefitsUseRequested,
  ]);

  /**
   * Carga inicial de beneficios
   */
  useEffect(() => {
    loadBenefits();
  }, [loadBenefits]);

  /**
   * Reinicia la paginación al cambiar el filtro
   */
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [activeFilter, selectedSubject, selectedCategory, setPaginationParams]);

  // Datos Generales
  const filteredBenefits = useMemo(() => {
    if (activeFilter === "USE_REQUESTED") {
      return paginatedBenefitsUseRequested?.results ?? [];
    }
    return paginatedBenefits?.results ?? [];
  }, [activeFilter, paginatedBenefits, paginatedBenefitsUseRequested]);

  const subjects = useMemo(() => {
    const benefits =
      activeFilter === "USE_REQUESTED"
        ? paginatedBenefitsUseRequested?.results ?? []
        : paginatedBenefits?.results ?? [];
    return extractUniqueSubjectsFromBenefits(benefits);
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
    // Estados Generales
    loading,
    activeFilter,
    selectedSubject,
    selectedCategory,
    setActiveFilter,
    setSelectedSubject,
    setSelectedCategory,

    // Datos Generales
    filteredBenefits,
    subjects,
    paginationInfo,
  };
};
