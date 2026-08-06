import React from "react";
import { motion } from "framer-motion";
import { Card, getActivityIcon } from "@/shared";
import type { StatisticsResponse } from "../../../types/Statistics.type";
import { FaGamepad } from "react-icons/fa";
import styles from "./RecentActivities.module.css";

type Props = {
  statistics: StatisticsResponse;
};

const RecentActivities = ({ statistics }: Props) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div variants={itemVariants}>
      <Card className={styles.contentCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>
            <FaGamepad className={styles.cardIcon} />
            Actividades Recientes
          </h3>
        </div>
        <div className={styles.activitiesList}>
          {statistics?.activitiesStatistics.map((activity, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={styles.activityItem}
            >
              <div
                className={styles.activityIcon}
                style={{ backgroundColor: "var(--color-stat-2)" }}
              >
                {React.createElement(getActivityIcon(activity.name))}
              </div>
              <div className={styles.activityContent}>
                <div className={styles.activityHeader}>
                  <h4 className={styles.activityName}>{activity.name}</h4>
                </div>
                <div className={styles.activityProgress}>
                  <div className={styles.activityProgressBar}>
                    <div
                      className={styles.activityProgressFill}
                      style={{
                        width: `${activity.totalStudents > 0
                          ? (activity.totalRealizations / activity.totalStudents) * 100
                          : 0
                          }%`,
                        backgroundColor: "#10b981",
                      }}
                    />
                  </div>
                  <span className={styles.activityProgressText}>
                    {activity.totalRealizations} / {activity.totalStudents}{" "}
                    completaron
                  </span>
                </div>
                <span className={styles.activityProgressText}>
                  Creada hace {activity.createdDaysAgo} días - Inicia el{" "}
                  {new Date(activity.startDate).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default RecentActivities;
