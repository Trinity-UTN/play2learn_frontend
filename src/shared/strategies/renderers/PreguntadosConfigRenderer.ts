import { FaHourglassHalf, FaQuestion } from "react-icons/fa";
import type { PreguntadosInterface as PreguntadosGameConfig } from "../../../activity/types/Preguntados.type";
import type {
  GameConfigRenderer,
  GameConfigDetail,
} from "../interfaces/GameConfigRenderer.interface";

export class PreguntadosConfigRenderer implements GameConfigRenderer {
  render(config: PreguntadosGameConfig): GameConfigDetail[] {
    const details: GameConfigDetail[] = [];

    if (config.maxTimePerQuestionInSeconds) {
      details.push({
        icon: FaHourglassHalf,
        label: "Tiempo por pregunta",
        value: `${config.maxTimePerQuestionInSeconds}s`,
      });
    }

    if (config.questions && config.questions.length > 0) {
      details.push({
        icon: FaQuestion,
        label: "Cantidad de preguntas",
        value: config.questions.length,
      });
    }

    return details;
  }
}
