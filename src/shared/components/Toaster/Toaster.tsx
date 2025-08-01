import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaBell,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import type { Toast, ToastPosition } from "../../types/Toaster.type";
import styles from "./Toaster.module.css";

interface ToasterProps {
  toasts: Toast[];
  position: ToastPosition;
  onClose: (id: string) => void;
}

const Toaster: React.FC<ToasterProps> = ({ toasts, position, onClose }) => {
  const [toastProgress, setToastProgress] = useState<Record<string, number>>(
    {}
  );
  const [fadingToasts, setFadingToasts] = useState<Set<string>>(new Set());

  const getIcon = (type: Toast["type"]) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className={styles.icon} />;
      case "error":
        return <FaExclamationCircle className={styles.icon} />;
      case "warning":
        return <FaExclamationTriangle className={styles.icon} />;
      case "update":
        return <FaBell className={styles.icon} />;
      case "info":
        return <FaInfoCircle className={styles.icon} />;
      default:
        return <FaBell className={styles.icon} />;
    }
  };

  const getPositionClass = (position: ToastPosition) => {
    switch (position) {
      case "top-center":
        return styles.topCenter;
      case "top-right":
        return styles.topRight;
      case "bottom-right":
        return styles.bottomRight;
      case "bottom-center":
        return styles.bottomCenter;
      default:
        return styles.topRight;
    }
  };

  const getAnimationVariants = (position: ToastPosition) => {
    const isCenter = position.includes("center");
    const isBottom = position.includes("bottom");

    if (isCenter) {
      return {
        initial: {
          opacity: 0,
          y: isBottom ? 50 : -50,
          scale: 0.8,
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
        exit: {
          opacity: 0,
          y: isBottom ? 50 : -50,
          scale: 0.8,
        },
      };
    }

    return {
      initial: {
        opacity: 0,
        x: 100,
        scale: 0.9,
      },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
      },
      exit: {
        opacity: 0,
        x: 100,
        scale: 0.9,
      },
    };
  };

  // Función para iniciar el fade-out
  const startFadeOut = (toastId: string) => {
    setFadingToasts((prev) => new Set([...prev, toastId]));

    // Después de la animación de fade-out, cerrar el toast
    setTimeout(() => {
      onClose(toastId);
      setFadingToasts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(toastId);
        return newSet;
      });
    }, 400); // Duración de la animación fade-out
  };

  // Efecto para manejar el progreso de auto-dismiss
  useEffect(() => {
    const intervals: Record<string, number> = {};

    toasts.forEach((toast) => {
      if (toast.duration > 0 && !fadingToasts.has(toast.id)) {
        const startTime = Date.now();

        intervals[toast.id] = window.setInterval(() => {
          const now = Date.now();
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / toast.duration, 1);

          setToastProgress((prev) => ({
            ...prev,
            [toast.id]: progress,
          }));

          if (progress >= 1) {
            clearInterval(intervals[toast.id]);
            startFadeOut(toast.id); // Iniciar fade-out en lugar de cerrar directamente
          }
        }, 16); // ~60fps
      }
    });

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, [toasts, onClose, fadingToasts]);

  if (toasts.length === 0) return null;

  const variants = getAnimationVariants(position);

  return (
    <div className={`${styles.container} ${getPositionClass(position)}`}>
      <div className={styles.toastList}>
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const hasMessage = toast.message && toast.message.trim().length > 0;
            const isFading = fadingToasts.has(toast.id);

            return (
              <motion.div
                key={toast.id}
                layout
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                }}
                className={`${styles.toast} ${styles[toast.type]} ${
                  toast.duration > 0 ? styles.withProgress : ""
                } ${isFading ? styles.fadingOut : ""}`}
                style={
                  {
                    "--progress": `${(toastProgress[toast.id] || 0) * 360}deg`,
                    "--show-progress": toast.duration > 0 ? 1 : 0,
                  } as React.CSSProperties
                }
                onClick={() => onClose(toast.id)}
              >
                <button
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(toast.id);
                  }}
                  aria-label="Cerrar notificación"
                >
                  <FaTimes />
                </button>

                <div className={styles.content}>
                  <div className={styles.iconWrapper}>
                    {getIcon(toast.type)}
                  </div>
                  <div
                    className={`${styles.textContent} ${
                      !hasMessage ? styles.titleOnly : ""
                    }`}
                  >
                    <h4
                      className={`${styles.title} ${
                        hasMessage ? styles.withMessage : ""
                      }`}
                    >
                      {toast.title}
                    </h4>
                    {hasMessage && (
                      <p className={styles.message}>{toast.message}</p>
                    )}

                    {toast.actionButton && (
                      <div className={styles.actions}>
                        <button
                          className={styles.actionButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            toast.actionButton!.onClick();
                          }}
                        >
                          {toast.actionButton.text}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Toaster;
