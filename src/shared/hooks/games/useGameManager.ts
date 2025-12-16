import { useMemo } from "react";
import { useGameRegistry } from "./useGameRegistry";
import { getGameTypeFromActivityName } from "@/shared";
import type { GameHook } from "../../types/Games.type";

/**
 * Hook compuesto que devuelve el hook de juego apropiado
 * a partir del nombre de la actividad.
 */
export const useGameManager = (
  activityName: string | null | undefined
): GameHook | null => {
  const gameType = useMemo(() => {
    if (!activityName) return null;
    return getGameTypeFromActivityName(activityName);
  }, [activityName]);

  const gameHook = useGameRegistry(gameType);

  return gameHook ? gameHook() : null;
};
