import {
  FaSpellCheck,
  FaQuestionCircle,
  FaSortAmountUp,
  FaPuzzlePiece,
  FaBrain,
  FaCheckCircle,
  FaRandom,
  FaGamepad,
  FaTree,
  FaPenFancy,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export const activityIconMap: Record<string, IconType> = {
  ahorcado_educativo: FaSpellCheck,
  completar_oraciones: FaCheckCircle,
  preguntados: FaQuestionCircle,
  ordenar_secuencia: FaSortAmountUp,
  memorama: FaBrain,
  desafio_clasificacion: FaPuzzlePiece,
  arbol_decision: FaTree,
  no_ludica: FaPenFancy,
  random: FaRandom,
  default: FaGamepad,
};

export const getActivityIcon = (iconName: string): IconType =>
  activityIconMap[iconName] || activityIconMap.default;
