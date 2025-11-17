import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationTriangle,
  FaTimes,
  FaInfoCircle,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import Button from "../Button/ButtonComponent";
import styles from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  title: string;
  message: string;
  type?: "warning" | "danger" | "info";
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  showDoubleConfirmation?: boolean;
  showSecondConfirmation?: boolean;
  doubleConfirmationText?: string;
  rules?: string[];
  showRulesIcon?: boolean;
  hideCancel?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  type = "warning",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isOpen,
  showDoubleConfirmation = false,
  showSecondConfirmation = false,
  doubleConfirmationText = "¿Está completamente seguro? Esta acción no se puede deshacer.",
  rules = [],
  showRulesIcon,
  hideCancel = false,
  onClose,
  onConfirm,
}) => {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const getIcon = () => {
    switch (type) {
      case "danger":
        return <FaExclamationCircle className={styles.icon} />;
      case "info":
        return <FaInfoCircle className={styles.icon} />;
      default:
        return <FaExclamationTriangle className={styles.icon} />;
    }
  };

  const showRules =
    rules.length > 0 && showDoubleConfirmation && showSecondConfirmation;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles.overlay}
          onClick={hideCancel ? undefined : onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${styles.modal} ${styles[type]}`}
            onClick={(e) => e.stopPropagation()}
          >
            {!hideCancel && (
              <button className={styles.closeButton} onClick={onClose}>
                <FaTimes />
              </button>
            )}

            <div className={styles.content}>
              <div className={styles.iconWrapper}>{getIcon()}</div>

              <h3 className={styles.title}>{title}</h3>

              <p className={styles.message}>
                {showDoubleConfirmation && showSecondConfirmation && !showRules
                  ? doubleConfirmationText
                  : message}
              </p>

              {showRules && (
                <div className={styles.rulesContainer}>
                  <h4 className={styles.rulesTitle}>
                    Reglas importantes de la actividad:
                  </h4>
                  <ul className={styles.rulesList}>
                    {rules.map((rule, index) => (
                      <li key={index} className={styles.ruleItem}>
                        {showRulesIcon && (
                          <FaCheckCircle className={styles.ruleIcon} />
                        )}
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                  <p className={styles.rulesFooter}>
                    Al continuar, aceptas cumplir con todas estas reglas.
                  </p>
                </div>
              )}
            </div>

            <div className={styles.actions}>
              {!hideCancel && (
                <Button variant="ghost" onClick={onClose}>
                  {cancelText}
                </Button>
              )}
              <Button
                variant={type === "danger" ? "danger" : "primary"}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
