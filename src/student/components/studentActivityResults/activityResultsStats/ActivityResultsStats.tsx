import { motion } from "framer-motion";
import {
  FaColumns,
  FaList,
  FaTrophy,
  FaStar,
  FaCheckCircle,
  FaClipboardCheck,
  FaTimesCircle,
  FaQuestionCircle,
  FaClock,
} from "react-icons/fa";
import { FcStatistics } from "react-icons/fc";
import type { IconType } from "react-icons";
import type {
  ActivityResultsResponseInterface,
  CurrentActivityInterface,
} from "../../../types/Activity.type";
import type { GameType } from "../../../../shared/types/Games.type";
import { Button, Card, Badge } from "@/shared";
import {
  formatResultState,
  formatCompletedTime,
  getStatsLabels,
  shouldShowStat,
  shouldShowScore,
} from "../../../utils/activityResults.utils";
import { useViewToggle } from "../../../hooks/useViewToggle";
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
  className?: string;
}

const ActivityResultsStats: React.FC<ActivityResultsStatsProps> = ({
  results,
  activity,
}) => {
  const { isHorizontal, toggleView, viewMode } = useViewToggle(true);
  const stateInfo = formatResultState(results.state);
  const gameType = activity.name.toLowerCase() as GameType;
  const statsLabels = getStatsLabels(gameType);

  const statsItems: StatItem[] = [
    {
      id: "state",
      icon: FcStatistics,
      label: "Estado",
      value: (
        <Badge variant={stateInfo.variant} className={styles.stateBadge}>
          {stateInfo.label}
        </Badge>
      ),
    },
    {
      id: "reward",
      icon: FaTrophy,
      label: "Recompensa obtenida",
      value: `${results.reward} monedas`,
      className: styles.rewardValue,
    },
  ];

  if (shouldShowScore(gameType)) {
    statsItems.push({
      id: "score",
      icon: FaStar,
      label: "Puntuación",
      value: `${results.score}/100 puntos`,
      className: styles.scoreValue,
    });
  }

  statsItems.push(
    {
      id: "completedTime",
      icon: FaClock,
      label: "Tiempo de realización",
      value: formatCompletedTime(results.completedTimeInSeconds),
      className: styles.completedTimeValue,
    },
    {
      id: "attempts",
      icon: FaClipboardCheck,
      label: "Intentos utilizados",
      value: `${results.attempts} de ${activity.attempts}`,
      className: styles.attemptsValue,
    }
  );

  if (shouldShowStat(gameType, "correctAnswers")) {
    statsItems.push({
      id: "correctAnswers",
      icon: FaCheckCircle,
      label: statsLabels.correctAnswers!,
      value: `${results.correctAnswers}`,
      className: styles.correctValue,
    });
  }

  if (shouldShowStat(gameType, "incorrectAnswers")) {
    statsItems.push({
      id: "incorrectAnswers",
      icon: FaTimesCircle,
      label: statsLabels.incorrectAnswers!,
      value: `${results.incorrectAnswers}`,
      className: styles.incorrectValue,
    });
  }

  if (shouldShowStat(gameType, "unanswered")) {
    statsItems.push({
      id: "unanswered",
      icon: FaQuestionCircle,
      label: statsLabels.unanswered!,
      value: `${results.unanswered}`,
      className: styles.unansweredValue,
    });
  }

  const renderStatItem = (item: StatItem) => {
    const IconComponent = item.icon;
    return (
      <div key={item.id} className={styles.detailItem}>
        <div className={styles.detailContent}>
          <IconComponent className={styles.detailIcon} />
          <div>
            <span className={styles.label}>{item.label}</span>
            <span className={`${styles.value} ${item.className || ""}`}>
              {item.value}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.container}
    >
      <Card className={styles.detailsCard}>
        <div className={styles.header}>
          <h3 className={styles.sectionTitle}>Resultados de la Actividad</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleView}
            className={styles.viewToggle}
          >
            {isHorizontal ? <FaList /> : <FaColumns />}
          </Button>
        </div>

        <div className={`${styles.detailsGrid} ${styles[viewMode]}`}>
          {statsItems.map((item) => renderStatItem(item))}
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityResultsStats;
