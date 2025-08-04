import { createContext } from "react";
import type { MemoramaContextType } from "./MemoramaContext.type";

export const MemoramaContext = createContext<MemoramaContextType | undefined>(
  undefined
);
