import { createContext } from "react";
import type { ClasificacionContextType } from "./DesafioClasificacionContext.type";

export const DesafioClasificacionContext = createContext<
  ClasificacionContextType | undefined
>(undefined);
