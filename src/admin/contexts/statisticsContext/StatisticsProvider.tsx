import { useCallback, useState, type ReactNode } from "react";
import { StatisticsContext } from "./StatisticsContext";
import type { StatisticsContextType } from "./StatisticsContext.type";
import { StatisticsService } from "../../services/statistics/statisticsService";
import type { StatisticsResponseDto } from "../../types/statistics.types";

import { useHandleApiError } from "../../../shared/hooks/useHandleApiError";

interface StatisticsProviderProps {
  children: ReactNode;
}

export const StatisticsProvider: React.FC<StatisticsProviderProps> = ({
  children,
}) => {
  const { handleApiError } = useHandleApiError();

  const [loading, setLoading] = useState<boolean>(false);
  const [statistics, setStatisticss] = useState<StatisticsResponseDto>();

  const getStatistics = useCallback(async () => {
    setLoading(true);
    try {
      const response = await StatisticsService.getStatisticsApi();
      setStatisticss(response.data.data);
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
