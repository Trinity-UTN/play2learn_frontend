import { useCallback, useMemo, useState, type ReactNode } from "react";
import { YearContext } from "./YearContext";
import type { YearContextType } from "./YearContext.type";
import { YearService } from "../../services/Year/YearService";
import type {
  CreateYearPayload,
  UpdateYearPayload,
  YearResponseDto,
} from "../../types/year.types";
import {
  type GetPaginated,
  type PaginatedData,
  useHandleApiError,
  withLoading,
  useToaster,
} from "@/shared";

interface YearProviderProps {
  children: ReactNode;
}

export const YearProvider: React.FC<YearProviderProps> = ({ children }) => {
  const { handleApiError } = useHandleApiError();
  const { showToast } = useToaster();
  const [loading, setLoading] = useState<boolean>(false);
  const [years, setYears] = useState<YearResponseDto[]>([]);
  const [paginatedYears, setPaginatedYears] =
    useState<PaginatedData<YearResponseDto> | null>(null);
  const [selectedYear, setSelectedYear] = useState<YearResponseDto | null>(
    null
  );

  const registerYear = useCallback(
    async (data: CreateYearPayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await YearService.registerYearApi(data);
          showToast({
            title: "Año creado exitosamente",
            message: "El año ha sido creado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al crear el año");
        }
      }, setLoading);
    },
    [handleApiError, withLoading]
  );

  const updateYear = useCallback(
    async (data: UpdateYearPayload): Promise<void> => {
      await withLoading(async () => {
        try {
          await YearService.updateYearApi(data);
          showToast({
            title: "Año actualizado exitosamente",
            message: "El año ha sido actualizado exitosamente",
            type: "success",
            position: "bottom-right",
          });
        } catch (error) {
          handleApiError(error, "Error al actualizar el año");
        }
      }, setLoading);
    },
    [handleApiError, withLoading]
  );

  const getYear = useCallback(async () => {
    await withLoading(async () => {
      try {
        const response = await YearService.getYearApi();
        setYears(response.data.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los años");
      }
    }, setLoading);
  }, [handleApiError, withLoading]);

  const getYearById = useCallback(
    async (id: number): Promise<YearResponseDto | undefined> => {
      return await withLoading(async () => {
        try {
          return await YearService.getYearByIdApi(id);
        } catch (error) {
          handleApiError(error, "Error al obtener el año por ID");
        }
      }, setLoading);
    },
    [handleApiError, withLoading]
  );

  const getPaginatedYear = useCallback(
    async (params: GetPaginated): Promise<void> => {
      await withLoading(async () => {
        try {
          const response = await YearService.getPaginatedYearApi(params);
          setPaginatedYears(response.data);
        } catch (error) {
          handleApiError(error, "Error al obtener los años paginados");
        }
      }, setLoading);
    },
    [handleApiError, withLoading]
  );

  const deleteYear = useCallback(
    async (id: number): Promise<void> => {
      await withLoading(async () => {
        try {
          await YearService.deleteYearApi(id);
        } catch (error) {
          handleApiError(error, "Error al eliminar el año");
        }
      }, setLoading);
    },
    [handleApiError, withLoading]
  );

  // Memorizamos las acciones que no deberian cambiar en ejecución
  const actions = useMemo(
    () => ({
      registerYear,
      updateYear,
      getYear,
      getYearById,
      getPaginatedYear,
      deleteYear,
      setSelectedYear,
    }),
    [
      registerYear,
      updateYear,
      getYear,
      getYearById,
      getPaginatedYear,
      deleteYear,
    ]
  );
  // Memorizamos los estados que cambian en ejecución
  const state = useMemo(
    () => ({
      loading,
      years,
      paginatedYears,
      selectedYear,
    }),
    [loading, years, paginatedYears, selectedYear]
  );

  const contextValue: YearContextType = useMemo(
    () => ({
      ...state,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <YearContext.Provider value={contextValue}>{children}</YearContext.Provider>
  );
};
