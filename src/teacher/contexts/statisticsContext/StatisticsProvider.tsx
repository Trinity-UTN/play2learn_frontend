import { useCallback, useState, type ReactNode } from "react";
import { StatisticsService } from "../../services/statistics/statisticsService";
import type { StatisticsContextType } from "./StatisticsContext.type";

import { StatisticsContext } from "./StatisticsContext";
import { useHandleApiError } from "@/shared";
import type { StatisticsResponse } from "../../types/Statistics.type";

interface StatisticsProviderProps {
  children: ReactNode;
}

export const StatisticsProvider: React.FC<StatisticsProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(false);
  const [statistics, setStatistics] = useState<StatisticsResponse>();

  const getStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await StatisticsService.getStatisticsApi();

      setStatistics(response.data.data);
    } catch (error) {
      handleApiError(error, "Error al obtener las estadísticas");
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValue: StatisticsContextType = {
    loading,
    statistics,
    getStatistics,
  };

  return (
    <StatisticsContext.Provider value={contextValue}>
      {children}
    </StatisticsContext.Provider>
  );
};
