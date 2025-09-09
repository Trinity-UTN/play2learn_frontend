import { useAhorcadoGame } from "../../hooks/games/useAhorcadoGame";
import { GameType, type GameHook } from "../../types/Games.type";

export const gameHooksRegistry: Record<GameType, () => GameHook> = {
  [GameType.AHORCADO]: useAhorcadoGame,
};
