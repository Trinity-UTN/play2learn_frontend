import { FaExclamationTriangle, FaFont } from "react-icons/fa";
import type { AhorcadoConfig } from "../../../activity/types/Ahorcado.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class AhorcadoConfigRenderer implements GameConfigRenderer {
  render(config: AhorcadoConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.errorsPermited !== undefined) {
      details.push({
        icon: FaExclamationTriangle,
        label: "Errores permitidos",
        value: config.errorsPermited,
      });
    }

    if (config.word) {
      details.push({
        icon: FaFont,
        label: "Palabra",
        value: `${config.word.length} letras`,
      });
    }

    return details;
  }
}
