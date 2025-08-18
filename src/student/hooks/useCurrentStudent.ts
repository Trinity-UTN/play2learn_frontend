import { useContext } from "react";
import { CurrentStudentContext } from "../context/currentStudent/CurrentStudentContext";
import type { CurrentStudentContextType } from "../context/currentStudent/CurrentStudentContext.type";

export const useCurrentStudent = (): CurrentStudentContextType => {
  const context = useContext(CurrentStudentContext);
  if (context === undefined) {
    throw new Error(
      "useCurrentStudent must be used within a CurrentStudentProvider"
    );
  }
  return context;
};
