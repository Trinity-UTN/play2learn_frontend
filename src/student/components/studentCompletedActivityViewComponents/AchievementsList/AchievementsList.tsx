import { motion, type Variants } from "framer-motion";
import styles from "./AchievementsList.module.css";

interface AchievementsListProps {
  achievements: string[];
  animationPhase: number;
}

export default function AchievementsList({
  achievements,
  animationPhase,
}: AchievementsListProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const getAchievementIcon = (achievement: string) => {
    if (achievement.includes("Perfect")) return "🏆";
    if (achievement.includes("Speed")) return "⚡";
    if (achievement.includes("First")) return "🥇";
    if (achievement.includes("Streak")) return "🔥";
    return "🎖️";
  };

  return (
    <motion.div
      className={styles.achievementsContainer}
      variants={containerVariants}
      initial="hidden"
      animate={animationPhase >= 3 ? "visible" : "hidden"}
    >
      <h3 className={styles.title}>🏅 ¡Logros Desbloqueados!</h3>

      <div className={styles.achievementsList}>
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className={styles.achievementItem}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.achievementIcon}>
              {getAchievementIcon(achievement)}
            </div>
            <div className={styles.achievementText}>{achievement}</div>
            <motion.div
              className={styles.achievementGlow}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.3,
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
