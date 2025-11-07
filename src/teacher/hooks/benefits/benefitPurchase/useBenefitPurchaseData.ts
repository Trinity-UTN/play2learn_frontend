import { useEffect, useCallback, useMemo } from "react";
import { useBenefitAPI } from "../../useBenefitAPI";
import { useBenefitPurchaseFilters } from "./useBenefitPurchaseFilters";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";

/**
 * Hook central para cargar y manejar los datos de canjes de un beneficio
 */
export const useBenefitPurchaseData = (benefitId: number) => {
  const { loading, paginatedBenefitsPurchases, getPaginatedBenefitsPurchases } =
    useBenefitAPI();

  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    setPaginationParams,
  } = usePaginationParams();

  const { activeFilter, setActiveFilter } = useBenefitPurchaseFilters();

  /**
   * Detecta si la respuesta tiene paginación o es un array simple
   */
  const hasPagination = useMemo(() => {
    return (
      paginatedBenefitsPurchases !== null &&
      !Array.isArray(paginatedBenefitsPurchases) &&
      "results" in paginatedBenefitsPurchases &&
      "totalPages" in paginatedBenefitsPurchases
    );
  }, [paginatedBenefitsPurchases]);

  /**
   * Carga de canjes filtrados y paginados
   */
  const loadPurchases = useCallback(async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    // Estado (purchase.state)
    filters.push("state");
    filtersValues.push(activeFilter);

    await getPaginatedBenefitsPurchases(benefitId, {
      ...paginationParams,
      filters,
      filtersValues,
    });
  }, [
    benefitId,
    activeFilter,
    paginationParams,
    getPaginatedBenefitsPurchases,
  ]);

  /**
   * Carga inicial de canjes
   */
  useEffect(() => {
    loadPurchases();
  }, [loadPurchases, benefitId]);

  /**
   * Reinicia la paginación al cambiar el filtro (solo si hay paginación)
   */
  useEffect(() => {
    if (hasPagination) {
      setPaginationParams((prev) => ({ ...prev, page: 1 }));
    }
  }, [activeFilter, hasPagination, setPaginationParams]);

  const filteredPurchases = useMemo(() => {
    if (Array.isArray(paginatedBenefitsPurchases)) {
      return paginatedBenefitsPurchases;
    }

    return paginatedBenefitsPurchases?.results ?? [];
  }, [paginatedBenefitsPurchases]);

  const paginationInfo = useMemo(() => {
    if (Array.isArray(paginatedBenefitsPurchases)) {
      return null;
    }

    return paginatedBenefitsPurchases
      ? {
          currentPage: paginatedBenefitsPurchases.currentPage,
          totalPages: paginatedBenefitsPurchases.totalPages,
          pageSize: paginatedBenefitsPurchases.pageSize,
          totalItems: paginatedBenefitsPurchases.count,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }
      : null;
  }, [paginatedBenefitsPurchases, handlePageChange, handlePageSizeChange]);

  return {
    // Estados Generales
    loading,
    activeFilter,
    setActiveFilter,

    // Datos Generales
    filteredPurchases,
    paginationInfo,
    hasPagination,

    // Funciones
    refetch: loadPurchases,
  };
};
