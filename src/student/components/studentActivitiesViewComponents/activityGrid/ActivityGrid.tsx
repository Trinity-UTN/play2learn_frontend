import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import type { ActivityUI } from "../../../types/Activity.type";
import {
  type PaginationInfo,
  LoadingSpinnerComponent,
  FlexBox,
  useLayout,
} from "@/shared";
import ActivityCard from "../activityCard/ActivityCard";
import ActivityRow from "../activityRow/ActivityRow";
import { useActivityActions } from "../../../hooks/activities/useActivityActions";
import styles from "./ActivityGrid.module.css";

interface ActivityGridProps {
  activities: ActivityUI[];
  paginationInfo?: PaginationInfo;
  loading: boolean;
}

const ActivityGrid: React.FC<ActivityGridProps> = ({
  activities,
  paginationInfo,
  loading,
}) => {
  const { isRow, toggleLayout } = useLayout();
  const { viewActivity } = useActivityActions();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleViewActivity = async (activityId: string) => {
    viewActivity(Number(activityId));
  };

  if (loading) {
    return (
      <motion.div variants={itemVariants} className={styles.emptyState}>
        <div className={styles.emptyIcon}>
          <LoadingSpinnerComponent />
        </div>
      </motion.div>
    );
  }

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
      <FlexBox
        isRow={isRow}
        onToggle={toggleLayout}
        paginationInfo={paginationInfo!}
      >
        {isRow
          ? activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <ActivityCard
                  activity={activity}
                  onStart={handleViewActivity}
                />
              </motion.div>
            ))
          : activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <ActivityRow activity={activity} onStart={handleViewActivity} />
              </motion.div>
            ))}
      </FlexBox>
    </motion.div>
  );
};

export default ActivityGrid;
