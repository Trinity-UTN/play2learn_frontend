import { useEffect, useRef, useContext } from "react";
import { UNSAFE_NavigationContext } from "react-router-dom";
import type { ToastPosition } from "../types/Toaster.type";
import { useConfirmation } from "./useConfirmation";
import { useToaster } from "./useToaster";

interface UsePreventNavigationOptions {
  when: boolean;
  title?: string;
  message?: string;
  type?: "warning" | "danger" | "info";
  confirmText?: string;
  cancelText?: string;
  onNavigationAttempt?: () => void;
  allowNavigation?: () => boolean;
  showToastOnBlock?: boolean;
  toastTitle?: string;
  toastMessage?: string;
  toastType?: "info" | "success" | "warning" | "danger";
  toastPosition?: ToastPosition;
  toastDuration?: number;
}

/**
 * Hook para prevenir navegación y advertir sobre recarga de página
 * @param when - Condición que activa la prevención (ej: cuando está jugando)
 * @param title - Título del modal de confirmación
 * @param message - Mensaje del modal de confirmación
 * @param type - Tipo de alerta (warning, danger, info)
 * @param confirmText - Texto del botón de confirmar
 * @param cancelText - Texto del botón de cancelar
 * @param onNavigationAttempt - Callback cuando se intenta navegar
 * @param allowNavigation - Función que determina si se permite la navegación sin confirmación
 * @param showToastOnBlock - Mostrar un toast cuando se bloquea la navegación
 * @param toastTitle - Título del toast
 * @param toastMessage - Mensaje del toast
 * @param toastType - Tipo del toast (info, success, warning, danger)
 * @param toastPosition - Posición del toast
 * @param toastDuration - Duración del toast en ms
 */
export const usePreventNavigation = ({
  when,
  title = "¿Salir de la actividad?",
  message = "Si sales ahora, perderás tu intento actual de la actividad y no podrás recuperar tu progreso.",
  type = "warning",
  confirmText = "Salir",
  cancelText = "Continuar jugando",
  onNavigationAttempt,
  allowNavigation,
  showToastOnBlock = true,
  toastTitle = "Has perdido tu intento al salir de la actividad",
  toastMessage = "No puedes salir durante la actividad",
  toastPosition = "bottom-right",
  toastDuration = 3000,
}: UsePreventNavigationOptions) => {
  const navigationContext = useContext(UNSAFE_NavigationContext);
  const { showConfirmation } = useConfirmation();
  const { showToast } = useToaster();

  // Referencias para desbloquear la navegación
  const unblockRef = useRef<(() => void) | null>(null);
  const pendingNavigationRef = useRef<(() => void) | null>(null);

  // Función para manejar la confirmación de navegación
  const handleNavigationConfirmation = (proceedCallback: () => void) => {
    if (allowNavigation?.()) {
      proceedCallback();
      return;
    }
    pendingNavigationRef.current = proceedCallback;

    showConfirmation({
      title,
      message,
      type,
      confirmText,
      cancelText,
      onConfirm: () => {
        if (pendingNavigationRef.current) {
          pendingNavigationRef.current();
          pendingNavigationRef.current = null;
        }
        if (showToastOnBlock) {
          showToast({
            title: toastTitle,
            message: toastMessage,
            type: "warning",
            position: toastPosition,
            duration: toastDuration,
          });
        }
      },
      onCancel: () => {
        pendingNavigationRef.current = null;
        onNavigationAttempt?.();
      },
    });
  };

  // Bloquear navegación dentro de la aplicación
  useEffect(() => {
    if (!when || !navigationContext) return;

    const { navigator } = navigationContext;

    const originalPush = navigator.push.bind(navigator);
    const originalReplace = navigator.replace.bind(navigator);
    const originalGo = navigator.go.bind(navigator);

    // Interceptar navegación
    navigator.push = (...args: Parameters<typeof originalPush>) => {
      handleNavigationConfirmation(() => originalPush(...args));
    };

    navigator.replace = (...args: Parameters<typeof originalReplace>) => {
      handleNavigationConfirmation(() => originalReplace(...args));
    };

    navigator.go = (...args: Parameters<typeof originalGo>) => {
      handleNavigationConfirmation(() => originalGo(...args));
    };

    // Cleanup: restaurar métodos originales
    unblockRef.current = () => {
      navigator.push = originalPush;
      navigator.replace = originalReplace;
      navigator.go = originalGo;
    };

    return () => {
      unblockRef.current?.();
      unblockRef.current = null;
    };
  }, [
    when,
    navigationContext,
    allowNavigation,
    title,
    message,
    type,
    confirmText,
    cancelText,
    showToastOnBlock,
    toastMessage,
    onNavigationAttempt,
  ]);

  // Manejar refresh/cierre de pestaña/navegación del navegador
  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (allowNavigation?.()) return;

      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [when, message, allowNavigation]);

  // Prevenir navegación hacia atrás/adelante del navegador
  useEffect(() => {
    if (!when) return;

    let isNavigatingAway = false;

    const handlePopState = () => {
      if (isNavigatingAway || allowNavigation?.()) return;

      handleNavigationConfirmation(() => {
        isNavigatingAway = true;
        window.history.back();
      });

      window.history.pushState(null, "", window.location.href);
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [
    when,
    allowNavigation,
    title,
    message,
    type,
    confirmText,
    cancelText,
    onNavigationAttempt,
  ]);

  // Prevenir clicks en enlaces
  useEffect(() => {
    if (!when) return;

    const handleClick = (event: MouseEvent) => {
      if (allowNavigation?.()) return;

      const target = event.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor?.href) {
        const currentPath = window.location.pathname;
        const linkPath = new URL(anchor.href, window.location.origin).pathname;

        if (linkPath !== currentPath) {
          event.preventDefault();
          event.stopPropagation();

          handleNavigationConfirmation(() => {
            if (anchor.target === "_blank") {
              window.open(anchor.href, "_blank");
            } else {
              window.location.href = anchor.href;
            }
          });
        }
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [
    when,
    allowNavigation,
    title,
    message,
    type,
    confirmText,
    cancelText,
    onNavigationAttempt,
  ]);

  return {
    isBlocked: when,
  };
};

export default usePreventNavigation;
