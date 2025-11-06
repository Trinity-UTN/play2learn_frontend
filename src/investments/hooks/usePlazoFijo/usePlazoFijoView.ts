import { useEffect, useState } from "react";
import usePaginationParams from "../../../shared/hooks/usePaginateParams";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import { usePlazoFijoStudent } from "../usePlazoFijoAPI";
import type { PaginationInfo } from "../../../shared/types/PaginacionType";
import type {
  FIXED_TERM_STATES,
  RegisterPlazoFijo,
} from "../../types/plazoFijo.type";

export const usePlazoFijoView = () => {
  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
  } = usePaginationParams();

  const { plazoFijos, getPaginatedPlazoFijo, registerPlazoFijo } =
    usePlazoFijoStudent();
  const { wallet } = useCurrentStudent();
  const userBalance = wallet?.balance;
  const [filterStatus, setFilterStatus] =
    useState<FIXED_TERM_STATES>("IN_PROGRESS");

  useEffect(() => {
    handleFilter(["fixedTermState"], [filterStatus]);
  }, []);

  useEffect(() => {
    getPaginatedPlazoFijo(paginationParams);
  }, [paginationParams]);

  const paginationInfo: PaginationInfo | null = plazoFijos
    ? {
        currentPage: plazoFijos.currentPage,
        totalPages: plazoFijos.totalPages,
        pageSize: plazoFijos.pageSize,
        totalItems: plazoFijos.results.length,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }
    : null;

  const handleCreatePlazoFijo = async (data: RegisterPlazoFijo) => {
    registerPlazoFijo(data);
  };

  return {
    //Paginacion
    paginationParams,
    paginationInfo,
    handlePageChange,
    handlePageSizeChange,
    handleFilter,
    //Valores del context API
    plazoFijos,
    getPaginatedPlazoFijo,
    registerPlazoFijo,

    //Valores internos
    userBalance,
    handleCreatePlazoFijo,
    filterStatus,
    setFilterStatus,
  };
};
