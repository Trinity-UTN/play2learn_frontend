import { createContext } from "react";
import type { MemoramaGameContextType } from "./MemoramaGameContext.type";

export const MemoramaGameContext = createContext<
  MemoramaGameContextType | undefined
>(undefined);
