import { formatPrice } from "@/shared";
import styles from "./RewardInfoPanel.module.css";

interface RewardInfoPanelProps {
  actualBalance: number;
  maxReward: number;
}

const RewardInfoPanel: React.FC<RewardInfoPanelProps> = ({
  actualBalance,
  maxReward,
}) => {
  return (
    <div className={styles.rewardsInfoContainer}>
      <div className={styles.rewardBox}>
        <span className={styles.rewardBoxTitle}>Monedas disponibles en la materia</span>
        <span className={styles.rewardBoxValue}>
          {formatPrice(actualBalance)} monedas
        </span>
      </div>
      <div className={styles.rewardBox}>
        <span className={styles.rewardBoxTitle}>Máximo permitido para esta actividad</span>
        <span className={styles.rewardBoxValue}>
          {formatPrice(maxReward)} monedas
        </span>
      </div>
    </div>
  );
};

export default RewardInfoPanel;
