import { motion } from "framer-motion";
import {
  FaClock,
  FaCoins,
  FaCheckCircle,
  FaHourglassHalf,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";

import styles from "./PlazoFijoCard.module.css";
import type {
  FIXED_TERM_DAYS,
  PlazoFijoResponse,
} from "../../../types/plazoFijo.type";

interface PlazoFijoCardProps {
  plazoFijo: PlazoFijoResponse;
  index: number;
}

const getTermConfig = (term: FIXED_TERM_DAYS) => {
  switch (term) {
    case "SEMANAL":
      return { label: "Semanal", color: "#f59e0b", days: 7 };
    case "QUINCENAL":
      return { label: "Quincenal", color: "#3b82f6", days: 15 };
    case "MENSUAL":
      return { label: "Mensual", color: "#8b5cf6", days: 30 };
  }
};

const PlazoFijoCard: React.FC<PlazoFijoCardProps> = ({ plazoFijo, index }) => {
  const termConfig = getTermConfig(plazoFijo.fixedTermDays);
  const isFinished = plazoFijo.fixedTermState === "FINISHED";
  const profit = plazoFijo.amountReward - plazoFijo.amountInvested;
  const profitPercent = ((profit / plazoFijo.amountInvested) * 100).toFixed(2);

  const startDate = new Date(plazoFijo.startDate);
  const endDate = new Date(plazoFijo.endDate);
  const today = new Date();
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysElapsed = Math.ceil(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const progress = isFinished
    ? 100
    : Math.min(100, (daysElapsed / totalDays) * 100);

  return (
    <motion.div
      className={`${styles.card} ${isFinished ? styles.cardFinished : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 40px ${termConfig.color}40`,
      }}
      style={
        {
          "--term-color": termConfig.color,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className={styles.header}>
        <div
          className={styles.termBadge}
          style={{ backgroundColor: termConfig.color }}
        >
          <FaClock />
          <span>{termConfig.label}</span>
        </div>
        <div
          className={`${styles.statusBadge} ${
            isFinished ? styles.statusFinished : styles.statusActive
          }`}
        >
          {isFinished ? <FaCheckCircle /> : <FaHourglassHalf />}
          <span>{isFinished ? "Finalizado" : "En Progreso"}</span>
        </div>
      </div>

      {/* Amount Section */}
      <div className={styles.amountSection}>
        <div className={styles.amountItem}>
          <span className={styles.amountLabel}>Invertido</span>
          <div className={styles.amountValue}>
            <FaCoins className={styles.coinIcon} />
            <span>{plazoFijo.amountInvested.toLocaleString("es-AR")}</span>
          </div>
        </div>
        <div className={styles.arrow}>→</div>
        <div className={styles.amountItem}>
          <span className={styles.amountLabel}>A Recibir</span>
          <div className={styles.amountValue} style={{ color: "#22c55e" }}>
            <FaCoins className={styles.coinIcon} />
            <span>{plazoFijo.amountReward.toLocaleString("es-AR")}</span>
          </div>
        </div>
      </div>

      {/* Profit Section */}
      <div className={styles.profitSection}>
        <FaChartLine className={styles.profitIcon} />
        <div className={styles.profitContent}>
          <span className={styles.profitLabel}>Ganancia</span>
          <span className={styles.profitValue}>
            +{profit.toLocaleString("es-AR")} ({profitPercent}%)
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progreso</span>
          <span className={styles.progressPercent}>{progress.toFixed(0)}%</span>
        </div>
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
            style={{ backgroundColor: termConfig.color }}
          />
        </div>
      </div>

      {/* Dates Section */}
      <div className={styles.datesSection}>
        <div className={styles.dateItem}>
          <FaCalendarAlt className={styles.dateIcon} />
          <div>
            <span className={styles.dateLabel}>Inicio</span>
            <span className={styles.dateValue}>
              {startDate.toLocaleDateString("es-AR")}
            </span>
          </div>
        </div>
        <div className={styles.dateItem}>
          <FaCalendarAlt className={styles.dateIcon} />
          <div>
            <span className={styles.dateLabel}>Fin</span>
            <span className={styles.dateValue}>
              {endDate.toLocaleDateString("es-AR")}
            </span>
          </div>
        </div>
      </div>

      {/* Days Remaining */}
      {!isFinished && (
        <div className={styles.remainingDays}>
          <FaClock />
          <span>
            {daysRemaining}{" "}
            {daysRemaining === 1 ? "día restante" : "días restantes"}
          </span>
        </div>
      )}

      {isFinished && (
        <motion.button
          className={styles.collectButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            console.log("[v0] Collecting plazo fijo:", plazoFijo.id)
          }
        >
          <FaCheckCircle />
          <span>Cobrar Plazo Fijo</span>
        </motion.button>
      )}
    </motion.div>
  );
};

export default PlazoFijoCard;
