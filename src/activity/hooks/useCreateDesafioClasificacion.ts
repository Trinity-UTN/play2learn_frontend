import { useContext } from "react";
import { DesafioClasificacionContext } from "../contexts/desafioClasificacionContext/DesafioClasificacionContext";

export const useCreateDesafioClasificacion = () => {
  const context = useContext(DesafioClasificacionContext);
  if (!context) {
    throw new Error(
      "useCreateDesafioClasificacion must be used within an DesafioClasificacionProvider"
    );
  }
  return context;
};
