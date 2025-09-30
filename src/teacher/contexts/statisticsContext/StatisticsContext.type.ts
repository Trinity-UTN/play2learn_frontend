import type { StatisticsResponse } from "../../types/Statistics.type";

export interface StatisticsContextType {
  loading: boolean;
  statistics: StatisticsResponse | undefined;
  getStatistics: () => void;
}
