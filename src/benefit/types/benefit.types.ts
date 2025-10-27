import type { SubjectSimplifiedResponseDto } from "../../admin/services/subject/SubjectService";
import type { PaginatedData } from "../../shared/types/PaginacionType";

// ==================== ENUMS Y CONSTANTES ====================

export const colors = [
  "BLUE",
  "ORANGE",
  "LIGHTGREEN",
  "EMERALD",
  "PURPLE",
  "AMBER",
  "RED",
  "GRAY",
] as const;

export const icons = [
  "EXAM",
  "FILE",
  "SKIP",
  "CALENDAR",
  "CHAT",
  "CLOCK",
  "BOOK",
  "RETRY",
] as const;

export const categories = [
  "EVALUACION",
  "ASISTENCIA",
  "TRABAJOS",
  "EXTRAS",
] as const;

export type Color = (typeof colors)[number];
export type Icon = (typeof icons)[number];
export type Category = (typeof categories)[number];

export type BenefitStudentState =
  | "AVAILABLE"
  | "PURCHASED"
  | "USE_REQUESTED"
  | "EXPIRED";

export type BenefitPurchaseState = "PURCHASED" | "USE_REQUESTED" | "USED";

export type BenefitVariant = "student" | "teacher";

// ==================== INTERFACES DE RESPUESTA ====================

export interface BenefitResponseInterface {
  id: number;
  name: string;
  description: string;
  cost: number;
  purchaseLimit: number | null;
  purchaseLimitPerStudent: number | null;
  subjectDto: SubjectSimplifiedResponseDto;
  color: Color;
  endAt: string;
  icon: Icon;
  category: Category;
}

export interface BenefitUseRequestedResponseInterface {
  id: number;
  state: "USE_REQUESTED";
  benefitId: number;
  benefitName: string;
  subjectId: number;
  subjectName: string;
  studentId: number;
  studentName: string;
}

export interface BenefitPurchaseSimpleResponse {
  id: number;
  state: BenefitPurchaseState;
  benefitId: number;
  benefitName: string;
  subjectId: number;
  subjectName: string;
  studentId: number;
  studentName: string;
}

export interface BenefitStudentResponseInterface {
  id: number;
  name: string;
  description: string;
  cost: number;
  state: BenefitStudentState;
  purchasesLeft: number | null;
  purchasesLeftByStudent: number | null;
  endAt: string;
  subjectId: number;
  subjectName: string;
  icon: Icon;
  category: Category;
  color: Color;
}

export interface CreateBenefitInterface {
  name: string;
  description: string;
  cost: number | string;
  purchaseLimit: number | null;
  purchaseLimitPerStudent: number | null;
  purchaseLeft?: number;
  subjectId: number;
  endAt: string;
  color: Color;
  icon: Icon;
  category: Category;
}

// ==================== TIPOS UTILITARIOS ====================

export type AnyBenefit =
  | BenefitResponseInterface
  | BenefitStudentResponseInterface
  | CreateBenefitInterface;

// ==================== PAGINACIÓN Y STATS ====================

export interface PaginatedBenefitResponseInterface {
  data: PaginatedData<BenefitResponseInterface>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface PaginatedBenefitStudentResponseInterface {
  data: PaginatedData<BenefitStudentResponseInterface>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface PaginatedBenefitUseRequestedResponseInterface {
  data: PaginatedData<BenefitUseRequestedResponseInterface>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface BenefitStatsResponse {
  available: number;
  purchased: number;
  use_requested: number;
  used: number;
  expired: number;
}

export interface BenefitStatsApiResponse {
  data: BenefitStatsResponse;
  message: string;
  errors: any;
  timestamp: string;
}

// ==================== VALIDACIÓN ====================

export interface BenefitValidationErrors {
  name?: string;
  description?: string;
  cost?: string;
  endAt?: string;
  subjectId?: string;
  icon?: string;
  category?: string;
  color?: string;
  purchaseLimit?: string;
  purchaseLimitPerStudent?: string;
}

export interface BenefitPurchaseValidation {
  canPurchase: boolean;
  reason?: string;
}
