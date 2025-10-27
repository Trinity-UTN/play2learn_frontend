import { createContext } from "react";
import type { ActionsContextType } from "./ActionsStudentContext.type";

export const ActionsContext = createContext<ActionsContextType | undefined>(
  undefined
);
