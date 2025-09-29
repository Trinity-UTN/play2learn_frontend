import type { GameConfig } from "../../../student/types/Activity.type";
import { GameType } from "../../../shared/types/Games.type";
import type { AhorcadoConfig } from "../../../activity/types/Ahorcado.type";
import type { CompletarOracionInterface as CompletarOracionConfig } from "../../../activity/types/CompletarOracion.type";
import type { DesafioClasificacionConfig } from "../../../activity/types/DesafioClasificacion.type";
import type { MemoramaGameConfig } from "../../../activity/types/Memorama.type";
import type { NoLudicaInterface as NoLudicaConfig } from "../../../activity/types/NoLudica.type";
import type { CreateSequencePayload as OrdenarSecuenciaConfig } from "../../../activity/types/OrdenarSecuencia.type";
import type { PreguntadosInterface as PreguntadosGameConfig } from "../../../activity/types/Preguntados.type";

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

    case GameType.COMPLETAR_ORACION:
      return { sentences: data.sentences } as CompletarOracionConfig;

    case GameType.MEMORAMA:
      return {
        couples: data.couples,
      } as MemoramaGameConfig;

    case GameType.NO_LUDICA:
      return {
        excercise: data.excercise,
        tipoEntrega: data.tipoEntrega,
      } as NoLudicaConfig;

    case GameType.ORDENAR_SECUENCIA:
      return {
        events: data.events,
      } as OrdenarSecuenciaConfig;

    case GameType.PREGUNTADOS:
      return {
        maxTimePerQuestionInSeconds: data.maxTimePerQuestionInSeconds,
        questions: data.questions,
      } as PreguntadosGameConfig;

    default:
      throw new Error(`No se puede crear gameConfig para el tipo: ${gameType}`);
  }
}
