import { motion, type Variants } from "framer-motion";
import { FaStore, FaCoins, FaTshirt, FaCheckCircle } from "react-icons/fa";
import styles from "./StoreHeader.module.css";

interface StoreHeaderProps {
  balance: number;
  totalItems: number;
  ownedItems: number;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({
  balance,
  totalItems,
  ownedItems,
}) => {
  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className={styles.header}>
      <motion.div variants={itemVariants} className={styles.titleSection}>
        <div className={styles.titleWrapper}>
          <FaStore className={styles.storeIcon} />
          <h1 className={styles.title}>Tienda de Skins</h1>
        </div>
        <p className={styles.subtitle}>
          Personaliza tu avatar con increíbles accesorios
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className={styles.statsSection}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "rgba(34, 197, 94, 0.2)" }}
          >
            <FaCoins style={{ color: "#22c55e" }} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tu saldo</span>
            <span className={styles.statValue}>{balance.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
          >
            <FaTshirt style={{ color: "#8b5cf6" }} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Disponibles</span>
            <span className={styles.statValue}>{totalItems}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}
          >
            <FaCheckCircle style={{ color: "#3b82f6" }} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Comprados</span>
            <span className={styles.statValue}>{ownedItems}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StoreHeader;
