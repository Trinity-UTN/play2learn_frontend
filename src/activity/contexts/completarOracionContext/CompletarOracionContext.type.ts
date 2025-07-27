import type { CompletarOracionInterface } from "../../types/CompletarOracion.type";

export interface CompletarOracionContextType {
  loading: boolean;
  registrarCompletarOracion: (data: CompletarOracionInterface) => Promise<void>;
}
