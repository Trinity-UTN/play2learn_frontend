import type {
  ActivityResultsStrategy,
  StatsLabels,
} from "../../interfaces/ActivityResultsStategy.interface";

export class NoLudicaResultsStrategy implements ActivityResultsStrategy {
  getStatsLabels(): StatsLabels {
    return {
      correctAnswers: null, // No mostrar nada
      incorrectAnswers: null,
      unanswered: null,
    };
  }

  shouldShowScore(): boolean {
    return true;
  }
}
