import { createContext } from "react";
import type { AhorcadoContextType } from "./AhoracadoContext.type";

export const AhorcadoContext = createContext<AhorcadoContextType  | undefined>(
  undefined
);