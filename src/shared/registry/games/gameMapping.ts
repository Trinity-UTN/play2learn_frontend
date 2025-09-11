import { GameType } from "../../types/Games.type";

const ACTIVITY_NAME_TO_GAME_TYPE: Record<string, GameType> = {
  ahorcado: GameType.AHORCADO,
  "ahorcado educativo": GameType.AHORCADO,
  hangman: GameType.AHORCADO,
  "desafio de clasificacion": GameType.CLASIFICACION,
};

export const getGameTypeFromActivityName = (
  activityName: string
): GameType | null => {
  return ACTIVITY_NAME_TO_GAME_TYPE[activityName?.toLowerCase()] || null;
};
