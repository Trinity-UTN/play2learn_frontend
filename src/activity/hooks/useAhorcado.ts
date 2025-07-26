import { useContext } from "react";
import { AhorcadoContext } from "../contexts/ahorcadoContext/AhorcadoContext";

export const useAhorcado = () => {
  const context = useContext(AhorcadoContext);
  if (!context) {
    throw new Error("useAhorcado must be used within an AhorcadoProvider");
  }
  return context;
};
