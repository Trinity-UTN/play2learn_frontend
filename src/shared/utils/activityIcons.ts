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
  Ahorcado: FaSpellCheck,
  completar_oraciones: FaCheckCircle,
  preguntados: FaQuestionCircle,
  ordenar_secuencia: FaSortAmountUp,
  memorama: FaBrain,
  desafio_clasificacion: FaPuzzlePiece,
  "Desafio de clasificacion": FaPuzzlePiece,
  arbol_decision: FaTree,
  no_ludica: FaPenFancy,
  random: FaRandom,
  default: FaGamepad,
};

export const activityColorMap: Record<string, string> = {
  ahorcado_educativo: "#b9e769",
  "Ahorcado Educativo": "#b9e769",
  Ahorcado: "#b9e769",
  completar_oraciones: "#ff6f3c",
  "Completar Oraciones": "#ff6f3c",
  preguntados: "#007bff",
  Preguntados: "#007bff",
  ordenar_secuencia: "#9333ea",
  "Ordenar Secuencias": "#9333ea",
  memorama: "#f9c74f",
  Memorama: "#f9c74f",
  desafio_clasificacion: "#dc2626",
  "Desafio de Clasificación": "#dc2626",
  "Desafio de clasificacion": "#dc2626",
  arbol_decision: "#ef4444",
  "Árbol de Decisión": "#ef4444",
  no_ludica: "#f59e0b",
  "Actividad No Lúdica": "#f59e0b",
  default: "#6b7280",
};

export const getActivityIcon = (iconName: string): IconType =>
  activityIconMap[iconName] || activityIconMap.default;

export const getActivityColor = (activityName: string): string =>
  activityColorMap[activityName] || activityColorMap.default;
