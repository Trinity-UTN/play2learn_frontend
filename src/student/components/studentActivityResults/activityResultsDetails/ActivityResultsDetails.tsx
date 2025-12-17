import { motion } from "framer-motion";
import {
  FaFile,
  FaColumns,
  FaList,
  FaBook,
  FaSignal,
  FaClock,
} from "react-icons/fa";
import type { CurrentActivityInterface } from "../../../types/Activity.type";
import { Button, Card } from "@/shared";
import { useViewToggle } from "../../../hooks/useViewToggle";
import styles from "./ActivityResultsDetails.module.css";

interface ActivityResultsDetailsProps {
  activity: CurrentActivityInterface;
}

const ActivityResultsDetails: React.FC<ActivityResultsDetailsProps> = ({
  activity,
}) => {
  const { isHorizontal, toggleView, viewMode } = useViewToggle(true);

  const detailItems = [
    {
      id: "subject",
      icon: FaBook,
      label: "Materia",
      value: activity.subject.name,
    },
    {
      id: "difficulty",
      icon: FaSignal,
      label: "Dificultad",
      value: activity.difficulty,
    },
    {
      id: "maxTime",
      icon: FaClock,
      label: "Tiempo máximo",
      value: `${activity.maxTime} minutos`,
    },
  ];

  const renderDetailItem = (item: any) => {
    const IconComponent = item.icon;
    return (
      <div key={item.id} className={styles.detailItem}>
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

        {activity.description && (
          <div className={styles.descriptionSection}>
            <div className={styles.detailItem}>
              <div className={styles.detailContent}>
                <FaFile className={styles.descriptionIcon} />
                <div>
                  <span className={styles.label}>
                    Descripción de la actividad
                  </span>
                  <span className={styles.value}>{activity.description}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={`${styles.detailsGrid} ${styles[viewMode]}`}>
          {detailItems.map((item) => renderDetailItem(item))}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityResultsDetails;
