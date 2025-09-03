import { useCallback, useState, type ReactNode } from "react";
import { YearContext } from "./YearContext";
import type { YearContextType } from "./YearContext.type";
import { YearService } from "../../services/Year/YearService";
import type {
  CreateYearPayload,
  UpdateYearPayload,
  YearResponseDto,
} from "../../services/Year/YearService";
import type {
  GetPaginated,
  PaginatedData,
} from "../../../shared/types/PaginacionType";
import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

interface YearProviderProps {
  children: ReactNode;
}

export const YearProvider: React.FC<YearProviderProps> = ({ children }) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(false);
  const [years, setYears] = useState<YearResponseDto[]>([]);
  const [paginatedYears, setPaginatedYears] =
    useState<PaginatedData<YearResponseDto> | null>(null);
  const [selectedYear, setSelectedYear] = useState<YearResponseDto | null>(
    null
  );

  const registerYear = async (data: CreateYearPayload): Promise<void> => {
    setLoading(true);
    try {
      await YearService.registerYearApi(data);
    } catch (error) {
      handleApiError(error, "Error al crear el año");
    } finally {
      setLoading(false);
    }
  };

  const updateYear = async (data: UpdateYearPayload): Promise<void> => {
    setLoading(true);
    try {
      await YearService.updateYearApi(data);
    } catch (error) {
      handleApiError(error, "Error al actualizar el año");
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
      handleApiError(error, "Error al obtener los años");
    } finally {
      setLoading(false);
    }
  }, []);

  const getYearById = async (
    id: number
  ): Promise<YearResponseDto | undefined> => {
    setLoading(true);
    try {
      const yearData = await YearService.getYearByIdApi(id);
      return yearData;
    } catch (error) {
      handleApiError(error, "Error al obtener el año por ID");
    } finally {
      setLoading(false);
    }
  };

  const getPaginatedYear = useCallback(
    async (params: GetPaginated): Promise<void> => {
      setLoading(true);
      try {
        const response = await YearService.getPaginatedYearApi(params);
        setPaginatedYears(response.data);
      } catch (error) {
        handleApiError(error, "Error al obtener los años paginados");
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
      handleApiError(error, "Error al eliminar el año");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: YearContextType = {
    loading,
    years,
    paginatedYears,
    selectedYear,
    registerYear,
    updateYear,
    getYear,
    getYearById,
    getPaginatedYear,
    deleteYear,
    setSelectedYear,
  };

  return (
    <YearContext.Provider value={contextValue}>{children}</YearContext.Provider>
  );
};
