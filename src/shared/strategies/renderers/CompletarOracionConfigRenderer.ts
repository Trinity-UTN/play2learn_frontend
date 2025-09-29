import { FcDatabase } from "react-icons/fc";
import type { CompletarOracionInterface as CompletarOracionConfig } from "../../../activity/types/CompletarOracion.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class CompletarOracionConfigRenderer implements GameConfigRenderer {
  render(config: CompletarOracionConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.sentences && config.sentences.length > 0) {
      details.push({
        icon: FcDatabase,
        label: "Cantidad de oraciones",
        value: config.sentences.length,
      });
    }

    return details;
  }
}
