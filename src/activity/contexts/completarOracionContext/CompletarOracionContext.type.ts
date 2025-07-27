import type { CreateCompletarOracionPayload } from "../../services/completarOracion/CompletarOracionService";

export interface CompletarOracionContextType {
  loading: boolean;
  registrarCompletarOracion: (
    data: CreateCompletarOracionPayload
  ) => Promise<void>;
}
