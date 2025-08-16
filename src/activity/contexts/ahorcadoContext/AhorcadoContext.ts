import { createContext } from "react";
import type { AhorcadoContextType } from "./AhorcadoContext.type";

export const AhorcadoContext = createContext<AhorcadoContextType | undefined>(
  undefined
);
