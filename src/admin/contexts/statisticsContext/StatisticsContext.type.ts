import type { StatisticsResponseDto } from "../../types/statistics.types";

export interface StatisticsContextType {
  loading: boolean;
  statistics: StatisticsResponseDto | undefined;
  getStatistics: () => void;
}
