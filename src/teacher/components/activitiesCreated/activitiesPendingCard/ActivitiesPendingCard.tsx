import { FaCalendarAlt, FaEye, FaUser } from "react-icons/fa";
import {
  Badge,
  Button,
  Card,
  getActivityColor,
  getActivityIcon,
  getSubjectColor,
} from "@/shared";
import type { ActivityCompletedPendingDto } from "../../../types/NoLudicaReview.type";
import { formatAttemptDate } from "../../../utils/activity/noLudicaReview.utils";
import styles from "./ActivitiesPendingCard.module.css";

interface PendingActionHandlers {
  onViewAttempt: (attempt: ActivityCompletedPendingDto) => void;
}

interface ActivitiesPendingCardProps {
  attempt: ActivityCompletedPendingDto;
  actions: PendingActionHandlers;
  loading?: boolean;
}

const ActivitiesPendingCard: React.FC<ActivitiesPendingCardProps> = ({
  attempt,
  actions,
  loading = false,
}) => {
  const ActivityIcon = getActivityIcon(attempt.activityDto.name);
  const activityColor = getActivityColor(attempt.activityDto.name);
  const subjectColor = getSubjectColor(attempt.activityDto.subject.name);
  const studentFullName = `${attempt.studentName} ${attempt.studentLastName}`;
  const courseName = `${attempt.activityDto.subject.course.year.name} - ${attempt.activityDto.subject.course.name}`;

  return (
    <Card className={styles.attemptCard}>
      <div className={styles.contentContainer}>
        {/* Header con icono */}
        <div className={styles.attemptHeader}>
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: activityColor }}
          >
            <ActivityIcon className={styles.activityIcon} />
          </div>
          <div className={styles.attemptInfo}>
            <h3 className={styles.activityName}>{attempt.activityDto.name}</h3>
            <div className={styles.attemptMeta}>
              <Badge
                variant="custom"
                size="sm"
                customColor={{ bg: "#fef3c7", text: "#92400e" }}
              >
                {courseName}
              </Badge>
              <Badge variant="custom" size="sm" customColor={subjectColor}>
                {attempt.activityDto.subject.name}
              </Badge>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className={styles.activityDescription}>
          {attempt.activityDto.description}
        </p>

        {/* Estudiante */}
        <div className={styles.studentSection}>
          <FaUser className={styles.studentIcon} />
          <span className={styles.studentLabel}>Estudiante:</span>
          <span className={styles.studentValue}>{studentFullName}</span>
        </div>

        {/* Fecha */}

        <div className={styles.dateSection}>
          <div>
            <FaCalendarAlt className={styles.dateIcon} />{" "}
            <span className={styles.dateLabel}>Fecha de realizacion:</span>
          </div>
          <span className={styles.dateValue}>
            {formatAttemptDate(attempt.completedAt)}
          </span>
        </div>
      </div>

      {/* Acciones */}
      <div className={styles.cardActions}>
        <Button
          variant="secondary"
          size="sm"
          className={styles.viewButton}
          onClick={() => actions.onViewAttempt(attempt)}
          disabled={loading}
        >
          <FaEye className={styles.actionIcon} />
          <span className={styles.buttonText}>Ver intento</span>
        </Button>
      </div>
    </Card>
  );
};

export default ActivitiesPendingCard;
