import { createContext } from "react";
import type { DesafioClasificacionGameContextType } from "./DesafioClasificacionGameContext.type";

export const DesafioGameContext = createContext<
  DesafioClasificacionGameContextType | undefined
>(undefined);
