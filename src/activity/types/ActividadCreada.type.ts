import type { SubjectResponseDto } from "@/admin";
import type { GameConfig } from "@/student/types/Activity.type";

export type ActividadCreadaGeneral = {
  id: number,
  description: string;
  startDate: string;
  endDate: string;
  difficulty: string;
  maxTime: number;
  subjectId: number;
  attempts: number;
  initialBalance: number;
  typeReward: string;
  subject: SubjectResponseDto;
}
export interface ActividadCreadaResponse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  difficulty: string;
  subject: SubjectResponseDto;
  maxTime: number;
  attempts: number;
  actualBalance: number;
  initialBalance: number;
  typeReward: string;
  gameConfig: GameConfig;
}