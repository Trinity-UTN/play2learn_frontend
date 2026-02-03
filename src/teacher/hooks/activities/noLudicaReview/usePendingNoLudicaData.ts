import { useEffect, useMemo, useCallback, useRef } from "react";
import { usePaginationParams, type FilterOption } from "@/shared";
import { useNoLudicaReview } from "../../useNoLudicaReview";

interface UsePendingNoLudicaDataParams {
  selectedSubject?: FilterOption | null;
  selectedCourse?: FilterOption | null;
  selectedYear?: FilterOption | null;
  search?: string;
}

/**
 * Hook para cargar y manejar los datos de intentos pendientes de corrección
 */
export const usePendingNoLudicaData = (
  params: UsePendingNoLudicaDataParams = {}
) => {
  const { selectedSubject, selectedCourse, selectedYear, search } = params;

  const {
    loadingPending,
    pendingAttempts,
    paginatedPendingData,
    getPendingAttemptsPaginated,
    clearPendingAttempts,
  } = useNoLudicaReview();

  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    setPaginationParams,
  } = usePaginationParams();

  // Trackear si se realizó la carga inicial
  const hasLoadedRef = useRef(false);

  // Cargar filtros
  const buildFilters = useCallback(() => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    if (selectedSubject?.id && selectedSubject.id !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }

    if (selectedCourse?.id && selectedCourse.id !== "ALL") {
      filters.push("courseId");
      filtersValues.push(selectedCourse.id);
    }

    if (selectedYear?.id && selectedYear.id !== "ALL") {
      filters.push("yearId");
      filtersValues.push(selectedYear.id);
    }

    return { filters, filtersValues };
  }, [selectedSubject, selectedCourse, selectedYear]);

  // Cargar intentos pendientes
  const loadPendingAttempts = useCallback(async () => {
    const { filters, filtersValues } = buildFilters();
    await getPendingAttemptsPaginated({
      ...paginationParams,
      search: search || "",
      filters,
      filtersValues,
    });
  }, [paginationParams, getPendingAttemptsPaginated, buildFilters, search]);

  /**
   * Carga inicial de actividades pendientes
   */
  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadPendingAttempts();
    }
  }, [loadPendingAttempts]);

  /**
   * Reinicia la paginación al cambiar el filtro
   */
  useEffect(() => {
    if (hasLoadedRef.current) {
      clearPendingAttempts();
      setPaginationParams((prev) => ({ ...prev, page: 1 }));
      loadPendingAttempts();
    }
  }, [selectedSubject, selectedCourse, selectedYear, search]);

  // Info de paginación
  const paginationInfo = useMemo(() => {
    if (!paginatedPendingData) return null;

    return {
      currentPage: paginatedPendingData.currentPage,
      totalPages: paginatedPendingData.totalPages,
      pageSize: paginatedPendingData.pageSize,
      totalItems: paginatedPendingData.count,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    };
  }, [paginatedPendingData, handlePageChange, handlePageSizeChange]);

  return {
    loading: loadingPending,
    pendingAttempts,
    paginationInfo,
    refreshPendingAttempts: loadPendingAttempts,
  };
};
