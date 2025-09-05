interface BaseActivity {
  id: string;
  name: string;
  description: string;
  dificulty: string;
  subjectName: string;
  attempts: number;
  remainingAttempts: number;
  status: "CREATED" | "PUBLISHED" | "FINISHED" | "APPROVED";
}
export interface ActivityNotApprovedResponseInterface extends BaseActivity {
  startDate: string;
  endDate: string;
  maxTime: number;
  minReward: number;
  maxReward: number;
  pending: boolean;
  type: string;
}

export interface ActivityApprovedResponseInterface extends BaseActivity {
  completedAt: string;
  reward: number;
}

export interface ActivityUI {
  id: string;
  name: string;
  description: string;
  dificulty: string;
  subjectName: string;
  status: "CREATED" | "PUBLISHED" | "FINISHED" | "APPROVED";
  dateLabel?: string;
  timeLabel?: string;
  rewardLabel?: string;
  reward?: string;
  attemptsLabel: string;
  noAttempts: boolean;
  dueDateLabel?: string;
  extraInfo?: string;
}
