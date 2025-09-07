import { createContext } from "react";
import type { ActivityStudentContextUIType } from "./ActivityStudentContextUI.type";

export const ActivityStudentContextUI = createContext<
  ActivityStudentContextUIType | undefined
>(undefined);
