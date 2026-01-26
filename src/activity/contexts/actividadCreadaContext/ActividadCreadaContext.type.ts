import type { ActividadCreadaResponse, } from "@/activity/types/ActividadCreada.type";

export interface ActividadCreadaContextType {
  loading: boolean;
  actividadCreada: ActividadCreadaResponse | null;
  getActividadCreada: (
    id: number
  ) => void;
}