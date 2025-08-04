import type { NoLudicaInterface } from "../../types/NoLudica.type";

export interface NoLudicaContextType {
  loading: boolean;
  registrarNoLudica: (data: NoLudicaInterface) => Promise<void>;
}
