import { useState, type ReactNode } from "react";
import { YearContext } from "./YearContext";
import type { YearContextType } from "./YearContext.type";
import { YearService } from "../../services/year/YearService";
import type {
  CreateYearPayload,
  GetYearPayload,
  GetPaginatedYearPayload,
  PaginatedData,
  YearResponseDto,
} from "../../services/year/YearService";

interface YearProviderProps {
  children: ReactNode;
}

export const YearProvider: React.FC<YearProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [years, setYears] = useState<GetYearPayload[]>([]);
  const [paginatedYears, setPaginatedYears] =
    useState<PaginatedData<YearResponseDto> | null>(null);

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

  const getYear = async () => {
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
  };

  const getPaginatedYear = async (
    params: GetPaginatedYearPayload
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await YearService.getPaginatedYearApi(params);
      setPaginatedYears(response.data);
    } catch (error) {
      console.error("Error al obtener los años paginados:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

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
    getYear,
    getPaginatedYear,
    deleteYear,
    years,
    paginatedYears,
  };

  return (
    <YearContext.Provider value={contextValue}>{children}</YearContext.Provider>
  );
};
