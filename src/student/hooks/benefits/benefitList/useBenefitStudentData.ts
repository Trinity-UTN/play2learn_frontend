import { useEffect, useCallback, useMemo } from "react";
import { useBenefitStudent } from "../../useBenefitStudent";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
import { useBenefitStudentFilters } from "./useBenefitStudentFilters";
import { useBenefitStudentStats } from "./useBenefitStudentStats";
import { extractUniqueSubjectsFromBenefits } from "../../../utils/benefitStudent.utils";

export const useBenefitStudentData = () => {
  const {
    loading,
    paginatedBenefits,
    getPaginatedBenefitStudent,
    getBenefitStudentStats,
  } = useBenefitStudent();

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
  } = useBenefitStudentFilters();

  const { stats, counts, totalCount } = useBenefitStudentStats();

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

    await getPaginatedBenefitStudent({
      ...paginationParams,
      filters,
      filtersValues,
    });
  }, [
    activeFilter,
    paginationParams,
    selectedSubject,
    selectedCategory,
    getPaginatedBenefitStudent,
  ]);

  /**
   * Carga de beneficios y estadísticas
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([loadBenefits(), getBenefitStudentStats()]);
    };
    fetchInitialData();
  }, [loadBenefits, getBenefitStudentStats]);

  /**
   * Reinicia la paginación al cambiar el filtro
   */
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [activeFilter, selectedSubject, selectedCategory, setPaginationParams]);

  // Datos Generales
  const filteredBenefits = useMemo(() => {
    return paginatedBenefits?.results ?? [];
  }, [paginatedBenefits]);

  const subjects = useMemo(() => {
    const benefits = paginatedBenefits?.results ?? [];
    return extractUniqueSubjectsFromBenefits(benefits);
  }, [paginatedBenefits]);

  const paginationInfo = useMemo(() => {
    return paginatedBenefits
      ? {
          currentPage: paginatedBenefits.currentPage,
          totalPages: paginatedBenefits.totalPages,
          pageSize: paginatedBenefits.pageSize,
          totalItems: paginatedBenefits.count,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }
      : null;
  }, [paginatedBenefits, handlePageChange, handlePageSizeChange]);

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
    stats,
    counts,
    totalCount,
    paginationInfo,
  };
};
