import { FaClock, FaCoins, FaRedo } from "react-icons/fa";
import { Card } from "@/shared";
import ActivityDetailsStatsCard from "../activityDetailsStatsCard/ActivityDetailsStatsCard";
import type { ActivityTeacherDetailsResponse } from "../../../types/TeacherActivity.type";
import styles from "./ActivityDetailsConfig.module.css";

interface ActivityDetailsConfigProps {
  activity: ActivityTeacherDetailsResponse;
}

const ActivityDetailsConfig = ({ activity }: ActivityDetailsConfigProps) => {
  const configData = [
    {
      icon: FaClock,
      label: "Tiempo máximo permitido",
      value: `${activity.maxTime} min`,
      color: "#06b6d4",
      tooltip: "Tiempo máximo para completar la actividad",
    },
    {
      icon: FaCoins,
      label: "Recompensa por estudiante",
      value: activity.reward > 0 ? `${activity.reward.toFixed(2)}` : "-",
      color: "#f97316",
      tooltip: "Recompensa al aprobar la actividad",
    },
    {
      icon: FaRedo,
      label: "Intentos permitidos",
      value: activity.attempts > 0 ? activity.attempts : "Ilimitados",
      color: "#6366f1",
      tooltip: "Número de intentos permitidos por estudiante",
    },
  ];

  return (
    <Card className={styles.container}>
      <h2 className={styles.title}>Configuración de la Actividad</h2>
      <div className={styles.grid}>
        {configData.map((item, index) => (
          <ActivityDetailsStatsCard
            key={index}
            index={index}
            icon={item.icon}
            label={item.label}
            value={item.value}
            color={item.color}
            tooltip={item.tooltip}
          />
        ))}
      </div>
    </Card>
  );
};

export default ActivityDetailsConfig;
