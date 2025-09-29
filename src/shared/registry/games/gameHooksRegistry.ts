import { useAhorcadoGame } from "../../hooks/games/useAhorcadoGame";
import { useCompletarOracionGame } from "../../hooks/games/useCompletarOracionGame";
import { useDesafioClasificacionGame } from "../../hooks/games/useDesafioClasificacionGame";
import { useMemoramaGame } from "../../hooks/games/useMemoramaGame";
import { useNoLudicaGame } from "../../hooks/games/useNoLudicaGame";
import { useOrdenarSecuenciaGame } from "../../hooks/games/useOrdenarSecuenciaGame";
import { usePreguntadosGame } from "../../hooks/games/usePreguntadosGame";
import { GameType, type GameHook } from "../../types/Games.type";

export const gameHooksRegistry: Record<GameType, () => GameHook> = {
  [GameType.AHORCADO]: useAhorcadoGame,
  [GameType.CLASIFICACION]: useDesafioClasificacionGame,
  [GameType.COMPLETAR_ORACION]: useCompletarOracionGame,
  [GameType.MEMORAMA]: useMemoramaGame,
  [GameType.NO_LUDICA]: useNoLudicaGame,
  [GameType.ORDENAR_SECUENCIA]: useOrdenarSecuenciaGame,
  [GameType.PREGUNTADOS]: usePreguntadosGame,
};
