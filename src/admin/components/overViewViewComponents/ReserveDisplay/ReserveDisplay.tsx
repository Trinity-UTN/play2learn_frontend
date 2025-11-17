import { motion, type Variants } from "framer-motion";
import styles from "./ReserveDisplay.module.css";
import formatPrice from "../../../../shared/utils/formatPrice";
import { FaLock, FaSync } from "react-icons/fa";

interface ReserveDisplayProps {
  reserveTotalBalance: number;
  reserveTotalBalanceOnCirculation: number;
  reserveTotalBalanceOnReserve: number;
  title?: string;
  showPercentages?: boolean;
  animated?: boolean;
}

export const ReserveDisplay: React.FC<ReserveDisplayProps> = ({
  reserveTotalBalance,
  reserveTotalBalanceOnCirculation,
  reserveTotalBalanceOnReserve,
  title = "Estado de Reservas",
  animated = true,
}) => {
  const calculatePercentage = (part: number, total: number): number => {
    return total > 0 ? (part / total) * 100 : 0;
  };

  const circulationPercentage = calculatePercentage(
    reserveTotalBalanceOnCirculation,
    reserveTotalBalance
  );

  const reservePercentage = calculatePercentage(
    reserveTotalBalanceOnReserve,
    reserveTotalBalance
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  const progressVariants: Variants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1.2, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      className={styles.container}
      variants={animated ? containerVariants : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
    >
      {/* Header */}
      <motion.div
        className={styles.header}
        variants={animated ? itemVariants : undefined}
      >
        <div className={styles.titleSection}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={styles.content}>
        <motion.div
          className={`${styles.card} ${styles.totalCard}`}
          variants={animated ? itemVariants : undefined}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Balance Total</h3>
          </div>
          <div className={styles.cardValue}>
            <span className={styles.amount}>
              {formatPrice(reserveTotalBalance)}
            </span>
            <span className={styles.currency}>Monedas</span>
          </div>
          <div className={styles.cardSubtext}>Reserva total disponible</div>
        </motion.div>

        {/* Distribution Cards */}
        <div className={styles.distributionGrid}>
          {/* En Circulación */}
          <motion.div
            className={`${styles.card} ${styles.circulationCard}`}
            variants={animated ? itemVariants : undefined}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <FaSync />
              </div>
              <h3 className={styles.cardTitle}>En Circulación</h3>
            </div>
            <div className={styles.cardValue}>
              <span className={`${styles.amount} ${styles.circulationAmount}`}>
                {formatPrice(reserveTotalBalanceOnCirculation)}
              </span>
              <span className={styles.currency}>Monedas</span>
            </div>
          </motion.div>

          {/* En Reserva */}
          <motion.div
            className={`${styles.card} ${styles.reserveCard}`}
            variants={animated ? itemVariants : undefined}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <FaLock />
              </div>
              <h3 className={styles.cardTitle}>En Reserva</h3>
            </div>
            <div className={styles.cardValue}>
              <span className={`${styles.amount} ${styles.reserveAmount}`}>
                {formatPrice(reserveTotalBalanceOnReserve)}
              </span>
              <span className={styles.currency}>Monedas</span>
            </div>
          </motion.div>
        </div>

        {/* Visual Distribution */}
        <motion.div
          className={styles.visualDistribution}
          variants={animated ? itemVariants : undefined}
        >
          <h4 className={styles.distributionTitle}>Distribución Visual</h4>
          <div className={styles.distributionBar}>
            <motion.div
              className={styles.circulationSegment}
              variants={animated ? progressVariants : undefined}
              custom={circulationPercentage}
              initial={animated ? "hidden" : undefined}
              animate={animated ? "visible" : undefined}
              title={`En Circulación: ${circulationPercentage.toFixed(1)}%`}
            />
            <motion.div
              className={styles.reserveSegment}
              variants={animated ? progressVariants : undefined}
              custom={reservePercentage}
              initial={animated ? "hidden" : undefined}
              animate={animated ? "visible" : undefined}
              title={`En Reserva: ${reservePercentage.toFixed(1)}%`}
            />
          </div>
          <div className={styles.distributionLegend}>
            <div className={styles.legendItem}>
              <div
                className={`${styles.legendColor} ${styles.circulationColor}`}
              />
              <span>En Circulación</span>
            </div>
            <div className={styles.legendItem}>
              <div className={`${styles.legendColor} ${styles.reserveColor}`} />
              <span>En Reserva</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ReserveDisplay;
