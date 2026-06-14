export const formatTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

// For durations expressed in minutes (e.g., activity maxTime)
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minutos`;
  }
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0
    ? `${hours}h ${remaining}m`
    : `${hours} hora${hours > 1 ? "s" : ""}`;
};

export const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Sin fecha";
  return new Date(dateString).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
