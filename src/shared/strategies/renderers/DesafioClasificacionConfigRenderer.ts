import { FcOpenedFolder } from "react-icons/fc";
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
        icon: FcOpenedFolder,
        label: "Categorías",
        value: config.categories.length,
      });
    }

    return details;
  }
}
