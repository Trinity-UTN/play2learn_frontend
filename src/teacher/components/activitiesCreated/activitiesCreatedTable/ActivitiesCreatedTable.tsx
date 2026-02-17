import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaEye,
  FaRedo,
  // FaPencilAlt,
  // FaTrash,
} from "react-icons/fa";
import {
  Badge,
  Button,
  Card,
  Tooltip,
  getActivityColor,
  getActivityIcon,
  getSubjectColor,
} from "@/shared";
import type { ActivityTeacherResponse } from "../../../types/TeacherActivity.type";
import { ACTIVITY_TEACHER_STATUS } from "../../../constants/activity/activityTeacher.constants";
import {
  // getActivityStatusConfig,
  formatActivityDate,
  type ActivityActionHandlers,
} from "../../../utils/activity/activityTeacher.utils";
import styles from "./ActivitiesCreatedTable.module.css";

interface ActivitiesCreatedTableProps {
  activities: ActivityTeacherResponse[];
  actions: ActivityActionHandlers;
  loading?: boolean;
}

const tableRowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.01 },
};

const ActivitiesCreatedTable: React.FC<ActivitiesCreatedTableProps> = ({
  activities,
  actions,
  loading = false,
}) => {
  return (
    <Card className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th className={styles.tableHeader}>Nombre</th>
            <th className={styles.tableHeader}>Descripción</th>
            <th className={styles.tableHeader}>Fecha</th>
            <th className={styles.tableHeader}>Acciones</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {activities.map((activity) => {
            // const statusConfig = getActivityStatusConfig(activity.status);
            const subjectColor = getSubjectColor(activity.subjectName);
            const ActivityIcon = getActivityIcon(activity.name);
            const activityColor = getActivityColor(activity.name);

            return (
              <motion.tr
                key={activity.id}
                variants={tableRowVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className={styles.tableRow}
              >
                {/* Header con icono */}
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
                        {activity.name}
                      </span>
                      <div className={styles.badges}>
                        {/* <Badge
                          variant="custom"
                          size="sm"
                          customColor={statusConfig.color}
                        >
                          {statusConfig.label}
                        </Badge> */}
                        <Badge
                          variant="custom"
                          size="sm"
                          customColor={{ bg: "#f3f4f6", text: "#6b7280" }}
                        >
                          {activity.course}
                        </Badge>
                        <Badge
                          variant="custom"
                          size="sm"
                          customColor={subjectColor}
                        >
                          {activity.subjectName}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Descripción */}
                <td className={`${styles.tableCell} ${styles.centeredCell}`}>
                  <Tooltip content={activity.description} position="top">
                    <p className={styles.activityDescription}>
                      {activity.description}
                    </p>
                  </Tooltip>
                </td>

                {/* Fecha */}
                <td className={`${styles.tableCell} ${styles.centeredCell}`}>
                  <div
                    className={`${styles.dateSection} ${
                      styles[`dateSection${activity.status}`]
                    }`}
                  >
                    <FaCalendarAlt className={styles.dateIcon} />
                    <span className={styles.dateValue}>
                      {formatActivityDate(activity.date)}
                    </span>
                  </div>
                </td>

                {/* Acciones */}
                <td className={`${styles.tableCell} ${styles.centeredCell}`}>
                  <div className={styles.actions}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`${styles.actionButton} ${styles.detailsButton}`}
                      onClick={() =>
                        actions.onViewDetails(activity, activity.id)
                      }
                      disabled={loading}
                    >
                      <FaEye /> Ver
                    </Button>
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => actions.onEdit(activity.id, activity.name)}
                      disabled={loading}
                    >
                      <FaPencilAlt />
                    </Button> */}
                    {activity.status === ACTIVITY_TEACHER_STATUS.EXPIRED && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${styles.actionButton} ${styles.reexposeButton}`}
                        onClick={() =>
                          actions.onReexpose(activity.id, activity.name)
                        }
                        disabled={loading}
                      >
                        <FaRedo />
                      </Button>
                    )}
                    {/* {activity.status !== ACTIVITY_TEACHER_STATUS.EXPIRED && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`${styles.actionButton} ${styles.deleteButton}`}
                        onClick={() =>
                          actions.onDelete(activity.id, activity.name)
                        }
                        disabled={loading}
                      >
                        <FaTrash />
                      </Button>
                    )} */}
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

export default ActivitiesCreatedTable;
