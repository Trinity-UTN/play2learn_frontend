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
import styles from "./ActivitiesCreatedCard.module.css";

interface ActivityCreatedCardProps {
  activity: ActivityTeacherResponse;
  actions: ActivityActionHandlers;
  loading?: boolean;
}

const ActivitiesCreatedCard: React.FC<ActivityCreatedCardProps> = ({
  activity,
  actions,
  loading = false,
}) => {
  // const statusConfig = getActivityStatusConfig(activity.status);
  const ActivityIcon = getActivityIcon(activity.name);
  const activityColor = getActivityColor(activity.name);
  const subjectColor = getSubjectColor(activity.subjectName);

  return (
    <Card className={styles.activityCard}>
      <div className={styles.contentContainer}>
        {/* Header con icono */}
        <div className={styles.activityHeader}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: activityColor }}
          >
            <ActivityIcon className={styles.activityIcon} />
          </div>
          <div className={styles.activityInfo}>
            <h3 className={styles.activityName}>{activity.name}</h3>
            <div className={styles.activityMeta}>
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
              <Badge variant="custom" size="sm" customColor={subjectColor}>
                {activity.subjectName}
              </Badge>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className={styles.activityDescription}>{activity.description}</p>

        {/* Fecha */}
        <div
          className={`${styles.dateSection} ${
            styles[`dateSection${activity.status}`]
          }`}
        >
          <FaCalendarAlt className={styles.dateIcon} />
          <span className={styles.dateLabel}>
            {activity.status === ACTIVITY_TEACHER_STATUS.CREATED &&
              "Fecha de inicio: "}
            {activity.status === ACTIVITY_TEACHER_STATUS.PUBLISHED &&
              "Fecha de fin: "}
            {activity.status === ACTIVITY_TEACHER_STATUS.EXPIRED &&
              "Fecha de expiración: "}
          </span>
          <span className={styles.dateValue}>
            {formatActivityDate(activity.date)}
          </span>
        </div>
      </div>

      {/* Acciones */}
      <div className={styles.cardActions}>
        <Button
          variant="secondary"
          size="sm"
          className={styles.detailsButton}
          onClick={() => actions.onViewDetails(activity, activity.id)}
          disabled={loading}
        >
          <FaEye className={styles.actionIconDetails} />
          <span className={styles.buttonTextDetails}>Ver detalles</span>
        </Button>
        {/* <Button
          variant="ghost"
          size="sm"
          className={styles.editButton}
          onClick={() => actions.onEdit(activity.id, activity.name)}
          disabled={loading}
        >
          <FaPencilAlt className={styles.actionIcon} />
          <span className={styles.buttonText}>Editar</span>
        </Button> */}
        {activity.status === ACTIVITY_TEACHER_STATUS.EXPIRED && (
          <Button
            variant="ghost"
            size="sm"
            className={styles.reexposeButton}
            onClick={() => actions.onReexpose(activity.id, activity.name)}
            disabled={loading}
          >
            <FaRedo className={styles.actionIcon} />
            <span className={styles.buttonText}>Re-exponer</span>
          </Button>
        )}
        {/* {activity.status !== ACTIVITY_TEACHER_STATUS.EXPIRED && (
          <Button
            variant="ghost"
            size="sm"
            className={styles.deleteButton}
            onClick={() => actions.onDelete(activity.id, activity.name)}
            disabled={loading}
          >
            <FaTrash className={styles.actionIcon} />
            <span className={styles.buttonText}>Eliminar</span>
          </Button>
        )} */}
      </div>
    </Card>
  );
};

export default ActivitiesCreatedCard;
