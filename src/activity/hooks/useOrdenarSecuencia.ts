import { useContext } from "react";
import { OrdenarSecuenciaContext } from "../contexts/ordenarSecuenciaContext/OrdenarSecuenciaContext";

export const useCreateOrdenarSecuencia = () => {
  const context = useContext(OrdenarSecuenciaContext);
  if (!context) {
    throw new Error(
      "useCreatePreguntados must be used within an CreatePreguntadosProvider"
    );
  }
  return context;
};
