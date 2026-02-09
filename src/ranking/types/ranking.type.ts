import type { BodyPart } from "@/admin";

export interface Position {
  position: number;
  name: string;
  quantity: number;
  selectedBody: BodyPart | null;
  selectedShirt: BodyPart | null;
  selectedHat: BodyPart | null;
}

export interface RankingResponseApi {
  currentUserPosition: Position;
  participants: Position[];

}

export type RankingType =
  | "coinsInstitucion"
  | "coinsCurso"
  | "coinsMateria"
  | "activitiesInstitucion"
  | "activitiesCurso"
  | "activitiesMateria";
