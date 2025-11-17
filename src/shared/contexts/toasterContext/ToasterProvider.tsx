import { useState, useCallback, useEffect, type ReactNode } from "react";
import { ToasterContext } from "./ToasterContext";
import type { ToasterContextType } from "./ToasterContext.type";
import Toaster from "../../components/Toaster/Toaster";
import type {
  Toast,
  ToastConfig,
  ToastPosition,
} from "../../types/Toaster.type";

interface ToasterProviderProps {
  children: ReactNode;
}

export const ToasterProvider: React.FC<ToasterProviderProps> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = () =>
    `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const getMaxToastsForPosition = (position: ToastPosition): number => {
    return position === "top-center" ? 1 : 3;
  };

  const showToast = useCallback((config: ToastConfig): string => {
    const id = config.id || generateId();
    const position = config.position || "top-right";
    const duration =
      config.duration !== undefined
        ? config.duration
        : config.type === "update"
        ? 0
        : 8000;

    const newToast: Toast = {
      id,
      title: config.title,
      message: config.message,
      type: config.type,
      position,
      duration,
      actionButton: config.actionButton,
      onClose: config.onClose,
      createdAt: Date.now(),
    };

    setToasts((prevToasts) => {
      const toastsInPosition = prevToasts.filter(
        (toast) => toast.position === position
      );
      const maxToasts = getMaxToastsForPosition(position);

      let updatedToasts = [...prevToasts];

      // Si excede el límite, remover los más antiguos de esa posición
      if (toastsInPosition.length >= maxToasts) {
        const toastsToRemove = toastsInPosition
          .sort((a, b) => a.createdAt - b.createdAt)
          .slice(0, toastsInPosition.length - maxToasts + 1);

        updatedToasts = updatedToasts.filter(
          (toast) =>
            !toastsToRemove.some((removeToast) => removeToast.id === toast.id)
        );
      }

      return [...updatedToasts, newToast];
    });

    return id;
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts((prevToasts) => {
      const toast = prevToasts.find((t) => t.id === id);
      if (toast?.onClose) {
        toast.onClose();
      }
      return prevToasts.filter((toast) => toast.id !== id);
    });
  }, []);

  const closeAllToasts = useCallback((position?: ToastPosition) => {
    setToasts((prevToasts) => {
      const toastsToClose = position
        ? prevToasts.filter((toast) => toast.position === position)
        : prevToasts;

      toastsToClose.forEach((toast) => {
        if (toast.onClose) {
          toast.onClose();
        }
      });

      return position
        ? prevToasts.filter((toast) => toast.position !== position)
        : [];
    });
  }, []);

  // Auto-dismiss
  useEffect(() => {
    const timers: Record<string, number> = {};

    toasts.forEach((toast) => {
      if (toast.duration > 0) {
        timers[toast.id] = window.setTimeout(() => {
          closeToast(toast.id);
        }, toast.duration);
      }
    });

    return () => {
      Object.values(timers).forEach((timer) => clearTimeout(timer));
    };
  }, [toasts, closeToast]);

  const contextValue: ToasterContextType = {
    showToast,
    closeToast,
    closeAllToasts,
  };

  // Agrupar toasts por posición
  const toastsByPosition = toasts.reduce((acc, toast) => {
    if (!acc[toast.position]) {
      acc[toast.position] = [];
    }
    acc[toast.position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, Toast[]>);

  return (
    <ToasterContext.Provider value={contextValue}>
      {children}
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <Toaster
          key={position}
          toasts={positionToasts}
          position={position as ToastPosition}
          onClose={closeToast}
        />
      ))}
    </ToasterContext.Provider>
  );
};
