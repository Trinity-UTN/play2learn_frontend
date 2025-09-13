import { createContext } from "react";
import type { PreguntadosGameContextType } from "./PreguntadosGameContext.type";

export const PreguntadosGameContext = createContext<
  PreguntadosGameContextType | undefined
>(undefined);
