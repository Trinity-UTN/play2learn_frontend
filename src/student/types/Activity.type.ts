import type { AhorcadoConfig } from "../../activity/types/Ahorcado.type";
import type { DesafioClasificacionConfig } from "../../activity/types/DesafioClasificacion.type";
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

export type GameConfig = AhorcadoConfig | DesafioClasificacionConfig;
// | PreguntadosConfig
// | MemoramaConfig
// | OrdenarSecuenciaConfig
// | ArbolDeDecisionConfig
// | CompletarOracionConfig

// | NoLudicaConfig
/* No necesariamante todas las actividades usan el config.
 * Hay que ver el response DTO del backend, si coincide el config con el response DTO de 10, sino usamos otra
 */

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
