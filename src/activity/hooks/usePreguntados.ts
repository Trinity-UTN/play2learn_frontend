import { useContext } from "react";
import { PreguntadosContext } from "../contexts/preguntadosContext/PreguntadosContext";

export const usePreguntados = () => {
  const context = useContext(PreguntadosContext);
  if (!context) {
    throw new Error(
      "usePreguntados must be used within an PreguntadosProvider"
    );
  }
  return context;
};
