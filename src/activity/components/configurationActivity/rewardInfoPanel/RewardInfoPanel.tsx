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
  const displayValue = Math.min(actualBalance, maxReward);
  return (
    <div className={styles.rewardsInfoContainer}>
      <div className={styles.rewardBox}>
        <span className={styles.rewardBoxTitle}>
          Máximo permitido para esta actividad
        </span>
        <span className={styles.rewardBoxValue}>
          {formatPrice(displayValue)} monedas
        </span>
      </div>
    </div>
  );
};

export default RewardInfoPanel;
