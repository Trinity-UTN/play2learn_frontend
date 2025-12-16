import { useEffect, useState } from "react";
import { usePaginationParams, type PaginationInfo } from "@/shared";
import type { RiskLevel } from "../../types/actions.type";
import { useActionsStudent } from "../useActionsStudentAPI";

export const useActionsView = () => {
  // Paginación
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
  } = usePaginationParams();
  const { getPaginatedActions, actions } = useActionsStudent();
  const [isLoading, setIsLoading] = useState(true);
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "TODOS">("TODOS");

  // Efecto para cargar los aspectos
  useEffect(() => {
    getPaginatedActions(paginationParams);
  }, [paginationParams]);
  // 7️⃣ Paginación info
  const paginationInfo: PaginationInfo | null = actions
    ? {
        currentPage: actions.currentPage,
        totalPages: actions.totalPages,
        pageSize: actions.pageSize,
        totalItems: actions.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

  useEffect(() => {
    // Tiempo de carga aleatorio entre 3 y 5 segundos
    const loadingTime = Math.random() * 2000 + 2000;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, []);

  return {
    actions,
    isLoading,
    filterRisk,
    paginationInfo,
    handleFilter,
    setFilterRisk,
  };
};
