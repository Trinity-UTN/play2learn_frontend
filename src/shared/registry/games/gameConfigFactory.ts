import type { GameConfig } from "../../../student/types/Activity.type";
import { GameType } from "../../../shared/types/Games.type";
import type { AhorcadoConfig } from "../../../activity/types/Ahorcado.type";
import type { DesafioClasificacionConfig } from "../../../activity/types/DesafioClasificacion.type";

interface RawActivityData {
  name: string;
  [key: string]: any;
}

// EXPO: Factory pattern para gameConfig
export function createGameConfig(
  gameType: GameType,
  data: RawActivityData
): GameConfig {
  switch (gameType) {
    case GameType.AHORCADO:
      return {
        word: data.word,
        errorsPermited: data.errorsPermited,
      } as AhorcadoConfig;

    case GameType.CLASIFICACION:
      return {
        categories: data.categories,
      } as DesafioClasificacionConfig;

    default:
      throw new Error(`No se puede crear gameConfig para el tipo: ${gameType}`);
  }
}
