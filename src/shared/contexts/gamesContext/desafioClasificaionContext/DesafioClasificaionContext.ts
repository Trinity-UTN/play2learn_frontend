import { createContext } from "react";
import type { DesafioClasificacionGameContextType } from "./DesafioClasificaionGameContext.type";

export const DesafioGameContext = createContext<
  DesafioClasificacionGameContextType | undefined
>(undefined);
