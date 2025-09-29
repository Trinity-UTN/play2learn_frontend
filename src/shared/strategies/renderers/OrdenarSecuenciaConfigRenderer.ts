import { FaList } from "react-icons/fa";
import type { CreateSequencePayload as OrdenarSecuenciaConfig } from "../../../activity/types/OrdenarSecuencia.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class OrdenarSecuenciaConfigRenderer implements GameConfigRenderer {
  render(config: OrdenarSecuenciaConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.events && config.events.length > 0) {
      details.push({
        icon: FaList,
        label: "Cantidad de eventos",
        value: config.events.length,
      });
    }

    return details;
  }
}
