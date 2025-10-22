import { motion } from "framer-motion";
import {
  FaChartLine,
  FaCoins,
  FaShieldAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import styles from "./InvestmentCard.module.css";
import type {
  InvestmentResponse,
  RiskLevel,
} from "../../types/investment.type";

interface InvestmentCardProps {
  investment: InvestmentResponse;
  onClick: () => void;
}

const getRiskConfig = (risk: RiskLevel) => {
  switch (risk) {
    case "BAJO":
      return { color: "#22c55e", label: "Bajo Riesgo", icon: FaShieldAlt };
    case "MEDIO":
      return { color: "#f59e0b", label: "Riesgo Medio", icon: FaShieldAlt };
    case "ALTO":
      return { color: "#ef4444", label: "Alto Riesgo", icon: FaShieldAlt };
  }
};

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  investment,
  onClick,
}) => {
  const riskConfig = getRiskConfig(investment.riskLevel);
  const priceChange = investment.currentPrice - investment.initialPrice;
  const priceChangePercent = (
    (priceChange / investment.initialPrice) *
    100
  ).toFixed(2);
  const isPositive = priceChange >= 0;
  const availabilityPercent =
    (investment.availableAmount / investment.totalAmount) * 100;

  return (
    <motion.div
      className={styles.card}
      onClick={onClick}
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
          <div className={styles.abbreviation}>{investment.abbreviation}</div>
          <div>
            <h3 className={styles.name}>{investment.name}</h3>
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
            {investment.currentPrice.toLocaleString("es-AR")}
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
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Acciones</span>
          <span className={styles.statValue}>
            {investment.totalAmount.toLocaleString("es-AR")}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Disponibles</span>
          <span className={styles.statValue}>
            {investment.availableAmount.toLocaleString("es-AR")}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Vendidas</span>
          <span className={styles.statValue}>
            {investment.soldAmount.toLocaleString("es-AR")}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Precio Inicial</span>
          <span className={styles.statValue}>
            {investment.initialPrice.toLocaleString("es-AR")}
          </span>
        </div>
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
      >
        <FaChartLine />
        <span>Ver Detalles y Gráfico</span>
      </motion.button>
    </motion.div>
  );
};

export default InvestmentCard;
