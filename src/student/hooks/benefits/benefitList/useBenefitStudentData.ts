import { useEffect, useCallback, useMemo } from "react";
import { useBenefitStudent } from "../../useBenefitStudent";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
import { useBenefitStudentFilters } from "./useBenefitStudentFilters";
import { useBenefitStudentStats } from "./useBenefitStudentStats";
import { extractUniqueSubjectsFromBenefits } from "../../../utils/benefitStudent.utils";

export const useBenefitStudentData = () => {
  const { loading, paginatedBenefits, getPaginatedBenefitStudent } =
    useBenefitStudent();

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

  const { stats, counts, totalCount } =
    useBenefitStudentStats(paginatedBenefits);

  // Load benefits based on filters
  const loadBenefits = useCallback(async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    // State filter (siempre aplicar)
    filters.push("state");
    filtersValues.push(activeFilter);

    // Subject filter
    if (selectedSubject && selectedSubject.id !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "ALL") {
      filters.push("category");
      filtersValues.push(selectedCategory);
    }

    await getPaginatedBenefitStudent({
      ...paginationParams,
      filters,
      filtersValues,
    });
  }, [activeFilter, paginationParams, selectedSubject, selectedCategory]);

  useEffect(() => {
    loadBenefits();
  }, [loadBenefits]);

  // Reset page on filter change
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [activeFilter, selectedSubject, selectedCategory]);

  // Filtered benefits
  const filteredBenefits = useMemo(() => {
    return paginatedBenefits?.results ?? [];
  }, [paginatedBenefits]);

  // Subjects (extraer de los resultados actuales)
  const subjects = useMemo(() => {
    const benefits = paginatedBenefits?.results ?? [];
    return extractUniqueSubjectsFromBenefits(benefits);
  }, [paginatedBenefits]);

  // Pagination info
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
    // Filter state
    activeFilter,
    setActiveFilter,
    selectedSubject,
    setSelectedSubject,
    selectedCategory,
    setSelectedCategory,
    // Data
    filteredBenefits,
    subjects,
    stats,
    counts,
    totalCount,
    paginationInfo,
    loading,
  };
};
