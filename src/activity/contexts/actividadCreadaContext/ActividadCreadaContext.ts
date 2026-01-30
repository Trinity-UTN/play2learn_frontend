import { createContext } from "react";
import type { ActividadCreadaContextType } from "./ActividadCreadaContext.type";

export const ActividadCreadaContext = createContext<ActividadCreadaContextType | undefined>(
  undefined
);
