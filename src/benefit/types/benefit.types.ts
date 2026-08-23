import type { SubjectSimplifiedResponseDto } from "@/admin";
import type { PaginatedData } from "@/shared";

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
  | "EXPIRED"
  | "USED";

export type BenefitTeacherState = "PUBLISHED" | "EXPIRED";

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
  endAt: string;
  state: BenefitTeacherState;
  subjectDto: SubjectSimplifiedResponseDto;
  icon: Icon;
  category: Category;
  color: Color;
}

export interface BenefitUseRequestedResponseInterface {
  id: number;
  state: "USE_REQUESTED";
  benefitId: number;
  purchaseNumber: number;
  benefitName: string;
  benefitCategory: Category;
  benefitColor: Color;
  benefitIcon: Icon;
  subjectId: number;
  subjectName: string;
  studentId: number;
  studentName: string;
}

export interface BenefitPurchaseSimpleResponse {
  id: number;
  state: BenefitPurchaseState;
  purchaseNumber: number;
  benefitId: number;
  benefitName: string;
  benefitCategory: Category;
  benefitColor: Color;
  benefitIcon: Icon;
  subjectId: number;
  subjectName: string;
  studentId: number;
  studentName: string;
  usedAt?: string;
}

export interface BenefitPurchasedUsedResponse {
  id: number;
  state: "USED";
  benefitId: number;
  benefitName: string;
  benefitDescription: string;
  category: Category;
  color: Color;
  icon: Icon;
  subjectId: number;
  subjectName: string;
  usedAt?: string;
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
  | CreateBenefitInterface
  | BenefitPurchaseSimpleResponse
  | BenefitPurchasedUsedResponse;

export type TeacherBenefitType =
  | BenefitResponseInterface
  | BenefitUseRequestedResponseInterface
  | BenefitPurchaseSimpleResponse;

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

export interface PaginatedBenefitPurchaseSimpleResponse {
  data: PaginatedData<BenefitPurchaseSimpleResponse>;
  message: string;
  errors: any;
  timestamp: string;
}

export interface PaginatedBenefitPurchasedUsedResponse {
  data: PaginatedData<BenefitPurchasedUsedResponse>;
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
