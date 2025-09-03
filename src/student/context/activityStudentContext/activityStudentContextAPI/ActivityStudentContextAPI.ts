import { createContext } from "react";
import type { ActivityStudentContextType } from "./ActivityStudentContextAPI.type";

export const ActivityStudentContext = createContext<
  ActivityStudentContextType | undefined
>(undefined);
