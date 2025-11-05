import { motion } from "framer-motion";
import { FaChartBar, FaPercentage, FaCoins, FaChartLine } from "react-icons/fa";
import styles from "./ActionsDetailsStats.module.css";
import type { ActionsResponse } from "../../../types/actions.type";
import { useActionData } from "../../../hooks/useActions/useActionData";
interface ActionStatsProps {
  action: ActionsResponse;
}

const ActionStats: React.FC<ActionStatsProps> = ({ action }) => {
  const { priceChangePercent, availabilityPercent, soldPercent } =
    useActionData(action);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className={styles.title}>Estadísticas de la Inversión</h3>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#8b5cf6" }}
          >
            <FaChartBar />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Disponibilidad</span>
            <span className={styles.statValue}>
              {availabilityPercent.toFixed(1)}%
            </span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${availabilityPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#22c55e" }}
          >
            <FaPercentage />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Acciones Vendidas</span>
            <span className={styles.statValue}>{soldPercent.toFixed(1)}%</span>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${soldPercent}%`, backgroundColor: "#22c55e" }}
              />
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{ backgroundColor: "#f59e0b" }}
          >
            <FaCoins />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Valor Total de Mercado</span>
            <span className={styles.statValue}>
              ${(action.totalAmount * action.currentPrice).toLocaleString()}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div
            className={styles.statIcon}
            style={{
              backgroundColor:
                Number.parseFloat(priceChangePercent) >= 0
                  ? "#22c55e"
                  : "#ef4444",
            }}
          >
            <FaChartLine />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Variación de Precio</span>
            <span
              className={styles.statValue}
              style={{
                color:
                  Number.parseFloat(priceChangePercent) >= 0
                    ? "#22c55e"
                    : "#ef4444",
              }}
            >
              {Number.parseFloat(priceChangePercent) >= 0 ? "+" : ""}
              {priceChangePercent}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionStats;
