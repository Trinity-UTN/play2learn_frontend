import type {
  ActivityResultsStrategy,
  StatsLabels,
} from "../../interfaces/ActivityResultsStategy.interface";

export class PreguntadosResultsStrategy implements ActivityResultsStrategy {
  getStatsLabels(): StatsLabels {
    return {
      correctAnswers: "Respuestas correctas",
      incorrectAnswers: "Respuestas incorrectas",
      unanswered: "Respuestas sin responder",
    };
  }

  shouldShowScore(): boolean {
    return true;
  }
}
