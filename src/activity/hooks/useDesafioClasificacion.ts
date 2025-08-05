import { useContext } from "react";
import { DesafioClasificacionContext } from "../contexts/desafioClasificacion/DesafioClasificacionContext";

export const useCreateDesafioClasificacion = () => {
  const context = useContext(DesafioClasificacionContext);
  if (!context) {
    throw new Error(
      "useDesafioClasificaciona must be used within an DesafioClasificacionProvider"
    );
  }
  return context;
};
