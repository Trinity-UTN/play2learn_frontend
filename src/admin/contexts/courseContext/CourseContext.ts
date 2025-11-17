import { createContext } from "react";
import type { CourseContextType } from "./CourseContext.type";

export const CourseContext = createContext<CourseContextType | undefined>(
  undefined
);
