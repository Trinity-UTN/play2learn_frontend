import { createContext } from "react";
import type { CompletarOracionContextType } from "./CompletarOracionContext.type";

export const CompletarOracionContext = createContext<
  CompletarOracionContextType | undefined
>(undefined);
