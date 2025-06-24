import { createContext } from "react";
import type { TeacherContextType } from "./TeacherContext.type";

export const TeacherContext = createContext<TeacherContextType| undefined>(
  undefined
);