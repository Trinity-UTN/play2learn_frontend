export const DIFFICULTY_COLORS: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  FACIL: {
    bg: "#dcfce7",
    text: "#10b981",
    label: "Fácil",
  },
  MEDIO: {
    bg: "#fef3c7",
    text: "#f59e0b",
    label: "Medio",
  },
  DIFICIL: {
    bg: "#fee2e2",
    text: "#ef4444",
    label: "Difícil",
  },
};

export const getDifficultyColor = (difficulty: string) => {
  const upperKey = difficulty.toUpperCase();
  return (
    DIFFICULTY_COLORS[upperKey] || {
      bg: "#e5e7eb",
      text: "#6b7280",
      label: difficulty,
    }
  );
};
