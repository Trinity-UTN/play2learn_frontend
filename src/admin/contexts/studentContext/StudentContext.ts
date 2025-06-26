import { createContext } from "react";
import type { StudentContextType } from "./StudentContext.type";

export const StudentContext = createContext<StudentContextType | undefined>(
  undefined
);
