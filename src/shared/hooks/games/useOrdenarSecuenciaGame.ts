import { useContext } from "react";
import { OrdenarSecuenciaGameContext } from "../../contexts/gamesContext/ordenarSecuenciaGameContext/OrdenarSecuenciaGameContext";
import type { OrdenarSecuenciaGameContextType } from "../../contexts/gamesContext/ordenarSecuenciaGameContext/OrdenarSecuenciaGameContext.type";

export const useOrdenarSecuenciaGame = (): OrdenarSecuenciaGameContextType => {
  const context = useContext(OrdenarSecuenciaGameContext);
  if (!context) {
    throw new Error(
      "useOrdenarSecuenciaGame must be used within an OrdenarSecuenciaGameProvider"
    );
  }
  return context;
};
