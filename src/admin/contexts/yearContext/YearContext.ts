import { createContext } from "react";
import type { YearContextType } from "./YearContext.type";

export const YearContext = createContext<YearContextType | undefined>(
  undefined
);
