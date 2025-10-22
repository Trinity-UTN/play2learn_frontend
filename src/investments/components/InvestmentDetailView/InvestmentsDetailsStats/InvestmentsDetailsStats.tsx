import { motion } from "framer-motion";
import { FaChartBar, FaPercentage, FaCoins, FaChartLine } from "react-icons/fa";
import styles from "./InvestmentsDetailsStats.module.css";
import type { InvestmentResponse } from "../../../types/investment.type";

interface InvestmentStatsProps {
  investment: InvestmentResponse;
}

const InvestmentStats: React.FC<InvestmentStatsProps> = ({ investment }) => {
  const availabilityPercent =
    (investment.availableAmount / investment.totalAmount) * 100;
  const soldPercent = (investment.soldAmount / investment.totalAmount) * 100;
  const priceChange = investment.currentPrice - investment.initialPrice;
  const priceChangePercent = (
    (priceChange / investment.initialPrice) *
    100
  ).toFixed(2);

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
              $
              {(
                investment.totalAmount * investment.currentPrice
              ).toLocaleString()}
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

export default InvestmentStats;
