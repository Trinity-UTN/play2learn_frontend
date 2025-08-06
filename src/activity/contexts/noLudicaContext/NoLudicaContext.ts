import { createContext } from "react";
import type { NoLudicaContextType } from "./NoLudicaContext.type";

export const NoLudicaContext = createContext<NoLudicaContextType | undefined>(
  undefined
);
