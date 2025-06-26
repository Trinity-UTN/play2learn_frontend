import { useState, type ReactNode } from "react";
import { YearContext } from "./YearContext";
import type { YearContextType } from "./YearContext.types";
import { YearService } from "../../services/Year/YearService";
import type {
  CreateYearPayload,
  GetYearPayload,
} from "../../services/Year/YearService";

interface YearProviderProps {
  children: ReactNode;
}

export const YearProvider: React.FC<YearProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [years, setYears] = useState<GetYearPayload[]>([]);

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
      console.error("Error al obtener los años:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: YearContextType = {
    loading,
    registerYear,
    getYear,
    years,
  };

  return (
    <YearContext.Provider value={contextValue}>{children}</YearContext.Provider>
  );
};
