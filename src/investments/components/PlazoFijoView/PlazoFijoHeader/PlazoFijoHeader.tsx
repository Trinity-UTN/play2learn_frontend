import { motion } from "framer-motion";
import styles from "./PlazoFijoHeader.module.css";
import { FaClock } from "react-icons/fa";
import { PlazoFijoStats } from "../PlazoFijoStats/PlazoFijoStats";
import type { StatisticsPlazoFijoResponse } from "../../../types/plazoFijo.type";

export const PlazoFijoHeader = ({
  statistics,
}: {
  statistics: StatisticsPlazoFijoResponse | null;
}) => {
  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.titleSection}>
        <motion.div
          className={styles.iconWrapper}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <FaClock />
        </motion.div>
        <div>
          <h1 className={styles.title}>Plazos Fijos</h1>
          <p className={styles.subtitle}>
            Inversión segura con retorno garantizado
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <PlazoFijoStats statistics={statistics} />
    </motion.div>
  );
};
