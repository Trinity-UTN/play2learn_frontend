import { FcPuzzle } from "react-icons/fc";
import type { MemoramaGameConfig } from "../../../activity/types/Memorama.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class MemoramaConfigRenderer implements GameConfigRenderer {
  render(config: MemoramaGameConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.couples && config.couples.length > 0) {
      details.push({
        icon: FcPuzzle,
        label: "Cantidad de parejas",
        value: config.couples.length,
      });
    }

    return details;
  }
}
