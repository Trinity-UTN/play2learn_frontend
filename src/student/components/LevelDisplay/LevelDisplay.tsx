import { FaStar, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";
import styles from "./LevelDisplay.module.css";

interface LevelDisplayProps {
  level: number;
  xp: number;
  xpToNextLevel: number;
  compact?: boolean;
}

const LevelDisplay: React.FC<LevelDisplayProps> = ({
  level,
  xp,
  xpToNextLevel,
  compact = false,
}) => {
  const progress = (xp / xpToNextLevel) * 100;

  return (
    <motion.div
      className={`${styles.levelDisplay} ${compact ? styles.compact : ""}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className={styles.levelIcon}>
        <FaTrophy className={styles.trophy} />
        {/* <span className={styles.levelNumber}>{level}</span> */}
      </div>

      <div className={styles.levelInfo}>
        <div className={styles.levelHeader}>
          <span className={styles.levelLabel}>Nivel {level}</span>
          <span className={styles.xpText}>
            {xp.toLocaleString()} / {xpToNextLevel.toLocaleString()} XP
          </span>
        </div>

        <div className={styles.progressBar}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <div
            className={styles.progressGlow}
            style={{ width: `${progress}%` }}
          />
        </div>

        {!compact && (
          <div className={styles.nextLevelInfo}>
            <FaStar className={styles.starIcon} />
            <span>
              {(xpToNextLevel - xp).toLocaleString()} XP para nivel {level + 1}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LevelDisplay;
