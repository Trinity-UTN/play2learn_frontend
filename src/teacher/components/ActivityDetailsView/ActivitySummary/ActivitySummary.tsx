import { motion } from "framer-motion";
import { FaUsers, FaCheckCircle, FaClock, FaChartLine } from "react-icons/fa";

import styles from "./ActivitySummary.module.css";
import type { ActivityDetail } from "../../../types/CreatedActivities";

interface ActivitySummaryProps {
  activity: ActivityDetail;
}

const ActivitySummary = ({ activity }: ActivitySummaryProps) => {
  const summaryCards = [
    {
      icon: FaUsers,
      label: "Total Estudiantes",
      value: activity.totalStudents,
      color: "#3b82f6",
    },
    {
      icon: FaCheckCircle,
      label: "Realizaron",
      value: activity.completedStudents,
      color: "#10b981",
    },
    {
      icon: FaChartLine,
      label: "Promedio",
      value: `${activity.averageScore}%`,
      color: "#8b5cf6",
    },
    {
      icon: FaClock,
      label: "Intentos Max",
      value: activity.maxAttempts,
      color: "#f59e0b",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resumen de Actividad</h2>
      <div className={styles.cardsGrid}>
        {summaryCards.map((card, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div
              className={styles.iconWrapper}
              style={{ backgroundColor: `${card.color}20` }}
            >
              <card.icon
                className={styles.icon}
                style={{ color: card.color }}
              />
            </div>
            <div className={styles.content}>
              <span className={styles.label}>{card.label}</span>
              <span className={styles.value}>{card.value}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ActivitySummary;
