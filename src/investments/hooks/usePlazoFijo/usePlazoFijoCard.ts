import type {
  FIXED_TERM_DAYS,
  PlazoFijoResponse,
} from "../../types/plazoFijo.type";

interface PlazoFijoCardProps {
  plazoFijo: PlazoFijoResponse;
}

export const usePlazoFijoCard = ({ plazoFijo }: PlazoFijoCardProps) => {
  const getTermConfig = (term: FIXED_TERM_DAYS) => {
    switch (term) {
      case "SEMANAL":
        return { label: "Semanal", color: "#f59e0b", days: 7 };
      case "QUINCENAL":
        return { label: "Quincenal", color: "#3b82f6", days: 15 };
      case "MENSUAL":
        return { label: "Mensual", color: "#8b5cf6", days: 30 };
    }
  };

  const termConfig = getTermConfig(plazoFijo.fixedTermDays);
  const isFinished = plazoFijo.fixedTermState === "FINISHED";
  const profit = plazoFijo.amountReward - plazoFijo.amountInvested;
  const profitPercent = ((profit / plazoFijo.amountInvested) * 100).toFixed(2);

  const startDate = new Date(plazoFijo.startDate);
  const endDate = new Date(plazoFijo.endDate);
  const today = new Date();
  const totalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysElapsed = Math.ceil(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysRemaining = Math.max(0, totalDays - daysElapsed);
  const progress = isFinished
    ? 100
    : Math.min(100, (daysElapsed / totalDays) * 100);

  return {
    termConfig,
    isFinished,
    profit,
    profitPercent,
    startDate,
    endDate,
    daysRemaining,
    progress,
  };
};
