import { useCallback, useEffect, useMemo, useState } from "react";
import { useCurrentStudent } from "../../../student/hooks/useCurrentStudent";
import { usePlazoFijoStudent } from "../usePlazoFijoAPI";
import { type PaginationInfo, usePaginationParams } from "@/shared";
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

  const {
    plazoFijos,
    getPaginatedPlazoFijo,
    registerPlazoFijo,
    getStatisticsPlazoFijo,
    statistics,
  } = usePlazoFijoStudent();

  const { wallet } = useCurrentStudent();
  const userBalance = wallet?.balance;
  const [filterStatus, setFilterStatus] =
    useState<FIXED_TERM_STATES>("IN_PROGRESS");
  const [openForm, setOpenForm] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) return;
    getPaginatedPlazoFijo(paginationParams);
  }, [paginationParams, initialized]);

  useEffect(() => {
    getStatisticsPlazoFijo();
    handleFilter(["fixedTermState"], [filterStatus]);
    setInitialized(true);
  }, []);

  const paginationInfo: PaginationInfo | null = useMemo(() => {
    if (!plazoFijos) return null;
    return {
      currentPage: plazoFijos.currentPage,
      totalPages: plazoFijos.totalPages,
      pageSize: plazoFijos.pageSize,
      totalItems: plazoFijos.results.length,
      onPageChange: handlePageChange,
      onPageSizeChange: handlePageSizeChange,
    };
  }, [plazoFijos, handlePageChange, handlePageSizeChange]);

  const handleCreatePlazoFijo = useCallback(
    async (data: RegisterPlazoFijo) => {
      await registerPlazoFijo(data);
      setOpenForm(false);
      await getPaginatedPlazoFijo(paginationParams);
    },
    [registerPlazoFijo, paginationParams]
  );
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
    statistics,

    //Valores internos
    userBalance,
    openForm,
    setOpenForm,
    handleCreatePlazoFijo,
    filterStatus,
    setFilterStatus,
  };
};
