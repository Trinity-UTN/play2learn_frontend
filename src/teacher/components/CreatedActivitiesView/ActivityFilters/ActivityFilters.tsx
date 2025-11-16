import { motion } from "framer-motion";

import styles from "./ActivityFilters.module.css";
import type { TeacherActivity } from "../../../types/CreatedActivities";

interface ActivityFiltersProps {
  selectedStatus: string;
  selectedSubject: string;
  onStatusChange: (status: string) => void;
  onSubjectChange: (subject: string) => void;
  activities: TeacherActivity[];
}

const ActivityFilters = ({
  selectedStatus,
  selectedSubject,
  onStatusChange,
  onSubjectChange,
  activities,
}: ActivityFiltersProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const statuses = [
    { value: "all", label: "Todas" },
    { value: "PUBLISHED", label: "Publicadas" },
    { value: "PENDING_PUBLICATION", label: "Pendientes" },
    { value: "EXPIRED", label: "Vencidas" },
  ];

  const subjects = ["all", ...new Set(activities.map((a) => a.subjectName))];

  return (
    <motion.div variants={itemVariants} className={styles.filtersContainer}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Estado:</label>
        <div className={styles.filterButtons}>
          {statuses.map((status) => (
            <motion.button
              key={status.value}
              className={`${styles.filterButton} ${
                selectedStatus === status.value ? styles.active : ""
              }`}
              onClick={() => onStatusChange(status.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Materia:</label>
        <select
          className={styles.filterSelect}
          value={selectedSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
        >
          <option value="all">Todas las materias</option>
          {subjects
            .filter((s) => s !== "all")
            .map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
        </select>
      </div>
    </motion.div>
  );
};

export default ActivityFilters;
