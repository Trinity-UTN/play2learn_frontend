import type {
  ActivityResultsStrategy,
  StatsLabels,
} from "../../interfaces/ActivityResultsStategy.interface";

export class CompletarOracionResultsStrategy
  implements ActivityResultsStrategy
{
  getStatsLabels(): StatsLabels {
    return {
      correctAnswers: "Oraciones correctas",
      incorrectAnswers: "Oraciones incorrectas",
      unanswered: "Oraciones sin completar",
    };
  }

  shouldShowScore(): boolean {
    return true;
  }
}
