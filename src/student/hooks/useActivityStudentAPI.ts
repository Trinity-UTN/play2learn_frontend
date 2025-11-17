import { useContext } from "react";
import { ActivityStudentContext } from "../context/activityStudentContext/activityStudentContextAPI/ActivityStudentContextAPI";

export const useActivityStudent = () => {
  const context = useContext(ActivityStudentContext);
  if (!context) {
    throw new Error(
      "useActivityStudent must be used within an ActivityStudentProvider"
    );
  }
  return context;
};
