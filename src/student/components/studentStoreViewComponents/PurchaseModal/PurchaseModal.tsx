import { motion, type Variants } from "framer-motion";
import {
  FaCoins,
  FaTimes,
  FaShoppingCart,
  FaCheckCircle,
} from "react-icons/fa";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import type { BodyPart } from "../../../types/CurrentStudent.type";
import styles from "./PurchaseModal.module.css";

interface PurchaseModalProps {
  skin: BodyPart;
  userBalance: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const PurchaseModal: React.FC<PurchaseModalProps> = ({
  skin,
  userBalance,
  onConfirm,
  onCancel,
}) => {
  const newBalance = userBalance - skin.price;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      y: 50,
    },
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={styles.modalOverlay}
      onClick={onCancel}
    >
      <motion.div
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
        className={styles.modalContent}
      >
        <Card className={styles.modalCard}>
          <button className={styles.closeButton} onClick={onCancel}>
            <FaTimes />
          </button>

          <div className={styles.modalHeader}>
            <div className={styles.cartIcon}>
              <FaShoppingCart />
            </div>
            <h2 className={styles.modalTitle}>Confirmar Compra</h2>
          </div>

          <div className={styles.itemPreview}>
            <div className={styles.previewImage}>
              <div className={styles.imagePlaceholder}>
                <div className={styles.imageIcon}>
                  {skin.type === "avatar" ? "👤" : "🎩"}
                </div>
              </div>
            </div>
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{skin.name}</h3>
              <div className={styles.itemPrice}>
                <FaCoins className={styles.coinIcon} />
                <span>{skin.price.toLocaleString()} monedas</span>
              </div>
            </div>
          </div>

          <div className={styles.balanceInfo}>
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>Saldo actual</span>
              <span className={styles.balanceValue}>
                {userBalance.toLocaleString()}
              </span>
            </div>
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>Precio del item</span>
              <span
                className={styles.balanceValue}
                style={{ color: "#ef4444" }}
              >
                -{skin.price.toLocaleString()}
              </span>
            </div>
            <div className={styles.balanceDivider} />
            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>Saldo restante</span>
              <span
                className={styles.balanceValue}
                style={{ color: newBalance >= 0 ? "#22c55e" : "#ef4444" }}
              >
                {newBalance.toLocaleString()}
              </span>
            </div>
          </div>

          <div className={styles.confirmInfo}>
            <FaCheckCircle className={styles.confirmIcon} />
            <p>
              Este item se agregará a tu colección y podrás usarlo de inmediato
            </p>
          </div>

          <div className={styles.modalActions}>
            <Button
              variant="secondary"
              onClick={onCancel}
              className={styles.cancelButton}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={onConfirm}
              className={styles.confirmButton}
            >
              <FaShoppingCart className={styles.buttonIcon} />
              Confirmar Compra
            </Button>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default PurchaseModal;
