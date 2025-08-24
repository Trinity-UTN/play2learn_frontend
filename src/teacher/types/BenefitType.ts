import type { SubjectResponseDto } from "../../admin/services/subject/SubjectService";

export interface BenefitResponseInterface {
  id: number;
  name: string;
  description: string;
  cost: number;
  totalRedeemableAmount: number | null;
  redeemableAmountPerStudent: number | null;
  subjectDto: SubjectResponseDto;
  color: Color;
  icon: Icon;
  category: Category;
}
export interface CreateBenefitInterface {
  name: string;
  description: string;
  cost: number | string;
  totalRedeemableAmount: number | null;
  redeemableAmountPerStudent: number | null;
  subjectId: number;
  color: Color;
  icon: Icon;
  category: Category;
}

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
