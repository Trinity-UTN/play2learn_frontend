import { createContext } from "react";
import type { PlazoFijoContextType } from "./PlazoFijoStudentContext.type";

export const PlazoFijoContext = createContext<PlazoFijoContextType | undefined>(
  undefined
);
