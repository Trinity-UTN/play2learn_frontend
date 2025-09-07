import type { SubjectResponseDto } from "../../admin/services/subject/SubjectService";

interface BaseActivity {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  subjectName: string;
  attempts: number;
  remainingAttempts: number;
}
export interface ActivityNotApprovedResponseInterface extends BaseActivity {
  startDate: string;
  endDate: string;
  maxTime: number;
  minReward: number;
  maxReward: number;
  pending: boolean;
  type: string;
  status: "CREATED" | "PUBLISHED" | "FINISHED";
}

// Hecho solo para el ahorcado por ahora
export interface CurrentActivityInterface {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  dificulty: string;
  subject: SubjectResponseDto;
  maxTime: number;
  attempts: number;
  actualBalance: number;
  initialBalance: number;
  typeReward: string;
  word: string;
  errorsPermited: string;
}

export interface ActivityApprovedResponseInterface extends BaseActivity {
  completedAt: string;
  reward: number;
  state: "APPROVED";
}

export interface ActivityUI {
  id: string;
  name: string;
  description: string;
  difficulty: string;
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
