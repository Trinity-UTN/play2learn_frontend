import { useMemo } from "react";
import type { IconType } from "react-icons";
import { FcCalendar, FcExpired, FcClock } from "react-icons/fc";
import type {
  CurrentActivityInterface,
  ActivityUI,
} from "../../../types/Activity.type";
import { useDetailsFormatters } from "./useDetailsFormatters";
import { useGameConfigRenderer } from "@/shared";
import { GameType } from "@/shared";
import { getGameTypeFromActivityName } from "@/shared";

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

  const allGameConfigDetails = useGameConfigRenderer(
    currentActivity?.name,
    currentActivity?.gameConfig,
  );

  const isNoLudica = useMemo(() => {
    if (!currentActivity?.name) return false;
    const gameType = getGameTypeFromActivityName(currentActivity.name);
    return gameType === GameType.NO_LUDICA;
  }, [currentActivity?.name]);

  const { exerciseDetail, gameConfigDetails } = useMemo(() => {
    if (!isNoLudica) {
      return {
        exerciseDetail: null,
        gameConfigDetails: allGameConfigDetails,
      };
    }

    const exercise = allGameConfigDetails.find(
      (detail) => detail.label === "Ejercicio",
    );

    const filtered = allGameConfigDetails.filter(
      (detail) => detail.label !== "Ejercicio",
    );

    return {
      exerciseDetail: exercise || null,
      gameConfigDetails: filtered,
    };
  }, [isNoLudica, allGameConfigDetails]);

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
    exerciseDetail,
    hasDescription: !!currentActivity?.description,
    description: currentActivity?.description,
  };
};
