import { useEffect, useCallback, useMemo } from "react";
import type { ActivityUI } from "../../../types/Activity.type";
import { useActivityStudent } from "../../useActivityStudentAPI";
import { usePaginationParams, type FilterOption } from "@/shared";
import { useActivityFilters } from "./useActivityFilters";
import { useActivityStats } from "./useActivityStats";
import { mapActivityToUI } from "../../../adapters/activityAdapter";
import { useSubject } from "@/admin";

export const useActivityData = () => {
  const {
    loading,
    paginatedActivitiesNotApproved,
    paginatedActivitiesApproved,
    paginatedActivitiesPending,
    getPaginatedActivitiesNotApproved,
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesPending,
  } = useActivityStudent();

  const { subjects: subjectList, getSubjectByStudent } = useSubject();

  const {
    paginationParams,
    handlePageChange,
    handlePageSizeChange,
    setPaginationParams,
  } = usePaginationParams();

  const {
    activeFilter,
    selectedSubject,
    selectedDifficulty,
    setActiveFilter,
    setSelectedSubject,
    setSelectedDifficulty,
  } = useActivityFilters();

  const { stats, counts } = useActivityStats();
  /**
   * Carga de actividades filtradas y paginadas
   */
  const loadActivities = useCallback(async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    if (selectedSubject && selectedSubject.id !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }

    if (selectedDifficulty && selectedDifficulty !== "ALL") {
      filters.push("difficulty");
      filtersValues.push(selectedDifficulty);
    }

    const baseParams = {
      ...paginationParams,
      order_type: "desc" as const,
      filters,
      filtersValues,
    };

    // Actividades aprobadas
    if (activeFilter === "APPROVED") {
      await getPaginatedActivitiesApproved({ ...baseParams });
      return;
    }

    // Actividades pendientes
    if (activeFilter === "PENDING") {
      await getPaginatedActivitiesPending({ ...baseParams });
      return;
    }

    // Actividades no aprobadas
    if (activeFilter === "DISAPPROVED") {
      filters.push("disapproved");
      filtersValues.push("true");
    } else {
      filters.push("status");
      filtersValues.push(activeFilter);
      filters.push("disapproved");
      filtersValues.push("false");
    }

    await getPaginatedActivitiesNotApproved({
      ...baseParams,
      filters: [...filters],
      filtersValues: [...filtersValues],
    });
  }, [
    activeFilter,
    paginationParams,
    selectedSubject,
    selectedDifficulty,
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesNotApproved,
    getPaginatedActivitiesPending,
  ]);

  /**
   * Carga de actividades, materias y estadísticas
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      await loadActivities();
      if (subjectList.length <= 0) {
        await getSubjectByStudent;
      }
    };
    fetchInitialData();
  }, [loadActivities, getSubjectByStudent]);

  /**
   * Reinicia la paginación al cambiar el filtro
   */
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [activeFilter, selectedSubject, selectedDifficulty, setPaginationParams]);

  // Datos Generales
  const filteredActivities: ActivityUI[] = useMemo(() => {
    if (activeFilter === "APPROVED") {
      return (paginatedActivitiesApproved?.results ?? []).map(mapActivityToUI);
    }
    if (activeFilter === "PENDING") {
      return (paginatedActivitiesPending?.results ?? []).map(mapActivityToUI);
    }
    return (paginatedActivitiesNotApproved?.results ?? []).map(mapActivityToUI);
  }, [
    activeFilter,
    paginatedActivitiesApproved,
    paginatedActivitiesPending,
    paginatedActivitiesNotApproved,
  ]);
  const subjects: FilterOption[] = useMemo(
    () => [
      { id: "ALL", name: "Todas las materias" },
      ...subjectList.map((subject) => ({
        id: String(subject.id),
        name: subject.name,
      })),
    ],
    [subjectList],
  );

  // Pagination info
  const paginationInfo = useMemo(() => {
    const source =
      activeFilter === "APPROVED"
        ? paginatedActivitiesApproved
        : activeFilter === "PENDING"
          ? paginatedActivitiesPending
          : paginatedActivitiesNotApproved;

    return source
      ? {
          currentPage: source.currentPage,
          totalPages: source.totalPages,
          pageSize: source.pageSize,
          totalItems: source.results.length,
          onPageChange: handlePageChange,
          onPageSizeChange: handlePageSizeChange,
        }
      : null;
  }, [
    activeFilter,
    paginatedActivitiesApproved,
    paginatedActivitiesNotApproved,
    paginatedActivitiesPending,
    handlePageChange,
    handlePageSizeChange,
  ]);

  return {
    // Filter state
    activeFilter,
    setActiveFilter,
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    // Data
    filteredActivities,
    subjects,
    stats,
    counts,
    paginationInfo,
    loading,
  };
};
