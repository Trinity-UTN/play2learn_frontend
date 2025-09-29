import { createContext } from "react";
import type { NoLudicaGameContextType } from "./NoLudicaGameContext.type";

export const NoLudicaGameContext = createContext<
  NoLudicaGameContextType | undefined
>(undefined);
