import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBook,
  FaCalendarAlt,
  FaStopCircle,
  FaPencilAlt,
  FaRedo,
  FaTrash,
} from "react-icons/fa";
import {
  Badge,
  Card,
  Button,
  Tooltip,
  getSubjectColor,
  getActivityColor,
  getActivityIcon,
} from "@/shared";
import type { ActivityTeacherDetailsResponse } from "../../../types/TeacherActivity.type";
import type {
  ActivityDifficultyLevel,
  RewardType,
} from "../../../constants/activity/activityDetailsTeacher.constants";
import {
  getStatusConfig,
  getDifficultyConfig,
  getRewardTypeConfig,
} from "../../../utils/activity/activityDetailsTeacher.utils";
import styles from "./ActivityDetailsHeader.module.css";

interface ActivityDetailsHeaderProps {
  activity: ActivityTeacherDetailsResponse;
  onBack: () => void;
  onFinish: (activityId: number, activityName: string) => void;
  onEdit: (activityId: number, activityName: string) => void;
  onReexpose: (activityId: number, activityName: string) => void;
  onDelete: (activityId: number, activityName: string) => void;
}

const ActivityDetailsHeader = ({
  activity,
  onBack,
  onFinish,
  onEdit,
  onReexpose,
  onDelete,
}: ActivityDetailsHeaderProps) => {
  const difficultyConfig = getDifficultyConfig(
    activity.difficulty as ActivityDifficultyLevel
  );
  const rewardConfig = getRewardTypeConfig(activity.typeReward as RewardType);
  const statusConfig = getStatusConfig(activity.status);
  const subjectColor = getSubjectColor(activity.subjectName);

  const ActivityIcon = getActivityIcon(activity.name);
  const activityColor = getActivityColor(activity.name);

  const formatDateRange = () => {
    const start = new Date(activity.startDate).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });
    const end = new Date(activity.endDate).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });
    return `${start} - ${end}`;
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top Bar: Botones de acción */}
      <div className={styles.topBar}>
        <motion.button
          className={styles.backButton}
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaArrowLeft />
          Volver
        </motion.button>

        <div className={styles.actionsGroup}>
          {activity.status === "PUBLISHED" && (
            <Tooltip content="Finalizar actividad" position="top">
              <Button
                variant="danger"
                size="sm"
                onClick={() => onFinish(activity.id, activity.name)}
                className={styles.actionButton}
              >
                <FaStopCircle />
              </Button>
            </Tooltip>
          )}

          {activity.status !== "PUBLISHED" && (
            <Tooltip content="Editar actividad" position="top">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(activity.id, activity.name)}
                className={styles.actionButton}
              >
                <FaPencilAlt />
              </Button>
            </Tooltip>
          )}

          {activity.status === "EXPIRED" && (
            <Tooltip content="Reexponer actividad" position="top">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReexpose(activity.id, activity.name)}
                className={styles.actionButton}
              >
                <FaRedo />
              </Button>
            </Tooltip>
          )}

          {activity.status !== "PUBLISHED" && (
            <Tooltip content="Eliminar actividad" position="top">
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(activity.id, activity.name)}
                className={styles.actionButton}
              >
                <FaTrash />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Header Card */}
      <Card className={styles.headerCard}>
        <div className={styles.infoHeader}>
          {/* Icono de actividad */}
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: activityColor }}
          >
            <ActivityIcon className={styles.activityIcon} />
          </div>

          {/* Contenido */}
          <div className={styles.infoContent}>
            <div className={styles.titleWithStatus}>
              <h1 className={styles.activityName}>{activity.name}</h1>
              <Badge
                variant="custom"
                size="sm"
                customColor={{
                  bg: statusConfig.color,
                  text: "#f3f4f6",
                }}
                className={styles.statusBadge}
              >
                {statusConfig.label}
              </Badge>
            </div>

            {/* Badges de curso y materia */}
            <div className={styles.badges}>
              <Badge
                variant="custom"
                size="sm"
                customColor={{ bg: "#f3f4f6", text: "#6b7280" }}
              >
                <FaBook className={styles.badgeIcon} />
                {activity.courseName}
              </Badge>
              <Badge variant="custom" size="sm" customColor={subjectColor}>
                {activity.subjectName}
              </Badge>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <p className={styles.description}>{activity.description}</p>

        {/* Otra información de la actividad */}
        <div className={styles.infoRow}>
          <Badge
            variant="custom"
            size="sm"
            customColor={{
              bg: "rgba(255, 255, 255, 0.2)",
              text: "white",
            }}
            className={styles.dateBadge}
          >
            <FaCalendarAlt className={styles.badgeIcon} />
            {formatDateRange()}
          </Badge>

          <Badge
            variant="custom"
            size="sm"
            customColor={{
              bg: difficultyConfig.bgColor,
              text: difficultyConfig.color,
            }}
          >
            {difficultyConfig.label}
          </Badge>

          <Badge
            variant="custom"
            size="sm"
            customColor={{
              bg: rewardConfig.bgColor,
              text: rewardConfig.color,
            }}
          >
            {rewardConfig.label}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityDetailsHeader;
