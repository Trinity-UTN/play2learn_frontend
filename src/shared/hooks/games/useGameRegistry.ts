import { useMemo } from "react";
import { gameHooksRegistry } from "../../registry/games/gameHooksRegistry";
import { GameType, type GameHook } from "../../types/Games.type";

/** Devuelve el hook correspondiente al tipo de juego.
 *  No lo ejecuta, solo lo retorna para que el componente lo use. */
export const useGameRegistry = (
  gameType: GameType | null
): (() => GameHook) | null => {
  return useMemo(() => {
    if (!gameType || !gameHooksRegistry[gameType]) {
      console.warn(`Game hook not found for game type: ${gameType}`);
      return null;
    }

    return gameHooksRegistry[gameType];
  }, [gameType]);
};
