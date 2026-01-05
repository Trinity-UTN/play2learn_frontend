import type { GameType } from "@/shared/types";
import type { ActivityResultsStrategy } from "@/shared/strategies/interfaces/ActivityResultsStategy.interface";
import { AhorcadoResultsStrategy } from "@/shared/strategies/renderers/activityResults/AhorcadoResultsStrategy";
import { CompletarOracionResultsStrategy } from "@/shared/strategies/renderers/activityResults/CompletarOracionResultsStrategy";
import { DesafioClasificacionResultsStrategy } from "@/shared/strategies/renderers/activityResults/DesafioClasificacionResultsStrategy";
import { NoLudicaResultsStrategy } from "@/shared/strategies/renderers/activityResults/NoLudicaResultsStrategy";
import { PreguntadosResultsStrategy } from "@/shared/strategies/renderers/activityResults/PreguntadosResultsStrategy";
import { DefaultResultsStrategy } from "@/shared/strategies/renderers/activityResults/DefaultResultsStrategy";

export class ActivityResultsStrategyFactory {
  static createStrategy(gameType: GameType): ActivityResultsStrategy {
    switch (gameType) {
      case "ahorcado":
        return new AhorcadoResultsStrategy();
      case "desafio de clasificacion":
        return new DesafioClasificacionResultsStrategy();
      case "completar oracion":
        return new CompletarOracionResultsStrategy();
      case "preguntados":
        return new PreguntadosResultsStrategy();
      case "no ludica":
        return new NoLudicaResultsStrategy();
      default:
        return new DefaultResultsStrategy();
    }
  }
}
