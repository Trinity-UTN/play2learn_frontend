import type { SubjectResponseDto } from "../../admin/services/subject/SubjectService";

export interface Benefit {
  id: number;
  name: string;
  description: string;
  cost: number;
  category: "Evaluaciones" | "Trabajos" | "Asistencia" | "Extras";
  status: "Activo" | "Inactivo";
  icon: string;
  color: string;
  duration?: string;
  restrictions?: string[];
  usageCount: number;
  maxUsage?: number;
  isLimited?: boolean;
  isPremium?: boolean;
}

export interface BenefitResponse {
  id: number;
  name: string;
  description: string;
  cost: number;
  totalRedeemableAmount: number | null;
  redeemableAmountPerStudent: number | null;
  subjectDto: SubjectResponseDto;
}
export interface CreateBenefitInterface {
  name: string;
  description: string;
  cost: number;
  totalRedeemableAmount: number | null;
  redeemableAmountPerStudent: number | null;
  subjectId: number;
}
