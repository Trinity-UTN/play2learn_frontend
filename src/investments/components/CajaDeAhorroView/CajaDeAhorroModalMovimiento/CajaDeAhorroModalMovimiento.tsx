import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import styles from "./CajaDeAhorroModalMovimiento.module.css";
export interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  balanceLabel: string;
  balanceValue: number;
  amount: string;
  setAmount: (value: string) => void;
  confirmText: string;
  onConfirm: () => void;
  children: ReactNode;
}

export const CajaDeAhorroModalMovimiento = ({
  show,
  onClose,
  title,
  balanceLabel,
  balanceValue,
  amount,
  setAmount,
  onConfirm,
  confirmText,
  children,
}: ModalProps) => {
  const disabledButton =
    !amount ||
    Number.parseFloat(amount) <= 0 ||
    Number.parseFloat(amount) > balanceValue;
  const disabledMove =
    Number.parseFloat(amount) <= 0 || Number.parseFloat(amount) > balanceValue;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>{title}</h3>
              <button className={styles.closeButton} onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.modalContent}>
              <div className={styles.modalInfo}>
                <span>{balanceLabel}</span>
                <span className={styles.modalBalance}>
                  {balanceValue.toLocaleString("es-AR")} monedas
                </span>
              </div>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Monto"
                className={styles.modalInput}
                min="0"
                max={balanceValue}
              />

              {disabledMove && (
                <div className={styles.warning}>
                  <FaExclamationTriangle />
                  <span className={styles.warningText}>Saldo insuficiente</span>
                </div>
              )}
              <motion.button
                className={styles.modalButton}
                onClick={onConfirm}
                disabled={disabledButton}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {children}
                <span>{confirmText}</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
