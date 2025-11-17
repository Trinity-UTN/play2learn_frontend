import { createContext } from "react";
import type { CajaDeAhorroContextType } from "./CajaDeAhorroStudentContext.type";

export const CajaDeAhorroContext = createContext<
  CajaDeAhorroContextType | undefined
>(undefined);
