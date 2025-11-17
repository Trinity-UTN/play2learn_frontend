import { createContext } from "react";
import type { CompletarOracionGameContextType } from "./CompletarOracionGameContext.type";

export const CompletarOracionGameContext = createContext<
  CompletarOracionGameContextType | undefined
>(undefined);
