import { useContext } from "react";
import { PreguntadosContext } from "../contexts/preguntadosContext/PreguntadosContext";

export const useCreatePreguntados = () => {
  const context = useContext(PreguntadosContext);
  if (!context) {
    throw new Error(
      "useCreatePreguntados must be used within an CreatePreguntadosProvider"
    );
  }
  return context;
};
