import { createContext } from "react";
import type { YearContextType } from "./YearContext.types";

export const YearContext = createContext<YearContextType | undefined>(
  undefined
);
