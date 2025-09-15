export type ActivityCompletedState = "APPROVED" | "DISAPPROVED" | "PENDING";

export interface ActivityCompletedInterface {
  activityId: number;
  state: ActivityCompletedState;
}

export interface ActivityCompletedResponseInterface {
  id: number;
  activityId: number;
  state: ActivityCompletedState;
  reward: number | null;
  remainingAttempts: number | null;
}
