import { motion } from "framer-motion";
import ActivityCard from "../ActivityCard/ActivityCard";
import styles from "./ActivitiesList.module.css";
import type { TeacherActivity } from "../../../types/CreatedActivities";

interface ActivitiesListProps {
  activities: TeacherActivity[];
  onRepublish: (activityId: string) => void;
  onViewDetails: (activityId: string) => void;
}

const ActivitiesList = ({
  activities,
  onRepublish,
  onViewDetails,
}: ActivitiesListProps) => {
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
        <div className={styles.emptyIcon}>📋</div>
        <h3 className={styles.emptyTitle}>No hay actividades</h3>
        <p className={styles.emptyMessage}>
          No se encontraron actividades con los filtros seleccionados
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={containerVariants} className={styles.listContainer}>
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          variants={itemVariants}
          transition={{ delay: index * 0.05 }}
        >
          <ActivityCard
            activity={activity}
            onRepublish={onRepublish}
            onViewDetails={onViewDetails}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ActivitiesList;
