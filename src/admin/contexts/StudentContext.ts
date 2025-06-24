import { createContext } from "react";
import type { StudentContextType } from "./StudentContext.types";

export const StudentContext = createContext<StudentContextType | undefined>(
  undefined
);
