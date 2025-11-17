import { motion } from "framer-motion";
import { FaArrowUp, FaArrowDown, FaShieldAlt } from "react-icons/fa";
import styles from "./ActionsDetailHeader.module.css";
import type { ActionsResponse } from "../../../types/actions.type";
import formatPrice from "../../../../shared/utils/formatPrice";
import { getRiskConfig } from "../../../utils/actions.utils";
import { useActionData } from "../../../hooks/useActions/useActionData";

interface ActionHeaderProps {
  action: ActionsResponse;
}
const ActionHeader: React.FC<ActionHeaderProps> = ({ action }) => {
  const { priceChangePercent, isPositive, priceChange, purchased } =
    useActionData(action);

  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.mainInfo}>
        <div className={styles.titleSection}>
          <h1 className={styles.name}>{action.name}</h1>
          <div className={styles.subTitle}>
            <span className={styles.abbreviation}>{action.abbreviation}</span>
            <div
              className={styles.riskBadge}
              style={{ backgroundColor: getRiskConfig(action.riskLevel).color }}
            >
              <FaShieldAlt />
              Riesgo {action.riskLevel}
            </div>
          </div>
        </div>

        <div className={styles.priceSection}>
          <div
            className={`${styles.priceChange} ${
              isPositive ? styles.positive : styles.negative
            }`}
          >
            {isPositive ? <FaArrowUp /> : <FaArrowDown />}
            <span className={styles.changeAmount}>
              ${formatPrice(priceChange)}
            </span>
            <span className={styles.changePercent}>
              ({isPositive ? "+" : "-"}
              {Math.abs(Number.parseFloat(priceChangePercent))}%)
            </span>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        {/* <div className={styles.statCard}>
          <span className={styles.statLabel}>Precio Inicial</span>
          <span className={styles.statValue}>
            ${formatPrice(action.initialPrice)}
          </span>
        </div> */}
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Acciones</span>
          <span className={styles.statValue}>
            {formatPrice(action.totalAmount)}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Disponibles en el mercado</span>
          <span className={styles.statValue}>
            {formatPrice(action.availableAmount)}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Vendidas en el mercado</span>
          <span className={styles.statValue}>
            {formatPrice(action.soldAmount)}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Mis Acciones</span>
          <span className={styles.statValue}>{formatPrice(purchased)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionHeader;
