import { useContext } from "react";
import { CreateAhorcadoContext } from "../contexts/createAhorcadoContext/CreateAhorcadoContext";

export const useCreateAhorcado = () => {
  const context = useContext(CreateAhorcadoContext);
  if (!context)
    throw new Error(
      "useCreateAhorcado debe usarse dentro de CreateAhorcadoProvider"
    );
  return context;
};
