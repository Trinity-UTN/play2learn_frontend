"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  FaClock,
  FaCheck,
  FaExclamationTriangle,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";
import type { ConfigurationActivity } from "../../../types/Activity.type";
import styles from "./ActivityStats.module.css";

interface ActivityStatsProps {
  activities: ConfigurationActivity[];
}

const ActivityStats: React.FC<ActivityStatsProps> = ({ activities }) => {
  const pendingCount = activities.filter((a) => a.status === "pending").length;
  const completedCount = activities.filter(
    (a) => a.status === "completed"
  ).length;
  const overdueCount = activities.filter((a) => a.status === "overdue").length;
  const availableCount = activities.filter(
    (a) => a.status === "available"
  ).length;
  const totalPoints = activities
    .filter((a) => a.status === "completed")
    .reduce((sum, a) => sum + a.points, 0);

  const stats = [
    {
      label: "Pendientes",
      value: pendingCount,
      icon: FaClock,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
    {
      label: "Completadas",
      value: completedCount,
      icon: FaCheck,
      color: "#10B981",
      bgColor: "#D1FAE5",
    },
    {
      label: "Vencidas",
      value: overdueCount,
      icon: FaExclamationTriangle,
      color: "#EF4444",
      bgColor: "#FEE2E2",
    },
    {
      label: "Disponibles",
      value: availableCount,
      icon: FaStar,
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
    },
    {
      label: "Puntos Ganados",
      value: totalPoints,
      icon: FaTrophy,
      color: "#F59E0B",
      bgColor: "#FEF3C7",
    },
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.statsContainer}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.05,
              y: -5,
            }}
          >
            <Card className={styles.statCard}>
              <div
                className={styles.statIcon}
                style={{
                  backgroundColor: stat.bgColor,
                  color: stat.color,
                }}
              >
                <stat.icon />
              </div>

              <div className={styles.statContent}>
                <motion.div
                  className={styles.statValue}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>

              <motion.div
                className={styles.statGlow}
                style={{ backgroundColor: stat.color }}
                animate={{
                  opacity: [0, 0.1, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: index * 0.2,
                }}
              />
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityStats;
