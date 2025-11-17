import { motion } from "framer-motion";
import { FaColumns, FaList, FaTrophy } from "react-icons/fa";
import {
  FcStatistics,
  FcApproval,
  FcComments,
  FcCalendar,
} from "react-icons/fc";
import type {
  CurrentActivityInterface,
  ActivityUI,
} from "../../../types/Activity.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import Badge from "../../../../shared/components/Badge/BadgeComponent";
import { useViewToggle } from "../../../hooks/useViewToggle";
import styles from "./ActivityStatus.module.css";

interface ActivityStatusProps {
  currentActivity: CurrentActivityInterface | null;
  activity?: ActivityUI;
}

const ActivityStatus: React.FC<ActivityStatusProps> = ({
  currentActivity,
  activity,
}) => {
  const { isHorizontal, toggleView, viewMode } = useViewToggle(false);
  const displayData = currentActivity || activity;

  if (!displayData) {
    return (
      <div className={styles.skeleton}>
        <div className={styles.skeletonCard}></div>
      </div>
    );
  }

  const getStatusInfo = () => {
    if (activity?.status) {
      switch (activity.status) {
        case "PUBLISHED":
          return {
            variant: "success" as const,
            text: "Disponible",
            description: "Esta actividad está lista para ser realizada",
          };
        case "APPROVED":
          return {
            variant: "primary" as const,
            text: "Completada",
            description: "Has completado esta actividad exitosamente",
          };
        case "EXPIRED":
          return {
            variant: "warning" as const,
            text: "Expirada",
            description: "El período de esta actividad ha terminado",
          };
        case "CREATED":
          return {
            variant: "secondary" as const,
            text: "En preparación",
            description: "Esta actividad aún no está disponible",
          };
        default:
          return {
            variant: "secondary" as const,
            text: "Estado desconocido",
            description: "No se pudo determinar el estado de la actividad",
          };
      }
    }

    // TODO: Agregar activityStatus a currentActivity
    return {
      variant: "success" as const,
      text: "Disponible",
      description: "Esta actividad está lista para ser realizada",
    };
  };

  const statusInfo = getStatusInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <Card className={styles.detailsCard}>
        <div className={styles.header}>
          <h3 className={styles.sectionTitle}>Estado de la Actividad</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleView}
            className={styles.viewToggle}
          >
            {isHorizontal ? <FaList /> : <FaColumns />}
          </Button>
        </div>

        <div className={`${styles.detailsGrid} ${styles[viewMode]}`}>
          <div className={styles.detailItem}>
            <div className={styles.detailContent}>
              <FcStatistics className={styles.detailIcon} />
              <div>
                <span className={styles.label}>Estado</span>
                <div className={styles.statusBadge}>
                  <Badge variant={statusInfo.variant}>{statusInfo.text}</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailContent}>
              <FcApproval className={styles.detailIcon} />
              <div>
                <span className={styles.label}>Intentos</span>
                <span className={`${styles.value} ${styles.attemptsValue}`}>
                  {activity?.noAttempts
                    ? "Sin intentos"
                    : currentActivity?.attempts
                    ? `${currentActivity.attempts} disponible/s`
                    : activity?.attemptsLabel || "Disponibles"}
                </span>
              </div>
            </div>
          </div>

          {activity?.dueDateLabel && (
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <FcCalendar className={styles.detailIcon} />
                <div>
                  <span className={styles.label}>Fecha límite</span>
                  <span className={styles.value}>{activity.dueDateLabel}</span>
                </div>
              </div>
            </div>
          )}

          {activity?.rewardLabel && (
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <FaTrophy className={styles.detailIcon} />
                <div>
                  <span className={styles.label}>Recompensa</span>
                  <span className={styles.value}>{activity.rewardLabel}</span>
                </div>
              </div>
            </div>
          )}

          <div className={styles.detailItem}>
            <div className={styles.detailContent}>
              <FcComments className={styles.detailIcon} />
              <div>
                <span className={styles.label}>Comentarios del docente</span>
                <span className={`${styles.value} ${styles.teacherComments}`}>
                  El docente no ha realizado comentarios aún
                </span>
              </div>
            </div>
          </div>
          {/* TODO: Comentario docente */}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityStatus;
