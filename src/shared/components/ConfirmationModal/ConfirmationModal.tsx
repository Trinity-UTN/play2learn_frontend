import { motion, AnimatePresence } from "framer-motion";
import {
  FaExclamationTriangle,
  FaTimes,
  FaInfoCircle,
  FaExclamationCircle,
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles.overlay}
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${styles.modal} ${styles[type]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <FaTimes />
            </button>

            <div className={styles.content}>
              <div className={styles.iconWrapper}>{getIcon()}</div>

              <h3 className={styles.title}>{title}</h3>

              <p className={styles.message}>
                {showDoubleConfirmation && showSecondConfirmation
                  ? doubleConfirmationText
                  : message}
              </p>
            </div>

            <div className={styles.actions}>
              <Button variant="ghost" onClick={onClose}>
                {cancelText}
              </Button>
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
