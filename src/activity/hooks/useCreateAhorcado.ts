import { useContext } from "react";
import { AhorcadoContext } from "../contexts/ahorcadoContext/AhorcadoContext";

export const useCreateAhorcado = () => {
  const context = useContext(AhorcadoContext);
  if (!context)
    throw new Error("useCreateAhorcado debe usarse dentro de AhorcadoProvider");
  return context;
};
