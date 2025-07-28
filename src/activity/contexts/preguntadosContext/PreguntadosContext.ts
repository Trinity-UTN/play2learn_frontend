import { createContext } from "react";
import type { PreguntadosContextType } from "./PreguntadosContext.type";

export const PreguntadosContext = createContext<
  PreguntadosContextType | undefined
>(undefined);
