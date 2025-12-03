import { createContext } from "react";
import type { RankingContextType } from "./RankingContext.type";

export const RankingContext = createContext<RankingContextType | undefined>(
  undefined
);
