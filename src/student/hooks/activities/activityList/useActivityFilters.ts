import { useState, useCallback } from "react";
import type { FilterOption } from "@/shared";
import type { ActivityStatus } from "../../../constants/activities.constants";

export const useActivityFilters = () => {
  const [activeFilter, setActiveFilter] = useState<ActivityStatus>("PUBLISHED");
  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>({
    id: "ALL",
    name: "Todas las materias",
  });
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("ALL");

  const resetFilters = useCallback(() => {
    setActiveFilter("PUBLISHED");
    setSelectedSubject({ id: "ALL", name: "Todas las materias" });
    setSelectedDifficulty("ALL");
  }, []);

  return {
    activeFilter,
    selectedSubject,
    selectedDifficulty,
    setActiveFilter,
    setSelectedSubject,
    setSelectedDifficulty,
    resetFilters,
  };
};
