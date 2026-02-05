import { useEffect, useCallback, useMemo } from "react";
import type { ActivityUI } from "../../../types/Activity.type";
import { useActivityStudent } from "../../useActivityStudentAPI";
import { usePaginationParams } from "@/shared";
import { useActivityFilters } from "./useActivityFilters";
import { useActivityStats } from "./useActivityStats";
import { mapActivityToUI } from "../../../adapters/activityAdapter";
import { extractUniqueSubjects } from "../../../utils/activities.utils";

export const useActivityData = () => {
  const {
    loading,
    activityNotApproved,
    activityApproved,
    paginatedActivitiesNotApproved,
    paginatedActivitiesApproved,
    paginatedActivitiesPending,
    getPaginatedActivitiesNotApproved,
    getPaginatedActivitiesApproved,
    getPaginatedActivitiesPending,
    getActivityStudentStats,
  } = useActivityStudent();

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

    // Actividades aprobadas
    if (activeFilter === "APPROVED") {
      await getPaginatedActivitiesApproved({
        ...paginationParams,
        order_type: "desc",
        filters:
          selectedSubject && selectedSubject.id !== "ALL" ? ["subjectId"] : [],
        filtersValues:
          selectedSubject && selectedSubject.id !== "ALL"
            ? [selectedSubject.id]
            : [],
      });
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

    // Actividades pendientes
    if (activeFilter === "PENDING") {
      await getPaginatedActivitiesPending({
        ...paginationParams,
        order_type: "desc",
        filters:
          selectedSubject && selectedSubject.id !== "ALL" ? ["subjectId"] : [],
        filtersValues:
          selectedSubject && selectedSubject.id !== "ALL"
            ? [selectedSubject.id]
            : [],
      });
      return;
    }

    // Subject filter
    if (selectedSubject && selectedSubject.id !== "ALL") {
      filters.push("subjectId");
      filtersValues.push(selectedSubject.id);
    }

    // Difficulty filter
    if (selectedDifficulty && selectedDifficulty !== "ALL") {
      filters.push("difficulty");
      filtersValues.push(selectedDifficulty);
    }

    await getPaginatedActivitiesNotApproved({
      ...paginationParams,
      order_type: "desc",
      filters,
      filtersValues,
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
   * Carga de actividades y estadísticas
   */
  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([loadActivities(), getActivityStudentStats()]);
    };
    fetchInitialData();
  }, [loadActivities, getActivityStudentStats]);

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

  // Subjects
  // TODO: Arreglar este filtrado por materias porque claramente quedó viejisimo. Deberíamos tener un endpoint que traiga todas las materias por las que puede filtrar el alumno y listo
  const subjects = useMemo(
    () => extractUniqueSubjects(activityNotApproved, activityApproved),
    [activityNotApproved, activityApproved],
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
