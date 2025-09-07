import { useState } from "react";
import { motion } from "framer-motion";
import type {
  CurrentActivityInterface,
  ActivityUI,
} from "../../../types/Activity.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import styles from "./ActivityDetails.module.css";

interface ActivityDetailsProps {
  currentActivity: CurrentActivityInterface | null;
  activity?: ActivityUI;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  currentActivity,
  activity,
}) => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const displayData = currentActivity || activity;

  if (!displayData) {
    return (
      <div className={styles.skeleton}>
        <div className={styles.skeletonCard}></div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0
      ? `${hours}h ${remainingMinutes}m`
      : `${hours} hora${hours > 1 ? "s" : ""}`;
  };

  const handleViewToggle = () => {
    setIsHorizontal(!isHorizontal);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <Card className={styles.detailsCard}>
        <div className={styles.header}>
          <h3 className={styles.sectionTitle}>Información de la Actividad</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewToggle}
            className={styles.viewToggle}
          >
            {isHorizontal ? "🔄 Vista vertical" : "🔄 Vista horizontal"}
          </Button>
        </div>

        {currentActivity?.description && (
          <div className={styles.descriptionSection}>
            <h4 className={styles.descriptionTitle}>
              Descripción de la actividad:
            </h4>
            <p className={styles.description}>
              {currentActivity.description}
              {/* <small className={styles.descriptionNote}>
                (Esta descripción cambiará dependiendo del tipo de actividad:{" "}
                {currentActivity.name})
              </small> */}
            </p>
          </div>
        )}

        <div
          className={`${styles.detailsGrid} ${
            isHorizontal ? styles.horizontal : styles.vertical
          }`}
        >
          {currentActivity?.startDate && (
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <span className={styles.detailIcon}>📅</span>
                <div>
                  <span className={styles.label}>Fecha de inicio</span>
                  <span className={styles.value}>
                    {formatDate(currentActivity.startDate)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentActivity?.endDate && (
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <span className={styles.detailIcon}>⏰</span>
                <div>
                  <span className={styles.label}>Fecha de fin</span>
                  <span className={styles.value}>
                    {formatDate(currentActivity.endDate)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentActivity?.maxTime && (
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <span className={styles.detailIcon}>⏱️</span>
                <div>
                  <span className={styles.label}>Tiempo máximo</span>
                  <span className={styles.value}>
                    {formatTime(currentActivity.maxTime)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentActivity?.errorsPermited !== undefined && (
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <span className={styles.detailIcon}>❌</span>
                <div>
                  <span className={styles.label}>Errores permitidos</span>
                  <span className={styles.value}>
                    {currentActivity.errorsPermited}
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* TODO: Escalar, por ahora solo ahorcado */}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityDetails;
