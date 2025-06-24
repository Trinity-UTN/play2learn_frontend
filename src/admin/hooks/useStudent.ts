import { useContext } from "react";
import { StudentContext } from "../contexts/Student/StudentContext";

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within an StudentProvider");
  }
  return context;
};
