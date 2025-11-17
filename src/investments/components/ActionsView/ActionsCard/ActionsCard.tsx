import { motion } from "framer-motion";
import { FaChartLine, FaCoins, FaArrowUp, FaArrowDown } from "react-icons/fa";
import styles from "./ActionsCard.module.css";
import type { ActionsResponse } from "../../../types/actions.type";
import { useActionData } from "../../../hooks/useActions/useActionData";

interface ActionsCardProps {
  actions: ActionsResponse;
}

const ActionCard: React.FC<ActionsCardProps> = ({ actions }) => {
  const {
    riskConfig,
    isPositive,
    availabilityPercent,
    priceChangePercent,
    stats,
    handleDetails,
  } = useActionData(actions);

  return (
    <motion.div
      className={styles.card}
      whileTap={{ scale: 0.98 }}
      style={
        {
          "--risk-color": riskConfig.color,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <div className={styles.abbreviation}>{actions.abbreviation}</div>
          <div>
            <h3 className={styles.name}>{actions.name}</h3>
            <div
              className={styles.riskBadge}
              style={{ backgroundColor: riskConfig.color }}
            >
              <riskConfig.icon />
              <span>{riskConfig.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Section */}
      <div className={styles.priceSection}>
        <div className={styles.currentPrice}>
          <FaCoins className={styles.coinIcon} />
          <span className={styles.price}>
            {actions.currentPrice.toLocaleString("es-AR")}
          </span>
          <span className={styles.currency}>monedas</span>
        </div>
        <div
          className={`${styles.priceChange} ${
            isPositive ? styles.positive : styles.negative
          }`}
        >
          {isPositive ? <FaArrowUp /> : <FaArrowDown />}
          <span>
            {isPositive ? "+" : ""}
            {priceChangePercent}%
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map(({ label, value }) => (
          <div key={label} className={styles.stat}>
            <span className={styles.statLabel}>{label}</span>
            <span className={styles.statValue}>
              {value.toLocaleString("es-AR")}
            </span>
          </div>
        ))}
      </div>

      {/* Availability Bar */}
      <div className={styles.availabilitySection}>
        <div className={styles.availabilityHeader}>
          <span className={styles.availabilityLabel}>Disponibilidad</span>
          <span className={styles.availabilityPercent}>
            {availabilityPercent.toFixed(1)}%
          </span>
        </div>
        <div className={styles.availabilityBar}>
          <motion.div
            className={styles.availabilityFill}
            initial={{ width: 0 }}
            animate={{ width: `${availabilityPercent}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              backgroundColor:
                availabilityPercent > 50
                  ? "#22c55e"
                  : availabilityPercent > 20
                  ? "#f59e0b"
                  : "#ef4444",
            }}
          />
        </div>
      </div>

      {/* Action Button */}
      <motion.button
        className={styles.actionButton}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleDetails()}
      >
        <FaChartLine />
        <span>Ver Detalles y Gráfico</span>
      </motion.button>
    </motion.div>
  );
};

export default ActionCard;
