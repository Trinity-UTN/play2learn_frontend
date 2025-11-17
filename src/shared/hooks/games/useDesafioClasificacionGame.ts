import { useContext } from "react";
import { DesafioGameContext } from "../../contexts/gamesContext/desafioClasificacionGameContext/DesafioClasificacionGameContext";
import type { DesafioClasificacionGameContextType } from "../../contexts/gamesContext/desafioClasificacionGameContext/DesafioClasificacionGameContext.type";

export const useDesafioClasificacionGame =
  (): DesafioClasificacionGameContextType => {
    const context = useContext(DesafioGameContext);
    if (!context) {
      throw new Error(
        "useDesafioClasificacionGame must be used within an DesafioClasificacionGameProvider"
      );
    }
    return context;
  };
