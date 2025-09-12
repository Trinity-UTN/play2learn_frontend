import { GameType } from "../../types/Games.type";
import DetailsAhorcado from "../../components/DetailsGame/DetailsAhoracado/DetailsAhorcado";
import DetailsDesafioClasificacionGame from "../../components/DetailsGame/DetailsDesafioClasificacion/DetailsDesafioClasificacionGame";

export const GAME_TYPE_TO_COMPONENT: Record<GameType, React.FC<any>> = {
  [GameType.AHORCADO]: DetailsAhorcado,
  [GameType.CLASIFICACION]: DetailsDesafioClasificacionGame,
};
