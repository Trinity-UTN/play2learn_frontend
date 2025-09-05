import type {
  ActivityNotApprovedResponseInterface,
  ActivityApprovedResponseInterface,
  ActivityUI,
} from "../types/Activity.type";

export function mapActivityToUI(
  activity:
    | ActivityNotApprovedResponseInterface
    | ActivityApprovedResponseInterface
): ActivityUI {
  const isNotApproved = "pending" in activity;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
    });
  };
  return {
    id: activity.id,
    name: activity.name,
    description: activity.description,
    difficulty: activity.difficulty,
    subjectName: activity.subjectName,
    status: "status" in activity ? activity.status : activity.state,
    dateLabel: isNotApproved
      ? `${formatDate(activity.startDate)} - ${formatDate(activity.endDate)}`
      : undefined,
    timeLabel: isNotApproved ? `${activity.maxTime} min` : undefined,
    rewardLabel: isNotApproved
      ? activity.minReward
        ? `${activity.minReward} - ${activity.maxReward} pts`
        : `${activity.maxReward} pts`
      : undefined,
    reward: isNotApproved ? undefined : `${activity.reward} pts`,

    attemptsLabel: `${activity.remainingAttempts} / ${activity.attempts} intentos`,
    noAttempts: activity.remainingAttempts === activity.attempts,
    dueDateLabel:
      isNotApproved && activity.status === "PUBLISHED"
        ? `Vence ${getDaysUntilDue(activity.endDate)}`
        : undefined,
    extraInfo: !isNotApproved
      ? `Completada el ${new Date(activity.completedAt).toLocaleDateString(
          "es-ES"
        )}`
      : undefined,
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
