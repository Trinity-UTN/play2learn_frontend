import { motion } from "framer-motion";
import { FaCalendarAlt, FaEye, FaUser } from "react-icons/fa";
import {
  Badge,
  Button,
  Card,
  Tooltip,
  getActivityColor,
  getActivityIcon,
  getSubjectColor,
} from "@/shared";
import type { ActivityCompletedPendingDto } from "../../../types/NoLudicaReview.type";
import { formatAttemptDate } from "../../../utils/activity/noLudicaReview.utils";
import styles from "./ActivitiesPendingTable.module.css";

interface PendingActionHandlers {
  onViewAttempt: (attempt: ActivityCompletedPendingDto) => void;
}

interface ActivitiesPendingTableProps {
  attempts: ActivityCompletedPendingDto[];
  actions: PendingActionHandlers;
  loading?: boolean;
}

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.01 },
};

const ActivitiesPendingTable: React.FC<ActivitiesPendingTableProps> = ({
  attempts,
  actions,
  loading = false,
}) => {
  return (
    <Card className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>Actividad</th>
            <th className={styles.tableHeader}>Estudiante</th>
            <th className={styles.tableHeader}>Descripción</th>
            <th className={styles.tableHeader}>Fecha</th>
            <th className={styles.tableHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {attempts.map((attempt) => {
            const subjectColor = getSubjectColor(
              attempt.activityDto.subject.name
            );
            const ActivityIcon = getActivityIcon(attempt.activityDto.name);
            const activityColor = getActivityColor(attempt.activityDto.name);
            const studentFullName = `${attempt.studentName} ${attempt.studentLastName}`;
            const courseName = `${attempt.activityDto.subject.course.year.name} - ${attempt.activityDto.subject.course.name}`;

            return (
              <motion.tr
                key={attempt.activityCompletedId}
                variants={tableRowVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={styles.tableRow}
              >
                {/* Actividad */}
                <td className={styles.tableCell}>
                  <div className={styles.activityInfo}>
                    <div
                      className={styles.iconWrapper}
                      style={{ backgroundColor: activityColor }}
                    >
                      <ActivityIcon className={styles.activityIcon} />
                    </div>
                    <div className={styles.activityDetails}>
                      <span className={styles.activityName}>
                        {attempt.activityDto.name}
                      </span>
                      <div className={styles.badges}>
                        <Badge
                          variant="custom"
                          size="sm"
                          customColor={{ bg: "#f3f4f6", text: "#6b7280" }}
                        >
                          {courseName}
                        </Badge>
                        <Badge
                          variant="custom"
                          size="sm"
                          customColor={subjectColor}
                        >
                          {attempt.activityDto.subject.name}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Estudiante */}
                <td className={`${styles.tableCell} ${styles.centeredCell}`}>
                  <div className={styles.studentInfo}>
                    <FaUser className={styles.studentIcon} />
                    <span className={styles.studentName}>
                      {studentFullName}
                    </span>
                  </div>
                </td>

                {/* Descripción */}
                <td className={`${styles.tableCell} ${styles.centeredCell}`}>
                  <Tooltip
                    content={attempt.activityDto.description}
                    position="top"
                  >
                    <p className={styles.activityDescription}>
                      {attempt.activityDto.description}
                    </p>
                  </Tooltip>
                </td>

                {/* Fecha */}
                <td className={`${styles.tableCell} ${styles.centeredCell}`}>
                  <div className={styles.dateSection}>
                    <FaCalendarAlt className={styles.dateIcon} />
                    <span className={styles.dateValue}>
                      {formatAttemptDate(attempt.activityDto.startDate)}
                    </span>
                  </div>
                </td>

                {/* Acciones */}
                <td className={`${styles.tableCell} ${styles.centeredCell}`}>
                  <div className={styles.actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${styles.actionButton} ${styles.viewButton}`}
                      onClick={() => actions.onViewAttempt(attempt)}
                      disabled={loading}
                    >
                      <FaEye /> Ver intento
                    </Button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default ActivitiesPendingTable;
