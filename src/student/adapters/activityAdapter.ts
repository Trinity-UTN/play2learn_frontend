import type {
  ActivityNotApprovedResponseInterface,
  ActivityStateResponseInterface,
  ActivityUI,
} from "../types/Activity.type";
import { formatDate } from "@/shared/utils/format";

export function mapActivityToUI(
  activity:
    | ActivityNotApprovedResponseInterface
    | ActivityStateResponseInterface,
): ActivityUI {
  const isNotApproved = "status" in activity;

  return {
    id: activity.id,
    name: activity.name,
    description: activity.description,
    difficulty: activity.difficulty,
    subjectName: activity.subjectName,
    status: "status" in activity ? activity.status : activity.state,
    dateLabel: isNotApproved
      ? `Vence el ${formatDate(activity.endDate)}`
      : undefined,
    timeLabel: isNotApproved ? `${activity.maxTime} min` : undefined,
    maxTime: isNotApproved ? activity.maxTime : undefined,
    rewardLabel: isNotApproved
      ? activity.minReward
        ? `${activity.minReward} - ${activity.maxReward} monedas`
        : `${activity.maxReward} monedas`
      : undefined,
    reward: isNotApproved ? undefined : `${activity.reward} monedas`,

    attempts: activity.attempts,
    attemptsLabel: `${activity.remainingAttempts} / ${activity.attempts} intentos`,
    remainingAttempts: activity.remainingAttempts,
    noAttempts: activity.remainingAttempts === 0,
    dueDateLabel:
      isNotApproved && activity.status === "PUBLISHED"
        ? `Vence ${getDaysUntilDue(activity.endDate)}`
        : undefined,
    extraInfo: !isNotApproved
      ? `Completada el ${new Date(activity.completedAt).toLocaleDateString(
          "es-ES",
        )}`
      : undefined,
    completedAt: !isNotApproved ? activity.completedAt : undefined,
  };
}

// Usamos la función que ya tenés en el hook para calcular el due date
function getDaysUntilDue(endDate: string) {
  const due = new Date(endDate);
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Vencida";
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Mañana";
  return `${diffDays} días`;
}
