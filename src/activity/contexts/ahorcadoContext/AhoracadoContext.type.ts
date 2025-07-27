

import type { AhorcadoInterface } from "../../types/Ahorcado.type";

export interface AhorcadoContextType {
  loading: boolean;
  registerAhorcado: (data:AhorcadoInterface) => Promise<void>;
}