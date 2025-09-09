import { useAhorcadoGame } from "../../hooks/games/useAhorcadoGame";
import { useClasificaionGame } from "../../hooks/games/useClasificacionGame";
import { GameType, type GameHook } from "../../types/Games.type";

export const gameHooksRegistry: Record<GameType, () => GameHook> = {
  [GameType.AHORCADO]: useAhorcadoGame,
  [GameType.CLASIFICACION]: useClasificaionGame,
};
