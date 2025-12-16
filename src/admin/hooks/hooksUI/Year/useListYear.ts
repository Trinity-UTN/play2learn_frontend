import { useConfirmation, usePaginationParams, useToaster } from "@/shared";
import { useYear } from "@/admin";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import type { YearResponseDto } from "@/admin/types/year.types";

export const useListYear = () => {
  const {
    loading,
    paginatedYears,
    getPaginatedYear,
    deleteYear,
    setSelectedYear,
  } = useYear();

  const { paginationParams, ...paginationHandlers } = usePaginationParams();
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();
  const navigate = useNavigate();

  useEffect(() => {
    getPaginatedYear(paginationParams);
  }, [paginationParams]);

  const handleEdit = useCallback((year: YearResponseDto) => {
    showConfirmation({
      title: "Modificar Año",
      message: `¿Está seguro que desea modificar el año "${year.name}"?`,
      type: "warning",
      onConfirm: () => {
        setSelectedYear(year);
        navigate(`/dashboard/years/edit/${year.id}`);
      },
    });
  }, []);

  const handleDelete = useCallback((year: YearResponseDto) => {
    showConfirmation({
      title: "Eliminar Año",
      message: `¿Está seguro que desea eliminar el año "${year.name}"?`,
      type: "danger",
      showDoubleConfirmation: true,
      onConfirm: async () => {
        await deleteYear(year.id);
        await getPaginatedYear(paginationParams);
        showToast({
          title: "Año eliminado",
          message: "El año se eliminó exitosamente",
          type: "success",
          position: "bottom-right",
        });
      },
    });
  }, []);

  return {
    loading,
    paginatedYears,
    paginationParams,
    ...paginationHandlers,
    handleEdit,
    handleDelete,
    navigate,
  };
};
