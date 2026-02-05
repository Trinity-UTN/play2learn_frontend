import { ActivityResultsStrategyFactory } from "@/shared";
import type { GameType } from "../../shared/types/Games.type";

/**
 * Formatea el estado de una actividad completada
 */
export const formatResultState = (
  state: "APPROVED" | "DISAPPROVED" | "PENDING",
): { label: string; variant: "success" | "danger" | "warning" } => {
  switch (state) {
    case "APPROVED":
      return { label: "Aprobada", variant: "success" };
    case "DISAPPROVED":
      return { label: "Desaprobada", variant: "danger" };
    case "PENDING":
      return { label: "Pendiente", variant: "warning" };
    default:
      return { label: "Desconocido", variant: "warning" };
  }
};

/**
 * Formatea el tiempo de realización en formato legible
 */
export const formatCompletedTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} segundo${seconds !== 1 ? "s" : ""}`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes < 60) {
    if (remainingSeconds === 0) {
      return `${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    }
    return `${minutes} minuto${
      minutes !== 1 ? "s" : ""
    } y ${remainingSeconds} segundo${remainingSeconds !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hora${hours !== 1 ? "s" : ""}`;
  }
  return `${hours} hora${hours !== 1 ? "s" : ""} y ${remainingMinutes} minuto${
    remainingMinutes !== 1 ? "s" : ""
  }`;
};

/**
 * Obtiene los labels dinámicos de estadísticas según el tipo de juego usando Strategy Pattern
 */
export const getStatsLabels = (gameType: GameType) => {
  const strategy = ActivityResultsStrategyFactory.createStrategy(gameType);
  return strategy.getStatsLabels();
};

/**
 * Determina si se debe mostrar una estadística específica
 */
export const shouldShowStat = (
  gameType: GameType,
  statType:
    | "correctAnswers"
    | "incorrectAnswers"
    | "unanswered"
    | "completedTime",
  state?: "APPROVED" | "DISAPPROVED" | "PENDING",
): boolean => {
  if (statType === "completedTime") {
    return state !== "PENDING";
  }

  const labels = getStatsLabels(gameType);
  return labels[statType] !== null;
};

/**
 * Determina si se debe mostrar el score según el tipo de juego
 */
export const shouldShowScore = (gameType: GameType): boolean => {
  const strategy = ActivityResultsStrategyFactory.createStrategy(gameType);
  return strategy.shouldShowScore();
};
