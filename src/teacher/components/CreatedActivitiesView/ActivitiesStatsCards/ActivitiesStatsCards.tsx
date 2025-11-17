import { motion } from "framer-motion";
import {
  FaClipboardCheck,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import styles from "./ActivitiesStatsCards.module.css";
import type {
  PendingReviewActivity,
  TeacherActivity,
} from "../../../types/CreatedActivities";

interface ActivitiesStatsCardsProps {
  activities: TeacherActivity[];
  pendingReviews: PendingReviewActivity[];
}

const ActivitiesStatsCards = ({
  activities,
  pendingReviews,
}: ActivitiesStatsCardsProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const totalActivities = activities.length;
  const publishedActivities = activities.filter(
    (a) => a.status === "PUBLISHED"
  ).length;
  const expiredActivities = activities.filter(
    (a) => a.status === "EXPIRED"
  ).length;
  const pendingReviewsCount = pendingReviews.length;

  const stats = [
    {
      icon: FaClipboardCheck,
      label: "Total de Actividades",
      value: totalActivities,
      color: "#007bff",
      bgColor: "#e7f3ff",
    },
    {
      icon: FaCheckCircle,
      label: "Publicadas",
      value: publishedActivities,
      color: "#10b981",
      bgColor: "#d1fae5",
    },
    {
      icon: FaClock,
      label: "Vencidas",
      value: expiredActivities,
      color: "#6b7280",
      bgColor: "#f3f4f6",
    },
    {
      icon: FaExclamationCircle,
      label: "Pendientes de Revisión",
      value: pendingReviewsCount,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
  ];

  return (
    <motion.div variants={itemVariants} className={styles.statsContainer}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={itemVariants}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className={styles.statCard}
          style={{ backgroundColor: stat.bgColor }}
        >
          <div className={styles.statIcon} style={{ color: stat.color }}>
            <stat.icon />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ActivitiesStatsCards;
