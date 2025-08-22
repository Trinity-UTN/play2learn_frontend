import { FaFire, FaTrophy, FaStar } from "react-icons/fa";
import styles from "./ProfileStats.module.css";

interface ProfileStatsProps {
  streakDays: number;
  rankingPosition: number;
  achievementsCount: number;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  streakDays,
  rankingPosition,
  achievementsCount,
}) => {
  return (
    <div className={styles.stats}>
      <div className={styles.statItem}>
        <div className={`${styles.statIcon} ${styles.flame}`}>
          <FaFire size={24} />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statValue}>{streakDays}</span>
          <span className={styles.statLabel}>días de racha</span>
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={`${styles.statIcon} ${styles.trophy}`}>
          <FaTrophy size={24} />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statValue}>#{rankingPosition}</span>
          <span className={styles.statLabel}>posición ranking</span>
        </div>
      </div>

      <div className={styles.statItem}>
        <div className={`${styles.statIcon} ${styles.star}`}>
          <FaStar size={24} />
        </div>
        <div className={styles.statContent}>
          <span className={styles.statValue}>{achievementsCount}</span>
          <span className={styles.statLabel}>logros conseguidos</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
