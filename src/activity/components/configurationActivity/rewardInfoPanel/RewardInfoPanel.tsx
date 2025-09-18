import formatPrice from "../../../../shared/utils/formatPrice";
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
        <span className={styles.rewardBoxTitle}>Balance actual</span>
        <span className={styles.rewardBoxValue}>
          {formatPrice(actualBalance)} monedas
        </span>
      </div>
      <div className={styles.rewardBox}>
        <span className={styles.rewardBoxTitle}>Recompensa máxima (30%)</span>
        <span className={styles.rewardBoxValue}>
          {formatPrice(maxReward)} monedas
        </span>
      </div>
    </div>
  );
};

export default RewardInfoPanel;
