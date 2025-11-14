import { useContext } from "react";
import { CajaDeAhorroContext } from "../contexts/cajaDeAhorroContext/CajaDeAhorroStudentContext";

export const useCajaDeAhorroStudent = () => {
  const context = useContext(CajaDeAhorroContext);
  if (!context) {
    throw new Error(
      "useCajaDeAhorroStudent must be used within an CajaDeAhorroStudentProvider"
    );
  }
  return context;
};
