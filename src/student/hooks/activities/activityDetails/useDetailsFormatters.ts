import { formatDate, formatDuration } from "@/shared/utils/format";

export const useDetailsFormatters = () => {
  const formatTime = formatDuration;
  return { formatDate, formatTime };
};
