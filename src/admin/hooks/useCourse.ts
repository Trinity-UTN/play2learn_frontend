import { useContext } from "react";
import { CourseContext } from "../contexts/courseContext/CourseContext";

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within an CourseProvider");
  }
  return context;
};
