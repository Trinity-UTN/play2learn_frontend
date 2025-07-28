import type { PreguntadosInterface } from "../../types/Preguntados.type";

export interface PreguntadosContextType {
  loading: boolean;
  registrarPreguntados: (data: PreguntadosInterface) => Promise<void>;
}
