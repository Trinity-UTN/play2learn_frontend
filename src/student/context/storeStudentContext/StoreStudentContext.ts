import { createContext } from "react";
import type { StoreContextType } from "./StoreStudentContext.type";

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);
