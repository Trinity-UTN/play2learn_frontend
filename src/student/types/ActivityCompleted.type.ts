export type ActivityCompletedState = "APPROVED" | "DISAPPROVED" | "PENDING";

export interface ActivityCompletedInterface {
  activityId: number;
  state: ActivityCompletedState;
  score: number | null;
  correctAnswers: number | null;
  incorrectAnswers: number | null;
  unanswered: number | null;
}

export interface ActivityCompletedResponseInterface {
  id: number;
  activityId: number;
  state: ActivityCompletedState;
  reward: number | null;
  remainingAttempts: number | null;
}
