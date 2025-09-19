import { useState } from "react";
import { motion } from "framer-motion";
import { FaColumns, FaList } from "react-icons/fa";
import type {
  CurrentActivityInterface,
  ActivityUI,
} from "../../../types/Activity.type";
import Button from "../../../../shared/components/Button/ButtonComponent";
import Card from "../../../../shared/components/Card/CardComponent";
import { useGameConfigRenderer } from "../../../../shared/hooks/games/useGameConfigRenderer";
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

  // Hook personalizado para renderizar la configuración del juego
  const gameConfigDetails = useGameConfigRenderer(
    currentActivity?.name,
    currentActivity?.gameConfig
  );

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

  // EXPO: Stategy: Renderizar configuración del juego
  const renderGameConfigDetails = () => {
    return gameConfigDetails.map((detail, index) => {
      const IconComponent = detail.icon;
      return (
        <div key={`game-config-${index}`} className={styles.detailItem}>
          <div className={styles.detailContent}>
            <IconComponent className={styles.detailIcon} />
            <div>
              <span className={styles.label}>{detail.label}</span>
              <span className={styles.value}>{detail.value}</span>
            </div>
          </div>
        </div>
      );
    });
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
            {isHorizontal ? <FaList /> : <FaColumns />}
          </Button>
        </div>

        {currentActivity?.description && (
          <div className={styles.descriptionSection}>
            <h4 className={styles.descriptionTitle}>
              Descripción de la actividad:
            </h4>
            <p className={styles.description}>{currentActivity.description}</p>
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

          {/* EXPO: Renderizar configuración del juego */}
          {renderGameConfigDetails()}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityDetails;
