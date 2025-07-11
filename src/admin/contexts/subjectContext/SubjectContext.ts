import { createContext } from "react";
import type { SubjectContextType } from "./SubjectContext.type";

export const SubjectContext = createContext<SubjectContextType | undefined>(
  undefined
);
