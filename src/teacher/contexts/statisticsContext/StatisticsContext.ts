import { createContext } from "react";
import type { StatisticsContextType } from "./StatisticsContext.type";

export const StatisticsContext = createContext<
  StatisticsContextType | undefined
>(undefined);
