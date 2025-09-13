import { useContext } from "react";
import { PreguntadosGameContext } from "../../contexts/gamesContext/preguntadosGameContext/PreguntadosGameContext";
import type { PreguntadosGameContextType } from "../../contexts/gamesContext/preguntadosGameContext/PreguntadosGameContext.type";

export const usePreguntadosGame = (): PreguntadosGameContextType => {
  const context = useContext(PreguntadosGameContext);
  if (!context) {
    throw new Error(
      "usePreguntadosGame must be used within an PreguntadosGameProvider"
    );
  }
  return context;
};
