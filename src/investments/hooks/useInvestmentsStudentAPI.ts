import { useContext } from "react";
import { ActionsContext } from "../contexts/actionsContext/ActionsStudentContext";

export const useActionsStudent = () => {
  const context = useContext(ActionsContext);
  if (!context) {
    throw new Error(
      "useActionsStudent must be used within an ActionsStudentProvider"
    );
  }
  return context;
};
