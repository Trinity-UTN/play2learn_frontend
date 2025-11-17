import { useContext } from "react";
import { MemoramaGameContext } from "../../contexts/gamesContext/memoramaGameContext/MemoramaGameContext";
import type { MemoramaGameContextType } from "../../contexts/gamesContext/memoramaGameContext/MemoramaGameContext.type";

export const useMemoramaGame = (): MemoramaGameContextType => {
  const context = useContext(MemoramaGameContext);
  if (!context) {
    throw new Error(
      "useMemoramaGame must be used within an MemoramaGameProvider"
    );
  }
  return context;
};
