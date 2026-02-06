import { FcTodoList } from "react-icons/fc";
import type { NoLudicaInterface as NoLudicaConfig } from "../../../activity/types/NoLudica.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class NoLudicaConfigRenderer implements GameConfigRenderer {
  render(config: NoLudicaConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.exercise) {
      details.push({
        icon: FcTodoList,
        label: "Ejercicio",
        value: config.exercise,
      });
    }

    return details;
  }
}
