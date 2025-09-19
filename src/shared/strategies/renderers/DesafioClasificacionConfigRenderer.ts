import { FaFolderOpen } from "react-icons/fa";
import type { DesafioClasificacionConfig } from "../../../activity/types/DesafioClasificacion.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class DesafioClasificacionConfigRenderer implements GameConfigRenderer {
  render(config: DesafioClasificacionConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.categories && config.categories.length > 0) {
      details.push({
        icon: FaFolderOpen,
        label: "Categorías",
        value: config.categories.length,
      });
    }

    return details;
  }
}
