import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTrophy,
  FaStar,
  FaCheckCircle,
  FaClipboardCheck,
  FaTimesCircle,
  FaQuestionCircle,
  FaClock,
  FaCoins,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import type {
  ActivityResultsResponseInterface,
  CurrentActivityInterface,
} from "../../../types/Activity.type";
import type { GameType } from "../../../../shared/types/Games.type";
import { Card, Badge, useCountUp } from "@/shared";
import { useActivityStudent } from "../../../hooks/useActivityStudentAPI";
import {
  formatResultState,
  formatCompletedTime,
  getStatsLabels,
  shouldShowStat,
  shouldShowScore,
} from "../../../utils/activityResults.utils";
import styles from "./ActivityResultsStats.module.css";

interface ActivityResultsStatsProps {
  results: ActivityResultsResponseInterface;
  activity: CurrentActivityInterface;
}

interface StatItem {
  id: string;
  icon: IconType;
  label: string;
  value: React.ReactElement | string;
  numericValue?: number;
  className?: string;
}

const ActivityResultsStats: React.FC<ActivityResultsStatsProps> = ({
  results,
  activity,
}) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const { currentActivityAttemptInfo } = useActivityStudent();

  useEffect(() => {
    setAnimationPhase(1);
  }, []);

  const animatedReward = useCountUp(results.reward, animationPhase, {
    steps: 50,
    interval: 50,
  });

  const stateInfo = formatResultState(results.state);
  const gameType = activity.name.toLowerCase() as GameType;
  const statsLabels = getStatsLabels(gameType);
  const isApproved = results.state === "APPROVED";

  const getStatusMessage = () => {
    if (isApproved) {
      return results.score >= 80 ? "¡Excelente trabajo!" : "¡Bien hecho!";
    }

    const remainingAttempts =
      currentActivityAttemptInfo?.remainingAttempts || 0;
    if (remainingAttempts > 0) {
      return `Sigue intentando`;
    }
    return "Actividad desaprobada";
  };

  const getDetailsTitle = () => {
    return isApproved ? "Detalle de realización" : "Detalle del último intento";
  };

  const renderRightMetric = (
    icon: IconType,
    label: string,
    value: string | number
  ) => {
    const IconComponent = icon;
    return (
      <div className={styles.metricBox}>
        <IconComponent className={styles.metricBoxIcon} />
        <div className={styles.metricBoxContent}>
          <span className={styles.metricBoxLabel}>{label}</span>
          <span className={styles.metricBoxValue}>{value}</span>
        </div>
      </div>
    );
  };

  const renderScoreGauge = () => {
    const score = results.score || 0;
    const totalBars = 20;
    const filledBars = Math.round((score / 100) * totalBars);

    return (
      <div className={styles.scoreBox}>
        <FaStar className={styles.scoreStarIcon} />
        <div className={styles.scoreContent}>
          <span className={styles.scoreLabel}>Puntuación Obtenida</span>
          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeBars}>
              {Array.from({ length: totalBars }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`${styles.gaugeBar} ${
                    index < filledBars ? styles.gaugeBarFilled : ""
                  }`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: index < filledBars ? 1 : 0.3 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5 + index * 0.05,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
            <span className={styles.scoreNumber}>{score}%</span>
          </div>
        </div>
      </div>
    );
  };

  const secondaryStats: StatItem[] = [];

  secondaryStats.push({
    id: "completedTime",
    icon: FaClock,
    label: "Tiempo empleado",
    value: formatCompletedTime(results.completedTimeInSeconds),
    className: styles.completedTimeValue,
  });

  if (shouldShowStat(gameType, "correctAnswers")) {
    secondaryStats.push({
      id: "correctAnswers",
      icon: FaCheckCircle,
      label: statsLabels.correctAnswers!,
      value: `${results.correctAnswers}`,
      numericValue: results.correctAnswers,
      className: styles.correctValue,
    });
  }

  if (shouldShowStat(gameType, "incorrectAnswers")) {
    secondaryStats.push({
      id: "incorrectAnswers",
      icon: FaTimesCircle,
      label: statsLabels.incorrectAnswers!,
      value: `${results.incorrectAnswers}`,
      numericValue: results.incorrectAnswers,
      className: styles.incorrectValue,
    });
  }

  if (shouldShowStat(gameType, "unanswered")) {
    secondaryStats.push({
      id: "unanswered",
      icon: FaQuestionCircle,
      label: statsLabels.unanswered!,
      value: `${results.unanswered}`,
      numericValue: results.unanswered,
      className: styles.unansweredValue,
    });
  }

  const renderSecondaryStat = (item: StatItem, index: number) => {
    const IconComponent = item.icon;
    return (
      <motion.div
        key={item.id}
        className={styles.secondaryStatItem}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 + index * 0.1 }}
      >
        <div className={styles.secondaryStatIcon}>
          <IconComponent className={styles.detailIcon} />
        </div>
        <div className={styles.secondaryStatContent}>
          <span className={styles.secondaryStatLabel}>{item.label}</span>
          <span className={`${styles.secondaryStatValue} ${item.className}`}>
            {item.value}
          </span>
        </div>
      </motion.div>
    );
  };

  const remainingAttempts = currentActivityAttemptInfo?.remainingAttempts || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <motion.div
        className={`${styles.statusHeader} ${
          styles[results.state.toLowerCase()]
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.statusLeft}>
          <h2 className={styles.statusTitle}>{getStatusMessage()}</h2>
          <Badge variant={stateInfo.variant} className={styles.stateBadge}>
            {stateInfo.label}
          </Badge>
        </div>

        <div className={styles.statusRight}>
          {isApproved ? (
            <>
              <div className={styles.rewardBox}>
                <FaTrophy className={styles.trophyIcon} />
                <div className={styles.rewardContent}>
                  <span className={styles.rewardLabel}>
                    Recompensa obtenida
                  </span>
                  <div className={styles.rewardValueWrapper}>
                    <FaCoins className={styles.coinIcon} />
                    <span className={styles.rewardNumber}>
                      {animatedReward}
                    </span>
                  </div>
                </div>
              </div>
              {shouldShowScore(gameType) && renderScoreGauge()}
            </>
          ) : (
            <>
              {renderRightMetric(
                FaClipboardCheck,
                "Intentos utilizados",
                `${results.attempts} de ${activity.attempts}`
              )}
              {renderRightMetric(
                FaClipboardCheck,
                "Intentos restantes",
                remainingAttempts > 0 ? remainingAttempts : "Sin intentos"
              )}
              {shouldShowScore(gameType) && renderScoreGauge()}
            </>
          )}
        </div>
      </motion.div>

      {secondaryStats.length > 0 && (
        <Card className={styles.secondaryStatsCard}>
          <h3 className={styles.sectionTitle}>{getDetailsTitle()}</h3>
          <div className={styles.secondaryStatsGrid}>
            {secondaryStats.map((item, index) =>
              renderSecondaryStat(item, index)
            )}
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default ActivityResultsStats;
