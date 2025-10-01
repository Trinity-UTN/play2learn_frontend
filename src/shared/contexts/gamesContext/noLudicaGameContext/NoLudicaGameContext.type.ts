import type { NoLudicaConfig } from "../../../../activity/types/NoLudica.type";
import type { GameHook } from "../../../types/Games.type";

export interface NoLudicaGameContextType extends GameHook {
  // Estados del juego
  gameConfig: NoLudicaConfig | null;
  // Estados calculados
  // Funciones del juego
}
