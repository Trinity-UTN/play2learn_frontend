import { useEffect, useMemo, useCallback, useRef } from "react";
import { usePaginationParams } from "@/shared";
import { useNoLudicaReview } from "../../useNoLudicaReview";

/**
 * Hook para cargar y manejar los datos de intentos pendientes de corrección
 */
export const usePendingNoLudicaData = () => {
  const {
    loadingPending,
    pendingAttempts,
    paginatedPendingData,
    getPendingAttemptsPaginated,
  } = useNoLudicaReview();

  const { paginationParams, handlePageChange, handlePageSizeChange } =
    usePaginationParams();

  // Track if initial load has happened
  const hasLoadedRef = useRef(false);

  // Cargar intentos pendientes
  const loadPendingAttempts = useCallback(async () => {
    await getPendingAttemptsPaginated(paginationParams);
  }, [paginationParams, getPendingAttemptsPaginated]);

  // Carga inicial - only run once
  useEffect(() => {
    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      loadPendingAttempts();
    }
  }, [loadPendingAttempts]);

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
