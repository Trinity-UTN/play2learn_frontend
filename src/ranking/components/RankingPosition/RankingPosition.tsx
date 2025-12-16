import { motion } from "framer-motion";
import { FaCoins, FaGamepad } from "react-icons/fa";
import type { Position } from "../../types/ranking.type";
import { useRankingPosition } from "../../hooks/useRankingPosition";
import styles from "./RankingPosition.module.css";

interface RankingPositionProps {
  position: Position;
  category: "coins" | "activities";
  index: number;
  isCurrentUser: boolean;
}

export const RankingPosition = ({
  position,
  category,
  index,
  isCurrentUser,
}: RankingPositionProps) => {
  const { getMedalIcon } = useRankingPosition(position);

  return (
    <motion.div
      className={`${styles.positionCard} ${
        isCurrentUser ? styles.currentUser : ""
      } ${position.position <= 3 ? styles.topThree : ""}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className={styles.positionNumber}>
        {position.position <= 3 ? (
          getMedalIcon()
        ) : (
          <span className={styles.numberText}>#{position.position}</span>
        )}
      </div>

      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {position.name.charAt(0).toUpperCase()}
        </div>
        <div className={styles.nameContainer}>
          <p className={styles.name}>{position.name}</p>
          {isCurrentUser && <span className={styles.youBadge}>Tú</span>}
        </div>
      </div>

      <div className={styles.quantityContainer}>
        {category === "coins" ? (
          <FaCoins className={styles.quantityIcon} />
        ) : (
          <FaGamepad className={styles.quantityIcon} />
        )}
        <span className={styles.quantity}>
          {position.quantity.toLocaleString()}
        </span>
      </div>

      {position.position <= 3 && <div className={styles.shine} />}
    </motion.div>
  );
};
