import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import styles from "./FinishActivityModal.module.css";

interface FinishActivityModalProps {
  activityName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const FinishActivityModal = ({
  activityName,
  onConfirm,
  onCancel,
}: FinishActivityModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={styles.closeButton} onClick={onCancel}>
            <FaTimes />
          </button>

          <div className={styles.iconWrapper}>
            <FaExclamationTriangle className={styles.icon} />
          </div>

          <h2 className={styles.title}>Finalizar Actividad</h2>

          <p className={styles.message}>
            ¿Estás seguro de que deseas finalizar la actividad{" "}
            <strong>"{activityName}"</strong>?
          </p>

          <div className={styles.warning}>
            <FaExclamationTriangle />
            <span>Una vez finalizada, ningún estudiante podrá realizarla.</span>
          </div>

          <div className={styles.actions}>
            <motion.button
              className={styles.cancelButton}
              onClick={onCancel}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancelar
            </motion.button>
            <motion.button
              className={styles.confirmButton}
              onClick={onConfirm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sí, Finalizar
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FinishActivityModal;
