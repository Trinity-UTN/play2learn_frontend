import type { ActividadCreadaGeneral, ActividadCreadaResponse, } from "@/activity/types/ActividadCreada.type";

export interface ActividadCreadaContextType {
  loading: boolean;
  actividadBase: ActividadCreadaGeneral | null;
  actividadCreada: ActividadCreadaResponse | null;
  setActividadBase: (actividad: ActividadCreadaGeneral) => void;
  getActividadCreada: (
    id: number
  ) => void;
}