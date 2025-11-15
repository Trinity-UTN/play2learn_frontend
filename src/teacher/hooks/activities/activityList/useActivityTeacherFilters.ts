import { useState, useCallback } from "react";
import type { FilterOption } from "../../../../shared/types/Filter.type";
import type { ActivityTeacherStatus } from "../../../constants/activity/activityTeacher.constants";

/**
 * Hook para manejar los filtros de actividades del teacher
 */
export const useActivityTeacherFilters = () => {
  const [activeFilter, setActiveFilter] =
    useState<ActivityTeacherStatus>("PUBLISHED");
  const [selectedSubject, setSelectedSubject] = useState<FilterOption | null>({
    id: "ALL",
    name: "Todas las materias",
  });
  // const [selectedCourse, setSelectedCourse] = useState<FilterOption | null>({
  //   id: "ALL",
  //   name: "Todos los cursos",
  // });
  // const [selectedYear, setSelectedYear] = useState<FilterOption | null>({
  //   id: "ALL",
  //   name: "Todos los años",
  // });
  const [search, setSearch] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const applyFilters = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const resetFilters = useCallback(() => {
    setActiveFilter("PUBLISHED");
    setSelectedSubject({ id: "ALL", name: "Todas las materias" });
    // setSelectedCourse({ id: "ALL", name: "Todos los cursos" });
    // setSelectedYear({ id: "ALL", name: "Todos los años" });
    setSearch("");
  }, []);

  return {
    // Estados
    activeFilter,
    selectedSubject,
    search,
    viewMode,

    // Handlers
    setActiveFilter,
    setSelectedSubject,
    setSearch,
    setViewMode,
    applyFilters,
    resetFilters,

    // selectedCourse,
    // setSelectedCourse,
    // selectedYear,
    // setSelectedYear,
  };
};
