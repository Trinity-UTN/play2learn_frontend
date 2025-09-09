import { useContext } from "react";
import { DesafioGameContext } from "../../contexts/gamesContext/desafioClasificaionContext/DesafioClasificaionContext";
import type { DesafioClasificacionGameContextType } from "../../contexts/gamesContext/desafioClasificaionContext/DesafioClasificaionGameContext.type";

export const useDesafioGame = (): DesafioClasificacionGameContextType => {
  const context = useContext(DesafioGameContext);
  if (!context) {
    throw new Error(
      "useDesafioGame must be used within an DesafioGameProvider"
    );
  }
  return context;
};
