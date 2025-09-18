import { motion, type Variants } from "framer-motion";
import styles from "./ActivitiesStats.module.css";

interface ActivitiesStatsProps {
  statsVariants: Variants;
  color: string;
  icon: React.ReactNode;
  value: number;
  label: string;
}

const ActivitiesStats: React.FC<ActivitiesStatsProps> = ({
  statsVariants,
  color,
  icon,
  value,
  label,
}) => {
  return (
    <motion.div variants={statsVariants} className={styles.statCard}>
      <div className={styles.statIcon} style={{ backgroundColor: color }}>
        {icon}
      </div>
      <div className={styles.statContent}>
        <span className={styles.statNumber}>{value}</span>
        <span className={styles.statLabel}>{label}</span>
      </div>
    </motion.div>
  );
};

export default ActivitiesStats;
