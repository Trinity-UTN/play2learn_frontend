import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaTrophy,
  FaPercentage,
  FaClock,
  FaCheckDouble,
} from "react-icons/fa";

import styles from "./ActivityMetrics.module.css";
import type { ActivityDetailMetrics } from "../../../types/CreatedActivities";

interface ActivityMetricsProps {
  metrics: ActivityDetailMetrics;
}

const ActivityMetrics = ({ metrics }: ActivityMetricsProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const metricsData = [
    {
      icon: FaUserCheck,
      label: "Estudiantes que realizaron",
      value: metrics.studentsCompleted,
      color: "#3b82f6",
    },
    {
      icon: FaTrophy,
      label: "Estudiantes aprobados",
      value: metrics.studentsApproved,
      color: "#10b981",
    },
    {
      icon: FaPercentage,
      label: "Participación",
      value: `${metrics.participationPercentage.toFixed(1)}%`,
      color: "#8b5cf6",
      progress: metrics.participationPercentage,
    },
    {
      icon: FaClock,
      label: "Tiempo promedio",
      value: formatTime(metrics.averageTime),
      color: "#f59e0b",
    },
    {
      icon: FaCheckDouble,
      label: "Porcentaje de éxito",
      value: `${metrics.successPercentage.toFixed(1)}%`,
      color: "#10b981",
      progress: metrics.successPercentage,
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Métricas de la Actividad</h2>
      <div className={styles.metricsGrid}>
        {metricsData.map((metric, index) => (
          <motion.div
            key={index}
            className={styles.metricCard}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className={styles.metricHeader}>
              <div
                className={styles.iconWrapper}
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <metric.icon
                  className={styles.icon}
                  style={{ color: metric.color }}
                />
              </div>
              <span className={styles.value}>{metric.value}</span>
            </div>
            <span className={styles.label}>{metric.label}</span>
            {metric.progress !== undefined && (
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  style={{ backgroundColor: metric.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivityMetrics;
