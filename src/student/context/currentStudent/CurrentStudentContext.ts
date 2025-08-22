import { createContext } from "react";
import type { CurrentStudentContextType } from "./CurrentStudentContext.type";

export const CurrentStudentContext = createContext<
  CurrentStudentContextType | undefined
>(undefined);
