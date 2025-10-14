import { GameType } from "../../types/Games.type";

const ACTIVITY_NAME_TO_GAME_TYPE: Record<string, GameType> = {
  ahorcado: GameType.AHORCADO,
  "ahorcado educativo": GameType.AHORCADO,
  hangman: GameType.AHORCADO,
  "desafio de clasificacion": GameType.CLASIFICACION,
  desafio_clasificacion: GameType.CLASIFICACION,
  desafio_de_clasificacion: GameType.CLASIFICACION,
  preguntados: GameType.PREGUNTADOS,
  "completar oracion": GameType.COMPLETAR_ORACION,
  completar_oracion: GameType.COMPLETAR_ORACION,
  completaroracion: GameType.COMPLETAR_ORACION,
  memorama: GameType.MEMORAMA,
  "memorama educativo": GameType.MEMORAMA,
  no_ludica: GameType.NO_LUDICA,
  noludica: GameType.NO_LUDICA,
  "no ludica": GameType.NO_LUDICA,
  "ordenar secuencia": GameType.ORDENAR_SECUENCIA,
  ordenar_secuencia: GameType.ORDENAR_SECUENCIA,
  ordenarsecuencia: GameType.ORDENAR_SECUENCIA,
  "preguntados educativo": GameType.PREGUNTADOS,
};

export const getGameTypeFromActivityName = (
  activityName: string
): GameType | null => {
  return ACTIVITY_NAME_TO_GAME_TYPE[activityName?.toLowerCase()] || null;
};
