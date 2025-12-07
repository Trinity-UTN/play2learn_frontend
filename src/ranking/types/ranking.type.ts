export interface Position {
  position: number;
  name: string;
  quantity: number;
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
