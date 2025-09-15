import { GameType } from "../../types/Games.type";
import DetailsAhorcado from "../../../student/components/DetailsGame/DetailsAhoracado/DetailsAhorcado";
import DetailsDesafioClasificacionGame from "../../../student/components/DetailsGame/DetailsDesafioClasificacion/DetailsDesafioClasificacionGame";

export const GAME_TYPE_TO_COMPONENT: Record<GameType, React.FC<any>> = {
  [GameType.AHORCADO]: DetailsAhorcado,
  [GameType.CLASIFICACION]: DetailsDesafioClasificacionGame,
};
