import { useMemo } from "react";
import type { CurrentActivityInterface } from "../../types/Activity.type";

interface NavigationMessages {
  confirmTitle: string;
  confirmMessage: string;
  confirmType: "warning" | "danger" | "info";
  toastTitle: string;
  toastMessage: string;
  toastType: "info" | "success" | "warning" | "danger";
  tabSwitchDisapproveTitle?: string;
  tabSwitchDisapproveMessage?: string;
}

/**
 * Hook para obtener los mensajes de navegación según el estado de la actividad
 * @param currentActivity - La actividad actual
 * @returns Objeto con todos los mensajes configurados
 */
export const useActivityNavigationMessages = (
  currentActivity: CurrentActivityInterface | null
): NavigationMessages => {
  return useMemo(() => {
    if (!currentActivity) {
      return {
        confirmTitle: "¿Salir de la actividad?",
        confirmMessage:
          "Si sales ahora, perderás tu intento actual de la actividad y no podrás recuperar tu progreso.",
        confirmType: "warning",
        toastTitle: "Has perdido tu intento al salir de la actividad",
        toastMessage: "Se ha registrado un intento fallido",
        toastType: "warning",
      };
    }

    const remainingAttempts = currentActivity.attempts - 1; // -1 porque el intento actual ya está en curso
    const isLastAttempt = remainingAttempts <= 1;

    if (isLastAttempt) {
      return {
        confirmTitle: "¿Salir de tu último intento?",
        confirmMessage:
          "Este es tu último intento disponible. Si sales ahora, perderás este intento y la actividad quedará desaprobada automáticamente. No tendrás más oportunidades para realizarla. ¿Estás seguro de que quieres salir?",
        confirmType: "danger",
        toastTitle: "Actividad desaprobada",
        toastMessage: "Has perdido tu último intento.",
        toastType: "danger",
      };
    }

    const attemptsLeft = remainingAttempts - 1;
    return {
      confirmTitle: "¿Salir de la actividad?",
      confirmMessage: `Si sales ahora, perderás tu intento actual. Te ${
        attemptsLeft === 1 ? "quedará" : "quedarán"
      } ${attemptsLeft} ${
        attemptsLeft === 1 ? "intento" : "intentos"
      } disponible${
        attemptsLeft === 1 ? "" : "s"
      } para aprobar esta actividad.`,
      confirmType: "warning",
      toastTitle: "Has perdido tu intento al salir de la actividad",
      toastMessage: `Intento registrado como fallido. Te ${
        attemptsLeft === 1 ? "queda" : "quedan"
      } ${attemptsLeft} ${
        attemptsLeft === 1 ? "intento" : "intentos"
      } disponible${attemptsLeft === 1 ? "" : "s"}.`,
      toastType: "warning",
      tabSwitchDisapproveTitle: "Cambio de pestaña detectado",
      tabSwitchDisapproveMessage:
        "Se ha detectado que cambiaste de pestaña durante la actividad. Según las reglas establecidas al inicio, esto resulta en la desaprobación automática de tu intento actual.",
    };
  }, [currentActivity]);
};
