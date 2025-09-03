import { motion } from "framer-motion";

import Card from "../../../../shared/components/Card/CardComponent";
import styles from "./ActivityStats.module.css";
import { useActivityStudentUI } from "../../../hooks/useActivityStudentUI";

const ActivityStats = () => {
  const { stats } = useActivityStudentUI();

  // A implementar, son las monedas ganadas en la actividades terminadas
  // const totalPoints = activities
  //   .filter((a) => a.status === "FINISHED")
  //   .reduce((sum, a) => sum + a.points, 0);

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
