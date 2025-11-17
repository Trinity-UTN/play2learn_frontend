import { useContext } from "react";
import { NoLudicaGameContext } from "../../contexts/gamesContext/noLudicaGameContext/NoLudicaGameContext";
import type { NoLudicaGameContextType } from "../../contexts/gamesContext/noLudicaGameContext/NoLudicaGameContext.type";

export const useNoLudicaGame = (): NoLudicaGameContextType => {
  const context = useContext(NoLudicaGameContext);
  if (!context) {
    throw new Error(
      "useNoLudicaGame must be used within an NoLudicaGameProvider"
    );
  }
  return context;
};
