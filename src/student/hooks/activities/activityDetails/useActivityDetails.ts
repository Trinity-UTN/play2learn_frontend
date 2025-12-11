import { useMemo } from "react";
import type { IconType } from "react-icons";
import { FcCalendar, FcExpired, FcClock } from "react-icons/fc";
import type {
  CurrentActivityInterface,
  ActivityUI,
} from "../../../types/Activity.type";
import { useDetailsFormatters } from "./useDetailsFormatters";
import { useGameConfigRenderer } from "@/shared";

interface UseActivityDataProps {
  currentActivity: CurrentActivityInterface | null;
  activity?: ActivityUI;
}

interface ActivityItem {
  id: string;
  icon: IconType;
  label: string;
  value: string;
}

export const useActivityDetails = ({
  currentActivity,
  activity,
}: UseActivityDataProps) => {
  const { formatDate, formatTime } = useDetailsFormatters();
  const displayData = currentActivity || activity;

  const gameConfigDetails = useGameConfigRenderer(
    currentActivity?.name,
    currentActivity?.gameConfig
  );

  const mainActivityItems = useMemo((): ActivityItem[] => {
    const items: ActivityItem[] = [];

    if (currentActivity?.startDate) {
      items.push({
        id: "startDate",
        icon: FcCalendar,
        label: "Fecha de inicio",
        value: formatDate(currentActivity.startDate),
      });
    }

    if (currentActivity?.endDate) {
      items.push({
        id: "endDate",
        icon: FcExpired,
        label: "Fecha de fin",
        value: formatDate(currentActivity.endDate),
      });
    }

    if (currentActivity?.maxTime) {
      items.push({
        id: "maxTime",
        icon: FcClock,
        label: "Tiempo máximo",
        value: formatTime(currentActivity.maxTime),
      });
    }

    return items;
  }, [
    currentActivity?.startDate,
    currentActivity?.endDate,
    currentActivity?.maxTime,
    formatDate,
    formatTime,
  ]);

  return {
    displayData,
    mainActivityItems,
    gameConfigDetails,
    hasDescription: !!currentActivity?.description,
    description: currentActivity?.description,
  };
};
