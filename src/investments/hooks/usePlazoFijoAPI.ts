import { useContext } from "react";
import { PlazoFijoContext } from "../contexts/plazoFijoContext/PlazoFijoStudentContext";

export const usePlazoFijoStudent = () => {
  const context = useContext(PlazoFijoContext);
  if (!context) {
    throw new Error(
      "usePlazoFijoStudent must be used within an PlazoFijoStudentProvider"
    );
  }
  return context;
};
