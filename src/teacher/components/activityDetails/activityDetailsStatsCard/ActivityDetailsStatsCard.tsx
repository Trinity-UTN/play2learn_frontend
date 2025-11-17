import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import styles from "./ActivityDetailsStatsCard.module.css";

interface ActivityDetailsStatsCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  color: string;
  tooltip?: string;
  progress?: number;
  index: number;
}

const ActivityDetailsStatsCard = ({
  icon: Icon,
  label,
  value,
  color,
  tooltip,
  progress,
  index,
}: ActivityDetailsStatsCardProps) => {
  return (
    <motion.div
      className={styles.item}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      title={tooltip}
    >
      <div
        className={styles.iconWrapper}
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className={styles.icon} style={{ color }} />
      </div>

      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>

        {progress !== undefined && (
          <div className={styles.progressBar}>
            <motion.div
              className={styles.progressFill}
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ActivityDetailsStatsCard;
