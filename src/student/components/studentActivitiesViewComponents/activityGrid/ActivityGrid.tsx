import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { ActivityUI } from "../../../types/Activity.type";
import ActivityCard from "../activityCard/ActivityCard";
import ActivityRow from "../activityRow/ActivityRow";
import FlexBox from "../../../../shared/components/FlexBox/FlexBox";
import { useLayout } from "../../../../shared/hooks/useLayout";
import { useActivityStudent } from "../../../hooks/useActivityStudentAPI";
import styles from "./ActivityGrid.module.css";
import type { PaginationInfo } from "../../../context/activityStudentContext/activityStudentContextUI/ActivityStudentProviderUI";

interface ActivityGridProps {
  activities: ActivityUI[];
  paginationInfo?: PaginationInfo;
}

const ActivityGrid: React.FC<ActivityGridProps> = ({
  activities,
  paginationInfo,
}) => {
  const { isRow, toggleLayout } = useLayout();
  const { getActivityById } = useActivityStudent();
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleStartActivity = async (activityId: string) => {
    await getActivityById(Number(activityId));
    navigate(`/dashboard/student/actividades/${activityId}/view`);
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
                  onStart={handleStartActivity}
                />
              </motion.div>
            ))
          : activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <ActivityRow
                  activity={activity}
                  onStart={handleStartActivity}
                />
              </motion.div>
            ))}
      </FlexBox>
    </motion.div>
  );
};

export default ActivityGrid;
