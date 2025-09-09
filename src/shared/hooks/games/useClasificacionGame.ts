import { useContext } from "react";
import { DesafioGameContext } from "../../contexts/gamesContext/desafioClasificaionGameContext/DesafioClasificaionContext";
import type { DesafioClasificacionGameContextType } from "../../contexts/gamesContext/desafioClasificaionGameContext/DesafioClasificaionGameContext.type";

export const useDesafioGame = (): DesafioClasificacionGameContextType => {
  const context = useContext(DesafioGameContext);
  if (!context) {
    throw new Error(
      "useDesafioGame must be used within an DesafioGameProvider"
    );
  }
  return context;
};
