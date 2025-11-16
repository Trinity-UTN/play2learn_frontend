import { createContext } from "react";
import type { ActivityTeacherContextType } from "./ActivityTeacherContext.type";

export const ActivityTeacherContext = createContext<
  ActivityTeacherContextType | undefined
>(undefined);
