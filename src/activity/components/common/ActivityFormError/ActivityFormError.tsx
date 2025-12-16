import { useEffect } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { useToaster } from "@/shared";
import styles from "./ActivityFormError.module.css";

interface FormErrorProps {
  errors: { [key: string]: string };
  onDismiss?: (key: string) => void;
  className?: string;
  showToaster?: boolean;
}

const ActivityFormError: React.FC<FormErrorProps> = ({
  errors,
  onDismiss,
  className = "",
  showToaster = false,
}) => {
  const { showToast } = useToaster();

  const errorEntries = Object.entries(errors).filter(([_, error]) => error);

  useEffect(() => {
    if (showToaster && errorEntries.length > 0) {
      const errorCount = errorEntries.length;
      const title =
        errorCount === 1
          ? "Error en el formulario"
          : `${errorCount} errores en el formulario`;
      const message =
        errorCount === 1
          ? "Por favor, corrige el error antes de continuar"
          : "Por favor, corrige los errores antes de continuar";

      showToast({
        type: "error",
        title,
        message,
        position: "bottom-right",
        duration: 6000,
      });
    }
  }, [errorEntries.length, showToaster, showToast]);

  if (errorEntries.length === 0) return null;

  return (
    <div className={`${styles.errorContainer} ${className}`}>
      <div className={styles.errorHeader}>
        <FaExclamationTriangle className={styles.errorIcon} />
        <span className={styles.errorTitle}>
          {errorEntries.length === 1
            ? "Error encontrado"
            : `${errorEntries.length} errores encontrados`}
        </span>
      </div>

      <div className={styles.errorList}>
        {errorEntries.map(([key, error]) => (
          <div key={key} className={styles.errorItem}>
            <span className={styles.errorText}>{error}</span>
            {onDismiss && (
              <button
                type="button"
                onClick={() => onDismiss(key)}
                className={styles.dismissButton}
                aria-label="Descartar error"
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFormError;
