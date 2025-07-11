import { useContext } from "react";
import { SubjectContext } from "../contexts/subjectContext/SubjectContext";

export const useSubject = () => {
  const context = useContext(SubjectContext);
  if (!context) {
    throw new Error("useSubject must be used within an SubjectProvider");
  }
  return context;
};
