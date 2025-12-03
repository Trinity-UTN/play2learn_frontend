import type { Position } from "../types/ranking.type";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
import styles from "../components/RankingPosition/RankingPosition.module.css";

export const useRankingPosition = (position: Position) => {
  const getMedalIcon = () => {
    switch (position.position) {
      case 1:
        return <FaTrophy className={`${styles.medalIcon} ${styles.gold}`} />;
      case 2:
        return <FaMedal className={`${styles.medalIcon} ${styles.silver}`} />;
      case 3:
        return <FaAward className={`${styles.medalIcon} ${styles.bronze}`} />;
      default:
        return null;
    }
  };
  return { getMedalIcon };
};
