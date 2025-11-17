import { useContext } from "react";
import { StatisticsContext } from "../contexts/statisticsContext/StatisticsContext";

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (!context) {
    throw new Error("useStatistics must be used within an StatisticsProvider");
  }
  return context;
};
