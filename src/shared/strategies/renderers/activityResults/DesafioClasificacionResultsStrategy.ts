import type {
  ActivityResultsStrategy,
  StatsLabels,
} from "../../interfaces/ActivityResultsStategy.interface";

export class DesafioClasificacionResultsStrategy
  implements ActivityResultsStrategy
{
  getStatsLabels(): StatsLabels {
    return {
      correctAnswers: "Conceptos correctos",
      incorrectAnswers: "Conceptos incorrectos",
      unanswered: "Conceptos no clasificados",
    };
  }

  shouldShowScore(): boolean {
    return true;
  }
}
