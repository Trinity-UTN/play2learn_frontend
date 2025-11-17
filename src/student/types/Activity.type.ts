import type { SubjectResponseDto } from "../../admin/services/subject/SubjectService";
import type { PaginatedData } from "../../shared/types/PaginacionType";
import type { AhorcadoConfig } from "../../activity/types/Ahorcado.type";
import type { DesafioClasificacionConfig } from "../../activity/types/DesafioClasificacion.type";
import type { CompletarOracionInterface as CompletarOracionConfig } from "../../activity/types/CompletarOracion.type";
import type { MemoramaGameConfig } from "../../activity/types/Memorama.type";
import type { NoLudicaInterface as NoLudicaConfig } from "../../activity/types/NoLudica.type";
import type { CreateSequencePayload as OrdenarSecuenciaConfig } from "../../activity/types/OrdenarSecuencia.type";
import type { PreguntadosInterface as PreguntadosConfig } from "../../activity/types/Preguntados.type";

interface BaseActivity {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  subjectName: string;
  subjectId: number;
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
  status: "CREATED" | "PUBLISHED" | "EXPIRED";
}

export interface ActivityApprovedResponseInterface extends BaseActivity {
  completedAt: string;
  reward: number;
  state: "APPROVED";
}

export interface ActivityStatsResponse {
  available: number;
  approved: number;
  disapproved: number;
  expired: number;
}

export interface ActivityStatsApiResponse {
  data: ActivityStatsResponse;
  message: string;
  errors: any;
  timestamp: string;
}

export interface PaginatedActivityNotApprovedResponseInterface {
  data: PaginatedData<ActivityNotApprovedResponseInterface>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface PaginatedActivityApprovedResponseInterface {
  data: PaginatedData<ActivityApprovedResponseInterface>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface ActivityUI {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  subjectName: string;
  status: "CREATED" | "PUBLISHED" | "EXPIRED" | "APPROVED";
  dateLabel?: string;
  timeLabel?: string;
  rewardLabel?: string;
  reward?: string;
  remainingAttempts: number;
  attemptsLabel: string;
  noAttempts: boolean;
  dueDateLabel?: string;
  extraInfo?: string;
}

export type GameConfig =
  | AhorcadoConfig
  | CompletarOracionConfig
  | DesafioClasificacionConfig
  | MemoramaGameConfig
  | NoLudicaConfig
  | OrdenarSecuenciaConfig
  | PreguntadosConfig;

export interface CurrentActivityInterface {
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
