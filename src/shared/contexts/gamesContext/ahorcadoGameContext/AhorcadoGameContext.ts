import { createContext } from "react";
import type { AhorcadoGameContextType } from "./AhorcadoGameContext.type";

export const AhorcadoGameContext = createContext<
  AhorcadoGameContextType | undefined
>(undefined);
