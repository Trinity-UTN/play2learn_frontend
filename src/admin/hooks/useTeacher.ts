import { useContext } from "react";
import { TeacherContext } from "../contexts/teacherContext/TeacherContext";

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeacher must be used within an TeacherProvider");
  }
  return context;
};
