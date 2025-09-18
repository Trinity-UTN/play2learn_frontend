import { motion, type Variants } from "framer-motion";
import { FaGamepad } from "react-icons/fa";
import type { Activity } from "../../../types/TeacherActivity.type";
import ActivityCard from "../activityCard/ActivityCard";
import styles from "./ActivitiesGrid.module.css";

interface ActivitiesGridProps {
  itemVariants: Variants;
  filteredActivities: Activity[];
  noResultTitle: string;
  noResultText: string;
}

const ActivitiesGrid: React.FC<ActivitiesGridProps> = ({
  itemVariants,
  filteredActivities,
  noResultTitle,
  noResultText,
}) => {
  return (
    <motion.div variants={itemVariants} className={styles.activitiesSection}>
      <div className={styles.resultsHeader}>
        <h2 className={styles.resultsTitle}>
          {filteredActivities.length} actividad
          {filteredActivities.length !== 1 ? "es" : ""} disponible
          {filteredActivities.length !== 1 ? "s" : ""}
        </h2>
      </div>

      <div className={styles.activitiesGrid}>
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            variants={itemVariants}
            transition={{ delay: index * 0.1 }}
          >
            <ActivityCard activity={activity} />
          </motion.div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <motion.div variants={itemVariants} className={styles.noResults}>
          <FaGamepad className={styles.noResultsIcon} />
          <h3 className={styles.noResultsTitle}>{noResultTitle}</h3>
          <p className={styles.noResultsText}>{noResultText}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActivitiesGrid;
