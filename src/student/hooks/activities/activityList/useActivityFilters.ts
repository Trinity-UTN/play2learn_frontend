import { useState, useCallback } from "react";
import { ACTIVITY_NAME_ALL, type FilterOption } from "@/shared";
import type { ActivityStatus } from "../../../constants/activities.constants";

export const useActivityFilters = () => {
  const [activeFilter, setActiveFilter] = useState<ActivityStatus>("PUBLISHED");
  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>({
    id: "ALL",
    name: "Todas las materias",
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");
  const [selectedActivityName, setSelectedActivityName] =
    useState<string>(ACTIVITY_NAME_ALL);

  const resetFilters = useCallback(() => {
    setActiveFilter("PUBLISHED");
    setSelectedSubject({ id: "ALL", name: "Todas las materias" });
    setSelectedDifficulty("ALL");
    setSelectedActivityName(ACTIVITY_NAME_ALL);
  }, []);

  return {
    activeFilter,
    selectedSubject,
    selectedDifficulty,
    selectedActivityName,
    setActiveFilter,
    setSelectedSubject,
    setSelectedDifficulty,
    setSelectedActivityName,
    resetFilters,
  };
};
