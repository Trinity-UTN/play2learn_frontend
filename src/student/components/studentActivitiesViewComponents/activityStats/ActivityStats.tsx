import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { Card } from "@/shared";
import styles from "./ActivityStats.module.css";

interface ActivityStatsProps {
  stats: Array<{
    label: string;
    value: number;
    icon: IconType;
    color: string;
    bgColor: string;
  }>;
}

const ActivityStats: React.FC<ActivityStatsProps> = ({ stats }) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div variants={itemVariants} className={styles.statsContainer}>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
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
                  <IconComponent />
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
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ActivityStats;
