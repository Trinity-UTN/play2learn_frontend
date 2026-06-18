import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import type { ActivityUI } from "../../../types/Activity.type";
import ActivityRow from "../activityRow/ActivityRow";
import { useActivityActions } from "../../../hooks/activities/useActivityActions";
import styles from "./ActivityGrid.module.css";

interface ActivityGridProps {
  activities: ActivityUI[];
  loading: boolean;
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ activities }) => {
  const { viewActivity, viewActivityResults } = useActivityActions();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleViewActivity = async (activityId: string) => {
    viewActivity(Number(activityId));
  };

  const handleViewResults = (
    activityId: string,
    remainingAttempts: number,
    completedAt?: string,
  ) => {
    viewActivityResults(
      Number(activityId),
      remainingAttempts,
      completedAt || undefined,
    );
  };

  if (activities.length === 0) {
    return (
      <motion.div variants={itemVariants} className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <FaClipboardList />
        </div>
        <h3 className={styles.emptyTitle}>No hay actividades</h3>
        <p className={styles.emptyMessage}>
          No se encontraron actividades con los filtros seleccionados
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className={styles.gridContainer}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          variants={itemVariants}
          transition={{ delay: index * 0.1 }}
        >
          <ActivityRow
            activity={activity}
            onStart={handleViewActivity}
            onViewResults={handleViewResults}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ActivityGrid;
