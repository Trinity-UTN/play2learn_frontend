import { motion } from "framer-motion";
import { FaStore, FaCoins, FaTshirt, FaCheckCircle } from "react-icons/fa";
import styles from "./StoreHeader.module.css";
import { itemVariants } from "../../../constants/store.contanst";
interface StoreHeaderProps {
  balance: number | string;
  totalItems: number;
  ownedItems: number;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({
  balance,
  totalItems,
  ownedItems,
}) => {
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
            style={{ backgroundColor: "rgba(34, 197, 94, 0.72)" }}
          >
            <FaCoins />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Tu saldo líquido</span>
            <span className={styles.statValue}>{balance.toLocaleString()}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "rgba(138, 92, 246, 0.69)" }}
          >
            <FaTshirt />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>Disponibles</span>
            <span className={styles.statValue}>{totalItems}</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "rgba(59, 131, 246, 0.82)" }}
          >
            <FaCheckCircle />
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
