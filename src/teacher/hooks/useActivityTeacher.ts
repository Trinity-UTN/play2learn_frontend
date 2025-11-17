import { useContext } from "react";
import { ActivityTeacherContext } from "../contexts/activityTeacherContext/ActivityTeacherContext";

export const useActivityTeacher = () => {
  const context = useContext(ActivityTeacherContext);
  if (!context) {
    throw new Error(
      "useActivityTeacher must be used within an BenefitAPIProvider"
    );
  }
  return context;
};
