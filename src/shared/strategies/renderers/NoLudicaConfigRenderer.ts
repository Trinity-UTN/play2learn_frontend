import { FcTodoList, FcShipped } from "react-icons/fc";
import type { NoLudicaInterface as NoLudicaConfig } from "../../../activity/types/NoLudica.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class NoLudicaConfigRenderer implements GameConfigRenderer {
  render(config: NoLudicaConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.excercise) {
      details.push({
        icon: FcTodoList,
        label: "Ejercicio",
        value: config.excercise,
      });
    }

    if (config.tipoEntrega) {
      details.push({
        icon: FcShipped,
        label: "Tipo de entrega",
        value: config.tipoEntrega,
      });
    }

    return details;
  }
}
