import type { SubjectResponseDto } from "@/admin";
import type { GameConfig } from "@/student/types/Activity.type";

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