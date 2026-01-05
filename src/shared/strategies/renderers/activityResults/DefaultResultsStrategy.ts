import type {
  ActivityResultsStrategy,
  StatsLabels,
} from "../../interfaces/ActivityResultsStategy.interface";

export class DefaultResultsStrategy implements ActivityResultsStrategy {
  getStatsLabels(): StatsLabels {
    return {
      correctAnswers: "Respuestas correctas",
      incorrectAnswers: "Respuestas incorrectas",
      unanswered: "Sin responder",
    };
  }

  shouldShowScore(): boolean {
    return true;
  }
}
