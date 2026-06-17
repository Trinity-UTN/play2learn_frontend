import type { BodyPart } from "@/admin";

export interface Position {
  position: number;
  name: string;
  experienceLevel: number;
  quantity: number;
  selectedBody: BodyPart | null;
  selectedShirt: BodyPart | null;
  selectedHat: BodyPart | null;
}

export interface RankingResponseApi {
  currentUserPosition: Position;
  participants: Position[];
  totalParticipants: number;
}

export type RankingType =
  | "coinsInstitucion"
  | "coinsCurso"
  | "coinsMateria"
  | "activitiesInstitucion"
  | "activitiesCurso"
  | "activitiesMateria";
