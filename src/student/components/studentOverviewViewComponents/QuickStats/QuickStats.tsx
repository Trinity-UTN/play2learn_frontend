import { motion } from "framer-motion";
import type { StatisticsStudentResponse } from "../../../types/CurrentStudent.type";
import styles from "./QuickStats.module.css";
import { FaTrophy, FaGamepad, FaCoins } from "react-icons/fa";
import Card from "../../../../shared/components/Card/CardComponent";

type Props = {
  statistics: StatisticsStudentResponse;
};

const QuickStats = ({ statistics }: Props) => {
  // const pendingActivities = statistics
  //   ? statistics?.totalActivities - statistics?.totalCompletedActivities
  //   : 0;
  const quickStats = [
    {
      title: "Monedas Totales",
      value: statistics?.totalPoints,
      icon: FaCoins,
      color: "#F59E0B",
      // change: "+125 esta semana",
    },
    {
      title: "Ranking",
      value: `#${statistics?.positionRanking}`,
      icon: FaTrophy,
      color: "#8B5CF6",
      // change: "↑ Subiste 2 posiciones",
    },
    {
      title: "Actividades",
      value: `${statistics?.totalCompletedActivities} / ${statistics?.totalActivities}`,
      icon: FaGamepad,
      color: "#10B981",
      // change: `${pendingActivities} pendientes`,
    },
  ];

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    <motion.div variants={itemVariants} className={styles.statsGrid}>
      {quickStats.map((stat) => (
        <motion.div
          key={stat.title}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={styles.statCard}>
            <div className={styles.statContent}>
              <div
                className={styles.statIcon}
                style={{
                  backgroundColor: `${stat.color}20`,
                  color: stat.color,
                }}
              >
                <stat.icon />
              </div>
              <div className={styles.statInfo}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statTitle}>{stat.title}</p>
                {/* <span className={styles.statChange}>{stat.change}</span> */}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default QuickStats;
