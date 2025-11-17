import {
  FaUserCheck,
  FaTrophy,
  FaPercentage,
  FaClock,
  FaCheckDouble,
} from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import ActivityDetailsStatsCard from "../activityDetailsStatsCard/ActivityDetailsStatsCard";
import type { ActivityTeacherDetailsResponse } from "../../../types/TeacherActivity.type";
import { formatCompletionTime } from "../../../utils/activity/activityDetailsTeacher.utils";
import styles from "./ActivityDetailsMetrics.module.css";

interface ActivityDetailsMetricsProps {
  activity: ActivityTeacherDetailsResponse;
}

const ActivityDetailsMetrics = ({ activity }: ActivityDetailsMetricsProps) => {
  const metricsData = [
    {
      icon: FaUserCheck,
      label: "Estudiantes que la realizaron",
      value: activity.studentsAttemptedCount,
      color: "#3b82f6",
      tooltip: "Estudiantes que hicieron al menos un intento",
    },
    {
      icon: FaTrophy,
      label: "Estudiantes aprobados",
      value: activity.studentsApprovedCount,
      color: "#10b981",
      tooltip: "Estudiantes que aprobaron",
    },
    {
      icon: FaClock,
      label: "Tiempo promedio de realización",
      value: formatCompletionTime(activity.averageCompletionTime),
      color: "#f59e0b",
      tooltip: "Tiempo promedio de completado",
    },
    {
      icon: FaPercentage,
      label: "Participación",
      value: `${activity.participationPercentage.toFixed(1)}%`,
      color: "#8b5cf6",
      progress: activity.participationPercentage,
      tooltip: "Participación sobre total de estudiantes",
    },
    {
      icon: FaCheckDouble,
      label: "Porcentaje de éxito",
      value: `${activity.successPercentage.toFixed(1)}%`,
      color: "#10b981",
      progress: activity.successPercentage,
      tooltip: "Aprobados vs. intentos",
    },
  ];

  return (
    <Card className={styles.container}>
      <h2 className={styles.title}>Métricas de Rendimiento</h2>
      <div className={styles.grid}>
        {metricsData.map((metric, index) => (
          <ActivityDetailsStatsCard
            key={index}
            index={index}
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            color={metric.color}
            tooltip={metric.tooltip}
            progress={metric.progress}
          />
        ))}
      </div>
    </Card>
  );
};

export default ActivityDetailsMetrics;
