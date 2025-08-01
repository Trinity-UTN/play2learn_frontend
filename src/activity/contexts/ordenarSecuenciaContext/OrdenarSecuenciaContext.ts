import { createContext } from "react";
import type { OrdenarSecuenciaContextType } from "./OrdenarSecuenciaContext.type";

export const OrdenarSecuenciaContext = createContext<
  OrdenarSecuenciaContextType | undefined
>(undefined);
