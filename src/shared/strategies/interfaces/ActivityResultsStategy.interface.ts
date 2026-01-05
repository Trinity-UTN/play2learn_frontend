export interface StatsLabels {
  correctAnswers: string | null;
  incorrectAnswers: string | null;
  unanswered: string | null;
}

export interface ActivityResultsStrategy {
  getStatsLabels(): StatsLabels;
  shouldShowScore(): boolean;
}
