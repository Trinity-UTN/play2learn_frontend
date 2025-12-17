import type {
  ActivityResultsStrategy,
  StatsLabels,
} from "../../interfaces/ActivityResultsStategy.interface";

export class AhorcadoResultsStrategy implements ActivityResultsStrategy {
  getStatsLabels(): StatsLabels {
    return {
      correctAnswers: "Letras correctas",
      incorrectAnswers: "Letras incorrectas",
      unanswered: null, // No mostrar
    };
  }

  shouldShowScore(): boolean {
    return true;
  }
}
