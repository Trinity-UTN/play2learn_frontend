import { createContext } from "react";
import type { OrdenarSecuenciaGameContextType } from "./OrdenarSecuenciaGameContext.type";

export const OrdenarSecuenciaGameContext = createContext<
  OrdenarSecuenciaGameContextType | undefined
>(undefined);
