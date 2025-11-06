import { motion } from "framer-motion";
import styles from "./PlazoFijoStats.module.css";
import { FaCoins, FaChartLine, FaCheckCircle } from "react-icons/fa";
import type { StatisticsPlazoFijoResponse } from "../../../types/plazoFijo.type";
import formatPrice from "../../../../shared/utils/formatPrice";

export const PlazoFijoStats = ({
  statistics,
}: {
  statistics: StatisticsPlazoFijoResponse | null;
}) => {
  if (!statistics) return null;

  const { totalInvested, totalReward, quantityInProgress } = statistics;
  return (
    <div className={styles.statsGrid}>
      <motion.div
        className={styles.statCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div
          className={styles.statIcon}
          style={{
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
          }}
        >
          <FaCoins />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Total Invertido</span>
          <span className={styles.statValue}>{formatPrice(totalInvested)}</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.statCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div
          className={styles.statIcon}
          style={{
            background: "linear-gradient(135deg, #22c55e, #15803d)",
          }}
        >
          <FaChartLine />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Ganancias Totales</span>
          <span className={styles.statValue}>{formatPrice(totalReward)}</span>
        </div>
      </motion.div>

      <motion.div
        className={styles.statCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div
          className={styles.statIcon}
          style={{
            background: "linear-gradient(135deg, #8b5cf6, #6d28d9)",
          }}
        >
          <FaCheckCircle />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statLabel}>Plazos Activos</span>
          <span className={styles.statValue}>{quantityInProgress}</span>
        </div>
      </motion.div>
    </div>
  );
};
