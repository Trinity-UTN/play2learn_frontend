import { useContext } from "react";
import { CompletarOracionContext } from "../contexts/completarOracionContext/CompletarOracionContext";

export const useCompletarOracion = () => {
  const context = useContext(CompletarOracionContext);
  if (!context) {
    throw new Error(
      "useCompletarOracion must be used within an CompletarOracionProvider"
    );
  }
  return context;
};
