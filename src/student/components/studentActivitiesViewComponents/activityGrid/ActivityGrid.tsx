import { motion } from "framer-motion";
import type { ConfigurationActivity } from "../../../types/Activity.type";
import ActivityCard from "../activityCard/ActivityCard";
import styles from "./ActivityGrid.module.css";

interface ActivityGridProps {
  activities: ConfigurationActivity[];
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ activities }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (activities.length === 0) {
    return (
      <motion.div variants={itemVariants} className={styles.emptyState}>
        <div className={styles.emptyIcon}>🎯</div>
        <h3 className={styles.emptyTitle}>No hay actividades</h3>
        <p className={styles.emptyMessage}>
          No se encontraron actividades con los filtros seleccionados
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className={styles.gridContainer}>
      <motion.div
        variants={containerVariants}
        className={styles.activitiesGrid}
      >
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <ActivityCard activity={activity} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ActivityGrid;
