import { useEffect, useCallback, useMemo } from "react";
import type { ActivityUI } from "../../../types/Activity.type";
import { useActivityStudent } from "../../useActivityStudentAPI";
import usePaginationParams from "../../../../shared/hooks/usePaginateParams";
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
    getActivityNotApproved,
    getActivityApproved,
    getPaginatedActivitiesNotApproved,
    getPaginatedActivitiesApproved,
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

  const { stats, counts } = useActivityStats(
    activityNotApproved,
    activityApproved
  );

  // Fetch inicial
  useEffect(() => {
    if (activityNotApproved.length <= 0) {
      getActivityNotApproved();
      getActivityApproved();
    }
  }, []);

  // Load activities based on filters
  const loadActivities = useCallback(async () => {
    const filters: string[] = [];
    const filtersValues: string[] = [];

    // Actividades aprobadas
    if (activeFilter === "APPROVED") {
      await getPaginatedActivitiesApproved({
        ...paginationParams,
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
      filters,
      filtersValues,
    });
  }, [activeFilter, paginationParams, selectedSubject, selectedDifficulty]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // Reset page on filter change
  useEffect(() => {
    setPaginationParams((prev) => ({ ...prev, page: 1 }));
  }, [activeFilter, selectedSubject, selectedDifficulty]);

  // Filtered activities
  const filteredActivities: ActivityUI[] = useMemo(() => {
    if (activeFilter === "APPROVED") {
      return (paginatedActivitiesApproved?.results ?? []).map(mapActivityToUI);
    }
    return (paginatedActivitiesNotApproved?.results ?? []).map(mapActivityToUI);
  }, [
    activeFilter,
    paginatedActivitiesApproved,
    paginatedActivitiesNotApproved,
  ]);

  // Subjects
  const subjects = useMemo(
    () => extractUniqueSubjects(activityNotApproved, activityApproved),
    [activityNotApproved, activityApproved]
  );

  // Pagination info
  const paginationInfo = useMemo(() => {
    const source =
      activeFilter === "APPROVED"
        ? paginatedActivitiesApproved
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
