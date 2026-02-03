import type { AttemptReviewStoredData } from "../../types/NoLudicaReview.type";
import {
  PASSING_SCORE,
  REVIEW_STATE_CONFIG,
  ATTEMPT_REVIEW_STORAGE_KEY,
  type ReviewState,
} from "../../constants/activity/noLudicaReview.constants";

/**
 * Determina el estado basado en el puntaje
 * score >= 60 → APPROVED, score < 60 → DISAPPROVED
 */
export const getStateFromScore = (
  score: number
): "APPROVED" | "DISAPPROVED" => {
  return score >= PASSING_SCORE ? "APPROVED" : "DISAPPROVED";
};

/**
 * Obtiene la configuración visual de un estado de revisión
 */
export const getReviewStateConfig = (state: ReviewState) => {
  return REVIEW_STATE_CONFIG[state];
};

/**
 * Formatea el tamaño de un archivo a una representación legible
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Formatea una fecha ISO a formato legible
 */
export const formatAttemptDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Guarda los datos del intento en localStorage para persistencia en refresh
 */
export const saveAttemptReviewData = (data: AttemptReviewStoredData): void => {
  localStorage.setItem(ATTEMPT_REVIEW_STORAGE_KEY, JSON.stringify(data));
};

/**
 * Obtiene los datos del intento desde localStorage
 */
export const getAttemptReviewData = (): AttemptReviewStoredData | null => {
  const stored = localStorage.getItem(ATTEMPT_REVIEW_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AttemptReviewStoredData;
  } catch {
    return null;
  }
};

/**
 * Limpia los datos del intento desde localStorage
 */
export const clearAttemptReviewData = (): void => {
  localStorage.removeItem(ATTEMPT_REVIEW_STORAGE_KEY);
};

/**
 * Valida que el score esté en el rango válido
 */
export const isValidScore = (score: number): boolean => {
  return score >= 0 && score <= 100;
};
