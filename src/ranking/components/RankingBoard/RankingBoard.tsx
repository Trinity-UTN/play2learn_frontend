import { motion } from "framer-motion";
import type { RankingResponseApi } from "../../types/ranking.type";
import { CurrentUserCard } from "../CurrentUserCard/CurrentUserCard";
import { RankingPosition } from "../RankingPosition/RankingPosition";
import styles from "./RankingBoard.module.css";

interface RankingBoardProps {
  data: RankingResponseApi;
  category: "coins" | "activities";
}

export const RankingBoard = ({ data, category }: RankingBoardProps) => {
  const { currentUserPosition, participants, totalParticipants } = data;

  if (!participants) {
    return null;
  }
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CurrentUserCard position={currentUserPosition} category={category} />

      <div className={styles.board}>
        <div className={styles.boardHeader}>
          <h2 className={styles.boardTitle}>Top Rankings</h2>
          <span className={styles.totalCount}>
            {totalParticipants} participantes
          </span>
        </div>

        <div className={styles.positionsList}>
          {participants.map((position, index) => (
            <RankingPosition
              key={position.position}
              position={position}
              category={category}
              index={index}
              isCurrentUser={position.position === currentUserPosition.position}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
