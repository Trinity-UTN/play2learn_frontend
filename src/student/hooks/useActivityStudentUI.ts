import { useContext } from "react";
import { ActivityStudentContextUI } from "../context/activityStudentContext/activityStudentContextUI/ActivityStudentContextUI";

export const useActivityStudentUI = () => {
  const context = useContext(ActivityStudentContextUI);
  if (!context) {
    throw new Error(
      "useActivityStudentUI must be used within an ActivityStudentProviderUI"
    );
  }
  return context;
};
