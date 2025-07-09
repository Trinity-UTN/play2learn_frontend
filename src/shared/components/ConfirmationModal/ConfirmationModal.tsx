import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import Button from "../Button/ButtonComponent";
import styles from "./ConfirmationModal.module.css";

interface AlertProps {
  title: string;
  message: string;
  type?: "warning" | "danger" | "info";
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  showDoubleConfirmation?: boolean;
  doubleConfirmationText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<AlertProps> = ({
  title,
  message,
  type = "warning",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isOpen,
  showDoubleConfirmation = false,
  doubleConfirmationText = "¿Está completamente seguro? Esta acción no se puede deshacer.",
  onClose,
  onConfirm,
}) => {
  const [showSecondConfirmation, setShowSecondConfirmation] = useState(false);

  const handleFirstConfirm = () => {
    if (showDoubleConfirmation) {
      setShowSecondConfirmation(true);
    } else {
      onConfirm();
    }
  };

  const handleSecondConfirm = () => {
    onConfirm();
    setShowSecondConfirmation(false);
  };

  const handleClose = () => {
    setShowSecondConfirmation(false);
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0 },
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
          onClick={handleClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`${styles.modal} ${styles[type]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div className={styles.iconWrapper}>
                <FaExclamationTriangle className={styles.icon} />
              </div>
              <button className={styles.closeButton} onClick={handleClose}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.message}>
                {showSecondConfirmation ? doubleConfirmationText : message}
              </p>
            </div>

            <div className={styles.actions}>
              <Button variant="ghost" onClick={handleClose}>
                {cancelText}
              </Button>
              <Button
                variant={type === "danger" ? "danger" : "primary"}
                onClick={
                  showSecondConfirmation
                    ? handleSecondConfirm
                    : handleFirstConfirm
                }
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
