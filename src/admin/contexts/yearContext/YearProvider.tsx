import type React from "react";
import { useCallback, useState, type ReactNode } from "react";
import { YearContext } from "./YearContext";
import type { YearContextType } from "./YearContext.type";
import { YearService } from "../../services/year/YearService";
import type {
  CreateYearPayload,
  UpdateYearPayload,
  GetPaginatedYearPayload,
  PaginatedData,
  YearResponseDto,
} from "../../services/year/YearService";

interface YearProviderProps {
  children: ReactNode;
}

export const YearProvider: React.FC<YearProviderProps> = ({ children }) => {
  const [years, setYears] = useState<YearResponseDto[]>([]);
  const [paginatedYears, setPaginatedYears] =
    useState<PaginatedData<YearResponseDto> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const registerYear = async (data: CreateYearPayload): Promise<void> => {
    setLoading(true);
    try {
      await YearService.registerYearApi(data);
    } catch (error) {
      console.error("Error al crear el año:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateYear = async (data: UpdateYearPayload): Promise<void> => {
    setLoading(true);
    try {
      await YearService.updateYearApi(data);
    } catch (error) {
      console.error("Error al actualizar el año:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getYear = useCallback(async () => {
    setLoading(true);
    try {
      const response = await YearService.getYearApi();
      setYears(response.data.data);
    } catch (error) {
      console.error("Error al obtener los años:", error); // TODO: REMOVE_DEBUG
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getYearById = async (id: number): Promise<YearResponseDto> => {
    setLoading(true);
    try {
      const yearData = await YearService.getYearByIdApi(id);
      return yearData;
    } catch (error) {
      console.error("Error al obtener el año:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedYear = useCallback(
    async (params: GetPaginatedYearPayload): Promise<void> => {
      setLoading(true);
      try {
        const response = await YearService.getPaginatedYearApi(params);
        setPaginatedYears(response.data);
      } catch (error) {
        console.error("Error al obtener los años paginados:", error); // TODO: REMOVE_DEBUG
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const deleteYear = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await YearService.deleteYearApi(id);
    } catch (error) {
      console.error("Error al eliminar el año:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: YearContextType = {
    loading,
    registerYear,
    updateYear,
    getYear,
    getYearById,
    getPaginatedYear,
    deleteYear,
    years,
    paginatedYears,
  };

  return (
    <YearContext.Provider value={contextValue}>{children}</YearContext.Provider>
  );
};
