import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import type { BodyPart } from "../../../types/CurrentStudent.type";
import styles from "./AspectPopup.module.css";

interface AspectPopupProps {
  aspect: BodyPart;
  onClose: () => void;
}

const AspectPopup: React.FC<AspectPopupProps> = ({ aspect, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.popupOverlay}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className={styles.infoPopup}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.popupHeader}>
          <h3 className={styles.popupTitle}>{aspect.name}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className={styles.popupContent}>
          <div className={styles.popupImageContainer}>
            <img
              src={aspect.image || "/placeholder.svg"}
              alt={aspect.name}
              className={styles.popupImage}
            />
          </div>
          <div className={styles.popupInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Tipo:</span>
              <span className={styles.infoValue}>{aspect.type}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Precio:</span>
              <span className={styles.infoValue}>${aspect.price}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Disponible:</span>
              <span
                className={`${styles.infoValue} ${
                  aspect.available ? styles.available : styles.unavailable
                }`}
              >
                {aspect.available ? "Sí" : "No"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AspectPopup;
