import { useContext } from "react";
import { AhorcadoGameContext } from "../../contexts/gamesContext/ahorcadoGameContext/AhorcadoGameContext";
import type { AhorcadoGameContextType } from "../../contexts/gamesContext/ahorcadoGameContext/AhorcadoGameContext.type";

export const useAhorcadoGame = (): AhorcadoGameContextType => {
  const context = useContext(AhorcadoGameContext);
  if (!context) {
    throw new Error(
      "useAhorcadoGame must be used within an AhorcadoGameProvider"
    );
  }
  return context;
};
