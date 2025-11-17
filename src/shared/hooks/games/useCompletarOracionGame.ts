import { useContext } from "react";
import { CompletarOracionGameContext } from "../../contexts/gamesContext/completarOracionGameContext/CompletarOracionGameContext";
import type { CompletarOracionGameContextType } from "../../contexts/gamesContext/completarOracionGameContext/CompletarOracionGameContext.type";

export const useCompletarOracionGame = (): CompletarOracionGameContextType => {
  const context = useContext(CompletarOracionGameContext);
  if (!context) {
    throw new Error(
      "useCompletarOracionGame must be used within an CompletarOracionGameProvider"
    );
  }
  return context;
};
