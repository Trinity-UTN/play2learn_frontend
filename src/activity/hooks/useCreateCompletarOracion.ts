import { useContext } from "react";
import { CompletarOracionContext } from "../contexts/completarOracionContext/CompletarOracionContext";

export const useCreateCompletarOracion = () => {
  const context = useContext(CompletarOracionContext);
  if (!context) {
    throw new Error(
      "useCreateCompletarOracion must be used within an CompletarOracionProvider"
    );
  }
  return context;
};
