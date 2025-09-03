export interface ActivityNotApprovedResponseInterface {
  id: string;
  description: string;
  startDate: string;
  endDate: string;
  dificulty: string;
  maxTime: number;
  subjectName: string;
  attempts: number;
  remainingAttempts: number;
  name: string;
  type: string;
  status: "CREATED" | "PUBLISHED" | "FINISHED";
  minReward: number;
  maxReward: number;
  pending: boolean;
}
