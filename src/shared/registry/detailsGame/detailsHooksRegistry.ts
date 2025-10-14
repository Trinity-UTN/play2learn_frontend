import { GameType } from "../../types/Games.type";
import DetailsAhorcado from "../../../student/components/DetailsGame/DetailsAhoracado/DetailsAhorcado";
import DetailsCompletarOracionGame from "../../../student/components/DetailsGame/DetailsCompletarOracion/DetailsCompletarOracionGame";
import DetailsDesafioClasificacionGame from "../../../student/components/DetailsGame/DetailsDesafioClasificacion/DetailsDesafioClasificacionGame";
import DetailsNoLudicaGame from "../../../student/components/DetailsGame/DetailsNoLudica/DetailsNoLudicaGame";
export const GAME_TYPE_TO_COMPONENT: Record<GameType, React.FC<any>> = {
  [GameType.AHORCADO]: DetailsAhorcado,
  [GameType.CLASIFICACION]: DetailsDesafioClasificacionGame,
  [GameType.COMPLETAR_ORACION]: DetailsCompletarOracionGame,
  [GameType.MEMORAMA]: DetailsDesafioClasificacionGame,
  [GameType.NO_LUDICA]: DetailsDesafioClasificacionGame,
  [GameType.ORDENAR_SECUENCIA]: DetailsDesafioClasificacionGame,
  [GameType.PREGUNTADOS]: DetailsDesafioClasificacionGame,
  [GameType.NO_LUDICA]: DetailsNoLudicaGame,
};
