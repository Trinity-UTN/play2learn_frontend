import { motion } from "framer-motion";
import { FaFile, FaColumns, FaList } from "react-icons/fa";
import type {
  CurrentActivityInterface,
  ActivityUI,
} from "../../../types/Activity.type";
import { Button, Card } from "@/shared";
import { useViewToggle } from "../../../hooks/useViewToggle";
import { useActivityDetails } from "../../../hooks/activities/activityDetails/useActivityDetails";
import styles from "./ActivityDetails.module.css";

interface ActivityDetailsProps {
  currentActivity: CurrentActivityInterface | null;
  activity?: ActivityUI;
}

const ActivityDetails: React.FC<ActivityDetailsProps> = ({
  currentActivity,
  activity,
}) => {
  const { isHorizontal, toggleView, viewMode } = useViewToggle(true);
  const {
    displayData,
    mainActivityItems,
    gameConfigDetails,
    exerciseDetail,
    hasDescription,
    description,
  } = useActivityDetails({ currentActivity, activity });

  if (!displayData) {
    return (
      <div className={styles.skeleton}>
        <div className={styles.skeletonCard}></div>
      </div>
    );
  }

  const renderDetailItem = (item: any, key: string) => {
    const IconComponent = item.icon;
    return (
      <div key={key} className={styles.detailItem}>
        <div className={styles.detailContent}>
          <IconComponent className={styles.detailIcon} />
          <div>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>{item.value}</span>
          </div>
        </div>
      </div>
    );
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
            onClick={toggleView}
            className={styles.viewToggle}
          >
            {isHorizontal ? <FaList /> : <FaColumns />}
          </Button>
        </div>

        {hasDescription && description && (
          <div className={styles.descriptionSection}>
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <FaFile className={styles.descriptionIcon} />
                <div>
                  <span className={styles.label}>
                    Descripción de la actividad
                  </span>
                  <span className={styles.value}>{description}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {exerciseDetail && (
          <div className={styles.descriptionSection}>
            {renderDetailItem(exerciseDetail, "exercise-detail")}
          </div>
        )}

        <div className={`${styles.detailsGrid} ${styles[viewMode]}`}>
          {mainActivityItems.map((item) => renderDetailItem(item, item.id))}
        </div>
        <div className={`${styles.detailsGrid} ${styles[viewMode]}`}>
          {gameConfigDetails.map((detail, index) =>
            renderDetailItem(detail, `game-config-${index}`),
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityDetails;
