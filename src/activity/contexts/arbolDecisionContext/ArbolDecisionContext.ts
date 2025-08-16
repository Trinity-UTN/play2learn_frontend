import { createContext } from "react";
import type { ArbolDecisionContextType } from "./ArbolDecisionContext.type";

export const ArbolDecisionContext = createContext<
  ArbolDecisionContextType | undefined
>(undefined);
